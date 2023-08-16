USE [master]
GO
/****** Object:  Database [PF-BDD]    Script Date: 10/8/2023 12:04:49 ******/
CREATE DATABASE [PF-BDD]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'PF-BDD', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\PF-BDD.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'PF-BDD_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\PF-BDD_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [PF-BDD] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [PF-BDD].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [PF-BDD] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [PF-BDD] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [PF-BDD] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [PF-BDD] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [PF-BDD] SET ARITHABORT OFF 
GO
ALTER DATABASE [PF-BDD] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [PF-BDD] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [PF-BDD] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [PF-BDD] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [PF-BDD] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [PF-BDD] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [PF-BDD] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [PF-BDD] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [PF-BDD] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [PF-BDD] SET  DISABLE_BROKER 
GO
ALTER DATABASE [PF-BDD] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [PF-BDD] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [PF-BDD] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [PF-BDD] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [PF-BDD] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [PF-BDD] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [PF-BDD] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [PF-BDD] SET RECOVERY FULL 
GO
ALTER DATABASE [PF-BDD] SET  MULTI_USER 
GO
ALTER DATABASE [PF-BDD] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [PF-BDD] SET DB_CHAINING OFF 
GO
ALTER DATABASE [PF-BDD] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [PF-BDD] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [PF-BDD] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'PF-BDD', N'ON'
GO
ALTER DATABASE [PF-BDD] SET QUERY_STORE = OFF
GO
USE [PF-BDD]
GO
/****** Object:  User [recepcion]    Script Date: 10/8/2023 12:04:49 ******/
CREATE USER [recepcion] FOR LOGIN [recepcion] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [alumno]    Script Date: 10/8/2023 12:04:49 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [recepcion]
GO
/****** Object:  Table [dbo].[Habitacion]    Script Date: 10/8/2023 12:04:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Habitacion](
	[idHabitacion] [int] NOT NULL,
	[numeroHab] [int] NOT NULL,
	[pisoHab] [int] NOT NULL,
	[Estado] [varchar](50) NOT NULL,
	[Foto] [varchar](500) NULL,
 CONSTRAINT [PK_Habitacion] PRIMARY KEY CLUSTERED 
(
	[idHabitacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[huesped]    Script Date: 10/8/2023 12:04:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[huesped](
	[idHuesped] [int] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[apellido] [varchar](50) NOT NULL,
	[dni] [int] NOT NULL,
 CONSTRAINT [PK_huesped] PRIMARY KEY CLUSTERED 
(
	[idHuesped] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Reserva]    Script Date: 10/8/2023 12:04:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Reserva](
	[estadoReserva] [varchar](50) NOT NULL,
	[idReserva] [int] IDENTITY(1,1) NOT NULL,
	[fechaInicio] [date] NOT NULL,
	[fechaFin] [date] NOT NULL,
	[precio] [int] NOT NULL,
	[fk_habitacion] [int] NOT NULL,
	[fk_huesped] [int] NOT NULL,
 CONSTRAINT [PK_Reserva] PRIMARY KEY CLUSTERED 
(
	[idReserva] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[servicio]    Script Date: 10/8/2023 12:04:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[servicio](
	[idServicio] [int] NOT NULL,
	[fk_habitacion] [int] NOT NULL,
	[estado] [bit] NOT NULL,
	[fk_tarea] [int] NOT NULL,
	[fk_usuario] [int] NOT NULL,
 CONSTRAINT [PK_servicio] PRIMARY KEY CLUSTERED 
(
	[idServicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tareas]    Script Date: 10/8/2023 12:04:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tareas](
	[descripcion] [varchar](50) NOT NULL,
	[idTarea] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_Tareas] PRIMARY KEY CLUSTERED 
(
	[idTarea] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[usuario]    Script Date: 10/8/2023 12:04:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[usuario](
	[idUsuario] [int] NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[contraseña] [varchar](50) NOT NULL,
 CONSTRAINT [PK_usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (1, 101, 1, N'R', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (2, 102, 1, N'L', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (3, 103, 1, N'R', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (4, 104, 1, N'O', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (5, 105, 1, N'L', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (6, 106, 1, N'R', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (7, 107, 1, N'O', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
INSERT [dbo].[Habitacion] ([idHabitacion], [numeroHab], [pisoHab], [Estado], [Foto]) VALUES (8, 108, 1, N'L', N'https://dazzlerasuncion.com/wp-content/uploads/2023/05/classic_king_twin_2_dazzler_asuncion-1.jpg')
GO
SET IDENTITY_INSERT [dbo].[Tareas] ON 

INSERT [dbo].[Tareas] ([descripcion], [idTarea]) VALUES (N'cocinar', 1)
INSERT [dbo].[Tareas] ([descripcion], [idTarea]) VALUES (N'caminar', 2)
INSERT [dbo].[Tareas] ([descripcion], [idTarea]) VALUES (N'trotar', 3)
INSERT [dbo].[Tareas] ([descripcion], [idTarea]) VALUES (N'cocina', 6)
SET IDENTITY_INSERT [dbo].[Tareas] OFF
GO
ALTER TABLE [dbo].[Reserva]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_Habitacion] FOREIGN KEY([fk_habitacion])
REFERENCES [dbo].[Habitacion] ([idHabitacion])
GO
ALTER TABLE [dbo].[Reserva] CHECK CONSTRAINT [FK_Reserva_Habitacion]
GO
ALTER TABLE [dbo].[Reserva]  WITH CHECK ADD  CONSTRAINT [FK_Reserva_huesped] FOREIGN KEY([fk_huesped])
REFERENCES [dbo].[huesped] ([idHuesped])
GO
ALTER TABLE [dbo].[Reserva] CHECK CONSTRAINT [FK_Reserva_huesped]
GO
ALTER TABLE [dbo].[servicio]  WITH CHECK ADD  CONSTRAINT [FK_servicio_Habitacion] FOREIGN KEY([fk_habitacion])
REFERENCES [dbo].[Habitacion] ([idHabitacion])
GO
ALTER TABLE [dbo].[servicio] CHECK CONSTRAINT [FK_servicio_Habitacion]
GO
ALTER TABLE [dbo].[servicio]  WITH CHECK ADD  CONSTRAINT [FK_servicio_Tareas] FOREIGN KEY([fk_tarea])
REFERENCES [dbo].[Tareas] ([idTarea])
GO
ALTER TABLE [dbo].[servicio] CHECK CONSTRAINT [FK_servicio_Tareas]
GO
ALTER TABLE [dbo].[servicio]  WITH CHECK ADD  CONSTRAINT [FK_servicio_usuario] FOREIGN KEY([fk_usuario])
REFERENCES [dbo].[usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[servicio] CHECK CONSTRAINT [FK_servicio_usuario]
GO
USE [master]
GO
ALTER DATABASE [PF-BDD] SET  READ_WRITE 
GO
