--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: enum_configs_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_configs_type AS ENUM (
    'system',
    'custom'
);


--
-- Name: enum_justifications_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_justifications_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_notifications_variant; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_notifications_variant AS ENUM (
    'success',
    'info',
    'warning',
    'error'
);


--
-- Name: enum_portfolios_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_portfolios_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_region_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_region_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_third_classification_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_third_classification_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_third_specialty_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_third_specialty_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_third_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_third_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_third_subspecialty_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_third_subspecialty_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_third_type_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_third_type_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_thirds_portfolios_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_thirds_portfolios_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_type_events_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_type_events_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_user_classification_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_user_classification_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_users_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_visits_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_visits_status AS ENUM (
    'active',
    'inactive'
);


--
-- Name: enum_workplans_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_workplans_status AS ENUM (
    'active',
    'inactive'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: calendar_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.calendar_events (
    id character varying(255) NOT NULL,
    title character varying(50) NOT NULL,
    "allDay" boolean NOT NULL,
    start character varying(255) NOT NULL,
    "end" character varying(255) NOT NULL,
    "extendedProps" json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: calendar_labels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.calendar_labels (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    color character varying(10) NOT NULL,
    type character varying(6) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: calendar_labels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.calendar_labels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: calendar_labels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.calendar_labels_id_seq OWNED BY public.calendar_labels.id;


--
-- Name: configs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.configs (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    label character varying(50) NOT NULL,
    value text NOT NULL,
    type public.enum_configs_type DEFAULT 'system'::public.enum_configs_type NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: configs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.configs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: configs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.configs_id_seq OWNED BY public.configs.id;


--
-- Name: justifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.justifications (
    id integer NOT NULL,
    "thirdId" integer NOT NULL,
    "userId" integer NOT NULL,
    date timestamp with time zone NOT NULL,
    "dateToJustify" timestamp with time zone NOT NULL,
    description text NOT NULL,
    status public.enum_justifications_status DEFAULT 'active'::public.enum_justifications_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: justifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.justifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: justifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.justifications_id_seq OWNED BY public.justifications.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    icon character varying(50),
    title character varying(50) NOT NULL,
    description character varying(120) NOT NULL,
    "time" timestamp with time zone NOT NULL,
    read boolean DEFAULT false NOT NULL,
    variant public.enum_notifications_variant DEFAULT 'info'::public.enum_notifications_variant NOT NULL,
    "useRouter" boolean DEFAULT false NOT NULL,
    link text,
    image text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: portfolios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.portfolios (
    id integer NOT NULL,
    name character varying(80) NOT NULL,
    "userId" integer NOT NULL,
    status public.enum_portfolios_status DEFAULT 'active'::public.enum_portfolios_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.portfolios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: portfolios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.portfolios_id_seq OWNED BY public.portfolios.id;


--
-- Name: region; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.region (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    status public.enum_region_status DEFAULT 'active'::public.enum_region_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: region_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.region_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.region_id_seq OWNED BY public.region.id;


--
-- Name: session_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session_logs (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "ipAddress" character varying(45),
    "userAgent" text,
    "loginTime" timestamp with time zone DEFAULT now() NOT NULL,
    "logoutTime" timestamp with time zone,
    duration integer,
    details jsonb,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: session_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.session_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: session_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.session_logs_id_seq OWNED BY public.session_logs.id;


--
-- Name: third; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.third (
    id integer NOT NULL,
    "typeIdentification" character varying(50) NOT NULL,
    identification character varying(50) NOT NULL,
    name character varying(50) NOT NULL,
    "additionalName" character varying(50),
    address character varying(50) NOT NULL,
    phone character varying(50),
    mobile character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    city character varying(50) NOT NULL,
    birthday timestamp with time zone NOT NULL,
    gender character varying(10),
    impact integer NOT NULL,
    supplied character varying(50),
    "typeId" integer,
    "classificationId" integer,
    "specialtyId" integer,
    "subSpecialtyId" integer,
    "regionId" integer NOT NULL,
    status public.enum_third_status DEFAULT 'active'::public.enum_third_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    "habeasDataConsent" boolean DEFAULT false,
    "habeasDataFileUrl" character varying(255),
    "habeasDataSignature" text,
    latitude double precision,
    longitude double precision
);


--
-- Name: third_classification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.third_classification (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    status public.enum_third_classification_status DEFAULT 'active'::public.enum_third_classification_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: third_classification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.third_classification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: third_classification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.third_classification_id_seq OWNED BY public.third_classification.id;


--
-- Name: third_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.third_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: third_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.third_id_seq OWNED BY public.third.id;


--
-- Name: third_specialty; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.third_specialty (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    status public.enum_third_specialty_status DEFAULT 'active'::public.enum_third_specialty_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: third_specialty_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.third_specialty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: third_specialty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.third_specialty_id_seq OWNED BY public.third_specialty.id;


--
-- Name: third_subspecialty; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.third_subspecialty (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    "specialtyId" integer,
    status public.enum_third_subspecialty_status DEFAULT 'active'::public.enum_third_subspecialty_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: third_subspecialty_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.third_subspecialty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: third_subspecialty_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.third_subspecialty_id_seq OWNED BY public.third_subspecialty.id;


--
-- Name: third_type; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.third_type (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    status public.enum_third_type_status DEFAULT 'active'::public.enum_third_type_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: third_type_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.third_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: third_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.third_type_id_seq OWNED BY public.third_type.id;


--
-- Name: thirds_portfolios; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.thirds_portfolios (
    id integer NOT NULL,
    "portfolioId" integer NOT NULL,
    "thirdId" integer NOT NULL,
    approved boolean DEFAULT true NOT NULL,
    status public.enum_thirds_portfolios_status DEFAULT 'active'::public.enum_thirds_portfolios_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: thirds_portfolios_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.thirds_portfolios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: thirds_portfolios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.thirds_portfolios_id_seq OWNED BY public.thirds_portfolios.id;


--
-- Name: type_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.type_events (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    status public.enum_type_events_status DEFAULT 'active'::public.enum_type_events_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: type_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.type_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: type_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.type_events_id_seq OWNED BY public.type_events.id;


--
-- Name: user_classification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_classification (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    status public.enum_user_classification_status DEFAULT 'active'::public.enum_user_classification_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    permissions jsonb
);


--
-- Name: user_classification_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_classification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_classification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_classification_id_seq OWNED BY public.user_classification.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(25) NOT NULL,
    "lastName" character varying(25) NOT NULL,
    email character varying(120) NOT NULL,
    phone character varying(15),
    mobile character varying(15),
    password character varying(180) NOT NULL,
    category character varying(50),
    "classificationId" integer NOT NULL,
    "regionId" integer NOT NULL,
    shortcuts json,
    status public.enum_users_status DEFAULT 'active'::public.enum_users_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    "coordinatorId" integer,
    permissions jsonb,
    "twoFactorEnabled" boolean DEFAULT false,
    "twoFactorSecret" character varying(255)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: visits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.visits (
    id integer NOT NULL,
    "typeId" integer NOT NULL,
    "thirdId" integer NOT NULL,
    "userId" integer NOT NULL,
    date timestamp with time zone NOT NULL,
    objective text NOT NULL,
    comment text,
    status public.enum_visits_status DEFAULT 'active'::public.enum_visits_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone,
    latitude double precision,
    longitude double precision,
    "isVerified" boolean DEFAULT false
);


--
-- Name: visits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.visits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: visits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.visits_id_seq OWNED BY public.visits.id;


--
-- Name: workplans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.workplans (
    id integer NOT NULL,
    "userId" integer,
    "typeEventId" integer,
    "startDate" timestamp with time zone NOT NULL,
    "endDate" timestamp with time zone NOT NULL,
    description text NOT NULL,
    status public.enum_workplans_status DEFAULT 'active'::public.enum_workplans_status NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "deletedAt" timestamp with time zone
);


--
-- Name: workplans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.workplans_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: workplans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.workplans_id_seq OWNED BY public.workplans.id;


--
-- Name: calendar_labels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.calendar_labels ALTER COLUMN id SET DEFAULT nextval('public.calendar_labels_id_seq'::regclass);


--
-- Name: configs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configs ALTER COLUMN id SET DEFAULT nextval('public.configs_id_seq'::regclass);


--
-- Name: justifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.justifications ALTER COLUMN id SET DEFAULT nextval('public.justifications_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: portfolios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portfolios ALTER COLUMN id SET DEFAULT nextval('public.portfolios_id_seq'::regclass);


--
-- Name: region id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.region ALTER COLUMN id SET DEFAULT nextval('public.region_id_seq'::regclass);


--
-- Name: session_logs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_logs ALTER COLUMN id SET DEFAULT nextval('public.session_logs_id_seq'::regclass);


--
-- Name: third id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third ALTER COLUMN id SET DEFAULT nextval('public.third_id_seq'::regclass);


--
-- Name: third_classification id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_classification ALTER COLUMN id SET DEFAULT nextval('public.third_classification_id_seq'::regclass);


--
-- Name: third_specialty id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_specialty ALTER COLUMN id SET DEFAULT nextval('public.third_specialty_id_seq'::regclass);


--
-- Name: third_subspecialty id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_subspecialty ALTER COLUMN id SET DEFAULT nextval('public.third_subspecialty_id_seq'::regclass);


--
-- Name: third_type id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_type ALTER COLUMN id SET DEFAULT nextval('public.third_type_id_seq'::regclass);


--
-- Name: thirds_portfolios id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.thirds_portfolios ALTER COLUMN id SET DEFAULT nextval('public.thirds_portfolios_id_seq'::regclass);


--
-- Name: type_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type_events ALTER COLUMN id SET DEFAULT nextval('public.type_events_id_seq'::regclass);


--
-- Name: user_classification id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_classification ALTER COLUMN id SET DEFAULT nextval('public.user_classification_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: visits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits ALTER COLUMN id SET DEFAULT nextval('public.visits_id_seq'::regclass);


--
-- Name: workplans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workplans ALTER COLUMN id SET DEFAULT nextval('public.workplans_id_seq'::regclass);


--
-- Data for Name: calendar_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.calendar_events (id, title, "allDay", start, "end", "extendedProps", "createdAt", "updatedAt", "deletedAt") FROM stdin;
0b3ce9c5-df63-4ee7-a099-1d2d7ed6bdcf	visita cliente	t	2024-10-04T05:00:00.000Z	2024-10-04T05:00:00.000Z	{"desc": "visita cliente", "label": 1, "component": {"id": 16, "type": "visits", "route": "/apps/visits/16"}}	2024-10-03 17:19:00-05	2024-10-03 17:19:00-05	\N
17c9e149-db6f-4f4f-b994-8af24f703fa1	Visita # 2	t	2024-04-24T15:00:00.000Z	2024-04-24T15:00:00.000Z	{"desc": "Visita # 2", "label": 1, "component": {"id": 5, "type": "visits", "route": "/apps/visits/5"}}	2024-05-20 15:08:53-05	2024-05-20 15:08:53-05	\N
20730bf8-b710-4201-a4db-a25813c98097	Prueba	t	2026-03-13T05:00:00.000Z	2026-03-13T05:00:00.000Z	{"desc": "Prueba", "label": 1, "component": {"id": 18, "type": "visits", "route": "/apps/visits/18"}}	2026-03-12 13:55:32-05	2026-03-12 13:55:32-05	\N
25930d06-f336-4a9c-bec3-2d1633bede76	Prueba	t	2024-05-20T15:00:00.000Z	2024-05-20T15:00:00.000Z	{"desc": "Prueba", "label": 1, "component": {"id": 7, "type": "visits", "route": "/apps/visits/7"}}	2024-05-20 15:10:24-05	2024-05-20 15:10:24-05	\N
3332e54d-ac32-4181-b70f-6dd01b928db2	Plan de trabajo	t	2024-10-04T12:30:00.000Z	2024-10-04T23:00:00.000Z	{"desc": "Plan de trabajo", "label": 2, "component": {"id": 15, "type": "workplans", "route": "/dashboards/workplans/15"}}	2024-10-03 17:22:28-05	2024-10-03 17:22:28-05	\N
35d355e2-f501-4795-b4e8-88e6bce5e8ef	Plan febrero	f	2026-02-08T05:00:00.000Z	2026-02-13T05:00:00.000Z	{"desc": "Plan febrero", "label": 2, "component": {"id": 18, "type": "workplans", "route": "/dashboards/workplans/18"}}	2026-03-17 00:14:54-05	2026-03-17 00:14:54-05	\N
3e778194-46bb-4783-8b48-c6ad6c7580c4	prueba	t	2024-07-11T05:00:00.000Z	2024-07-11T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 13, "type": "visits", "route": "/apps/visits/13"}}	2024-07-11 12:46:10-05	2024-07-11 12:46:10-05	\N
4471f799-e039-4ec0-a360-c2a21baf24d1	Cesar 	t	2024-08-28T05:00:00.000Z	2024-08-28T05:00:00.000Z	{"desc": "Cesar ", "label": 2, "component": {"id": 12, "type": "workplans", "route": "/dashboards/workplans/12"}}	2024-08-28 03:08:55-05	2024-08-28 03:08:55-05	\N
454188c2-1af8-4caf-a6a8-cf0e876d28b3	cesa vaca	t	2024-06-04T05:00:00.000Z	2024-06-04T05:00:00.000Z	{"desc": "cesa vaca", "label": 2, "component": {"id": 13, "type": "workplans", "route": "/dashboards/workplans/13"}}	2024-08-28 03:10:14-05	2024-08-28 03:10:14-05	\N
48a17949-0739-4811-90f7-a433fb9dea11	sdxfcvbnm,	t	2024-03-31T05:00:00.000Z	2024-03-31T17:00:00.000Z	{"desc": "sdxfcvbnm,", "label": 2, "component": {"id": 6, "type": "workplans", "route": "/apps/workplans/6"}}	2024-03-20 12:39:19-05	2024-03-20 12:39:19-05	\N
4918db3c-735a-4511-8f2d-3c6812efea92	>Test prueba	t	2024-04-18T13:30:00.000Z	2024-04-18T13:30:00.000Z	{"desc": ">Test prueba", "label": 1, "component": {"id": 3, "type": "visits", "route": "/apps/visits/3"}}	2024-04-18 22:55:25-05	2024-04-18 22:55:25-05	\N
56b77cb3-a0e2-42b2-9235-1b1671462d41	Dra. XX	t	2024-07-08T13:00:00.000Z	2024-07-08T05:00:00.000Z	{"desc": "Dra. XX", "label": 2, "component": {"id": 9, "type": "workplans", "route": "/apps/workplans/9"}}	2024-07-05 17:19:00-05	2024-07-05 17:19:00-05	\N
6bb64855-852d-44fe-830e-da82807285a3	prueba	t	2024-07-05T05:00:00.000Z	2024-07-05T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 11, "type": "visits", "route": "/apps/visits/11"}}	2024-07-05 17:09:21-05	2024-07-05 17:09:21-05	\N
6f44e676-ba5a-4894-ac0e-7fdaa1526547	Visita almacen	t	2024-03-20T11:30:00.000Z	2024-03-20T11:30:00.000Z	{"desc": "Visita almacen", "label": 1, "component": {"id": 1, "type": "visits", "route": "/apps/visits/1"}}	2024-03-20 14:35:53-05	2024-03-20 14:35:53-05	\N
72a3cad2-9367-4961-b3ad-c4a3525d5aa9	Antioquia	t	2024-04-02T05:00:00.000Z	2024-04-02T17:00:00.000Z	{"desc": "Antioquia", "label": 2, "component": {"id": 3, "type": "workplans", "route": "/apps/workplans/3"}}	2024-03-20 12:23:16-05	2024-03-20 12:23:16-05	\N
7ab22085-a8de-47b3-8814-387b3c894547	prueba 11/06/2024	t	2024-06-07T05:00:00.000Z	2024-06-07T05:00:00.000Z	{"desc": "prueba 11/06/2024", "label": 1, "component": {"id": 8, "type": "visits", "route": "/apps/visits/8"}}	2024-06-11 14:28:25-05	2024-06-11 14:28:25-05	\N
803840dd-bb8a-4dde-9077-c8540bbb3c8d	prueba	t	2024-03-22T05:00:00.000Z	2024-03-22T17:30:00.000Z	{"desc": "prueba", "label": 2, "component": {"id": 8, "type": "workplans", "route": "/apps/workplans/8"}}	2024-03-20 13:34:15-05	2024-03-20 13:34:15-05	\N
8a1c8e09-384b-4fee-bba0-8686807a58d8	Prueba	t	2024-05-09T15:00:00.000Z	2024-05-09T15:00:00.000Z	{"desc": "Prueba", "label": 1, "component": {"id": 6, "type": "visits", "route": "/apps/visits/6"}}	2024-05-20 15:09:48-05	2024-05-20 15:09:48-05	\N
8ebb6307-607f-40f3-86ae-a2d90117cc99	vacaciones 	t	2024-03-20T11:00:00.000Z	2024-03-31T11:00:00.000Z	{"desc": "vacaciones ", "label": 2, "component": {"id": 1, "type": "workplans", "route": "/apps/workplans/1"}}	2024-03-20 12:07:51-05	2024-03-20 12:07:51-05	\N
92773738-b201-45f3-b5df-9e76978fa3f9	Visita prueba	t	2024-04-18T12:15:00.000Z	2024-04-18T12:15:00.000Z	{"desc": "Visita prueba", "label": 1, "component": {"id": 2, "type": "visits", "route": "/apps/visits/2"}}	2024-04-18 22:48:27-05	2024-04-18 22:48:27-05	\N
9b67a6d2-a4e4-4831-88e2-6f202a2ca217	DIA DE LA FAMILIA	t	2024-07-03T12:00:00.000Z	2024-07-03T12:00:00.000Z	{"desc": "DIA DE LA FAMILIA", "label": 2, "component": {"id": 10, "type": "workplans", "route": "/apps/workplans/10"}}	2024-07-05 17:51:13-05	2024-07-05 17:51:13-05	\N
9beb05ad-9e29-4a72-831d-260b454ce770	Prueba 5 de julio	t	2024-07-04T05:00:00.000Z	2024-07-04T05:00:00.000Z	{"desc": "Prueba 5 de julio", "label": 1, "component": {"id": 9, "type": "visits", "route": "/apps/visits/9"}}	2024-07-05 16:52:05-05	2024-07-05 16:52:05-05	\N
acc8017d-e6aa-404f-818c-f1bbf418ace7	prueba	t	2024-03-31T05:00:00.000Z	2024-03-31T17:00:00.000Z	{"desc": "prueba", "label": 2, "component": {"id": 7, "type": "workplans", "route": "/apps/workplans/7"}}	2024-03-20 12:44:00-05	2024-03-20 12:44:00-05	\N
aec4dc73-04fa-4c9f-98b5-bbfe75a4a212	esgdh 	t	2024-03-03T05:00:00.000Z	2024-03-03T05:00:00.000Z	{"desc": "esgdh ", "label": 2, "component": {"id": 4, "type": "workplans", "route": "/apps/workplans/4"}}	2024-03-20 12:24:36-05	2024-03-20 12:24:36-05	\N
b9c4b960-8a10-42b7-ada5-14f00ecec3e2	dbdb	t	2024-07-11T05:00:00.000Z	2024-07-11T05:00:00.000Z	{"desc": "dbdb", "label": 1, "component": {"id": 15, "type": "visits", "route": "/apps/visits/15"}}	2024-07-11 12:47:40-05	2024-07-11 12:47:40-05	\N
ba94caa5-9322-45cd-96ef-3d8aacf6d51c	Visita méduica	t	2024-04-11T15:00:00.000Z	2024-04-11T15:00:00.000Z	{"desc": "Visita méduica", "label": 1, "component": {"id": 4, "type": "visits", "route": "/apps/visits/4"}}	2024-05-20 15:06:15-05	2024-05-20 15:06:15-05	\N
c9254262-c52c-423a-86b1-acb4b7a94924	venta	t	2024-10-15T05:00:00.000Z	2024-10-15T05:00:00.000Z	{"desc": "venta", "label": 1, "component": {"id": 17, "type": "visits", "route": "/apps/visits/17"}}	2024-10-15 14:31:21-05	2024-10-15 14:31:21-05	\N
d52286f7-d17c-4071-ba0e-eb4eb52bf169	prueba	t	2024-07-05T05:00:00.000Z	2024-07-05T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 12, "type": "visits", "route": "/apps/visits/12"}}	2024-07-05 17:14:43-05	2024-07-05 17:14:43-05	\N
e71eec8d-14b2-4efa-b96e-0f266764c6a7	Plan de Trabajo Febrero	f	2026-02-22T05:00:00.000Z	2026-02-27T05:00:00.000Z	{"desc": "Plan de Trabajo Febrero", "label": 2, "component": {"id": 17, "type": "workplans", "route": "/dashboards/workplans/17"}}	2026-03-12 12:52:15-05	2026-03-12 12:52:15-05	\N
e8778332-8cb4-4269-9d1d-7e2d8c39368c	rxctvbnm	t	2024-03-20T05:00:00.000Z	2024-03-20T17:00:00.000Z	{"desc": "rxctvbnm", "label": 2, "component": {"id": 5, "type": "workplans", "route": "/apps/workplans/5"}}	2024-03-20 12:35:48-05	2024-03-20 12:35:48-05	\N
e9bf0af8-aec0-4913-8e8a-9e206fe7b9ec	Plan Semana	f	2026-03-13T05:00:00.000Z	2026-03-19T05:00:00.000Z	{"desc": "Plan Semana", "label": 2, "component": {"id": 16, "type": "workplans", "route": "/dashboards/workplans/16"}}	2026-03-12 05:50:10-05	2026-03-12 05:50:10-05	\N
eb125707-7f41-4aeb-9cca-c4259e071e40	trabajo completo \n	t	2024-03-20T05:00:00.000Z	2024-03-20T17:00:00.000Z	{"desc": "trabajo completo \\n", "label": 2, "component": {"id": 2, "type": "workplans", "route": "/apps/workplans/2"}}	2024-03-20 12:08:39-05	2024-03-20 12:08:39-05	\N
eb6e6300-5962-4566-b31c-ca756f618ea1	Test Inasistencia	t	2024-10-15T11:00:00.000Z	2024-10-18T11:00:00.000Z	{"desc": "Test Inasistencia", "label": 2, "component": {"id": 14, "type": "workplans", "route": "/dashboards/workplans/14"}}	2024-10-03 17:21:39-05	2024-10-03 17:21:39-05	\N
edc06617-563d-4712-ae2b-63174638a4fa	prueba	t	2024-07-11T05:00:00.000Z	2024-07-11T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 14, "type": "visits", "route": "/apps/visits/14"}}	2024-07-11 12:46:49-05	2024-07-11 12:46:49-05	\N
f4fe6444-2f10-4b4d-8a0d-eb5fad813eab	prueba 5 de julio	t	2024-07-05T05:00:00.000Z	2024-07-05T05:00:00.000Z	{"desc": "prueba 5 de julio", "label": 1, "component": {"id": 10, "type": "visits", "route": "/apps/visits/10"}}	2024-07-05 16:52:35-05	2024-07-05 16:52:35-05	\N
f8c6818f-844b-408e-8b05-f83785c3c459	test ina	t	2024-08-06T05:00:00.000Z	2024-08-06T05:00:00.000Z	{"desc": "test ina", "label": 2, "component": {"id": 11, "type": "workplans", "route": "/dashboards/workplans/11"}}	2024-08-05 16:26:36-05	2024-08-05 16:26:36-05	\N
\.


--
-- Data for Name: calendar_labels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.calendar_labels (id, title, color, type, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Visita	#13B013	system	2024-02-28 20:17:28-05	2024-02-28 20:17:28-05	\N
2	Plan de trabajo	#D6C520	system	2024-02-28 20:17:47-05	2024-02-28 20:17:47-05	\N
3	Cumpleaños	#2E7AE1	system	2024-03-10 22:24:36-05	2024-03-10 22:24:36-05	\N
\.


--
-- Data for Name: configs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.configs (id, name, label, value, type, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	daily_hours	Horas díarias	9.2	system	2024-09-30 15:23:54-05	2024-09-30 15:23:54-05	\N
2	holidays	Días Festivos	["25-12-2025"]	custom	2025-12-16 20:39:26-05	2025-12-16 20:39:26-05	\N
4	last_closed_month	Último mes cerrado e impactos justificados	2026-05	custom	2026-06-05 19:39:15.205-05	2026-06-05 19:39:15.205-05	\N
3	last_birthday_check	Última verificación de cumpleaños	2026-06-18	custom	2026-06-05 19:39:14.832-05	2026-06-18 13:12:55.219-05	\N
\.


--
-- Data for Name: justifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.justifications (id, "thirdId", "userId", date, "dateToJustify", description, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	3	4	2024-04-20 15:21:17-05	2024-04-20 15:21:17-05	prueba	active	2024-05-20 15:21:17-05	2024-05-20 15:21:17-05	\N
2	4	4	2024-04-20 15:21:53-05	2024-04-20 15:21:53-05	prueba	active	2024-05-20 15:21:53-05	2024-05-20 15:21:53-05	\N
3	4	1	2024-05-29 03:22:47-05	2024-05-29 03:22:47-05	Prueba FarmaTS	active	2024-06-29 03:22:47-05	2024-06-29 03:22:47-05	\N
4	2	2	2024-05-29 03:26:06-05	2024-05-29 03:26:06-05	Prueba 	active	2024-06-29 03:26:06-05	2024-06-29 03:26:06-05	\N
5	3	2	2024-05-29 03:27:04-05	2024-05-29 03:27:04-05	prueba	active	2024-06-29 03:27:04-05	2024-06-29 03:27:04-05	\N
6	6	6	2024-06-05 17:21:11-05	2024-06-05 17:21:11-05	fdf prueba 23/07	active	2024-07-05 17:21:11-05	2024-07-23 16:37:25-05	\N
7	2	2	2024-07-05 16:39:58-05	2024-07-05 16:39:58-05	hola prueba sas s	active	2024-08-05 16:39:58-05	2024-08-28 03:07:58-05	\N
8	3	2	2024-07-05 16:42:10-05	2024-07-05 16:42:10-05	prueba 2 xxx s	active	2024-08-05 16:42:10-05	2024-08-28 03:07:15-05	\N
9	3	2	2024-09-03 17:17:23-05	2024-09-03 17:17:23-05	Test Justificacion	active	2024-10-03 17:17:23-05	2024-10-03 17:17:23-05	\N
10	2	2	2024-09-03 17:18:11-05	2024-09-03 17:18:11-05	test - justificaciones	active	2024-10-03 17:18:11-05	2024-10-03 17:18:11-05	\N
11	4	2	2024-09-15 14:30:35-05	2024-09-15 14:30:35-05	no se pudo realizar por vacaciones 	active	2024-10-15 14:30:35-05	2024-10-15 14:30:35-05	\N
12	158	18	2026-02-12 06:20:51-05	2026-02-12 06:20:51-05	Justi	active	2026-03-12 06:20:51-05	2026-03-12 06:20:51-05	\N
13	5	3	2026-06-05 19:39:14.982-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:14.983-05	2026-06-05 19:39:14.983-05	\N
14	5	3	2026-06-05 19:39:14.989-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:14.989-05	2026-06-05 19:39:14.989-05	\N
15	5	3	2026-06-05 19:39:14.992-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:14.992-05	2026-06-05 19:39:14.992-05	\N
16	167	3	2026-06-05 19:39:15.003-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.003-05	2026-06-05 19:39:15.003-05	\N
17	167	3	2026-06-05 19:39:15.007-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.007-05	2026-06-05 19:39:15.007-05	\N
18	167	3	2026-06-05 19:39:15.01-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.011-05	2026-06-05 19:39:15.011-05	\N
19	7	6	2026-06-05 19:39:15.031-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.031-05	2026-06-05 19:39:15.031-05	\N
20	7	6	2026-06-05 19:39:15.034-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.034-05	2026-06-05 19:39:15.034-05	\N
21	166	6	2026-06-05 19:39:15.05-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.05-05	2026-06-05 19:39:15.05-05	\N
22	166	6	2026-06-05 19:39:15.058-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.059-05	2026-06-05 19:39:15.059-05	\N
23	158	15	2026-06-05 19:39:15.103-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.103-05	2026-06-05 19:39:15.103-05	\N
24	158	15	2026-06-05 19:39:15.106-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.106-05	2026-06-05 19:39:15.106-05	\N
25	158	18	2026-06-05 19:39:15.132-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.132-05	2026-06-05 19:39:15.132-05	\N
26	158	18	2026-06-05 19:39:15.149-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.149-05	2026-06-05 19:39:15.149-05	\N
27	179	18	2026-06-05 19:39:15.161-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.161-05	2026-06-05 19:39:15.161-05	\N
28	179	18	2026-06-05 19:39:15.165-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.165-05	2026-06-05 19:39:15.165-05	\N
29	179	18	2026-06-05 19:39:15.168-05	2026-05-31 23:59:59.999-05	Pendiente de justificación	active	2026-06-05 19:39:15.168-05	2026-06-05 19:39:15.168-05	\N
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, icon, title, description, "time", read, variant, "useRouter", link, image, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	material-solid:person_add_alt	¡Nuevo panel creado!	Se ha creado un nuevo panel	2024-10-15 14:27:04-05	t	success	t	/records/thirds/168	\N	2024-10-15 14:27:04-05	2026-03-17 14:33:02-05	\N
2		¡Nuevo panel por aprobar!	El representante Cesar  Mendoza tiene un panel por aprobar.	2024-10-15 14:27:04-05	t	warning	t	/records/users/2	\N	2024-10-15 14:27:04-05	2026-03-17 14:33:02-05	\N
3	material-solid:person_add_alt	¡Nuevo panel asignado!	Se ha asignado un nuevo panel al representante	2025-10-07 20:38:20-05	t	success	t	/records/thirds/170	\N	2025-10-07 20:38:20-05	2026-03-17 14:33:02-05	\N
4		¡Nuevo panel por aprobar!	El representante Sistemas Ophtha tiene un panel por aprobar.	2025-10-07 20:38:20-05	t	warning	t	/records/users/7	\N	2025-10-07 20:38:20-05	2026-03-17 14:33:02-05	\N
5	material-solid:person_add_alt	¡Nuevo panel asignado!	Se ha asignado un nuevo panel al representante	2025-10-08 19:03:19-05	t	success	t	/records/thirds/171	\N	2025-10-08 19:03:19-05	2026-03-17 14:33:02-05	\N
6		¡Nuevo panel por aprobar!	El representante Sistemas Ophtha tiene un panel por aprobar.	2025-10-08 19:03:19-05	t	warning	t	/records/users/7	\N	2025-10-08 19:03:19-05	2026-03-17 14:33:02-05	\N
11	material-solid:person_add_alt	¡Nuevo panel creado!	Se ha creado un nuevo panel	2026-03-12 13:36:45-05	t	success	t	/records/thirds/178	\N	2026-03-12 13:36:45-05	2026-03-17 14:33:02-05	\N
12	material-solid:person_add_alt	¡Nuevo panel creado!	Se ha creado un nuevo panel	2026-03-12 13:49:22-05	t	success	t	/records/thirds/179	\N	2026-03-12 13:49:22-05	2026-03-17 14:33:02-05	\N
13		¡Nuevo panel por aprobar!	El representante Juan Mesa tiene un panel por aprobar.	2026-03-17 00:39:19-05	t	warning	t	/records/users/19	\N	2026-03-17 00:39:19-05	2026-03-17 14:33:02-05	\N
\.


--
-- Data for Name: portfolios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.portfolios (id, name, "userId", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Portafolio #2	2	active	2024-03-20 12:42:29-05	2024-03-20 12:42:29-05	\N
2	Portafolio #3	3	active	2024-03-20 14:35:18-05	2024-03-20 14:35:18-05	\N
3	Portafolio #6	6	active	2024-05-08 20:33:08-05	2024-05-08 20:33:08-05	\N
4	Portafolio #12	12	active	2024-10-15 14:29:16-05	2024-10-15 14:29:16-05	\N
5	Portafolio #7	7	active	2025-10-07 20:38:20-05	2025-10-07 20:38:20-05	\N
6	Portafolio de Usuario #18	18	active	2026-03-12 05:25:30-05	2026-03-12 05:25:30-05	\N
7	Portafolio de Usuario #15	15	active	2026-03-12 05:25:58-05	2026-03-12 05:25:58-05	\N
8	Portafolio de Usuario #19	19	active	2026-03-17 00:39:19-05	2026-03-17 00:39:19-05	\N
9	Portafolio de Hector Alvarez	22	active	2026-06-06 15:02:41.675708-05	2026-06-06 15:02:41.675708-05	\N
\.


--
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.region (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Antioquia	active	2024-02-08 04:26:28-05	2024-02-08 04:26:28-05	\N
2	Bogotá	active	2024-02-11 04:34:40-05	2024-02-11 04:34:40-05	\N
3	Boyacá	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
4	Cartagena	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
5	Choco	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
6	Costa	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
7	Eje Cafetero	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
8	Llanos Orientales	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
9	Monteria	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
10	Pasto	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
11	Santander	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
12	Sur	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
13	Tolima	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
14	Valle	active	2024-03-12 03:45:04-05	2024-03-12 03:45:04-05	\N
\.


--
-- Data for Name: session_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session_logs (id, "userId", "ipAddress", "userAgent", "loginTime", "logoutTime", duration, details, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-05 19:09:14.233-05	\N	\N	{"action": "token_login"}	2026-06-05 19:09:14.234-05	2026-06-05 19:09:14.234-05	\N
2	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-05 19:31:06.204-05	\N	\N	{"action": "login"}	2026-06-05 19:31:06.206-05	2026-06-05 19:31:06.206-05	\N
3	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-05 20:05:39.357-05	2026-06-05 20:07:57.536-05	138	{"action": "logout"}	2026-06-05 20:05:39.359-05	2026-06-05 20:07:57.537-05	\N
4	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-05 20:11:41.775-05	2026-06-05 20:14:22.004-05	160	{"action": "logout"}	2026-06-05 20:11:41.776-05	2026-06-05 20:14:22.004-05	\N
5	1	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-05 20:16:17.976-05	2026-06-05 20:32:15.364-05	957	{"action": "logout"}	2026-06-05 20:16:17.976-05	2026-06-05 20:32:15.364-05	\N
6	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 12:46:29.99-05	\N	\N	{"action": "login"}	2026-06-06 12:46:29.991-05	2026-06-06 12:46:29.991-05	\N
7	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 13:10:06.352-05	\N	\N	{"action": "login"}	2026-06-06 13:10:06.352-05	2026-06-06 13:10:06.352-05	\N
8	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 13:49:39.158-05	\N	\N	{"action": "login"}	2026-06-06 13:49:39.158-05	2026-06-06 13:49:39.158-05	\N
9	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 18:57:42.714-05	\N	\N	{"action": "login"}	2026-06-06 18:57:42.715-05	2026-06-06 18:57:42.715-05	\N
10	22	::1	node	2026-06-06 19:26:57.966-05	\N	\N	{"action": "login"}	2026-06-06 19:26:57.967-05	2026-06-06 19:26:57.967-05	\N
11	22	::1	node	2026-06-06 19:27:13.335-05	\N	\N	{"action": "login"}	2026-06-06 19:27:13.335-05	2026-06-06 19:27:13.335-05	\N
12	22	::1	node	2026-06-06 19:27:41.478-05	\N	\N	{"action": "login"}	2026-06-06 19:27:41.478-05	2026-06-06 19:27:41.478-05	\N
13	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-18 13:24:44.646-05	2026-06-18 14:24:34.99-05	3590	{"action": "logout"}	2026-06-18 13:24:44.647-05	2026-06-18 14:24:34.991-05	\N
14	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-18 14:24:50.053-05	2026-06-18 14:28:58.127-05	248	{"action": "logout"}	2026-06-18 14:24:50.053-05	2026-06-18 14:28:58.128-05	\N
15	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-18 14:29:11.098-05	\N	\N	{"action": "login"}	2026-06-18 14:29:11.098-05	2026-06-18 14:29:11.098-05	\N
\.


--
-- Data for Name: third; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third (id, "typeIdentification", identification, name, "additionalName", address, phone, mobile, email, city, birthday, gender, impact, supplied, "typeId", "classificationId", "specialtyId", "subSpecialtyId", "regionId", status, "createdAt", "updatedAt", "deletedAt", "habeasDataConsent", "habeasDataFileUrl", "habeasDataSignature", latitude, longitude) FROM stdin;
3	CC	84565089	alexx		medellin	+573016929387	+573016929387	cesar@gmail.com	medellin	1993-03-23 05:00:00-05	\N	3		3	\N	5	\N	1	active	2024-03-20 12:42:29-05	2024-03-20 12:42:29-05	2026-02-17 16:32:24-05	f	\N	\N	6.219813586087327	-75.59129839706237
4	NIT	46563234	FarmaTS		Cra 1 B N 81 20	+573154979800		farmats@gmail.vom	Medellin	2001-03-21 05:00:00-05	\N	4		3	\N	10	\N	7	active	2024-02-20 14:21:14-05	2024-03-20 14:21:14-05	2026-02-17 16:32:24-05	f	\N	\N	6.227396622296724	-75.57502431483495
5	NIT	23235986	CCMOD	Andres S.	Cra 1 B N 81 20	+573154979800		mmod@gmail.vom	Medellin	2000-03-15 05:00:00-05	\N	3	Copservir (Rebaja)	2	\N	6	\N	6	active	2024-03-20 14:35:18-05	2024-03-20 14:35:18-05	\N	f	\N	\N	6.220603655317263	-75.55280863409216
6	CC	1000575844	FELIPE 	PULIDO GRANADOS	CRA 12  11-65  INT 5	3174241797	3174241797	felop3020@gmail.com	SOGAMOSO	1969-03-31 00:00:00-05	M	2		1	1	2	\N	3	active	2024-05-08 20:33:08-05	2024-06-11 14:17:26-05	2026-02-17 16:32:24-05	f	\N	\N	5.557889017411147	-73.38562054586632
7	CC	1007442075	NATALIA CAMILA	GARCIA RUEDA	OPTISALUD TUNJA	3103115751	3103115751	nczunilagarciarueda@gmail.com	TUNJA	1980-01-18 00:00:00-05	F	2		1	3	2	\N	3	active	2024-05-20 15:14:15-05	2024-05-22 20:15:29-05	\N	f	\N	\N	5.569746777125568	-73.40309714912884
8	CC	1234565789	Prueba20	MEJIA	CALLE 2	3202032323	3202032323	sistemas@laboratorioophtha.com	MEDELLIN	1998-06-28 05:00:00-05	M	1		1	1	1	\N	1	active	2024-05-21 18:47:02-05	2024-05-21 18:47:02-05	2026-02-17 16:32:24-05	f	\N	\N	6.253530544357324	-75.56266136129193
9	CC	12345657899	Prueba20	MEJIA	CALLE 2	3202032323	3202032323	sistemas@laboratorioophtha.com	MEDELLIN	1998-06-28 05:00:00-05	\N	1	Colsubsidio	2	\N	10	\N	1	active	2024-05-21 18:51:50-05	2024-05-21 18:51:50-05	2026-02-17 16:32:24-05	f	\N	\N	6.270960072229738	-75.54152546460536
11	CC	1018409150	MARIO ISAAC 	LEON HIGUERA	TUNJA	3015843123	3015843123	marioleonhiguera@hotmail.com	TUNJA	1982-02-08 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-22 20:41:07-05	2024-05-22 20:41:07-05	\N	f	\N	\N	5.54433040564465	-73.35216147681132
12	CC	1020843118	JUAN JOSE 	DUARTE CONTRERAS	OPTISALUD SOGAMOSO	3212702400	3212702400	juanjoseducon@gmail.com	SOGAMOSO	1988-08-14 05:00:00-05	M	2		1	3	2	\N	3	active	2024-05-22 20:42:35-05	2024-05-22 20:42:35-05	\N	f	\N	\N	5.539938696916911	-73.33183652370816
13	CC	1026254318	DARLYN ADRIANA	RAMOS MARÍN	CRA 10  18-57	3102122386	3102122386	darlyn_86@hotmail.es	TUNJA	1977-06-04 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-22 20:44:14-05	2024-05-22 20:44:14-05	\N	f	\N	\N	5.52379051620434	-73.34928530889285
14	CC	1052392431	YURI 	CIFUENTES SUAREZ	DIAGONAL 13 #13-54	3133318728	3133318728	yucifuentes@hotmail.com	SOGAMOSO	1990-11-27 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 12:41:21-05	2024-05-29 12:41:21-05	\N	f	\N	\N	5.514369241176135	-73.37860833571683
15	CC	1020839411	PAULA XIMENA	VELA PEÑA	DIAGONAL 13 # 13-54	3188022221	3188022221	ximenavelap@gmail.com	TUNJA	1990-02-27 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 12:50:49-05	2024-05-29 12:50:49-05	\N	f	\N	\N	5.522638077690092	-73.33261552144432
16	CC	1052499212	DIANA SOFIA 	MORA SOLEDAD	CARRERA 3 ESTE # 47 A -38	3205201473	3205201473	dianasofia.mora77@gmail.com	DUITAMA	1990-12-12 05:00:00-05	F	2		1	1	2	\N	3	active	2024-05-29 14:06:00-05	2024-05-29 14:06:00-05	\N	f	\N	\N	5.567843404691328	-73.3422751283117
17	CC	10020839411	CRISTIAN ALEJANDRO 	CRUZ	OPTISALUD UNICENTRO	3103226750	3103226750	cacs_721@hotmail.com	TUNJA	1990-10-09 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 14:09:32-05	2024-05-29 14:09:32-05	\N	f	\N	\N	5.5485834966131105	-73.3485791731254
19	CC	1010171354	OSCAR ALEXANDER	ZAMBRANO BADILLO	CALLE 11 # 17-38	3108600837	3108600837	alekz.694@gmail.com	SOGAMOSO	1990-03-15 05:00:00-05	M	2		1	3	2	\N	3	active	2024-05-29 14:18:44-05	2024-05-29 14:18:44-05	\N	f	\N	\N	5.505350641947604	-73.36330032860724
20	CC	1010166345	ROBERT 	ARIAS PEDRAZA	CARRERA 9A # 1A-17 DUITAMA	2104110	3006551448	robertp_30@hotmail.com	SOGAMOSO	1990-09-08 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 14:19:45-05	2024-05-29 14:19:45-05	\N	f	\N	\N	5.498614806402846	-73.3418196004559
21	CC	1013585205	TATIANA	MORENO MORALES	OPTISALUD TUNJA	3202683190	3202683190	moreta_2002@hotmail.com	TUNJA	1990-10-02 05:00:00-05	F	2		1	3	1	\N	3	active	2024-05-29 14:21:48-05	2024-05-29 14:21:48-05	\N	f	\N	\N	5.502273417397919	-73.38666935685094
25	CC	1013627329	JOHANA 	RINCON RODRIGUEZ	CARRERA 9 # 24-21	3126168357	3126168357	juaniod9108@gmail.com	TUNJA	1990-08-29 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 14:26:37-05	2024-05-29 14:26:37-05	\N	f	\N	\N	5.5186781063186805	-73.40021962369288
26	CC	1018430354	ANA MARIA 	GUTIERREZ GONZALEZ	CALLE 10 # 11-15	3174350796	3174350796	colopticas@gmail.com	SOGAMOSO	1990-09-29 05:00:00-05	F	2		1	1	2	\N	3	active	2024-05-29 14:30:55-05	2024-05-29 14:30:55-05	\N	f	\N	\N	5.508726117616476	-73.38650955979128
27	CC	1018439339	ADRIANA PAOLA 	FUENTES TORRES	OPTISALUD DUITAMA	3118514112	3118514112	paolis.15@hotmail.com	DUITAMA	1990-10-09 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 14:32:53-05	2024-05-29 14:32:53-05	\N	f	\N	\N	5.52127266427408	-73.3409075882464
28	CC	1018441175	ANDREA CAROLINA 	MONTAÑA CARDOZA	OPTICA VELOZA	3118203395	3118203395	carolinamc6@gmail.com	TUNJA	1990-01-06 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 14:38:32-05	2024-05-29 14:38:32-05	\N	f	\N	\N	5.5341174722025785	-73.39498164908736
29	CC	1019012097	DEISY CONSTANZA	 BAYONA MALDONADO	CARRERA 18 # 1-66	3118120209	3118120209	deisita86@hotmail.com	SOGAMOSO	1990-11-17 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 14:44:46-05	2024-05-29 14:44:46-05	\N	f	\N	\N	5.5164620625301035	-73.37606917591579
31	CC	1020818272	ANGELA	 ZAMBRANO BUITRAGO	CALLE 17 # 11-53	3115410539	3115410539	angela.101996@hotmail.com	TUNJA	1990-08-10 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 14:49:30-05	2024-05-29 14:49:30-05	\N	f	\N	\N	5.550782306390401	-73.36077570533469
32	CC	1022323766	CAROLINA	CASTRO JIMENEZ	CARRERA 9 # 18-60  LC 104	7432615	3142325909	centropticosantalucia@gmail.com	TUNJA	1990-04-13 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 14:51:11-05	2024-05-29 14:51:11-05	\N	f	\N	\N	5.524690158429332	-73.32919190480149
33	CC	10243788	MIGUEL	CHAPARRO BOHORQUEZ	CALLE 11 # 12-40	7702541	3157814914	miguelacheb@yahoo.es	SOGAMOSO	1970-09-07 05:00:00-05	M	2		1	2	1	\N	3	active	2024-05-29 14:53:01-05	2024-05-29 14:53:01-05	\N	f	\N	\N	5.495968598698148	-73.3610021386769
35	CC	1030564487	PAOLA ANDREA	SUAREZ	CENTRO COMERCIAL UNICENTRO	7454303	3118514112	andresuarezfo@hotmail.com	TUNJA	1990-11-21 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 14:54:25-05	2024-05-29 14:54:25-05	\N	f	\N	\N	5.511719607528043	-73.32891330639025
36	CC	1030669130	LUZ ANGELA	VELANDIA RODRIGUEZ	OPTISALUD TUNJA	3223438010	3223438010	dangela2408@gmail.com	TUNJA	1990-08-17 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 14:55:55-05	2024-05-29 14:55:55-05	\N	f	\N	\N	5.563333648182212	-73.34120038356303
37	CC	1032370391	YURY ESPERANZA	RISCANEVO MARTINEZ	CARRERA 9 # 20-45 LOCAL 108	3176358976	3176358976	yuriscasnevo@hotmail.com	TUNJA	1990-06-14 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 14:58:22-05	2024-05-29 14:58:22-05	\N	f	\N	\N	5.5561914929047775	-73.4031718557565
38	CC	1032370818	JULIO CESAR	BAEZ CORDOBA	CALLE 47 # 7-66 TUNJA	3114559248	3114559248	julio_jc@hotmail.com	TUNJA	1990-09-24 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 14:59:47-05	2024-05-29 14:59:47-05	\N	f	\N	\N	5.542616656572624	-73.38967775388586
40	CC	1032417179	LINA JULIETH 	BARROTE SILVA	CENTRO	3229436737	3229436737	linabarrote@hotmail.com	SOGAMOSO	1990-07-17 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:03:39-05	2024-05-29 15:03:39-05	\N	f	\N	\N	5.500988155516952	-73.39613848742945
41	CC	1032456937	DANIELA GRAJALES	HERRERA	OPTICA AE DUITAMA	3044612109	3044612109	nanigrajales@gmail.com	DUITAMA	1990-05-28 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:08:57-05	2024-05-29 15:08:57-05	\N	f	\N	\N	5.517150990748344	-73.35839025769573
42	CC	1049603576	SARA ALEJANDRA 	CARDENAS SOSA	CENTRO NORTE PISO 1	3206752896	3206752896	opticasantacruztja@gmail.com	TUNJA	1990-06-17 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:10:48-05	2024-05-29 15:10:48-05	\N	f	\N	\N	5.5180219445732215	-73.34492096096493
43	CC	1049609752	IVAN DARIO	ROMERO	CARRERA 12 # 12-84	3144535370	3144535370		SOGAMOSO	1990-11-27 05:00:00-05	M	1		1	2	2	\N	3	active	2024-05-29 15:14:22-05	2024-05-29 15:14:22-05	\N	f	\N	\N	5.513057460822174	-73.40048544291902
46	CC	1051477584	ANGIE DAYANA	PIRAGUA ALARCON	CALLE 11 # 10-83  LOCAL 108	3235744997	3235744997	adpa@gmail.com	SOGAMOSO	1990-11-26 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:19:42-05	2024-05-29 15:19:42-05	\N	f	\N	\N	5.523220704098096	-73.38075195226307
47	CC	1052313181	CAMILO 	MARTINEZ PEREZ	CALLE 17 # 13-29	7610906	3044581102	opticasae@gmail.com	DUITAMA	1990-09-09 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 15:21:18-05	2024-05-29 15:21:18-05	\N	f	\N	\N	5.5111674358233085	-73.38730009205103
50	CC	1052314423	JUDY 	CARVAJAL RIVERA	CARRERA 9  # 24-79	3134778098	3134778098	judycarvajal04@gmail.com	TUNJA	1990-04-11 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:24:48-05	2024-05-29 15:24:48-05	\N	f	\N	\N	5.562002124110491	-73.32819355835555
51	CC	1052387990	LUISA FERNANDA	NIÑO	CARDENAS VISION	2606684	3202259366	fernandino186@gmail.com	DUITAMA	1990-06-18 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 15:26:09-05	2024-05-29 15:26:09-05	\N	f	\N	\N	5.514007266452704	-73.35643503093844
52	CC	1052389508	MAURICIO 	ALVARADO BRAVO	CARRERA 10 # 14-138	3205442209	3205442209	mauricioaalvarado@hotmail.com	SOGAMOSO	1990-12-19 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 15:28:31-05	2024-05-29 15:28:31-05	\N	f	\N	\N	5.55613847392998	-73.37055241785657
53	CC	1052391346	EMERSON 	MONTOYA	OPTISALUD TUNJA	3118636311	3118636311	emerson_montoya90@hotmail.com	TUNJA	1990-07-12 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-29 15:30:22-05	2024-05-29 15:30:22-05	\N	f	\N	\N	5.51314552143953	-73.36056435043469
54	CC	1052395225	LEANDRO	VEGA MORALES	CALLE 15 # 12-38	3012783811	3012783811	ocad27@hotmail.com	DUITAMA	1990-01-03 05:00:00-05	M	2		1	1	2	\N	3	active	2024-05-29 15:31:34-05	2024-05-29 15:31:34-05	\N	f	\N	\N	5.496554336023653	-73.33258349314684
55	CC	1052395229	DIANA PAOLA 	BONILLA BUITRAGO	CARRERA 16 # 14-13 DUITAMA	3123259163	3123259163	dipabonilla@gmail.com	DUI	1990-12-27 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:32:44-05	2024-05-29 15:32:44-05	\N	f	\N	\N	4.628804855416822	-74.12088425265473
57	CC	1052401942	ANGELA 	MALDONADO QUIROGA	OPTISALUD DUITAMA	3102931116	3102931116	taanquima@hotmail.com	DUITAMA	1990-06-16 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 15:36:06-05	2024-05-29 15:36:06-05	\N	f	\N	\N	5.5707630906710115	-73.37792583441883
58	CC	1098801437	ANGELA DEL PILAR	RAMIREZ BALLESTEROS	TUNJA UNICENTRO	3043766164	3043766164	pilar.ramirez8@hotmail.com	TUNJA	1990-10-20 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 15:37:57-05	2024-05-29 15:37:57-05	\N	f	\N	\N	5.525945263677503	-73.40602150974642
59	CC	1053327231	CLAUDIA ESPERANZA	LOPEZ CASAS	CARRERA 10 # 26-49	3113247884	3113247884	claulopezcasas@hotmail.com	TUNJA	1990-04-14 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:38:53-05	2024-05-29 15:38:53-05	\N	f	\N	\N	5.500593802891531	-73.40726423452483
60	CC	1054093442	SANDY LICET	PULIDO	CARRERA 11 # 14-51 C.C BARCELONA	3005196396	3005196396	sanylicet@gmail.com	SOGAMOSO	1990-10-06 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:41:26-05	2024-05-29 15:41:26-05	\N	f	\N	\N	5.546343106990512	-73.35035973737001
61	CC	1056931255	DIANA KATHERINE	BECERRA MARTINEZ	CARRERA 10 # 22-61	6087440839	3137055160	becerramartinezdianakatherine@gmail.com	TUNJA	1990-08-28 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 15:42:47-05	2024-05-29 15:42:47-05	\N	f	\N	\N	5.572235232976802	-73.37034922665048
62	CC	1057464747	LAURA LILIANA 	MORENO CARO	OPTICA MARIN	3183639034	3183639034	lauramoreno@hotmail.com	TUNJA	1990-03-14 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 15:44:52-05	2024-05-29 15:44:52-05	\N	f	\N	\N	5.556637406844997	-73.40145485519672
63	CC	1057574099	AURA MILENA	LARA RODRIGUEZ	CALLE 7 # 10A-19 APTO 203	3042028038	3209877867	milelara02@hotmail.com	SOGAMOSO	1990-02-01 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 15:49:43-05	2024-05-29 15:49:43-05	\N	f	\N	\N	5.531953076605899	-73.40607180488031
65	CC	1032429372	SAID ANDREA	VARGAS PEREZ	CARRERA 10 #  24-45	3114560174	3114560174	said_andrea8@hotmail.com	TUNJA	1990-05-08 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 15:57:16-05	2024-05-29 15:57:16-05	\N	f	\N	\N	5.5646512457063935	-73.34165723731476
66	CC	1057579500	YEFERSON ALEXANDER	RODRIGUEZ BOTIA	CALLE 10 # 11-15	3133769505	3133769505	yefersonr40@gmail.com	SOGAMOSO	1990-12-12 05:00:00-05	M	2		1	1	2	\N	3	active	2024-05-29 15:58:33-05	2024-05-29 15:58:33-05	\N	f	\N	\N	5.515493236427572	-73.35989202727419
67	CC	1057591308	SILKE ALEJANDRA	SANDOVAL ALVARADO	TUNJA UNICENTRO	3004873042	3004873042	silkealeja@hotmail.com	SOGAMOSO	1990-12-13 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:01:28-05	2024-05-29 16:01:28-05	\N	f	\N	\N	5.501097670310916	-73.37794675303293
68	CC	1057592638	SANTIAGO	NIÑO LOAIZA	OPTISALUD TUNJA	3173316255	3173316255	sninolo7@hotmail.com	TUNJA	1990-07-01 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 16:03:18-05	2024-05-29 16:03:18-05	\N	f	\N	\N	5.574538755129474	-73.34283455706111
69	CC	1057601777	MARIA PAULA	LOPEZ ACEVEDO	CALLE 3 # 4-03 SOGAMOSO	3194770934	3194770934	mariapaulalopezacevedo@gmail.com	SOGAMOSO	1990-08-23 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 16:04:43-05	2024-05-29 16:04:43-05	\N	f	\N	\N	5.498430666928982	-73.39934312257064
70	CC	1057605968	LAURA MELISA	LARA MENDIVELSO	CARRERA 12 # 11-30	3223834364	3223834364	laura_melisa_lara@hotmail.com	SOGAMOSO	1990-04-19 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 16:06:22-05	2024-05-29 16:06:22-05	\N	f	\N	\N	5.502388451670379	-73.33917114680405
71	CC	1069265276	DAVID CAMILO	TORRES GOMEZ	CARRERA 5 # 7-46	3102227481	3102227481	towersoptics@gmail.com	CHOCONTA	1990-01-01 05:00:00-05	M	1		1	2	2	\N	3	active	2024-05-29 16:08:31-05	2024-05-29 16:08:31-05	\N	f	\N	\N	5.498327093582451	-73.40727035955229
72	CC	1073157221	ANGELICA MARIA	TAMARA JARAMILLO	CALLE 15 # 12-38	3103124393	3103124393	oculare.es@gmail.com	DUITAMA	1990-07-03 05:00:00-05	F	2		1	1	2	\N	3	active	2024-05-29 16:09:42-05	2024-05-29 16:09:42-05	\N	f	\N	\N	5.5264734696278985	-73.39507551484817
74	CC	1098620878	JULIETH KATHERINE 	PEÑA OLARTE	C.C VIVA	3103720177	3103720177	juliethcomlan@gmail.com	TUNJA	1990-09-02 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:12:57-05	2024-05-29 16:12:57-05	\N	f	\N	\N	5.554668397775012	-73.40007194709254
75	CC	1098675484	VANIA MARCELA	PEREZ	OPTICLINICAS DR CETINA-UNICENTRO	3196142149	3196142149	vania.marcela.perez.s@gmail.com	TUNJA	1990-02-02 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:14:18-05	2024-05-29 16:14:18-05	\N	f	\N	\N	5.497388352588299	-73.38786453387917
76	CC	1098700689	MAYORLY 	QUINTERO GOMEZ	CARRERA 3 # 13A-44	3176944119	3176944119	redmundovision@gmail.com	PUERTO BOYACA	1990-12-03 05:00:00-05	F	1		1	1	2	\N	3	active	2024-05-29 16:15:23-05	2024-05-29 16:15:23-05	\N	f	\N	\N	5.550165547081592	-73.34199794787482
77	CC	123350732	ANGIE NICOL	PEÑUELA SUAREZ	CARRERA 12 # 20-35	3132139696	3132139696	asuarez0614@gmail.com	TUNJA	1990-06-14 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:19:08-05	2024-05-29 16:19:08-05	\N	f	\N	\N	5.5310569128061005	-73.3664878095265
78	CC	13721993	RUBEN DARIO 	SARMIENTO REYES	CARRERA 14 # 10-26	7296476	3005861446	rsarmiento86@hotmail.com	TUNJA	1970-09-03 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 16:21:09-05	2024-05-29 16:21:09-05	\N	f	\N	\N	5.537754332765783	-73.34860154662847
79	CC	33377611	SUSANA	RODRIGUEZ BARRAGAN	OPTISALUD TUNJA	3204461130	3204461130	susyrodriguezba1984@gmail.com	TUNJA	1970-10-11 05:00:00-05	F	2		1	3	1	\N	3	active	2024-05-29 16:22:44-05	2024-05-29 16:22:44-05	\N	f	\N	\N	5.501059507747701	-73.35103328872583
80	CC	14326617	JUAN CARLOS 	VELOZA	OPTICA VELOZA	3102040385	3102040385	jolucaveloza@gmail.com	TUNJA	1970-07-23 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 16:23:54-05	2024-05-29 16:23:54-05	\N	f	\N	\N	5.5256549077704635	-73.3376564700433
81	CC	19266713	ORLANDO	CORTES AGUILAR	CARRERA 11 # 12-28	3176564150	3176564150	orlandocortes@hotmail.com	SOGAMOSO	1970-02-27 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 16:28:57-05	2024-05-29 16:28:57-05	\N	f	\N	\N	5.523518821104922	-73.37054959754045
83	CC	19341600	JUAN EUGENIO	BAQUERO GOMEZ	CALLE 19 # 8 - 22	7423426	3153966269	juebaquero@yahoo.com	TUNJA	1970-12-31 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-29 16:32:48-05	2024-05-29 16:32:48-05	\N	f	\N	\N	5.506338660730234	-73.38254948682359
86	CC	24049932	MARIA DEL PILAR	CALIXTO RUBIO	CALLE 15 # 16- 26 LA CALLEJA	3118814849	3118814849	pilicalixto@hotmail.com	DUITAMA	1970-02-15 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 16:36:07-05	2024-05-29 16:36:07-05	\N	f	\N	\N	5.530841026669849	-73.32932103887069
87	CC	280840	GREGORIO FRANCISCO	MOJICA RODRIGUEZ	CARRERA 9 No 22 - 10 CONSULTORIO 203	7404641	3107821689	framoro@hotmail.com	TUNJA	1970-10-01 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-29 16:37:26-05	2024-05-29 16:37:26-05	\N	f	\N	\N	5.525839082703633	-73.35543298760938
88	CC	31940819	BETHY	VELANDIA ROJAS	AVENIDA DE LAS AMERICAS 18-66	3208592428	3208592428	bethyvelandia@hotmail.com	DUITAMA	1970-05-25 05:00:00-05	F	2		1	3	1	\N	3	active	2024-05-29 16:38:47-05	2024-05-29 16:38:47-05	\N	f	\N	\N	5.544232221932295	-73.37646977336702
89	CC	3228030	ALVARO JOSE	JIMENEZ PEDREROS	CARRERA 1F # 39-76	7439640	3102650143	cxvisionsas@gmail.com	TUNJA	1970-05-31 05:00:00-05	M	2		1	2	1	\N	3	active	2024-05-29 16:41:11-05	2024-05-29 16:41:11-05	\N	f	\N	\N	5.546390625362988	-73.37148047047343
90	CC	33365805	ISABEL 	LOPEZ LOPEZ	CALLE 29 # 9a-20	3173787083	3173787083	isalopez07@yahoo.es	TUNJA	1970-02-07 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 16:43:10-05	2024-05-29 16:43:10-05	\N	f	\N	\N	5.528239488819962	-73.34104904647502
91	CC	46453924	GIOVANA	PRADO VARGAS	CALLE 16 # 13-77	3105510143	3105510143	giovaprav@gmail.com	DUITAMA	1970-09-18 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:48:47-05	2024-05-29 16:48:47-05	\N	f	\N	\N	5.5622441644397105	-73.37619450454311
92	CC	35425934	LISLEY	CORTES GARZON	CARRERA 4 # 7-79	3112396021	3112396021		CHOCONTA	1970-12-12 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:50:04-05	2024-05-29 16:50:04-05	\N	f	\N	\N	5.531056747776198	-73.37539607847874
94	CC	40017265	MARTHA CECILIA	NIÑO MEDINA	CALLE 20 # 12 - 11	7422212	3002193516	MARTHACNINO@HOTMAIL.COM	TUNJA	1970-02-03 05:00:00-05	F	0		1	3	2	\N	3	active	2024-05-29 16:53:25-05	2024-05-29 16:53:25-05	\N	f	\N	\N	5.4987587404694995	-73.35792065711692
95	CC	40018171	BLANCA CECILIA	JIMENEZ FARFAN	CALLE 19 # 8-22	7423426	3124827519	blcejimenez@yahoo.com	TUNJA	1970-10-25 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:58:23-05	2024-05-29 16:58:23-05	\N	f	\N	\N	5.539473327454891	-73.33883793328944
96	CC	40019548	DORA CECILIA	 ARIAS GALINDO	CARRERA 9 # 24- 50	3132864669	3132864669	doracecilia12@hotmail.com	TUNJA	1970-08-12 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 17:02:13-05	2024-05-29 17:02:13-05	\N	f	\N	\N	5.525752463050307	-73.39657749807344
97	CC	40023229	TILIA 	ALVARADO TORRES	CALLE 17 # 10-60	7446309	3138860363	zonular90@hotmail.com	TUNJA	1970-12-26 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 17:06:13-05	2024-05-29 17:06:13-05	\N	f	\N	\N	5.518907006410774	-73.35859488794912
98	CC	40026464	MARTHA CECILIA	SALAS ROBERTO	CARRERA 11 # 25-39	3107831518	3107831518	marthasalasr@hotmail.com	TUNJA	1970-01-13 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 17:07:42-05	2024-05-29 17:07:42-05	\N	f	\N	\N	5.556116613003061	-73.39767668515925
99	CC	40029547	SANDRA LILIANA	VALLEJO SILVA	CARRERA 1F # 40-149	3164940873	3164940873	sandraliliana 13@hotmail.com	TUNJA	1970-07-03 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 17:10:02-05	2024-05-29 17:10:02-05	\N	f	\N	\N	5.506672497328242	-73.39020372433102
100	CC	40046612	LYDA GIOMARA	GRANADOS AVILA	CARRERA 10 # 17-47	7438759	3103404372	giomy1@hotmail.com	TUNJA	1970-10-26 05:00:00-05	F	1		1	1	2	\N	3	active	2024-05-29 17:14:42-05	2024-05-29 17:14:42-05	\N	f	\N	\N	5.516626278153132	-73.34045579536779
101	CC	41734437	MARIA TERESA 	RODRIGUEZ JUNCO	CARRERA 11 # 17-23	7425514	3153177562	mariat.rodriguez@gmail.com	TUNJA	1970-03-08 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 17:15:58-05	2024-05-29 17:15:58-05	\N	f	\N	\N	5.5526523916387776	-73.36897229356535
103	CC	46364471	AURA PATRICIA	GARCIA	CARRERA 9A # 14-102	3212326156	3212326156	nuevavisiontuoptica@gmail.com	SOGAMOSO	1970-06-23 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 17:18:34-05	2024-05-29 17:18:34-05	\N	f	\N	\N	5.4997791272136185	-73.36111537928124
104	CC	46379270	DIANA 	CEPEDA FONSECA	CARRERA 10 # 14-134	3208015911	3114493349	vision20/20@hotmail.com	SOGAMOSO	1970-02-03 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 17:19:59-05	2024-05-29 17:19:59-05	\N	f	\N	\N	5.563110855601749	-73.33547064483979
105	CC	46386838	GENNY MILDRET	ORJUELA MENDIVELSO	CARRERA 10 # 12-63	7726553	3118534978	opticagmonsogamoso@hotmail.com	SOGAMOSO	1970-06-18 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 17:21:05-05	2024-05-29 17:21:05-05	\N	f	\N	\N	5.56775975346618	-73.3992839734167
106	CC	46453277	YULY ANDREA	SATIVA JAIMES	CARRERA 19 # 15-75	3103314614	3103314614	optimedicalcenter@outlook.com	DUITAMA	1970-07-15 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 17:22:10-05	2024-05-29 17:22:10-05	\N	f	\N	\N	5.564848608141643	-73.33848350702087
107	CC	52249132	NATALIA	GARCIA RUIZ	CALLE 14  # 10-87	7700165	3045972221	tata06@hotmail.com	SOGAMOSO	1980-07-16 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 18:09:05-05	2024-05-29 18:09:05-05	\N	f	\N	\N	5.561907187631698	-73.38437101385098
108	CC	46456338	MAGDA ALEXANDRA	CORREDOR CAMARGO	CALLE 17 # 14-36	7610846	3173814236	magdacorredor316@yahoo.es	DUITAMA	1980-05-09 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:10:56-05	2024-05-29 18:10:56-05	\N	f	\N	\N	5.5356918277700995	-73.34709571114577
109	CC	46662971	NUBIA ESMERALDA	DIAZ  ESCOBAR	CALLE 20 # 13A-47	3204954093	3204954093	nedevision@gmail.com	DUITAMA	1980-04-25 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:14:49-05	2024-05-29 18:14:49-05	\N	f	\N	\N	5.563876150851112	-73.33793315414493
111	CC	46670522	FABIOLA	PARRA RAMÍREZ	CALLE 15 # 12-75 LOCAL 211	7627919	3012364320	fabiparra2@hotmail.com	DUITAMA	1980-09-24 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:17:33-05	2024-05-29 18:17:33-05	\N	f	\N	\N	5.573657283682193	-73.3320184001844
112	CC	46673590	XIOMARA MILENA 	PARRA CHAPARRO	CENTRO DE ESPECIALIDADES MEDICAS	3103291841	3103291841	xiomypacha@gmail.com	TUNJA	1980-10-09 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:18:38-05	2024-05-29 18:18:38-05	\N	f	\N	\N	5.546654586348703	-73.34077202584675
113	CC	46673798	ELIZABETH 	RAMIREZ MERCHAN	CARRERA 14 # 13-72	7603565	3143956500	proversaludvisual316@yahoo.es	DUITAMA	1980-01-03 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:19:40-05	2024-05-29 18:19:40-05	\N	f	\N	\N	5.521683391852362	-73.37438542718776
114	CC	46678321	ERIKA	FORERO	OPTISALUD TUNJA	3125709033	3125709033	erikfor22@hotmail.com	TUNJA	1980-10-22 04:56:16-05	F	1		1	3	2	\N	3	active	2024-05-29 18:21:24-05	2024-05-29 18:21:24-05	\N	f	\N	\N	5.536916647082295	-73.39799822177994
115	CC	46681814	CLAUDIA 	VELANDIA	CALLE 25 # 22-18 P3	31024900633	3102490063	claudia_velandia_9@hotmail.com	PAIPA	1980-01-17 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 18:22:58-05	2024-05-29 18:22:58-05	\N	f	\N	\N	5.507132435118947	-73.405902586397
116	CC	51790164	SANDRA JANETH	MONROY GONZALEZ	CALLE 19 # 8-77	7432166	3174422914	opticavertex@gmail.com	TUNJA	1980-09-02 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 18:24:25-05	2024-05-29 18:24:25-05	\N	f	\N	\N	5.505797169581962	-73.39051655020135
117	CC	51880160	YASMINA	SALGADO PAEZ	CARRERA 15 # 14-58	7620201	3153005002	yasminasalgado@hotmail.com	DUITAMA	1980-10-21 05:00:00-05	F	2		1	3	1	11	3	active	2024-05-29 18:26:27-05	2024-05-29 18:26:27-05	\N	f	\N	\N	5.509302849835522	-73.37436821781844
119	CC	52057039	ANA LUCIA	LOPEZ VARGAS	CALLE 11 # 11-32	3138306953	3138306953	anlulv@hotmail.com	SOGAMOSO	1980-12-03 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:30:46-05	2024-05-29 18:30:46-05	\N	f	\N	\N	5.4978877837734865	-73.38978214893689
120	CC	52201793	NANCY DURLEY	BAUTISTA ROA	CARRERA 15 # 19-74	3136502938	3136502938	nbautistar@hotmail.com	TUNJA	1980-01-01 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:31:45-05	2024-05-29 18:31:45-05	\N	f	\N	\N	5.525633331264388	-73.33037507624171
121	CC	52218186	CLAUDIA 	VILLOTA SANCHEZ	CARRERA 1 #  46-49	3224185435	3224185435	optivil@yahoo.es	TUNJA	1980-03-02 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 18:33:18-05	2024-05-29 18:33:18-05	\N	f	\N	\N	5.525885498476362	-73.38269841676104
122	CC	71632253	HERNANDO 	PEREZ FLORES	CARRERA 12 # 18-21	7439064	3124799795	hepeflo@hotmail.com	TUNJA	1980-09-22 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 18:35:01-05	2024-05-29 18:35:01-05	\N	f	\N	\N	5.554101732571873	-73.33091279198342
124	CC	52263302	SANDRA 	GOMEZ MONTAÑA	MONTURAS Y LENTES	3177143237	3177143237	montulentespao@gmail.com	DUITAMA	1980-02-14 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 18:37:45-05	2024-05-29 18:37:45-05	\N	f	\N	\N	5.5000925003981465	-73.33230923547255
125	CC	52267292	JENNIFER	DIAZ VELASQUEZ	CARRERA  12 # 18-21	7439064	3134901637	jendiaz46@hotmail.com	TUNJA	1980-09-05 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 18:39:36-05	2024-05-29 18:39:36-05	\N	f	\N	\N	5.529433735447855	-73.38000875962543
126	CC	52364566	LUZ ANGELICA	VARGAS GOMEZ	CARRERA 11 # 17-66  LC153	3133243315	3133243315	luzkeka02160976@gmail.com	TUNJA	1980-02-16 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:40:35-05	2024-05-29 18:40:35-05	\N	f	\N	\N	5.5337035616811745	-73.33969225211807
127	CC	52424136	GINA LILIANA	RODRIGUEZ SAENZ	CARRERA 9  # 24-50	310275966	310275966	ginalili@hotmail.com	TUNJA	1980-03-20 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:43:18-05	2024-05-29 18:43:18-05	\N	f	\N	\N	5.508948362484675	-73.36747854070094
128	CC	52473347	YEIMIT BRIGITTE	BAUTISTA PEREZ	CALLE 18 # 11-22	3204931803	3204931803	prevision@gmail.com	TUNJA	1980-08-16 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:45:23-05	2024-05-29 18:45:23-05	\N	f	\N	\N	5.554955419152408	-73.33296504464289
130	CC	52704290	NIDIA YAQUELINE	CELY JOYA	CALLE 12 # 12-35 PISO2 SOGAMOSO	3184561590	3184561590	ncely7910@gmail.com	SOGAMOSO	1980-05-10 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 18:48:14-05	2024-05-29 18:48:14-05	\N	f	\N	\N	5.555406935787185	-73.37795196221887
131	CC	52737243	DIANA CAROLINA	GONZALEZ HEREDIA	CALLE 18 # 10-15	7401091	3007588264	OPTICACOC@HOTMAIL.COM	TUNJA	1980-12-14 05:00:00-05	F	2		1	1	2	\N	3	active	2024-05-29 18:49:20-05	2024-05-29 18:49:20-05	\N	f	\N	\N	5.541421464232403	-73.33090028813758
132	CC	52743523	JENNY 	FLOREZ	OPTISALUD DUITAMA	3023266060	3023266060		DUITAMA	1980-05-13 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 18:50:27-05	2024-05-29 18:50:27-05	\N	f	\N	\N	5.5019526359615725	-73.38228922444137
133	CC	52792861	NELCY JOHANNA	ALVARADO QUIJANO	CARRERA 10 # 14 - 56	7702267	3103378056	nelcyalvarado@hotmail.com	SOGAMOSO	1980-03-14 05:00:00-05	F	2		1	1	2	\N	3	active	2024-05-29 18:52:59-05	2024-05-29 18:52:59-05	\N	f	\N	\N	5.559332855333671	-73.38409485284461
134	CC	52967467	MARIA TERESA	MENDIETA MELO	CALLE 6 A # 6-76	3138539712	3138539712	mariamendieta122@hotmail.com	TUNJA-VILLA DE LEIVA	1980-12-08 05:00:00-05	F	2		1	1	2	\N	3	active	2024-05-29 18:55:31-05	2024-05-29 18:55:31-05	\N	f	\N	\N	5.568544833252193	-73.35611504803654
135	CC	53082587	ANA CATALINA 	MARTINEZ NOVA	CARRERA  11 No 24-10	3204629385	3204629385	cata.opt@gmail.com	DUITAMA	1980-03-27 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 18:57:00-05	2024-05-29 18:57:00-05	\N	f	\N	\N	5.566755370622917	-73.3521382172353
136	CC	53121279	ALEXA ROCIO	QUINTERO CASTIBLANCO	CENTRO NORTE	7464025	3105625442	rochy.quintero@gmail.com	TUNJA	1980-11-08 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 18:58:53-05	2024-05-29 18:58:53-05	\N	f	\N	\N	5.531698629395242	-73.39497083747047
137	CC	53139257	CLARA DEL ROSARIO	RODRIGUEZ SUAREZ	CARRERA 9  # 24-50	3187727814	3187727814	opto.clara.rodriguez@gmail.com	TUNJA	1980-01-14 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 18:59:47-05	2024-05-29 18:59:47-05	\N	f	\N	\N	5.546854870365357	-73.35807394224253
139	CC	63530012	ELIZABETH	RUIZ VARGAS	CALLE 28 # 9-29	3172649344	3172649344		TUNJA	1980-06-28 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 19:02:02-05	2024-05-29 19:02:02-05	\N	f	\N	\N	5.534514668436385	-73.3561647971127
140	CC	65739035	DIANA PATRICIA	RIVERA HAYEK	CARRERA 11 # 10 -64	7721889	3105700432		SOGAMOSO	1980-02-05 05:00:00-05	F	2		1	2	1	11	3	active	2024-05-29 19:03:53-05	2024-05-29 19:03:53-05	\N	f	\N	\N	5.538023248636126	-73.40438211561349
141	CC	6767287	JORGE ALBERTO	VARGAS BUITRAGO	CARRERA 10 # 17 - 84	7426084	3132657518	jorgeopt_7@hotmail.com	TUNJA	1970-04-30 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 19:05:38-05	2024-05-29 19:05:38-05	\N	f	\N	\N	5.5719500708133305	-73.38671427290375
142	CC	7178424	CIRO ALFONSO	CUCAITA ESQUIVEL	CARRERA 9 # 17-21	7430945	3134920749	0ptirislents@gmail.com	TUNJA	1970-11-03 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 19:07:47-05	2024-05-29 19:15:11-05	\N	f	\N	\N	5.546127561192488	-73.35732417133941
143	CC	79286425	HECTOR JULIO	FERNANDEZ RICAURTE	CALLE 15 # 10-41	7715572	3143753736	opticadrfernandez@yahoo.com	SOGAMOSO	1970-06-24 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 19:09:38-05	2024-05-29 19:09:38-05	\N	f	\N	\N	5.550098104035821	-73.33856673674096
144	CC	7187399	ANDRES	BOJACA CASTRO	CARRERA 10   18-57	3142995918	3142995918	abojaca99@unisalle.edu.co	TUNJA	1970-06-30 05:00:00-05	M	2		1	3	2	\N	3	active	2024-05-29 19:11:05-05	2024-05-29 19:11:05-05	\N	f	\N	\N	5.50107606561281	-73.344221317886
145	CC	72197757	JAIRO 	CORREDOR PUERTO	CARRERA 14 # 16-20	7604450	3133514440	jairocorredorpuerto1@hotmail.com	DUITAMA	1970-01-30 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 19:13:06-05	2024-05-29 19:14:28-05	\N	f	\N	\N	5.5197061430941705	-73.35624534748875
147	CC	74183533	MANUEL	BUSTACARA ACOSTA	CARRERA 15 # 13-42	3107991118	3107991118	visual-center@hotmail.com	DUITAMA	1970-09-23 05:00:00-05	M	1		1	3	2	\N	3	active	2024-05-29 19:16:33-05	2024-05-29 19:16:33-05	\N	f	\N	\N	5.496952374282023	-73.3989453914271
148	CC	74184267	MAURICIO	PULIDO ALFONSO		3176682151	3176682151	optopul@gmail.com	DUITAMA	1970-08-09 05:00:00-05	M	2		1	1	2	\N	3	active	2024-05-29 19:19:09-05	2024-05-29 19:19:09-05	\N	f	\N	\N	5.569070541736857	-73.38766488639672
149	CC	74327024	OSCAR 	MARTÍNEZ ACESIO	CALLE 15 N 17 - 36	7613411	3166199998	osfrema@outlook.com	DUITAMA	1970-09-25 05:00:00-05	M	2		1	1	2	\N	3	active	2024-05-29 19:20:21-05	2024-05-29 19:20:21-05	\N	f	\N	\N	5.523067552906448	-73.33081858965735
150	CC	74381570	VICTOR ALFONSO	REYES FORERO	CARRERA 9  14-47	3214886260	3214886260	vialrefo@hotmail.com	SOGAMOSO	1970-06-19 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 19:22:30-05	2024-05-29 19:22:30-05	\N	f	\N	\N	5.532992592966135	-73.328292082214
151	CC	74382012	ANDRES MAURICIO	MORALES NUÑEZ	C.C INOVO PLAZA	3012913208	3012913208	ocular.center@hotmail.com	DUITAMA	1970-11-28 05:00:00-05	M	1		1	2	2	\N	3	active	2024-05-29 19:23:35-05	2024-05-29 19:23:35-05	\N	f	\N	\N	5.525752450793783	-73.35456791946262
152	CC	77169702	ORLANDO 	USTARIZ GONZALEZ	AVENIDA SUBA # 115-45- TUNJA EDIFICIO ENTERPRISE	4100088	3002647098	orusgo@gmail.com	BOGOTA-TUNJA	1980-05-24 05:00:00-05	M	2		1	3	1	9	3	active	2024-05-29 19:25:15-05	2024-05-29 19:25:15-05	\N	f	\N	\N	5.5351663015929935	-73.3508897007939
153	CC	79189157	JULIAN EDUARDO 	RAMIREZ ROJAS	CALLE 63 # 18-16	3132816300	3132816300	julianeduardoramirez@gmail.com	SOGAMOSO	1969-12-31 19:00:00-05	M	2		1	1	1	11	3	active	2024-05-29 19:27:01-05	2024-05-29 19:27:01-05	\N	f	\N	\N	5.526921376750816	-73.34540868949667
154	CC	79781600	SALIM ABOU 	AMMAR VELANDIA	CALLE 14  # 10-87	7700165	3107890711	zonasalim@hotmail.com.com	SOGAMOSO	1972-03-13 05:00:00-05	M	2		1	3	2	\N	3	active	2024-05-29 19:28:11-05	2024-05-29 19:28:11-05	\N	f	\N	\N	5.539826378397513	-73.34766916029099
155	CC	79849726	IVAN MAURICIO	ARIAS DIAZ	CALLE 17 # 9-30 CONSUTORIO 205	3186757717	3186757717	ivanarias07@gmail.com	TUNJA	1970-03-30 05:00:00-05	M	1		1	2	2	\N	3	active	2024-05-29 19:29:24-05	2024-05-29 19:29:24-05	\N	f	\N	\N	5.5245832286521805	-73.39079073533354
156	CC	80088807	JULIAN ANDRES 	TRIANA	CARRERA 17 # 12A-06	3114647636	3114647636		DUITAMA	1970-09-02 05:00:00-05	M	2		1	2	1	\N	3	active	2024-05-29 19:36:30-05	2024-05-29 19:36:30-05	\N	f	\N	\N	5.55228711266782	-73.40081892674054
158	CC	80411029	LUIS GIOVANNY	CARDENAS  MATAMOROS	CALLE 20 # 12-89	7431384	3158712867	cardenasvision@mail.com	TUNJA	1970-09-25 05:00:00-05	M	2		1	1	1	11	3	active	2024-05-29 19:38:56-05	2024-05-29 19:38:56-05	\N	f	\N	\N	5.530061348838565	-73.32997325035367
159	CE	827308	JORGE LUIS	PADRON CHACIN	TUNJA OPTISALUD	3117536712	3117536712	jpadron88@gmail.com	TUNJA	1980-05-08 05:00:00-05	M	2		1	3	1	11	3	active	2024-05-29 19:39:52-05	2024-05-29 19:39:52-05	\N	f	\N	\N	5.540921462158526	-73.33593861321624
160	CE	921662	CARLOS EDUARDO	CASTELLANOS ZAMBRANO	OPTISALUD TUNJA	3138838588	3138838588	solrac_1789@hotmail.com	TUNJA	1970-08-17 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-29 19:41:02-05	2024-05-29 19:41:02-05	\N	f	\N	\N	5.565089969151903	-73.40235954388484
2	CC	684532120320	Juan David ANDRES	Mejia	calle 2 79-35	+573106933247	+573044171706	juandavid.mejia@servitecssr.com.co	Medellin	2006-03-20 05:00:00-05	M	2		1	3	5	\N	9	active	2024-02-20 12:14:53-05	2024-05-21 18:43:57-05	2026-02-17 16:32:24-05	f	\N	\N	6.215540524417468	-75.60131493584693
10	CC	1010120827	DANNA ISABELLA	GARCIA	OPTISALUD TUNJA	3213447569	3213447569	isabellagarciaopto@hotmail.com	TUNJA	1970-11-08 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-22 20:14:35-05	2024-05-22 20:14:35-05	2026-02-17 16:32:24-05	f	\N	\N	5.503399081022434	-73.39382294163228
18	CC	1007381625	ANGELA MARIA 	RINCÓN CELY	CREDIOPTICAS DUITAMA	3222616692	3222616692	angelarinconce@gmail.com	DUITAMA	1990-09-08 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 14:10:56-05	2024-05-29 14:10:56-05	\N	f	\N	\N	5.495689729374899	-73.40265326123328
30	CC	1020783787	MONICA	MORENO ROBAYO	OPTISALUD TUNJA	3143515281	3143515281	moniromero_09@hotmail.com	TUNJA	1990-06-15 05:00:00-05	F	2		1	3	2	13	3	active	2024-05-29 14:46:41-05	2024-05-29 14:46:41-05	\N	f	\N	\N	5.517105795579176	-73.36472224824453
39	CC	1032394161	JESUS ARTURO	HERNANDEZ SIERRA	CARRERA 3 # 12-28	3152076151	3152076151	optometramundovisionboyaca@gmail.com	PUERTO BOYACA	1990-07-30 05:00:00-05	M	1		1	1	2	\N	3	active	2024-05-29 15:01:28-05	2024-05-29 15:01:28-05	\N	f	\N	\N	5.518069955630795	-73.40309120928815
44	CC	1049632031	DANILO 	BUITRAGO SOLER	TUNJA	3123315382	3123315382	danilo-bs@hotmail.com	TUNJA	1990-11-19 05:00:00-05	M	2		1	3	2	\N	3	active	2024-05-29 15:16:42-05	2024-05-29 15:16:42-05	\N	f	\N	\N	5.5204141977274395	-73.35548368838876
45	CC	1052402100	VERONICA MARCELA	ECHEVERRIA BUITRAGO	CARRERA 17 # 12A-06	3142378169	3142378169	vero.nikk17@hotmail.com	SOGAMOSO	1990-06-17 05:00:00-05	F	2		1	1	2	\N	3	active	2024-05-29 15:18:21-05	2024-05-29 15:18:21-05	\N	f	\N	\N	5.4996664262741435	-73.38248216912508
56	CC	1052396020	OSCAR FABIAN	SOLANO CARDENAS	CALLE 15 # 13-55	3214047519	3214047519	opticosgroup@gmail.com	DUITAMA	1990-01-29 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 15:34:17-05	2024-05-29 15:34:17-05	\N	f	\N	\N	5.5359564354022615	-73.33751436141347
64	CC	1057579151	DIANA GINETH	GONZALEZ MARTINEZ	OPTISALUD SOGAMOSO	3138316455	3138316455	dianagon_18@hotmail.com	SOGAMOSO	1990-09-27 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 15:55:51-05	2024-05-29 15:55:51-05	\N	f	\N	\N	5.5476059448478585	-73.38154422107324
73	CC	1095808829	DIANA CAROLINA 	SUAREZ GONZALEZ	C.C INNOVO PISO 2	3118897665	3118897665	optica.soluvision@gmail.com	DUITAMA	1990-04-16 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 16:10:44-05	2024-05-29 16:10:44-05	\N	f	\N	\N	5.553106872857899	-73.35221569203243
82	CC	19294315	JULIO ROBERTO	SEPULVEDA SEPÚLVEDA	CARRERA 14 # 17 - 47	7729040	3125249292	doctorsepulvedasogamoso@hotmail.com	SOGAMOSO	1970-05-05 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-29 16:30:20-05	2024-05-29 16:30:20-05	\N	f	\N	\N	5.504594731049079	-73.38584685425748
84	CC	23430708	SANDRA ROCIO	BAEZ	OPTICA SUPERVISIONOPT	3185218379	3185218379	supervisionopt@gmail.com	DUITAMA	1970-03-17 05:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 16:33:50-05	2024-05-29 16:33:50-05	\N	f	\N	\N	5.555419559317563	-73.38695300540257
85	CC	23551313	MYRIAM MERCEDES	JAIMES CORREA	CALLE 16 # 15 - 43	7605484	3153688281	creadsaludboyaca@yahoo.es	DUITAMA	1970-05-11 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 16:34:54-05	2024-05-29 16:34:54-05	\N	f	\N	\N	5.5535855722436045	-73.40493150079887
93	CC	35458276	SILVIA MARINA 	ULLOQUE DE LA HOZ	CARRERA 9 # 22 - 10 CONSULTORIO 205	7401682	3153178068	sylloque@hotmail.com	TUNJA	1970-07-20 05:00:00-05	F	2		1	3	1	\N	3	active	2024-05-29 16:52:02-05	2024-05-29 16:52:02-05	\N	f	\N	\N	5.538173006944318	-73.34916462848129
102	CC	46358190	GLORIA ENITH	OJEDA SUANCHA	CALLE 11 # 8-47	3108123294	3108123294	gloriaenithojeda@yahoo.com	SOGAMOSO	1970-02-08 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 17:17:01-05	2024-05-29 17:17:01-05	\N	f	\N	\N	5.524023664891835	-73.34213102645187
110	CC	46670428	ALEXANDRA 	FAJARDO PRIETO	CARRERA 11 # 17 - 23	7432366	3153906157	fajardoalexandra@gmail.com	TUNJA	1980-09-29 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:16:16-05	2024-05-29 18:16:16-05	\N	f	\N	\N	5.56821949204007	-73.35578249659333
118	CC	51958168	LUISA ALEJANDRA	CASALLAS GUTIÉRREZ	CARRERA 16 # 13 - 52	7606461	3005656605	acasallasg@hotmail.com	DUITAMA	1980-05-21 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:28:59-05	2024-05-29 18:28:59-05	\N	f	\N	\N	5.529266676388783	-73.35301489467398
123	CC	52261693	ZULMA	ACERO TORRES	CALLE 18 # 13-45	3133338026	3133338026	Zacerot@hotmail.com	DUITAMA	1980-11-06 05:00:00-05	F	1		1	2	2	\N	3	active	2024-05-29 18:36:04-05	2024-05-29 18:36:04-05	\N	f	\N	\N	5.536729794382283	-73.35866361945986
129	CC	52704123	CAROL ANDREA	VERGARA	CENTRO NORTE LOCAL 7	3114956630	3114956630	andreavergara2@hotmail.com	TUNJA-GARAGOA	1969-12-31 19:00:00-05	F	2		1	2	2	\N	3	active	2024-05-29 18:46:41-05	2024-05-29 18:46:41-05	\N	f	\N	\N	5.556259325527762	-73.40626206514123
138	CC	53153306	RUBY YASMIN	ROSAS ACEVEDO	CARRERA 12 # 12-98 CREDIOPTICAS	3215098302	3215098302	rosas530709@gmail.com	SOGAMOSO	1980-06-09 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 19:00:46-05	2024-05-29 19:00:46-05	\N	f	\N	\N	5.560967695170968	-73.35436003094289
146	CC	74080182	OSCAR SANTIAGO	GONZALEZ MARTINEZ	CARRERA 10 # 14-42	7706558	3103415317	opticaultravisionsog@hotmail.com	SOGAMOSO	1970-10-04 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 19:14:15-05	2024-05-29 19:14:15-05	\N	f	\N	\N	5.504296467223845	-73.39971039436219
157	CC	80199004	CARLOS EDUARDO 	BERMUDEZ MEDINA	OPTISALUD TUNJA	7433367	3008533685	carlos_bm84@hotmail.com	TUNJA	1970-03-15 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-29 19:37:56-05	2024-05-29 19:37:56-05	\N	f	\N	\N	5.518627759901801	-73.34992859251528
161	CC	9522554	JORGE ANDRES	FERNANDEZ RICAURTE	DUITAMA	3002108765	3002108765	jafersman@yahoo.es	DUITAMA	1970-11-08 05:00:00-05	M	2		1	3	1	\N	3	active	2024-05-29 19:42:06-05	2024-05-29 19:42:06-05	\N	f	\N	\N	5.53458371144669	-73.35951820676455
162	CC	9522578	SAMUEL	LARA	CARRERA 12 # 11-30	3108066436	3108066436	instituto.ocularsaludsocial@gmail.com	SOGAMOSO	1987-12-04 05:00:00-05	M	1		1	2	2	\N	3	active	2024-05-29 19:43:21-05	2024-05-29 19:43:21-05	\N	f	\N	\N	5.533011673959904	-73.38382807348235
163	CC	9529775	JULIAN HUMBERTO	PARDO MEJIA	CALLE 15 # 16 - 25	7610700	3107637783	opticaspardo.35@gmail.com	SOGAMOSO	1970-11-25 05:00:00-05	M	2		1	2	2	\N	3	active	2024-05-29 19:44:22-05	2024-05-29 19:44:22-05	\N	f	\N	\N	5.512372363001225	-73.39210843084544
164	CC	1018485086	HANNA MICHELLE	ALFONSO GONZALEZ	CARRERA 10 # 14-53			hanna.alfonso@hotmail.com	SOGAMOSO	1990-02-25 05:00:00-05	F	2		1	3	2	\N	3	active	2024-05-29 19:45:29-05	2024-05-29 19:45:29-05	\N	f	\N	\N	5.573522093539179	-73.33438117165646
165	CC	40020685	MARIA EUGENIA	VARGAS	CRA 6  47-27	7471146	3204910500	optomaria@hotmail.com	TUNJA	1970-01-26 05:00:00-05	F	1		1	3	2	\N	3	active	2024-05-29 20:53:33-05	2024-05-29 20:53:33-05	\N	f	\N	\N	5.497805989996115	-73.40445405361902
166	CC	1040738595	Jessica	Londoño	cra 67 25-45	3013892222	301322222	comunicaciones@laboratorioophtha.com	Medellín	2006-06-22 05:00:00-05	F	2		1	1	1	6	1	active	2024-07-23 16:39:48-05	2024-07-23 16:39:48-05	\N	f	\N	\N	6.229238340787795	-75.60770150829543
167	CC	98568758	Prueba TEST	TEST ADMIN	Cra 1 e	3153998569	3153986594	testprueba@gmail.com	Medellin	2006-07-25 05:00:00-05	\N	3	Comfandi	2	\N	5	\N	3	active	2024-10-03 16:52:17-05	2024-10-03 16:52:17-05	\N	f	\N	\N	6.274990220263004	-75.56839164485892
168	CC	123456789	prueba 1510	prueba	calle 2 79-35	3106933247	3016929387	juandavid.mejia@servitecssr.com.co	Medellin	1988-10-15 05:00:00-05	M	3		1	3	1	2	1	active	2024-10-15 14:27:04-05	2024-10-15 14:27:04-05	2026-02-17 16:32:24-05	f	\N	\N	6.210681191223653	-75.61696377777102
178	CC	1017172511	Eduardo	Montoya	Carrera 65 No. 29 - 44	3153038888	3615303888	nanis2291@hotmail.com	Itagui	1990-03-21 05:00:00-05	M	3	\N	1	1	2	\N	1	active	2026-03-12 13:36:45-05	2026-03-12 13:36:45-05	\N	f	\N	\N	6.212772759716476	-75.54685382975954
179	CC	88888888	JuanD	Echeverri	Dir	3015790000	3015794800	cor@cor.com	Medellín	2008-03-12 05:00:00-05	M	3	\N	1	1	4	\N	1	active	2026-03-12 13:49:22-05	2026-04-06 15:02:41-05	\N	f	\N	\N	6.273860607890572	-75.56125537462142
\.


--
-- Data for Name: third_classification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_classification (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Compra directo Ophtha	active	2024-02-08 04:27:02-05	2024-02-08 04:27:02-05	\N
2	Compra por distribuidor	active	2024-02-08 04:27:02-05	2024-02-08 04:27:02-05	\N
3	Prescriptor	active	2024-03-12 03:13:22-05	2024-03-12 03:13:22-05	\N
4	Tecnólogo Médico	active	2024-03-12 03:13:22-05	2024-03-12 03:13:22-05	\N
\.


--
-- Data for Name: third_specialty; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_specialty (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Oftalmólogo	active	2024-02-08 04:27:29-05	2024-02-08 04:27:29-05	\N
2	Optometra	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
3	Residente	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
4	Fellow	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
5	Dermatólogo	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
6	Médico General	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
7	Médico Pediatra	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
8	Médico Veterinario	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
9	Médico Veterinario Oftalmólogo	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
10	Otras	active	2024-03-12 03:22:31-05	2024-03-12 03:22:31-05	\N
\.


--
-- Data for Name: third_subspecialty; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_subspecialty (id, name, "specialtyId", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Oftalmología Integral	1	active	2024-02-08 04:27:52-05	2024-02-08 04:27:52-05	\N
2	Segmento Anterior y Posterior	1	active	2024-02-08 04:27:52-05	2024-02-08 04:27:52-05	\N
3	Retina, Vitreo y Uveítis	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
4	Oftalmología Pedíatrica	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
5	Estrabismo	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
6	Glaucoma	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
7	Oculoplastia, Vía lagrimal y Órbita	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
8	Oncología Ocular y Tumores Oculares	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
9	Córnea	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
10	Neuro Oftalmología	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
11	Otras	1	active	2024-03-12 03:18:37-05	2024-03-12 03:18:37-05	\N
12	Contactólogo	2	active	2024-03-12 03:32:27-05	2024-03-12 03:32:27-05	\N
13	Otras	2	active	2024-03-12 03:32:27-05	2024-03-12 03:32:27-05	\N
\.


--
-- Data for Name: third_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_type (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Medico	active	2024-02-08 04:29:08-05	2024-02-08 04:29:08-05	\N
2	Drogueria	active	2024-02-08 04:29:08-05	2024-02-08 04:29:08-05	\N
3	Comercial	active	2024-02-08 04:29:08-05	2024-02-08 04:29:08-05	\N
\.


--
-- Data for Name: thirds_portfolios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.thirds_portfolios (id, "portfolioId", "thirdId", approved, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
4	2	5	t	active	2024-03-20 14:35:18-05	2025-12-16 20:40:36-05	\N
6	3	7	t	active	2024-05-20 15:14:15-05	2025-11-06 20:15:28-05	\N
8	3	11	f	active	2024-05-22 20:41:07-05	2024-05-22 20:41:07-05	\N
10	3	13	f	active	2024-05-22 20:44:14-05	2024-05-22 20:44:14-05	\N
15	3	18	f	active	2024-05-29 14:10:56-05	2024-05-29 14:10:56-05	\N
16	3	19	f	active	2024-05-29 14:18:44-05	2024-05-29 14:18:44-05	\N
19	3	25	f	active	2024-05-29 14:26:37-05	2024-05-29 14:26:37-05	\N
20	3	26	f	active	2024-05-29 14:30:55-05	2024-05-29 14:30:55-05	\N
21	3	27	f	active	2024-05-29 14:32:53-05	2024-05-29 14:32:53-05	\N
22	3	28	f	active	2024-05-29 14:38:32-05	2024-05-29 14:38:32-05	\N
23	3	29	f	active	2024-05-29 14:44:46-05	2024-05-29 14:44:46-05	\N
25	3	31	f	active	2024-05-29 14:49:30-05	2024-05-29 14:49:30-05	\N
27	3	33	f	active	2024-05-29 14:53:01-05	2024-05-29 14:53:01-05	\N
31	3	38	f	active	2024-05-29 14:59:47-05	2024-05-29 14:59:47-05	\N
34	3	41	f	active	2024-05-29 15:08:57-05	2024-05-29 15:08:57-05	\N
39	3	46	f	active	2024-05-29 15:19:42-05	2024-05-29 15:19:42-05	\N
42	3	51	f	active	2024-05-29 15:26:09-05	2024-05-29 15:26:09-05	\N
44	3	53	f	active	2024-05-29 15:30:22-05	2024-05-29 15:30:22-05	\N
45	3	54	f	active	2024-05-29 15:31:34-05	2024-05-29 15:31:34-05	\N
46	3	55	f	active	2024-05-29 15:32:44-05	2024-05-29 15:32:44-05	\N
48	3	57	f	active	2024-05-29 15:36:06-05	2024-05-29 15:36:06-05	\N
50	3	59	f	active	2024-05-29 15:38:53-05	2024-05-29 15:38:53-05	\N
52	3	61	f	active	2024-05-29 15:42:47-05	2024-05-29 15:42:47-05	\N
53	3	62	f	active	2024-05-29 15:44:52-05	2024-05-29 15:44:52-05	\N
54	3	63	f	active	2024-05-29 15:49:43-05	2024-05-29 15:49:43-05	\N
55	3	64	f	active	2024-05-29 15:55:51-05	2024-05-29 15:55:51-05	\N
56	3	65	f	active	2024-05-29 15:57:16-05	2024-05-29 15:57:16-05	\N
59	3	68	f	active	2024-05-29 16:03:18-05	2024-05-29 16:03:18-05	\N
61	3	70	f	active	2024-05-29 16:06:22-05	2024-05-29 16:06:22-05	\N
63	3	72	f	active	2024-05-29 16:09:42-05	2024-05-29 16:09:42-05	\N
67	3	76	f	active	2024-05-29 16:15:23-05	2024-05-29 16:15:23-05	\N
68	3	77	f	active	2024-05-29 16:19:08-05	2024-05-29 16:19:08-05	\N
69	3	78	f	active	2024-05-29 16:21:09-05	2024-05-29 16:21:09-05	\N
70	3	79	f	active	2024-05-29 16:22:44-05	2024-05-29 16:22:44-05	\N
71	3	80	f	active	2024-05-29 16:23:54-05	2024-05-29 16:23:54-05	\N
72	3	81	f	active	2024-05-29 16:28:57-05	2024-05-29 16:28:57-05	\N
76	3	85	f	active	2024-05-29 16:34:54-05	2024-05-29 16:34:54-05	\N
77	3	86	f	active	2024-05-29 16:36:07-05	2024-05-29 16:36:07-05	\N
81	3	90	f	active	2024-05-29 16:43:10-05	2024-05-29 16:43:10-05	\N
85	3	94	f	active	2024-05-29 16:53:26-05	2024-05-29 16:53:26-05	\N
86	3	95	f	active	2024-05-29 16:58:23-05	2024-05-29 16:58:23-05	\N
87	3	96	f	active	2024-05-29 17:02:13-05	2024-05-29 17:02:13-05	\N
89	3	98	f	active	2024-05-29 17:07:42-05	2024-05-29 17:07:42-05	\N
92	3	101	f	active	2024-05-29 17:15:58-05	2024-05-29 17:15:58-05	\N
93	3	102	f	active	2024-05-29 17:17:01-05	2024-05-29 17:17:01-05	\N
95	3	104	f	active	2024-05-29 17:19:59-05	2024-05-29 17:19:59-05	\N
96	3	105	f	active	2024-05-29 17:21:05-05	2024-05-29 17:21:05-05	\N
98	3	107	f	active	2024-05-29 18:09:05-05	2024-05-29 18:09:05-05	\N
103	3	112	f	active	2024-05-29 18:18:38-05	2024-05-29 18:18:38-05	\N
104	3	113	f	active	2024-05-29 18:19:40-05	2024-05-29 18:19:40-05	\N
105	3	114	f	active	2024-05-29 18:21:24-05	2024-05-29 18:21:24-05	\N
109	3	118	f	active	2024-05-29 18:28:59-05	2024-05-29 18:28:59-05	\N
110	3	119	f	active	2024-05-29 18:30:46-05	2024-05-29 18:30:46-05	\N
112	3	121	f	active	2024-05-29 18:33:18-05	2024-05-29 18:33:18-05	\N
114	3	123	f	active	2024-05-29 18:36:04-05	2024-05-29 18:36:04-05	\N
116	3	125	f	active	2024-05-29 18:39:36-05	2024-05-29 18:39:36-05	\N
117	3	126	f	active	2024-05-29 18:40:35-05	2024-05-29 18:40:35-05	\N
126	3	135	f	active	2024-05-29 18:57:00-05	2024-05-29 18:57:00-05	\N
129	3	138	f	active	2024-05-29 19:00:46-05	2024-05-29 19:00:46-05	\N
130	3	139	f	active	2024-05-29 19:02:02-05	2024-05-29 19:02:02-05	\N
132	3	141	f	active	2024-05-29 19:05:38-05	2024-05-29 19:05:38-05	\N
135	3	144	f	active	2024-05-29 19:11:05-05	2024-05-29 19:11:05-05	\N
137	3	146	f	active	2024-05-29 19:14:15-05	2024-05-29 19:14:15-05	\N
138	3	147	f	active	2024-05-29 19:16:33-05	2024-05-29 19:16:33-05	\N
141	3	150	f	active	2024-05-29 19:22:30-05	2024-05-29 19:22:30-05	\N
143	3	152	f	active	2024-05-29 19:25:15-05	2024-05-29 19:25:15-05	\N
145	3	154	f	active	2024-05-29 19:28:11-05	2024-05-29 19:28:11-05	\N
147	3	156	f	active	2024-05-29 19:36:30-05	2024-05-29 19:36:30-05	\N
148	3	157	f	active	2024-05-29 19:37:56-05	2024-05-29 19:37:56-05	\N
151	3	160	f	active	2024-05-29 19:41:02-05	2024-05-29 19:41:02-05	\N
152	3	161	f	active	2024-05-29 19:42:06-05	2024-05-29 19:42:06-05	\N
156	3	165	f	active	2024-05-29 20:53:33-05	2024-05-29 20:53:33-05	\N
157	3	166	t	active	2024-07-23 16:39:48-05	2024-07-23 16:39:48-05	\N
159	2	167	t	active	2024-10-03 17:26:41-05	2025-12-16 20:40:36-05	\N
163	6	158	t	active	2026-03-12 05:25:30-05	2026-03-12 05:25:30-05	\N
164	7	158	t	active	2026-03-12 05:25:58-05	2026-03-12 05:26:32-05	\N
165	6	179	t	active	2026-03-12 13:55:10-05	2026-03-12 13:55:10-05	\N
167	9	179	t	active	2026-06-06 15:02:42.215597-05	2026-06-06 15:02:42.215597-05	\N
9	3	12	t	active	2024-05-22 20:42:35-05	2024-05-22 20:42:35-05	\N
11	3	14	t	active	2024-05-29 12:41:21-05	2024-05-29 12:41:21-05	\N
12	3	15	t	active	2024-05-29 12:50:49-05	2024-05-29 12:50:49-05	\N
13	3	16	t	active	2024-05-29 14:06:00-05	2024-05-29 14:06:00-05	\N
14	3	17	t	active	2024-05-29 14:09:32-05	2024-05-29 14:09:32-05	\N
17	3	20	t	active	2024-05-29 14:19:45-05	2024-05-29 14:19:45-05	\N
18	3	21	t	active	2024-05-29 14:21:48-05	2024-05-29 14:21:48-05	\N
24	3	30	t	active	2024-05-29 14:46:41-05	2024-05-29 14:46:41-05	\N
26	3	32	t	active	2024-05-29 14:51:11-05	2024-05-29 14:51:11-05	\N
28	3	35	t	active	2024-05-29 14:54:25-05	2024-05-29 14:54:25-05	\N
29	3	36	t	active	2024-05-29 14:55:55-05	2024-05-29 14:55:55-05	\N
30	3	37	t	active	2024-05-29 14:58:22-05	2024-05-29 14:58:22-05	\N
32	3	39	t	active	2024-05-29 15:01:28-05	2024-05-29 15:01:28-05	\N
33	3	40	t	active	2024-05-29 15:03:39-05	2024-05-29 15:03:39-05	\N
35	3	42	t	active	2024-05-29 15:10:48-05	2024-05-29 15:10:48-05	\N
36	3	43	t	active	2024-05-29 15:14:22-05	2024-05-29 15:14:22-05	\N
37	3	44	t	active	2024-05-29 15:16:42-05	2024-05-29 15:16:42-05	\N
38	3	45	t	active	2024-05-29 15:18:21-05	2024-05-29 15:18:21-05	\N
40	3	47	t	active	2024-05-29 15:21:18-05	2024-05-29 15:21:18-05	\N
41	3	50	t	active	2024-05-29 15:24:48-05	2024-05-29 15:24:48-05	\N
43	3	52	t	active	2024-05-29 15:28:31-05	2024-05-29 15:28:31-05	\N
47	3	56	t	active	2024-05-29 15:34:17-05	2024-05-29 15:34:17-05	\N
49	3	58	t	active	2024-05-29 15:37:57-05	2024-05-29 15:37:57-05	\N
51	3	60	t	active	2024-05-29 15:41:26-05	2024-05-29 15:41:26-05	\N
57	3	66	t	active	2024-05-29 15:58:34-05	2024-05-29 15:58:34-05	\N
58	3	67	t	active	2024-05-29 16:01:28-05	2024-05-29 16:01:28-05	\N
60	3	69	t	active	2024-05-29 16:04:43-05	2024-05-29 16:04:43-05	\N
62	3	71	t	active	2024-05-29 16:08:31-05	2024-05-29 16:08:31-05	\N
64	3	73	t	active	2024-05-29 16:10:44-05	2024-05-29 16:10:44-05	\N
65	3	74	t	active	2024-05-29 16:12:57-05	2024-05-29 16:12:57-05	\N
66	3	75	t	active	2024-05-29 16:14:18-05	2024-05-29 16:14:18-05	\N
73	3	82	t	active	2024-05-29 16:30:20-05	2024-05-29 16:30:20-05	\N
74	3	83	t	active	2024-05-29 16:32:48-05	2024-05-29 16:32:48-05	\N
75	3	84	t	active	2024-05-29 16:33:50-05	2024-05-29 16:33:50-05	\N
78	3	87	t	active	2024-05-29 16:37:26-05	2024-05-29 16:37:26-05	\N
79	3	88	t	active	2024-05-29 16:38:47-05	2024-05-29 16:38:47-05	\N
80	3	89	t	active	2024-05-29 16:41:11-05	2024-05-29 16:41:11-05	\N
82	3	91	t	active	2024-05-29 16:48:47-05	2024-05-29 16:48:47-05	\N
83	3	92	t	active	2024-05-29 16:50:04-05	2024-05-29 16:50:04-05	\N
84	3	93	t	active	2024-05-29 16:52:02-05	2024-05-29 16:52:02-05	\N
88	3	97	t	active	2024-05-29 17:06:13-05	2024-05-29 17:06:13-05	\N
90	3	99	t	active	2024-05-29 17:10:02-05	2024-05-29 17:10:02-05	\N
91	3	100	t	active	2024-05-29 17:14:42-05	2024-05-29 17:14:42-05	\N
94	3	103	t	active	2024-05-29 17:18:34-05	2024-05-29 17:18:34-05	\N
97	3	106	t	active	2024-05-29 17:22:10-05	2024-05-29 17:22:10-05	\N
99	3	108	t	active	2024-05-29 18:10:56-05	2024-05-29 18:10:56-05	\N
100	3	109	t	active	2024-05-29 18:14:49-05	2024-05-29 18:14:49-05	\N
101	3	110	t	active	2024-05-29 18:16:16-05	2024-05-29 18:16:16-05	\N
102	3	111	t	active	2024-05-29 18:17:33-05	2024-05-29 18:17:33-05	\N
106	3	115	t	active	2024-05-29 18:22:58-05	2024-05-29 18:22:58-05	\N
107	3	116	t	active	2024-05-29 18:24:25-05	2024-05-29 18:24:25-05	\N
108	3	117	t	active	2024-05-29 18:26:27-05	2024-05-29 18:26:27-05	\N
111	3	120	t	active	2024-05-29 18:31:45-05	2024-05-29 18:31:45-05	\N
113	3	122	t	active	2024-05-29 18:35:01-05	2024-05-29 18:35:01-05	\N
115	3	124	t	active	2024-05-29 18:37:45-05	2024-05-29 18:37:45-05	\N
118	3	127	t	active	2024-05-29 18:43:18-05	2024-05-29 18:43:18-05	\N
119	3	128	t	active	2024-05-29 18:45:23-05	2024-05-29 18:45:23-05	\N
120	3	129	t	active	2024-05-29 18:46:41-05	2024-05-29 18:46:41-05	\N
121	3	130	t	active	2024-05-29 18:48:14-05	2024-05-29 18:48:14-05	\N
122	3	131	t	active	2024-05-29 18:49:20-05	2024-05-29 18:49:20-05	\N
123	3	132	t	active	2024-05-29 18:50:27-05	2024-05-29 18:50:27-05	\N
124	3	133	t	active	2024-05-29 18:52:59-05	2024-05-29 18:52:59-05	\N
125	3	134	t	active	2024-05-29 18:55:31-05	2024-05-29 18:55:31-05	\N
127	3	136	t	active	2024-05-29 18:58:53-05	2024-05-29 18:58:53-05	\N
128	3	137	t	active	2024-05-29 18:59:47-05	2024-05-29 18:59:47-05	\N
131	3	140	t	active	2024-05-29 19:03:53-05	2024-05-29 19:03:53-05	\N
133	3	142	t	active	2024-05-29 19:07:47-05	2024-05-29 19:07:47-05	\N
134	3	143	t	active	2024-05-29 19:09:38-05	2024-05-29 19:09:38-05	\N
136	3	145	t	active	2024-05-29 19:13:06-05	2024-05-29 19:13:06-05	\N
139	3	148	t	active	2024-05-29 19:19:09-05	2024-05-29 19:19:09-05	\N
140	3	149	t	active	2024-05-29 19:20:21-05	2024-05-29 19:20:21-05	\N
142	3	151	t	active	2024-05-29 19:23:35-05	2024-05-29 19:23:35-05	\N
144	3	153	t	active	2024-05-29 19:27:01-05	2024-05-29 19:27:01-05	\N
146	3	155	t	active	2024-05-29 19:29:24-05	2024-05-29 19:29:24-05	\N
149	3	158	t	active	2024-05-29 19:38:56-05	2024-05-29 19:38:56-05	\N
150	3	159	t	active	2024-05-29 19:39:52-05	2024-05-29 19:39:52-05	\N
153	3	162	t	active	2024-05-29 19:43:21-05	2024-05-29 19:43:21-05	\N
154	3	163	t	active	2024-05-29 19:44:22-05	2024-05-29 19:44:22-05	\N
155	3	164	t	active	2024-05-29 19:45:29-05	2024-05-29 19:45:29-05	\N
166	8	179	t	active	2026-03-17 00:39:19-05	2026-03-17 00:39:19-05	\N
\.


--
-- Data for Name: type_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.type_events (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Inasistencia	active	2024-02-20 01:10:37-05	2024-02-20 01:10:37-05	\N
2	Plan de trabajo	active	2024-02-20 01:10:37-05	2024-02-20 01:10:37-05	\N
\.


--
-- Data for Name: user_classification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_classification (id, name, status, "createdAt", "updatedAt", "deletedAt", permissions) FROM stdin;
3	Superadmin	active	2026-03-17 18:24:29-05	2026-03-17 18:24:29-05	\N	\N
1	Administrador	active	2024-02-08 04:29:35-05	2024-02-08 04:29:35-05	\N	{"paneles": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "visitas": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "informes": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "usuarios": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "plan_trabajo": {"ver": true, "crear": true, "editar": true, "eliminar": true}}
2	Representante	active	2024-03-15 04:56:14-05	2024-03-15 04:56:14-05	\N	{"paneles": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "visitas": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "informes": {"ver": true, "crear": false, "editar": false, "eliminar": false}, "usuarios": {"ver": false, "crear": false, "editar": false, "eliminar": false}, "plan_trabajo": {"ver": true, "crear": true, "editar": true, "eliminar": false}}
4	Coordinador	active	2026-06-05 18:35:18.037022-05	2026-06-05 18:35:18.037022-05	\N	{"paneles": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "visitas": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "informes": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "usuarios": {"ver": true, "crear": false, "editar": false, "eliminar": false}, "plan_trabajo": {"ver": true, "crear": true, "editar": true, "eliminar": false}}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, "firstName", "lastName", email, phone, mobile, password, category, "classificationId", "regionId", shortcuts, status, "createdAt", "updatedAt", "deletedAt", "coordinatorId", permissions, "twoFactorEnabled", "twoFactorSecret") FROM stdin;
3	Jhordan	Rodriguez	jhordan.alexis1@gmail.com	\N		$2a$10$cVt22oFjVPBOL6Uuxt7QnenMmNoUfB9l6Bz5B/VOoudU3tAVPN5TS		2	14	[]	active	2024-03-18 18:54:53-05	2024-03-18 18:54:53-05	\N	\N	\N	f	\N
4	Luisa 	Castaño	analista.comercial@laboratorioophtha.com	3006280282	3006280282	$2a$10$5rFg4t7Ob5cL8KCB8XrUguKiU9LXUYrM3HJ/lcUXoRcxdIZ6BEH36		1	1	[]	active	2024-03-22 19:59:29-05	2024-03-22 19:59:29-05	\N	\N	\N	f	\N
6	Angel	Tenjo	gabriel.tenjo@laboratorioophtha.com	3102275919	3102275919	$2a$10$kB5q4izAHjIFc2JHBa9/Cu873NZGcD01jQDXKkKkn4BZAqO2OHjs6	Junior	2	3	[]	active	2024-03-22 20:01:27-05	2024-05-20 15:04:44-05	\N	\N	\N	f	\N
8	Cindy	Rincon	cindy.rincon@laboratorioophtha.com	318 3775491	318 3775491	$2a$10$ZBaboXvdivhwJp9RuXUxteeWV2Q/gJzoqih2ulIm8/yDip3N7KP96	\N	2	13	[]	active	2024-05-28 13:22:35-05	2024-05-28 13:22:35-05	\N	\N	\N	f	\N
12	Johana 	Londoño Muñoz	comunicaciones@laboratorioophtha.com	3153031818	3153031818	$2a$10$Pnsb3V01E5MipVY/Hc0QMOjHrT69d74FpygxadHed.CRv9Z2UxrmW	\N	1	1	[]	active	2024-06-11 14:36:47-05	2025-09-01 15:35:33-05	\N	\N	\N	f	\N
15	Todo	Venta	gerencia@todoventa.com	3045558469	3045558469	$2a$10$uywIe..DXHnKwkoK1GEbG.8/em35sOrpI7R4D17mYbCjpHM.HukK6	Junior	2	1	\N	active	2026-01-20 14:43:50-05	2026-01-20 14:43:50-05	\N	\N	\N	f	\N
17	Juan Diego	Echeverri	jecheverri@cidenet.com.co	301 5794837	301 5794837	$2a$10$aldz8u93TjCHnqKC4TIKR.LsfCgOFRVtiGL9XZ/HJlWj7xB0A/bk6	Coordinador	1	1	\N	active	2026-03-09 16:04:01-05	2026-03-17 00:10:22-05	\N	\N	\N	f	\N
18	Juan Diego	Echeverri	jdecheverrimesa@gmail.com	3015794837	3015794837	$2a$10$2O5rQ9y6KWx5Um08YIWx7.BY0tvBfZWMpgEZG47vQP8jicbCNFuii	Junior	2	1	\N	active	2026-03-09 16:08:52-05	2026-03-17 00:10:58-05	\N	\N	\N	f	\N
19	Juan	Mesa	dosecheverris@gmail.com	3015790000	3015794800	$2a$10$s5QzJrRVGlpoWXnQQKz6OuqScMDfxFO.S3KfQItCGjxajX2TkZEDC	Coordinador	2	1	\N	active	2026-03-17 00:18:01-05	2026-03-17 00:18:01-05	\N	\N	\N	f	\N
7	Sistemas	Ophtha	sistemas@laboratorioophtha.com			$2a$10$uywIe..DXHnKwkoK1GEbG.8/em35sOrpI7R4D17mYbCjpHM.HukK6	\N	1	1	[]	active	2024-05-07 13:37:15-05	2025-04-22 13:52:23-05	\N	\N	\N	f	\N
1	Jhordan A	Rodriguez	jrodriguez@codemasterdev.co			$2a$10$phIybpr8rEHLr97XlgNU8OYj5VUdsD8E3WGzImQF8zK.sSzU0HkgO		1	1	["reports-component"]	active	2024-02-08 03:55:42-05	2025-08-29 23:19:23-05	\N	\N	\N	f	\N
2	Cesar 	Mendoza	cesar@gmail.com			$2a$10$phIybpr8rEHLr97XlgNU8OYj5VUdsD8E3WGzImQF8zK.sSzU0HkgO		2	1	[]	active	2024-02-08 03:55:42-05	2024-05-21 18:44:32-05	\N	\N	\N	f	\N
22	Hector 	Alvarez	gerencia@siev.co	3175025238	3175025238	$2a$10$JYpK6i1WPkx7y75TXoqBW./9sp7CeqLhwARdVvbNhocX7Oejxt8LO	Coordinador	1	1	\N	active	2026-04-06 14:44:50-05	2026-06-18 14:29:21.626-05	\N	\N	\N	f	\N
\.


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.visits (id, "typeId", "thirdId", "userId", date, objective, comment, status, "createdAt", "updatedAt", "deletedAt", latitude, longitude, "isVerified") FROM stdin;
1	2	5	3	2024-03-20 11:30:00-05	Visita almacen	Visita almacen	active	2024-03-20 14:35:53-05	2024-03-20 14:35:53-05	\N	\N	\N	f
2	1	2	1	2024-04-18 12:15:00-05	Visita prueba	Visita prueba 2	active	2024-04-18 22:48:27-05	2024-08-05 17:21:36-05	\N	\N	\N	f
3	1	2	2	2024-04-18 13:30:00-05	>Test pruebas	>Test pruebas	active	2024-04-18 22:55:25-05	2024-08-28 03:06:06-05	\N	\N	\N	f
4	1	6	6	2024-04-11 15:00:00-05	Visita médica	Prueba	active	2024-05-20 15:06:15-05	2024-05-20 15:08:11-05	\N	\N	\N	f
5	1	6	6	2024-04-24 15:00:00-05	Visita # 2	Visita médica	active	2024-05-20 15:08:53-05	2024-05-20 15:08:53-05	\N	\N	\N	f
6	1	6	6	2024-05-09 15:00:00-05	Prueba	Prueba	active	2024-05-20 15:09:48-05	2024-05-20 15:09:48-05	\N	\N	\N	f
7	1	6	6	2024-05-20 15:00:00-05	Prueba	Prueba	active	2024-05-20 15:10:24-05	2024-06-11 14:27:31-05	\N	\N	\N	f
8	1	12	6	2024-06-07 05:00:00-05	prueba 11/06/2024	prueba 11/06/2024	active	2024-06-11 14:28:25-05	2024-06-11 14:28:25-05	\N	\N	\N	f
9	1	7	6	2024-07-24 05:00:00-05	Prueba 5 de julio	prueba	active	2024-07-05 16:52:05-05	2024-07-23 16:34:02-05	\N	\N	\N	f
10	1	47	6	2024-07-05 05:00:00-05	prueba 5 de julio	prueba	active	2024-07-05 16:52:35-05	2024-07-05 16:52:35-05	\N	\N	\N	f
11	1	6	6	2024-07-05 05:00:00-05	prueba		active	2024-07-05 17:09:21-05	2024-07-05 17:09:21-05	\N	\N	\N	f
12	1	6	6	2024-07-05 05:00:00-05	prueba		active	2024-07-05 17:14:43-05	2024-07-05 17:14:43-05	\N	\N	\N	f
13	3	3	2	2024-07-11 05:00:00-05	prueba s	pruebas	active	2024-07-11 12:46:10-05	2024-08-28 03:06:00-05	\N	\N	\N	f
14	1	2	2	2024-07-11 05:00:00-05	prueba	prueba	active	2024-07-11 12:46:49-05	2024-07-11 12:46:49-05	\N	\N	\N	f
15	3	4	2	2024-07-11 05:00:00-05	dbdb	test	active	2024-07-11 12:47:40-05	2024-08-05 16:19:52-05	\N	\N	\N	f
16	3	3	2	2024-10-04 05:00:00-05	visita cliente	visita cliente	active	2024-10-03 17:19:00-05	2024-10-03 17:19:00-05	\N	\N	\N	f
17	1	2	2	2024-10-15 05:00:00-05	venta	ventab tdwta f	active	2024-10-15 14:31:21-05	2024-10-15 14:31:38-05	\N	\N	\N	f
19	2	167	3	2026-03-31 03:04:58.31-05	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:33.715098-05	2026-06-06 17:07:33.715098-05	\N	6.275070598613847	-75.56867899440884	t
20	1	166	6	2026-04-06 02:15:56.511-05	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:33.959943-05	2026-06-06 17:07:33.959943-05	\N	6.229707778303489	-75.60808438954491	t
21	1	164	6	2026-01-04 11:15:10.495-05	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:33.961808-05	2026-06-06 17:07:33.961808-05	\N	5.573398238729541	-73.33432351489526	f
22	1	164	6	2026-01-17 21:10:31.173-05	Validación de rotación de stock de colirios	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:33.963455-05	2026-06-06 17:07:33.963455-05	\N	5.573142336146711	-73.33409218282453	t
23	1	164	6	2026-05-13 10:29:01.876-05	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:33.965017-05	2026-06-06 17:07:33.965017-05	\N	5.573320460125669	-73.33404902049233	t
24	1	163	6	2026-02-25 22:47:09.11-05	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:33.967697-05	2026-06-06 17:07:33.967697-05	\N	5.512087206603784	-73.39218395181818	t
25	1	162	6	2026-02-25 11:15:48.994-05	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:33.969751-05	2026-06-06 17:07:33.969751-05	\N	5.5326260595633	-73.38424720401828	f
26	1	162	6	2026-04-22 11:28:55.745-05	Validación de rotación de stock de colirios	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:33.971034-05	2026-06-06 17:07:33.971034-05	\N	5.533158611178817	-73.38337543266657	f
27	1	162	6	2026-01-30 22:07:19.476-05	Visita de fidelización y entrega de muestras médicas	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:33.972702-05	2026-06-06 17:07:33.972702-05	\N	5.532547177451196	-73.3843084549104	t
28	1	129	6	2026-02-02 17:58:01.711-05	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:33.976679-05	2026-06-06 17:07:33.976679-05	\N	5.555762881795343	-73.40614556112584	f
29	1	129	6	2026-02-02 14:13:10.798-05	Presentación de literatura científica del nuevo lubricante ocular	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:33.985169-05	2026-06-06 17:07:33.985169-05	\N	5.556101155183961	-73.40652080886912	f
30	1	110	6	2026-04-03 09:29:34.772-05	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:33.986873-05	2026-06-06 17:07:33.986873-05	\N	5.567823207133735	-73.35596139327058	t
31	1	84	6	2026-06-02 08:04:55.501-05	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:33.990194-05	2026-06-06 17:07:33.990194-05	\N	5.555715186651527	-73.386780881427	t
32	1	82	6	2026-01-05 04:13:28.443-05	Validación de rotación de stock de colirios	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:33.99158-05	2026-06-06 17:07:33.99158-05	\N	5.504485365737907	-73.3861064825412	f
33	1	73	6	2026-01-22 14:35:40.833-05	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:33.993862-05	2026-06-06 17:07:33.993862-05	\N	5.552989309907701	-73.35214238430224	f
34	1	73	6	2026-03-16 05:54:18.347-05	Presentación de la nueva línea oftálmica Kaizen	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.025691-05	2026-06-06 17:07:34.025691-05	\N	5.553526561627817	-73.35244218734718	f
35	1	45	6	2026-04-26 02:16:04.552-05	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.026974-05	2026-06-06 17:07:34.026974-05	\N	5.499976289144929	-73.3825937278337	f
36	1	45	6	2026-05-17 14:19:57.473-05	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.02795-05	2026-06-06 17:07:34.02795-05	\N	5.4999514267208784	-73.38271889137235	t
37	1	45	6	2026-02-23 10:03:10.368-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.029152-05	2026-06-06 17:07:34.029152-05	\N	5.499983680594964	-73.3825565641491	t
38	1	44	6	2026-03-04 12:34:49.268-05	Revisión de acuerdos comerciales y pedidos especiales	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.030605-05	2026-06-06 17:07:34.030605-05	\N	5.5202910067400355	-73.35572478862555	t
39	1	39	6	2026-01-19 23:17:27.466-05	Presentación de la nueva línea oftálmica Kaizen	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.032532-05	2026-06-06 17:07:34.032532-05	\N	5.51823321551344	-73.4026484531619	t
40	1	30	6	2026-03-15 18:21:08.204-05	Revisión de acuerdos comerciales y pedidos especiales	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.03392-05	2026-06-06 17:07:34.03392-05	\N	5.517187212545624	-73.36503716622623	t
41	1	30	6	2026-05-15 06:04:34.061-05	Visita de fidelización y entrega de muestras médicas	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.035203-05	2026-06-06 17:07:34.035203-05	\N	5.51702816139971	-73.3643921480837	t
42	1	159	6	2026-01-12 16:23:15.254-05	Revisión de acuerdos comerciales y pedidos especiales	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.036345-05	2026-06-06 17:07:34.036345-05	\N	5.54091339453309	-73.33551984640778	f
43	1	159	6	2026-01-25 02:38:09.505-05	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.03834-05	2026-06-06 17:07:34.03834-05	\N	5.541241084697727	-73.33614939952892	t
44	1	159	6	2026-04-11 07:26:22.924-05	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.054125-05	2026-06-06 17:07:34.054125-05	\N	5.541197370793645	-73.33631001520504	t
45	1	158	6	2026-05-10 07:58:22.931-05	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.055648-05	2026-06-06 17:07:34.055648-05	\N	5.529859407113377	-73.33013214358596	t
46	1	155	6	2026-05-28 13:07:42.546-05	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.056789-05	2026-06-06 17:07:34.056789-05	\N	5.524210947991092	-73.39085137055629	t
47	1	155	6	2026-04-11 07:51:12.307-05	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.058045-05	2026-06-06 17:07:34.058045-05	\N	5.524878725006197	-73.39107444960536	t
48	1	155	6	2026-02-23 15:54:47.473-05	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.060061-05	2026-06-06 17:07:34.060061-05	\N	5.5248800055466285	-73.39087120519001	f
49	1	151	6	2026-01-02 18:43:47.664-05	Validación de rotación de stock de colirios	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.062154-05	2026-06-06 17:07:34.062154-05	\N	5.525720200832544	-73.35423393127559	t
50	1	151	6	2026-02-12 23:02:37.695-05	Validación de rotación de stock de colirios	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.063832-05	2026-06-06 17:07:34.063832-05	\N	5.525891704096822	-73.35496337136908	f
51	1	149	6	2026-03-20 14:23:06.485-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.065191-05	2026-06-06 17:07:34.065191-05	\N	5.523465448147624	-73.33071834127767	f
52	1	149	6	2026-06-05 16:58:18.022-05	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.066251-05	2026-06-06 17:07:34.066251-05	\N	5.522995334345698	-73.331001021443	t
53	1	148	6	2026-05-19 19:50:02.073-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.067394-05	2026-06-06 17:07:34.067394-05	\N	5.568574598131166	-73.38769346156779	t
54	1	148	6	2026-05-03 21:25:17.156-05	Validación de rotación de stock de colirios	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.068636-05	2026-06-06 17:07:34.068636-05	\N	5.5686611046782115	-73.38731529784307	t
55	1	145	6	2026-01-08 13:24:36.343-05	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.070494-05	2026-06-06 17:07:34.070494-05	\N	5.51985460462472	-73.35637008171928	t
56	1	143	6	2026-05-30 23:31:37.623-05	Revisión de acuerdos comerciales y pedidos especiales	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.071803-05	2026-06-06 17:07:34.071803-05	\N	5.550438454469528	-73.33906455824642	t
57	1	143	6	2026-06-01 05:27:48.747-05	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.07344-05	2026-06-06 17:07:34.07344-05	\N	5.5504284491170095	-73.33847489836936	t
58	1	140	6	2026-05-17 08:35:06.264-05	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.077568-05	2026-06-06 17:07:34.077568-05	\N	5.538299519867264	-73.40422432251015	f
59	1	140	6	2026-05-07 08:02:12.825-05	Visita de fidelización y entrega de muestras médicas	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.079443-05	2026-06-06 17:07:34.079443-05	\N	5.538361195352838	-73.40465400926038	f
60	1	134	6	2026-04-27 16:55:15.56-05	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.08137-05	2026-06-06 17:07:34.08137-05	\N	5.569041694391805	-73.35574782649442	t
61	1	134	6	2026-03-27 07:16:11.023-05	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.082624-05	2026-06-06 17:07:34.082624-05	\N	5.568172991709358	-73.35636714118311	t
62	1	133	6	2026-05-31 14:01:01.619-05	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.083685-05	2026-06-06 17:07:34.083685-05	\N	5.559265742078805	-73.38409834753307	t
63	1	132	6	2026-03-27 12:19:12.947-05	Presentación de literatura científica del nuevo lubricante ocular	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.084789-05	2026-06-06 17:07:34.084789-05	\N	5.502262601473503	-73.38226689947558	f
64	1	127	6	2026-02-05 02:15:04.244-05	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.085921-05	2026-06-06 17:07:34.085921-05	\N	5.508866548839446	-73.36723394806134	f
65	1	122	6	2026-04-26 14:41:27.261-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.087526-05	2026-06-06 17:07:34.087526-05	\N	5.553603218435709	-73.33045523550513	f
66	1	122	6	2026-01-30 03:41:39.064-05	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.089701-05	2026-06-06 17:07:34.089701-05	\N	5.5543360120913565	-73.33062548298135	t
67	1	122	6	2026-05-11 20:15:19.186-05	Visita de fidelización y entrega de muestras médicas	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.09084-05	2026-06-06 17:07:34.09084-05	\N	5.554566305476427	-73.33056288911212	f
68	1	120	6	2026-03-08 19:47:05.736-05	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.092768-05	2026-06-06 17:07:34.092768-05	\N	5.526011661394069	-73.33049646613189	f
69	1	120	6	2026-02-14 09:24:41.554-05	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.094103-05	2026-06-06 17:07:34.094103-05	\N	5.52554958476253	-73.3303419183093	f
70	1	120	6	2026-05-06 08:41:20.663-05	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.095285-05	2026-06-06 17:07:34.095285-05	\N	5.5256259397518726	-73.33003513106021	t
71	1	117	6	2026-01-16 00:42:14.229-05	Validación de rotación de stock de colirios	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.096653-05	2026-06-06 17:07:34.096653-05	\N	5.50946016106657	-73.37399502009406	f
72	1	115	6	2026-03-18 20:03:25.272-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.097835-05	2026-06-06 17:07:34.097835-05	\N	5.507031856468756	-73.40601677251504	t
73	1	109	6	2026-05-17 02:45:03.468-05	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.099003-05	2026-06-06 17:07:34.099003-05	\N	5.563920622295988	-73.3383261459782	f
74	1	109	6	2026-03-27 23:51:55.814-05	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.101784-05	2026-06-06 17:07:34.101784-05	\N	5.5634349452595595	-73.33773808504209	t
75	1	109	6	2026-02-05 11:22:02.075-05	Presentación de la nueva línea oftálmica Kaizen	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.107145-05	2026-06-06 17:07:34.107145-05	\N	5.563506726089174	-73.33795022021083	f
76	1	108	6	2026-03-14 11:50:11.418-05	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.109527-05	2026-06-06 17:07:34.109527-05	\N	5.535610787642657	-73.34669262204264	t
77	1	106	6	2026-04-12 17:00:40.296-05	Revisión de acuerdos comerciales y pedidos especiales	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.110613-05	2026-06-06 17:07:34.110613-05	\N	5.564536468297875	-73.33873759292933	t
78	1	103	6	2026-03-20 01:01:25.78-05	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.111471-05	2026-06-06 17:07:34.111471-05	\N	5.500143310800535	-73.36067598403626	t
79	1	103	6	2026-05-02 16:13:45.037-05	Visita de fidelización y entrega de muestras médicas	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.112374-05	2026-06-06 17:07:34.112374-05	\N	5.500165335113338	-73.36121333358064	t
80	1	97	6	2026-04-30 08:59:58.019-05	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.113389-05	2026-06-06 17:07:34.113389-05	\N	5.519391314049386	-73.35864311311556	t
81	1	97	6	2026-01-20 01:44:55.306-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.114652-05	2026-06-06 17:07:34.114652-05	\N	5.518542630252792	-73.35901657057921	t
82	1	97	6	2026-05-29 18:47:17.908-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.115894-05	2026-06-06 17:07:34.115894-05	\N	5.518869983335228	-73.35882721940898	f
83	1	91	6	2026-04-24 05:15:41.716-05	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.117662-05	2026-06-06 17:07:34.117662-05	\N	5.56200418247217	-73.37659262329159	t
84	1	89	6	2026-01-24 03:38:16.335-05	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.118771-05	2026-06-06 17:07:34.118771-05	\N	5.546176564983803	-73.37147943335545	f
85	1	89	6	2026-03-16 14:51:10.848-05	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.122798-05	2026-06-06 17:07:34.122798-05	\N	5.545934619980101	-73.37173242462923	t
86	1	83	6	2026-04-04 13:51:11.454-05	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.124448-05	2026-06-06 17:07:34.124448-05	\N	5.506279868432382	-73.38282293724949	t
87	1	75	6	2026-05-03 07:58:05.239-05	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.125602-05	2026-06-06 17:07:34.125602-05	\N	5.497546664155427	-73.38780098389573	t
88	1	75	6	2026-01-29 19:57:03.505-05	Validación de rotación de stock de colirios	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.126627-05	2026-06-06 17:07:34.126627-05	\N	5.497881023202988	-73.38765059322775	f
89	1	74	6	2026-04-01 17:09:44.308-05	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.12761-05	2026-06-06 17:07:34.12761-05	\N	5.554329326311251	-73.40002233622644	t
90	1	71	6	2026-05-28 18:13:53.888-05	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.128599-05	2026-06-06 17:07:34.128599-05	\N	5.498047338885119	-73.4075268208332	t
91	1	71	6	2026-03-09 16:37:38.455-05	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.129501-05	2026-06-06 17:07:34.129501-05	\N	5.498552747035834	-73.40690669871988	t
92	1	69	6	2026-04-25 01:27:14.459-05	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.130338-05	2026-06-06 17:07:34.130338-05	\N	5.498569101709673	-73.39909121825265	t
93	1	69	6	2026-01-20 11:38:17.736-05	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.131267-05	2026-06-06 17:07:34.131267-05	\N	5.498162969772682	-73.39914461645617	t
94	1	69	6	2026-05-21 04:44:16.71-05	Validación de rotación de stock de colirios	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.132225-05	2026-06-06 17:07:34.132225-05	\N	5.498221662129825	-73.39934614885748	t
95	1	67	6	2026-03-12 21:11:10.567-05	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.133767-05	2026-06-06 17:07:34.133767-05	\N	5.501594499542771	-73.37781661210303	t
96	1	67	6	2026-02-16 21:33:21.541-05	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.134796-05	2026-06-06 17:07:34.134796-05	\N	5.500697031431982	-73.37805032204966	t
97	1	67	6	2026-05-11 23:11:50.588-05	Validación de rotación de stock de colirios	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.135854-05	2026-06-06 17:07:34.135854-05	\N	5.501107240436612	-73.37786470505264	f
98	1	66	6	2026-02-21 18:13:28.366-05	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.137838-05	2026-06-06 17:07:34.137838-05	\N	5.515811092872788	-73.36016363299416	t
99	1	60	6	2026-01-28 12:13:46.356-05	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.139477-05	2026-06-06 17:07:34.139477-05	\N	5.546156663697063	-73.35041929133648	f
100	1	50	6	2026-01-08 08:55:48.296-05	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.140664-05	2026-06-06 17:07:34.140664-05	\N	5.562148771369114	-73.3281702158877	t
101	1	50	6	2026-04-23 09:39:43.255-05	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.141762-05	2026-06-06 17:07:34.141762-05	\N	5.562303519229464	-73.32845914315168	t
102	1	43	6	2026-04-23 22:33:07.51-05	Visita de fidelización y entrega de muestras médicas	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.142892-05	2026-06-06 17:07:34.142892-05	\N	5.5127493326604355	-73.4004667285952	t
103	1	42	6	2026-03-08 12:10:25.8-05	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.144017-05	2026-06-06 17:07:34.144017-05	\N	5.517862806356169	-73.34461930209353	t
104	1	42	6	2026-02-01 18:43:33.168-05	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.144997-05	2026-06-06 17:07:34.144997-05	\N	5.5180454616830135	-73.34472584978195	f
105	1	42	6	2026-01-15 23:14:18.542-05	Validación de rotación de stock de colirios	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.145875-05	2026-06-06 17:07:34.145875-05	\N	5.518502943964231	-73.34498983760948	t
106	1	40	6	2026-02-22 08:50:59.878-05	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.146784-05	2026-06-06 17:07:34.146784-05	\N	5.50105386038995	-73.39617467727749	t
107	1	40	6	2026-01-22 23:50:20.651-05	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.1479-05	2026-06-06 17:07:34.1479-05	\N	5.501165703144933	-73.3960812645249	t
108	1	40	6	2026-02-25 16:14:52.939-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.149175-05	2026-06-06 17:07:34.149175-05	\N	5.50120551471298	-73.39597190041093	f
109	1	37	6	2026-01-03 10:22:47.003-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.150381-05	2026-06-06 17:07:34.150381-05	\N	5.556382915260296	-73.40328160850731	t
110	1	37	6	2026-01-27 11:49:57.149-05	Visita de fidelización y entrega de muestras médicas	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.151514-05	2026-06-06 17:07:34.151514-05	\N	5.5558770922141	-73.40353335053982	t
111	1	35	6	2026-05-31 01:37:59.009-05	Presentación de la nueva línea oftálmica Kaizen	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.152798-05	2026-06-06 17:07:34.152798-05	\N	5.51162967416462	-73.32918217900662	t
112	1	35	6	2026-06-01 22:35:36.769-05	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.154206-05	2026-06-06 17:07:34.154206-05	\N	5.511594660293912	-73.32914217839057	t
113	1	32	6	2026-01-11 04:29:01.749-05	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.155821-05	2026-06-06 17:07:34.155821-05	\N	5.524925036797201	-73.32967841544489	t
114	1	21	6	2026-01-10 21:40:40.82-05	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.156868-05	2026-06-06 17:07:34.156868-05	\N	5.502014032080204	-73.38699758810867	f
115	1	20	6	2026-03-27 06:59:50.722-05	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.157984-05	2026-06-06 17:07:34.157984-05	\N	5.498345554427351	-73.34231623659582	f
116	1	20	6	2026-04-26 08:52:46.957-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.15897-05	2026-06-06 17:07:34.15897-05	\N	5.49843258656556	-73.34213743406914	f
117	1	17	6	2026-05-28 16:16:08.515-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.159941-05	2026-06-06 17:07:34.159941-05	\N	5.548959523540284	-73.34905567595652	t
118	1	16	6	2026-05-16 08:32:22.872-05	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.160992-05	2026-06-06 17:07:34.160992-05	\N	5.567758417688396	-73.3423918470769	f
119	1	16	6	2026-02-15 16:49:07.347-05	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.162318-05	2026-06-06 17:07:34.162318-05	\N	5.567390849933763	-73.34238625097389	t
120	1	16	6	2026-04-30 12:13:57.601-05	Presentación de literatura científica del nuevo lubricante ocular	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.163793-05	2026-06-06 17:07:34.163793-05	\N	5.567412552891699	-73.34228886720763	t
121	1	15	6	2026-05-07 04:38:45.252-05	Validación de rotación de stock de colirios	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.164885-05	2026-06-06 17:07:34.164885-05	\N	5.522769440383324	-73.33235869727962	t
122	1	15	6	2026-03-17 13:33:39.784-05	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.165862-05	2026-06-06 17:07:34.165862-05	\N	5.522267304103933	-73.3327884141343	t
123	1	15	6	2026-02-10 16:08:39.847-05	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.166935-05	2026-06-06 17:07:34.166935-05	\N	5.522313164900815	-73.3325273048567	t
124	1	14	6	2026-01-13 22:37:27.154-05	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 17:07:34.168087-05	2026-06-06 17:07:34.168087-05	\N	5.514634000231655	-73.37818534138898	t
125	1	12	6	2026-05-17 08:49:29.02-05	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.169242-05	2026-06-06 17:07:34.169242-05	\N	5.539508902063219	-73.33224747833859	t
126	1	7	6	2026-05-13 22:46:13.749-05	Revisión de acuerdos comerciales y pedidos especiales	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.170321-05	2026-06-06 17:07:34.170321-05	\N	5.570025594237849	-73.40299539316776	t
127	1	7	6	2026-05-27 05:35:38.166-05	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 17:07:34.171509-05	2026-06-06 17:07:34.171509-05	\N	5.569907359837431	-73.40318618201921	f
128	1	158	18	2026-04-19 00:10:21.096-05	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 17:07:34.172439-05	2026-06-06 17:07:34.172439-05	\N	5.530450198541441	-73.33003023287874	t
129	1	158	18	2026-04-07 09:25:30.089-05	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 17:07:34.173514-05	2026-06-06 17:07:34.173514-05	\N	5.530388644087591	-73.32977450364203	f
130	1	158	18	2026-04-19 09:45:24.597-05	Visita de fidelización y entrega de muestras médicas	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.174507-05	2026-06-06 17:07:34.174507-05	\N	5.530053682967958	-73.3302026965761	t
131	1	179	19	2026-04-26 00:37:13.833-05	Presentación de literatura científica del nuevo lubricante ocular	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.175444-05	2026-06-06 17:07:34.175444-05	\N	6.273404452905528	-75.56119653714607	f
132	1	179	19	2026-01-05 03:59:17.322-05	Presentación de literatura científica del nuevo lubricante ocular	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 17:07:34.176465-05	2026-06-06 17:07:34.176465-05	\N	6.273476281879638	-75.5614266199295	t
133	1	179	19	2026-03-25 20:58:05.481-05	Visita de fidelización y entrega de muestras médicas	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 17:07:34.177645-05	2026-06-06 17:07:34.177645-05	\N	6.27365434383916	-75.56089845710528	t
\.


--
-- Data for Name: workplans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.workplans (id, "userId", "typeEventId", "startDate", "endDate", description, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	2	1	2024-03-20 11:00:00-05	2024-03-20 11:00:00-05	vacaciones x	active	2024-03-20 12:07:51-05	2024-08-28 03:05:22-05	\N
2	2	2	2024-03-20 05:00:00-05	2024-03-20 05:00:00-05	trabajo completo x\nDSVSV	active	2024-03-20 12:08:39-05	2024-08-28 03:05:16-05	\N
3	2	2	2024-04-02 05:00:00-05	2024-04-02 05:00:00-05	Antioquia d	active	2024-03-20 12:23:16-05	2024-08-28 03:04:25-05	\N
4	2	2	2024-03-03 05:00:00-05	2024-03-03 05:00:00-05	esgdh 	active	2024-03-20 12:24:36-05	2024-03-20 12:24:36-05	\N
5	2	2	2024-03-20 05:00:00-05	2024-03-20 05:00:00-05	rxctvbnmxx	active	2024-03-20 12:35:48-05	2024-08-28 03:04:58-05	\N
6	2	2	2024-03-31 05:00:00-05	2024-03-31 17:00:00-05	sdxfcvbnm,	active	2024-03-20 12:39:19-05	2024-03-20 12:39:19-05	\N
7	2	1	2024-03-31 05:00:00-05	2024-03-31 05:00:00-05	prueba xxxxz s	active	2024-03-20 12:44:00-05	2024-08-28 03:09:51-05	\N
8	1	1	2024-03-22 05:00:00-05	2024-03-22 17:30:00-05	prueba	active	2024-03-20 13:34:15-05	2024-03-20 13:34:15-05	\N
9	6	2	2024-07-08 13:00:00-05	2024-07-08 05:00:00-05	Dra. XX	active	2024-07-05 17:19:00-05	2024-07-05 17:19:00-05	\N
10	6	1	2024-07-03 12:00:00-05	2024-07-03 12:00:00-05	DIA DE LA FAMILIA 	active	2024-07-05 17:51:13-05	2024-08-28 03:03:55-05	\N
11	1	1	2024-08-06 05:00:00-05	2024-08-06 05:00:00-05	 test ina aa ss	active	2024-08-05 16:26:36-05	2024-08-05 16:38:14-05	\N
12	2	2	2024-08-28 05:00:00-05	2024-08-28 05:00:00-05	Cesar ds	active	2024-08-28 03:08:55-05	2024-08-28 03:09:19-05	\N
13	2	1	2024-06-04 05:00:00-05	2024-06-04 05:00:00-05	cesa vaca	active	2024-08-28 03:10:14-05	2024-08-28 03:10:14-05	\N
14	2	1	2024-10-15 11:00:00-05	2024-10-18 11:00:00-05	Test Inasistencia	active	2024-10-03 17:21:39-05	2024-10-03 17:21:39-05	\N
15	2	2	2024-10-04 12:30:00-05	2024-10-04 23:00:00-05	Plan de trabajo	active	2024-10-03 17:22:28-05	2024-10-03 17:22:28-05	\N
16	17	2	2026-03-13 05:00:00-05	2026-03-19 05:00:00-05	Plan Semana	active	2026-03-12 05:50:10-05	2026-03-12 05:50:10-05	\N
17	17	2	2026-02-22 05:00:00-05	2026-02-27 05:00:00-05	Plan de Trabajo Febrero	active	2026-03-12 12:52:15-05	2026-03-12 12:52:15-05	\N
18	18	2	2026-02-08 05:00:00-05	2026-02-13 05:00:00-05	Plan febrero	active	2026-03-17 00:14:54-05	2026-03-17 00:14:54-05	\N
19	2	2	2026-06-01 03:00:00-05	2026-06-05 13:00:00-05	Plan de trabajo semanal - Bogotá	active	2026-06-06 19:06:29.451025-05	2026-06-06 19:06:29.451025-05	\N
20	8	2	2026-06-02 03:00:00-05	2026-06-06 13:00:00-05	Plan de trabajo semanal - Medellín	active	2026-06-06 19:06:29.54833-05	2026-06-06 19:06:29.54833-05	\N
21	6	1	2026-06-03 03:00:00-05	2026-06-03 13:00:00-05	Incapacidad médica por control odontológico	active	2026-06-06 19:06:29.553546-05	2026-06-06 19:06:29.553546-05	\N
22	18	2	2026-06-01 03:00:00-05	2026-06-04 13:00:00-05	Visitas de campo y fidelización - Cali	active	2026-06-06 19:06:29.557523-05	2026-06-06 19:06:29.557523-05	\N
23	19	2	2026-06-02 03:00:00-05	2026-06-05 13:00:00-05	Ruta comercial zona norte	active	2026-06-06 19:06:29.560076-05	2026-06-06 19:06:29.560076-05	\N
\.


--
-- Name: calendar_labels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.calendar_labels_id_seq', 3, true);


--
-- Name: configs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.configs_id_seq', 4, true);


--
-- Name: justifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.justifications_id_seq', 29, true);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notifications_id_seq', 13, true);


--
-- Name: portfolios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.portfolios_id_seq', 9, true);


--
-- Name: region_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.region_id_seq', 14, true);


--
-- Name: session_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.session_logs_id_seq', 15, true);


--
-- Name: third_classification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.third_classification_id_seq', 4, true);


--
-- Name: third_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.third_id_seq', 179, true);


--
-- Name: third_specialty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.third_specialty_id_seq', 10, true);


--
-- Name: third_subspecialty_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.third_subspecialty_id_seq', 13, true);


--
-- Name: third_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.third_type_id_seq', 3, true);


--
-- Name: thirds_portfolios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.thirds_portfolios_id_seq', 167, true);


--
-- Name: type_events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.type_events_id_seq', 2, true);


--
-- Name: user_classification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_classification_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 22, true);


--
-- Name: visits_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.visits_id_seq', 133, true);


--
-- Name: workplans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.workplans_id_seq', 23, true);


--
-- Name: calendar_events calendar_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.calendar_events
    ADD CONSTRAINT calendar_events_pkey PRIMARY KEY (id);


--
-- Name: calendar_labels calendar_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.calendar_labels
    ADD CONSTRAINT calendar_labels_pkey PRIMARY KEY (id);


--
-- Name: configs configs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.configs
    ADD CONSTRAINT configs_pkey PRIMARY KEY (id);


--
-- Name: justifications justifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.justifications
    ADD CONSTRAINT justifications_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: portfolios portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT portfolios_pkey PRIMARY KEY (id);


--
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id);


--
-- Name: session_logs session_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_logs
    ADD CONSTRAINT session_logs_pkey PRIMARY KEY (id);


--
-- Name: third_classification third_classification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_classification
    ADD CONSTRAINT third_classification_pkey PRIMARY KEY (id);


--
-- Name: third third_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third
    ADD CONSTRAINT third_pkey PRIMARY KEY (id);


--
-- Name: third_specialty third_specialty_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_specialty
    ADD CONSTRAINT third_specialty_pkey PRIMARY KEY (id);


--
-- Name: third_subspecialty third_subspecialty_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_subspecialty
    ADD CONSTRAINT third_subspecialty_pkey PRIMARY KEY (id);


--
-- Name: third_type third_type_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_type
    ADD CONSTRAINT third_type_pkey PRIMARY KEY (id);


--
-- Name: thirds_portfolios thirds_portfolios_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.thirds_portfolios
    ADD CONSTRAINT thirds_portfolios_pkey PRIMARY KEY (id);


--
-- Name: type_events type_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.type_events
    ADD CONSTRAINT type_events_pkey PRIMARY KEY (id);


--
-- Name: user_classification user_classification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_classification
    ADD CONSTRAINT user_classification_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: visits visits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT visits_pkey PRIMARY KEY (id);


--
-- Name: workplans workplans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workplans
    ADD CONSTRAINT workplans_pkey PRIMARY KEY (id);


--
-- Name: justifications justifications_thirdId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.justifications
    ADD CONSTRAINT "justifications_thirdId_fkey" FOREIGN KEY ("thirdId") REFERENCES public.third(id) ON UPDATE CASCADE;


--
-- Name: justifications justifications_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.justifications
    ADD CONSTRAINT "justifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: portfolios portfolios_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.portfolios
    ADD CONSTRAINT "portfolios_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: session_logs session_logs_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session_logs
    ADD CONSTRAINT "session_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: third third_classificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third
    ADD CONSTRAINT "third_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES public.third_classification(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: third third_regionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third
    ADD CONSTRAINT "third_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES public.region(id) ON UPDATE CASCADE;


--
-- Name: third third_specialtyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third
    ADD CONSTRAINT "third_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES public.third_specialty(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: third third_subSpecialtyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third
    ADD CONSTRAINT "third_subSpecialtyId_fkey" FOREIGN KEY ("subSpecialtyId") REFERENCES public.third_subspecialty(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: third_subspecialty third_subspecialty_specialtyId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third_subspecialty
    ADD CONSTRAINT "third_subspecialty_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES public.third_specialty(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: third third_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.third
    ADD CONSTRAINT "third_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.third_type(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: thirds_portfolios thirds_portfolios_portfolioId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.thirds_portfolios
    ADD CONSTRAINT "thirds_portfolios_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES public.portfolios(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: thirds_portfolios thirds_portfolios_thirdId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.thirds_portfolios
    ADD CONSTRAINT "thirds_portfolios_thirdId_fkey" FOREIGN KEY ("thirdId") REFERENCES public.third(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_classificationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_classificationId_fkey" FOREIGN KEY ("classificationId") REFERENCES public.user_classification(id) ON UPDATE CASCADE;


--
-- Name: users users_coordinatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: users users_regionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES public.region(id) ON UPDATE CASCADE;


--
-- Name: visits visits_thirdId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_thirdId_fkey" FOREIGN KEY ("thirdId") REFERENCES public.third(id) ON UPDATE CASCADE;


--
-- Name: visits visits_typeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES public.third_type(id) ON UPDATE CASCADE;


--
-- Name: visits visits_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.visits
    ADD CONSTRAINT "visits_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: workplans workplans_typeEventId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workplans
    ADD CONSTRAINT "workplans_typeEventId_fkey" FOREIGN KEY ("typeEventId") REFERENCES public.type_events(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: workplans workplans_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.workplans
    ADD CONSTRAINT "workplans_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

