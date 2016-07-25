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
-- Name: desafio_fdex_test; Type: DATABASE; Schema: -; Owner: nodejs
--

CREATE DATABASE desafio_fdex_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';


ALTER DATABASE desafio_fdex_test OWNER TO nodejs;

\connect desafio_fdex_test

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
1	3	Livro de java	Teste automatizado de inserção com falhas	129.99	2016-07-25 14:27:03.256342	2016-07-25 14:27:03.256342
2	3	Livro de java	Teste automatizado de inserção com falhas	129.99	2016-07-25 14:27:29.03338	2016-07-25 14:27:29.03338
3	3	Livro de java	Teste automatizado de inserção com falhas	129.99	2016-07-25 14:29:04.067201	2016-07-25 14:29:04.067201
4	3	Livro de java	Teste automatizado de inserção com falhas	129.99	2016-07-25 14:30:31.226793	2016-07-25 14:30:31.226793
5	3	Livro de java	Teste automatizado de inserção com falhas	129.99	2016-07-25 14:31:05.334764	2016-07-25 14:31:05.334764
\.


--
-- Name: lista_desejos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('lista_desejos_id_seq', 5, true);


--
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: nodejs
--

COPY usuario (id, nome, email, senha, data_criacao, data_atualizacao, endereco) FROM stdin;
1	Edwi Feitoza	edi_rock@hotmail.com	$2a$10$hGYGtNrATW.MbLJd1uZot.gpxhk.10OH5GaqUAn6OrBrlRAOUaY4G	2016-07-25 13:21:49.937319	2016-07-25 13:21:49.937319	\N
3	Edwi Feitoza	edwi.slacker@gmail.com	$2a$10$I7xnvw.V.Bbj6P7TCjSDKe171WROND/mn/4dM6fsZel1L0TjXCXI.	2016-07-25 13:22:29.100342	2016-07-25 13:22:29.100342	\N
\.


--
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('usuario_id_seq', 3, true);


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

