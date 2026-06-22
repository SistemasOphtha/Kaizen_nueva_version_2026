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
import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useParams } from 'react-router-dom';
import { selectTypeEvents } from '../../store/typeEventsSlice';
import { WorkplanType } from '../../types/WorkplanType';

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

	const [isListening, setIsListening] = useState(false);

	const handleDictation = () => {
		const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
		if (!SpeechRecognition) {
			alert('El navegador no soporta el reconocimiento de voz.');
			return;
		}

		const recognition = new SpeechRecognition();
		recognition.lang = 'es-ES';
		recognition.continuous = false;
		recognition.interimResults = false;

		recognition.onstart = () => {
			setIsListening(true);
		};

		recognition.onresult = (event: any) => {
			const transcript = event.results[0][0].transcript;
			const currentVal = watch('description') || '';
			setValue('description', currentVal ? `${currentVal} ${transcript}` : transcript, { shouldDirty: true });
		};

		recognition.onerror = (event: any) => {
			console.error('Speech recognition error:', event.error);
			setIsListening(false);
		};

		recognition.onend = () => {
			setIsListening(false);
		};

		recognition.start();
	};

	useEffect(() => {
		if (!userId) {
			setValue('userId', id);
		}
	}, [userId, setValue]);

	// useEffect(() => {
	// 	setValue('startDate', parseISO(getValues('startDate') as string));
	// }, []);

	// useEffect(() => {
	// 	if (startDate) {
	// 		setValue('endDate', startDate);
	// 	}
	// }, [startDate]);

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
									label: 'Fecha Inicio',
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

				<Controller
					name="endDate"
					control={control}
					render={({ field }) => (
						<DateTimePicker
							{...field}
							className="mt-32"
							value={parseISO(field.value as string)}
							format="dd-MM-yyyy hh:mm a"
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
							disabled={routeParams.workplanId !== 'new'}
						/>
					)}
				/>
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
										onClick={handleDictation}
										color={isListening ? 'error' : 'default'}
										className={isListening ? 'animate-pulse' : ''}
										title={isListening ? 'Escuchando...' : 'Dictar texto'}
									>
										<FuseSvgIcon size={20}>
											{isListening ? 'heroicons-solid:microphone' : 'heroicons-outline:microphone'}
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
