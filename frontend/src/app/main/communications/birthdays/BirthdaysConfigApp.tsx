import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import Grid from '@mui/material/Grid';

function BirthdaysConfigApp() {
  const { enqueueSnackbar } = useSnackbar();
  
  const [templateConfig, setTemplateConfig] = useState({ subject: '', html: '' });
  const [smtpConfig, setSmtpConfig] = useState({ host: '', port: '', user: '', pass: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchConfigs();
  }, []);

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/config');
      const configs = res.data;
      
      const emailTemplateRaw = configs.find((c: any) => c.name === 'birthday_email_template');
      if (emailTemplateRaw && emailTemplateRaw.value) {
        try {
          const parsed = JSON.parse(emailTemplateRaw.value);
          setTemplateConfig({
            subject: parsed.subject || '',
            html: parsed.html || ''
          });
        } catch (e) {}
      }

      const smtpRaw = configs.find((c: any) => c.name === 'birthday_smtp_config');
      if (smtpRaw && smtpRaw.value) {
        try {
          const parsed = JSON.parse(smtpRaw.value);
          setSmtpConfig({
            host: parsed.host || '',
            port: parsed.port || '',
            user: parsed.user || '',
            pass: parsed.pass || ''
          });
        } catch (e) {}
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al cargar la configuración', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const payload = [
        {
          name: 'birthday_email_template',
          label: 'Plantilla de Correo de Cumpleaños',
          value: JSON.stringify(templateConfig),
          type: 'system'
        },
        {
          name: 'birthday_smtp_config',
          label: 'Credenciales SMTP Cumpleaños',
          value: JSON.stringify(smtpConfig),
          type: 'system'
        }
      ];

      await axios.put('/api/config', payload);
      enqueueSnackbar('Configuraciones guardadas correctamente', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error al guardar la configuración', { variant: 'error' });
    }
  };

  return (
    <div className="flex flex-col flex-auto p-24 sm:p-32 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Typography className="text-3xl md:text-4xl font-extrabold tracking-tight mb-32">
          Configuración de Correos de Cumpleaños
        </Typography>

        <Grid container spacing={32}>
          <Grid item xs={12} md={6}>
            <Paper className="p-24 shadow rounded-2xl h-full">
              <Typography className="text-xl font-bold mb-24">
                Servidor SMTP (Remitente)
              </Typography>
              <Typography color="text.secondary" className="mb-24">
                Configura la cuenta de correo desde la cual se enviarán los correos de cumpleaños automáticos.
              </Typography>
              
              <TextField
                className="mb-24"
                label="Host SMTP (ej. smtp.gmail.com)"
                fullWidth
                variant="outlined"
                value={smtpConfig.host}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, host: e.target.value })}
              />
              
              <TextField
                className="mb-24"
                label="Puerto SMTP (ej. 465 o 587)"
                fullWidth
                variant="outlined"
                value={smtpConfig.port}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, port: e.target.value })}
              />
              
              <TextField
                className="mb-24"
                label="Usuario (Correo Electrónico)"
                fullWidth
                variant="outlined"
                value={smtpConfig.user}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, user: e.target.value })}
              />

              <TextField
                className="mb-24"
                label="Contraseña"
                type="password"
                fullWidth
                variant="outlined"
                value={smtpConfig.pass}
                onChange={(e) => setSmtpConfig({ ...smtpConfig, pass: e.target.value })}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper className="p-24 shadow rounded-2xl h-full">
              <Typography className="text-xl font-bold mb-24">
                Plantilla HTML
              </Typography>
              <Typography color="text.secondary" className="mb-24">
                Escribe el Asunto y el HTML del correo para los médicos. Usa la variable {'{{NAME}}'} donde quieras que aparezca el nombre del médico.
              </Typography>

              <TextField
                className="mb-24"
                label="Asunto del Correo"
                fullWidth
                variant="outlined"
                value={templateConfig.subject}
                onChange={(e) => setTemplateConfig({ ...templateConfig, subject: e.target.value })}
              />

              <TextField
                label="Código HTML"
                fullWidth
                multiline
                rows={12}
                variant="outlined"
                value={templateConfig.html}
                onChange={(e) => setTemplateConfig({ ...templateConfig, html: e.target.value })}
              />
            </Paper>
          </Grid>
        </Grid>

        <div className="flex items-center justify-end mt-32">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSave}
            disabled={loading}
          >
            Guardar Configuración
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default BirthdaysConfigApp;
