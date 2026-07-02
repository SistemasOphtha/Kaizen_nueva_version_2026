--
-- PostgreSQL database dump
--

\restrict s2cYALDdOaBPotsyUo1UQHWZV9jgsDXPEeraVpLdygRJgEhOvAnultr1Ro2JyNh

-- Dumped from database version 15.18
-- Dumped by pg_dump version 15.18

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

ALTER TABLE ONLY public.workplans DROP CONSTRAINT "workplans_userId_fkey";
ALTER TABLE ONLY public.workplans DROP CONSTRAINT "workplans_typeEventId_fkey";
ALTER TABLE ONLY public.visits DROP CONSTRAINT "visits_userId_fkey";
ALTER TABLE ONLY public.visits DROP CONSTRAINT "visits_typeId_fkey";
ALTER TABLE ONLY public.visits DROP CONSTRAINT "visits_thirdId_fkey";
ALTER TABLE ONLY public.users DROP CONSTRAINT "users_regionId_fkey";
ALTER TABLE ONLY public.users DROP CONSTRAINT "users_coordinatorId_fkey";
ALTER TABLE ONLY public.users DROP CONSTRAINT "users_classificationId_fkey";
ALTER TABLE ONLY public.thirds_portfolios DROP CONSTRAINT "thirds_portfolios_thirdId_fkey";
ALTER TABLE ONLY public.thirds_portfolios DROP CONSTRAINT "thirds_portfolios_portfolioId_fkey";
ALTER TABLE ONLY public.third DROP CONSTRAINT "third_typeId_fkey";
ALTER TABLE ONLY public.third_subspecialty DROP CONSTRAINT "third_subspecialty_specialtyId_fkey";
ALTER TABLE ONLY public.third DROP CONSTRAINT "third_subSpecialtyId_fkey";
ALTER TABLE ONLY public.third DROP CONSTRAINT "third_specialtyId_fkey";
ALTER TABLE ONLY public.third DROP CONSTRAINT "third_regionId_fkey";
ALTER TABLE ONLY public.third DROP CONSTRAINT "third_classificationId_fkey";
ALTER TABLE ONLY public.session_logs DROP CONSTRAINT "session_logs_userId_fkey";
ALTER TABLE ONLY public.portfolios DROP CONSTRAINT "portfolios_userId_fkey";
ALTER TABLE ONLY public.justifications DROP CONSTRAINT "justifications_userId_fkey";
ALTER TABLE ONLY public.justifications DROP CONSTRAINT "justifications_thirdId_fkey";
ALTER TABLE ONLY public.workplans DROP CONSTRAINT workplans_pkey;
ALTER TABLE ONLY public.visits DROP CONSTRAINT visits_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
ALTER TABLE ONLY public.user_classification DROP CONSTRAINT user_classification_pkey;
ALTER TABLE ONLY public.type_events DROP CONSTRAINT type_events_pkey;
ALTER TABLE ONLY public.thirds_portfolios DROP CONSTRAINT thirds_portfolios_pkey;
ALTER TABLE ONLY public.third_type DROP CONSTRAINT third_type_pkey;
ALTER TABLE ONLY public.third_subspecialty DROP CONSTRAINT third_subspecialty_pkey;
ALTER TABLE ONLY public.third_specialty DROP CONSTRAINT third_specialty_pkey;
ALTER TABLE ONLY public.third DROP CONSTRAINT third_pkey;
ALTER TABLE ONLY public.third_classification DROP CONSTRAINT third_classification_pkey;
ALTER TABLE ONLY public.session_logs DROP CONSTRAINT session_logs_pkey;
ALTER TABLE ONLY public.region DROP CONSTRAINT region_pkey;
ALTER TABLE ONLY public.portfolios DROP CONSTRAINT portfolios_pkey;
ALTER TABLE ONLY public.notifications DROP CONSTRAINT notifications_pkey;
ALTER TABLE ONLY public.justifications DROP CONSTRAINT justifications_pkey;
ALTER TABLE ONLY public.configs DROP CONSTRAINT configs_pkey;
ALTER TABLE ONLY public.calendar_labels DROP CONSTRAINT calendar_labels_pkey;
ALTER TABLE ONLY public.calendar_events DROP CONSTRAINT calendar_events_pkey;
ALTER TABLE public.workplans ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.visits ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.user_classification ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.type_events ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.thirds_portfolios ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.third_type ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.third_subspecialty ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.third_specialty ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.third_classification ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.third ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.session_logs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.region ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.portfolios ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.notifications ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.justifications ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.configs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.calendar_labels ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.workplans_id_seq;
DROP TABLE public.workplans;
DROP SEQUENCE public.visits_id_seq;
DROP TABLE public.visits;
DROP SEQUENCE public.users_id_seq;
DROP TABLE public.users;
DROP SEQUENCE public.user_classification_id_seq;
DROP TABLE public.user_classification;
DROP SEQUENCE public.type_events_id_seq;
DROP TABLE public.type_events;
DROP SEQUENCE public.thirds_portfolios_id_seq;
DROP TABLE public.thirds_portfolios;
DROP SEQUENCE public.third_type_id_seq;
DROP TABLE public.third_type;
DROP SEQUENCE public.third_subspecialty_id_seq;
DROP TABLE public.third_subspecialty;
DROP SEQUENCE public.third_specialty_id_seq;
DROP TABLE public.third_specialty;
DROP SEQUENCE public.third_id_seq;
DROP SEQUENCE public.third_classification_id_seq;
DROP TABLE public.third_classification;
DROP TABLE public.third;
DROP SEQUENCE public.session_logs_id_seq;
DROP TABLE public.session_logs;
DROP SEQUENCE public.region_id_seq;
DROP TABLE public.region;
DROP SEQUENCE public.portfolios_id_seq;
DROP TABLE public.portfolios;
DROP SEQUENCE public.notifications_id_seq;
DROP TABLE public.notifications;
DROP SEQUENCE public.justifications_id_seq;
DROP TABLE public.justifications;
DROP SEQUENCE public.configs_id_seq;
DROP TABLE public.configs;
DROP SEQUENCE public.calendar_labels_id_seq;
DROP TABLE public.calendar_labels;
DROP TABLE public.calendar_events;
DROP TYPE public.enum_workplans_status;
DROP TYPE public.enum_visits_status;
DROP TYPE public.enum_users_status;
DROP TYPE public.enum_user_classification_status;
DROP TYPE public.enum_type_events_status;
DROP TYPE public.enum_thirds_portfolios_status;
DROP TYPE public.enum_third_type_status;
DROP TYPE public.enum_third_subspecialty_status;
DROP TYPE public.enum_third_status;
DROP TYPE public.enum_third_specialty_status;
DROP TYPE public.enum_third_classification_status;
DROP TYPE public.enum_region_status;
DROP TYPE public.enum_portfolios_status;
DROP TYPE public.enum_notifications_variant;
DROP TYPE public.enum_justifications_status;
DROP TYPE public.enum_configs_type;
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS '';


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
    longitude double precision,
    department character varying(100)
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
    "twoFactorSecret" character varying(255),
    "twoFactorMethod" character varying(50) DEFAULT 'totp'::character varying,
    "email2FactorCode" character varying(10),
    "email2FactorExpires" timestamp with time zone
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
0b3ce9c5-df63-4ee7-a099-1d2d7ed6bdcf	visita cliente	t	2024-10-04T05:00:00.000Z	2024-10-04T05:00:00.000Z	{"desc": "visita cliente", "label": 1, "component": {"id": 16, "type": "visits", "route": "/apps/visits/16"}}	2024-10-03 22:19:00+00	2024-10-03 22:19:00+00	\N
17c9e149-db6f-4f4f-b994-8af24f703fa1	Visita # 2	t	2024-04-24T15:00:00.000Z	2024-04-24T15:00:00.000Z	{"desc": "Visita # 2", "label": 1, "component": {"id": 5, "type": "visits", "route": "/apps/visits/5"}}	2024-05-20 20:08:53+00	2024-05-20 20:08:53+00	\N
20730bf8-b710-4201-a4db-a25813c98097	Prueba	t	2026-03-13T05:00:00.000Z	2026-03-13T05:00:00.000Z	{"desc": "Prueba", "label": 1, "component": {"id": 18, "type": "visits", "route": "/apps/visits/18"}}	2026-03-12 18:55:32+00	2026-03-12 18:55:32+00	\N
25930d06-f336-4a9c-bec3-2d1633bede76	Prueba	t	2024-05-20T15:00:00.000Z	2024-05-20T15:00:00.000Z	{"desc": "Prueba", "label": 1, "component": {"id": 7, "type": "visits", "route": "/apps/visits/7"}}	2024-05-20 20:10:24+00	2024-05-20 20:10:24+00	\N
3332e54d-ac32-4181-b70f-6dd01b928db2	Plan de trabajo	t	2024-10-04T12:30:00.000Z	2024-10-04T23:00:00.000Z	{"desc": "Plan de trabajo", "label": 2, "component": {"id": 15, "type": "workplans", "route": "/dashboards/workplans/15"}}	2024-10-03 22:22:28+00	2024-10-03 22:22:28+00	\N
35d355e2-f501-4795-b4e8-88e6bce5e8ef	Plan febrero	f	2026-02-08T05:00:00.000Z	2026-02-13T05:00:00.000Z	{"desc": "Plan febrero", "label": 2, "component": {"id": 18, "type": "workplans", "route": "/dashboards/workplans/18"}}	2026-03-17 05:14:54+00	2026-03-17 05:14:54+00	\N
3e778194-46bb-4783-8b48-c6ad6c7580c4	prueba	t	2024-07-11T05:00:00.000Z	2024-07-11T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 13, "type": "visits", "route": "/apps/visits/13"}}	2024-07-11 17:46:10+00	2024-07-11 17:46:10+00	\N
4471f799-e039-4ec0-a360-c2a21baf24d1	Cesar 	t	2024-08-28T05:00:00.000Z	2024-08-28T05:00:00.000Z	{"desc": "Cesar ", "label": 2, "component": {"id": 12, "type": "workplans", "route": "/dashboards/workplans/12"}}	2024-08-28 08:08:55+00	2024-08-28 08:08:55+00	\N
454188c2-1af8-4caf-a6a8-cf0e876d28b3	cesa vaca	t	2024-06-04T05:00:00.000Z	2024-06-04T05:00:00.000Z	{"desc": "cesa vaca", "label": 2, "component": {"id": 13, "type": "workplans", "route": "/dashboards/workplans/13"}}	2024-08-28 08:10:14+00	2024-08-28 08:10:14+00	\N
48a17949-0739-4811-90f7-a433fb9dea11	sdxfcvbnm,	t	2024-03-31T05:00:00.000Z	2024-03-31T17:00:00.000Z	{"desc": "sdxfcvbnm,", "label": 2, "component": {"id": 6, "type": "workplans", "route": "/apps/workplans/6"}}	2024-03-20 17:39:19+00	2024-03-20 17:39:19+00	\N
4918db3c-735a-4511-8f2d-3c6812efea92	>Test prueba	t	2024-04-18T13:30:00.000Z	2024-04-18T13:30:00.000Z	{"desc": ">Test prueba", "label": 1, "component": {"id": 3, "type": "visits", "route": "/apps/visits/3"}}	2024-04-19 03:55:25+00	2024-04-19 03:55:25+00	\N
56b77cb3-a0e2-42b2-9235-1b1671462d41	Dra. XX	t	2024-07-08T13:00:00.000Z	2024-07-08T05:00:00.000Z	{"desc": "Dra. XX", "label": 2, "component": {"id": 9, "type": "workplans", "route": "/apps/workplans/9"}}	2024-07-05 22:19:00+00	2024-07-05 22:19:00+00	\N
6bb64855-852d-44fe-830e-da82807285a3	prueba	t	2024-07-05T05:00:00.000Z	2024-07-05T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 11, "type": "visits", "route": "/apps/visits/11"}}	2024-07-05 22:09:21+00	2024-07-05 22:09:21+00	\N
6f44e676-ba5a-4894-ac0e-7fdaa1526547	Visita almacen	t	2024-03-20T11:30:00.000Z	2024-03-20T11:30:00.000Z	{"desc": "Visita almacen", "label": 1, "component": {"id": 1, "type": "visits", "route": "/apps/visits/1"}}	2024-03-20 19:35:53+00	2024-03-20 19:35:53+00	\N
72a3cad2-9367-4961-b3ad-c4a3525d5aa9	Antioquia	t	2024-04-02T05:00:00.000Z	2024-04-02T17:00:00.000Z	{"desc": "Antioquia", "label": 2, "component": {"id": 3, "type": "workplans", "route": "/apps/workplans/3"}}	2024-03-20 17:23:16+00	2024-03-20 17:23:16+00	\N
7ab22085-a8de-47b3-8814-387b3c894547	prueba 11/06/2024	t	2024-06-07T05:00:00.000Z	2024-06-07T05:00:00.000Z	{"desc": "prueba 11/06/2024", "label": 1, "component": {"id": 8, "type": "visits", "route": "/apps/visits/8"}}	2024-06-11 19:28:25+00	2024-06-11 19:28:25+00	\N
803840dd-bb8a-4dde-9077-c8540bbb3c8d	prueba	t	2024-03-22T05:00:00.000Z	2024-03-22T17:30:00.000Z	{"desc": "prueba", "label": 2, "component": {"id": 8, "type": "workplans", "route": "/apps/workplans/8"}}	2024-03-20 18:34:15+00	2024-03-20 18:34:15+00	\N
8a1c8e09-384b-4fee-bba0-8686807a58d8	Prueba	t	2024-05-09T15:00:00.000Z	2024-05-09T15:00:00.000Z	{"desc": "Prueba", "label": 1, "component": {"id": 6, "type": "visits", "route": "/apps/visits/6"}}	2024-05-20 20:09:48+00	2024-05-20 20:09:48+00	\N
8ebb6307-607f-40f3-86ae-a2d90117cc99	vacaciones 	t	2024-03-20T11:00:00.000Z	2024-03-31T11:00:00.000Z	{"desc": "vacaciones ", "label": 2, "component": {"id": 1, "type": "workplans", "route": "/apps/workplans/1"}}	2024-03-20 17:07:51+00	2024-03-20 17:07:51+00	\N
92773738-b201-45f3-b5df-9e76978fa3f9	Visita prueba	t	2024-04-18T12:15:00.000Z	2024-04-18T12:15:00.000Z	{"desc": "Visita prueba", "label": 1, "component": {"id": 2, "type": "visits", "route": "/apps/visits/2"}}	2024-04-19 03:48:27+00	2024-04-19 03:48:27+00	\N
9b67a6d2-a4e4-4831-88e2-6f202a2ca217	DIA DE LA FAMILIA	t	2024-07-03T12:00:00.000Z	2024-07-03T12:00:00.000Z	{"desc": "DIA DE LA FAMILIA", "label": 2, "component": {"id": 10, "type": "workplans", "route": "/apps/workplans/10"}}	2024-07-05 22:51:13+00	2024-07-05 22:51:13+00	\N
9beb05ad-9e29-4a72-831d-260b454ce770	Prueba 5 de julio	t	2024-07-04T05:00:00.000Z	2024-07-04T05:00:00.000Z	{"desc": "Prueba 5 de julio", "label": 1, "component": {"id": 9, "type": "visits", "route": "/apps/visits/9"}}	2024-07-05 21:52:05+00	2024-07-05 21:52:05+00	\N
acc8017d-e6aa-404f-818c-f1bbf418ace7	prueba	t	2024-03-31T05:00:00.000Z	2024-03-31T17:00:00.000Z	{"desc": "prueba", "label": 2, "component": {"id": 7, "type": "workplans", "route": "/apps/workplans/7"}}	2024-03-20 17:44:00+00	2024-03-20 17:44:00+00	\N
aec4dc73-04fa-4c9f-98b5-bbfe75a4a212	esgdh 	t	2024-03-03T05:00:00.000Z	2024-03-03T05:00:00.000Z	{"desc": "esgdh ", "label": 2, "component": {"id": 4, "type": "workplans", "route": "/apps/workplans/4"}}	2024-03-20 17:24:36+00	2024-03-20 17:24:36+00	\N
b9c4b960-8a10-42b7-ada5-14f00ecec3e2	dbdb	t	2024-07-11T05:00:00.000Z	2024-07-11T05:00:00.000Z	{"desc": "dbdb", "label": 1, "component": {"id": 15, "type": "visits", "route": "/apps/visits/15"}}	2024-07-11 17:47:40+00	2024-07-11 17:47:40+00	\N
ba94caa5-9322-45cd-96ef-3d8aacf6d51c	Visita méduica	t	2024-04-11T15:00:00.000Z	2024-04-11T15:00:00.000Z	{"desc": "Visita méduica", "label": 1, "component": {"id": 4, "type": "visits", "route": "/apps/visits/4"}}	2024-05-20 20:06:15+00	2024-05-20 20:06:15+00	\N
c9254262-c52c-423a-86b1-acb4b7a94924	venta	t	2024-10-15T05:00:00.000Z	2024-10-15T05:00:00.000Z	{"desc": "venta", "label": 1, "component": {"id": 17, "type": "visits", "route": "/apps/visits/17"}}	2024-10-15 19:31:21+00	2024-10-15 19:31:21+00	\N
d52286f7-d17c-4071-ba0e-eb4eb52bf169	prueba	t	2024-07-05T05:00:00.000Z	2024-07-05T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 12, "type": "visits", "route": "/apps/visits/12"}}	2024-07-05 22:14:43+00	2024-07-05 22:14:43+00	\N
e71eec8d-14b2-4efa-b96e-0f266764c6a7	Plan de Trabajo Febrero	f	2026-02-22T05:00:00.000Z	2026-02-27T05:00:00.000Z	{"desc": "Plan de Trabajo Febrero", "label": 2, "component": {"id": 17, "type": "workplans", "route": "/dashboards/workplans/17"}}	2026-03-12 17:52:15+00	2026-03-12 17:52:15+00	\N
e8778332-8cb4-4269-9d1d-7e2d8c39368c	rxctvbnm	t	2024-03-20T05:00:00.000Z	2024-03-20T17:00:00.000Z	{"desc": "rxctvbnm", "label": 2, "component": {"id": 5, "type": "workplans", "route": "/apps/workplans/5"}}	2024-03-20 17:35:48+00	2024-03-20 17:35:48+00	\N
e9bf0af8-aec0-4913-8e8a-9e206fe7b9ec	Plan Semana	f	2026-03-13T05:00:00.000Z	2026-03-19T05:00:00.000Z	{"desc": "Plan Semana", "label": 2, "component": {"id": 16, "type": "workplans", "route": "/dashboards/workplans/16"}}	2026-03-12 10:50:10+00	2026-03-12 10:50:10+00	\N
eb125707-7f41-4aeb-9cca-c4259e071e40	trabajo completo \n	t	2024-03-20T05:00:00.000Z	2024-03-20T17:00:00.000Z	{"desc": "trabajo completo \\n", "label": 2, "component": {"id": 2, "type": "workplans", "route": "/apps/workplans/2"}}	2024-03-20 17:08:39+00	2024-03-20 17:08:39+00	\N
eb6e6300-5962-4566-b31c-ca756f618ea1	Test Inasistencia	t	2024-10-15T11:00:00.000Z	2024-10-18T11:00:00.000Z	{"desc": "Test Inasistencia", "label": 2, "component": {"id": 14, "type": "workplans", "route": "/dashboards/workplans/14"}}	2024-10-03 22:21:39+00	2024-10-03 22:21:39+00	\N
edc06617-563d-4712-ae2b-63174638a4fa	prueba	t	2024-07-11T05:00:00.000Z	2024-07-11T05:00:00.000Z	{"desc": "prueba", "label": 1, "component": {"id": 14, "type": "visits", "route": "/apps/visits/14"}}	2024-07-11 17:46:49+00	2024-07-11 17:46:49+00	\N
f4fe6444-2f10-4b4d-8a0d-eb5fad813eab	prueba 5 de julio	t	2024-07-05T05:00:00.000Z	2024-07-05T05:00:00.000Z	{"desc": "prueba 5 de julio", "label": 1, "component": {"id": 10, "type": "visits", "route": "/apps/visits/10"}}	2024-07-05 21:52:35+00	2024-07-05 21:52:35+00	\N
f8c6818f-844b-408e-8b05-f83785c3c459	test ina	t	2024-08-06T05:00:00.000Z	2024-08-06T05:00:00.000Z	{"desc": "test ina", "label": 2, "component": {"id": 11, "type": "workplans", "route": "/dashboards/workplans/11"}}	2024-08-05 21:26:36+00	2024-08-05 21:26:36+00	\N
cal-event-12-visit-1	Visita CCMOD	t	2026-06-18T14:30:00.000Z	2026-06-18T14:30:00.000Z	{"desc":"Presentación de la nueva línea de lentes de contacto premium","label":1,"component":{"id":201,"type":"visits","route":"/apps/visits/201"}}	2026-06-22 22:10:16.31563+00	2026-06-22 22:10:16.31563+00	\N
cal-event-12-visit-2	Visita NATALIA CAMILA	t	2026-06-20T10:00:00.000Z	2026-06-20T10:00:00.000Z	{"desc":"Seguimiento de orden de compra pendiente","label":1,"component":{"id":202,"type":"visits","route":"/apps/visits/202"}}	2026-06-22 22:10:16.316923+00	2026-06-22 22:10:16.316923+00	\N
cal-event-12-wp-2	Acompañamiento Representantes	f	2026-06-22T08:00:00.000Z	2026-06-26T18:00:00.000Z	{"desc":"Revisión y acompañamiento del plan de visitas de representantes","label":2,"component":{"id":202,"type":"workplans","route":"/dashboards/workplans/202"}}	2026-06-22 22:10:16.318162+00	2026-06-22 22:10:16.318162+00	\N
807a06b6-b6bb-4c09-b966-c8c7467b5813	probando	f	2026-06-24T08:00:00.000Z	2026-06-24T11:00:00.000Z	{"desc":"probando","label":2,"component":{"id":203,"type":"workplans","route":"/dashboards/workplans/203"}}	2026-06-24 20:19:28.257+00	2026-06-24 20:19:28.257+00	\N
\.


--
-- Data for Name: calendar_labels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.calendar_labels (id, title, color, type, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Visita	#13B013	system	2024-02-29 01:17:28+00	2024-02-29 01:17:28+00	\N
2	Plan de trabajo	#D6C520	system	2024-02-29 01:17:47+00	2024-02-29 01:17:47+00	\N
3	Cumpleaños	#2E7AE1	system	2024-03-11 03:24:36+00	2024-03-11 03:24:36+00	\N
\.


--
-- Data for Name: configs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.configs (id, name, label, value, type, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	daily_hours	Horas díarias	9.2	system	2024-09-30 20:23:54+00	2024-09-30 20:23:54+00	\N
2	holidays	Días Festivos	["25-12-2025"]	custom	2025-12-17 01:39:26+00	2025-12-17 01:39:26+00	\N
4	last_closed_month	Último mes cerrado e impactos justificados	2026-05	custom	2026-06-06 00:39:15.205+00	2026-06-06 00:39:15.205+00	\N
3	last_birthday_check	Última verificación de cumpleaños	2026-06-25	custom	2026-06-06 00:39:14.832+00	2026-06-25 05:21:59.077+00	\N
\.


--
-- Data for Name: justifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.justifications (id, "thirdId", "userId", date, "dateToJustify", description, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	3	4	2024-04-20 20:21:17+00	2024-04-20 20:21:17+00	prueba	active	2024-05-20 20:21:17+00	2024-05-20 20:21:17+00	\N
2	4	4	2024-04-20 20:21:53+00	2024-04-20 20:21:53+00	prueba	active	2024-05-20 20:21:53+00	2024-05-20 20:21:53+00	\N
3	4	1	2024-05-29 08:22:47+00	2024-05-29 08:22:47+00	Prueba FarmaTS	active	2024-06-29 08:22:47+00	2024-06-29 08:22:47+00	\N
4	2	2	2024-05-29 08:26:06+00	2024-05-29 08:26:06+00	Prueba 	active	2024-06-29 08:26:06+00	2024-06-29 08:26:06+00	\N
5	3	2	2024-05-29 08:27:04+00	2024-05-29 08:27:04+00	prueba	active	2024-06-29 08:27:04+00	2024-06-29 08:27:04+00	\N
6	6	6	2024-06-05 22:21:11+00	2024-06-05 22:21:11+00	fdf prueba 23/07	active	2024-07-05 22:21:11+00	2024-07-23 21:37:25+00	\N
7	2	2	2024-07-05 21:39:58+00	2024-07-05 21:39:58+00	hola prueba sas s	active	2024-08-05 21:39:58+00	2024-08-28 08:07:58+00	\N
8	3	2	2024-07-05 21:42:10+00	2024-07-05 21:42:10+00	prueba 2 xxx s	active	2024-08-05 21:42:10+00	2024-08-28 08:07:15+00	\N
9	3	2	2024-09-03 22:17:23+00	2024-09-03 22:17:23+00	Test Justificacion	active	2024-10-03 22:17:23+00	2024-10-03 22:17:23+00	\N
10	2	2	2024-09-03 22:18:11+00	2024-09-03 22:18:11+00	test - justificaciones	active	2024-10-03 22:18:11+00	2024-10-03 22:18:11+00	\N
11	4	2	2024-09-15 19:30:35+00	2024-09-15 19:30:35+00	no se pudo realizar por vacaciones 	active	2024-10-15 19:30:35+00	2024-10-15 19:30:35+00	\N
12	158	18	2026-02-12 11:20:51+00	2026-02-12 11:20:51+00	Justi	active	2026-03-12 11:20:51+00	2026-03-12 11:20:51+00	\N
13	5	3	2026-06-06 00:39:14.982+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:14.983+00	2026-06-06 00:39:14.983+00	\N
14	5	3	2026-06-06 00:39:14.989+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:14.989+00	2026-06-06 00:39:14.989+00	\N
15	5	3	2026-06-06 00:39:14.992+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:14.992+00	2026-06-06 00:39:14.992+00	\N
16	167	3	2026-06-06 00:39:15.003+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.003+00	2026-06-06 00:39:15.003+00	\N
17	167	3	2026-06-06 00:39:15.007+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.007+00	2026-06-06 00:39:15.007+00	\N
18	167	3	2026-06-06 00:39:15.01+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.011+00	2026-06-06 00:39:15.011+00	\N
19	7	6	2026-06-06 00:39:15.031+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.031+00	2026-06-06 00:39:15.031+00	\N
20	7	6	2026-06-06 00:39:15.034+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.034+00	2026-06-06 00:39:15.034+00	\N
21	166	6	2026-06-06 00:39:15.05+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.05+00	2026-06-06 00:39:15.05+00	\N
22	166	6	2026-06-06 00:39:15.058+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.059+00	2026-06-06 00:39:15.059+00	\N
23	158	15	2026-06-06 00:39:15.103+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.103+00	2026-06-06 00:39:15.103+00	\N
24	158	15	2026-06-06 00:39:15.106+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.106+00	2026-06-06 00:39:15.106+00	\N
25	158	18	2026-06-06 00:39:15.132+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.132+00	2026-06-06 00:39:15.132+00	\N
26	158	18	2026-06-06 00:39:15.149+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.149+00	2026-06-06 00:39:15.149+00	\N
27	179	18	2026-06-06 00:39:15.161+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.161+00	2026-06-06 00:39:15.161+00	\N
28	179	18	2026-06-06 00:39:15.165+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.165+00	2026-06-06 00:39:15.165+00	\N
29	179	18	2026-06-06 00:39:15.168+00	2026-06-01 04:59:59.999+00	Pendiente de justificación	active	2026-06-06 00:39:15.168+00	2026-06-06 00:39:15.168+00	\N
201	12	12	2026-06-05 19:39:15+00	2026-05-31 23:59:59+00	No se pudo concretar la visita debido a que el optómetra estuvo incapacitado.	active	2026-06-22 22:10:16.309275+00	2026-06-22 22:10:16.309275+00	\N
202	13	12	2026-06-05 19:39:15+00	2026-05-31 23:59:59+00	El cliente se encontraba en un congreso médico internacional de oftalmología.	active	2026-06-22 22:10:16.311257+00	2026-06-22 22:10:16.311257+00	\N
203	74	12	2026-05-22 22:45:15.542+00	2026-05-22 22:45:15.542+00	Prueba de justificaci	active	2026-06-22 22:45:15.546+00	2026-06-22 22:45:15.546+00	\N
204	116	12	2026-05-22 23:07:59.221+00	2026-05-22 23:07:59.221+00	estamos probando las justificaciones agregadas con voz desde el sistema	active	2026-06-22 23:07:59.227+00	2026-06-22 23:08:28.706+00	\N
205	87	12	2026-05-22 23:08:53.815+00	2026-05-22 23:08:53.815+00	 justificaciones Gregorio Francisco	active	2026-06-22 23:08:53.818+00	2026-06-22 23:08:53.818+00	\N
206	68	12	2026-05-22 23:09:09.85+00	2026-05-22 23:09:09.85+00	estamos agregando la justificaciones de Santiago para ver cómo funciona con vos	active	2026-06-22 23:09:09.854+00	2026-06-22 23:09:09.854+00	\N
207	51	12	2026-05-24 19:50:33.117+00	2026-05-24 19:50:33.117+00	acaba de salir de la cita con el doctor Acacia él está interesado en toda la medicina que le estamos ofre quedó en recetar nuestras medicamentos a todos sus pacientes	active	2026-06-24 19:50:33.122+00	2026-06-24 19:52:14.044+00	\N
208	52	12	2026-05-24 19:52:44.729+00	2026-05-24 19:52:44.729+00	estamos haciendo pruebas del sistema con vos estamos de nuevo hoy cuadrando la información vamos a ver si nos guarda bien esta vez	active	2026-06-24 19:52:44.735+00	2026-06-24 19:53:05.716+00	\N
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, icon, title, description, "time", read, variant, "useRouter", link, image, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	material-solid:person_add_alt	¡Nuevo panel creado!	Se ha creado un nuevo panel	2024-10-15 19:27:04+00	t	success	t	/records/thirds/168	\N	2024-10-15 19:27:04+00	2026-03-17 19:33:02+00	\N
2		¡Nuevo panel por aprobar!	El representante Cesar  Mendoza tiene un panel por aprobar.	2024-10-15 19:27:04+00	t	warning	t	/records/users/2	\N	2024-10-15 19:27:04+00	2026-03-17 19:33:02+00	\N
3	material-solid:person_add_alt	¡Nuevo panel asignado!	Se ha asignado un nuevo panel al representante	2025-10-08 01:38:20+00	t	success	t	/records/thirds/170	\N	2025-10-08 01:38:20+00	2026-03-17 19:33:02+00	\N
4		¡Nuevo panel por aprobar!	El representante Sistemas Ophtha tiene un panel por aprobar.	2025-10-08 01:38:20+00	t	warning	t	/records/users/7	\N	2025-10-08 01:38:20+00	2026-03-17 19:33:02+00	\N
5	material-solid:person_add_alt	¡Nuevo panel asignado!	Se ha asignado un nuevo panel al representante	2025-10-09 00:03:19+00	t	success	t	/records/thirds/171	\N	2025-10-09 00:03:19+00	2026-03-17 19:33:02+00	\N
6		¡Nuevo panel por aprobar!	El representante Sistemas Ophtha tiene un panel por aprobar.	2025-10-09 00:03:19+00	t	warning	t	/records/users/7	\N	2025-10-09 00:03:19+00	2026-03-17 19:33:02+00	\N
11	material-solid:person_add_alt	¡Nuevo panel creado!	Se ha creado un nuevo panel	2026-03-12 18:36:45+00	t	success	t	/records/thirds/178	\N	2026-03-12 18:36:45+00	2026-03-17 19:33:02+00	\N
12	material-solid:person_add_alt	¡Nuevo panel creado!	Se ha creado un nuevo panel	2026-03-12 18:49:22+00	t	success	t	/records/thirds/179	\N	2026-03-12 18:49:22+00	2026-03-17 19:33:02+00	\N
13		¡Nuevo panel por aprobar!	El representante Juan Mesa tiene un panel por aprobar.	2026-03-17 05:39:19+00	t	warning	t	/records/users/19	\N	2026-03-17 05:39:19+00	2026-03-17 19:33:02+00	\N
\.


--
-- Data for Name: portfolios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.portfolios (id, name, "userId", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Portafolio #2	2	active	2024-03-20 17:42:29+00	2024-03-20 17:42:29+00	\N
2	Portafolio #3	3	active	2024-03-20 19:35:18+00	2024-03-20 19:35:18+00	\N
3	Portafolio #6	6	active	2024-05-09 01:33:08+00	2024-05-09 01:33:08+00	\N
4	Portafolio #12	12	active	2024-10-15 19:29:16+00	2024-10-15 19:29:16+00	\N
5	Portafolio #7	7	active	2025-10-08 01:38:20+00	2025-10-08 01:38:20+00	\N
6	Portafolio de Usuario #18	18	active	2026-03-12 10:25:30+00	2026-03-12 10:25:30+00	\N
7	Portafolio de Usuario #15	15	active	2026-03-12 10:25:58+00	2026-03-12 10:25:58+00	\N
8	Portafolio de Usuario #19	19	active	2026-03-17 05:39:19+00	2026-03-17 05:39:19+00	\N
9	Portafolio de Hector Alvarez	22	active	2026-06-06 20:02:41.675708+00	2026-06-06 20:02:41.675708+00	\N
\.


--
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.region (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Antioquia	active	2024-02-08 09:26:28+00	2024-02-08 09:26:28+00	\N
2	Bogotá	active	2024-02-11 09:34:40+00	2024-02-11 09:34:40+00	\N
3	Boyacá	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
4	Cartagena	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
5	Choco	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
6	Costa	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
7	Eje Cafetero	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
8	Llanos Orientales	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
9	Monteria	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
10	Pasto	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
11	Santander	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
12	Sur	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
13	Tolima	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
14	Valle	active	2024-03-12 08:45:04+00	2024-03-12 08:45:04+00	\N
\.


--
-- Data for Name: session_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session_logs (id, "userId", "ipAddress", "userAgent", "loginTime", "logoutTime", duration, details, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 00:09:14.233+00	\N	\N	{"action": "token_login"}	2026-06-06 00:09:14.234+00	2026-06-06 00:09:14.234+00	\N
2	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 00:31:06.204+00	\N	\N	{"action": "login"}	2026-06-06 00:31:06.206+00	2026-06-06 00:31:06.206+00	\N
3	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 01:05:39.357+00	2026-06-06 01:07:57.536+00	138	{"action": "logout"}	2026-06-06 01:05:39.359+00	2026-06-06 01:07:57.537+00	\N
4	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 01:11:41.775+00	2026-06-06 01:14:22.004+00	160	{"action": "logout"}	2026-06-06 01:11:41.776+00	2026-06-06 01:14:22.004+00	\N
5	1	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 01:16:17.976+00	2026-06-06 01:32:15.364+00	957	{"action": "logout"}	2026-06-06 01:16:17.976+00	2026-06-06 01:32:15.364+00	\N
6	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 17:46:29.99+00	\N	\N	{"action": "login"}	2026-06-06 17:46:29.991+00	2026-06-06 17:46:29.991+00	\N
7	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 18:10:06.352+00	\N	\N	{"action": "login"}	2026-06-06 18:10:06.352+00	2026-06-06 18:10:06.352+00	\N
8	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 18:49:39.158+00	\N	\N	{"action": "login"}	2026-06-06 18:49:39.158+00	2026-06-06 18:49:39.158+00	\N
9	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36	2026-06-06 23:57:42.714+00	\N	\N	{"action": "login"}	2026-06-06 23:57:42.715+00	2026-06-06 23:57:42.715+00	\N
10	22	::1	node	2026-06-07 00:26:57.966+00	\N	\N	{"action": "login"}	2026-06-07 00:26:57.967+00	2026-06-07 00:26:57.967+00	\N
11	22	::1	node	2026-06-07 00:27:13.335+00	\N	\N	{"action": "login"}	2026-06-07 00:27:13.335+00	2026-06-07 00:27:13.335+00	\N
12	22	::1	node	2026-06-07 00:27:41.478+00	\N	\N	{"action": "login"}	2026-06-07 00:27:41.478+00	2026-06-07 00:27:41.478+00	\N
13	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-18 18:24:44.646+00	2026-06-18 19:24:34.99+00	3590	{"action": "logout"}	2026-06-18 18:24:44.647+00	2026-06-18 19:24:34.991+00	\N
14	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-18 19:24:50.053+00	2026-06-18 19:28:58.127+00	248	{"action": "logout"}	2026-06-18 19:24:50.053+00	2026-06-18 19:28:58.128+00	\N
16	22	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-22 22:01:56.964+00	2026-06-22 22:13:26.599+00	690	{"action": "logout"}	2026-06-22 22:01:56.965+00	2026-06-22 22:13:26.601+00	\N
17	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-22 22:13:55.141+00	\N	\N	{"action": "login"}	2026-06-22 22:13:55.141+00	2026-06-22 22:13:55.141+00	\N
15	22	::1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-18 19:29:11.098+00	2026-06-22 22:23:50.073+00	356079	{"action": "logout"}	2026-06-18 19:29:11.098+00	2026-06-22 22:23:50.075+00	\N
18	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-22 22:24:07.337+00	2026-06-23 02:47:25.358+00	15798	{"action": "logout"}	2026-06-22 22:24:07.337+00	2026-06-23 02:47:25.359+00	\N
19	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-23 02:47:37.163+00	\N	\N	{"action": "login"}	2026-06-23 02:47:37.164+00	2026-06-23 02:47:37.164+00	\N
20	22	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-23 03:08:09.994+00	\N	\N	{"action": "login"}	2026-06-23 03:08:09.996+00	2026-06-23 03:08:09.996+00	\N
21	22	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-23 03:10:29.881+00	\N	\N	{"action": "login"}	2026-06-23 03:10:29.881+00	2026-06-23 03:10:29.881+00	\N
22	22	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-23 03:13:17.712+00	\N	\N	{"action": "login"}	2026-06-23 03:13:17.712+00	2026-06-23 03:13:17.712+00	\N
23	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-23 19:33:32.141+00	2026-06-23 19:34:30.143+00	58	{"action": "logout"}	2026-06-23 19:33:32.143+00	2026-06-23 19:34:30.144+00	\N
24	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-23 19:34:44.453+00	\N	\N	{"action": "login"}	2026-06-23 19:34:44.453+00	2026-06-23 19:34:44.453+00	\N
25	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-24 15:43:54.671+00	2026-06-24 18:54:22.891+00	11428	{"action": "logout"}	2026-06-24 15:43:54.672+00	2026-06-24 18:54:22.892+00	\N
26	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-24 18:54:28.703+00	2026-06-24 19:32:21.535+00	2273	{"action": "logout"}	2026-06-24 18:54:28.704+00	2026-06-24 19:32:21.536+00	\N
27	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-24 19:41:33.477+00	2026-06-24 19:44:50.406+00	197	{"action": "logout"}	2026-06-24 19:41:33.478+00	2026-06-24 19:44:50.406+00	\N
28	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-24 19:45:55.877+00	2026-06-24 21:05:28.409+00	4773	{"action": "logout"}	2026-06-24 19:45:55.878+00	2026-06-24 21:05:28.41+00	\N
29	22	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-24 21:05:40.347+00	2026-06-24 21:08:44.026+00	184	{"action": "logout"}	2026-06-24 21:05:40.347+00	2026-06-24 21:08:44.026+00	\N
30	22	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-24 21:09:13.181+00	2026-06-24 21:14:02.221+00	289	{"action": "logout"}	2026-06-24 21:09:13.182+00	2026-06-24 21:14:02.222+00	\N
31	12	::ffff:127.0.0.1	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36	2026-06-24 21:15:10.038+00	\N	\N	{"action": "login"}	2026-06-24 21:15:10.038+00	2026-06-24 21:15:10.038+00	\N
\.


--
-- Data for Name: third; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third (id, "typeIdentification", identification, name, "additionalName", address, phone, mobile, email, city, birthday, gender, impact, supplied, "typeId", "classificationId", "specialtyId", "subSpecialtyId", "regionId", status, "createdAt", "updatedAt", "deletedAt", "habeasDataConsent", "habeasDataFileUrl", "habeasDataSignature", latitude, longitude, department) FROM stdin;
4	NIT	46563234	FarmaTS		Cra 1 B N 81 20	+573154979800		farmats@gmail.vom	Tunja	2001-03-21 10:00:00+00	\N	4		3	\N	10	\N	3	active	2024-02-20 19:21:14+00	2024-03-20 19:21:14+00	2026-02-17 21:32:24+00	f	\N	\N	5.556325606965296	-73.36320433830723	\N
5	NIT	23235986	CCMOD	Andres S.	Cra 1 B N 81 20	+573154979800		mmod@gmail.vom	Cartagena	2000-03-15 10:00:00+00	\N	3	Copservir (Rebaja)	2	\N	6	\N	4	active	2024-03-20 19:35:18+00	2024-03-20 19:35:18+00	\N	f	\N	\N	10.384134460758585	-75.48636573687851	\N
7	CC	1007442075	NATALIA CAMILA	GARCIA RUEDA	OPTISALUD TUNJA	3103115751	3103115751	nczunilagarciarueda@gmail.com	Barranquilla	1980-01-18 05:00:00+00	F	2		1	3	2	\N	6	active	2024-05-20 20:14:15+00	2024-05-23 01:15:29+00	\N	f	\N	\N	10.979234709096557	-74.78377516478402	\N
8	CC	1234565789	Prueba20	MEJIA	CALLE 2	3202032323	3202032323	sistemas@laboratorioophtha.com	Pereira	1998-06-28 10:00:00+00	M	1		1	1	1	\N	7	active	2024-05-21 23:47:02+00	2024-05-21 23:47:02+00	2026-02-17 21:32:24+00	f	\N	\N	4.79922782584808	-75.71843332225515	\N
9	CC	12345657899	Prueba20	MEJIA	CALLE 2	3202032323	3202032323	sistemas@laboratorioophtha.com	Villavicencio	1998-06-28 10:00:00+00	\N	1	Colsubsidio	2	\N	10	\N	8	active	2024-05-21 23:51:50+00	2024-05-21 23:51:50+00	2026-02-17 21:32:24+00	f	\N	\N	4.164020535425217	-73.60544678800291	\N
11	CC	1018409150	MARIO ISAAC 	LEON HIGUERA	TUNJA	3015843123	3015843123	marioleonhiguera@hotmail.com	Pasto	1982-02-08 10:00:00+00	M	2		1	3	1	\N	10	active	2024-05-23 01:41:07+00	2024-05-23 01:41:07+00	\N	f	\N	\N	1.2365812566981755	-77.27404883751687	\N
12	CC	1020843118	JUAN JOSE 	DUARTE CONTRERAS	OPTISALUD SOGAMOSO	3212702400	3212702400	juanjoseducon@gmail.com	Bucaramanga	1988-08-14 10:00:00+00	M	2		1	3	2	\N	11	active	2024-05-23 01:42:35+00	2024-05-23 01:42:35+00	\N	f	\N	\N	7.136305646681744	-73.13080644272723	\N
13	CC	1026254318	DARLYN ADRIANA	RAMOS MARÍN	CRA 10  18-57	3102122386	3102122386	darlyn_86@hotmail.es	Neiva	1977-06-04 10:00:00+00	F	2		1	3	2	\N	12	active	2024-05-23 01:44:14+00	2024-05-23 01:44:14+00	\N	f	\N	\N	2.9097377050251634	-75.29653672917466	\N
14	CC	1052392431	YURI 	CIFUENTES SUAREZ	DIAGONAL 13 #13-54	3133318728	3133318728	yucifuentes@hotmail.com	Ibague	1990-11-27 10:00:00+00	F	2		1	2	2	\N	13	active	2024-05-29 17:41:21+00	2024-05-29 17:41:21+00	\N	f	\N	\N	4.44915650035543	-75.21243257018767	\N
15	CC	1020839411	PAULA XIMENA	VELA PEÑA	DIAGONAL 13 # 13-54	3188022221	3188022221	ximenavelap@gmail.com	Cali	1990-02-27 10:00:00+00	F	2		1	3	2	\N	14	active	2024-05-29 17:50:49+00	2024-05-29 17:50:49+00	\N	f	\N	\N	3.4662130538179636	-76.51131858436135	\N
16	CC	1052499212	DIANA SOFIA 	MORA SOLEDAD	CARRERA 3 ESTE # 47 A -38	3205201473	3205201473	dianasofia.mora77@gmail.com	Medellin	1990-12-12 10:00:00+00	F	2		1	1	2	\N	1	active	2024-05-29 19:06:00+00	2024-05-29 19:06:00+00	\N	f	\N	\N	6.259925940179826	-75.57429619902058	\N
17	CC	10020839411	CRISTIAN ALEJANDRO 	CRUZ	OPTISALUD UNICENTRO	3103226750	3103226750	cacs_721@hotmail.com	Bogota	1990-10-09 10:00:00+00	M	1		1	3	2	\N	2	active	2024-05-29 19:09:32+00	2024-05-29 19:09:32+00	\N	f	\N	\N	4.731458976071994	-74.05323578158786	\N
19	CC	1010171354	OSCAR ALEXANDER	ZAMBRANO BADILLO	CALLE 11 # 17-38	3108600837	3108600837	alekz.694@gmail.com	Cartagena	1990-03-15 10:00:00+00	M	2		1	3	2	\N	4	active	2024-05-29 19:18:44+00	2024-05-29 19:18:44+00	\N	f	\N	\N	10.392194678153103	-75.48866493751025	\N
20	CC	1010166345	ROBERT 	ARIAS PEDRAZA	CARRERA 9A # 1A-17 DUITAMA	2104110	3006551448	robertp_30@hotmail.com	Quibdo	1990-09-08 10:00:00+00	F	1		1	3	2	\N	5	active	2024-05-29 19:19:45+00	2024-05-29 19:19:45+00	\N	f	\N	\N	5.70414770020773	-76.64636238508565	\N
21	CC	1013585205	TATIANA	MORENO MORALES	OPTISALUD TUNJA	3202683190	3202683190	moreta_2002@hotmail.com	Barranquilla	1990-10-02 10:00:00+00	F	2		1	3	1	\N	6	active	2024-05-29 19:21:48+00	2024-05-29 19:21:48+00	\N	f	\N	\N	10.955869430803904	-74.80487383656717	\N
25	CC	1013627329	JOHANA 	RINCON RODRIGUEZ	CARRERA 9 # 24-21	3126168357	3126168357	juaniod9108@gmail.com	Pereira	1990-08-29 10:00:00+00	F	1		1	2	2	\N	7	active	2024-05-29 19:26:37+00	2024-05-29 19:26:37+00	\N	f	\N	\N	4.7911080118464495	-75.71728022975888	\N
26	CC	1018430354	ANA MARIA 	GUTIERREZ GONZALEZ	CALLE 10 # 11-15	3174350796	3174350796	colopticas@gmail.com	Villavicencio	1990-09-29 10:00:00+00	F	2		1	1	2	\N	8	active	2024-05-29 19:30:55+00	2024-05-29 19:30:55+00	\N	f	\N	\N	4.125314277033752	-73.65109017624575	\N
27	CC	1018439339	ADRIANA PAOLA 	FUENTES TORRES	OPTISALUD DUITAMA	3118514112	3118514112	paolis.15@hotmail.com	Monteria	1990-10-09 10:00:00+00	F	2		1	2	2	\N	9	active	2024-05-29 19:32:53+00	2024-05-29 19:32:53+00	\N	f	\N	\N	8.865415322639917	-75.90098283835802	\N
28	CC	1018441175	ANDREA CAROLINA 	MONTAÑA CARDOZA	OPTICA VELOZA	3118203395	3118203395	carolinamc6@gmail.com	Pasto	1990-01-06 10:00:00+00	F	2		1	3	2	\N	10	active	2024-05-29 19:38:32+00	2024-05-29 19:38:32+00	\N	f	\N	\N	1.219577997917538	-77.30428713845109	\N
29	CC	1019012097	DEISY CONSTANZA	 BAYONA MALDONADO	CARRERA 18 # 1-66	3118120209	3118120209	deisita86@hotmail.com	Bucaramanga	1990-11-17 10:00:00+00	F	1		1	2	2	\N	11	active	2024-05-29 19:44:46+00	2024-05-29 19:44:46+00	\N	f	\N	\N	7.106476023187131	-73.14438948445766	\N
31	CC	1020818272	ANGELA	 ZAMBRANO BUITRAGO	CALLE 17 # 11-53	3115410539	3115410539	angela.101996@hotmail.com	Ibague	1990-08-10 10:00:00+00	F	2		1	2	2	\N	13	active	2024-05-29 19:49:30+00	2024-05-29 19:49:30+00	\N	f	\N	\N	4.438269205075062	-75.21837089706965	\N
32	CC	1022323766	CAROLINA	CASTRO JIMENEZ	CARRERA 9 # 18-60  LC 104	7432615	3142325909	centropticosantalucia@gmail.com	Cali	1990-04-13 10:00:00+00	F	2		1	2	2	\N	14	active	2024-05-29 19:51:11+00	2024-05-29 19:51:11+00	\N	f	\N	\N	3.439022254789184	-76.53830852191469	\N
33	CC	10243788	MIGUEL	CHAPARRO BOHORQUEZ	CALLE 11 # 12-40	7702541	3157814914	miguelacheb@yahoo.es	Medellin	1970-09-07 10:00:00+00	M	2		1	2	1	\N	1	active	2024-05-29 19:53:01+00	2024-05-29 19:53:01+00	\N	f	\N	\N	6.2547164816124035	-75.57277744493672	\N
35	CC	1030564487	PAOLA ANDREA	SUAREZ	CENTRO COMERCIAL UNICENTRO	7454303	3118514112	andresuarezfo@hotmail.com	Bogota	1990-11-21 10:00:00+00	F	2		1	3	2	\N	2	active	2024-05-29 19:54:25+00	2024-05-29 19:54:25+00	\N	f	\N	\N	4.719777479506481	-74.07461981343695	\N
36	CC	1030669130	LUZ ANGELA	VELANDIA RODRIGUEZ	OPTISALUD TUNJA	3223438010	3223438010	dangela2408@gmail.com	Tunja	1990-08-17 10:00:00+00	F	2		1	3	2	\N	3	active	2024-05-29 19:55:55+00	2024-05-29 19:55:55+00	\N	f	\N	\N	5.524130853811507	-73.32928020436152	\N
37	CC	1032370391	YURY ESPERANZA	RISCANEVO MARTINEZ	CARRERA 9 # 20-45 LOCAL 108	3176358976	3176358976	yuriscasnevo@hotmail.com	Cartagena	1990-06-14 10:00:00+00	F	2		1	2	2	\N	4	active	2024-05-29 19:58:22+00	2024-05-29 19:58:22+00	\N	f	\N	\N	10.4155292011754	-75.48752960046606	\N
38	CC	1032370818	JULIO CESAR	BAEZ CORDOBA	CALLE 47 # 7-66 TUNJA	3114559248	3114559248	julio_jc@hotmail.com	Quibdo	1990-09-24 10:00:00+00	M	1		1	3	2	\N	5	active	2024-05-29 19:59:47+00	2024-05-29 19:59:47+00	\N	f	\N	\N	5.675846364991536	-76.66395886785594	\N
40	CC	1032417179	LINA JULIETH 	BARROTE SILVA	CENTRO	3229436737	3229436737	linabarrote@hotmail.com	Pereira	1990-07-17 10:00:00+00	F	2		1	2	2	\N	7	active	2024-05-29 20:03:39+00	2024-05-29 20:03:39+00	\N	f	\N	\N	4.80281953359618	-75.71030028121747	\N
41	CC	1032456937	DANIELA GRAJALES	HERRERA	OPTICA AE DUITAMA	3044612109	3044612109	nanigrajales@gmail.com	Villavicencio	1990-05-28 10:00:00+00	F	2		1	2	2	\N	8	active	2024-05-29 20:08:57+00	2024-05-29 20:08:57+00	\N	f	\N	\N	4.166625340174743	-73.62502108932112	\N
42	CC	1049603576	SARA ALEJANDRA 	CARDENAS SOSA	CENTRO NORTE PISO 1	3206752896	3206752896	opticasantacruztja@gmail.com	Monteria	1990-06-17 10:00:00+00	F	2		1	2	2	\N	9	active	2024-05-29 20:10:48+00	2024-05-29 20:10:48+00	\N	f	\N	\N	8.859006192609213	-75.87892861849755	\N
43	CC	1049609752	IVAN DARIO	ROMERO	CARRERA 12 # 12-84	3144535370	3144535370		Pasto	1990-11-27 10:00:00+00	M	1		1	2	2	\N	10	active	2024-05-29 20:14:22+00	2024-05-29 20:14:22+00	\N	f	\N	\N	1.2182321392593243	-77.27851061002504	\N
46	CC	1051477584	ANGIE DAYANA	PIRAGUA ALARCON	CALLE 11 # 10-83  LOCAL 108	3235744997	3235744997	adpa@gmail.com	Ibague	1990-11-26 10:00:00+00	F	2		1	2	2	\N	13	active	2024-05-29 20:19:42+00	2024-05-29 20:19:42+00	\N	f	\N	\N	4.420144796462883	-75.2337787277572	\N
47	CC	1052313181	CAMILO 	MARTINEZ PEREZ	CALLE 17 # 13-29	7610906	3044581102	opticasae@gmail.com	Cali	1990-09-09 10:00:00+00	M	2		1	2	2	\N	14	active	2024-05-29 20:21:18+00	2024-05-29 20:21:18+00	\N	f	\N	\N	3.453918971529373	-76.5512041821405	\N
51	CC	1052387990	LUISA FERNANDA	NIÑO	CARDENAS VISION	2606684	3202259366	fernandino186@gmail.com	Bogota	1990-06-18 10:00:00+00	F	2		1	3	2	\N	2	active	2024-05-29 20:26:09+00	2024-05-29 20:26:09+00	\N	f	\N	\N	4.712423880634232	-74.08730287222522	\N
52	CC	1052389508	MAURICIO 	ALVARADO BRAVO	CARRERA 10 # 14-138	3205442209	3205442209	mauricioaalvarado@hotmail.com	Tunja	1990-12-19 10:00:00+00	M	2		1	2	2	\N	3	active	2024-05-29 20:28:31+00	2024-05-29 20:28:31+00	\N	f	\N	\N	5.537323704950914	-73.34299530385191	\N
53	CC	1052391346	EMERSON 	MONTOYA	OPTISALUD TUNJA	3118636311	3118636311	emerson_montoya90@hotmail.com	Cartagena	1990-07-12 10:00:00+00	M	2		1	3	1	\N	4	active	2024-05-29 20:30:22+00	2024-05-29 20:30:22+00	\N	f	\N	\N	10.368994131954329	-75.48011311676458	\N
54	CC	1052395225	LEANDRO	VEGA MORALES	CALLE 15 # 12-38	3012783811	3012783811	ocad27@hotmail.com	Quibdo	1990-01-03 10:00:00+00	M	2		1	1	2	\N	5	active	2024-05-29 20:31:34+00	2024-05-29 20:31:34+00	\N	f	\N	\N	5.702379627430313	-76.67964841694422	\N
55	CC	1052395229	DIANA PAOLA 	BONILLA BUITRAGO	CARRERA 16 # 14-13 DUITAMA	3123259163	3123259163	dipabonilla@gmail.com	Barranquilla	1990-12-27 10:00:00+00	F	2		1	2	2	\N	6	active	2024-05-29 20:32:44+00	2024-05-29 20:32:44+00	\N	f	\N	\N	10.95540454202322	-74.77077218294137	\N
57	CC	1052401942	ANGELA 	MALDONADO QUIROGA	OPTISALUD DUITAMA	3102931116	3102931116	taanquima@hotmail.com	Villavicencio	1990-06-16 10:00:00+00	F	2		1	3	2	\N	8	active	2024-05-29 20:36:06+00	2024-05-29 20:36:06+00	\N	f	\N	\N	4.118980398757081	-73.64214026897918	\N
59	CC	1053327231	CLAUDIA ESPERANZA	LOPEZ CASAS	CARRERA 10 # 26-49	3113247884	3113247884	claulopezcasas@hotmail.com	Pasto	1990-04-14 10:00:00+00	F	2		1	2	2	\N	10	active	2024-05-29 20:38:53+00	2024-05-29 20:38:53+00	\N	f	\N	\N	1.2339239496619556	-77.28220316727455	\N
60	CC	1054093442	SANDY LICET	PULIDO	CARRERA 11 # 14-51 C.C BARCELONA	3005196396	3005196396	sanylicet@gmail.com	Bucaramanga	1990-10-06 10:00:00+00	F	2		1	2	2	\N	11	active	2024-05-29 20:41:26+00	2024-05-29 20:41:26+00	\N	f	\N	\N	7.127498209246053	-73.1303951742934	\N
61	CC	1056931255	DIANA KATHERINE	BECERRA MARTINEZ	CARRERA 10 # 22-61	6087440839	3137055160	becerramartinezdianakatherine@gmail.com	Neiva	1990-08-28 10:00:00+00	F	2		1	3	2	\N	12	active	2024-05-29 20:42:47+00	2024-05-29 20:42:47+00	\N	f	\N	\N	2.9314214665024125	-75.29440386305326	\N
62	CC	1057464747	LAURA LILIANA 	MORENO CARO	OPTICA MARIN	3183639034	3183639034	lauramoreno@hotmail.com	Ibague	1990-03-14 10:00:00+00	F	2		1	3	2	\N	13	active	2024-05-29 20:44:52+00	2024-05-29 20:44:52+00	\N	f	\N	\N	4.460853087601766	-75.22897101154533	\N
63	CC	1057574099	AURA MILENA	LARA RODRIGUEZ	CALLE 7 # 10A-19 APTO 203	3042028038	3209877867	milelara02@hotmail.com	Cali	1990-02-01 10:00:00+00	F	2		1	2	2	\N	14	active	2024-05-29 20:49:43+00	2024-05-29 20:49:43+00	\N	f	\N	\N	3.4469976275759113	-76.54509296032255	\N
65	CC	1032429372	SAID ANDREA	VARGAS PEREZ	CARRERA 10 #  24-45	3114560174	3114560174	said_andrea8@hotmail.com	Bogota	1990-05-08 10:00:00+00	F	1		1	3	2	\N	2	active	2024-05-29 20:57:16+00	2024-05-29 20:57:16+00	\N	f	\N	\N	4.723158674525574	-74.07399057759284	\N
66	CC	1057579500	YEFERSON ALEXANDER	RODRIGUEZ BOTIA	CALLE 10 # 11-15	3133769505	3133769505	yefersonr40@gmail.com	Tunja	1990-12-12 10:00:00+00	M	2		1	1	2	\N	3	active	2024-05-29 20:58:33+00	2024-05-29 20:58:33+00	\N	f	\N	\N	5.537845935091017	-73.3375295869258	\N
67	CC	1057591308	SILKE ALEJANDRA	SANDOVAL ALVARADO	TUNJA UNICENTRO	3004873042	3004873042	silkealeja@hotmail.com	Cartagena	1990-12-13 10:00:00+00	F	1		1	3	2	\N	4	active	2024-05-29 21:01:28+00	2024-05-29 21:01:28+00	\N	f	\N	\N	10.368633432126067	-75.47758645531358	\N
68	CC	1057592638	SANTIAGO	NIÑO LOAIZA	OPTISALUD TUNJA	3173316255	3173316255	sninolo7@hotmail.com	Quibdo	1990-07-01 10:00:00+00	M	1		1	3	2	\N	5	active	2024-05-29 21:03:18+00	2024-05-29 21:03:18+00	\N	f	\N	\N	5.6826546668962195	-76.67286528558037	\N
69	CC	1057601777	MARIA PAULA	LOPEZ ACEVEDO	CALLE 3 # 4-03 SOGAMOSO	3194770934	3194770934	mariapaulalopezacevedo@gmail.com	Barranquilla	1990-08-23 10:00:00+00	F	1		1	2	2	\N	6	active	2024-05-29 21:04:43+00	2024-05-29 21:04:43+00	\N	f	\N	\N	10.985732243779568	-74.76517183398539	\N
70	CC	1057605968	LAURA MELISA	LARA MENDIVELSO	CARRERA 12 # 11-30	3223834364	3223834364	laura_melisa_lara@hotmail.com	Pereira	1990-04-19 10:00:00+00	F	2		1	2	2	\N	7	active	2024-05-29 21:06:22+00	2024-05-29 21:06:22+00	\N	f	\N	\N	4.801869130371657	-75.67229024258916	\N
71	CC	1069265276	DAVID CAMILO	TORRES GOMEZ	CARRERA 5 # 7-46	3102227481	3102227481	towersoptics@gmail.com	Villavicencio	1990-01-01 10:00:00+00	M	1		1	2	2	\N	8	active	2024-05-29 21:08:31+00	2024-05-29 21:08:31+00	\N	f	\N	\N	4.157764095917322	-73.60635520009723	\N
72	CC	1073157221	ANGELICA MARIA	TAMARA JARAMILLO	CALLE 15 # 12-38	3103124393	3103124393	oculare.es@gmail.com	Monteria	1990-07-03 10:00:00+00	F	2		1	1	2	\N	9	active	2024-05-29 21:09:42+00	2024-05-29 21:09:42+00	\N	f	\N	\N	8.87177486356882	-75.89299333329474	\N
74	CC	1098620878	JULIETH KATHERINE 	PEÑA OLARTE	C.C VIVA	3103720177	3103720177	juliethcomlan@gmail.com	Bucaramanga	1990-09-02 10:00:00+00	F	1		1	3	2	\N	11	active	2024-05-29 21:12:57+00	2024-05-29 21:12:57+00	\N	f	\N	\N	7.108333792283263	-73.14338062189435	\N
75	CC	1098675484	VANIA MARCELA	PEREZ	OPTICLINICAS DR CETINA-UNICENTRO	3196142149	3196142149	vania.marcela.perez.s@gmail.com	Neiva	1990-02-02 10:00:00+00	F	1		1	3	2	\N	12	active	2024-05-29 21:14:18+00	2024-05-29 21:14:18+00	\N	f	\N	\N	2.905668361268485	-75.27442296871975	\N
76	CC	1098700689	MAYORLY 	QUINTERO GOMEZ	CARRERA 3 # 13A-44	3176944119	3176944119	redmundovision@gmail.com	Ibague	1990-12-03 10:00:00+00	F	1		1	1	2	\N	13	active	2024-05-29 21:15:23+00	2024-05-29 21:15:23+00	\N	f	\N	\N	4.4141950923377715	-75.21060049689785	\N
77	CC	123350732	ANGIE NICOL	PEÑUELA SUAREZ	CARRERA 12 # 20-35	3132139696	3132139696	asuarez0614@gmail.com	Cali	1990-06-14 10:00:00+00	F	1		1	3	2	\N	14	active	2024-05-29 21:19:08+00	2024-05-29 21:19:08+00	\N	f	\N	\N	3.4555932457828837	-76.55410962501915	\N
78	CC	13721993	RUBEN DARIO 	SARMIENTO REYES	CARRERA 14 # 10-26	7296476	3005861446	rsarmiento86@hotmail.com	Medellin	1970-09-03 10:00:00+00	M	1		1	3	2	\N	1	active	2024-05-29 21:21:09+00	2024-05-29 21:21:09+00	\N	f	\N	\N	6.232170506233115	-75.60321549848803	\N
79	CC	33377611	SUSANA	RODRIGUEZ BARRAGAN	OPTISALUD TUNJA	3204461130	3204461130	susyrodriguezba1984@gmail.com	Bogota	1970-10-11 10:00:00+00	F	2		1	3	1	\N	2	active	2024-05-29 21:22:44+00	2024-05-29 21:22:44+00	\N	f	\N	\N	4.7304281916679445	-74.06810680786401	\N
80	CC	14326617	JUAN CARLOS 	VELOZA	OPTICA VELOZA	3102040385	3102040385	jolucaveloza@gmail.com	Tunja	1970-07-23 10:00:00+00	M	1		1	3	2	\N	3	active	2024-05-29 21:23:54+00	2024-05-29 21:23:54+00	\N	f	\N	\N	5.541231117941918	-73.36522901000139	\N
81	CC	19266713	ORLANDO	CORTES AGUILAR	CARRERA 11 # 12-28	3176564150	3176564150	orlandocortes@hotmail.com	Cartagena	1970-02-27 10:00:00+00	M	2		1	2	2	\N	4	active	2024-05-29 21:28:57+00	2024-05-29 21:28:57+00	\N	f	\N	\N	10.415434153365416	-75.46628171497827	\N
83	CC	19341600	JUAN EUGENIO	BAQUERO GOMEZ	CALLE 19 # 8 - 22	7423426	3153966269	juebaquero@yahoo.com	Barranquilla	1970-12-31 10:00:00+00	M	2		1	3	1	\N	6	active	2024-05-29 21:32:48+00	2024-05-29 21:32:48+00	\N	f	\N	\N	10.973985861952935	-74.77752263588474	\N
86	CC	24049932	MARIA DEL PILAR	CALIXTO RUBIO	CALLE 15 # 16- 26 LA CALLEJA	3118814849	3118814849	pilicalixto@hotmail.com	Monteria	1970-02-15 10:00:00+00	F	1		1	2	2	\N	9	active	2024-05-29 21:36:07+00	2024-05-29 21:36:07+00	\N	f	\N	\N	8.88101122102087	-75.89659054352785	\N
87	CC	280840	GREGORIO FRANCISCO	MOJICA RODRIGUEZ	CARRERA 9 No 22 - 10 CONSULTORIO 203	7404641	3107821689	framoro@hotmail.com	Pasto	1970-10-01 10:00:00+00	M	2		1	3	1	\N	10	active	2024-05-29 21:37:26+00	2024-05-29 21:37:26+00	\N	f	\N	\N	1.2288930886010887	-77.27458247449653	\N
88	CC	31940819	BETHY	VELANDIA ROJAS	AVENIDA DE LAS AMERICAS 18-66	3208592428	3208592428	bethyvelandia@hotmail.com	Bucaramanga	1970-05-25 10:00:00+00	F	2		1	3	1	\N	11	active	2024-05-29 21:38:47+00	2024-05-29 21:38:47+00	\N	f	\N	\N	7.111535305978053	-73.12911122433265	\N
89	CC	3228030	ALVARO JOSE	JIMENEZ PEDREROS	CARRERA 1F # 39-76	7439640	3102650143	cxvisionsas@gmail.com	Neiva	1970-05-31 10:00:00+00	M	2		1	2	1	\N	12	active	2024-05-29 21:41:11+00	2024-05-29 21:41:11+00	\N	f	\N	\N	2.9183884274882432	-75.30617418227929	\N
91	CC	46453924	GIOVANA	PRADO VARGAS	CALLE 16 # 13-77	3105510143	3105510143	giovaprav@gmail.com	Cali	1970-09-18 10:00:00+00	F	1		1	3	2	\N	14	active	2024-05-29 21:48:47+00	2024-05-29 21:48:47+00	\N	f	\N	\N	3.4514632178248	-76.51685110888002	\N
92	CC	35425934	LISLEY	CORTES GARZON	CARRERA 4 # 7-79	3112396021	3112396021		Medellin	1970-12-12 10:00:00+00	F	1		1	3	2	\N	1	active	2024-05-29 21:50:04+00	2024-05-29 21:50:04+00	\N	f	\N	\N	6.22470147106205	-75.56422061540796	\N
94	CC	40017265	MARTHA CECILIA	NIÑO MEDINA	CALLE 20 # 12 - 11	7422212	3002193516	MARTHACNINO@HOTMAIL.COM	Tunja	1970-02-03 10:00:00+00	F	0		1	3	2	\N	3	active	2024-05-29 21:53:25+00	2024-05-29 21:53:25+00	\N	f	\N	\N	5.53506175271276	-73.34331823337574	\N
95	CC	40018171	BLANCA CECILIA	JIMENEZ FARFAN	CALLE 19 # 8-22	7423426	3124827519	blcejimenez@yahoo.com	Cartagena	1970-10-25 10:00:00+00	F	1		1	3	2	\N	4	active	2024-05-29 21:58:23+00	2024-05-29 21:58:23+00	\N	f	\N	\N	10.382861424865633	-75.46102118109866	\N
96	CC	40019548	DORA CECILIA	 ARIAS GALINDO	CARRERA 9 # 24- 50	3132864669	3132864669	doracecilia12@hotmail.com	Quibdo	1970-08-12 10:00:00+00	F	2		1	3	2	\N	5	active	2024-05-29 22:02:13+00	2024-05-29 22:02:13+00	\N	f	\N	\N	5.699364914773308	-76.67238204183562	\N
97	CC	40023229	TILIA 	ALVARADO TORRES	CALLE 17 # 10-60	7446309	3138860363	zonular90@hotmail.com	Barranquilla	1970-12-26 10:00:00+00	F	1		1	3	2	\N	6	active	2024-05-29 22:06:13+00	2024-05-29 22:06:13+00	\N	f	\N	\N	10.984961780082067	-74.78638766457519	\N
98	CC	40026464	MARTHA CECILIA	SALAS ROBERTO	CARRERA 11 # 25-39	3107831518	3107831518	marthasalasr@hotmail.com	Pereira	1970-01-13 10:00:00+00	F	1		1	3	2	\N	7	active	2024-05-29 22:07:42+00	2024-05-29 22:07:42+00	\N	f	\N	\N	4.8217267384051565	-75.69039784221793	\N
100	CC	40046612	LYDA GIOMARA	GRANADOS AVILA	CARRERA 10 # 17-47	7438759	3103404372	giomy1@hotmail.com	Monteria	1970-10-26 10:00:00+00	F	1		1	1	2	\N	9	active	2024-05-29 22:14:42+00	2024-05-29 22:14:42+00	\N	f	\N	\N	8.878095080504954	-75.89576207270711	\N
101	CC	41734437	MARIA TERESA 	RODRIGUEZ JUNCO	CARRERA 11 # 17-23	7425514	3153177562	mariat.rodriguez@gmail.com	Pasto	1970-03-08 10:00:00+00	F	1		1	3	2	\N	10	active	2024-05-29 22:15:58+00	2024-05-29 22:15:58+00	\N	f	\N	\N	1.216862875738152	-77.26411848754131	\N
103	CC	46364471	AURA PATRICIA	GARCIA	CARRERA 9A # 14-102	3212326156	3212326156	nuevavisiontuoptica@gmail.com	Neiva	1970-06-23 10:00:00+00	F	1		1	2	2	\N	12	active	2024-05-29 22:18:34+00	2024-05-29 22:18:34+00	\N	f	\N	\N	2.9399668205250022	-75.26113837098758	\N
104	CC	46379270	DIANA 	CEPEDA FONSECA	CARRERA 10 # 14-134	3208015911	3114493349	vision20/20@hotmail.com	Ibague	1970-02-03 10:00:00+00	F	1		1	2	2	\N	13	active	2024-05-29 22:19:59+00	2024-05-29 22:19:59+00	\N	f	\N	\N	4.430915762929994	-75.24441979604981	\N
105	CC	46386838	GENNY MILDRET	ORJUELA MENDIVELSO	CARRERA 10 # 12-63	7726553	3118534978	opticagmonsogamoso@hotmail.com	Cali	1970-06-18 10:00:00+00	F	1		1	2	2	\N	14	active	2024-05-29 22:21:05+00	2024-05-29 22:21:05+00	\N	f	\N	\N	3.455240631118615	-76.50902159792145	\N
106	CC	46453277	YULY ANDREA	SATIVA JAIMES	CARRERA 19 # 15-75	3103314614	3103314614	optimedicalcenter@outlook.com	Medellin	1970-07-15 10:00:00+00	F	1		1	2	2	\N	1	active	2024-05-29 22:22:10+00	2024-05-29 22:22:10+00	\N	f	\N	\N	6.250624872760602	-75.58471905690686	\N
107	CC	52249132	NATALIA	GARCIA RUIZ	CALLE 14  # 10-87	7700165	3045972221	tata06@hotmail.com	Bogota	1980-07-16 10:00:00+00	F	1		1	3	2	\N	2	active	2024-05-29 23:09:05+00	2024-05-29 23:09:05+00	\N	f	\N	\N	4.686760631611972	-74.09181960987227	\N
108	CC	46456338	MAGDA ALEXANDRA	CORREDOR CAMARGO	CALLE 17 # 14-36	7610846	3173814236	magdacorredor316@yahoo.es	Tunja	1980-05-09 10:00:00+00	F	1		1	2	2	\N	3	active	2024-05-29 23:10:56+00	2024-05-29 23:10:56+00	\N	f	\N	\N	5.561326482889296	-73.36462672474423	\N
109	CC	46662971	NUBIA ESMERALDA	DIAZ  ESCOBAR	CALLE 20 # 13A-47	3204954093	3204954093	nedevision@gmail.com	Cartagena	1980-04-25 10:00:00+00	F	1		1	2	2	\N	4	active	2024-05-29 23:14:49+00	2024-05-29 23:14:49+00	\N	f	\N	\N	10.415675103488933	-75.46945309909445	\N
111	CC	46670522	FABIOLA	PARRA RAMÍREZ	CALLE 15 # 12-75 LOCAL 211	7627919	3012364320	fabiparra2@hotmail.com	Barranquilla	1980-09-24 10:00:00+00	F	1		1	2	2	\N	6	active	2024-05-29 23:17:33+00	2024-05-29 23:17:33+00	\N	f	\N	\N	10.956208710290506	-74.80102738073887	\N
112	CC	46673590	XIOMARA MILENA 	PARRA CHAPARRO	CENTRO DE ESPECIALIDADES MEDICAS	3103291841	3103291841	xiomypacha@gmail.com	Pereira	1980-10-09 10:00:00+00	F	1		1	2	2	\N	7	active	2024-05-29 23:18:38+00	2024-05-29 23:18:38+00	\N	f	\N	\N	4.8051568256691155	-75.71044083892642	\N
113	CC	46673798	ELIZABETH 	RAMIREZ MERCHAN	CARRERA 14 # 13-72	7603565	3143956500	proversaludvisual316@yahoo.es	Villavicencio	1980-01-03 10:00:00+00	F	1		1	2	2	\N	8	active	2024-05-29 23:19:40+00	2024-05-29 23:19:40+00	\N	f	\N	\N	4.118533242478416	-73.65074294357497	\N
114	CC	46678321	ERIKA	FORERO	OPTISALUD TUNJA	3125709033	3125709033	erikfor22@hotmail.com	Monteria	1980-10-22 09:56:16+00	F	1		1	3	2	\N	9	active	2024-05-29 23:21:24+00	2024-05-29 23:21:24+00	\N	f	\N	\N	8.8656625036989	-75.87287305800399	\N
115	CC	46681814	CLAUDIA 	VELANDIA	CALLE 25 # 22-18 P3	31024900633	3102490063	claudia_velandia_9@hotmail.com	Pasto	1980-01-17 10:00:00+00	F	1		1	3	2	\N	10	active	2024-05-29 23:22:58+00	2024-05-29 23:22:58+00	\N	f	\N	\N	1.2230558723440668	-77.27265408334418	\N
116	CC	51790164	SANDRA JANETH	MONROY GONZALEZ	CALLE 19 # 8-77	7432166	3174422914	opticavertex@gmail.com	Bucaramanga	1980-09-02 10:00:00+00	F	1		1	3	2	\N	11	active	2024-05-29 23:24:25+00	2024-05-29 23:24:25+00	\N	f	\N	\N	7.133112583154467	-73.1076072101115	\N
117	CC	51880160	YASMINA	SALGADO PAEZ	CARRERA 15 # 14-58	7620201	3153005002	yasminasalgado@hotmail.com	Neiva	1980-10-21 10:00:00+00	F	2		1	3	1	11	12	active	2024-05-29 23:26:27+00	2024-05-29 23:26:27+00	\N	f	\N	\N	2.9124332018837276	-75.28754869086728	\N
119	CC	52057039	ANA LUCIA	LOPEZ VARGAS	CALLE 11 # 11-32	3138306953	3138306953	anlulv@hotmail.com	Cali	1980-12-03 10:00:00+00	F	1		1	2	2	\N	14	active	2024-05-29 23:30:46+00	2024-05-29 23:30:46+00	\N	f	\N	\N	3.4342630601179107	-76.54974493599786	\N
120	CC	52201793	NANCY DURLEY	BAUTISTA ROA	CARRERA 15 # 19-74	3136502938	3136502938	nbautistar@hotmail.com	Medellin	1980-01-01 10:00:00+00	F	1		1	2	2	\N	1	active	2024-05-29 23:31:45+00	2024-05-29 23:31:45+00	\N	f	\N	\N	6.25269424995003	-75.5689338815344	\N
121	CC	52218186	CLAUDIA 	VILLOTA SANCHEZ	CARRERA 1 #  46-49	3224185435	3224185435	optivil@yahoo.es	Bogota	1980-03-02 10:00:00+00	F	1		1	3	2	\N	2	active	2024-05-29 23:33:18+00	2024-05-29 23:33:18+00	\N	f	\N	\N	4.698804146582339	-74.07928302343788	\N
122	CC	71632253	HERNANDO 	PEREZ FLORES	CARRERA 12 # 18-21	7439064	3124799795	hepeflo@hotmail.com	Tunja	1980-09-22 10:00:00+00	M	2		1	2	2	\N	3	active	2024-05-29 23:35:01+00	2024-05-29 23:35:01+00	\N	f	\N	\N	5.532883382201224	-73.33502284267993	\N
124	CC	52263302	SANDRA 	GOMEZ MONTAÑA	MONTURAS Y LENTES	3177143237	3177143237	montulentespao@gmail.com	Quibdo	1980-02-14 10:00:00+00	F	2		1	3	2	\N	5	active	2024-05-29 23:37:45+00	2024-05-29 23:37:45+00	\N	f	\N	\N	5.7201419156706566	-76.67954676982194	\N
125	CC	52267292	JENNIFER	DIAZ VELASQUEZ	CARRERA  12 # 18-21	7439064	3134901637	jendiaz46@hotmail.com	Barranquilla	1980-09-05 10:00:00+00	F	2		1	2	2	\N	6	active	2024-05-29 23:39:36+00	2024-05-29 23:39:36+00	\N	f	\N	\N	10.979342497911725	-74.80267629561531	\N
126	CC	52364566	LUZ ANGELICA	VARGAS GOMEZ	CARRERA 11 # 17-66  LC153	3133243315	3133243315	luzkeka02160976@gmail.com	Pereira	1980-02-16 10:00:00+00	F	1		1	2	2	\N	7	active	2024-05-29 23:40:35+00	2024-05-29 23:40:35+00	\N	f	\N	\N	4.803314498909413	-75.67684440516602	\N
127	CC	52424136	GINA LILIANA	RODRIGUEZ SAENZ	CARRERA 9  # 24-50	310275966	310275966	ginalili@hotmail.com	Villavicencio	1980-03-20 10:00:00+00	F	1		1	2	2	\N	8	active	2024-05-29 23:43:18+00	2024-05-29 23:43:18+00	\N	f	\N	\N	4.144126807828114	-73.65010260354873	\N
128	CC	52473347	YEIMIT BRIGITTE	BAUTISTA PEREZ	CALLE 18 # 11-22	3204931803	3204931803	prevision@gmail.com	Monteria	1980-08-16 10:00:00+00	F	1		1	2	2	\N	9	active	2024-05-29 23:45:23+00	2024-05-29 23:45:23+00	\N	f	\N	\N	8.872720579481168	-75.8929920192213	\N
130	CC	52704290	NIDIA YAQUELINE	CELY JOYA	CALLE 12 # 12-35 PISO2 SOGAMOSO	3184561590	3184561590	ncely7910@gmail.com	Bucaramanga	1980-05-10 10:00:00+00	F	2		1	2	2	\N	11	active	2024-05-29 23:48:14+00	2024-05-29 23:48:14+00	\N	f	\N	\N	7.113658367015693	-73.10391265368362	\N
10	CC	1010120827	DANNA ISABELLA	GARCIA	OPTISALUD TUNJA	3213447569	3213447569	isabellagarciaopto@hotmail.com	Monteria	1970-11-08 10:00:00+00	F	2		1	3	2	\N	9	active	2024-05-23 01:14:35+00	2024-05-23 01:14:35+00	2026-02-17 21:32:24+00	f	\N	\N	8.881319787137969	-75.87957643203119	\N
18	CC	1007381625	ANGELA MARIA 	RINCÓN CELY	CREDIOPTICAS DUITAMA	3222616692	3222616692	angelarinconce@gmail.com	Tunja	1990-09-08 10:00:00+00	F	1		1	3	2	\N	3	active	2024-05-29 19:10:56+00	2024-05-29 19:10:56+00	\N	f	\N	\N	5.544415242803918	-73.3401904278205	\N
30	CC	1020783787	MONICA	MORENO ROBAYO	OPTISALUD TUNJA	3143515281	3143515281	moniromero_09@hotmail.com	Neiva	1990-06-15 10:00:00+00	F	2		1	3	2	13	12	active	2024-05-29 19:46:41+00	2024-05-29 19:46:41+00	\N	f	\N	\N	2.909357328362477	-75.268773275669	\N
39	CC	1032394161	JESUS ARTURO	HERNANDEZ SIERRA	CARRERA 3 # 12-28	3152076151	3152076151	optometramundovisionboyaca@gmail.com	Barranquilla	1990-07-30 10:00:00+00	M	1		1	1	2	\N	6	active	2024-05-29 20:01:28+00	2024-05-29 20:01:28+00	\N	f	\N	\N	10.972005837916988	-74.788947266002	\N
44	CC	1049632031	DANILO 	BUITRAGO SOLER	TUNJA	3123315382	3123315382	danilo-bs@hotmail.com	Bucaramanga	1990-11-19 10:00:00+00	M	2		1	3	2	\N	11	active	2024-05-29 20:16:42+00	2024-05-29 20:16:42+00	\N	f	\N	\N	7.103434800791583	-73.11805611686921	\N
45	CC	1052402100	VERONICA MARCELA	ECHEVERRIA BUITRAGO	CARRERA 17 # 12A-06	3142378169	3142378169	vero.nikk17@hotmail.com	Neiva	1990-06-17 10:00:00+00	F	2		1	1	2	\N	12	active	2024-05-29 20:18:21+00	2024-05-29 20:18:21+00	\N	f	\N	\N	2.9250719482954506	-75.29592037878749	\N
131	CC	52737243	DIANA CAROLINA	GONZALEZ HEREDIA	CALLE 18 # 10-15	7401091	3007588264	OPTICACOC@HOTMAIL.COM	Neiva	1980-12-14 10:00:00+00	F	2		1	1	2	\N	12	active	2024-05-29 23:49:20+00	2024-05-29 23:49:20+00	\N	f	\N	\N	2.914756075415318	-75.28377776328648	\N
132	CC	52743523	JENNY 	FLOREZ	OPTISALUD DUITAMA	3023266060	3023266060		Ibague	1980-05-13 10:00:00+00	F	1		1	3	2	\N	13	active	2024-05-29 23:50:27+00	2024-05-29 23:50:27+00	\N	f	\N	\N	4.4450329929900905	-75.22531463559729	\N
133	CC	52792861	NELCY JOHANNA	ALVARADO QUIJANO	CARRERA 10 # 14 - 56	7702267	3103378056	nelcyalvarado@hotmail.com	Cali	1980-03-14 10:00:00+00	F	2		1	1	2	\N	14	active	2024-05-29 23:52:59+00	2024-05-29 23:52:59+00	\N	f	\N	\N	3.432357034531218	-76.51073443768253	\N
134	CC	52967467	MARIA TERESA	MENDIETA MELO	CALLE 6 A # 6-76	3138539712	3138539712	mariamendieta122@hotmail.com	Medellin	1980-12-08 10:00:00+00	F	2		1	1	2	\N	1	active	2024-05-29 23:55:31+00	2024-05-29 23:55:31+00	\N	f	\N	\N	6.258351193060101	-75.60176890609141	\N
135	CC	53082587	ANA CATALINA 	MARTINEZ NOVA	CARRERA  11 No 24-10	3204629385	3204629385	cata.opt@gmail.com	Bogota	1980-03-27 10:00:00+00	F	1		1	3	2	\N	2	active	2024-05-29 23:57:00+00	2024-05-29 23:57:00+00	\N	f	\N	\N	4.695412943919094	-74.07137198502369	\N
136	CC	53121279	ALEXA ROCIO	QUINTERO CASTIBLANCO	CENTRO NORTE	7464025	3105625442	rochy.quintero@gmail.com	Tunja	1980-11-08 10:00:00+00	F	1		1	3	2	\N	3	active	2024-05-29 23:58:53+00	2024-05-29 23:58:53+00	\N	f	\N	\N	5.558296568767849	-73.3401536960187	\N
137	CC	53139257	CLARA DEL ROSARIO	RODRIGUEZ SUAREZ	CARRERA 9  # 24-50	3187727814	3187727814	opto.clara.rodriguez@gmail.com	Cartagena	1980-01-14 10:00:00+00	F	2		1	3	2	\N	4	active	2024-05-29 23:59:47+00	2024-05-29 23:59:47+00	\N	f	\N	\N	10.384602974089637	-75.50234004019073	\N
139	CC	63530012	ELIZABETH	RUIZ VARGAS	CALLE 28 # 9-29	3172649344	3172649344		Barranquilla	1980-06-28 10:00:00+00	F	1		1	3	2	\N	6	active	2024-05-30 00:02:02+00	2024-05-30 00:02:02+00	\N	f	\N	\N	10.98564571214353	-74.7883027972415	\N
140	CC	65739035	DIANA PATRICIA	RIVERA HAYEK	CARRERA 11 # 10 -64	7721889	3105700432		Pereira	1980-02-05 10:00:00+00	F	2		1	2	1	11	7	active	2024-05-30 00:03:53+00	2024-05-30 00:03:53+00	\N	f	\N	\N	4.817331760228892	-75.71021612631709	\N
141	CC	6767287	JORGE ALBERTO	VARGAS BUITRAGO	CARRERA 10 # 17 - 84	7426084	3132657518	jorgeopt_7@hotmail.com	Villavicencio	1970-04-30 10:00:00+00	M	1		1	3	2	\N	8	active	2024-05-30 00:05:38+00	2024-05-30 00:05:38+00	\N	f	\N	\N	4.154270493009263	-73.63411686801871	\N
142	CC	7178424	CIRO ALFONSO	CUCAITA ESQUIVEL	CARRERA 9 # 17-21	7430945	3134920749	0ptirislents@gmail.com	Monteria	1970-11-03 10:00:00+00	M	2		1	2	2	\N	9	active	2024-05-30 00:07:47+00	2024-05-30 00:15:11+00	\N	f	\N	\N	8.904359930615916	-75.90605335356098	\N
143	CC	79286425	HECTOR JULIO	FERNANDEZ RICAURTE	CALLE 15 # 10-41	7715572	3143753736	opticadrfernandez@yahoo.com	Pasto	1970-06-24 10:00:00+00	M	1		1	3	2	\N	10	active	2024-05-30 00:09:38+00	2024-05-30 00:09:38+00	\N	f	\N	\N	1.1939370474605098	-77.28156676142811	\N
144	CC	7187399	ANDRES	BOJACA CASTRO	CARRERA 10   18-57	3142995918	3142995918	abojaca99@unisalle.edu.co	Bucaramanga	1970-06-30 10:00:00+00	M	2		1	3	2	\N	11	active	2024-05-30 00:11:05+00	2024-05-30 00:11:05+00	\N	f	\N	\N	7.139490667267347	-73.14318854228213	\N
145	CC	72197757	JAIRO 	CORREDOR PUERTO	CARRERA 14 # 16-20	7604450	3133514440	jairocorredorpuerto1@hotmail.com	Neiva	1970-01-30 10:00:00+00	M	2		1	2	2	\N	12	active	2024-05-30 00:13:06+00	2024-05-30 00:14:28+00	\N	f	\N	\N	2.914329451084128	-75.2707479200004	\N
147	CC	74183533	MANUEL	BUSTACARA ACOSTA	CARRERA 15 # 13-42	3107991118	3107991118	visual-center@hotmail.com	Cali	1970-09-23 10:00:00+00	M	1		1	3	2	\N	14	active	2024-05-30 00:16:33+00	2024-05-30 00:16:33+00	\N	f	\N	\N	3.445112264819462	-76.52963909077623	\N
148	CC	74184267	MAURICIO	PULIDO ALFONSO		3176682151	3176682151	optopul@gmail.com	Medellin	1970-08-09 10:00:00+00	M	2		1	1	2	\N	1	active	2024-05-30 00:19:09+00	2024-05-30 00:19:09+00	\N	f	\N	\N	6.233843565382714	-75.59401184571482	\N
149	CC	74327024	OSCAR 	MARTÍNEZ ACESIO	CALLE 15 N 17 - 36	7613411	3166199998	osfrema@outlook.com	Bogota	1970-09-25 10:00:00+00	M	2		1	1	2	\N	2	active	2024-05-30 00:20:21+00	2024-05-30 00:20:21+00	\N	f	\N	\N	4.702866303299858	-74.08729251256153	\N
150	CC	74381570	VICTOR ALFONSO	REYES FORERO	CARRERA 9  14-47	3214886260	3214886260	vialrefo@hotmail.com	Tunja	1970-06-19 10:00:00+00	M	2		1	2	2	\N	3	active	2024-05-30 00:22:30+00	2024-05-30 00:22:30+00	\N	f	\N	\N	5.541560308768172	-73.37368761557872	\N
151	CC	74382012	ANDRES MAURICIO	MORALES NUÑEZ	C.C INOVO PLAZA	3012913208	3012913208	ocular.center@hotmail.com	Cartagena	1970-11-28 10:00:00+00	M	1		1	2	2	\N	4	active	2024-05-30 00:23:35+00	2024-05-30 00:23:35+00	\N	f	\N	\N	10.414249391257881	-75.48043158586961	\N
152	CC	77169702	ORLANDO 	USTARIZ GONZALEZ	AVENIDA SUBA # 115-45- TUNJA EDIFICIO ENTERPRISE	4100088	3002647098	orusgo@gmail.com	Quibdo	1980-05-24 10:00:00+00	M	2		1	3	1	9	5	active	2024-05-30 00:25:15+00	2024-05-30 00:25:15+00	\N	f	\N	\N	5.684214961862421	-76.67567058511301	\N
153	CC	79189157	JULIAN EDUARDO 	RAMIREZ ROJAS	CALLE 63 # 18-16	3132816300	3132816300	julianeduardoramirez@gmail.com	Barranquilla	1970-01-01 00:00:00+00	M	2		1	1	1	11	6	active	2024-05-30 00:27:01+00	2024-05-30 00:27:01+00	\N	f	\N	\N	10.956508381854901	-74.77473349477089	\N
154	CC	79781600	SALIM ABOU 	AMMAR VELANDIA	CALLE 14  # 10-87	7700165	3107890711	zonasalim@hotmail.com.com	Pereira	1972-03-13 10:00:00+00	M	2		1	3	2	\N	7	active	2024-05-30 00:28:11+00	2024-05-30 00:28:11+00	\N	f	\N	\N	4.827523183222059	-75.69481813692477	\N
155	CC	79849726	IVAN MAURICIO	ARIAS DIAZ	CALLE 17 # 9-30 CONSUTORIO 205	3186757717	3186757717	ivanarias07@gmail.com	Villavicencio	1970-03-30 10:00:00+00	M	1		1	2	2	\N	8	active	2024-05-30 00:29:24+00	2024-05-30 00:29:24+00	\N	f	\N	\N	4.150273892945575	-73.6215201720113	\N
156	CC	80088807	JULIAN ANDRES 	TRIANA	CARRERA 17 # 12A-06	3114647636	3114647636		Monteria	1970-09-02 10:00:00+00	M	2		1	2	1	\N	9	active	2024-05-30 00:36:30+00	2024-05-30 00:36:30+00	\N	f	\N	\N	8.877376420784879	-75.87273282780939	\N
158	CC	80411029	LUIS GIOVANNY	CARDENAS  MATAMOROS	CALLE 20 # 12-89	7431384	3158712867	cardenasvision@mail.com	Bucaramanga	1970-09-25 10:00:00+00	M	2		1	1	1	11	11	active	2024-05-30 00:38:56+00	2024-05-30 00:38:56+00	\N	f	\N	\N	7.145300577810957	-73.10740360954885	\N
159	CE	827308	JORGE LUIS	PADRON CHACIN	TUNJA OPTISALUD	3117536712	3117536712	jpadron88@gmail.com	Neiva	1980-05-08 10:00:00+00	M	2		1	3	1	11	12	active	2024-05-30 00:39:52+00	2024-05-30 00:39:52+00	\N	f	\N	\N	2.907561792252414	-75.27187352666071	\N
160	CE	921662	CARLOS EDUARDO	CASTELLANOS ZAMBRANO	OPTISALUD TUNJA	3138838588	3138838588	solrac_1789@hotmail.com	Ibague	1970-08-17 10:00:00+00	M	2		1	3	1	\N	13	active	2024-05-30 00:41:02+00	2024-05-30 00:41:02+00	\N	f	\N	\N	4.447907660111282	-75.20946190741869	\N
2	CC	684532120320	Juan David ANDRES	Mejia	calle 2 79-35	+573106933247	+573044171706	juandavid.mejia@servitecssr.com.co	Medellin	2006-03-20 10:00:00+00	M	2		1	3	5	\N	1	active	2024-02-20 17:14:53+00	2024-05-21 23:43:57+00	2026-02-17 21:32:24+00	f	\N	\N	6.224151668863513	-75.59311350971369	\N
3	CC	84565089	alexx		medellin	+573016929387	+573016929387	cesar@gmail.com	Bogota	1993-03-23 10:00:00+00	\N	3		3	\N	5	\N	2	active	2024-03-20 17:42:29+00	2024-03-20 17:42:29+00	2026-02-17 21:32:24+00	f	\N	\N	4.694879115972092	-74.06611056801754	\N
6	CC	1000575844	FELIPE 	PULIDO GRANADOS	CRA 12  11-65  INT 5	3174241797	3174241797	felop3020@gmail.com	Quibdo	1969-03-31 05:00:00+00	M	2		1	1	2	\N	5	active	2024-05-09 01:33:08+00	2024-06-11 19:17:26+00	2026-02-17 21:32:24+00	f	\N	\N	5.692896984350462	-76.65680694686984	\N
50	CC	1052314423	JUDY 	CARVAJAL RIVERA	CARRERA 9  # 24-79	3134778098	3134778098	judycarvajal04@gmail.com	Medellin	1990-04-11 10:00:00+00	F	2		1	2	2	\N	1	active	2024-05-29 20:24:48+00	2024-05-29 20:24:48+00	\N	f	\N	\N	6.268496423282675	-75.55683742330625	\N
56	CC	1052396020	OSCAR FABIAN	SOLANO CARDENAS	CALLE 15 # 13-55	3214047519	3214047519	opticosgroup@gmail.com	Pereira	1990-01-29 10:00:00+00	M	2		1	2	2	\N	7	active	2024-05-29 20:34:17+00	2024-05-29 20:34:17+00	\N	f	\N	\N	4.8115905983498966	-75.6843943959624	\N
58	CC	1098801437	ANGELA DEL PILAR	RAMIREZ BALLESTEROS	TUNJA UNICENTRO	3043766164	3043766164	pilar.ramirez8@hotmail.com	Monteria	1990-10-20 10:00:00+00	F	1		1	3	2	\N	9	active	2024-05-29 20:37:57+00	2024-05-29 20:37:57+00	\N	f	\N	\N	8.891735175229947	-75.87470344133223	\N
64	CC	1057579151	DIANA GINETH	GONZALEZ MARTINEZ	OPTISALUD SOGAMOSO	3138316455	3138316455	dianagon_18@hotmail.com	Medellin	1990-09-27 10:00:00+00	F	1		1	3	2	\N	1	active	2024-05-29 20:55:51+00	2024-05-29 20:55:51+00	\N	f	\N	\N	6.261094063421031	-75.58144435771133	\N
73	CC	1095808829	DIANA CAROLINA 	SUAREZ GONZALEZ	C.C INNOVO PISO 2	3118897665	3118897665	optica.soluvision@gmail.com	Pasto	1990-04-16 10:00:00+00	F	2		1	2	2	\N	10	active	2024-05-29 21:10:44+00	2024-05-29 21:10:44+00	\N	f	\N	\N	1.204582027990773	-77.30323501294262	\N
82	CC	19294315	JULIO ROBERTO	SEPULVEDA SEPÚLVEDA	CARRERA 14 # 17 - 47	7729040	3125249292	doctorsepulvedasogamoso@hotmail.com	Quibdo	1970-05-05 10:00:00+00	M	2		1	3	1	\N	5	active	2024-05-29 21:30:20+00	2024-05-29 21:30:20+00	\N	f	\N	\N	5.720756257343032	-76.65709782963653	\N
84	CC	23430708	SANDRA ROCIO	BAEZ	OPTICA SUPERVISIONOPT	3185218379	3185218379	supervisionopt@gmail.com	Pereira	1970-03-17 10:00:00+00	F	2		1	2	2	\N	7	active	2024-05-29 21:33:50+00	2024-05-29 21:33:50+00	\N	f	\N	\N	4.820781155755229	-75.68625103859206	\N
85	CC	23551313	MYRIAM MERCEDES	JAIMES CORREA	CALLE 16 # 15 - 43	7605484	3153688281	creadsaludboyaca@yahoo.es	Villavicencio	1970-05-11 10:00:00+00	F	1		1	3	2	\N	8	active	2024-05-29 21:34:54+00	2024-05-29 21:34:54+00	\N	f	\N	\N	4.138613475553178	-73.62625891024372	\N
90	CC	33365805	ISABEL 	LOPEZ LOPEZ	CALLE 29 # 9a-20	3173787083	3173787083	isalopez07@yahoo.es	Ibague	1970-02-07 10:00:00+00	F	1		1	2	2	\N	13	active	2024-05-29 21:43:10+00	2024-05-29 21:43:10+00	\N	f	\N	\N	4.420058715551904	-75.22642882351307	\N
93	CC	35458276	SILVIA MARINA 	ULLOQUE DE LA HOZ	CARRERA 9 # 22 - 10 CONSULTORIO 205	7401682	3153178068	sylloque@hotmail.com	Bogota	1970-07-20 10:00:00+00	F	2		1	3	1	\N	2	active	2024-05-29 21:52:02+00	2024-05-29 21:52:02+00	\N	f	\N	\N	4.725625853303718	-74.05528229443193	\N
99	CC	40029547	SANDRA LILIANA	VALLEJO SILVA	CARRERA 1F # 40-149	3164940873	3164940873	sandraliliana 13@hotmail.com	Villavicencio	1970-07-03 10:00:00+00	F	1		1	2	2	\N	8	active	2024-05-29 22:10:02+00	2024-05-29 22:10:02+00	\N	f	\N	\N	4.119543182556251	-73.65126184157965	\N
102	CC	46358190	GLORIA ENITH	OJEDA SUANCHA	CALLE 11 # 8-47	3108123294	3108123294	gloriaenithojeda@yahoo.com	Bucaramanga	1970-02-08 10:00:00+00	F	1		1	2	2	\N	11	active	2024-05-29 22:17:01+00	2024-05-29 22:17:01+00	\N	f	\N	\N	7.120030611752351	-73.12240812191217	\N
110	CC	46670428	ALEXANDRA 	FAJARDO PRIETO	CARRERA 11 # 17 - 23	7432366	3153906157	fajardoalexandra@gmail.com	Quibdo	1980-09-29 10:00:00+00	F	1		1	2	2	\N	5	active	2024-05-29 23:16:16+00	2024-05-29 23:16:16+00	\N	f	\N	\N	5.69296474745617	-76.63895852994875	\N
118	CC	51958168	LUISA ALEJANDRA	CASALLAS GUTIÉRREZ	CARRERA 16 # 13 - 52	7606461	3005656605	acasallasg@hotmail.com	Ibague	1980-05-21 10:00:00+00	F	1		1	2	2	\N	13	active	2024-05-29 23:28:59+00	2024-05-29 23:28:59+00	\N	f	\N	\N	4.451780498996451	-75.21966711384087	\N
123	CC	52261693	ZULMA	ACERO TORRES	CALLE 18 # 13-45	3133338026	3133338026	Zacerot@hotmail.com	Cartagena	1980-11-06 10:00:00+00	F	1		1	2	2	\N	4	active	2024-05-29 23:36:04+00	2024-05-29 23:36:04+00	\N	f	\N	\N	10.40454401314514	-75.4816800779209	\N
129	CC	52704123	CAROL ANDREA	VERGARA	CENTRO NORTE LOCAL 7	3114956630	3114956630	andreavergara2@hotmail.com	Pasto	1970-01-01 00:00:00+00	F	2		1	2	2	\N	10	active	2024-05-29 23:46:41+00	2024-05-29 23:46:41+00	\N	f	\N	\N	1.2085985884553494	-77.2571192643199	\N
138	CC	53153306	RUBY YASMIN	ROSAS ACEVEDO	CARRERA 12 # 12-98 CREDIOPTICAS	3215098302	3215098302	rosas530709@gmail.com	Quibdo	1980-06-09 10:00:00+00	F	2		1	3	2	\N	5	active	2024-05-30 00:00:46+00	2024-05-30 00:00:46+00	\N	f	\N	\N	5.7173814298578565	-76.67719631774992	\N
146	CC	74080182	OSCAR SANTIAGO	GONZALEZ MARTINEZ	CARRERA 10 # 14-42	7706558	3103415317	opticaultravisionsog@hotmail.com	Ibague	1970-10-04 10:00:00+00	M	2		1	2	2	\N	13	active	2024-05-30 00:14:15+00	2024-05-30 00:14:15+00	\N	f	\N	\N	4.46304398215647	-75.25606277167972	\N
157	CC	80199004	CARLOS EDUARDO 	BERMUDEZ MEDINA	OPTISALUD TUNJA	7433367	3008533685	carlos_bm84@hotmail.com	Pasto	1970-03-15 10:00:00+00	M	2		1	3	1	\N	10	active	2024-05-30 00:37:56+00	2024-05-30 00:37:56+00	\N	f	\N	\N	1.2073566501955753	-77.285519936256	\N
161	CC	9522554	JORGE ANDRES	FERNANDEZ RICAURTE	DUITAMA	3002108765	3002108765	jafersman@yahoo.es	Cali	1970-11-08 10:00:00+00	M	2		1	3	1	\N	14	active	2024-05-30 00:42:06+00	2024-05-30 00:42:06+00	\N	f	\N	\N	3.427155302798612	-76.54123457355193	\N
162	CC	9522578	SAMUEL	LARA	CARRERA 12 # 11-30	3108066436	3108066436	instituto.ocularsaludsocial@gmail.com	Medellin	1987-12-04 10:00:00+00	M	1		1	2	2	\N	1	active	2024-05-30 00:43:21+00	2024-05-30 00:43:21+00	\N	f	\N	\N	6.248754544511327	-75.60345090987097	\N
163	CC	9529775	JULIAN HUMBERTO	PARDO MEJIA	CALLE 15 # 16 - 25	7610700	3107637783	opticaspardo.35@gmail.com	Bogota	1970-11-25 10:00:00+00	M	2		1	2	2	\N	2	active	2024-05-30 00:44:22+00	2024-05-30 00:44:22+00	\N	f	\N	\N	4.729461711885595	-74.08548625597098	\N
165	CC	40020685	MARIA EUGENIA	VARGAS	CRA 6  47-27	7471146	3204910500	optomaria@hotmail.com	Cartagena	1970-01-26 10:00:00+00	F	1		1	3	2	\N	4	active	2024-05-30 01:53:33+00	2024-05-30 01:53:33+00	\N	f	\N	\N	10.398018483998841	-75.47980930970668	\N
166	CC	1040738595	Jessica	Londoño	cra 67 25-45	3013892222	301322222	comunicaciones@laboratorioophtha.com	Quibdo	2006-06-22 10:00:00+00	F	2		1	1	1	6	5	active	2024-07-23 21:39:48+00	2024-07-23 21:39:48+00	\N	f	\N	\N	5.684698594927319	-76.66072346999762	\N
167	CC	98568758	Prueba TEST	TEST ADMIN	Cra 1 e	3153998569	3153986594	testprueba@gmail.com	Barranquilla	2006-07-25 10:00:00+00	\N	3	Comfandi	2	\N	5	\N	6	active	2024-10-03 21:52:17+00	2024-10-03 21:52:17+00	\N	f	\N	\N	10.97298253078436	-74.78338773873354	\N
168	CC	123456789	prueba 1510	prueba	calle 2 79-35	3106933247	3016929387	juandavid.mejia@servitecssr.com.co	Pereira	1988-10-15 10:00:00+00	M	3		1	3	1	2	7	active	2024-10-15 19:27:04+00	2024-10-15 19:27:04+00	2026-02-17 21:32:24+00	f	\N	\N	4.835355898548178	-75.71056168411549	\N
178	CC	1017172511	Eduardo	Montoya	Carrera 65 No. 29 - 44	3153038888	3615303888	nanis2291@hotmail.com	Villavicencio	1990-03-21 10:00:00+00	M	3	\N	1	1	2	\N	8	active	2026-03-12 18:36:45+00	2026-03-12 18:36:45+00	\N	f	\N	\N	4.1333623844942045	-73.63580184723067	\N
179	CC	88888888	JuanD	Echeverri	Dir	3015790000	3015794800	cor@cor.com	Monteria	2008-03-12 10:00:00+00	M	3	\N	1	1	4	\N	9	active	2026-03-12 18:49:22+00	2026-04-06 20:02:41+00	\N	f	\N	\N	8.89127988576806	-75.89224442400771	\N
164	CC	1018485086	Héctor Álvarez Niño	ALFONSO GONZALEZ	CARRERA 10 # 14-53	\N		hanna.alfonso@hotmail.com	Tunja	1990-02-25 10:00:00+00	M	2	\N	1	3	2	\N	3	active	2024-05-30 00:45:29+00	2026-06-24 20:57:57.346+00	\N	t	\N	/uploads/signatures/1782334589186-862982197.png	5.543615211771899	-73.33188921882659	\N
\.


--
-- Data for Name: third_classification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_classification (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Compra directo Ophtha	active	2024-02-08 09:27:02+00	2024-02-08 09:27:02+00	\N
2	Compra por distribuidor	active	2024-02-08 09:27:02+00	2024-02-08 09:27:02+00	\N
3	Prescriptor	active	2024-03-12 08:13:22+00	2024-03-12 08:13:22+00	\N
4	Tecnólogo Médico	active	2024-03-12 08:13:22+00	2024-03-12 08:13:22+00	\N
\.


--
-- Data for Name: third_specialty; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_specialty (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Oftalmólogo	active	2024-02-08 09:27:29+00	2024-02-08 09:27:29+00	\N
2	Optometra	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
3	Residente	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
4	Fellow	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
5	Dermatólogo	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
6	Médico General	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
7	Médico Pediatra	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
8	Médico Veterinario	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
9	Médico Veterinario Oftalmólogo	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
10	Otras	active	2024-03-12 08:22:31+00	2024-03-12 08:22:31+00	\N
\.


--
-- Data for Name: third_subspecialty; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_subspecialty (id, name, "specialtyId", status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Oftalmología Integral	1	active	2024-02-08 09:27:52+00	2024-02-08 09:27:52+00	\N
2	Segmento Anterior y Posterior	1	active	2024-02-08 09:27:52+00	2024-02-08 09:27:52+00	\N
3	Retina, Vitreo y Uveítis	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
4	Oftalmología Pedíatrica	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
5	Estrabismo	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
6	Glaucoma	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
7	Oculoplastia, Vía lagrimal y Órbita	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
8	Oncología Ocular y Tumores Oculares	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
9	Córnea	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
10	Neuro Oftalmología	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
11	Otras	1	active	2024-03-12 08:18:37+00	2024-03-12 08:18:37+00	\N
12	Contactólogo	2	active	2024-03-12 08:32:27+00	2024-03-12 08:32:27+00	\N
13	Otras	2	active	2024-03-12 08:32:27+00	2024-03-12 08:32:27+00	\N
\.


--
-- Data for Name: third_type; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.third_type (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Medico	active	2024-02-08 09:29:08+00	2024-02-08 09:29:08+00	\N
2	Drogueria	active	2024-02-08 09:29:08+00	2024-02-08 09:29:08+00	\N
3	Comercial	active	2024-02-08 09:29:08+00	2024-02-08 09:29:08+00	\N
\.


--
-- Data for Name: thirds_portfolios; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.thirds_portfolios (id, "portfolioId", "thirdId", approved, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
4	2	5	t	active	2024-03-20 19:35:18+00	2025-12-17 01:40:36+00	\N
159	2	167	t	active	2024-10-03 22:26:41+00	2025-12-17 01:40:36+00	\N
163	6	158	t	active	2026-03-12 10:25:30+00	2026-03-12 10:25:30+00	\N
164	7	158	t	active	2026-03-12 10:25:58+00	2026-03-12 10:26:32+00	\N
165	6	179	t	active	2026-03-12 18:55:10+00	2026-03-12 18:55:10+00	\N
8	3	11	t	active	2024-05-23 01:41:07+00	2026-06-22 22:36:34.416+00	\N
10	3	13	t	active	2024-05-23 01:44:14+00	2026-06-22 22:36:34.42+00	\N
16	3	19	t	active	2024-05-29 19:18:44+00	2026-06-22 22:36:34.429+00	\N
19	3	25	t	active	2024-05-29 19:26:37+00	2026-06-22 22:36:34.432+00	\N
20	3	26	t	active	2024-05-29 19:30:55+00	2026-06-22 22:36:34.435+00	\N
21	3	27	t	active	2024-05-29 19:32:53+00	2026-06-22 22:36:34.44+00	\N
22	3	28	t	active	2024-05-29 19:38:32+00	2026-06-22 22:36:34.445+00	\N
23	3	29	t	active	2024-05-29 19:44:46+00	2026-06-22 22:36:34.448+00	\N
25	3	31	t	active	2024-05-29 19:49:30+00	2026-06-22 22:36:34.451+00	\N
27	3	33	t	active	2024-05-29 19:53:01+00	2026-06-22 22:36:34.454+00	\N
31	3	38	t	active	2024-05-29 19:59:47+00	2026-06-22 22:36:34.457+00	\N
34	3	41	t	active	2024-05-29 20:08:57+00	2026-06-22 22:36:34.46+00	\N
39	3	46	t	active	2024-05-29 20:19:42+00	2026-06-22 22:36:34.463+00	\N
42	3	51	t	active	2024-05-29 20:26:09+00	2026-06-22 22:36:34.465+00	\N
44	3	53	t	active	2024-05-29 20:30:22+00	2026-06-22 22:36:34.468+00	\N
45	3	54	t	active	2024-05-29 20:31:34+00	2026-06-22 22:36:34.47+00	\N
46	3	55	t	active	2024-05-29 20:32:44+00	2026-06-22 22:36:34.473+00	\N
48	3	57	t	active	2024-05-29 20:36:06+00	2026-06-22 22:36:34.475+00	\N
52	3	61	t	active	2024-05-29 20:42:47+00	2026-06-22 22:36:34.483+00	\N
53	3	62	t	active	2024-05-29 20:44:52+00	2026-06-22 22:36:34.485+00	\N
54	3	63	t	active	2024-05-29 20:49:43+00	2026-06-22 22:36:34.488+00	\N
55	3	64	t	active	2024-05-29 20:55:51+00	2026-06-22 22:36:34.49+00	\N
56	3	65	t	active	2024-05-29 20:57:16+00	2026-06-22 22:36:34.493+00	\N
59	3	68	t	active	2024-05-29 21:03:18+00	2026-06-22 22:36:34.495+00	\N
61	3	70	t	active	2024-05-29 21:06:22+00	2026-06-22 22:36:34.497+00	\N
63	3	72	t	active	2024-05-29 21:09:42+00	2026-06-22 22:36:34.5+00	\N
67	3	76	t	active	2024-05-29 21:15:23+00	2026-06-22 22:36:34.502+00	\N
68	3	77	t	active	2024-05-29 21:19:08+00	2026-06-22 22:36:34.504+00	\N
69	3	78	t	active	2024-05-29 21:21:09+00	2026-06-22 22:36:34.507+00	\N
70	3	79	t	active	2024-05-29 21:22:44+00	2026-06-22 22:36:34.51+00	\N
71	3	80	t	active	2024-05-29 21:23:54+00	2026-06-22 22:36:34.512+00	\N
72	3	81	t	active	2024-05-29 21:28:57+00	2026-06-22 22:36:34.515+00	\N
76	3	85	t	active	2024-05-29 21:34:54+00	2026-06-22 22:36:34.517+00	\N
77	3	86	t	active	2024-05-29 21:36:07+00	2026-06-22 22:36:34.52+00	\N
85	3	94	t	active	2024-05-29 21:53:26+00	2026-06-22 22:36:34.524+00	\N
86	3	95	t	active	2024-05-29 21:58:23+00	2026-06-22 22:36:34.526+00	\N
87	3	96	t	active	2024-05-29 22:02:13+00	2026-06-22 22:36:34.529+00	\N
89	3	98	t	active	2024-05-29 22:07:42+00	2026-06-22 22:36:34.531+00	\N
92	3	101	t	active	2024-05-29 22:15:58+00	2026-06-22 22:36:34.536+00	\N
93	3	102	t	active	2024-05-29 22:17:01+00	2026-06-22 22:36:34.538+00	\N
95	3	104	t	active	2024-05-29 22:19:59+00	2026-06-22 22:36:34.541+00	\N
96	3	105	t	active	2024-05-29 22:21:05+00	2026-06-22 22:36:34.544+00	\N
98	3	107	t	active	2024-05-29 23:09:05+00	2026-06-22 22:36:34.547+00	\N
103	3	112	t	active	2024-05-29 23:18:38+00	2026-06-22 22:36:34.55+00	\N
104	3	113	t	active	2024-05-29 23:19:40+00	2026-06-22 22:36:34.555+00	\N
105	3	114	t	active	2024-05-29 23:21:24+00	2026-06-22 22:36:34.557+00	\N
109	3	118	t	active	2024-05-29 23:28:59+00	2026-06-22 22:36:34.561+00	\N
110	3	119	t	active	2024-05-29 23:30:46+00	2026-06-22 22:36:34.564+00	\N
112	3	121	t	active	2024-05-29 23:33:18+00	2026-06-22 22:36:34.567+00	\N
114	3	123	t	active	2024-05-29 23:36:04+00	2026-06-22 22:36:34.57+00	\N
117	3	126	t	active	2024-05-29 23:40:35+00	2026-06-22 22:36:34.576+00	\N
126	3	135	t	active	2024-05-29 23:57:00+00	2026-06-22 22:36:34.578+00	\N
129	3	138	t	active	2024-05-30 00:00:46+00	2026-06-22 22:36:34.581+00	\N
130	3	139	t	active	2024-05-30 00:02:02+00	2026-06-22 22:36:34.583+00	\N
132	3	141	t	active	2024-05-30 00:05:38+00	2026-06-22 22:36:34.585+00	\N
135	3	144	t	active	2024-05-30 00:11:05+00	2026-06-22 22:36:34.589+00	\N
137	3	146	t	active	2024-05-30 00:14:15+00	2026-06-22 22:36:34.592+00	\N
138	3	147	t	active	2024-05-30 00:16:33+00	2026-06-22 22:36:34.596+00	\N
141	3	150	t	active	2024-05-30 00:22:30+00	2026-06-22 22:36:34.6+00	\N
143	3	152	t	active	2024-05-30 00:25:15+00	2026-06-22 22:36:34.602+00	\N
145	3	154	t	active	2024-05-30 00:28:11+00	2026-06-22 22:36:34.606+00	\N
147	3	156	t	active	2024-05-30 00:36:30+00	2026-06-22 22:36:34.608+00	\N
148	3	157	t	active	2024-05-30 00:37:56+00	2026-06-22 22:36:34.611+00	\N
151	3	160	t	active	2024-05-30 00:41:02+00	2026-06-22 22:36:34.613+00	\N
152	3	161	t	active	2024-05-30 00:42:06+00	2026-06-22 22:36:34.616+00	\N
156	3	165	t	active	2024-05-30 01:53:33+00	2026-06-22 22:36:34.619+00	\N
9	3	12	t	active	2024-05-23 01:42:35+00	2026-06-22 22:36:34.624+00	\N
11	3	14	t	active	2024-05-29 17:41:21+00	2026-06-22 22:36:34.628+00	\N
12	3	15	t	active	2024-05-29 17:50:49+00	2026-06-22 22:36:34.631+00	\N
13	3	16	t	active	2024-05-29 19:06:00+00	2026-06-22 22:36:34.633+00	\N
14	3	17	t	active	2024-05-29 19:09:32+00	2026-06-22 22:36:34.636+00	\N
17	3	20	t	active	2024-05-29 19:19:45+00	2026-06-22 22:36:34.638+00	\N
18	3	21	t	active	2024-05-29 19:21:48+00	2026-06-22 22:36:34.641+00	\N
24	3	30	t	active	2024-05-29 19:46:41+00	2026-06-22 22:36:34.644+00	\N
26	3	32	t	active	2024-05-29 19:51:11+00	2026-06-22 22:36:34.65+00	\N
28	3	35	t	active	2024-05-29 19:54:25+00	2026-06-22 22:36:34.652+00	\N
29	3	36	t	active	2024-05-29 19:55:55+00	2026-06-22 22:36:34.655+00	\N
30	3	37	t	active	2024-05-29 19:58:22+00	2026-06-22 22:36:34.657+00	\N
32	3	39	t	active	2024-05-29 20:01:28+00	2026-06-22 22:36:34.66+00	\N
33	3	40	t	active	2024-05-29 20:03:39+00	2026-06-22 22:36:34.663+00	\N
35	3	42	t	active	2024-05-29 20:10:48+00	2026-06-22 22:36:34.665+00	\N
36	3	43	t	active	2024-05-29 20:14:22+00	2026-06-22 22:36:34.668+00	\N
38	3	45	t	active	2024-05-29 20:18:21+00	2026-06-22 22:36:34.674+00	\N
40	3	47	t	active	2024-05-29 20:21:18+00	2026-06-22 22:36:34.676+00	\N
41	3	50	t	active	2024-05-29 20:24:48+00	2026-06-22 22:36:34.678+00	\N
43	3	52	t	active	2024-05-29 20:28:31+00	2026-06-22 22:36:34.681+00	\N
47	3	56	t	active	2024-05-29 20:34:17+00	2026-06-22 22:36:34.685+00	\N
49	3	58	t	active	2024-05-29 20:37:57+00	2026-06-22 22:36:34.688+00	\N
51	3	60	t	active	2024-05-29 20:41:26+00	2026-06-22 22:36:34.695+00	\N
57	3	66	t	active	2024-05-29 20:58:34+00	2026-06-22 22:36:34.698+00	\N
58	3	67	t	active	2024-05-29 21:01:28+00	2026-06-22 22:36:34.701+00	\N
60	3	69	t	active	2024-05-29 21:04:43+00	2026-06-22 22:36:34.704+00	\N
62	3	71	t	active	2024-05-29 21:08:31+00	2026-06-22 22:36:34.706+00	\N
64	3	73	t	active	2024-05-29 21:10:44+00	2026-06-22 22:36:34.708+00	\N
65	3	74	t	active	2024-05-29 21:12:57+00	2026-06-22 22:36:34.71+00	\N
66	3	75	t	active	2024-05-29 21:14:18+00	2026-06-22 22:36:34.713+00	\N
73	3	82	t	active	2024-05-29 21:30:20+00	2026-06-22 22:36:34.715+00	\N
74	3	83	t	active	2024-05-29 21:32:48+00	2026-06-22 22:36:34.717+00	\N
78	3	87	t	active	2024-05-29 21:37:26+00	2026-06-22 22:36:34.721+00	\N
79	3	88	t	active	2024-05-29 21:38:47+00	2026-06-22 22:36:34.725+00	\N
80	3	89	t	active	2024-05-29 21:41:11+00	2026-06-22 22:36:34.727+00	\N
82	3	91	t	active	2024-05-29 21:48:47+00	2026-06-22 22:36:34.729+00	\N
83	3	92	t	active	2024-05-29 21:50:04+00	2026-06-22 22:36:34.731+00	\N
84	3	93	t	active	2024-05-29 21:52:02+00	2026-06-22 22:36:34.733+00	\N
88	3	97	t	active	2024-05-29 22:06:13+00	2026-06-22 22:36:34.735+00	\N
90	3	99	t	active	2024-05-29 22:10:02+00	2026-06-22 22:36:34.737+00	\N
167	9	179	t	active	2026-06-06 20:02:42.215597+00	2026-06-22 22:37:16.16+00	\N
166	8	179	t	active	2026-03-17 05:39:19+00	2026-03-17 05:39:19+00	\N
168	4	5	t	active	2026-06-22 22:10:16.281795+00	2026-06-22 22:10:16.281795+00	\N
170	4	11	t	active	2026-06-22 22:10:16.28867+00	2026-06-22 22:10:16.28867+00	\N
171	4	12	t	active	2026-06-22 22:10:16.290562+00	2026-06-22 22:10:16.290562+00	\N
172	4	13	t	active	2026-06-22 22:10:16.292321+00	2026-06-22 22:10:16.292321+00	\N
173	4	14	t	active	2026-06-22 22:10:16.293912+00	2026-06-22 22:10:16.293912+00	\N
174	4	15	t	active	2026-06-22 22:10:16.295406+00	2026-06-22 22:10:16.295406+00	\N
6	3	7	t	active	2024-05-20 20:14:15+00	2026-06-22 22:36:34.406+00	\N
15	3	18	t	active	2024-05-29 19:10:56+00	2026-06-22 22:36:34.423+00	\N
50	3	59	t	active	2024-05-29 20:38:53+00	2026-06-22 22:36:34.477+00	\N
81	3	90	t	active	2024-05-29 21:43:10+00	2026-06-22 22:36:34.522+00	\N
116	3	125	t	active	2024-05-29 23:39:36+00	2026-06-22 22:36:34.573+00	\N
157	3	166	t	active	2024-07-23 21:39:48+00	2026-06-22 22:36:34.621+00	\N
37	3	44	t	active	2024-05-29 20:16:42+00	2026-06-22 22:36:34.671+00	\N
75	3	84	t	active	2024-05-29 21:33:50+00	2026-06-22 22:36:34.719+00	\N
91	3	100	t	active	2024-05-29 22:14:42+00	2026-06-22 22:36:34.739+00	\N
94	3	103	t	active	2024-05-29 22:18:34+00	2026-06-22 22:36:34.741+00	\N
97	3	106	t	active	2024-05-29 22:22:10+00	2026-06-22 22:36:34.743+00	\N
99	3	108	t	active	2024-05-29 23:10:56+00	2026-06-22 22:36:34.746+00	\N
100	3	109	t	active	2024-05-29 23:14:49+00	2026-06-22 22:36:34.748+00	\N
101	3	110	t	active	2024-05-29 23:16:16+00	2026-06-22 22:36:34.75+00	\N
102	3	111	t	active	2024-05-29 23:17:33+00	2026-06-22 22:36:34.752+00	\N
106	3	115	t	active	2024-05-29 23:22:58+00	2026-06-22 22:36:34.757+00	\N
107	3	116	t	active	2024-05-29 23:24:25+00	2026-06-22 22:36:34.76+00	\N
108	3	117	t	active	2024-05-29 23:26:27+00	2026-06-22 22:36:34.762+00	\N
111	3	120	t	active	2024-05-29 23:31:45+00	2026-06-22 22:36:34.764+00	\N
113	3	122	t	active	2024-05-29 23:35:01+00	2026-06-22 22:36:34.767+00	\N
115	3	124	t	active	2024-05-29 23:37:45+00	2026-06-22 22:36:34.77+00	\N
118	3	127	t	active	2024-05-29 23:43:18+00	2026-06-22 22:36:34.772+00	\N
119	3	128	t	active	2024-05-29 23:45:23+00	2026-06-22 22:36:34.775+00	\N
120	3	129	t	active	2024-05-29 23:46:41+00	2026-06-22 22:36:34.777+00	\N
121	3	130	t	active	2024-05-29 23:48:14+00	2026-06-22 22:36:34.78+00	\N
122	3	131	t	active	2024-05-29 23:49:20+00	2026-06-22 22:36:34.782+00	\N
123	3	132	t	active	2024-05-29 23:50:27+00	2026-06-22 22:36:34.786+00	\N
124	3	133	t	active	2024-05-29 23:52:59+00	2026-06-22 22:36:34.789+00	\N
125	3	134	t	active	2024-05-29 23:55:31+00	2026-06-22 22:36:34.791+00	\N
127	3	136	t	active	2024-05-29 23:58:53+00	2026-06-22 22:36:34.794+00	\N
128	3	137	t	active	2024-05-29 23:59:47+00	2026-06-22 22:36:34.796+00	\N
131	3	140	t	active	2024-05-30 00:03:53+00	2026-06-22 22:36:34.799+00	\N
133	3	142	t	active	2024-05-30 00:07:47+00	2026-06-22 22:36:34.802+00	\N
134	3	143	t	active	2024-05-30 00:09:38+00	2026-06-22 22:36:34.804+00	\N
136	3	145	t	active	2024-05-30 00:13:06+00	2026-06-22 22:36:34.806+00	\N
139	3	148	t	active	2024-05-30 00:19:09+00	2026-06-22 22:36:34.808+00	\N
140	3	149	t	active	2024-05-30 00:20:21+00	2026-06-22 22:36:34.81+00	\N
142	3	151	t	active	2024-05-30 00:23:35+00	2026-06-22 22:36:34.813+00	\N
144	3	153	t	active	2024-05-30 00:27:01+00	2026-06-22 22:36:34.815+00	\N
146	3	155	t	active	2024-05-30 00:29:24+00	2026-06-22 22:36:34.817+00	\N
149	3	158	t	active	2024-05-30 00:38:56+00	2026-06-22 22:36:34.819+00	\N
150	3	159	t	active	2024-05-30 00:39:52+00	2026-06-22 22:36:34.822+00	\N
153	3	162	t	active	2024-05-30 00:43:21+00	2026-06-22 22:36:34.825+00	\N
154	3	163	t	active	2024-05-30 00:44:22+00	2026-06-22 22:36:34.827+00	\N
155	3	164	t	active	2024-05-30 00:45:29+00	2026-06-22 22:36:34.83+00	\N
169	4	7	f	active	2026-06-22 22:10:16.286553+00	2026-06-22 23:40:41.374+00	\N
175	9	165	t	active	2026-06-24 20:30:10.961+00	2026-06-24 20:30:10.961+00	\N
\.


--
-- Data for Name: type_events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.type_events (id, name, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	Inasistencia	active	2024-02-20 06:10:37+00	2024-02-20 06:10:37+00	\N
2	Plan de trabajo	active	2024-02-20 06:10:37+00	2024-02-20 06:10:37+00	\N
\.


--
-- Data for Name: user_classification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_classification (id, name, status, "createdAt", "updatedAt", "deletedAt", permissions) FROM stdin;
3	Superadmin	active	2026-03-17 23:24:29+00	2026-03-17 23:24:29+00	\N	\N
1	Administrador	active	2024-02-08 09:29:35+00	2024-02-08 09:29:35+00	\N	{"paneles": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "visitas": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "informes": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "usuarios": {"ver": true, "crear": true, "editar": true, "eliminar": true}, "plan_trabajo": {"ver": true, "crear": true, "editar": true, "eliminar": true}}
2	Representante	active	2024-03-15 09:56:14+00	2024-03-15 09:56:14+00	\N	{"paneles": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "visitas": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "informes": {"ver": true, "crear": false, "editar": false, "eliminar": false}, "usuarios": {"ver": false, "crear": false, "editar": false, "eliminar": false}, "plan_trabajo": {"ver": true, "crear": true, "editar": true, "eliminar": false}}
4	Coordinador	active	2026-06-05 23:35:18.037022+00	2026-06-05 23:35:18.037022+00	\N	{"paneles": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "visitas": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "informes": {"ver": true, "crear": true, "editar": true, "eliminar": false}, "usuarios": {"ver": true, "crear": false, "editar": false, "eliminar": false}, "plan_trabajo": {"ver": true, "crear": true, "editar": true, "eliminar": false}}
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, "firstName", "lastName", email, phone, mobile, password, category, "classificationId", "regionId", shortcuts, status, "createdAt", "updatedAt", "deletedAt", "coordinatorId", permissions, "twoFactorEnabled", "twoFactorSecret", "twoFactorMethod", "email2FactorCode", "email2FactorExpires") FROM stdin;
3	Jhordan	Rodriguez	jhordan.alexis1@gmail.com	\N		$2a$10$cVt22oFjVPBOL6Uuxt7QnenMmNoUfB9l6Bz5B/VOoudU3tAVPN5TS		2	14	[]	active	2024-03-18 23:54:53+00	2024-03-18 23:54:53+00	\N	\N	\N	f	\N	totp	\N	\N
4	Luisa 	Castaño	analista.comercial@laboratorioophtha.com	3006280282	3006280282	$2a$10$5rFg4t7Ob5cL8KCB8XrUguKiU9LXUYrM3HJ/lcUXoRcxdIZ6BEH36		1	1	[]	active	2024-03-23 00:59:29+00	2024-03-23 00:59:29+00	\N	\N	\N	f	\N	totp	\N	\N
6	Angel	Tenjo	gabriel.tenjo@laboratorioophtha.com	3102275919	3102275919	$2a$10$kB5q4izAHjIFc2JHBa9/Cu873NZGcD01jQDXKkKkn4BZAqO2OHjs6	Junior	2	3	[]	active	2024-03-23 01:01:27+00	2024-05-20 20:04:44+00	\N	\N	\N	f	\N	totp	\N	\N
8	Cindy	Rincon	cindy.rincon@laboratorioophtha.com	318 3775491	318 3775491	$2a$10$ZBaboXvdivhwJp9RuXUxteeWV2Q/gJzoqih2ulIm8/yDip3N7KP96	\N	2	13	[]	active	2024-05-28 18:22:35+00	2024-05-28 18:22:35+00	\N	\N	\N	f	\N	totp	\N	\N
15	Todo	Venta	gerencia@todoventa.com	3045558469	3045558469	$2a$10$uywIe..DXHnKwkoK1GEbG.8/em35sOrpI7R4D17mYbCjpHM.HukK6	Junior	2	1	\N	active	2026-01-20 19:43:50+00	2026-01-20 19:43:50+00	\N	\N	\N	f	\N	totp	\N	\N
17	Juan Diego	Echeverri	jecheverri@cidenet.com.co	301 5794837	301 5794837	$2a$10$aldz8u93TjCHnqKC4TIKR.LsfCgOFRVtiGL9XZ/HJlWj7xB0A/bk6	Coordinador	1	1	\N	active	2026-03-09 21:04:01+00	2026-03-17 05:10:22+00	\N	\N	\N	f	\N	totp	\N	\N
18	Juan Diego	Echeverri	jdecheverrimesa@gmail.com	3015794837	3015794837	$2a$10$2O5rQ9y6KWx5Um08YIWx7.BY0tvBfZWMpgEZG47vQP8jicbCNFuii	Junior	2	1	\N	active	2026-03-09 21:08:52+00	2026-03-17 05:10:58+00	\N	\N	\N	f	\N	totp	\N	\N
19	Juan	Mesa	dosecheverris@gmail.com	3015790000	3015794800	$2a$10$s5QzJrRVGlpoWXnQQKz6OuqScMDfxFO.S3KfQItCGjxajX2TkZEDC	Coordinador	2	1	\N	active	2026-03-17 05:18:01+00	2026-03-17 05:18:01+00	\N	\N	\N	f	\N	totp	\N	\N
7	Sistemas	Ophtha	sistemas@laboratorioophtha.com			$2a$10$uywIe..DXHnKwkoK1GEbG.8/em35sOrpI7R4D17mYbCjpHM.HukK6	\N	1	1	[]	active	2024-05-07 18:37:15+00	2025-04-22 18:52:23+00	\N	\N	\N	f	\N	totp	\N	\N
1	Jhordan A	Rodriguez	jrodriguez@codemasterdev.co			$2a$10$phIybpr8rEHLr97XlgNU8OYj5VUdsD8E3WGzImQF8zK.sSzU0HkgO		1	1	["reports-component"]	active	2024-02-08 08:55:42+00	2025-08-30 04:19:23+00	\N	\N	\N	f	\N	totp	\N	\N
2	Cesar 	Mendoza	cesar@gmail.com			$2a$10$phIybpr8rEHLr97XlgNU8OYj5VUdsD8E3WGzImQF8zK.sSzU0HkgO		2	1	[]	active	2024-02-08 08:55:42+00	2024-05-21 23:44:32+00	\N	\N	\N	f	\N	totp	\N	\N
22	Hector 	Alvarez	gerencia@siev.co	3175025238	3175025238	$2a$10$xvs7mYwGkEYViL9YCk03teb1IJiUryk1rikqYf933UeDSCv0ExBYy	Coordinador	2	1	\N	active	2026-04-06 19:44:50+00	2026-06-24 21:08:48.209+00	\N	\N	\N	f	\N	totp	\N	\N
12	Johana 	Londoño Muñoz	comunicaciones@laboratorioophtha.com	3153031818	3153031818	$2a$10$kFzbxh/u33b6UEKsEZmSauTg9D0FMfZ9kBTBq7rehMbEJxZBObgAe	\N	1	1	[]	active	2024-06-11 19:36:47+00	2026-06-24 21:15:25.08+00	\N	\N	\N	f	\N	totp	\N	\N
\.


--
-- Data for Name: visits; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.visits (id, "typeId", "thirdId", "userId", date, objective, comment, status, "createdAt", "updatedAt", "deletedAt", latitude, longitude, "isVerified") FROM stdin;
1	2	5	3	2024-03-20 16:30:00+00	Visita almacen	Visita almacen	active	2024-03-20 19:35:53+00	2024-03-20 19:35:53+00	\N	\N	\N	f
2	1	2	1	2024-04-18 17:15:00+00	Visita prueba	Visita prueba 2	active	2024-04-19 03:48:27+00	2024-08-05 22:21:36+00	\N	\N	\N	f
3	1	2	2	2024-04-18 18:30:00+00	>Test pruebas	>Test pruebas	active	2024-04-19 03:55:25+00	2024-08-28 08:06:06+00	\N	\N	\N	f
4	1	6	6	2024-04-11 20:00:00+00	Visita médica	Prueba	active	2024-05-20 20:06:15+00	2024-05-20 20:08:11+00	\N	\N	\N	f
5	1	6	6	2024-04-24 20:00:00+00	Visita # 2	Visita médica	active	2024-05-20 20:08:53+00	2024-05-20 20:08:53+00	\N	\N	\N	f
6	1	6	6	2024-05-09 20:00:00+00	Prueba	Prueba	active	2024-05-20 20:09:48+00	2024-05-20 20:09:48+00	\N	\N	\N	f
7	1	6	6	2024-05-20 20:00:00+00	Prueba	Prueba	active	2024-05-20 20:10:24+00	2024-06-11 19:27:31+00	\N	\N	\N	f
8	1	12	6	2024-06-07 10:00:00+00	prueba 11/06/2024	prueba 11/06/2024	active	2024-06-11 19:28:25+00	2024-06-11 19:28:25+00	\N	\N	\N	f
9	1	7	6	2024-07-24 10:00:00+00	Prueba 5 de julio	prueba	active	2024-07-05 21:52:05+00	2024-07-23 21:34:02+00	\N	\N	\N	f
10	1	47	6	2024-07-05 10:00:00+00	prueba 5 de julio	prueba	active	2024-07-05 21:52:35+00	2024-07-05 21:52:35+00	\N	\N	\N	f
11	1	6	6	2024-07-05 10:00:00+00	prueba		active	2024-07-05 22:09:21+00	2024-07-05 22:09:21+00	\N	\N	\N	f
12	1	6	6	2024-07-05 10:00:00+00	prueba		active	2024-07-05 22:14:43+00	2024-07-05 22:14:43+00	\N	\N	\N	f
13	3	3	2	2024-07-11 10:00:00+00	prueba s	pruebas	active	2024-07-11 17:46:10+00	2024-08-28 08:06:00+00	\N	\N	\N	f
14	1	2	2	2024-07-11 10:00:00+00	prueba	prueba	active	2024-07-11 17:46:49+00	2024-07-11 17:46:49+00	\N	\N	\N	f
15	3	4	2	2024-07-11 10:00:00+00	dbdb	test	active	2024-07-11 17:47:40+00	2024-08-05 21:19:52+00	\N	\N	\N	f
16	3	3	2	2024-10-04 10:00:00+00	visita cliente	visita cliente	active	2024-10-03 22:19:00+00	2024-10-03 22:19:00+00	\N	\N	\N	f
17	1	2	2	2024-10-15 10:00:00+00	venta	ventab tdwta f	active	2024-10-15 19:31:21+00	2024-10-15 19:31:38+00	\N	\N	\N	f
19	2	167	3	2026-03-31 08:04:58.31+00	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:33.715098+00	2026-06-06 22:07:33.715098+00	\N	6.275070598613847	-75.56867899440884	t
20	1	166	6	2026-04-06 07:15:56.511+00	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:33.959943+00	2026-06-06 22:07:33.959943+00	\N	6.229707778303489	-75.60808438954491	t
21	1	164	6	2026-01-04 16:15:10.495+00	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:33.961808+00	2026-06-06 22:07:33.961808+00	\N	5.573398238729541	-73.33432351489526	f
22	1	164	6	2026-01-18 02:10:31.173+00	Validación de rotación de stock de colirios	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:33.963455+00	2026-06-06 22:07:33.963455+00	\N	5.573142336146711	-73.33409218282453	t
23	1	164	6	2026-05-13 15:29:01.876+00	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:33.965017+00	2026-06-06 22:07:33.965017+00	\N	5.573320460125669	-73.33404902049233	t
24	1	163	6	2026-02-26 03:47:09.11+00	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:33.967697+00	2026-06-06 22:07:33.967697+00	\N	5.512087206603784	-73.39218395181818	t
25	1	162	6	2026-02-25 16:15:48.994+00	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:33.969751+00	2026-06-06 22:07:33.969751+00	\N	5.5326260595633	-73.38424720401828	f
26	1	162	6	2026-04-22 16:28:55.745+00	Validación de rotación de stock de colirios	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:33.971034+00	2026-06-06 22:07:33.971034+00	\N	5.533158611178817	-73.38337543266657	f
27	1	162	6	2026-01-31 03:07:19.476+00	Visita de fidelización y entrega de muestras médicas	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:33.972702+00	2026-06-06 22:07:33.972702+00	\N	5.532547177451196	-73.3843084549104	t
28	1	129	6	2026-02-02 22:58:01.711+00	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:33.976679+00	2026-06-06 22:07:33.976679+00	\N	5.555762881795343	-73.40614556112584	f
29	1	129	6	2026-02-02 19:13:10.798+00	Presentación de literatura científica del nuevo lubricante ocular	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:33.985169+00	2026-06-06 22:07:33.985169+00	\N	5.556101155183961	-73.40652080886912	f
30	1	110	6	2026-04-03 14:29:34.772+00	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:33.986873+00	2026-06-06 22:07:33.986873+00	\N	5.567823207133735	-73.35596139327058	t
31	1	84	6	2026-06-02 13:04:55.501+00	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:33.990194+00	2026-06-06 22:07:33.990194+00	\N	5.555715186651527	-73.386780881427	t
32	1	82	6	2026-01-05 09:13:28.443+00	Validación de rotación de stock de colirios	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:33.99158+00	2026-06-06 22:07:33.99158+00	\N	5.504485365737907	-73.3861064825412	f
33	1	73	6	2026-01-22 19:35:40.833+00	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:33.993862+00	2026-06-06 22:07:33.993862+00	\N	5.552989309907701	-73.35214238430224	f
34	1	73	6	2026-03-16 10:54:18.347+00	Presentación de la nueva línea oftálmica Kaizen	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.025691+00	2026-06-06 22:07:34.025691+00	\N	5.553526561627817	-73.35244218734718	f
35	1	45	6	2026-04-26 07:16:04.552+00	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.026974+00	2026-06-06 22:07:34.026974+00	\N	5.499976289144929	-73.3825937278337	f
36	1	45	6	2026-05-17 19:19:57.473+00	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.02795+00	2026-06-06 22:07:34.02795+00	\N	5.4999514267208784	-73.38271889137235	t
37	1	45	6	2026-02-23 15:03:10.368+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.029152+00	2026-06-06 22:07:34.029152+00	\N	5.499983680594964	-73.3825565641491	t
38	1	44	6	2026-03-04 17:34:49.268+00	Revisión de acuerdos comerciales y pedidos especiales	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.030605+00	2026-06-06 22:07:34.030605+00	\N	5.5202910067400355	-73.35572478862555	t
39	1	39	6	2026-01-20 04:17:27.466+00	Presentación de la nueva línea oftálmica Kaizen	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.032532+00	2026-06-06 22:07:34.032532+00	\N	5.51823321551344	-73.4026484531619	t
40	1	30	6	2026-03-15 23:21:08.204+00	Revisión de acuerdos comerciales y pedidos especiales	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.03392+00	2026-06-06 22:07:34.03392+00	\N	5.517187212545624	-73.36503716622623	t
41	1	30	6	2026-05-15 11:04:34.061+00	Visita de fidelización y entrega de muestras médicas	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.035203+00	2026-06-06 22:07:34.035203+00	\N	5.51702816139971	-73.3643921480837	t
42	1	159	6	2026-01-12 21:23:15.254+00	Revisión de acuerdos comerciales y pedidos especiales	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.036345+00	2026-06-06 22:07:34.036345+00	\N	5.54091339453309	-73.33551984640778	f
43	1	159	6	2026-01-25 07:38:09.505+00	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.03834+00	2026-06-06 22:07:34.03834+00	\N	5.541241084697727	-73.33614939952892	t
44	1	159	6	2026-04-11 12:26:22.924+00	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.054125+00	2026-06-06 22:07:34.054125+00	\N	5.541197370793645	-73.33631001520504	t
45	1	158	6	2026-05-10 12:58:22.931+00	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.055648+00	2026-06-06 22:07:34.055648+00	\N	5.529859407113377	-73.33013214358596	t
46	1	155	6	2026-05-28 18:07:42.546+00	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.056789+00	2026-06-06 22:07:34.056789+00	\N	5.524210947991092	-73.39085137055629	t
47	1	155	6	2026-04-11 12:51:12.307+00	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.058045+00	2026-06-06 22:07:34.058045+00	\N	5.524878725006197	-73.39107444960536	t
48	1	155	6	2026-02-23 20:54:47.473+00	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.060061+00	2026-06-06 22:07:34.060061+00	\N	5.5248800055466285	-73.39087120519001	f
49	1	151	6	2026-01-02 23:43:47.664+00	Validación de rotación de stock de colirios	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.062154+00	2026-06-06 22:07:34.062154+00	\N	5.525720200832544	-73.35423393127559	t
50	1	151	6	2026-02-13 04:02:37.695+00	Validación de rotación de stock de colirios	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.063832+00	2026-06-06 22:07:34.063832+00	\N	5.525891704096822	-73.35496337136908	f
51	1	149	6	2026-03-20 19:23:06.485+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.065191+00	2026-06-06 22:07:34.065191+00	\N	5.523465448147624	-73.33071834127767	f
52	1	149	6	2026-06-05 21:58:18.022+00	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.066251+00	2026-06-06 22:07:34.066251+00	\N	5.522995334345698	-73.331001021443	t
53	1	148	6	2026-05-20 00:50:02.073+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.067394+00	2026-06-06 22:07:34.067394+00	\N	5.568574598131166	-73.38769346156779	t
54	1	148	6	2026-05-04 02:25:17.156+00	Validación de rotación de stock de colirios	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.068636+00	2026-06-06 22:07:34.068636+00	\N	5.5686611046782115	-73.38731529784307	t
55	1	145	6	2026-01-08 18:24:36.343+00	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.070494+00	2026-06-06 22:07:34.070494+00	\N	5.51985460462472	-73.35637008171928	t
56	1	143	6	2026-05-31 04:31:37.623+00	Revisión de acuerdos comerciales y pedidos especiales	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.071803+00	2026-06-06 22:07:34.071803+00	\N	5.550438454469528	-73.33906455824642	t
57	1	143	6	2026-06-01 10:27:48.747+00	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.07344+00	2026-06-06 22:07:34.07344+00	\N	5.5504284491170095	-73.33847489836936	t
58	1	140	6	2026-05-17 13:35:06.264+00	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.077568+00	2026-06-06 22:07:34.077568+00	\N	5.538299519867264	-73.40422432251015	f
59	1	140	6	2026-05-07 13:02:12.825+00	Visita de fidelización y entrega de muestras médicas	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.079443+00	2026-06-06 22:07:34.079443+00	\N	5.538361195352838	-73.40465400926038	f
60	1	134	6	2026-04-27 21:55:15.56+00	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.08137+00	2026-06-06 22:07:34.08137+00	\N	5.569041694391805	-73.35574782649442	t
61	1	134	6	2026-03-27 12:16:11.023+00	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.082624+00	2026-06-06 22:07:34.082624+00	\N	5.568172991709358	-73.35636714118311	t
62	1	133	6	2026-05-31 19:01:01.619+00	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.083685+00	2026-06-06 22:07:34.083685+00	\N	5.559265742078805	-73.38409834753307	t
63	1	132	6	2026-03-27 17:19:12.947+00	Presentación de literatura científica del nuevo lubricante ocular	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.084789+00	2026-06-06 22:07:34.084789+00	\N	5.502262601473503	-73.38226689947558	f
64	1	127	6	2026-02-05 07:15:04.244+00	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.085921+00	2026-06-06 22:07:34.085921+00	\N	5.508866548839446	-73.36723394806134	f
65	1	122	6	2026-04-26 19:41:27.261+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.087526+00	2026-06-06 22:07:34.087526+00	\N	5.553603218435709	-73.33045523550513	f
66	1	122	6	2026-01-30 08:41:39.064+00	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.089701+00	2026-06-06 22:07:34.089701+00	\N	5.5543360120913565	-73.33062548298135	t
67	1	122	6	2026-05-12 01:15:19.186+00	Visita de fidelización y entrega de muestras médicas	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.09084+00	2026-06-06 22:07:34.09084+00	\N	5.554566305476427	-73.33056288911212	f
68	1	120	6	2026-03-09 00:47:05.736+00	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.092768+00	2026-06-06 22:07:34.092768+00	\N	5.526011661394069	-73.33049646613189	f
69	1	120	6	2026-02-14 14:24:41.554+00	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.094103+00	2026-06-06 22:07:34.094103+00	\N	5.52554958476253	-73.3303419183093	f
70	1	120	6	2026-05-06 13:41:20.663+00	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.095285+00	2026-06-06 22:07:34.095285+00	\N	5.5256259397518726	-73.33003513106021	t
71	1	117	6	2026-01-16 05:42:14.229+00	Validación de rotación de stock de colirios	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.096653+00	2026-06-06 22:07:34.096653+00	\N	5.50946016106657	-73.37399502009406	f
72	1	115	6	2026-03-19 01:03:25.272+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.097835+00	2026-06-06 22:07:34.097835+00	\N	5.507031856468756	-73.40601677251504	t
73	1	109	6	2026-05-17 07:45:03.468+00	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.099003+00	2026-06-06 22:07:34.099003+00	\N	5.563920622295988	-73.3383261459782	f
74	1	109	6	2026-03-28 04:51:55.814+00	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.101784+00	2026-06-06 22:07:34.101784+00	\N	5.5634349452595595	-73.33773808504209	t
75	1	109	6	2026-02-05 16:22:02.075+00	Presentación de la nueva línea oftálmica Kaizen	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.107145+00	2026-06-06 22:07:34.107145+00	\N	5.563506726089174	-73.33795022021083	f
76	1	108	6	2026-03-14 16:50:11.418+00	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.109527+00	2026-06-06 22:07:34.109527+00	\N	5.535610787642657	-73.34669262204264	t
77	1	106	6	2026-04-12 22:00:40.296+00	Revisión de acuerdos comerciales y pedidos especiales	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.110613+00	2026-06-06 22:07:34.110613+00	\N	5.564536468297875	-73.33873759292933	t
78	1	103	6	2026-03-20 06:01:25.78+00	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.111471+00	2026-06-06 22:07:34.111471+00	\N	5.500143310800535	-73.36067598403626	t
79	1	103	6	2026-05-02 21:13:45.037+00	Visita de fidelización y entrega de muestras médicas	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.112374+00	2026-06-06 22:07:34.112374+00	\N	5.500165335113338	-73.36121333358064	t
80	1	97	6	2026-04-30 13:59:58.019+00	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.113389+00	2026-06-06 22:07:34.113389+00	\N	5.519391314049386	-73.35864311311556	t
81	1	97	6	2026-01-20 06:44:55.306+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.114652+00	2026-06-06 22:07:34.114652+00	\N	5.518542630252792	-73.35901657057921	t
82	1	97	6	2026-05-29 23:47:17.908+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.115894+00	2026-06-06 22:07:34.115894+00	\N	5.518869983335228	-73.35882721940898	f
83	1	91	6	2026-04-24 10:15:41.716+00	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.117662+00	2026-06-06 22:07:34.117662+00	\N	5.56200418247217	-73.37659262329159	t
84	1	89	6	2026-01-24 08:38:16.335+00	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.118771+00	2026-06-06 22:07:34.118771+00	\N	5.546176564983803	-73.37147943335545	f
85	1	89	6	2026-03-16 19:51:10.848+00	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.122798+00	2026-06-06 22:07:34.122798+00	\N	5.545934619980101	-73.37173242462923	t
86	1	83	6	2026-04-04 18:51:11.454+00	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.124448+00	2026-06-06 22:07:34.124448+00	\N	5.506279868432382	-73.38282293724949	t
87	1	75	6	2026-05-03 12:58:05.239+00	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.125602+00	2026-06-06 22:07:34.125602+00	\N	5.497546664155427	-73.38780098389573	t
88	1	75	6	2026-01-30 00:57:03.505+00	Validación de rotación de stock de colirios	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.126627+00	2026-06-06 22:07:34.126627+00	\N	5.497881023202988	-73.38765059322775	f
89	1	74	6	2026-04-01 22:09:44.308+00	Visita de fidelización y entrega de muestras médicas	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.12761+00	2026-06-06 22:07:34.12761+00	\N	5.554329326311251	-73.40002233622644	t
90	1	71	6	2026-05-28 23:13:53.888+00	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.128599+00	2026-06-06 22:07:34.128599+00	\N	5.498047338885119	-73.4075268208332	t
91	1	71	6	2026-03-09 21:37:38.455+00	Presentación de la nueva línea oftálmica Kaizen	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.129501+00	2026-06-06 22:07:34.129501+00	\N	5.498552747035834	-73.40690669871988	t
92	1	69	6	2026-04-25 06:27:14.459+00	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.130338+00	2026-06-06 22:07:34.130338+00	\N	5.498569101709673	-73.39909121825265	t
93	1	69	6	2026-01-20 16:38:17.736+00	Presentación de literatura científica del nuevo lubricante ocular	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.131267+00	2026-06-06 22:07:34.131267+00	\N	5.498162969772682	-73.39914461645617	t
94	1	69	6	2026-05-21 09:44:16.71+00	Validación de rotación de stock de colirios	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.132225+00	2026-06-06 22:07:34.132225+00	\N	5.498221662129825	-73.39934614885748	t
95	1	67	6	2026-03-13 02:11:10.567+00	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.133767+00	2026-06-06 22:07:34.133767+00	\N	5.501594499542771	-73.37781661210303	t
96	1	67	6	2026-02-17 02:33:21.541+00	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.134796+00	2026-06-06 22:07:34.134796+00	\N	5.500697031431982	-73.37805032204966	t
97	1	67	6	2026-05-12 04:11:50.588+00	Validación de rotación de stock de colirios	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.135854+00	2026-06-06 22:07:34.135854+00	\N	5.501107240436612	-73.37786470505264	f
98	1	66	6	2026-02-21 23:13:28.366+00	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.137838+00	2026-06-06 22:07:34.137838+00	\N	5.515811092872788	-73.36016363299416	t
99	1	60	6	2026-01-28 17:13:46.356+00	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.139477+00	2026-06-06 22:07:34.139477+00	\N	5.546156663697063	-73.35041929133648	f
100	1	50	6	2026-01-08 13:55:48.296+00	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.140664+00	2026-06-06 22:07:34.140664+00	\N	5.562148771369114	-73.3281702158877	t
101	1	50	6	2026-04-23 14:39:43.255+00	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.141762+00	2026-06-06 22:07:34.141762+00	\N	5.562303519229464	-73.32845914315168	t
102	1	43	6	2026-04-24 03:33:07.51+00	Visita de fidelización y entrega de muestras médicas	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.142892+00	2026-06-06 22:07:34.142892+00	\N	5.5127493326604355	-73.4004667285952	t
103	1	42	6	2026-03-08 17:10:25.8+00	Presentación de literatura científica del nuevo lubricante ocular	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.144017+00	2026-06-06 22:07:34.144017+00	\N	5.517862806356169	-73.34461930209353	t
104	1	42	6	2026-02-01 23:43:33.168+00	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.144997+00	2026-06-06 22:07:34.144997+00	\N	5.5180454616830135	-73.34472584978195	f
105	1	42	6	2026-01-16 04:14:18.542+00	Validación de rotación de stock de colirios	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.145875+00	2026-06-06 22:07:34.145875+00	\N	5.518502943964231	-73.34498983760948	t
106	1	40	6	2026-02-22 13:50:59.878+00	Presentación de la nueva línea oftálmica Kaizen	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.146784+00	2026-06-06 22:07:34.146784+00	\N	5.50105386038995	-73.39617467727749	t
107	1	40	6	2026-01-23 04:50:20.651+00	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.1479+00	2026-06-06 22:07:34.1479+00	\N	5.501165703144933	-73.3960812645249	t
108	1	40	6	2026-02-25 21:14:52.939+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.149175+00	2026-06-06 22:07:34.149175+00	\N	5.50120551471298	-73.39597190041093	f
109	1	37	6	2026-01-03 15:22:47.003+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.150381+00	2026-06-06 22:07:34.150381+00	\N	5.556382915260296	-73.40328160850731	t
110	1	37	6	2026-01-27 16:49:57.149+00	Visita de fidelización y entrega de muestras médicas	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.151514+00	2026-06-06 22:07:34.151514+00	\N	5.5558770922141	-73.40353335053982	t
111	1	35	6	2026-05-31 06:37:59.009+00	Presentación de la nueva línea oftálmica Kaizen	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.152798+00	2026-06-06 22:07:34.152798+00	\N	5.51162967416462	-73.32918217900662	t
112	1	35	6	2026-06-02 03:35:36.769+00	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.154206+00	2026-06-06 22:07:34.154206+00	\N	5.511594660293912	-73.32914217839057	t
113	1	32	6	2026-01-11 09:29:01.749+00	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.155821+00	2026-06-06 22:07:34.155821+00	\N	5.524925036797201	-73.32967841544489	t
114	1	21	6	2026-01-11 02:40:40.82+00	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.156868+00	2026-06-06 22:07:34.156868+00	\N	5.502014032080204	-73.38699758810867	f
115	1	20	6	2026-03-27 11:59:50.722+00	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.157984+00	2026-06-06 22:07:34.157984+00	\N	5.498345554427351	-73.34231623659582	f
116	1	20	6	2026-04-26 13:52:46.957+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.15897+00	2026-06-06 22:07:34.15897+00	\N	5.49843258656556	-73.34213743406914	f
117	1	17	6	2026-05-28 21:16:08.515+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.159941+00	2026-06-06 22:07:34.159941+00	\N	5.548959523540284	-73.34905567595652	t
118	1	16	6	2026-05-16 13:32:22.872+00	Validación de rotación de stock de colirios	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.160992+00	2026-06-06 22:07:34.160992+00	\N	5.567758417688396	-73.3423918470769	f
119	1	16	6	2026-02-15 21:49:07.347+00	Revisión de acuerdos comerciales y pedidos especiales	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.162318+00	2026-06-06 22:07:34.162318+00	\N	5.567390849933763	-73.34238625097389	t
120	1	16	6	2026-04-30 17:13:57.601+00	Presentación de literatura científica del nuevo lubricante ocular	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.163793+00	2026-06-06 22:07:34.163793+00	\N	5.567412552891699	-73.34228886720763	t
121	1	15	6	2026-05-07 09:38:45.252+00	Validación de rotación de stock de colirios	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.164885+00	2026-06-06 22:07:34.164885+00	\N	5.522769440383324	-73.33235869727962	t
122	1	15	6	2026-03-17 18:33:39.784+00	Presentación de la nueva línea oftálmica Kaizen	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.165862+00	2026-06-06 22:07:34.165862+00	\N	5.522267304103933	-73.3327884141343	t
123	1	15	6	2026-02-10 21:08:39.847+00	Seguimiento al uso de productos Ophtha en pacientes con glaucoma	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.166935+00	2026-06-06 22:07:34.166935+00	\N	5.522313164900815	-73.3325273048567	t
124	1	14	6	2026-01-14 03:37:27.154+00	Visita de fidelización y entrega de muestras médicas	Visita exitosa, el doctor empezará a prescribir la marca a partir de esta semana.	active	2026-06-06 22:07:34.168087+00	2026-06-06 22:07:34.168087+00	\N	5.514634000231655	-73.37818534138898	t
125	1	12	6	2026-05-17 13:49:29.02+00	Presentación de literatura científica del nuevo lubricante ocular	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.169242+00	2026-06-06 22:07:34.169242+00	\N	5.539508902063219	-73.33224747833859	t
126	1	7	6	2026-05-14 03:46:13.749+00	Revisión de acuerdos comerciales y pedidos especiales	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.170321+00	2026-06-06 22:07:34.170321+00	\N	5.570025594237849	-73.40299539316776	t
127	1	7	6	2026-05-27 10:35:38.166+00	Presentación de la nueva línea oftálmica Kaizen	Se aclararon dudas sobre la posología y los efectos secundarios del medicamento.	active	2026-06-06 22:07:34.171509+00	2026-06-06 22:07:34.171509+00	\N	5.569907359837431	-73.40318618201921	f
128	1	158	18	2026-04-19 05:10:21.096+00	Revisión de acuerdos comerciales y pedidos especiales	El médico muestra mucho interés en el nuevo colirio, solicita más muestras médicas para sus pacientes.	active	2026-06-06 22:07:34.172439+00	2026-06-06 22:07:34.172439+00	\N	5.530450198541441	-73.33003023287874	t
129	1	158	18	2026-04-07 14:25:30.089+00	Presentación de literatura científica del nuevo lubricante ocular	Se concertó una charla informativa para el personal de la farmacia para el próximo mes.	active	2026-06-06 22:07:34.173514+00	2026-06-06 22:07:34.173514+00	\N	5.530388644087591	-73.32977450364203	f
130	1	158	18	2026-04-19 14:45:24.597+00	Visita de fidelización y entrega de muestras médicas	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.174507+00	2026-06-06 22:07:34.174507+00	\N	5.530053682967958	-73.3302026965761	t
131	1	179	19	2026-04-26 05:37:13.833+00	Presentación de literatura científica del nuevo lubricante ocular	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.175444+00	2026-06-06 22:07:34.175444+00	\N	6.273404452905528	-75.56119653714607	f
132	1	179	19	2026-01-05 08:59:17.322+00	Presentación de literatura científica del nuevo lubricante ocular	El cliente solicita descuento especial para pedidos de volumen alto.	active	2026-06-06 22:07:34.176465+00	2026-06-06 22:07:34.176465+00	\N	6.273476281879638	-75.5614266199295	t
133	1	179	19	2026-03-26 01:58:05.481+00	Visita de fidelización y entrega de muestras médicas	Se valida que el inventario está al día, el farmacéutico reporta buena rotación del producto.	active	2026-06-06 22:07:34.177645+00	2026-06-06 22:07:34.177645+00	\N	6.27365434383916	-75.56089845710528	t
201	1	5	12	2026-06-18 14:30:00+00	Presentación de la nueva línea de lentes de contacto premium	El cliente se mostró receptivo y solicitó cotización de 50 unidades.	active	2026-06-22 22:10:16.297489+00	2026-06-22 22:10:16.297489+00	\N	\N	\N	f
202	1	7	12	2026-06-20 10:00:00+00	Seguimiento de orden de compra pendiente	Se resolvió la duda de logística, el pedido llegará esta misma semana.	active	2026-06-22 22:10:16.300211+00	2026-06-22 22:10:16.300211+00	\N	\N	\N	f
203	1	11	12	2026-06-22 16:00:00+00	Entrega de material publicitario y cartillas Kaizen	Se instalaron los nuevos exhibidores en el local principal.	active	2026-06-22 22:10:16.302279+00	2026-06-22 22:10:16.302279+00	\N	\N	\N	f
\.


--
-- Data for Name: workplans; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.workplans (id, "userId", "typeEventId", "startDate", "endDate", description, status, "createdAt", "updatedAt", "deletedAt") FROM stdin;
1	2	1	2024-03-20 16:00:00+00	2024-03-20 16:00:00+00	vacaciones x	active	2024-03-20 17:07:51+00	2024-08-28 08:05:22+00	\N
2	2	2	2024-03-20 10:00:00+00	2024-03-20 10:00:00+00	trabajo completo x\nDSVSV	active	2024-03-20 17:08:39+00	2024-08-28 08:05:16+00	\N
3	2	2	2024-04-02 10:00:00+00	2024-04-02 10:00:00+00	Antioquia d	active	2024-03-20 17:23:16+00	2024-08-28 08:04:25+00	\N
4	2	2	2024-03-03 10:00:00+00	2024-03-03 10:00:00+00	esgdh 	active	2024-03-20 17:24:36+00	2024-03-20 17:24:36+00	\N
5	2	2	2024-03-20 10:00:00+00	2024-03-20 10:00:00+00	rxctvbnmxx	active	2024-03-20 17:35:48+00	2024-08-28 08:04:58+00	\N
6	2	2	2024-03-31 10:00:00+00	2024-03-31 22:00:00+00	sdxfcvbnm,	active	2024-03-20 17:39:19+00	2024-03-20 17:39:19+00	\N
7	2	1	2024-03-31 10:00:00+00	2024-03-31 10:00:00+00	prueba xxxxz s	active	2024-03-20 17:44:00+00	2024-08-28 08:09:51+00	\N
8	1	1	2024-03-22 10:00:00+00	2024-03-22 22:30:00+00	prueba	active	2024-03-20 18:34:15+00	2024-03-20 18:34:15+00	\N
9	6	2	2024-07-08 18:00:00+00	2024-07-08 10:00:00+00	Dra. XX	active	2024-07-05 22:19:00+00	2024-07-05 22:19:00+00	\N
10	6	1	2024-07-03 17:00:00+00	2024-07-03 17:00:00+00	DIA DE LA FAMILIA 	active	2024-07-05 22:51:13+00	2024-08-28 08:03:55+00	\N
11	1	1	2024-08-06 10:00:00+00	2024-08-06 10:00:00+00	 test ina aa ss	active	2024-08-05 21:26:36+00	2024-08-05 21:38:14+00	\N
12	2	2	2024-08-28 10:00:00+00	2024-08-28 10:00:00+00	Cesar ds	active	2024-08-28 08:08:55+00	2024-08-28 08:09:19+00	\N
13	2	1	2024-06-04 10:00:00+00	2024-06-04 10:00:00+00	cesa vaca	active	2024-08-28 08:10:14+00	2024-08-28 08:10:14+00	\N
14	2	1	2024-10-15 16:00:00+00	2024-10-18 16:00:00+00	Test Inasistencia	active	2024-10-03 22:21:39+00	2024-10-03 22:21:39+00	\N
15	2	2	2024-10-04 17:30:00+00	2024-10-05 04:00:00+00	Plan de trabajo	active	2024-10-03 22:22:28+00	2024-10-03 22:22:28+00	\N
16	17	2	2026-03-13 10:00:00+00	2026-03-19 10:00:00+00	Plan Semana	active	2026-03-12 10:50:10+00	2026-03-12 10:50:10+00	\N
17	17	2	2026-02-22 10:00:00+00	2026-02-27 10:00:00+00	Plan de Trabajo Febrero	active	2026-03-12 17:52:15+00	2026-03-12 17:52:15+00	\N
18	18	2	2026-02-08 10:00:00+00	2026-02-13 10:00:00+00	Plan febrero	active	2026-03-17 05:14:54+00	2026-03-17 05:14:54+00	\N
19	2	2	2026-06-01 08:00:00+00	2026-06-05 18:00:00+00	Plan de trabajo semanal - Bogotá	active	2026-06-07 00:06:29.451025+00	2026-06-07 00:06:29.451025+00	\N
20	8	2	2026-06-02 08:00:00+00	2026-06-06 18:00:00+00	Plan de trabajo semanal - Medellín	active	2026-06-07 00:06:29.54833+00	2026-06-07 00:06:29.54833+00	\N
21	6	1	2026-06-03 08:00:00+00	2026-06-03 18:00:00+00	Incapacidad médica por control odontológico	active	2026-06-07 00:06:29.553546+00	2026-06-07 00:06:29.553546+00	\N
22	18	2	2026-06-01 08:00:00+00	2026-06-04 18:00:00+00	Visitas de campo y fidelización - Cali	active	2026-06-07 00:06:29.557523+00	2026-06-07 00:06:29.557523+00	\N
23	19	2	2026-06-02 08:00:00+00	2026-06-05 18:00:00+00	Ruta comercial zona norte	active	2026-06-07 00:06:29.560076+00	2026-06-07 00:06:29.560076+00	\N
202	12	2	2026-06-22 08:00:00+00	2026-06-26 18:00:00+00	Revisión y acompañamiento del plan de visitas de representantes	active	2026-06-22 22:10:16.30709+00	2026-06-22 22:10:16.30709+00	\N
201	12	2	2026-06-15 08:00:00+00	2026-06-19 18:00:00+00	Supervisión y auditoría en clínicas de Antioquia, desde el inicio	active	2026-06-22 22:10:16.304555+00	2026-06-22 22:10:55.627+00	\N
203	12	1	2026-06-24 08:00:00+00	2026-06-24 11:00:00+00	probando	active	2026-06-24 20:19:28.242+00	2026-06-24 20:19:28.242+00	\N
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

SELECT pg_catalog.setval('public.justifications_id_seq', 208, true);


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

SELECT pg_catalog.setval('public.session_logs_id_seq', 31, true);


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

SELECT pg_catalog.setval('public.thirds_portfolios_id_seq', 175, true);


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

SELECT pg_catalog.setval('public.visits_id_seq', 203, true);


--
-- Name: workplans_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.workplans_id_seq', 203, true);


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

\unrestrict s2cYALDdOaBPotsyUo1UQHWZV9jgsDXPEeraVpLdygRJgEhOvAnultr1Ro2JyNh

