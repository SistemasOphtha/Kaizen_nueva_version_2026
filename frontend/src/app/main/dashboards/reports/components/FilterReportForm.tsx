// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import { DateTimePicker } from '@mui/x-date-pickers';
import { useAppSelector } from 'app/store';
// import moment from 'moment';
// import { parseISO } from 'date-fns';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import Select from '@mui/material/Select';
import { selectUser } from 'app/store/user/userSlice';
import React, { useEffect } from 'react';
import esLocale from 'date-fns/locale/es';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { selectUserRegions } from '../../../records/user/store/userRegionsSlice';
import { selectThirdTypes } from '../../../records/third/store/thirdTypesSlice';
import { selectUsers } from '../../../records/user/store/usersSlice';

/**
 * The basic info tab.
 */

interface FilterThirdFormType {
	onFilter: (region: number, date: Date) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterReportForm({ onFilter, setLoading }: FilterThirdFormType) {
	// const users = useAppSelector(selectUsers);
	const userRegions = useAppSelector(selectUserRegions);
	const thirdTypes = useAppSelector(selectThirdTypes);
	const users = useAppSelector(selectUsers);
	const { role } = useAppSelector(selectUser);

	const [date, setDate] = React.useState<Date>(moment(new Date()).toDate());
	const [region, setRegion] = React.useState<number>(0);

	useEffect(() => {
		console.log('date', date);
	}, [date]);

	const handlerFieldsFilter = () => {
		setLoading(true);
		onFilter(region, date);
	};

	const handlerResetFields = () => {
		setRegion(0);
		setDate(undefined);
	};

	return (
		<div className="flex flex-col gap-16 px-10">
			<div className="text-md font-semibold text-text.secondary mb-8">
				Filtrar
			</div>
			<div className="flex gap-16 flex-wrap items-center">
				<Grid
					container
					direction="row"
					rowSpacing={2}
					columnSpacing={{ xs: 1, sm: 2, md: 3 }}
					sx={{
						justifyContent: 'flex-start',
						alignItems: 'center'
					}}
				>
					<Grid item>
						<FormControl sx={{ minWidth: 180 }}>
							<InputLabel id="demo-select-small-label">Región</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								value={region}
								label="Región"
								onChange={(e) => setRegion(Number(e.target.value))}
							>
								<MenuItem value="0">
									<em>Todos</em>
								</MenuItem>
								{userRegions.map((region) => (
									<MenuItem
										key={region.id}
										value={region.id}
									>
										{region.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item>
						<FormControl sx={{ minWidth: 180 }}>
							<LocalizationProvider
								dateAdapter={AdapterDateFns}
								adapterLocale={esLocale}
							>
								<DatePicker
									label="Fecha"
									views={['year', 'month']}
									defaultValue={moment(new Date()).toDate()}
									onChange={(newValue) => setDate(newValue)}
								/>
							</LocalizationProvider>
						</FormControl>
					</Grid>
				</Grid>
			</div>

			<div className="flex justify-end gap-12 mt-16">
				<Button
					type="submit"
					variant="contained"
					color="primary"
					onClick={() => {
						handlerFieldsFilter();
					}}
				>
					Exportar
				</Button>
				<Button
					color="secondary"
					onClick={() => {
						handlerResetFields();
					}}
				>
					Limpiar
				</Button>
			</div>
		</div>
	);
}

export default FilterReportForm;
