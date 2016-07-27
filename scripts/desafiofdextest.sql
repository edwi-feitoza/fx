CREATE DATABASE desafio_fdex_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'pt_BR.UTF-8' LC_CTYPE = 'pt_BR.UTF-8';

ALTER DATABASE desafio_fdex OWNER TO nodejs;

\connect desafio_fdex

CREATE TABLE lista_desejos (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao character varying(100),
    valor_medio numeric NOT NULL,
    data_criacao timestamp without time zone,
    data_atualizacao timestamp without time zone
);

CREATE SEQUENCE lista_desejos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE SEQUENCE usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE usuario (
    id integer DEFAULT nextval('usuario_id_seq'::regclass) NOT NULL,
    nome character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(100) NOT NULL,
    data_criacao timestamp without time zone,
    data_atualizacao timestamp without time zone,
    endereco jsonb
);

ALTER TABLE usuario ADD CONSTRAINT usuario_unique_email UNIQUE (email);

ALTER TABLE lista_desejos ALTER COLUMN id SET DEFAULT nextval('lista_desejos_id_seq'::regclass);

ALTER TABLE usuario ALTER COLUMN id SET DEFAULT nextval('usuario_id_seq'::regclass);

ALTER SEQUENCE lista_desejos_id_seq OWNED BY usuario.id;

ALTER SEQUENCE lista_desejos_id_seq OWNED BY lista_desejos.id;

ALTER TABLE lista_desejos OWNER TO nodejs;

ALTER SEQUENCE lista_desejos_id_seq OWNER TO nodejs;

ALTER SEQUENCE usuario_id_seq OWNER TO nodejs;

ALTER TABLE usuario OWNER TO nodejs;