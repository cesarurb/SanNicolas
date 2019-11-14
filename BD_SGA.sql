drop database if exists SGA_SAN_NICOLAS;

create database SGA_SAN_NICOLAS;
use SGA_SAN_NICOLAS;
SET AUTOCOMMIT=1;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `GRADO`
-- --------------------------------------------------------
CREATE TABLE `GRADO` (
  `id` VARCHAR(32) PRIMARY KEY,
  `numeroGrado` int(1) NOT NULL,
  nivel varchar(20) NOT NULL,
  estado int(1) not null
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `GRADO`
-- --------------------------------------------------------
INSERT INTO `GRADO` VALUES
('920e7df3-01db-11ea-afdd-e4e749869830',1, 'SECUNDARIA', 1),
('9620328d-01db-11ea-afdd-e4e749869830',2, 'SECUNDARIA', 1),
('9a6d96ad-01db-11ea-afdd-e4e749869830',3, 'SECUNDARIA', 1),
('9ea4f72b-01db-11ea-afdd-e4e749869830',4, 'SECUNDARIA', 1),
('a29c371e-01db-11ea-afdd-e4e749869830',5, 'SECUNDARIA', 1);


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `SECCION`
-- --------------------------------------------------------
CREATE TABLE `SECCION` (
  `id` VARCHAR(32) PRIMARY KEY,
  `seccion` CHAR(1) NOT NULL,
  `idGrado` VARCHAR(32) NOT NULL,
  anio CHAR(4) NOT NULL,
  `turno` VARCHAR(20) NOT NULL,
  estado int(1) NOT NULL,
  FOREIGN KEY (idGrado) REFERENCES GRADO(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `SECCION`
-- --------------------------------------------------------
INSERT INTO `SECCION` VALUES
(uuid(), 'A', '920e7df3-01db-11ea-afdd-e4e749869830', '2019', 'MAÑANA', 1),
(uuid(), 'A', '9620328d-01db-11ea-afdd-e4e749869830', '2019', 'MAÑANA', 1),
('64a15e02-0698-11ea-9378-e4e74986', 'A', '9a6d96ad-01db-11ea-afdd-e4e749869830', '2019', 'MAÑANA', 1),
(uuid(), 'A', '9ea4f72b-01db-11ea-afdd-e4e749869830', '2019', 'MAÑANA', 1),
(uuid(), 'B', '9ea4f72b-01db-11ea-afdd-e4e749869830', '2019', 'TARDE', 1),
(uuid(), 'A', 'a29c371e-01db-11ea-afdd-e4e749869830', '2019', 'MAÑANA', 1),
(uuid(), 'B', 'a29c371e-01db-11ea-afdd-e4e749869830', '2019', 'TARDE', 1);


-- ----------------------------------------------------------
-- Estructura de tabla para la tabla `asignaturas`
-- ----------------------------------------------------------
CREATE TABLE `CURSO` (
  `id` VARCHAR(32) PRIMARY KEY,
  `nombre` varchar(50) NOT NULL,
  `idGrado` varchar(32) NOT NULL,
  `planDeEstudio` varchar(32) DEFAULT NULL,
  Estado int(1) NOT NULL,
  FOREIGN KEY (idGrado) REFERENCES GRADO(id)
);

-- --------------------------------------------------------
-- Volcado de datos para la tabla `CURSO`
-- --------------------------------------------------------
INSERT INTO `CURSO` VALUES
('64e6d199-0698-11ea-9378-e4e74986', 'MATEMÁTICAS','a29c371e-01db-11ea-afdd-e4e74986', NULL, 1),
(uuid(), 'MATEMÁTICAS','920e7df3-01db-11ea-afdd-e4e74986', NULL, 1),
(uuid(), 'MATEMÁTICAS','9620328d-01db-11ea-afdd-e4e74986', NULL, 1),
(uuid(), 'MATEMÁTICAS','9a6d96ad-01db-11ea-afdd-e4e74986', NULL, 1),
(uuid(), 'MATEMÁTICAS','9ea4f72b-01db-11ea-afdd-e4e74986', NULL, 1);


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `carreras`
-- --------------------------------------------------------
CREATE TABLE `carreras` (
  `idCarrera` int(11) NOT NULL,
  `NombreCarrera` varchar(50) NOT NULL
);

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `cuatrimestres`
-- --------------------------------------------------------
CREATE TABLE `cuatrimestres` (
  `idCuatrimestre` int(11) NOT NULL,
  `NombreCuatrimestre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `docente`
-- --------------------------------------------------------
CREATE TABLE `docente` (
  `id` VARCHAR(32) PRIMARY KEY,
  `dni` char(8) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `cedula` varchar(16) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(12) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `nacimiento` date not null,
  `genero` VARCHAR(9) NOT NULL,
  `ingreso` date not null,
  -- `Foto` varchar(100) DEFAULT NULL,
  `Estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `docentes`
-- --------------------------------------------------------
INSERT INTO `docente` VALUES
('65d37ef3-0698-11ea-9378-e4e74986', '12345678','JORGE', 'AZABACHE', 'SIN CÉDULA', 'jorgeazabache@hotmai.com', '987654321', 'AV. SU CASA', '1998-04-27', 'MASCULINO', NOW(), 1);


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `ASIGNACION`
-- --------------------------------------------------------
CREATE TABLE `ASIGNACION` (
  `id` VARCHAR(32) NOT NULL,
  -- `Descripcion` varchar(100) NOT NULL,
  `idDocente` VARCHAR(32) NOT NULL,
  `idCurso` VARCHAR(32) NOT NULL,
  `anio` CHAR(4) NOT NULL,
  -- `idGrupo` int(11) NOT NULL,
  `idSeccion` VARCHAR(32) NOT NULL,
  `estado` int(1) NOT NULL,
  -- `NumeroAsignacion` int(11) NOT NULL
  foreign key (idDocente) REFERENCES DOCENTE(id),
  foreign key (idCurso) REFERENCES CURSO(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into asignacion values (uuid(), '65d37ef3-0698-11ea-9378-e4e74986', '64e6d199-0698-11ea-9378-e4e74986', '2019', '64a15e02-0698-11ea-9378-e4e74986', 1);


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `entrega_tareas`
-- --------------------------------------------------------
CREATE TABLE `entrega_tareas` (
  `idEntregaTareas` int(11) NOT NULL,
  `CodigoTareaDocente` int(11) NOT NULL,
  `idEstudiante` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `CodigoEnvioTarea` int(11) NOT NULL,
  `Archivo` varchar(200) NOT NULL,
  `FechaEntrega` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `apoderado`
-- --------------------------------------------------------
CREATE TABLE `apoderado` (
  `id` VARCHAR(32) PRIMARY KEY,
  `dni` char(8) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  `Estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `apoderado`
-- --------------------------------------------------------
INSERT INTO `apoderado` VALUES
('7afe7e9c-011b-11ea-afdd-e4e74986', '12345678', 'Jorge Luis', 'Azabache Noriega', 'jorgeazabache@hotmai.com', '99999999', 'SU CASA', 1),
('7afe8d2f-011b-11ea-afdd-e4e74986', '87654321', 'Jorge', 'Azabache', 'jorgeazabache@hotmai.com', '987654321', 'SU CASA', 1);


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `ALUMNO`
-- --------------------------------------------------------
CREATE TABLE `ALUMNO` (
  `id` VARCHAR(32) NOT NULL,
  `dni` VARCHAR(8) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  nacimiento date not null,
  genero VARCHAR(9) NOT NULL,
  grupoSanguineo CHAR(3) NOT NULL,
  -- `Foto` varchar(100) DEFAULT NULL,
  `idApoderado` VARCHAR(32) NOT NULL,
  `ingreso` date not null,
  `Estado` int(1) NOT NULL,
  foreign key (idApoderado) references apoderado(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into alumno values 
(uuid(), '87654321','LUIS', 'TIRADO', 'ltirado@unitru.edu.pe', '987654321', 'depa', '1998-04-27', 'MASCULINO', 'O+','7afe7e9c-011b-11ea-afdd-e4e74986', NOW(), 1);


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `evaluaciones`
-- --------------------------------------------------------
CREATE TABLE `evaluaciones` (
  `idEvaluacion` int(11) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `idEstudiante` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `Unidad` varchar(50) NOT NULL,
  `Tarea` varchar(50) NOT NULL,
  `idDocente` int(11) NOT NULL,
  `Puntaje` int(11) NOT NULL,
  `FechaEvaluacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `inscripciones_asignaturas`
-- --------------------------------------------------------
CREATE TABLE `inscripciones_asignaturas` (
  `idInscripcion` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idEstudiante` int(11) NOT NULL,
  `fechaInscripcion` date NOT NULL,
  `observaciones` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `matricula`
-- --------------------------------------------------------
CREATE TABLE `MATRICULA` (
  `id` VARCHAR(32) NOT NULL,
  `idAlumno` VARCHAR(32) NOT NULL,
  `idSeccion` VARCHAR(32) NOT NULL,
  `anio` CHAR(4) NOT NULL,
  `fechaMatricula` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `mensajes`
-- --------------------------------------------------------
CREATE TABLE `mensajes` (
  `idMensaje` int(11) NOT NULL,
  `Remitente` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `Mensaje` varchar(500) NOT NULL,
  `FechaEnvio` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `Rol`
-- --------------------------------------------------------
CREATE TABLE `ROL` (
  `id` VARCHAR(32) PRIMARY KEY,
  `Rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `niveles`
-- --------------------------------------------------------
INSERT INTO `rol` VALUES
('b1f27357-018e-11ea-afdd-e4e74986', 'ADMINISTRADOR'),
('b1f565d0-018e-11ea-afdd-e4e74986', 'DOCENTE'),
('b1f56711-018e-11ea-afdd-e4e74986', 'ALUMNO');

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `numeros_asignaciones`
--

CREATE TABLE `numeros_asignaciones` (
  `idNumeroAsignacion` int(11) NOT NULL,
  `numeroAsignado` int(11) NOT NULL,
  `IdDocente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `planificacion_tareas`
--

CREATE TABLE `planificacion_tareas` (
  `idPlanificacion` int(11) NOT NULL,
  `idDocente` int(11) NOT NULL,
  `idNumeroAsignacion` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `Unidad` varchar(50) NOT NULL,
  `DescripcionUnidad` varchar(200) NOT NULL,
  `Tarea` varchar(50) NOT NULL,
  `DescripcionTarea` varchar(200) NOT NULL,
  `FechaPublicacion` date NOT NULL,
  `FechaPresentacion` date NOT NULL,
  `CodigoTarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `plan_estudio`
--

CREATE TABLE `plan_estudio` (
  `id` int(11) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `idCarrera` int(11) NOT NULL,
  `CantidadAsignaturas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- --------------------------------------------------------
-- Estructura de tabla para la tabla `usuario`
-- --------------------------------------------------------
CREATE TABLE `usuario` (
  `id` VARCHAR(32) PRIMARY KEY,
  `NombreUsuario` varchar(50) NOT NULL,
  `PassUsuario` varchar(50) NOT NULL,
  `idRol` VARCHAR(32) NOT NULL,
  `Nombres` varchar(50) NOT NULL,
  `Apellidos` varchar(50) NOT NULL,
  -- `Foto` varchar(100) DEFAULT NULL,
  dni char(8) not null,
  `estado` int(1) NOT NULL,
  FOREIGN KEY (`idRol`) REFERENCES ROL(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `usuario`
-- --------------------------------------------------------
INSERT INTO `usuario` VALUES
(uuid(),'ADMIN', '123', 'b1f27357-018e-11ea-afdd-e4e74986', 'ADMIN', 'ADMIN', '00000000', 1),
(uuid(), 'Jorge', '123', 'b1f565d0-018e-11ea-afdd-e4e74986', 'JORGE', 'AZABACHE', '12345678', 1),
(uuid(), 'Lusho', '123', 'b1f56711-018e-11ea-afdd-e4e74986', 'LUIS', 'TIRADO', '87654321', 1);