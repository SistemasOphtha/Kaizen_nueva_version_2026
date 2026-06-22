import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'app/store';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { ChangeEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';
import { selectSearchText, setThirdsSearchText, getThirds } from '../store/thirdsSlice';
import { selectUser } from 'app/store/user/userSlice';
import { selectThirdTypes, getThirdTypes } from '../store/thirdTypesSlice';
import { selectThirdClassifications, getThirdClassifications } from '../store/thirdClassificationsSlice';
import { selectThirdSpecialtys, getThirdSpecialtys } from '../store/thirdSpecialtysSlice';
import { selectThirdRegions, getThirdRegions } from '../store/thirdRegionsSlice';
import { selectThirdSubSpecialtys, getThirdSubSpecialtys } from '../store/thirdSubSpecialtysSlice';
import ThirdModel from '../models/ThirdModel';
import { ThirdType } from '../types/ThirdType';
import { importThird } from '../store/thirdSlice';

/**
 * The thirds header.
 */

type ImportResultsType = {
	status: string;
	row: number;
	message: string;
	data?: ThirdType;
};

function ThirdsHeader() {
	const dispatch = useAppDispatch();
	const searchText = useAppSelector(selectSearchText);
	const { role } = useAppSelector(selectUser);
	const { t } = useTranslation('thirdPage');
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [importResults, setImportResults] = useState<{
		open: boolean;
		success: number;
		failed: number;
		details: Array<{
			row: number;
			status: 'success' | 'failed';
			message: string;
			data: ThirdType;
		}>;
	}>({
		open: false,
		success: 0,
		failed: 0,
		details: []
	});

	// Lookups for mapping names -> IDs
	const thirdTypes = useAppSelector(selectThirdTypes);
	const thirdClassifications = useAppSelector(selectThirdClassifications);
	const thirdSpecialtys = useAppSelector(selectThirdSpecialtys);
	const thirdSubSpecialtys = useAppSelector(selectThirdSubSpecialtys);
	const thirdRegions = useAppSelector(selectThirdRegions);

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const downloadMenuRef = useRef<HTMLButtonElement | null>(null);

	function normalize(str: string): string {
		return (str || '')
			.toString()
			.trim()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');
	}

	function s(v: unknown): string {
		return String(v ?? '');
	}

	function n(v: unknown): number {
		const num = Number(v);
		return Number.isFinite(num) ? num : 0;
	}

	type RowMap = {
		[key: string]: unknown;
		tipo?: unknown;
		tipotercero?: unknown;
		nombreadministrador?: unknown;
		apellido?: unknown;
		genero?: unknown;
		tipoidentificacion?: unknown;
		identificacion?: unknown;
		nombre?: unknown;
		correo?: unknown;
		direccion?: unknown;
		telefono?: unknown;
		celular?: unknown;
		ciudad?: unknown;
		fechanacimiento?: unknown;
		impacto?: unknown;
		sesurtepor?: unknown;
		estado?: unknown;
		clasificacion?: unknown;
		especialidad?: unknown;
		region?: unknown;
	};

	async function ensureLookups(): Promise<void> {
		if (!thirdTypes || thirdTypes.length === 0) {
			await dispatch(getThirdTypes());
		}
		if (!thirdClassifications || thirdClassifications.length === 0) {
			await dispatch(getThirdClassifications());
		}
		if (!thirdSpecialtys || thirdSpecialtys.length === 0) {
			await dispatch(getThirdSpecialtys());
		}
		if (!thirdRegions || thirdRegions.length === 0) {
			await dispatch(getThirdRegions());
		}
		if (!thirdSubSpecialtys || thirdSubSpecialtys.length === 0) {
			await dispatch(getThirdSubSpecialtys());
		}
	}

	function getIdByName(name: string, list: Array<{ id: number; name: string }>): number {
		const n = normalize(name);
		const found = list?.find((x) => normalize(x.name) === n);
		return found ? found.id : 0;
	}

	function getByNameAndIdSpecialty(
		name: string,
		idSpecialty: number,
		list: Array<{ id: number; name: string; specialtyId: number }>
	): number {
		const n = normalize(name);
		const found = list?.find((x) => normalize(x.name) === n && x.specialtyId === idSpecialty);
		return found ? found.id : 0;
	}

	function inferTypeName(rowMap: RowMap): string {
		const tipo = rowMap.tipo_panel || rowMap.tipo || rowMap.tipotercero || '';
		if (tipo) {
			const t = normalize(s(tipo));
			if (t.includes('medico')) return 'Medico';
			if (t.includes('drogeria') || t.includes('drogueria')) return 'Drogueria';
			if (t.includes('comercial')) return 'Comercial';
		}
		if (rowMap.nombreadministrador || rowMap.nombre_administrador) return 'Drogueria';
		if (rowMap.apellido || rowMap.genero) return 'Medico';
		return 'Comercial';
	}

	function convertirFechaDM(fechaStr: string): string {
		if (!fechaStr) return new Date(2007, 0, 1).toISOString();
		const parts = fechaStr.split('-');
		if (parts.length < 2) return new Date(2007, 0, 1).toISOString();
		const dia = Number(parts[0]);
		const mes = Number(parts[1]);
		if (isNaN(dia) || isNaN(mes)) return new Date(2007, 0, 1).toISOString();
		const fecha = new Date(2007, mes - 1, dia);
		return isNaN(fecha.getTime()) ? new Date(2007, 0, 1).toISOString() : fecha.toISOString();
	}

	async function handleImportFileChange(e: ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			await ensureLookups();
			// Read latest lookup lists (fallback to freshly fetched payloads if store arrays were initially empty)
			let typesList = thirdTypes && thirdTypes.length > 0 ? thirdTypes : [];
			if (typesList.length === 0) {
				const a = await dispatch(getThirdTypes());
				if (getThirdTypes.fulfilled.match(a)) typesList = a.payload;
			}
			let classificationsList =
				thirdClassifications && thirdClassifications.length > 0 ? thirdClassifications : [];
			if (classificationsList.length === 0) {
				const a = await dispatch(getThirdClassifications());
				if (getThirdClassifications.fulfilled.match(a)) classificationsList = a.payload;
			}
			let specialtiesList = thirdSpecialtys && thirdSpecialtys.length > 0 ? thirdSpecialtys : [];
			if (specialtiesList.length === 0) {
				const a = await dispatch(getThirdSpecialtys());
				if (getThirdSpecialtys.fulfilled.match(a)) specialtiesList = a.payload;
			}
			let subSpecialtiesList = thirdSubSpecialtys && thirdSubSpecialtys.length > 0 ? thirdSubSpecialtys : [];
			if (subSpecialtiesList.length === 0) {
				const a = await dispatch(getThirdSubSpecialtys());
				if (getThirdSubSpecialtys.fulfilled.match(a)) subSpecialtiesList = a.payload;
			}
			let regionsList = thirdRegions && thirdRegions.length > 0 ? thirdRegions : [];
			if (regionsList.length === 0) {
				const a = await dispatch(getThirdRegions());
				if (getThirdRegions.fulfilled.match(a)) regionsList = a.payload;
			}
			const data = await file.arrayBuffer();
			const workbook = XLSX.read(data, { type: 'array' });
			const ws = workbook.Sheets[workbook.SheetNames[0]];
			const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: '' });

			const results = {
				success: 0,
				failed: 0,
				details: []
			};

			await rows.reduce<Promise<void>>(async (prev, row, index) => {
				await prev;
				// Build a normalized key -> value map for robust header handling
				const map: RowMap = {} as RowMap;
				Object.keys(row).forEach((k) => {
					map[normalize(k)] = row[k];
				});

				const typeName = inferTypeName(map);

				let dataThird: any = null;
				const typeId = getIdByName(typeName, typesList);
				const regionId = getIdByName(s(map.region), regionsList) || 1; // Fallback to Antioquia (ID 1)
				const status = s(map.estado) === 'Inactivo' ? 'inactive' : 'active';
				const impact = n(map.impacto) || 1;
				const typeIdentification = s(map.tipo_identificacion || 'CC');

				if (typeName === 'Medico') {
					let specialtyId = getIdByName(s(map.especialidad), specialtiesList);
					if (specialtyId === 0) specialtyId = getIdByName('Otras', specialtiesList) || 10;
					
					let subSpecialtyId = getByNameAndIdSpecialty(
						s(map.sub_especialidad),
						specialtyId,
						subSpecialtiesList
					);

					if (specialtyId === 0 || subSpecialtyId === 0) {
						results.failed += 1;
						results.details.push({
							status: 'failed',
							row: index + 1,
							message: 'Especialidad o subespecialidad no encontrada para Médico',
							data: row
						});
						return;
					}

					dataThird = {
						typeId,
						typeIdentification,
						identification: s(map.identificacion),
						name: s(map.nombre),
						additionalName: s(map.apellido),
						email: s(map.correo),
						gender: s(map.genero) === 'Masculino' ? 'M' : 'F',
						address: s(map.direccion),
						phone: s(map.telefono),
						mobile: s(map.celular),
						city: s(map.ciudad),
						birthday: convertirFechaDM(s(map.fecha_nacimiento)),
						impact,
						status,
						classificationId: getIdByName(s(map.clasificacion), classificationsList),
						specialtyId,
						regionId,
						subSpecialtyId,
						representative: s(map.representante)
					};
				} else if (typeName === 'Drogueria') {
					let specialtyId = getIdByName(s(map.especialidad || 'Otras'), specialtiesList) || 10;

					dataThird = {
						typeId,
						typeIdentification,
						identification: s(map.identificacion),
						name: s(map.nombre),
						additionalName: s(map.nombre_administrador || map.nombreadministrador),
						email: s(map.correo),
						gender: null,
						address: s(map.direccion),
						phone: s(map.telefono),
						mobile: s(map.celular),
						city: s(map.ciudad),
						birthday: convertirFechaDM(s(map.fecha_nacimiento)),
						impact,
						supplied: s(map.surtidor || map.sesurtepor),
						status,
						classificationId: null,
						specialtyId,
						regionId,
						subSpecialtyId: null,
						representative: s(map.representante)
					};
				} else { // Comercial
					let specialtyId = getIdByName(s(map.especialidad || 'Otras'), specialtiesList) || 10;

					dataThird = {
						typeId,
						typeIdentification,
						identification: s(map.identificacion),
						name: s(map.nombre),
						additionalName: null,
						email: s(map.correo),
						gender: null,
						address: s(map.direccion),
						phone: s(map.telefono),
						mobile: s(map.celular),
						city: s(map.ciudad),
						birthday: convertirFechaDM(s(map.fecha_nacimiento)),
						impact,
						status,
						classificationId: null,
						specialtyId,
						regionId,
						subSpecialtyId: null,
						representative: s(map.representante)
					};
				}

				const third: ThirdType = ThirdModel(dataThird as ThirdType);

				// Skip empty name/identification rows
				if (!third.name && !third.identification) {
					results.details.push({
						status: 'failed',
						row: index + 1,
						message: 'Fila vacía o sin datos obligatorios',
						data: { name: third.name, identification: third.identification }
					});
					results.failed += 1;
					return;
				}

				try {
					const action = await dispatch(importThird(third));
					if (importThird.fulfilled.match(action)) {
						results.success += 1;
						results.details.push({
							row: index + 1,
							status: 'success',
							message: 'Panel importado exitosamente',
							data: { name: third.name, identification: third.identification }
						});
					} else {
						results.failed += 1;
						results.details.push({
							row: index + 1,
							status: 'failed',
							message: 'Error al importar Panel',
							data: { name: third.name, identification: third.identification }
						});
					}
					// results.success += 1;
					// results.details.push({
					// 	status: 'success',
					// 	row: index + 1,
					// 	message: 'Tercero procesado exitosamente',
					// 	data: { name: third.name, identification: third.identification }
					// });
				} catch (error) {
					results.failed += 1;
					results.details.push({
						status: 'failed',
						row: index + 1,
						message: error instanceof Error ? error.message : 'Error desconocido',
						data: { name: third.name, identification: third.identification }
					});
				}
			}, Promise.resolve());

			await dispatch(getThirds());
			setImportResults({
				open: true,
				...results
			});
		} catch (err) {
			window.alert('Error al procesar el archivo. Ver consola para más detalles.');
			// eslint-disable-next-line no-console
			console.error(err);
		} finally {
			if (fileInputRef.current) fileInputRef.current.value = '';
		}
	}

	function triggerImport() {
		fileInputRef.current?.click();
	}

	const handleDownloadMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleDownloadMenuClose = () => {
		setAnchorEl(null);
	};

	const generateTemplate = (type: string) => {
		let templateData: unknown[] = [];

		switch (type) {
			case 'medico':
				templateData = [
					{
						tipo_panel: 'Medico',
						tipo_identificacion: 'CC',
						identificacion: '123456789',
						nombre: 'Dr. Nombre',
						apellido: 'Apellido',
						genero: 'Masculino/Femenino',
						correo: 'email@dominio.com',
						direccion: 'Dirección completa',
						telefono: 'Teléfono fijo',
						celular: 'Teléfono celular',
						ciudad: 'Ciudad',
						fecha_nacimiento: 'DD-MM',
						impacto: 'Número 1-5',
						estado: 'Activo/Inactivo',
						clasificacion: 'A/B/C',
						especialidad: 'Especialidad médica',
						sub_especialidad: 'Subespecialidad médica',
						region: 'Región',
						representante: 'email@gmail.com'
					}
				];
				break;
			case 'drogeria':
				templateData = [
					{
						tipo_panel: 'Drogeria',
						tipo_identificacion: 'CC',
						identificacion: '123456789',
						nombre: 'Dr. Nombre',
						nombre_administrador: 'Apellido',
						fecha_nacimiento: 'DD-MM',
						direccion: 'Dirección completa',
						correo: 'email@dominio.com',
						telefono: 'Teléfono fijo',
						celular: 'Teléfono celular',
						ciudad: 'Ciudad',
						especialidad: 'Otras',
						sub_especialidad: '',
						surtidor: 'Cruz Verde',
						region: 'Región',
						impacto: 'Número 1-5',
						estado: 'Activo/Inactivo',
						representante: 'email@gmail.com'
					}
				];
				break;
			case 'comercial':
				templateData = [
					{
						tipo_panel: 'Comercial',
						tipo_identificacion: 'NIT',
						identificacion: '123456789',
						nombre: 'Nombre Empresa',
						fecha_nacimiento: 'DD-MM',
						direccion: 'Dirección completa',
						correo: 'email@dominio.com',
						telefono: 'Teléfono fijo',
						celular: 'Teléfono celular',
						ciudad: 'Ciudad',
						especialidad: 'Otras',
						sub_especialidad: '',
						region: 'Región',
						impacto: 'Número 1-5',
						estado: 'Activo/Inactivo',
						representante: 'email@gmail.com'
					}
				];
				break;
			default:
				templateData = [];
		}

		const wb = XLSX.utils.book_new();
		const ws = XLSX.utils.json_to_sheet(templateData);

		// Ajustar anchos de columna
		const colWidths = Object.keys(templateData[0]).map(() => ({ width: 25 }));
		ws['!cols'] = colWidths;

		XLSX.utils.book_append_sheet(wb, ws, `${type.charAt(0).toUpperCase() + type.slice(1)}`);
		XLSX.writeFile(wb, `plantilla_${type}.xlsx`);

		handleDownloadMenuClose();
	};

	return (
		<div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 flex-1 w-full items-center justify-between py-32 px-24 md:px-32">
			<motion.span
				initial={{ x: -20 }}
				animate={{ x: 0, transition: { delay: 0.2 } }}
			>
				<Typography className="text-24 md:text-32 font-extrabold tracking-tight">{t('TITLE')}</Typography>
			</motion.span>
			<div className="flex flex-col w-full sm:w-auto sm:flex-row space-y-16 sm:space-y-0 flex-1 items-center justify-end space-x-8">
				<Paper
					component={motion.div}
					initial={{ y: -20, opacity: 0 }}
					animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
					className="flex items-center w-full sm:max-w-256 space-x-8 px-16 rounded-full border-1 shadow-0"
				>
					<FuseSvgIcon color="disabled">heroicons-solid:search</FuseSvgIcon>

					<Input
						placeholder="Buscar paneles"
						className="flex flex-1"
						disableUnderline
						fullWidth
						value={searchText}
						inputProps={{
							'aria-label': 'Search'
						}}
						onChange={(ev: ChangeEvent<HTMLInputElement>) => {
							dispatch(setThirdsSearchText(ev));
						}}
					/>
				</Paper>
				<input
					ref={fileInputRef}
					type="file"
					accept=".xlsx,.xls"
					onChange={handleImportFileChange}
					style={{ display: 'none' }}
				/>
				{role.includes('Administrador') && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
					>
						<Button
							ref={downloadMenuRef}
							variant="outlined"
							color="primary"
							onClick={handleDownloadMenuOpen}
							startIcon={<FuseSvgIcon>heroicons-outline:download</FuseSvgIcon>}
						>
							Descargar Plantilla
						</Button>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleDownloadMenuClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right'
							}}
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
						>
							<MenuItem onClick={() => generateTemplate('medico')}>Plantilla Médico</MenuItem>
							<MenuItem onClick={() => generateTemplate('drogeria')}>Plantilla Drogería</MenuItem>
							<MenuItem onClick={() => generateTemplate('comercial')}>Plantilla Comercial</MenuItem>
						</Menu>
					</motion.div>
				)}
				{role.includes('Administrador') && (
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
					>
						<Button
							variant="outlined"
							color="primary"
							onClick={triggerImport}
							startIcon={<FuseSvgIcon>heroicons-outline:upload</FuseSvgIcon>}
						>
							Importar
						</Button>
					</motion.div>
				)}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
				>
					<Button
						component={Link}
						to="/records/thirds/new"
						variant="contained"
						color="secondary"
						startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
					>
						Agregar
					</Button>
				</motion.div>
			</div>

			{/* Modal de resultados de importación */}
			<Dialog
				open={importResults.open}
				onClose={() => setImportResults({ ...importResults, open: false })}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>
					<div className="flex items-center">
						<FuseSvgIcon className="mr-8 text-green-600">heroicons-outline:check-circle</FuseSvgIcon>
						Resultados de Importación
					</div>
				</DialogTitle>
				<DialogContent>
					<div className="mb-16">
						<div className="flex items-center justify-between mb-16">
							<Typography
								variant="h6"
								className="text-green-600"
							>
								Éxitos: {importResults.success}
							</Typography>
							<Typography
								variant="h6"
								className="text-red-600"
							>
								Fallos: {importResults.failed}
							</Typography>
						</div>

						{importResults.details.length > 0 && (
							<List className="max-h-400 overflow-y-auto">
								{importResults.details.map((item: ImportResultsType, index) => (
									<ListItem
										key={index}
										className="px-0"
									>
										<ListItemIcon>
											<FuseSvgIcon
												className={
													item.status === 'success' ? 'text-green-600' : 'text-red-600'
												}
											>
												{item.status === 'success'
													? 'heroicons-outline:check-circle'
													: 'heroicons-outline:x-circle'}
											</FuseSvgIcon>
										</ListItemIcon>
										<ListItemText
											primary={`Fila ${item.row}: ${item.data?.name || 'Sin nombre'}`}
											secondary={
												<Box className="flex items-center gap-8">
													{item.message}
													{item.data?.identification && (
														<Chip
															label={item.data.identification}
															size="small"
															variant="outlined"
														/>
													)}
												</Box>
											}
										/>
									</ListItem>
								))}
							</List>
						)}

						{importResults.details.length === 0 && (
							<div className="text-center py-32">
								<FuseSvgIcon className="text-48 text-gray-400 mb-16">
									heroicons-outline:information-circle
								</FuseSvgIcon>
								<Typography color="textSecondary">
									No se encontraron detalles de importación.
								</Typography>
							</div>
						)}
					</div>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => setImportResults({ ...importResults, open: false })}
						color="primary"
					>
						Cerrar
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default ThirdsHeader;
