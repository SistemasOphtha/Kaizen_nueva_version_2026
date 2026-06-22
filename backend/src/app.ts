import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Routes
import indexRoutes from './routes/index.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import thirdsRoutes from './routes/thirds.routes';
import userClassificationsRoutes from './routes/userClassifications.routes';
import regionsRoutes from './routes/region.routes';
import thirdClassificationRoutes from './routes/thirdClassifications.routes';
import thirdTypesRoutes from './routes/thirdTypes.routes';
import thirdSpecialtyRoutes from './routes/thirdSpecialty.routes';
import thirdSubSpecialtyRoutes from './routes/thirdSubSpecialty.routes';
import visitRoutes from './routes/visits.routes';
import CalendarRoutes from './routes/calendar.routes';
import TypeEventRoutes from './routes/typeEvent.routes';
import WorkplanRoutes from './routes/workplan.routes';
import WidgetRoutes from './routes/widget.routes';
import JustificationRoutes from './routes/justifications.routes';
import ConfigRoutes from './routes/config.routes';
import NotificationsRoutes from './routes/notifications.routes';
import QuicksRoutes from './routes/quicks.routes';
import PortfolioRoutes from './routes/portfolio.routes';
import ReportsRoutes from './routes/reports.routes';

const app = express();

// Settings
app.set("port", process.env.NODE_LOCAL_PORT || 4001);
app.set("json spaces", 4);

// Middlewares
app.use('/uploads', express.static('uploads'));
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan enabled');
} else {
  app.use(morgan('combined'));
  console.log('Morgan disabled');
}
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api", indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/thirds", thirdsRoutes);
app.use("/api/user-classifications", userClassificationsRoutes);
app.use("/api/third-regions", regionsRoutes);
app.use("/api/user-regions", regionsRoutes);
app.use("/api/third-classifications", thirdClassificationRoutes);
app.use("/api/third-types", thirdTypesRoutes);
app.use("/api/third-specialtys", thirdSpecialtyRoutes);
app.use("/api/third-sub-specialtys", thirdSubSpecialtyRoutes);
app.use("/api/visits", visitRoutes);
app.use("/api/calendar", CalendarRoutes);
app.use("/api/type-events", TypeEventRoutes);
app.use("/api/workplans", WorkplanRoutes);
app.use("/api/widgets", WidgetRoutes);
app.use("/api/justifications", JustificationRoutes);
app.use("/api/configs", ConfigRoutes);
app.use("/api/notifications",  NotificationsRoutes);
app.use("/api/quicks", QuicksRoutes);
app.use("/api/portfolios", PortfolioRoutes);
app.use("/api/reports", ReportsRoutes);

export default app;
