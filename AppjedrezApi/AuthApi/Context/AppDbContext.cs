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

    public virtual DbSet<Inscripcion> Inscripcions { get; set; }

    public virtual DbSet<Partidum> Partida { get; set; }

    public virtual DbSet<RolUsuario> RolUsuarios { get; set; }

    public virtual DbSet<Rondum> Ronda { get; set; }

    public virtual DbSet<TipoTorneo> TipoTorneos { get; set; }

    public virtual DbSet<Torneo> Torneos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=GTDA;User Id=sa;Password=***REMOVED***;TrustServerCertificate=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Inscripcion>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkInscripcion_Id");

            entity.ToTable("Inscripcion");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdParticipanteNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.IdParticipante)
                .HasConstraintName("FkInscripcion_IdParticipante");

            entity.HasOne(d => d.IdTorneoNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.IdTorneo)
                .HasConstraintName("FkInscripcion_IdTorneo");
        });

        modelBuilder.Entity<Partidum>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PkPartida_Id");

            entity.Property(e => e.Id).ValueGeneratedNever();
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
                .HasMaxLength(150)
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
                .HasMaxLength(128)
                .IsUnicode(false);

            entity.HasOne(d => d.IdRolUsuarioNavigation).WithMany(p => p.Usuarios)
                .HasForeignKey(d => d.IdRolUsuario)
                .HasConstraintName("FkUsuario_RolUsuario");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
