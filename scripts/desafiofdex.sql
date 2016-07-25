--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: desafio_fdex; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE desafio_fdex WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';


ALTER DATABASE desafio_fdex OWNER TO postgres;

\connect desafio_fdex

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: lista_desejos; Type: TABLE; Schema: public; Owner: nodejs; Tablespace: 
--

CREATE TABLE lista_desejos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao character varying(100),
    valor_medio numeric NOT NULL,
    data_criacao timestamp without time zone,
    data_atualizacao timestamp without time zone
);


ALTER TABLE lista_desejos OWNER TO nodejs;

--
-- Name: lista_desejos_id_seq; Type: SEQUENCE; Schema: public; Owner: nodejs
--

CREATE SEQUENCE lista_desejos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE lista_desejos_id_seq OWNER TO nodejs;

--
-- Name: lista_desejos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodejs
--

ALTER SEQUENCE lista_desejos_id_seq OWNED BY lista_desejos.id;


--
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: nodejs
--

CREATE SEQUENCE usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE usuario_id_seq OWNER TO nodejs;

--
-- Name: usuario; Type: TABLE; Schema: public; Owner: nodejs; Tablespace: 
--

CREATE TABLE usuario (
    id integer DEFAULT nextval('usuario_id_seq'::regclass) NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(100) NOT NULL,
    data_criacao timestamp without time zone,
    data_atualizacao timestamp without time zone,
    endereco jsonb
);


ALTER TABLE usuario OWNER TO nodejs;

--
-- Name: id; Type: DEFAULT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY lista_desejos ALTER COLUMN id SET DEFAULT nextval('lista_desejos_id_seq'::regclass);


--
-- Data for Name: lista_desejos; Type: TABLE DATA; Schema: public; Owner: nodejs
--

COPY lista_desejos (id, usuario_id, nome, descricao, valor_medio, data_criacao, data_atualizacao) FROM stdin;
\.


--
-- Name: lista_desejos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('lista_desejos_id_seq', 1, false);


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: nodejs
--

COPY usuario (id, nome, email, senha, data_criacao, data_atualizacao, endereco) FROM stdin;
1	Edwi Feitoza	edwi.slacker@gmail.com	$2a$10$J8.0aPq/Bs6Ax6/DKgxXN.ey0n1KYpDqwtOFwTSVgwqnPz/sZ88hG	2016-07-25 13:06:06.125789	2016-07-25 13:06:06.125789	\N
2	Livro de Node	edi_rock@hotmail.com	$2a$10$DtaDxJekqXlRp./hSiIzp.fkj7V1NDE2jVdvS4ADpsULEgoRpTlPm	2016-07-25 13:06:21.807325	2016-07-25 13:06:21.807325	\N
\.


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('usuario_id_seq', 6, true);


--
-- Name: usuario_unique_email; Type: CONSTRAINT; Schema: public; Owner: nodejs; Tablespace: 
--

ALTER TABLE ONLY usuario
    ADD CONSTRAINT usuario_unique_email UNIQUE (email);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

