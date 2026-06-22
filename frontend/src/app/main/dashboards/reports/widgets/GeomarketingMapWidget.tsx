import { useEffect, useState, useRef, memo } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAppSelector } from 'app/store';
import { selectWidgets } from '../store/widgetsSlice';

const L_CSS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const L_JS_URL = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

/**
 * The GeomarketingMapWidget component.
 */
function GeomarketingMapWidget() {
	const widgets = useAppSelector(selectWidgets) as any;
	const thirds = widgets?.thirdsReport?.data || [];
	const [leafletLoaded, setLeafletLoaded] = useState(false);
	const mapRef = useRef<any>(null);
	const markersRef = useRef<any[]>([]);

	// Cargar Leaflet dinámicamente
	useEffect(() => {
		if ((window as any).L) {
			setLeafletLoaded(true);
			return;
		}

		// Insertar CSS de Leaflet
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = L_CSS_URL;
		document.head.appendChild(link);

		// Insertar JS de Leaflet
		const script = document.createElement('script');
		script.src = L_JS_URL;
		script.async = true;
		script.crossOrigin = 'anonymous';
		script.onload = () => {
			setLeafletLoaded(true);
		};
		document.head.appendChild(script);
	}, []);

	// 1. Inicializar mapa y limpiarlo sólo al desmontar
	useEffect(() => {
		if (!leafletLoaded) return;
		const L = (window as any).L;
		if (!L) return;

		if (!mapRef.current) {
			mapRef.current = L.map('geomarketing-map').setView([4.570868, -74.297333], 5);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '© OpenStreetMap'
			}).addTo(mapRef.current);
		}

		return () => {
			if (mapRef.current) {
				mapRef.current.remove();
				mapRef.current = null;
			}
		};
	}, [leafletLoaded]);

	// 2. Actualizar marcadores cuando cambian los 'thirds'
	useEffect(() => {
		if (!leafletLoaded || !thirds || !mapRef.current) return;
		const L = (window as any).L;
		if (!L) return;

		const map = mapRef.current;

		// Limpiar marcadores anteriores
		markersRef.current.forEach((marker) => map.removeLayer(marker));
		markersRef.current = [];

		// Filtrar terceros que posean coordenadas de geolocalización válidas
		const validThirds = thirds.filter((t: any) => t.latitude && t.longitude);

		if (validThirds.length > 0) {
			const bounds: any[] = [];

			validThirds.forEach((third: any) => {
				const { latitude, longitude, name, additionalName, address, city, impact, third_type } = third;
				bounds.push([latitude, longitude]);

				const typeName = third_type?.name || 'Tercero';

				const popupContent = `
					<div style="font-family: 'Outfit', sans-serif; font-size: 13px; line-height: 1.5; color: #1e293b; padding: 4px;">
						<strong style="font-size: 14px; color: #0f172a;">${name} ${additionalName || ''}</strong><br/>
						<span style="color: #64748b; font-weight: 600;">Tipo: ${typeName}</span><br/>
						<span style="color: #475569;">${address} - ${city}</span><br/>
						<span style="color: #0284c7; font-weight: 700;">Impactos requeridos: ${impact || 0}</span>
					</div>
				`;

				const marker = L.marker([latitude, longitude])
					.addTo(map)
					.bindPopup(popupContent);

				markersRef.current.push(marker);
			});

			// Ajustar vista del mapa para encuadrar todos los pines con un padding
			// animate: false previene el error _leaflet_pos si el componente se desmonta rápido
			map.fitBounds(bounds, { padding: [40, 40], animate: false });
		}
	}, [leafletLoaded, thirds]);

	return (
		<Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
			<Box className="flex flex-col items-start justify-start mb-24">
				<Typography className="text-18 font-medium tracking-tight leading-6 truncate">
					Geomarketing: Cobertura y Densidad Comercial
				</Typography>
				<Typography className="font-medium text-14" color="text.secondary">
					Distribución geográfica de médicos y paneles activos. Modifica los filtros del reporte para actualizar los pines del mapa en tiempo real.
				</Typography>
			</Box>
			<div
				id="geomarketing-map"
				style={{
					height: '450px',
					width: '100%',
					borderRadius: '16px',
					border: '1px solid rgba(0, 0, 0, 0.12)',
					zIndex: 1
				}}
			/>
		</Paper>
	);
}

export default memo(GeomarketingMapWidget);
