import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import HolidaysManager from '../../components/HolidaysManager';

/**
 * Página de gestión de días festivos
 */
function Holidays() {
  return (
    <div className="w-full">
      <Paper className="p-24 mb-24">
        <Typography className="text-xl font-medium mb-16">
          Días Festivos
        </Typography>
        
        <Typography className="mb-24 text-md">
          Administre los días festivos que se considerarán en los cálculos de horas laborables y reportes.
          Estos días no contarán como días laborables en los cálculos de impactos y metas.
        </Typography>
        
        <HolidaysManager />
      </Paper>
    </div>
  );
}

export default Holidays;
