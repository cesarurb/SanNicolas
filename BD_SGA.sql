create database SGA_SAN_NICOLAS;
use SGA_SAN_NICOLAS;
SET AUTOCOMMIT=1;
CREATE TABLE `asignaciones` (
  `idAsignacion` int(11) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `idDocente` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idGrupo` int(11) NOT NULL,
  `idTurno` int(11) NOT NULL,
  `idHorario` int(11) NOT NULL,
  `Estado` varchar(11) NOT NULL,
  `NumeroAsignacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------------------------------------
-- Estructura de tabla para la tabla `asignaturas`
-- ----------------------------------------------------------
CREATE TABLE `asignaturas` (
  `idAsignatura` int(11) NOT NULL,
  `NombreAsignatura` varchar(50) NOT NULL,
  `Idcarrera` int(11) NOT NULL,
  `IdGrupo` int(11) NOT NULL,
  `Idcuatrimestre` int(11) NOT NULL
);

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
-- Estructura de tabla para la tabla `docentes`
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
  -- `Foto` varchar(100) DEFAULT NULL,
  `Estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `docentes`
-- --------------------------------------------------------
INSERT INTO `docente` VALUES
(uuid(), '12345678','Luis', 'Noriega', 'SIN CÉDULA', 'jorgeazabache@hotmai.com', '987654321', 'AV. SU CASA', 1);

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
-- Estructura de tabla para la tabla `estudiantes`
-- --------------------------------------------------------
CREATE TABLE `alumno` (
  `id` VARCHAR(32) NOT NULL,
  `dni` VARCHAR(8) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `direccion` varchar(250) NOT NULL,
  -- `Foto` varchar(100) DEFAULT NULL,
  `idApoderado` VARCHAR(32) NOT NULL,
  `Estado` int(1) NOT NULL,
  foreign key (idApoderado) references apoderado(id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into alumno values 
(uuid(), '74660603','CESAR', 'URBINA', 'curbina@unitru.edu.pe', '987654321', 'depa', '7afe7e9c-011b-11ea-afdd-e4e74986', 1);


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
-- Estructura de tabla para la tabla `grupos`
-- --------------------------------------------------------
CREATE TABLE `grupos` (
  `idGrupo` int(11) NOT NULL,
  `NumeroGrupo` varchar(50) NOT NULL,
  `NombreGrupo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `horarios`
-- --------------------------------------------------------
CREATE TABLE `horarios` (
  `idHorario` int(11) NOT NULL,
  `NombreHorario` varchar(50) NOT NULL
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
-- Estructura de tabla para la tabla `material_didactico`
-- --------------------------------------------------------
CREATE TABLE `material_didactico` (
  `idMaterialDidactico` int(11) NOT NULL,
  `Descripcion` varchar(200) NOT NULL,
  `Archivo` varchar(200) NOT NULL,
  `CodigoMaterial` int(11) NOT NULL,
  `Fecha_subida` date DEFAULT NULL,
  `idNumeroAsignacion` int(11) NOT NULL,
  `idDocente` int(11) NOT NULL
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
-- Estructura de tabla para la tabla `niveles`
-- --------------------------------------------------------
CREATE TABLE `ROL` (
  `id` VARCHAR(32) PRIMARY KEY,
  `Rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `niveles`
-- --------------------------------------------------------
INSERT INTO `rol` VALUES
('b1f27357-018e-11ea-afdd-e4e74986', 'Administrador'),
('b1f565d0-018e-11ea-afdd-e4e74986', 'Docente'),
('b1f56711-018e-11ea-afdd-e4e74986', 'Estudiante');

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
  `idPlan` int(11) NOT NULL,
  `Descripcion` varchar(100) NOT NULL,
  `idCarrera` int(11) NOT NULL,
  `CantidadAsignaturas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `idTurno` int(11) NOT NULL,
  `NombreTurno` varchar(50) NOT NULL
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
  FOREIGN KEY (`idRol`) REFERENCES ROL(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------
-- Volcado de datos para la tabla `usuario`
-- --------------------------------------------------------
INSERT INTO `usuario` VALUES
(uuid(),'ADMIN', '123', 'b1f27357-018e-11ea-afdd-e4e74986', 'ADMIN', 'ADMIN'),
(uuid(), 'Jorge', '123', 'b1f565d0-018e-11ea-afdd-e4e74986', 'JORGE', 'AZABACHE'),
(uuid(), 'Lusho', '123', 'b1f56711-018e-11ea-afdd-e4e74986', 'LUIS', 'TIRADO');

-- --------------------------------------------------------
-- Estructura de tabla para la tabla `years_academicos`
CREATE TABLE `years_academicos` (
  `idYearAcademico` int(11) NOT NULL,
  `NombreYear` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- commit

