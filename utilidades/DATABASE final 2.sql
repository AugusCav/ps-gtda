USE [master]
GO
/****** Object:  Database [GTDA]    Script Date: 21/12/2023 09:40:18 ******/
CREATE DATABASE [GTDA]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'GTDA', FILENAME = N'D:\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\GTDA.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'GTDA_log', FILENAME = N'D:\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\GTDA_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [GTDA] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [GTDA].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [GTDA] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [GTDA] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [GTDA] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [GTDA] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [GTDA] SET ARITHABORT OFF 
GO
ALTER DATABASE [GTDA] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [GTDA] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [GTDA] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [GTDA] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [GTDA] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [GTDA] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [GTDA] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [GTDA] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [GTDA] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [GTDA] SET  ENABLE_BROKER 
GO
ALTER DATABASE [GTDA] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [GTDA] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [GTDA] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [GTDA] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [GTDA] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [GTDA] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [GTDA] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [GTDA] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [GTDA] SET  MULTI_USER 
GO
ALTER DATABASE [GTDA] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [GTDA] SET DB_CHAINING OFF 
GO
ALTER DATABASE [GTDA] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [GTDA] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [GTDA] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [GTDA] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [GTDA] SET QUERY_STORE = OFF
GO
USE [GTDA]
GO
/****** Object:  Table [dbo].[Analisis]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Analisis](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdPartida] [uniqueidentifier] NULL,
	[PromedioEvaluacion] [decimal](10, 2) NULL,
 CONSTRAINT [PkAnalisis_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inscripcion]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inscripcion](
	[Id] [uniqueidentifier] NOT NULL,
	[IdTorneo] [uniqueidentifier] NULL,
	[IdParticipante] [uniqueidentifier] NULL,
	[HoraInscripcion] [time](7) NULL,
	[Estado] [varchar](20) NULL,
	[Fecha] [date] NULL,
 CONSTRAINT [PkInscripcion_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[InscripcionOrganizador]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[InscripcionOrganizador](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [uniqueidentifier] NULL,
	[FechaPedido] [date] NULL,
	[EstadoPedido] [varchar](75) NULL,
 CONSTRAINT [PkInscripcionOrg_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Movimiento]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movimiento](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Color] [char](1) NULL,
	[MoveFrom] [varchar](10) NULL,
	[MoveTo] [varchar](10) NULL,
	[Pieza] [char](1) NULL,
	[Evaluacion] [decimal](10, 2) NULL,
	[BestMove] [varchar](10) NULL,
	[IdAnalisis] [int] NULL,
	[Fen] [varchar](100) NULL,
 CONSTRAINT [PkMovimiento_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notificacion]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notificacion](
	[Id] [uniqueidentifier] NOT NULL,
	[UsuarioId] [uniqueidentifier] NULL,
	[Mensaje] [varchar](100) NULL,
	[Estado] [varchar](25) NULL,
	[fecha] [date] NULL,
	[TorneoId] [uniqueidentifier] NULL,
 CONSTRAINT [PkNotificacion_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Partida]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Partida](
	[Id] [uniqueidentifier] NOT NULL,
	[JugadorBlancas] [uniqueidentifier] NULL,
	[JugadorNegras] [uniqueidentifier] NULL,
	[Fecha] [datetime] NULL,
	[HoraInicio] [time](7) NULL,
	[Resultado] [int] NULL,
	[Pgn] [nvarchar](max) NULL,
	[IdRonda] [int] NULL,
	[Estado] [varchar](20) NULL,
 CONSTRAINT [PkPartida_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RolUsuario]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RolUsuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Rol] [varchar](75) NULL,
 CONSTRAINT [PkRolUsuario_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ronda]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ronda](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Numero] [int] NULL,
	[Descripcion] [varchar](150) NULL,
	[IdTorneo] [uniqueidentifier] NULL,
 CONSTRAINT [PkRonda_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoTorneo]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoTorneo](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](75) NULL,
	[Descripcion] [varchar](150) NULL,
 CONSTRAINT [PkTipoTorneo_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Torneo]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Torneo](
	[Id] [uniqueidentifier] NOT NULL,
	[Nombre] [varchar](75) NULL,
	[FechaInicio] [date] NULL,
	[Descripcion] [varchar](2000) NULL,
	[Localidad] [varchar](150) NULL,
	[IdTipoTorneo] [int] NULL,
	[CantidadParticipantes] [int] NULL,
	[IdOrganizador] [uniqueidentifier] NULL,
	[EloMinimo] [int] NULL,
	[EloMaximo] [int] NULL,
	[HoraInicio] [time](7) NULL,
	[Borrado] [bit] NULL,
	[Portada] [varbinary](max) NULL,
	[FechaFinal] [date] NULL,
	[EloPromedio] [int] NULL,
	[Estado] [varchar](25) NULL,
 CONSTRAINT [PkTorneo_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 21/12/2023 09:40:18 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id] [uniqueidentifier] NOT NULL,
	[NombreUsuario] [varchar](75) NULL,
	[Clave] [varchar](75) NULL,
	[Nombres] [varchar](150) NULL,
	[Apellido] [varchar](150) NULL,
	[Email] [varchar](255) NULL,
	[Telefono] [varchar](15) NULL,
	[IdRolUsuario] [int] NULL,
	[RefreshToken] [varchar](4096) NULL,
	[FotoPerfil] [varbinary](max) NULL,
	[Elo] [int] NULL,
	[ResetPasswordExpiry] [datetime] NULL,
	[ResetPasswordToken] [varchar](4096) NULL,
	[RefreshTokenExpiryTime] [datetime] NULL,
 CONSTRAINT [PkUsuario_Id] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Analisis]  WITH CHECK ADD  CONSTRAINT [FkAnalisis_IdPartida] FOREIGN KEY([IdPartida])
REFERENCES [dbo].[Partida] ([Id])
GO
ALTER TABLE [dbo].[Analisis] CHECK CONSTRAINT [FkAnalisis_IdPartida]
GO
ALTER TABLE [dbo].[Inscripcion]  WITH CHECK ADD  CONSTRAINT [FkInscripcion_IdParticipante] FOREIGN KEY([IdParticipante])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Inscripcion] CHECK CONSTRAINT [FkInscripcion_IdParticipante]
GO
ALTER TABLE [dbo].[Inscripcion]  WITH CHECK ADD  CONSTRAINT [FkInscripcion_IdTorneo] FOREIGN KEY([IdTorneo])
REFERENCES [dbo].[Torneo] ([Id])
GO
ALTER TABLE [dbo].[Inscripcion] CHECK CONSTRAINT [FkInscripcion_IdTorneo]
GO
ALTER TABLE [dbo].[InscripcionOrganizador]  WITH CHECK ADD  CONSTRAINT [FkInscripcionOrg_IdUsuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[InscripcionOrganizador] CHECK CONSTRAINT [FkInscripcionOrg_IdUsuario]
GO
ALTER TABLE [dbo].[Movimiento]  WITH CHECK ADD  CONSTRAINT [FkMovimiento_IdAnalisis] FOREIGN KEY([IdAnalisis])
REFERENCES [dbo].[Analisis] ([Id])
GO
ALTER TABLE [dbo].[Movimiento] CHECK CONSTRAINT [FkMovimiento_IdAnalisis]
GO
ALTER TABLE [dbo].[Notificacion]  WITH CHECK ADD  CONSTRAINT [FkNotificacion_TorneoId] FOREIGN KEY([TorneoId])
REFERENCES [dbo].[Torneo] ([Id])
GO
ALTER TABLE [dbo].[Notificacion] CHECK CONSTRAINT [FkNotificacion_TorneoId]
GO
ALTER TABLE [dbo].[Notificacion]  WITH CHECK ADD  CONSTRAINT [FkNotificacion_UsuarioId] FOREIGN KEY([UsuarioId])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Notificacion] CHECK CONSTRAINT [FkNotificacion_UsuarioId]
GO
ALTER TABLE [dbo].[Partida]  WITH CHECK ADD  CONSTRAINT [FkPartida_IdRonda] FOREIGN KEY([IdRonda])
REFERENCES [dbo].[Ronda] ([Id])
GO
ALTER TABLE [dbo].[Partida] CHECK CONSTRAINT [FkPartida_IdRonda]
GO
ALTER TABLE [dbo].[Partida]  WITH CHECK ADD  CONSTRAINT [FkPartida_JugadorBlancas] FOREIGN KEY([JugadorBlancas])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Partida] CHECK CONSTRAINT [FkPartida_JugadorBlancas]
GO
ALTER TABLE [dbo].[Partida]  WITH CHECK ADD  CONSTRAINT [FkPartida_JugadorNegras] FOREIGN KEY([JugadorNegras])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Partida] CHECK CONSTRAINT [FkPartida_JugadorNegras]
GO
ALTER TABLE [dbo].[Ronda]  WITH CHECK ADD  CONSTRAINT [FkRonda_IdTorneo] FOREIGN KEY([IdTorneo])
REFERENCES [dbo].[Torneo] ([Id])
GO
ALTER TABLE [dbo].[Ronda] CHECK CONSTRAINT [FkRonda_IdTorneo]
GO
ALTER TABLE [dbo].[Torneo]  WITH CHECK ADD  CONSTRAINT [FkTorneo_IdOrganizador] FOREIGN KEY([IdOrganizador])
REFERENCES [dbo].[Usuario] ([Id])
GO
ALTER TABLE [dbo].[Torneo] CHECK CONSTRAINT [FkTorneo_IdOrganizador]
GO
ALTER TABLE [dbo].[Torneo]  WITH CHECK ADD  CONSTRAINT [FkTorneo_IdTipoTorneo] FOREIGN KEY([IdTipoTorneo])
REFERENCES [dbo].[TipoTorneo] ([Id])
GO
ALTER TABLE [dbo].[Torneo] CHECK CONSTRAINT [FkTorneo_IdTipoTorneo]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FkUsuario_RolUsuario] FOREIGN KEY([IdRolUsuario])
REFERENCES [dbo].[RolUsuario] ([Id])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FkUsuario_RolUsuario]
GO
USE [master]
GO
ALTER DATABASE [GTDA] SET  READ_WRITE 
GO
