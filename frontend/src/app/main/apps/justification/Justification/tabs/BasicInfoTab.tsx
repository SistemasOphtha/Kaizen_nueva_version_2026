import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useAppSelector } from 'app/store';
import { useParams } from 'react-router-dom';
// import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useFormContext } from 'react-hook-form';
import { useState, useEffect, useRef } from 'react';
import { selectUser } from 'app/store/user/userSlice';
import { selectThirds } from '../../../../records/third/store/thirdsSlice';
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

	const thirds = useAppSelector(selectThirds);
	const { id } = useAppSelector(selectUser);
	const { dateToJustify, userId, date } = watch() as { dateToJustify: string; userId: number; date: string };

	const [isBlocked, setIsBlocked] = useState<boolean>(false);
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
		if (routeParams.thirdId) {
			setValue('thirdId', Number(routeParams.thirdId));
		}

		setIsBlocked(verifyDateJustify(dateToJustify));
	}, []);

	useEffect(() => {
		if (!userId) {
			setValue('userId', id);
		}
	}, [userId, setValue]);

	const verifyDateJustify = (date: string) => {
		if (!date) {
			return true;
		}
		const dateJustify = new Date(date);
		const dateNow = new Date();
		if (dateJustify.getFullYear() !== dateNow.getFullYear()) {
			return false;
		}
		if (dateJustify.getMonth() !== dateNow.getMonth() - 1) {
			return false;
		}
		return true;
	};

	// const maxDate = new Date();
	// maxDate.setFullYear(maxDate.getFullYear() - 18);

	return (
		<div>
			<Controller
				name="thirdId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="thirdId"
						className="mt-32"
						options={thirds || []}
						getOptionLabel={(option) =>
							`${option.identification} - ${option.name} ${option.additionalName}` || ''
						}
						onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
						value={thirds.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => (
							<MenuItem {...props}>
								{option.identification} {option.name} {option.additionalName}
							</MenuItem>
						)}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Tercero"
								error={!!errors.thirdId}
								helperText={errors?.thirdId?.message as string}
							/>
						)}
						disabled={routeParams.justificationId !== 'new'}
					/>
				)}
			/>
			{date && (
				<Controller
					name="date"
					control={control}
					render={({ field }) => (
						<DateTimePicker
							{...field}
							className="mt-32"
							value={new Date(field.value as string)}
							format="dd-MM-yyyy hh:mm a"
							slotProps={{
								textField: {
									id: 'date',
									label: 'Fecha de registro',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined',
									error: !!errors.date,
									helperText: errors?.date?.message as string
								},
								inputAdornment: {
									position: 'start',
									children: <FuseSvgIcon size={20}>heroicons-solid:cake</FuseSvgIcon>
								}
							}}
							disabled={routeParams.justificationId !== 'new'}
						/>
					)}
				/>
			)}

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
						disabled={!isBlocked}
						multiline
						rows={5}
						variant="outlined"
						fullWidth
						error={!!errors.description}
						helperText={errors?.description?.message as string}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="self-start mt-8">
									<IconButton
										onClick={() => toggleListening('description', field.onChange, field.value as string)}
										color={listeningField === 'description' ? 'error' : 'default'}
										title={listeningField === 'description' ? 'Detener dictado' : 'Dictar por voz'}
										disabled={!isBlocked}
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
