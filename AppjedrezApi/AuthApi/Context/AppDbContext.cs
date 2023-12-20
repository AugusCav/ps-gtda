using System;
using System.Collections.Generic;
using AuthApi.Models;
using Microsoft.EntityFrameworkCore;

namespace AuthApi.Context;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Analisi> Analises { get; set; }

    public virtual DbSet<Inscripcion> Inscripcions { get; set; }

    public virtual DbSet<InscripcionOrganizador> InscripcionOrganizadors { get; set; }

    public virtual DbSet<Movimiento> Movimientos { get; set; }

    public virtual DbSet<Notificacion> Notificacions { get; set; }

    public virtual DbSet<Partidum> Partida { get; set; }

    public virtual DbSet<RolUsuario> RolUsuarios { get; set; }

    public virtual DbSet<Rondum> Ronda { get; set; }

    public virtual DbSet<TipoTorneo> TipoTorneos { get; set; }

    public virtual DbSet<Torneo> Torneos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=SqlServerConnStr");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Analisi>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkAnalisis_Id");

            entity.ToTable("Analisis");

            entity.Property(e => e.PromedioEvaluacion).HasColumnType("decimal(10, 2)");

            entity.HasOne(d => d.IdPartidaNavigation).WithMany(p => p.Analisis)
                .HasForeignKey(d => d.IdPartida)
                .HasConstraintName("FkAnalisis_IdPartida");
        });

        modelBuilder.Entity<Inscripcion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkInscripcion_Id");

            entity.ToTable("Inscripcion");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Fecha).HasColumnType("date");

            entity.HasOne(d => d.IdParticipanteNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.IdParticipante)
                .HasConstraintName("FkInscripcion_IdParticipante");

            entity.HasOne(d => d.IdTorneoNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.IdTorneo)
                .HasConstraintName("FkInscripcion_IdTorneo");
        });

        modelBuilder.Entity<InscripcionOrganizador>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkInscripcionOrg_Id");

            entity.ToTable("InscripcionOrganizador");

            entity.Property(e => e.EstadoPedido)
                .HasMaxLength(75)
                .IsUnicode(false);
            entity.Property(e => e.FechaPedido).HasColumnType("date");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.InscripcionOrganizadors)
                .HasForeignKey(d => d.IdUsuario)
                .HasConstraintName("FkInscripcionOrg_IdUsuario");
        });

        modelBuilder.Entity<Movimiento>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkMovimiento_Id");

            entity.ToTable("Movimiento");

            entity.Property(e => e.BestMove)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Color)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Evaluacion).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Fen)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.MoveFrom)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.MoveTo)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.Pieza)
                .HasMaxLength(1)
                .IsUnicode(false)
                .IsFixedLength();

            entity.HasOne(d => d.IdAnalisisNavigation).WithMany(p => p.Movimientos)
                .HasForeignKey(d => d.IdAnalisis)
                .HasConstraintName("FkMovimiento_IdAnalisis");
        });

        modelBuilder.Entity<Notificacion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkNotificacion_Id");

            entity.ToTable("Notificacion");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Estado)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.Fecha)
                .HasColumnType("date")
                .HasColumnName("fecha");
            entity.Property(e => e.Mensaje)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Torneo).WithMany(p => p.Notificacions)
                .HasForeignKey(d => d.TorneoId)
                .HasConstraintName("FkNotificacion_TorneoId");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Notificacions)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FkNotificacion_UsuarioId");
        });

        modelBuilder.Entity<Partidum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkPartida_Id");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Estado)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Fecha).HasColumnType("datetime");

            entity.HasOne(d => d.IdRondaNavigation).WithMany(p => p.Partida)
                .HasForeignKey(d => d.IdRonda)
                .HasConstraintName("FkPartida_IdRonda");

            entity.HasOne(d => d.JugadorBlancasNavigation).WithMany(p => p.PartidumJugadorBlancasNavigations)
                .HasForeignKey(d => d.JugadorBlancas)
                .HasConstraintName("FkPartida_JugadorBlancas");

            entity.HasOne(d => d.JugadorNegrasNavigation).WithMany(p => p.PartidumJugadorNegrasNavigations)
                .HasForeignKey(d => d.JugadorNegras)
                .HasConstraintName("FkPartida_JugadorNegras");
        });

        modelBuilder.Entity<RolUsuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkRolUsuario_Id");

            entity.ToTable("RolUsuario");

            entity.Property(e => e.Rol)
                .HasMaxLength(75)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Rondum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkRonda_Id");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(150)
                .IsUnicode(false);

            entity.HasOne(d => d.IdTorneoNavigation).WithMany(p => p.Ronda)
                .HasForeignKey(d => d.IdTorneo)
                .HasConstraintName("FkRonda_IdTorneo");
        });

        modelBuilder.Entity<TipoTorneo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkTipoTorneo_Id");

            entity.ToTable("TipoTorneo");

            entity.Property(e => e.Descripcion)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(75)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Torneo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkTorneo_Id");

            entity.ToTable("Torneo");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Descripcion)
                .HasMaxLength(2000)
                .IsUnicode(false);
            entity.Property(e => e.Estado)
                .HasMaxLength(25)
                .IsUnicode(false);
            entity.Property(e => e.FechaFinal).HasColumnType("date");
            entity.Property(e => e.FechaInicio).HasColumnType("date");
            entity.Property(e => e.Localidad)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(75)
                .IsUnicode(false);

            entity.HasOne(d => d.IdOrganizadorNavigation).WithMany(p => p.Torneos)
                .HasForeignKey(d => d.IdOrganizador)
                .HasConstraintName("FkTorneo_IdOrganizador");

            entity.HasOne(d => d.IdTipoTorneoNavigation).WithMany(p => p.Torneos)
                .HasForeignKey(d => d.IdTipoTorneo)
                .HasConstraintName("FkTorneo_IdTipoTorneo");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkUsuario_Id");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Apellido)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Clave)
                .HasMaxLength(75)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.NombreUsuario)
                .HasMaxLength(75)
                .IsUnicode(false);
            entity.Property(e => e.Nombres)
                .HasMaxLength(150)
                .IsUnicode(false);
            entity.Property(e => e.Telefono)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.Token)
                .HasMaxLength(4096)
                .IsUnicode(false);

            entity.HasOne(d => d.IdRolUsuarioNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRolUsuario)
                .HasConstraintName("FkUsuario_RolUsuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
