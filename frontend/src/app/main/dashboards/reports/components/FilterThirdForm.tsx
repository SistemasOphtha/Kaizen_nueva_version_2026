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
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { selectUser } from 'app/store/user/userSlice';
import React from 'react';
import Button from '@mui/material/Button';
import { selectUserRegions } from '../../../records/user/store/userRegionsSlice';
import { selectThirdTypes } from '../../../records/third/store/thirdTypesSlice';
import { selectUsers } from '../../../records/user/store/usersSlice';

/**
 * The basic info tab.
 */

interface FilterThirdFormType {
	onFilter: (
		type: number,
		identification: string,
		name: string,
		region: number,
		status: string,
		userId: number
	) => void;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function FilterThirdForm({ onFilter, setLoading }: FilterThirdFormType) {
	// const users = useAppSelector(selectUsers);
	const userRegions = useAppSelector(selectUserRegions);
	const thirdTypes = useAppSelector(selectThirdTypes);
	const users = useAppSelector(selectUsers);
	const { role } = useAppSelector(selectUser);
	const [type, setType] = React.useState<number>(0);
	const [identification, setIdentification] = React.useState<string>('');
	const [name, setName] = React.useState<string>('');
	const [region, setRegion] = React.useState<number>(0);
	const [status, setStatus] = React.useState<string>('');
	const [userId, setUserId] = React.useState<number>(0);

	// useEffect(() => {
	// 	setLoading(false);
	// }, []);

	const handlerFieldsFilter = () => {
		setLoading(true);
		onFilter(type, identification, name, region, status, userId);
	};

	const handlerResetFields = () => {
		setType(0);
		setIdentification('');
		setName('');
		setRegion(0);
		setStatus('');
		setUserId(0);
	};

	return (
		<div className="my-24 mx-10">
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
					Buscar
				</AccordionSummary>
				<AccordionDetails>
					<div className="flex gap-10 flex-wrap">
						<FormControl
							sx={{ minWidth: 180 }}
							size="small"
						>
							<InputLabel id="demo-select-small-label">Tipo de Panel</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								value={type}
								label="Tipo de Panel"
								onChange={(e) => setType(Number(e.target.value))}
							>
								<MenuItem value="0">
									<em>--Seleccione una opción--</em>
								</MenuItem>
								{thirdTypes.map((region) => (
									<MenuItem
										key={region.id}
										value={region.id}
									>
										{region.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							label="Identificación"
							variant="outlined"
							size="small"
							value={identification}
							onChange={(e) => setIdentification(e.target.value)}
						/>

						<TextField
							label="Nombre"
							variant="outlined"
							size="small"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<FormControl
							sx={{ minWidth: 180 }}
							size="small"
						>
							<InputLabel id="demo-select-small-label">Región</InputLabel>
							<Select
								labelId="demo-select-small-label"
								id="demo-select-small"
								value={region}
								label="Región"
								onChange={(e) => setRegion(Number(e.target.value))}
							>
								<MenuItem value="0">
									<em>--Seleccione una opción--</em>
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

						<FormControl
							sx={{ minWidth: 180 }}
							size="small"
						>
							<InputLabel id="demo-select-small-label">Estado</InputLabel>
							<Select
								id="estado-select-small"
								value={status}
								label="Estado"
								onChange={(e) => setStatus(e.target.value)}
							>
								<MenuItem value="">
									<em>--Seleccione una opción--</em>
								</MenuItem>
								<MenuItem value="active">
									<em>Activo</em>
								</MenuItem>
								<MenuItem value="inactive">
									<em>Inactivo</em>
								</MenuItem>
							</Select>
						</FormControl>
						{role.includes('Administrador') && (
							<FormControl
								sx={{ minWidth: 180 }}
								size="small"
							>
								<InputLabel id="demo-select-small-label">Usuario</InputLabel>
								<Select
									labelId="demo-select-small-label"
									id="demo-select-small"
									value={userId}
									label="Usuario"
									onChange={(e) => setUserId(Number(e.target.value))}
								>
									<MenuItem value="0">
										<em>--Seleccione una opción--</em>
									</MenuItem>
									{users.map((user) => (
										<MenuItem
											key={user.id}
											value={user.id}
										>
											{user.firstName} {user.lastName}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						)}
					</div>
				</AccordionDetails>
				<AccordionActions>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className="mt-20"
						// disabled={_.isEmpty(dirtyFields) || !isValid}
						onClick={() => {
							handlerFieldsFilter();
						}}
					>
						Buscar
					</Button>
					<Button
						className="mt-20"
						color="secondary"
						onClick={() => {
							handlerResetFields();
						}}
					>
						Limpiar
					</Button>
				</AccordionActions>
			</Accordion>
		</div>
	);
}

export default FilterThirdForm;
