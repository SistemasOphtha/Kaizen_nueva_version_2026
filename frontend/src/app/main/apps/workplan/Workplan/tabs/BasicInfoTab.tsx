import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useAppSelector } from 'app/store';
// import moment from 'moment';
import { parseISO } from 'date-fns';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useFormContext } from 'react-hook-form';
import { selectUser } from 'app/store/user/userSlice';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { selectTypeEvents } from '../../store/typeEventsSlice';
import { WorkplanType } from '../../types/WorkplanType';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const routeParams = useParams();
	const { control, formState, watch, setValue } = methods;
	const { errors } = formState;

	const typeEvents = useAppSelector(selectTypeEvents);
	const { id } = useAppSelector(selectUser);

	const { userId, startDate } = watch() as WorkplanType;

	const [listeningField, setListeningField] = useState<string | null>(null);
	const recognitionRef = useRef<any>(null);

	const toggleListening = (fieldName: string, onChange: (val: string) => void, currentValue: string) => {
		const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		
		if (!SpeechRecognition) {
			alert('El reconocimiento de voz no está soportado en este navegador. Por favor use Google Chrome.');
			return;
		}

		if (listeningField === fieldName) {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}
			setListeningField(null);
		} else {
			if (recognitionRef.current) {
				recognitionRef.current.stop();
			}

			const recognition = new SpeechRecognition();
			recognition.continuous = true;
			recognition.interimResults = false;
			recognition.lang = 'es-ES';

			recognition.onstart = () => {
				setListeningField(fieldName);
			};

			recognition.onresult = (event: any) => {
				const transcript = event.results[event.results.length - 1][0].transcript;
				const newVal = currentValue ? `${currentValue} ${transcript}` : transcript;
				onChange(newVal);
			};

			recognition.onerror = (event: any) => {
				console.error('Speech recognition error:', event.error);
				if (recognitionRef.current) {
					recognitionRef.current.stop();
				}
				setListeningField(null);
			};

			recognition.onend = () => {
				setListeningField(null);
			};

			recognitionRef.current = recognition;
			recognition.start();
		}
	};

	useEffect(() => {
		if (!userId) {
			setValue('userId', id);
		}
	}, [userId, setValue]);

	// useEffect(() => {
	// 	setValue('startDate', parseISO(getValues('startDate') as string));
	// }, []);

	useEffect(() => {
		if (startDate) {
			setValue('endDate', startDate);
		}
	}, [startDate]);

	// maxDate.setFullYear(maxDate.getFullYear() - 18);

	return (
		<div>
			<Controller
				name="typeEventId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="typeEventId"
						className="mt-32"
						options={typeEvents || []}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => {
							// eslint-disable-next-line no-unused-expressions
							data ? field.onChange(data.id) : field.onChange(data);
						}}
						value={typeEvents.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Tipos de eventos"
								error={!!errors.typeEventId}
								helperText={errors?.typeEventId?.message as string}
							/>
						)}
						disabled={routeParams.workplanId !== 'new'}
					/>
				)}
			/>
			<div className="flex flex-col sm:flex-row gap-5">
				<Controller
					name="startDate"
					control={control}
					render={({ field }) => (
						<DateTimePicker
							{...field}
							className="mt-32"
							value={parseISO(field.value as string)}
							format="dd-MM-yyyy hh:mm a"
							slotProps={{
								textField: {
									id: 'startDate',
									label: 'Fecha',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined',
									error: !!errors.startDate,
									helperText: errors?.startDate?.message as string
								},
								inputAdornment: {
									position: 'start',
									children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
								}
							}}
							disabled={routeParams.workplanId !== 'new'}
						/>
					)}
				/>

				{/* <Controller
					name="endDate"
					control={control}
					render={({ field }) => (
						<DatePicker
							{...field}
							className="mt-32"
							value={parseISO(field.value as string)}
							format="dd-MM-yyyy"
							maxDate={startDate}
							minDate={startDate}
							slotProps={{
								textField: {
									id: 'endDate',
									label: 'Hora Fin',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined',
									error: !!errors.endDate,
									helperText: errors?.endDate?.message as string
								},
								inputAdornment: {
									position: 'start',
									children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
								}
							}}
						/>
					)}
				/> */}
			</div>

			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-32"
						id="description"
						label="Descripción"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="self-start mt-8">
									<IconButton
										onClick={() => toggleListening('description', field.onChange, field.value as string)}
										color={listeningField === 'description' ? 'error' : 'default'}
										title={listeningField === 'description' ? 'Detener dictado' : 'Dictar por voz'}
									>
										<FuseSvgIcon size={20}>
											{listeningField === 'description' ? 'heroicons-solid:microphone' : 'heroicons-outline:microphone'}
										</FuseSvgIcon>
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
