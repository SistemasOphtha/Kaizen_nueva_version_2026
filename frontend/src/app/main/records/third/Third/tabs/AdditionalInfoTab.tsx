import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { useAppSelector } from 'app/store';
// import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { selectThirdClassifications } from '../../store/thirdClassificationsSlice';
import { selectThirdSpecialtys } from '../../store/thirdSpecialtysSlice';
import { selectThirdSubSpecialtys } from '../../store/thirdSubSpecialtysSlice';
import { selectThirdRegions } from '../../store/thirdRegionsSlice';
import { ThirdSpecialtyType } from '../../types/ThirdSpecialtyType';
import { ThirdType } from '../../types/ThirdType';
/**
 * The basic info tab.
 */

interface Props {
	setTabValue: (value: number) => void;
}

function AdditionalInfoTab({ setTabValue }: Props) {
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const routeParams = useParams();
	const { errors } = formState;

	const { thirdId } = routeParams;

	const fileInputRef = useRef<HTMLInputElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [signatureModalOpen, setSignatureModalOpen] = useState(false);
	const [isSavingSignature, setIsSavingSignature] = useState(false);
	const [isUploadingFile, setIsUploadingFile] = useState(false);
	const [viewerOpen, setViewerOpen] = useState(false);

	const habeasDataConsent = watch('habeasDataConsent');
	const habeasDataFileUrl = watch('habeasDataFileUrl');
	const habeasDataSignature = watch('habeasDataSignature');

	// Canvas drawing handlers
	const startDrawing = (e: any) => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		setIsDrawing(true);
		
		const rect = canvas.getBoundingClientRect();
		let clientX = 0;
		let clientY = 0;

		if (e.touches && e.touches.length > 0) {
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		ctx.beginPath();
		ctx.moveTo(clientX - rect.left, clientY - rect.top);
	};

	const draw = (e: any) => {
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		let clientX = 0;
		let clientY = 0;

		if (e.touches && e.touches.length > 0) {
			if (e.cancelable) {
				e.preventDefault();
			}
			clientX = e.touches[0].clientX;
			clientY = e.touches[0].clientY;
		} else {
			clientX = e.clientX;
			clientY = e.clientY;
		}

		ctx.lineTo(clientX - rect.left, clientY - rect.top);
		ctx.stroke();
	};

	const stopDrawing = () => {
		setIsDrawing(false);
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	const handleSaveSignature = async () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		
		const signatureBase64 = canvas.toDataURL('image/png');
		
		setIsSavingSignature(true);
		try {
			const response = await axios.post(`/api/thirds/${thirdId}/signature`, {
				signature: signatureBase64
			});
			if (response.data && response.data.success) {
				const signatureUrl = response.data.data.signatureUrl;
				methods.setValue('habeasDataConsent', true);
				methods.setValue('habeasDataSignature', signatureUrl);
				setSignatureModalOpen(false);
			} else {
				window.alert('Error al guardar la firma digital');
			}
		} catch (err) {
			console.error(err);
			window.alert('Error al guardar la firma digital en el servidor');
		} finally {
			setIsSavingSignature(false);
		}
	};

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);

		setIsUploadingFile(true);
		try {
			const response = await axios.post(`/api/thirds/${thirdId}/habeas-data`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
			if (response.data && response.data.success) {
				const fileUrl = response.data.data.fileUrl;
				methods.setValue('habeasDataConsent', true);
				methods.setValue('habeasDataFileUrl', fileUrl);
				window.alert('Documento de Habeas Data subido exitosamente');
			} else {
				window.alert('Error al subir el documento');
			}
		} catch (err) {
			console.error(err);
			window.alert('Error al subir el archivo al servidor');
		} finally {
			setIsUploadingFile(false);
			if (fileInputRef.current) fileInputRef.current.value = '';
		}
	};

	useEffect(() => {
		if (signatureModalOpen) {
			setTimeout(() => {
				const canvas = canvasRef.current;
				if (canvas) {
					const ctx = canvas.getContext('2d');
					if (ctx) {
						ctx.lineWidth = 3;
						ctx.lineCap = 'round';
						ctx.strokeStyle = '#000000';
					}
				}
			}, 100);
		}
	}, [signatureModalOpen]);

	const [selectedSpecialty, setSelectedSpecialty] = useState<ThirdSpecialtyType>(null);

	const thirdClassifications = useAppSelector(selectThirdClassifications);
	const thirdSpecialtys = useAppSelector(selectThirdSpecialtys);
	const thirdSubSpecialtys = useAppSelector(selectThirdSubSpecialtys);
	const thirdRegions = useAppSelector(selectThirdRegions);

	const { typeId, specialtyId } = watch() as ThirdType;

	useEffect(() => {
		if (specialtyId) {
			const specialty = thirdSpecialtys.find((item) => item.id === specialtyId);
			setSelectedSpecialty(specialty);
		}
	}, [specialtyId]);

	// Calcula la fecha de hace 18 años a partir de la fecha actual
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - 18);

	const impactItem = [
		{ label: '1', name: 1 },
		{ label: '2', name: 2 },
		{ label: '3', name: 3 },
		{ label: '4', name: 4 },
		{ label: '5', name: 5 }
	];

	const suppliedItem = [
		{ label: 'Cafam', name: 'Cafam' },
		{ label: 'Colsubsidio', name: 'Colsubsidio' },
		{ label: 'Comfandi', name: 'Comfandi' },
		{ label: 'Coopidrogas', name: 'Coopidrogas' },
		{ label: 'Copservir (Rebaja)', name: 'Copservir (Rebaja)' },
		{ label: 'Cruz Verde', name: 'Cruz Verde' },
		{ label: 'Deposito Principal de Drogas', name: 'Deposito Principal de Drogas' },
		{ label: 'Deposito Profesional', name: 'Deposito Profesional' },
		{ label: 'Deprosito Paris', name: 'Deprosito Paris' },
		{ label: 'Distribuciones AXA', name: 'Distribuciones AXA' },
		{ label: 'Distribuidora Pasteur', name: 'Distribuidora Pasteur' },
		{ label: 'Drogas S & S', name: 'Drogas S & S' },
		{ label: 'Dropopular', name: 'Dropopular' },
		{ label: 'Drosur', name: 'Drosur' },
		{ label: 'Eticos Serrano', name: 'Eticos Serrano' },
		{ label: 'Farmatodo', name: 'Farmatodo' },
		{ label: 'Gedecol', name: 'Gedecol' },
		{ label: 'H y V CIA LTDA', name: 'H y V CIA LTDA' },
		{ label: 'Internacional de Drogas', name: 'Internacional de Drogas' },
		{ label: 'JN Distibuciones', name: 'JN Distibuciones' },
		{ label: 'Locatel', name: 'Locatel' },
		{ label: 'Mercados Zapatoca', name: 'Mercados Zapatoca' },
		{ label: 'Monaco', name: 'Monaco' },
		{ label: 'Multidrogas', name: 'Multidrogas' },
		{ label: 'Olimpica', name: 'Olimpica' },
		{ label: 'Promotora', name: 'Promotora' },
		{ label: 'Roma', name: 'Roma' },
		{ label: 'Tiendas de la Piel', name: 'Tiendas de la Piel' },
		{ label: 'Unidrogas', name: 'Unidrogas' }
	];

	return (
		<div>
			{typeId === 1 ? (
				<Controller
					name="classificationId"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="classificationId"
							className="mt-8 mb-16"
							options={thirdClassifications || []}
							getOptionLabel={(option) => option.name}
							onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
							value={thirdClassifications.find((item) => item.id === field.value) || null}
							renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label="Clasificación"
									error={!!errors.classificationId}
									helperText={errors?.classificationId?.message as string}
								/>
							)}
						/>
					)}
				/>
			) : null}

			<Controller
				name="specialtyId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="specialtyId"
						className="mt-8 mb-16"
						options={thirdSpecialtys || []}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => {
							setSelectedSpecialty(data);
							// eslint-disable-next-line no-unused-expressions
							data ? field.onChange(data.id) : field.onChange(data);
						}}
						value={thirdSpecialtys.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Especialidad"
								error={!!errors.specialtyId}
								helperText={errors?.specialtyId?.message as string}
							/>
						)}
					/>
				)}
			/>

			{selectedSpecialty && (
				<Controller
					name="subSpecialtyId"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="subSpecialtyId"
							className="mt-8 mb-16"
							options={
								thirdSubSpecialtys.filter((item) => item.specialtyId === selectedSpecialty.id) || []
							}
							getOptionLabel={(option) => option.name}
							onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
							value={thirdSubSpecialtys.find((item) => item.id === field.value) || null}
							renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									label="Sub Especialidad"
									error={!!errors.subSpecialtyId}
									helperText={errors?.subSpecialtyId?.message as string}
								/>
							)}
						/>
					)}
				/>
			)}

			<Controller
				name="regionId"
				control={control}
				render={({ field }) => (
					<Autocomplete
						id="regionId"
						className="mt-8 mb-16"
						options={thirdRegions || []}
						getOptionLabel={(option) => option.name}
						onChange={(_, data) => (data ? field.onChange(data.id) : field.onChange(data))}
						value={thirdRegions.find((item) => item.id === field.value) || null}
						renderOption={(props, option) => <MenuItem {...props}>{option.name}</MenuItem>}
						fullWidth
						renderInput={(params) => (
							<TextField
								{...params}
								label="Región"
								required
								error={!!errors.regionId}
								helperText={errors?.regionId?.message as string}
							/>
						)}
					/>
				)}
			/>

			{typeId === 2 ? (
				<Controller
					name="supplied"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="supplied"
							className="mt-8 mb-16"
							autoFocus
							options={suppliedItem}
							getOptionLabel={(option) => option.name}
							onChange={(_, data) => (data ? field.onChange(data.name) : field.onChange(data))}
							value={suppliedItem.find((item) => item.name === field.value) || null}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									required
									label="Se surte por"
									error={!!errors.supplied}
									helperText={errors?.supplied?.message as string}
								/>
							)}
						/>
					)}
				/>
			) : null}
			<div className="flex flex-col sm:flex-row gap-5">
				<Controller
					name="impact"
					control={control}
					render={({ field }) => (
						<Autocomplete
							id="impact"
							className="mt-8 mb-16"
							autoFocus
							disabled={thirdId !== 'new'}
							options={impactItem}
							getOptionLabel={(option) => option.label}
							onChange={(_, data) => (data ? field.onChange(data.name) : field.onChange(data))}
							value={impactItem.find((item) => item.name === field.value) || null}
							fullWidth
							renderInput={(params) => (
								<TextField
									{...params}
									required
									label="Impacto"
									error={!!errors.impact}
									helperText={errors?.impact?.message as string}
								/>
							)}
						/>
					)}
				/>

				<Controller
					name="status"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mt-8 mb-16"
							required
							label="Estado"
							id="status"
							select
							variant="outlined"
							fullWidth
							error={!!errors.status}
							helperText={errors?.status?.message as string}
						>
							<MenuItem value="active">Activo</MenuItem>
							<MenuItem value="inactive">Inactivo</MenuItem>
						</TextField>
					)}
				/>
			</div>

			{thirdId !== 'new' && (
				<Box className="mt-24 mb-32 p-16 border-1 rounded-8 border-gray-300 bg-gray-50">
					<Typography variant="h6" className="mb-12 font-bold text-16">
						Consentimiento Habeas Data y Firma Digital
					</Typography>

					<Box className="mb-16 p-16 border-1 border-gray-300 rounded-4 bg-white max-h-192 overflow-y-auto">
						<Typography variant="body2" color="text.secondary">
							<strong>DOCUMENTO DE CONSENTIMIENTO GENERAL (Borrador)</strong>
							<br /><br />
							De acuerdo con lo establecido en la Ley Estatutaria 1581 de 2012 y sus decretos reglamentarios, autorizo de manera previa, expresa, libre y voluntaria a LABORATORIO OPTA, para que recolecte, almacene, use, circule y suprima mis datos personales.
							<br /><br />
							Entiendo que esta autorización se otorga para fines comerciales, operativos, de contacto y demás finalidades estrictamente relacionadas con la actividad de la empresa.
							<br /><br />
							<em>[El cliente enviará el texto definitivo para reemplazar este contenido].</em>
						</Typography>
					</Box>
					
					<Box className="flex flex-col gap-16 md:flex-row md:items-center">
						<Box className="flex-1">
							<Typography variant="subtitle2" className="font-semibold text-gray-700">
								Estado del consentimiento:
							</Typography>
							<Typography variant="body2" color={habeasDataConsent ? 'success.main' : 'text.secondary'} className="font-bold">
								{habeasDataConsent ? '✓ Otorgado' : '✗ Pendiente'}
							</Typography>
						</Box>

						<Box className="flex flex-wrap gap-12">
							<input
								type="file"
								ref={fileInputRef}
								onChange={handleFileUpload}
								accept=".pdf,.jpg,.jpeg,.png"
								style={{ display: 'none' }}
							/>
							<Button
								variant="outlined"
								color="primary"
								disabled={isUploadingFile}
								onClick={() => fileInputRef.current?.click()}
							>
								{isUploadingFile ? 'Subiendo...' : habeasDataFileUrl ? 'Actualizar Documento' : 'Subir Documento'}
							</Button>

							<Button
								variant="outlined"
								color="secondary"
								onClick={() => setSignatureModalOpen(true)}
							>
								{habeasDataSignature ? 'Actualizar Firma' : 'Firmar en Pantalla'}
							</Button>
						</Box>
					</Box>

					{(habeasDataFileUrl || habeasDataSignature) && (
						<Box className="mt-16 pt-16 border-t-1 border-gray-200 flex flex-col gap-12">
							{habeasDataFileUrl && (
								<Typography variant="body2">
									<strong>Documento cargado:</strong>{' '}
									<Button
										variant="text"
										color="primary"
										onClick={() => setViewerOpen(true)}
										className="underline"
									>
										Ver Documento
									</Button>
								</Typography>
							)}

							{habeasDataSignature && (
								<Box>
									<Typography variant="body2" className="mb-4">
										<strong>Firma del cliente:</strong>
									</Typography>
									<Box className="inline-block p-8 border-1 border-gray-300 rounded-4 bg-white">
										<img
											src={habeasDataSignature.startsWith('/') ? `http://localhost:4001${habeasDataSignature}` : habeasDataSignature}
											alt="Firma Digital"
											style={{ maxHeight: '80px', display: 'block' }}
										/>
									</Box>
								</Box>
							)}
						</Box>
					)}
				</Box>
			)}

			<Dialog
				open={signatureModalOpen}
				onClose={() => setSignatureModalOpen(false)}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>Firma Digital de Consentimiento</DialogTitle>
				<DialogContent>
					<Typography variant="body2" className="mb-12 text-gray-600">
						Por favor, dibuje su firma dentro del recuadro usando su mouse o pantalla táctil.
					</Typography>
					<Box
						sx={{
							border: '2px dashed #9e9e9e',
							borderRadius: '8px',
							width: '100%',
							height: '220px',
							backgroundColor: '#fafafa',
							position: 'relative',
							overflow: 'hidden',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<canvas
							ref={canvasRef}
							width={500}
							height={200}
							style={{ cursor: 'crosshair', display: 'block' }}
							onMouseDown={startDrawing}
							onMouseMove={draw}
							onMouseUp={stopDrawing}
							onMouseLeave={stopDrawing}
							onTouchStart={startDrawing}
							onTouchMove={draw}
							onTouchEnd={stopDrawing}
						/>
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={clearCanvas} color="inherit">
						Limpiar
					</Button>
					<Button onClick={() => setSignatureModalOpen(false)} color="inherit">
						Cancelar
					</Button>
					<Button
						onClick={handleSaveSignature}
						variant="contained"
						color="primary"
						disabled={isSavingSignature}
					>
						{isSavingSignature ? 'Guardando...' : 'Guardar Firma'}
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={viewerOpen}
				onClose={() => setViewerOpen(false)}
				maxWidth="lg"
				fullWidth
			>
				<DialogTitle>Documento Habeas Data</DialogTitle>
				<DialogContent>
					{habeasDataFileUrl && (
						<iframe
							src={habeasDataFileUrl.startsWith('/') ? `http://localhost:4001${habeasDataFileUrl}` : habeasDataFileUrl}
							width="100%"
							height="600px"
							style={{ border: 'none' }}
							title="Documento Habeas Data"
						/>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setViewerOpen(false)} color="primary">
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>

			<Button
				variant="contained"
				color="primary"
				size="small"
				className="mb-16"
				onClick={() => {
					setTabValue(1);
				}}
			>
				Anterior
			</Button>
		</div>
	);
}

export default AdditionalInfoTab;
