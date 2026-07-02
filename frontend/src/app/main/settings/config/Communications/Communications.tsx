import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useAppDispatch } from 'app/store';
import { showMessage } from 'app/store/fuse/messageSlice';

function Communications() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [configId, setConfigId] = useState<number | null>(null);
  
  const [subject, setSubject] = useState('¡Feliz Cumpleaños de parte de Ophtha!');
  const [htmlContent, setHtmlContent] = useState(`<h3>Estimado(a) {{NAME}},</h3>
<p>De parte de todo el equipo de <strong>Ophtha Kaizen</strong>, le deseamos un muy feliz cumpleaños. Que este día esté lleno de salud, alegría y éxitos.</p>
<br/>
<p>Atentamente,<br/>Equipo Kaizen Ophtha</p>`);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt_access_token');
      const response = await axios.get('/configs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const configs = response.data.data;
      const templateConfig = configs.find((c: any) => c.name === 'birthday_email_template');
      
      if (templateConfig) {
        setConfigId(templateConfig.id);
        if (templateConfig.value) {
          try {
            const parsed = JSON.parse(templateConfig.value);
            setSubject(parsed.subject || subject);
            setHtmlContent(parsed.html || htmlContent);
          } catch (e) {
            console.error('Error parsing config value', e);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching communications config:', error);
      dispatch(showMessage({ message: 'Error al cargar configuración', variant: 'error' }));
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('jwt_access_token');
      const valueStr = JSON.stringify({ subject, html: htmlContent });
      
      if (configId) {
        await axios.put(`/configs/${configId}`, {
          value: valueStr
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/configs', {
          name: 'birthday_email_template',
          label: 'Plantilla de Correo de Cumpleaños',
          type: 'json',
          value: valueStr
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      dispatch(showMessage({ message: 'Plantilla guardada correctamente', variant: 'success' }));
      fetchConfig();
    } catch (error) {
      console.error('Error saving communications config:', error);
      dispatch(showMessage({ message: 'Error al guardar la plantilla', variant: 'error' }));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="p-24 max-w-3xl">
      <Typography variant="h5" className="mb-16 font-semibold">
        Comunicaciones
      </Typography>

      <Paper className="p-24 rounded-2xl shadow">
        <Typography variant="h6" className="mb-16">
          Plantilla de Cumpleaños
        </Typography>
        
        <Alert severity="info" className="mb-24">
          Utilice <strong>{`{{NAME}}`}</strong> donde desee que aparezca el nombre del médico en el correo.
        </Alert>

        <TextField
          label="Asunto del Correo"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          fullWidth
          variant="outlined"
          className="mb-24"
        />

        <TextField
          label="Contenido HTML del Correo"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          fullWidth
          multiline
          rows={10}
          variant="outlined"
          className="mb-24"
        />

        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : 'Guardar Plantilla'}
          </Button>
        </Box>
      </Paper>
    </div>
  );
}

export default Communications;
