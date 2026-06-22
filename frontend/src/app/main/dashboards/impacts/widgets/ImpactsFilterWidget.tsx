import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import React, { memo, useEffect, useState } from 'react';
import { useDeepCompareEffect } from '@fuse/hooks';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
// eslint-disable-next-line import/no-extraneous-dependencies
import ExcelJS from 'exceljs';
import { useAppDispatch, useAppSelector } from 'app/store';
import { selectWidgets, getWidgets } from '../store/widgetsSlice';
import { getUserRegions } from '../../../records/user/store/userRegionsSlice';
import { getUsers } from '../../../records/user/store/usersSlice';
import ImpactsFilterType, { ImpactsOverviewData, ImpactsOverviewTableData } from '../types/ImpactsFilterType';
import ImpactFilterForm from './components/ImpactFilterForm';

const schema = yup
	.object()
	.shape({
		startDate: yup.string().required('Fecha de inicio requerida'),
		endDate: yup.string().required('Fecha de fin requerida'),
		region: yup.number().nullable(),
		user: yup.number().nullable()
	})
	// .test('regionOrUser', 'Debe proporcionar al menos una región o un usuario', (obj) => !!obj.region || !!obj.user)
	.test(
		'notBoth',
		'No puede proporcionar una región y un usuario al mismo tiempo',
		(obj) => !(obj.region && obj.user)
	);

interface ImpactsFilterJsonType {
	startDate: string;
	endDate: string;
	region: number;
	user: number;
}

/**
 * The ImpactsDataWidget widget.
 */
function ImpactsDataWidget() {
	const dispatch = useAppDispatch();
	const [awaitRender, setAwaitRender] = useState(true);
	const [tabValue, setTabValue] = useState(0);
	const widgets = useAppSelector(selectWidgets);
	const { title, overview, ranges } = widgets.impactsFilterObject as ImpactsFilterType;
	const currentRange = Object.keys(ranges)[tabValue];

	const methods = useForm({
		mode: 'onChange',
		defaultValues: {},
		resolver: yupResolver(schema)
	});
	const { formState, getValues, resetField } = methods;
	const { isValid, dirtyFields } = formState;
	// const form = watch();

	useDeepCompareEffect(() => {
		function updateImpactsFilterState() {
			// const currentDate = new Date();
			// const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
			// const lastDayOfMonth = currentDate;
			// const json = {
			// 	startDate: firstDayOfMonth.toISOString(),
			// 	endDate: lastDayOfMonth.toISOString(),
			// 	region: 0,
			// 	user: 0
			// };
			// dispatch(getWidgets(json));
			dispatch(getUserRegions());
			dispatch(getUsers());
		}

		updateImpactsFilterState();
	}, [dispatch]);

	useEffect(() => {
		setAwaitRender(false);
	}, []);

	if (awaitRender) {
		return null;
	}

	const isEven = (num) => num % 2 === 0;

	// const exportToExcel = (fileName: string, dataThird: ImpactsOverviewTableData) => {
	// 	const dataWithHeaders = dataThird.rows.map((row) => ({
	// 		REPRESENTANTE: row.user,
	// 		IDENTIFICACIÓN: row.identification,
	// 		TIPO: row.type,
	// 		PANEL: row.name,
	// 		IMPACTO: row.impact,
	// 		'IMPACTO REALIZADO': row.impact
	// 	}));
	// 	const ws = utils.json_to_sheet(dataWithHeaders);
	// 	const wb = utils.book_new();
	// 	utils.book_append_sheet(wb, ws, 'Impactos');
	// 	writeFile(wb, `${fileName}.xlsx`);
	// };

	const exportToExcel = async (fileName: string, dataThird: ImpactsOverviewTableData) => {
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet('Impactos');

		worksheet.columns = [
			{ header: 'REPRESENTANTE', key: 'user', width: 10 },
			{ header: 'IDENTIFICACIÓN', key: 'identification', width: 10 },
			{ header: 'TIPO', key: 'type', width: 10 },
			{ header: 'PANEL', key: 'name', width: 10 },
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

		dataThird.rows.forEach((row) => {
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
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			<div className="flex flex-col sm:flex-row items-start justify-between">
				<Typography className="text-lg font-medium tracking-tight leading-6 truncate">
					Impactos por tipo de panel
				</Typography>
				<div className="mt-12 sm:mt-0 sm:ml-8">
					<Tabs
						value={tabValue}
						onChange={(ev, value: number) => setTabValue(value)}
						indicatorColor="secondary"
						textColor="inherit"
						variant="scrollable"
						scrollButtons={false}
						className="-mx-4 min-h-40"
						classes={{
							indicator: 'flex justify-center bg-transparent w-full h-full'
						}}
						TabIndicatorProps={{
							children: (
								<Box
									sx={{ bgcolor: 'text.disabled' }}
									className="w-full h-full rounded-full opacity-20"
								/>
							)
						}}
					>
						{Object.entries(ranges).map(([key, label]) => (
							<Tab
								className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
								disableRipple
								key={key}
								label={label}
							/>
						))}
					</Tabs>
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
				<div className="flex flex-col flex-auto">
					{/* <Typography
						className="font-medium"
						color="text.secondary"
					>
						{title[currentRange]}
					</Typography> */}
					<div>
						<FormProvider {...methods}>
							<Accordion>
								<AccordionSummary
									expandIcon={
										<FuseSvgIcon
											className="text-48"
											size={24}
											color="action"
										>
											material-outline:arrow_downward
										</FuseSvgIcon>
									}
									aria-controls="panel1-content"
									id="panel1-header"
								>
									Filtro
								</AccordionSummary>
								<AccordionDetails>
									<ImpactFilterForm />
								</AccordionDetails>
								<AccordionActions>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										className="mt-20"
										disabled={_.isEmpty(dirtyFields) || !isValid}
										onClick={() => {
											dispatch(getWidgets(getValues() as ImpactsFilterJsonType));
										}}
									>
										Filtrar
									</Button>
									<Button
										className="mt-20"
										color="secondary"
										onClick={() => {
											resetField('user');
											resetField('region');
											dispatch(
												getWidgets({
													startDate: getValues().startDate,
													endDate: getValues().endDate,
													region: 0,
													user: 0
												} as ImpactsFilterJsonType)
											);
										}}
									>
										Limpiar
									</Button>
								</AccordionActions>
							</Accordion>

							<div className="flex flex-row gap-10" />
						</FormProvider>
					</div>
				</div>
				<div className="flex flex-col">
					<Typography
						className="font-medium"
						color="text.secondary"
					>
						{title[currentRange]}
					</Typography>
					<div className="w-full">
						{Array.isArray(overview[currentRange]) ? (
							<div className="flex-auto grid grid-cols-3 gap-16 mt-24">
								{Object.entries(overview[currentRange] as ImpactsOverviewData[]).map(([key, value]) => (
									<Paper
										key={key}
										className="flex flex-col flex-auto shadow rounded-2xl overflow-hidden p-5"
									>
										<div className="flex items-center justify-between px-8 pt-12">
											<Typography
												className="px-16 text-lg font-medium tracking-tight leading-6 truncate"
												color="text.secondary"
											>
												{value.title}
											</Typography>
										</div>
										<div className="text-center mt-8">
											<Typography
												className={`text-7xl sm:text-8xl font-bold tracking-tight leading-none ${
													isEven(key) ? 'text-blue-500' : 'text-red-500'
												}`}
											>
												{String(value.data.count)}
											</Typography>
											<Typography
												className={`text-lg font-medium ${
													isEven(key)
														? 'text-blue-600 dark:text-blue-500'
														: 'text-red-600 dark:text-red-500'
												} `}
											>
												{value.data.name}
											</Typography>
										</div>
										<Typography
											className="flex items-baseline justify-center w-full mt-20 mb-24"
											color="text.secondary"
										>
											<span className="truncate">{value.data.extra.name}</span>:
											<b className="px-8">{String(value.data.extra.count)}</b>
										</Typography>
									</Paper>
								))}
							</div>
						) : (
							<div className="flex-auto grid gap-16 mt-24 w-full">
								<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
									<Typography className="text-lg font-medium tracking-tight leading-6 truncate">
										Paneles
									</Typography>

									<div className="w-full">
										<div className="flex justify-end">
											<Button
												className="whitespace-nowrap"
												color="primary"
												startIcon={<FuseSvgIcon size={20}>heroicons-solid:save</FuseSvgIcon>}
												onClick={() => {
													exportToExcel(
														'impactos',
														overview[currentRange] as ImpactsOverviewTableData
													);
												}}
											>
												XLXS
											</Button>
										</div>
										<Table className="w-full">
											<TableHead>
												<TableRow>
													{overview[currentRange] &&
														(overview[currentRange] as ImpactsOverviewTableData).columns &&
														(
															overview[currentRange] as ImpactsOverviewTableData
														).columns.map((column, index) => (
															<TableCell key={index}>
																<Typography
																	color="text.secondary"
																	className="font-semibold text-12 whitespace-nowrap"
																>
																	{column}
																</Typography>
															</TableCell>
														))}
												</TableRow>
											</TableHead>

											<TableBody>
												{overview[currentRange] &&
													(overview[currentRange] as ImpactsOverviewTableData).rows &&
													(overview[currentRange] as ImpactsOverviewTableData).rows.map(
														(row, index) => (
															<TableRow key={index}>
																{Object.entries(row).map(([key, value]) => {
																	return (
																		<TableCell
																			key={key}
																			component="th"
																			scope="row"
																		>
																			{React.isValidElement(value) ||
																			typeof value === 'string' ||
																			typeof value === 'number' ? (
																				<Chip
																					size="small"
																					label={value}
																				/>
																			) : null}
																		</TableCell>
																	);
																})}
															</TableRow>
														)
													)}
											</TableBody>
										</Table>
									</div>
								</Paper>
							</div>
						)}
					</div>
				</div>
			</div>
		</Paper>
	);
}

export default memo(ImpactsDataWidget);
