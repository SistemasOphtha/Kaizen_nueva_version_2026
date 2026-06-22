import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useAppSelector } from 'app/store';
import { selectUser } from 'app/store/user/userSlice';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { utils, writeFile } from 'xlsx';
import ExcelJS from 'exceljs';
import { selectWidgets } from './store/widgetsSlice';

/**
 * The ImpactsDashboardAppHeader component.
 */

interface DataImpactThirdType {
	panel: string;
	impact: number;
	visist: number;
}

function ImpactsDashboardAppHeader() {
	const widgets = useAppSelector(selectWidgets);
	const data = widgets.thirdImpactsObject as DataImpactThirdType[];
	const user = useAppSelector(selectUser);

	// const exportToExcel = (fileName: string, dataThird: DataImpactThirdType[]) => {
	// 	const ws = utils.json_to_sheet(dataThird);
	// 	const wb = utils.book_new();
	// 	utils.book_append_sheet(wb, ws, 'Impactos');
	// 	writeFile(wb, `${fileName}.xlsx`);
	// };

	const exportToExcel = async (fileName: string, dataThird: DataImpactThirdType[]) => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Indicadores Generales');

		worksheet.columns = [
			{ header: 'PANEL', key: 'panel', width: 10 },
			{ header: 'IMPACTO', key: 'impact', width: 10 },
			{ header: 'IMPACTO REALIZADO', key: 'visits', width: 10 }
		];

		worksheet.getRow(1).eachCell((cell) => {
			cell.fill = {
				type: 'pattern',
				pattern: 'solid',
				fgColor: { argb: 'FFFFFF00' } // Color amarillo
			};
		});

		dataThird.forEach((row) => {
			worksheet.addRow(row);
		});

		const buffer = await workbook.xlsx.writeBuffer();
		const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `${fileName}.xlsx`;
		a.click();
		URL.revokeObjectURL(url);
	};

	return (
		<div className="flex w-full container">
			<div className="flex flex-col sm:flex-row flex-auto sm:items-center min-w-0 p-24 md:p-32 pb-0 md:pb-0">
				<div className="flex flex-col flex-auto">
					<Typography className="text-3xl font-semibold tracking-tight leading-8">Indicadores</Typography>
					<Typography
						className="font-medium tracking-tight"
						color="text.secondary"
					>
						Información de indicadores generales
					</Typography>
				</div>
				<div className="flex items-center mt-24 sm:mt-0 sm:mx-8 space-x-12">
					{user.role.includes('Administrador') && (
						<Button
							className="whitespace-nowrap invisible"
							startIcon={<FuseSvgIcon size={20}>heroicons-solid:save</FuseSvgIcon>}
							onClick={() => {
								exportToExcel(`Indicadores-Generales_${new Date().getTime()}`, data);
							}}
						>
							XLXS Impactos Generales
						</Button>
					)}
					{/* <Button
						className="whitespace-nowrap"
						startIcon={<FuseSvgIcon size={20}>heroicons-solid:document-report</FuseSvgIcon>}
					>
						Reports
					</Button>
					<Button
						className="whitespace-nowrap"
						startIcon={<FuseSvgIcon size={20}>heroicons-solid:cog</FuseSvgIcon>}
					>
						Settings
					</Button>
					<Button
						className="whitespace-nowrap"
						variant="contained"
						color="secondary"
						startIcon={<FuseSvgIcon size={20}>heroicons-solid:save</FuseSvgIcon>}
					>
						Export
					</Button> */}
				</div>
			</div>
		</div>
	);
}

export default ImpactsDashboardAppHeader;
