import Paper from '@mui/material/Paper';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import FuseLoading from '@fuse/core/FuseLoading';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import ExcelJS from 'exceljs';
import { memo, useState } from 'react';
// import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';
import { useAppDispatch } from 'app/store';
// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { selectUser } from 'app/store/user/userSlice';
import { generateDataExport } from '../store/widgetsSlice';
// import FilterPanelsWidgetType from '../types/FilterPanelsWidgetType';
import FilterReportForm from '../components/FilterReportForm';

/**
 * The Report widget.
 */

type reportType = {
	regions: [
		{
			name: string;
			representatives: [
				{
					name: string;
					post: string;
					assignedImpacts: number;
					impactsRealized: number;
					assignedPanels: number;
					hoursWorked?: number;
					percentageCompliance: number;
					averageVisits: number;
					assignedImpacts_1: number;
					impactsRealized_1: number;
					assignedPanels_1: number;
					hoursWorked_1?: number;
					percentageCompliance_1: number;
					averageVisits_1: number;
					assignedImpacts_2: number;
					impactsRealized_2: number;
					assignedPanels_2: number;
					hoursWorked_2?: number;
					percentageCompliance_2: number;
					averageVisits_2: number;
					assignedImpacts_3: number;
					impactsRealized_3: number;
					assignedPanels_3: number;
					hoursWorked_3?: number;
					percentageCompliance_3: number;
					averageVisits_3: number;
				}
			];
		}
	];
};

function FilterPanelsWidget() {
	// const widgets = useAppSelector(selectWidgets);
	// const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);

	const [existContent, setExistContent] = useState(true);

	// const isAdmin = () => {
	// 	if (user.role.includes('Administrador')) {
	// 		return true;
	// 	}
	// 	return false;
	// };

	const handleFilter = (region: number, date: Date) => {
		generateExcel(region, date);
	};

	const generateExcel = async (region: number, date?: Date) => {
		const filterBase64 = Buffer.from(
			JSON.stringify({
				region,
				date
			})
		).toString('base64');
		dispatch(generateDataExport(filterBase64))
			.then(async (resp) => {
				setLoading(false);
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				const report = resp.payload.report.all as reportType;

				if (report.regions.length > 0) {
					// Crear libro de Excel
					const workbook = new ExcelJS.Workbook();
					const worksheet = workbook.addWorksheet('INFORME GENERAL');

					// Configurar encabezado
					worksheet.addTable({
						name: 'Mi_Tabla',
						ref: 'A1',
						headerRow: true,
						style: {
							theme: 'TableStyleMedium2',
							showRowStripes: true
						},
						columns: [
							{ name: 'REPRESENTANTE Y REGION', filterButton: false },
							{ name: 'CARGO', filterButton: true },
							{ name: 'PANEL', filterButton: true },
							{ name: 'IMPACTOS ASIGNADOS', filterButton: true },
							{ name: 'IMPACTOS REALIZADOS', filterButton: true },
							{ name: '% CUMPLIMIENTO', filterButton: true },
							{ name: 'PROMEDIO DE VISITA POR DIA', filterButton: true }
						],
						rows: []
					});

					const table = worksheet.getTable('Mi_Tabla');

					let i = 2;
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
					report.regions.forEach((region) => {
						// Agregar título de región
						table.addRow([region.name]);
						worksheet.getCell(`A${i}`).font = { size: 12, bold: true };
						worksheet.getRow(i).eachCell((cell) => {
							cell.fill = {
								type: 'pattern',
								pattern: 'solid',
								fgColor: { argb: 'F08080' }
							};
						});
						i += 1;
						// Agregar datos de los representantes
						region.representatives.forEach((representative) => {
							table.addRow([
								representative.name,
								representative.post,
								representative.assignedPanels,
								representative.assignedImpacts,
								representative.impactsRealized,
								`${representative.percentageCompliance}%`,
								`${representative.averageVisits}%`
							]);
							worksheet.getCell(`F${i}`).numFmt = '0.00%';
							worksheet.getCell(`F${i}`).font = { size: 12, bold: true };
							i += 1;
						});
					});
					worksheet.getRow(2).eachCell((cell) => {
						cell.fill = {
							type: 'pattern',
							pattern: 'solid',
							fgColor: { argb: 'F08080' }
						};
					});
					worksheet.getColumn('A').width = 30;
					worksheet.getColumn('B').width = 10;
					worksheet.getColumn('C').width = 10;
					worksheet.getColumn('D').width = 25;
					worksheet.getColumn('E').width = 25;
					worksheet.getColumn('F').width = 20;
					worksheet.getColumn('F').numFmt = '0.00%';
					worksheet.getColumn('G').width = 30;
					table.commit();

					// MEDICO
					const worksheet1 = workbook.addWorksheet('MEDICO');

					// Configurar encabezado
					worksheet1.addTable({
						name: 'Mi_Tabla1',
						ref: 'A1',
						headerRow: true,
						style: {
							theme: 'TableStyleMedium2',
							showRowStripes: true
						},
						columns: [
							{ name: 'REPRESENTANTE Y REGION', filterButton: false },
							{ name: 'CARGO', filterButton: true },
							{ name: 'PANEL', filterButton: true },
							{ name: 'IMPACTOS ASIGNADOS', filterButton: true },
							{ name: 'IMPACTOS REALIZADOS', filterButton: true },
							{ name: '% CUMPLIMIENTO', filterButton: true },
							{ name: 'PROMEDIO DE VISITA POR DIA', filterButton: true }
						],
						rows: []
					});

					const table1 = worksheet1.getTable('Mi_Tabla1');

					let i1 = 2;
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
					report.regions.forEach((region) => {
						// Agregar título de región
						table1.addRow([region.name]);
						worksheet1.getCell(`A${i1}`).font = { size: 12, bold: true };
						worksheet1.getRow(i1).eachCell((cell) => {
							cell.fill = {
								type: 'pattern',
								pattern: 'solid',
								fgColor: { argb: 'F08080' }
							};
						});
						i1 += 1;
						// Agregar datos de los representantes
						region.representatives.forEach((representative) => {
							table1.addRow([
								representative.name,
								representative.post,
								representative.assignedPanels_1,
								representative.assignedImpacts_1,
								representative.impactsRealized_1,
								`${representative.percentageCompliance_1}%`,
								`${representative.averageVisits_1}%`
							]);
							worksheet1.getCell(`F${i1}`).numFmt = '0.00%';
							worksheet1.getCell(`F${i1}`).font = { size: 12, bold: true };
							i1 += 1;
						});
					});
					worksheet1.getRow(2).eachCell((cell) => {
						cell.fill = {
							type: 'pattern',
							pattern: 'solid',
							fgColor: { argb: 'F08080' }
						};
					});
					worksheet1.getColumn('A').width = 30;
					worksheet1.getColumn('B').width = 10;
					worksheet1.getColumn('C').width = 10;
					worksheet1.getColumn('D').width = 25;
					worksheet1.getColumn('E').width = 25;
					worksheet1.getColumn('F').width = 20;
					worksheet1.getColumn('F').numFmt = '0.00%';
					worksheet1.getColumn('G').width = 30;
					table1.commit();

					// DROGUERIA
					const worksheet2 = workbook.addWorksheet('DROGUERIA');

					// Configurar encabezado
					worksheet2.addTable({
						name: 'Mi_Tabla2',
						ref: 'A1',
						headerRow: true,
						style: {
							theme: 'TableStyleMedium2',
							showRowStripes: true
						},
						columns: [
							{ name: 'REPRESENTANTE Y REGION', filterButton: false },
							{ name: 'CARGO', filterButton: true },
							{ name: 'PANEL', filterButton: true },
							{ name: 'IMPACTOS ASIGNADOS', filterButton: true },
							{ name: 'IMPACTOS REALIZADOS', filterButton: true },
							{ name: '% CUMPLIMIENTO', filterButton: true },
							{ name: 'PROMEDIO DE VISITA POR DIA', filterButton: true }
						],
						rows: []
					});

					const table2 = worksheet2.getTable('Mi_Tabla2');

					let i2 = 2;
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
					report.regions.forEach((region) => {
						// Agregar título de región
						table2.addRow([region.name]);
						worksheet2.getCell(`A${i2}`).font = { size: 12, bold: true };
						worksheet2.getRow(i2).eachCell((cell) => {
							cell.fill = {
								type: 'pattern',
								pattern: 'solid',
								fgColor: { argb: 'F08080' }
							};
						});
						i2 += 1;
						// Agregar datos de los representantes
						region.representatives.forEach((representative) => {
							table2.addRow([
								representative.name,
								representative.post, // Cargo
								representative.assignedPanels_2,
								representative.assignedImpacts_2,
								representative.impactsRealized_2,
								`${representative.percentageCompliance_2}%`,
								`${representative.averageVisits_2}%`
							]);
							worksheet2.getCell(`F${i2}`).numFmt = '0.00%';
							worksheet2.getCell(`F${i2}`).font = { size: 12, bold: true };
							i2 += 1;
						});
					});
					worksheet2.getRow(2).eachCell((cell) => {
						cell.fill = {
							type: 'pattern',
							pattern: 'solid',
							fgColor: { argb: 'F08080' }
						};
					});
					worksheet2.getColumn('A').width = 30;
					worksheet2.getColumn('B').width = 10;
					worksheet2.getColumn('C').width = 10;
					worksheet2.getColumn('D').width = 25;
					worksheet2.getColumn('E').width = 25;
					worksheet2.getColumn('F').width = 20;
					worksheet2.getColumn('F').numFmt = '0.00%';
					worksheet2.getColumn('G').width = 30;
					table2.commit();

					// COMERCIAL
					const worksheet3 = workbook.addWorksheet('COMERCIAL');

					// Configurar encabezado
					worksheet3.addTable({
						name: 'Mi_Tabla3',
						ref: 'A1',
						headerRow: true,
						style: {
							theme: 'TableStyleMedium2',
							showRowStripes: true
						},
						columns: [
							{ name: 'REPRESENTANTE Y REGION', filterButton: false },
							{ name: 'CARGO', filterButton: true },
							{ name: 'PANEL', filterButton: true },
							{ name: 'IMPACTOS ASIGNADOS', filterButton: true },
							{ name: 'IMPACTOS REALIZADOS', filterButton: true },
							{ name: '% CUMPLIMIENTO', filterButton: true },
							{ name: 'PROMEDIO DE VISITA POR DIA', filterButton: true }
						],
						rows: []
					});

					const table3 = worksheet3.getTable('Mi_Tabla3');

					let i3 = 2;
					// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
					report.regions.forEach((region) => {
						// Agregar título de región
						table3.addRow([region.name]);
						worksheet3.getCell(`A${i3}`).font = { size: 12, bold: true };
						worksheet3.getRow(i3).eachCell((cell) => {
							cell.fill = {
								type: 'pattern',
								pattern: 'solid',
								fgColor: { argb: 'F08080' }
							};
						});
						i3 += 1;
						// Agregar datos de los representantes
						region.representatives.forEach((representative) => {
							table3.addRow([
								representative.name,
								representative.post, // Cargo
								representative.assignedPanels_3,
								representative.assignedImpacts_3,
								representative.impactsRealized_3,
								`${representative.percentageCompliance_3}%`,
								`${representative.averageVisits_3}%`
							]);
							worksheet3.getCell(`F${i3}`).numFmt = '0.00%';
							worksheet3.getCell(`F${i3}`).font = { size: 12, bold: true };
							i3 += 1; // Incrementar la fila
						});
					});
					worksheet3.getRow(2).eachCell((cell) => {
						cell.fill = {
							type: 'pattern',
							pattern: 'solid',
							fgColor: { argb: 'F08080' }
						};
					});
					worksheet3.getColumn('A').width = 30;
					worksheet3.getColumn('B').width = 10;
					worksheet3.getColumn('C').width = 10;
					worksheet3.getColumn('D').width = 25;
					worksheet3.getColumn('E').width = 25;
					worksheet3.getColumn('F').width = 20;
					worksheet3.getColumn('F').numFmt = '0.00%';
					worksheet3.getColumn('G').width = 30;
					table3.commit();

					setExistContent(true);

					// Guardar archivo de Excel
					const buffer = await workbook.xlsx.writeBuffer();
					const blob = new Blob([buffer]);
					const url = URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = `report.xlsx`;
					a.click();
					URL.revokeObjectURL(url);
				} else {
					setExistContent(false);
				}
			})
			.catch((error) => {
				setLoading(false);
				// eslint-disable-next-line no-console
				console.log(error);
			});
	};

	// if (loading) {
	// 	return (
	// 		<div className="flex items-center justify-center h-full">
	// 			<FuseLoading />
	// 		</div>
	// 	);
	// }

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'start',
					justifyContent: 'start',
					mt: 2,
					ml: 2
				}}
			>
				<Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
					Informe
				</Typography>
				<Typography
					className="font-medium"
					color="text.secondary"
				>
					Informe general de productividad
				</Typography>
			</Box>
			{!existContent ? (
				<div style={{ textAlign: 'center', padding: '10px 20px 0px 20px', marginTop: '16px' }}>
					<Alert
						variant="outlined"
						severity="info"
					>
						No hay resultados!
					</Alert>
				</div>
			) : null}
			{loading ? <FuseLoading /> : null}
			<div className="mt-24">
				<FilterReportForm
					onFilter={handleFilter}
					setLoading={setLoading}
				/>
			</div>
		</Paper>
	);
}

export default memo(FilterPanelsWidget);
