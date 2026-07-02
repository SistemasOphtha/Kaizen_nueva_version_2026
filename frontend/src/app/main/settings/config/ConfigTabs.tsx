import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';

/**
 * Componente de pestañas para la navegación de configuraciones
 */
function ConfigTabs() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  // Configuración de las pestañas
  const tabs = [
    {
      label: 'General',
      icon: 'heroicons-outline:cog',
      path: '/settings/general'
    },
    {
      label: 'Días Festivos',
      icon: 'heroicons-outline:calendar',
      path: '/settings/holidays'
    },
    {
      label: 'Comunicaciones',
      icon: 'heroicons-outline:mail',
      path: '/settings/communications'
    }
  ];

  // Actualizar la pestaña activa según la ruta actual
  useEffect(() => {
    const currentTabIndex = tabs.findIndex(tab => location.pathname === tab.path);
    if (currentTabIndex >= 0) {
      setActiveTab(currentTabIndex);
    }
  }, [location.pathname, tabs]);

  // Manejar el cambio de pestaña
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    navigate(tabs[newValue].path);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="secondary"
        textColor="secondary"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            icon={<FuseSvgIcon size={20}>{tab.icon}</FuseSvgIcon>}
            iconPosition="start"
            sx={{ 
              minHeight: 48,
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              px: 3
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default ConfigTabs;
