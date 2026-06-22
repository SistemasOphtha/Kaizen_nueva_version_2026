import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Box,
  CircularProgress,
  Chip,
  Divider
} from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import format from 'date-fns/format';
import parse from 'date-fns/parse';

/**
 * Componente para gestionar los días festivos
 */
function HolidaysManager() {
  const dispatch = useDispatch();
  const [holidays, setHolidays] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [year, setYear] = useState<number>(new Date().getFullYear());

  // Cargar días festivos al iniciar
  useEffect(() => {
    fetchHolidays();
  }, []);

  /**
   * Obtiene los días festivos del servidor
   */
  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/configs/holidays');
      setHolidays(response.data.holidays || []);
    } catch (error) {
      console.error('Error al cargar días festivos:', error);
      dispatch(
        showMessage({
          message: 'Error al cargar días festivos',
          variant: 'error'
        })
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Guarda los días festivos en el servidor
   */
  const saveHolidays = async () => {
    setSaving(true);
    try {
      console.log('Enviando días festivos al servidor:', { holidays });
      
      const response = await axios.put('/api/configs/holidays', { holidays });
      console.log('Respuesta del servidor:', response.data);
      
      dispatch(
        showMessage({
          message: 'Días festivos guardados correctamente',
          variant: 'success'
        })
      );
    } catch (error: any) {
      console.error('Error al guardar días festivos:', error);
      console.error('Detalles del error:', error.response?.data || error.message);
      
      const errorMessage = error.response?.data?.message || 'Error al guardar días festivos';
      
      dispatch(
        showMessage({
          message: errorMessage,
          variant: 'error'
        })
      );
    } finally {
      setSaving(false);
    }
  };

  /**
   * Agrega un día festivo a la lista
   */
  const addHoliday = () => {
    if (!selectedDate) return;
    
    const formattedDate = format(selectedDate, 'dd-MM-yyyy');
    
    // Verificar si ya existe
    if (holidays.includes(formattedDate)) {
      dispatch(
        showMessage({
          message: 'Este día festivo ya está en la lista',
          variant: 'warning'
        })
      );
      return;
    }
    
    // Agregar y ordenar
    const newHolidays = [...holidays, formattedDate].sort((a, b) => {
      const dateA = parse(a, 'dd-MM-yyyy', new Date());
      const dateB = parse(b, 'dd-MM-yyyy', new Date());
      return dateA.getTime() - dateB.getTime();
    });
    
    setHolidays(newHolidays);
    setSelectedDate(null);
  };

  /**
   * Elimina un día festivo de la lista
   */
  const removeHoliday = (date: string) => {
    setHolidays(holidays.filter(holiday => holiday !== date));
  };

  /**
   * Filtra los días festivos por año
   */
  const filterHolidaysByYear = () => {
    return holidays.filter(holiday => {
      const holidayYear = holiday.split('-')[2];
      return holidayYear === year.toString();
    });
  };

  /**
   * Cambia el año de filtrado
   */
  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(event.target.value);
    if (!isNaN(newYear) && newYear > 0) {
      setYear(newYear);
    }
  };

  return (
    <div className="w-full">
      <Divider className="mb-16" />

      <Box className="flex flex-col sm:flex-row gap-16 mb-24">
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
          <DatePicker
            label="Seleccionar día festivo"
            value={selectedDate}
            onChange={setSelectedDate}
            format="dd/MM/yyyy"
            slotProps={{ textField: { fullWidth: true } }}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={addHoliday}
          disabled={!selectedDate}
          startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
        >
          Agregar
        </Button>
      </Box>

      <Box className="mb-16">
        <TextField
          label="Filtrar por año"
          type="number"
          value={year}
          onChange={handleYearChange}
          variant="outlined"
          size="small"
        />
      </Box>

      {loading ? (
        <Box className="flex justify-center p-24">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <List>
            {filterHolidaysByYear().length === 0 ? (
              <ListItem>
                <ListItemText primary={`No hay días festivos registrados para ${year}`} />
              </ListItem>
            ) : (
              filterHolidaysByYear().map(holiday => {
                const [day, month, year] = holiday.split('-');
                const date = parse(holiday, 'dd-MM-yyyy', new Date());
                const dayName = format(date, 'EEEE', { locale: es });
                
                return (
                  <ListItem key={holiday} divider>
                    <ListItemText
                      primary={`${day}/${month}/${year} (${dayName})`}
                      secondary={format(date, 'dd MMMM yyyy', { locale: es })}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" onClick={() => removeHoliday(holiday)} size="large">
                        <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            )}
          </List>

          <Box className="mt-24 flex justify-between items-center">
            <Chip 
              label={`Total: ${filterHolidaysByYear().length} días festivos en ${year}`} 
              color="primary" 
              variant="outlined" 
            />
            <Button
              variant="contained"
              color="primary"
              onClick={saveHolidays}
              disabled={saving}
              startIcon={saving ? <CircularProgress size={20} /> : <FuseSvgIcon>heroicons-outline:save</FuseSvgIcon>}
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}

export default HolidaysManager;
