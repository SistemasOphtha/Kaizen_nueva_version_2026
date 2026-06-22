import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ExcelJS from 'exceljs';
import axios from 'axios';
import moment from 'moment';
import { useAppSelector } from 'app/store';
import { selectUsers } from '../../../records/user/store/usersSlice';
import { selectUserRegions } from '../../../records/user/store/userRegionsSlice';

type ColumnDefinition = {
  id: string;
  label: string;
  getValue: (row: any) => any;
};

const VISITS_COLUMNS: ColumnDefinition[] = [
  { id: 'date', label: 'Fecha de Visita', getValue: (row) => row.date ? moment(row.date).format('YYYY-MM-DD HH:mm') : '' },
  { id: 'objective', label: 'Objetivo / Plan de Visita', getValue: (row) => row.objective || '' },
  { id: 'comment', label: 'Comentarios / Reporte', getValue: (row) => row.comment || '' },
  { id: 'status', label: 'Estado', getValue: (row) => row.status || '' },
  { id: 'third_ident', label: 'Identificación Tercero', getValue: (row) => row.third?.identification || '' },
  { id: 'third_name', label: 'Nombre Tercero', getValue: (row) => row.third ? `${row.third.name} ${row.third.additionalName || ''}` : '' },
  { id: 'third_type', label: 'Tipo Tercero (Médico/Comercial)', getValue: (row) => row.third?.third_type?.name || '' },
  { id: 'third_region', label: 'Región Tercero', getValue: (row) => row.third?.region?.name || '' },
  { id: 'user_name', label: 'Asesor / Representante', getValue: (row) => row.user ? `${row.user.firstName} ${row.user.lastName}` : '' }
];

const THIRDS_COLUMNS: ColumnDefinition[] = [
  { id: 'identification', label: 'Identificación', getValue: (row) => row.identification || '' },
  { id: 'name', label: 'Nombres', getValue: (row) => row.name || '' },
  { id: 'additionalName', label: 'Apellidos / Adicional', getValue: (row) => row.additionalName || '' },
  { id: 'address', label: 'Dirección', getValue: (row) => row.address || '' },
  { id: 'mobile', label: 'Celular', getValue: (row) => row.mobile || '' },
  { id: 'email', label: 'Correo Electrónico', getValue: (row) => row.email || '' },
  { id: 'city', label: 'Ciudad', getValue: (row) => row.city || '' },
  { id: 'birthday', label: 'Fecha Nacimiento', getValue: (row) => row.birthday ? moment(row.birthday).format('YYYY-MM-DD') : '' },
  { id: 'gender', label: 'Género', getValue: (row) => row.gender || '' },
  { id: 'impact', label: 'Impactos Requeridos', getValue: (row) => row.impact || 0 },
  { id: 'type', label: 'Tipo Panel', getValue: (row) => row.third_type?.name || '' },
  { id: 'region', label: 'Región', getValue: (row) => row.region?.name || '' },
  { id: 'specialty', label: 'Especialidad', getValue: (row) => row.third_specialty?.name || '' },
  { id: 'subspecialty', label: 'Subespecialidad', getValue: (row) => row.third_sub_specialty?.name || '' },
  { id: 'assigned_user', label: 'Asesor Asignado', getValue: (row) => row.thirds_portfolios?.[0]?.portfolio?.user ? `${row.thirds_portfolios[0].portfolio.user.firstName} ${row.thirds_portfolios[0].portfolio.user.lastName}` : 'Sin asignar' }
];

const JUSTIFICATIONS_COLUMNS: ColumnDefinition[] = [
  { id: 'dateToJustify', label: 'Fecha a Justificar', getValue: (row) => row.dateToJustify ? moment(row.dateToJustify).format('YYYY-MM-DD') : '' },
  { id: 'comment', label: 'Comentarios / Justificación', getValue: (row) => row.comment || '' },
  { id: 'status', label: 'Estado', getValue: (row) => row.status || '' },
  { id: 'third_ident', label: 'Identificación Tercero', getValue: (row) => row.third?.identification || '' },
  { id: 'third_name', label: 'Nombre Tercero', getValue: (row) => row.third ? `${row.third.name} ${row.third.additionalName || ''}` : '' },
  { id: 'user_name', label: 'Asesor / Representante', getValue: (row) => row.user ? `${row.user.firstName} ${row.user.lastName}` : '' }
];

function CustomReportBuilderWidget() {
  const users = useAppSelector(selectUsers);
  const regions = useAppSelector(selectUserRegions);

  const [module, setModule] = useState<'visits' | 'thirds' | 'justifications'>('visits');
  const [startDate, setStartDate] = useState(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().endOf('month').format('YYYY-MM-DD'));
  const [regionId, setRegionId] = useState<number | ''>('');
  const [userId, setUserId] = useState<number | ''>('');
  
  // Column Selection States
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    VISITS_COLUMNS.map(c => c.id)
  );
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle module change
  const handleModuleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newModule = e.target.value as 'visits' | 'thirds' | 'justifications';
    setModule(newModule);
    if (newModule === 'visits') {
      setSelectedColumns(VISITS_COLUMNS.map(c => c.id));
    } else if (newModule === 'thirds') {
      setSelectedColumns(THIRDS_COLUMNS.map(c => c.id));
    } else {
      setSelectedColumns(JUSTIFICATIONS_COLUMNS.map(c => c.id));
    }
  };

  const getActiveColumnsList = (): ColumnDefinition[] => {
    if (module === 'visits') return VISITS_COLUMNS;
    if (module === 'thirds') return THIRDS_COLUMNS;
    return JUSTIFICATIONS_COLUMNS;
  };

  const handleToggleColumn = (colId: string) => {
    if (selectedColumns.includes(colId)) {
      setSelectedColumns(selectedColumns.filter(id => id !== colId));
    } else {
      setSelectedColumns([...selectedColumns, colId]);
    }
  };

  const handleSelectAll = () => {
    const allIds = getActiveColumnsList().map(c => c.id);
    if (selectedColumns.length === allIds.length) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allIds);
    }
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const response = await axios.post('/api/reports/custom', {
        module,
        startDate,
        endDate,
        regionId: regionId || undefined,
        userId: userId || undefined
      });

      const records = response.data;
      if (!records || records.length === 0) {
        setErrorMsg('No se encontraron registros para los filtros seleccionados.');
        setLoading(false);
        return;
      }

      // Build Excel Worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(
        module === 'visits' ? 'Visitas' : module === 'thirds' ? 'Paneles' : 'Justificaciones'
      );

      const columnsToExport = getActiveColumnsList().filter(c => selectedColumns.includes(c.id));
      
      worksheet.columns = columnsToExport.map(c => ({
        header: c.label.toUpperCase(),
        key: c.id,
        width: 25
      }));

      // Apply Header Style
      worksheet.getRow(1).eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF1E293B' } // Dark blue / gray
        };
        cell.font = {
          color: { argb: 'FFFFFFFF' },
          bold: true,
          size: 11
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      // Add Rows
      records.forEach((row: any) => {
        const rowData: any = {};
        columnsToExport.forEach(c => {
          rowData[c.id] = c.getValue(row);
        });
        worksheet.addRow(rowData);
      });

      // Write Buffer & Trigger Download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_personalizado_${module}_${moment().format('YYYYMMDD_HHmmss')}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Error al generar el reporte.');
    } finally {
      setLoading(false);
    }
  };

  const columnsList = getActiveColumnsList();

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden mt-32">
      <Box sx={{ mb: 4 }}>
        <Typography className="text-xl font-bold tracking-tight leading-6 text-slate-800">
          Constructor de Informes a Mano Alzada
        </Typography>
        <Typography className="text-sm font-medium text-text.secondary mt-4">
          Selecciona las columnas y filtros de tu interés para generar una exportación personalizada a Excel.
        </Typography>
      </Box>

      <Divider className="mb-24" />

      <Grid container spacing={3}>
        {/* FILTROS Y OPCIONES */}
        <Grid item xs={12} md={4} className="flex flex-col gap-20 border-r border-slate-100 pr-24">
          <Typography className="font-semibold text-sm text-slate-700">
            1. Parámetros de Búsqueda
          </Typography>
          
          <TextField
            select
            label="Módulo Principal"
            value={module}
            onChange={handleModuleChange}
            variant="outlined"
            size="small"
            fullWidth
          >
            <MenuItem value="visits">Visitas Médicas y Comerciales</MenuItem>
            <MenuItem value="thirds">Paneles de Clientes / Terceros</MenuItem>
            <MenuItem value="justifications">Justificaciones de Cierre de Mes</MenuItem>
          </TextField>

          {module !== 'thirds' && (
            <div className="flex gap-16">
              <TextField
                type="date"
                label="Fecha Inicio"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                fullWidth
              />
              <TextField
                type="date"
                label="Fecha Fin"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                size="small"
                fullWidth
              />
            </div>
          )}

          <TextField
            select
            label="Filtrar por Región (Opcional)"
            value={regionId}
            onChange={(e) => setRegionId(e.target.value as number)}
            variant="outlined"
            size="small"
            fullWidth
          >
            <MenuItem value="">Todas las regiones</MenuItem>
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Filtrar por Asesor (Opcional)"
            value={userId}
            onChange={(e) => setUserId(e.target.value as number)}
            variant="outlined"
            size="small"
            fullWidth
          >
            <MenuItem value="">Todos los asesores</MenuItem>
            {users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.firstName} {u.lastName} ({u.user_classification?.name})
              </MenuItem>
            ))}
          </TextField>

          {errorMsg && (
            <Typography className="text-red-600 text-xs mt-8 font-medium">
              {errorMsg}
            </Typography>
          )}

          <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerateReport}
            disabled={loading || selectedColumns.length === 0}
            className="mt-16 w-full py-10"
            size="large"
          >
            {loading ? 'Generando archivo...' : 'Generar y Descargar Excel'}
          </Button>
        </Grid>

        {/* COLUMNAS SELECCIONABLES */}
        <Grid item xs={12} md={8} className="pl-24">
          <div className="flex justify-between items-center mb-16">
            <Typography className="font-semibold text-sm text-slate-700">
              2. Columnas a Incluir en el Excel ({selectedColumns.length} seleccionadas)
            </Typography>
            <Button size="small" color="primary" onClick={handleSelectAll} className="font-semibold">
              {selectedColumns.length === columnsList.length ? 'Desmarcar Todos' : 'Seleccionar Todos'}
            </Button>
          </div>

          <Divider className="mb-16" />

          <Grid container spacing={2}>
            {columnsList.map((col) => {
              const isChecked = selectedColumns.includes(col.id);
              return (
                <Grid item xs={12} sm={6} key={col.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isChecked}
                        onChange={() => handleToggleColumn(col.id)}
                        color="secondary"
                        size="small"
                      />
                    }
                    label={
                      <Typography className="text-sm text-slate-600 font-medium">
                        {col.label}
                      </Typography>
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CustomReportBuilderWidget;
