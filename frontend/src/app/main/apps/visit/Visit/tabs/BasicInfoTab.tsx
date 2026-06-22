import TextField from '@mui/material/TextField';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { DatePicker } from '@mui/x-date-pickers';
import { useAppSelector } from 'app/store';
// import moment from 'moment';
import Autocomplete from '@mui/material/Autocomplete';
import MenuItem from '@mui/material/MenuItem';
import { Controller, useFormContext } from 'react-hook-form';
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { selectUser } from 'app/store/user/userSlice';
import { ThirdTypeType } from '../../../../records/third/types/ThirdTypeType';
// import { VisitType } from '../../types/VisitType';
import { selectThirds } from '../../../../records/third/store/thirdsSlice';
import { selectThird } from '../../../../records/third/store/thirdSlice';
import { selectThirdTypes } from '../../../../records/third/store/thirdTypesSlice';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

/**
 * The basic info tab.
 */
function BasicInfoTab() {
	const methods = useFormContext();
	const routeParams = useParams();
	const { control, formState, watch, setValue, resetField } = methods;
	const { errors } = formState;

	const [selectedType, setSelectedType] = useState<ThirdTypeType>(null);
	const thirdTypes = useAppSelector(selectThirdTypes);
	const { id } = useAppSelector(selectUser);

	// const { data: third } = useAppSelector(selectThird);
	const thirds = useAppSelector(selectThirds);
	const third = useAppSelector(selectThird);

	const typeId = watch('typeId') as number;
	const userId = watch('userId') as number;

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
		if (typeId) {
			resetField('thirdId');
			const type = thirdTypes.find((item) => item.id === typeId);
			setSelectedType(type);
		}

		if (routeParams.thirdId) {
			setValue('thirdId', Number(routeParams.thirdId));
			setValue('typeId', third.data?.typeId);
		}
	}, [typeId]);

	useEffect(() => {
		if (!userId) {
			setValue('userId', id);
		}
	}, [userId, setValue]);

	const maxDate = new Date();
	// maxDate.setFullYear(maxDate.getFullYear() - 18);

	return (
		<div>
			<Controller
				name="typeId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="typeId"
						className="mt-32"
						options={thirdTypes || []}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-call
							setSelectedType(data);
							// eslint-disable-next-line no-unused-expressions
							data ? field.onChange(data.id) : field.onChange(data);
						}}
						value={thirdTypes.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Tipo de panel"
								error={!!errors.typeId}
								helperText={errors?.typeId?.message as string}
							/>
						)}
						disabled={routeParams.visitId !== 'new'}
					/>
				)}
			/>

			{selectedType && (
				<Controller
					name="thirdId"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="thirdId"
							className="mt-32"
							options={thirds.filter((item) => item.typeId === selectedType.id) || []}
							getOptionLabel={(option) => `${option.name} ${option.additionalName}`}
							onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
							value={thirds.find((item) => item.id === field.value) || null}
							renderOption={(props, option) => (
								<MenuItem {...props}>
									{option.typeIdentification} {option.identification} - {option.name}{' '}
									{option.additionalName}
								</MenuItem>
							)}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label="Panel"
									error={!!errors.thirdId}
									helperText={errors?.thirdId?.message as string}
								/>
							)}
							disabled={routeParams.visitId !== 'new'}
						/>
					)}
				/>
			)}

			<Controller
				name="date"
				control={control}
				render={({ field }) => (
					<DatePicker
						{...field}
						className="mt-32"
						value={new Date(field.value as string)}
						format="dd-MM-yyyy"
						minDate={maxDate}
						slotProps={{
							textField: {
								id: 'date',
								label: 'Fecha visita',
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
						disabled={routeParams.visitId !== 'new'}
					/>
				)}
			/>

			<Controller
				name="objective"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-32"
						id="objective"
						label="Objetivo de la visita"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
						error={!!errors.objective}
						helperText={errors?.objective?.message as string}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="self-start mt-8">
									<IconButton
										onClick={() => toggleListening('objective', field.onChange, field.value as string)}
										color={listeningField === 'objective' ? 'error' : 'default'}
										title={listeningField === 'objective' ? 'Detener dictado' : 'Dictar por voz'}
									>
										<FuseSvgIcon size={20}>
											{listeningField === 'objective' ? 'heroicons-solid:microphone' : 'heroicons-outline:microphone'}
										</FuseSvgIcon>
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
				)}
			/>

			<Controller
				name="comment"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-32"
						id="comment"
						label="Comentario de la visita"
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
						InputProps={{
							endAdornment: (
								<InputAdornment position="end" className="self-start mt-8">
									<IconButton
										onClick={() => toggleListening('comment', field.onChange, field.value as string)}
										color={listeningField === 'comment' ? 'error' : 'default'}
										title={listeningField === 'comment' ? 'Detener dictado' : 'Dictar por voz'}
									>
										<FuseSvgIcon size={20}>
											{listeningField === 'comment' ? 'heroicons-solid:microphone' : 'heroicons-outline:microphone'}
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
