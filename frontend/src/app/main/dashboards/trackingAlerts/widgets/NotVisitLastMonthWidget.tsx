import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { useAppSelector } from 'app/store';
import { selectWidgets } from '../store/widgetsSlice';
import ThirdNotVisitLastMonthWidgetType from '../types/ThirdNotVisitLastMonthWidgetType';

/**
 * The NotVisitLastMonthWidget widget.
 */
function NotVisitLastMonthWidget() {
	const widgets = useAppSelector(selectWidgets);
	const { columns, rows } = widgets.thirdNotVisitLastMonth as ThirdNotVisitLastMonthWidgetType;

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			<div>
				<Typography className="mr-16 text-lg font-medium tracking-tight leading-6 truncate">
					Mes pasado
				</Typography>
				<Typography
					className="font-medium"
					color="text.secondary"
				>
					Lista de terceros que faltaron por completar las visitas del mes pasado.
				</Typography>
			</div>

			<div className="table-responsive mt-24">
				<Table className="simple w-full min-w-full">
					<TableHead>
						<TableRow>
							{columns.map((column, index) => (
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
						{rows.map((row, index) => (
							<TableRow key={index}>
								{Object.entries(row).map(([key, value]) => {
									switch (key) {
										case 'id': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography color="text.secondary">{value}</Typography>
												</TableCell>
											);
										}
										case 'identification': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>{value}</Typography>
												</TableCell>
											);
										}
										case 'name': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>{value}</Typography>
												</TableCell>
											);
										}
										case 'count': {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography
														className={clsx(
															'inline-flex items-center font-bold text-10 px-10 py-2 rounded-full tracking-wide uppercase',
															value === 0 &&
																'text-red-100 bg-red-800 dark:bg-red-600 dark:text-red-50',
															Number(value) > 0 &&
																Number(value) < 3 &&
																'text-green-50 bg-orange-800 dark:bg-orange-600 dark:text-green-50'
														)}
													>
														{value}
													</Typography>
												</TableCell>
											);
										}
										default: {
											return (
												<TableCell
													key={key}
													component="th"
													scope="row"
												>
													<Typography>{value}</Typography>
												</TableCell>
											);
										}
									}
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
				<div className="pt-24">
					<Button variant="outlined">See all transactions</Button>
				</div>
			</div>
		</Paper>
	);
}

export default memo(NotVisitLastMonthWidget);
