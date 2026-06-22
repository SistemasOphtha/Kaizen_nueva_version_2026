/* eslint-disable no-alert */
// import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
// import { useAppSelector } from 'app/store';
// import moment from 'moment';
import { useFormContext } from 'react-hook-form';
// import Autocomplete from '@mui/material/Autocomplete';
import { ThirdPortfolio } from '../../types/ThirdType';

/**
 * The Portfolio info tab.
 */
function PortfolioInfoTab() {
	const methods = useFormContext();
	const { control, formState, watch } = methods;
	const { errors } = formState;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const thirdPortfolios = watch('thirds_portfolios') as ThirdPortfolio[];

	// Calcula la fecha de hace 18 años a partir de la fecha actual
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - 18);

	return (
		<div>
			<h2>Portafolio</h2>
			{thirdPortfolios && thirdPortfolios.length > 0 && (
				<div>
					{thirdPortfolios.map((item) => (
						<div key={item.id}>
							<Box sx={{ minWidth: 275 }}>
								<Card variant="outlined">
									<CardContent>
										<Typography
											sx={{ fontSize: 14 }}
											color="text.secondary"
											gutterBottom
										>
											{item?.portfolio?.name}
										</Typography>
										<Typography
											variant="h5"
											component="div"
										>
											{item?.portfolio?.user.firstName} {item.portfolio.user.lastName}
										</Typography>
										<Typography
											sx={{ mb: 1.5 }}
											color="text.secondary"
										>
											{item?.portfolio?.user.email}
										</Typography>
										<Typography variant="body2">{item.portfolio.user.status}</Typography>
									</CardContent>
								</Card>
							</Box>
						</div>
					))}
				</div>
			)}
			{thirdPortfolios && thirdPortfolios.length === 0 && (
				<div>
					<Typography variant="body2">No hay portafolios asociados a este panel</Typography>
				</div>
			)}
		</div>
	);
}

export default PortfolioInfoTab;
