USE [GTDA]
GO
SET IDENTITY_INSERT [dbo].[TipoTorneo] ON 

INSERT [dbo].[TipoTorneo] ([Id], [Nombre], [Descripcion]) VALUES (15, N'Sistema Suizo', N'El sistema suizo es un método de emparejamiento de jugadores de ajedrez basado en sus puntuaciones.')
INSERT [dbo].[TipoTorneo] ([Id], [Nombre], [Descripcion]) VALUES (16, N'Round Robin', N'Sistema de todos contra todos, donde cada jugador se enfrenta a todos los demás una o más veces.')
INSERT [dbo].[TipoTorneo] ([Id], [Nombre], [Descripcion]) VALUES (17, N'Eliminación directa', N'Sistema donde el que pierde sale de la competición, y el que gana avanza a la siguiente ronda hasta llegar a la final.')
SET IDENTITY_INSERT [dbo].[TipoTorneo] OFF
GO
SET IDENTITY_INSERT [dbo].[RolUsuario] ON 

INSERT [dbo].[RolUsuario] ([Id], [Rol]) VALUES (1, N'Administrador')
INSERT [dbo].[RolUsuario] ([Id], [Rol]) VALUES (2, N'Organizador')
INSERT [dbo].[RolUsuario] ([Id], [Rol]) VALUES (3, N'Miembro')
SET IDENTITY_INSERT [dbo].[RolUsuario] OFF
GO
INSERT [dbo].[Usuario] ([Id], [NombreUsuario], [Clave], [Nombres], [Apellido], [Email], [Telefono], [IdRolUsuario], [Token], [FotoPerfil]) VALUES (N'5a662b1c-5ab5-44d9-9532-62b957a5ae94', N'julim', N'r9HO/BS5MgM15ZQQ2Z/fQWX86ge5u6rgtUL3uUBu/F6PsZ7m', N'Julián', N'Martínez', N'julim@email.com', N'351845121', 1, N'', NULL)
INSERT [dbo].[Usuario] ([Id], [NombreUsuario], [Clave], [Nombres], [Apellido], [Email], [Telefono], [IdRolUsuario], [Token], [FotoPerfil]) VALUES (N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', N'agusg', N'o+OKudP544s89/SZunxVc9Ghk8vbYcLqF3lAlaD8LblWIpWv', N'Agustin', N'Gómez', N'agusg@email.com', N'358412154', 2, N'', NULL)
INSERT [dbo].[Usuario] ([Id], [NombreUsuario], [Clave], [Nombres], [Apellido], [Email], [Telefono], [IdRolUsuario], [Token], [FotoPerfil]) VALUES (N'ae63efed-9e4d-4176-a5d4-a6abe4f4a05d', N'facum', N'Da+qzUPHo8IGnj7RzEMS0FHWaV187aeJ8Ehjgvi2fxg8DJVx', N'Facundo', N'Molina', N'facum@mail.com', N'356569885', 3, N'', NULL)
INSERT [dbo].[Usuario] ([Id], [NombreUsuario], [Clave], [Nombres], [Apellido], [Email], [Telefono], [IdRolUsuario], [Token], [FotoPerfil]) VALUES (N'497b00cb-c8ef-4382-98ea-edeecdcf1b4f', N'marcosc', N'dpxbLDOMyJu9APgq1J/JgfZl31TgZj+xHzaR2J2LxpPV0ZXF', N'Marcos', N'Cruz', N'marcosc@email.com', N'352521512', 3, N'', NULL)
INSERT [dbo].[Usuario] ([Id], [NombreUsuario], [Clave], [Nombres], [Apellido], [Email], [Telefono], [IdRolUsuario], [Token], [FotoPerfil]) VALUES (N'eb3828f8-3543-4555-8d43-ff4a079aae57', N'juane', N'nLbX2Pu/lj1RdN/AGI0pLPD41JedKDYsZqC0e95DYXTid/2z', N'Juan', N'Echevarria', N'juane@email.com', N'351524525', 3, N'', NULL)
GO
INSERT [dbo].[Torneo] ([Id], [Nombre], [FechaInicio], [Descripcion], [Localidad], [IdTipoTorneo], [CantidadParticipantes], [IdOrganizador], [EloMinimo], [EloMaximo], [HoraInicio], [Borrado], [Portada], [FechaFinal]) VALUES (N'54e967ae-262b-487b-afd7-78efeb7f64e7', N'Torneo prueba 1', CAST(N'2023-05-26' AS Date), N'Torneo de prueba para probar la app', N'Córdoba', 15, 20, N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', 1000, 1200, CAST(N'15:00:00' AS Time), NULL, NULL, CAST(N'2023-05-27' AS Date))
GO
SET IDENTITY_INSERT [dbo].[Ronda] ON 

INSERT [dbo].[Ronda] ([Id], [Numero], [Descripcion], [IdTorneo]) VALUES (2, 1, N'Ronda 1', N'54e967ae-262b-487b-afd7-78efeb7f64e7')
SET IDENTITY_INSERT [dbo].[Ronda] OFF
GO
INSERT [dbo].[Partida] ([Id], [JugadorBlancas], [JugadorNegras], [Fecha], [HoraInicio], [HoraFinal], [Resultado], [Pgn], [IdRonda]) VALUES (N'fc6193cb-dbc3-4ee3-9ff2-9d56ebda7b46', N'497b00cb-c8ef-4382-98ea-edeecdcf1b4f', N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', CAST(N'2023-05-31T00:00:00.000' AS DateTime), CAST(N'17:03:00' AS Time), NULL, NULL, N'[Event "Live Chess"]
[Site "Chess.com"]
[Date "2023.05.30"]
[Round "?"]
[White "osmar7956"]
[Black "Auguscav"]
[Result "0-1"]
[ECO "B01"]
[WhiteElo "718"]
[BlackElo "748"]
[TimeControl "60"]
[EndTime "21:09:06 PDT"]
[Termination "Auguscav won on time"]

1. e4 d5 2. exd5 Qxd5 3. Nc3 Qe6+ 4. Be2 Qg6 5. g3 e6 6. Nf3 Nc6 7. O-O e5 8.
Nd5 Be6 9. Nxc7+ Ke7 10. Nxa8 Nb4 11. Nxe5 Qxc2 12. Qxc2 Nxc2 13. Nc7 Nxa1 14.
b3 Kd6 15. Ba3+ Kxc7 16. Rxa1 Bxa3 17. Rc1+ Kd6 18. Rc2 Kxe5 19. d4+ Kxd4 0-1', 2)
INSERT [dbo].[Partida] ([Id], [JugadorBlancas], [JugadorNegras], [Fecha], [HoraInicio], [HoraFinal], [Resultado], [Pgn], [IdRonda]) VALUES (N'6dbac8be-19f8-4bf1-8484-bec9224e1244', N'ae63efed-9e4d-4176-a5d4-a6abe4f4a05d', N'eb3828f8-3543-4555-8d43-ff4a079aae57', CAST(N'2023-05-31T00:00:00.000' AS DateTime), CAST(N'14:30:00' AS Time), NULL, NULL, NULL, 2)
GO
SET IDENTITY_INSERT [dbo].[Analisis] ON 

INSERT [dbo].[Analisis] ([Id], [IdPartida], [PromedioEvaluacion]) VALUES (13, N'fc6193cb-dbc3-4ee3-9ff2-9d56ebda7b46', NULL)
SET IDENTITY_INSERT [dbo].[Analisis] OFF
GO
SET IDENTITY_INSERT [dbo].[Movimiento] ON 

INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (1, N'w', N'e2', N'e4', N'p', CAST(58.00 AS Decimal(10, 2)), N'e2e4', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (2, N'b', N'd7', N'd5', N'p', CAST(9.00 AS Decimal(10, 2)), N'c7c5', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (3, N'w', N'e4', N'd5', N'p', CAST(71.00 AS Decimal(10, 2)), N'e4d5', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (4, N'b', N'd8', N'd5', N'q', CAST(-80.00 AS Decimal(10, 2)), N'd8d5', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (5, N'w', N'b1', N'c3', N'n', CAST(4.00 AS Decimal(10, 2)), N'b1c3', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (6, N'b', N'd5', N'e6', N'q', CAST(0.00 AS Decimal(10, 2)), N'd5d8', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (7, N'w', N'f1', N'e2', N'b', CAST(-18.00 AS Decimal(10, 2)), N'f1e2', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (8, N'b', N'e6', N'g6', N'q', CAST(18.00 AS Decimal(10, 2)), N'e6b6', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (9, N'w', N'g2', N'g3', N'p', CAST(22.00 AS Decimal(10, 2)), N'g1f3', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (10, N'b', N'e7', N'e6', N'p', CAST(4.00 AS Decimal(10, 2)), N'c8f5', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (11, N'w', N'g1', N'f3', N'n', CAST(49.00 AS Decimal(10, 2)), N'd2d4', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (12, N'b', N'b8', N'c6', N'n', CAST(0.00 AS Decimal(10, 2)), N'b8c6', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (13, N'w', N'e1', N'g1', N'k', CAST(44.00 AS Decimal(10, 2)), N'c3b5', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (14, N'b', N'e6', N'e5', N'p', CAST(0.00 AS Decimal(10, 2)), N'c8d7', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (15, N'w', N'c3', N'd5', N'n', CAST(53.00 AS Decimal(10, 2)), N'd2d4', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (16, N'b', N'c8', N'e6', N'b', CAST(13.00 AS Decimal(10, 2)), N'g6d6', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (17, N'w', N'd5', N'c7', N'n', CAST(0.00 AS Decimal(10, 2)), N'd5c7', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (18, N'b', N'e8', N'e7', N'k', CAST(208.00 AS Decimal(10, 2)), N'e8d8', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (19, N'w', N'c7', N'a8', N'n', CAST(390.00 AS Decimal(10, 2)), N'c7a8', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (20, N'b', N'c6', N'b4', N'n', CAST(394.00 AS Decimal(10, 2)), N'e7d7', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (21, N'w', N'f3', N'e5', N'n', CAST(479.00 AS Decimal(10, 2)), N'd2d4', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (22, N'b', N'g6', N'c2', N'q', CAST(412.00 AS Decimal(10, 2)), N'g6c2', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (23, N'w', N'd1', N'c2', N'q', CAST(1095.00 AS Decimal(10, 2)), N'd2d4', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (24, N'b', N'b4', N'c2', N'n', CAST(439.00 AS Decimal(10, 2)), N'b4c2', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (25, N'w', N'a8', N'c7', N'n', CAST(501.00 AS Decimal(10, 2)), N'a8c7', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (26, N'b', N'c2', N'a1', N'n', CAST(168.00 AS Decimal(10, 2)), N'e6h3', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (27, N'w', N'b2', N'b3', N'p', CAST(244.00 AS Decimal(10, 2)), N'c7e6', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (28, N'b', N'e7', N'd6', N'k', CAST(257.00 AS Decimal(10, 2)), N'a1c2', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (29, N'w', N'c1', N'a3', N'b', CAST(0.00 AS Decimal(10, 2)), N'c7e6', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (30, N'b', N'd6', N'c7', N'k', CAST(-22.00 AS Decimal(10, 2)), N'd6c7', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (31, N'w', N'f1', N'a1', N'r', CAST(133.00 AS Decimal(10, 2)), N'a3f8', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (32, N'b', N'f8', N'a3', N'b', CAST(-195.00 AS Decimal(10, 2)), N'f8a3', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (33, N'w', N'a1', N'c1', N'r', CAST(0.00 AS Decimal(10, 2)), N'e5c4', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (34, N'b', N'c7', N'd6', N'k', CAST(-235.00 AS Decimal(10, 2)), N'a3c1', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (35, N'w', N'c1', N'c2', N'r', CAST(-191.00 AS Decimal(10, 2)), N'e5c4', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (36, N'b', N'd6', N'e5', N'k', CAST(-434.00 AS Decimal(10, 2)), N'd6e5', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (37, N'w', N'd2', N'd4', N'p', CAST(0.00 AS Decimal(10, 2)), N'c2c3', 13)
INSERT [dbo].[Movimiento] ([Id], [Color], [MoveFrom], [MoveTo], [Pieza], [Evaluacion], [BestMove], [IdAnalisis]) VALUES (38, N'b', N'e5', N'd4', N'k', CAST(-452.00 AS Decimal(10, 2)), N'e5d6', 13)
SET IDENTITY_INSERT [dbo].[Movimiento] OFF
GO
INSERT [dbo].[Inscripcion] ([Id], [IdTorneo], [IdParticipante], [HoraInscripcion], [Estado]) VALUES (N'a1eaed46-a541-4e2b-b51f-3b524481bfa2', N'54e967ae-262b-487b-afd7-78efeb7f64e7', N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', CAST(N'14:05:18' AS Time), N'aprobado')
INSERT [dbo].[Inscripcion] ([Id], [IdTorneo], [IdParticipante], [HoraInscripcion], [Estado]) VALUES (N'f9d46159-b97a-432c-ad8e-4f72c5bd9fdf', N'54e967ae-262b-487b-afd7-78efeb7f64e7', N'497b00cb-c8ef-4382-98ea-edeecdcf1b4f', CAST(N'14:03:29' AS Time), N'aprobado')
INSERT [dbo].[Inscripcion] ([Id], [IdTorneo], [IdParticipante], [HoraInscripcion], [Estado]) VALUES (N'd5881be9-a79d-4033-858b-9b19530369cb', N'54e967ae-262b-487b-afd7-78efeb7f64e7', N'eb3828f8-3543-4555-8d43-ff4a079aae57', CAST(N'14:03:51' AS Time), N'aprobado')
INSERT [dbo].[Inscripcion] ([Id], [IdTorneo], [IdParticipante], [HoraInscripcion], [Estado]) VALUES (N'0fbc1236-81c4-4c71-9cca-f998a8612071', N'54e967ae-262b-487b-afd7-78efeb7f64e7', N'ae63efed-9e4d-4176-a5d4-a6abe4f4a05d', CAST(N'14:02:41' AS Time), N'aprobado')
GO
SET IDENTITY_INSERT [dbo].[InscripcionOrganizador] ON 

INSERT [dbo].[InscripcionOrganizador] ([Id], [IdUsuario], [FechaPedido], [EstadoPedido]) VALUES (2, N'5a662b1c-5ab5-44d9-9532-62b957a5ae94', CAST(N'2023-05-29' AS Date), N'aprobado')
INSERT [dbo].[InscripcionOrganizador] ([Id], [IdUsuario], [FechaPedido], [EstadoPedido]) VALUES (3, N'ae63efed-9e4d-4176-a5d4-a6abe4f4a05d', CAST(N'2023-05-29' AS Date), N'rechazado')
SET IDENTITY_INSERT [dbo].[InscripcionOrganizador] OFF
GO
INSERT [dbo].[Notificacion] ([Id], [UsuarioId], [Mensaje], [Estado], [fecha]) VALUES (N'abc554b3-5977-422a-a347-286954e18937', N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', N'Nueva solicitud de inscripción', N'leida', NULL)
INSERT [dbo].[Notificacion] ([Id], [UsuarioId], [Mensaje], [Estado], [fecha]) VALUES (N'8e583a29-2053-4ef2-9918-9d27189b7ecc', N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', N'Nueva solicitud de inscripción', N'leida', NULL)
INSERT [dbo].[Notificacion] ([Id], [UsuarioId], [Mensaje], [Estado], [fecha]) VALUES (N'a6a632ea-1006-4d6a-8230-bcdda9b5b1dc', N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', N'Nueva solicitud de inscripción', N'leida', NULL)
INSERT [dbo].[Notificacion] ([Id], [UsuarioId], [Mensaje], [Estado], [fecha]) VALUES (N'48a9b7f1-b0e7-4b69-b97c-c4938b047e48', N'48e0734f-82f7-4989-8c09-a0d3304a5c4f', N'Nueva solicitud de inscripción', N'leida', NULL)
GO
