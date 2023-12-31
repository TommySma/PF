USE [master]
GO
CREATE LOGIN [recepcion] WITH PASSWORD=N'recepcion', DEFAULT_DATABASE=[PF-BDD], CHECK_EXPIRATION=OFF,
CHECK_POLICY=OFF
GO

USE [PF-BDD]
GO
CREATE USER [recepcion] FOR LOGIN [recepcion]
GO
USE [PF-BDD]
GO
ALTER ROLE [db_owner] ADD MEMBER [recepcion]
GO	