import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import axios from 'axios';
import * as XLSX from 'xlsx';
import moment from 'moment';

type LogType = {
  id: number;
  userId: number;
  ipAddress: string;
  userAgent: string;
  loginTime: string;
  logoutTime: string | null;
  duration: number | null;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
};

function SessionLogs() {
  const [logs, setLogs] = useState<LogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;

      const response = await axios.get('/api/users/session-logs', { params });
      setLogs(response.data);
    } catch (err) {
      console.error('Error fetching session logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [startDate, endDate]);

  const formatDuration = (seconds: number | null) => {
    if (seconds === null || seconds === undefined) return '-';
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes < 60) return `${minutes}m ${remainingSeconds}s`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const exportToExcel = () => {
    const exportData = logs.map((log) => ({
      ID: log.id,
      Usuario: `${log.user.firstName} ${log.user.lastName}`,
      Email: log.user.email,
      'Dirección IP': log.ipAddress || 'N/A',
      Dispositivo: log.userAgent || 'N/A',
      'Fecha Ingreso': moment(log.loginTime).format('DD/MM/YYYY HH:mm:ss'),
      'Fecha Salida': log.logoutTime ? moment(log.logoutTime).format('DD/MM/YYYY HH:mm:ss') : 'Sesión Activa',
      Duración: formatDuration(log.duration)
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(wb, ws, 'Historial de Sesiones');
    XLSX.writeFile(wb, `auditoria_sesiones_${moment().format('YYYY-MM-DD')}.xlsx`);
  };

  return (
    <div className="p-24 w-full max-w-7xl mx-auto">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row space-y-16 sm:space-y-0 items-center justify-between py-24 mb-16">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
          className="flex items-center gap-12"
        >
          <Button
            component={Link}
            to="/records/users"
            variant="outlined"
            size="small"
            startIcon={<FuseSvgIcon>heroicons-outline:arrow-left</FuseSvgIcon>}
          >
            Volver a Usuarios
          </Button>
          <Typography className="text-24 font-extrabold tracking-tight">
            Auditoría de Sesiones
          </Typography>
        </motion.div>

        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={exportToExcel}
            startIcon={<FuseSvgIcon>heroicons-outline:download</FuseSvgIcon>}
            disabled={logs.length === 0}
          >
            Exportar a Excel
          </Button>
        </motion.div>
      </div>

      {/* Filtros */}
      <Paper className="p-20 mb-24 rounded-16 shadow-0 border-1 border-gray-200">
        <div className="flex flex-col sm:flex-row gap-16">
          <TextField
            label="Fecha Inicio"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Fecha Fin"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            fullWidth
            size="small"
          />
          {(startDate || endDate) && (
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
            >
              Limpiar Filtros
            </Button>
          )}
        </div>
      </Paper>

      {/* Tabla */}
      <TableContainer component={Paper} className="rounded-16 shadow-0 border-1 border-gray-200 overflow-hidden">
        <Table sx={{ minWidth: 650 }} aria-label="session logs table">
          <TableHead className="bg-gray-100">
            <TableRow>
              <TableCell className="font-bold text-gray-700">Usuario</TableCell>
              <TableCell className="font-bold text-gray-700">Email</TableCell>
              <TableCell className="font-bold text-gray-700">Dirección IP</TableCell>
              <TableCell className="font-bold text-gray-700">Dispositivo</TableCell>
              <TableCell className="font-bold text-gray-700">Fecha Ingreso</TableCell>
              <TableCell className="font-bold text-gray-700">Fecha Salida</TableCell>
              <TableCell className="font-bold text-gray-700">Duración</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-40">
                  <Typography color="textSecondary">Cargando historial de sesiones...</Typography>
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" className="py-40">
                  <Typography color="textSecondary">No se encontraron registros de inicio de sesión.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id} hover className="transition-colors">
                  <TableCell className="font-medium text-gray-800">
                    {log.user ? `${log.user.firstName} ${log.user.lastName}` : 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-600">{log.user?.email || 'N/A'}</TableCell>
                  <TableCell className="text-gray-600">{log.ipAddress || 'N/A'}</TableCell>
                  <TableCell className="text-gray-500 max-w-200 truncate" title={log.userAgent}>
                    {log.userAgent || 'N/A'}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {moment(log.loginTime).format('DD/MM/YYYY HH:mm:ss')}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {log.logoutTime ? (
                      moment(log.logoutTime).format('DD/MM/YYYY HH:mm:ss')
                    ) : (
                      <span className="inline-flex items-center px-8 py-2 rounded-full text-12 font-semibold bg-green-100 text-green-800">
                        Sesión Activa
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium text-gray-700">{formatDuration(log.duration)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SessionLogs;
