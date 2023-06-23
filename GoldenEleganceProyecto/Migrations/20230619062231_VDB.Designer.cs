﻿// <auto-generated />
using System;
using GoldenEleganceProyecto.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace GoldenEleganceProyecto.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20230619062231_VDB")]
    partial class VDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Categoria", b =>
                {
                    b.Property<int>("PkCategoria")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PkCategoria"), 1L, 1);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("NombreCat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("RowVersion")
                        .HasColumnType("datetime2");

                    b.HasKey("PkCategoria");

                    b.ToTable("Categorias");
                });

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Productos", b =>
                {
                    b.Property<int>("PkProducto")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PkProducto"), 1L, 1);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("FKCategoria")
                        .HasColumnType("int");

                    b.Property<string>("Imagen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Inventario")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("NombreProducto")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PrecioVenta")
                        .HasColumnType("int");

                    b.Property<DateTime?>("RowVersion")
                        .HasColumnType("datetime2");

                    b.HasKey("PkProducto");

                    b.HasIndex("FKCategoria");

                    b.ToTable("Productos");
                });

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Rol", b =>
                {
                    b.Property<int>("PkRol")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PkRol"), 1L, 1);

                    b.Property<string>("Descripcion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("RowVersion")
                        .HasColumnType("datetime2");

                    b.HasKey("PkRol");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Usuarios", b =>
                {
                    b.Property<int>("PkUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PkUsuario"), 1L, 1);

                    b.Property<string>("Apellido")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ConfirmarEmailExpiry")
                        .HasColumnType("datetime2");

                    b.Property<string>("ConfirmarEmailToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Correo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Direccion")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<int>("FKRol")
                        .HasColumnType("int");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Nombre")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RefreshToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RefreshTokenExpiryTime")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("ResetPasswordExpiry")
                        .HasColumnType("datetime2");

                    b.Property<string>("ResetPasswordToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("RowVersion")
                        .HasColumnType("datetime2");

                    b.Property<string>("Telefono")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Token")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PkUsuario");

                    b.HasIndex("FKRol");

                    b.ToTable("Usuario");
                });

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Venta", b =>
                {
                    b.Property<int>("PkVenta")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PkVenta"), 1L, 1);

                    b.Property<int>("FKProducto")
                        .HasColumnType("int");

                    b.Property<int>("FKUsuario")
                        .HasColumnType("int");

                    b.Property<DateTime>("FechaVenta")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<int>("Precio")
                        .HasColumnType("int");

                    b.Property<DateTime?>("RowVersion")
                        .HasColumnType("datetime2");

                    b.HasKey("PkVenta");

                    b.HasIndex("FKProducto");

                    b.HasIndex("FKUsuario");

                    b.ToTable("Ventas");
                });

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Productos", b =>
                {
                    b.HasOne("GoldenEleganceProyecto.Models.Categoria", "Categoria")
                        .WithMany()
                        .HasForeignKey("FKCategoria")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Categoria");
                });

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Usuarios", b =>
                {
                    b.HasOne("GoldenEleganceProyecto.Models.Rol", "Roles")
                        .WithMany()
                        .HasForeignKey("FKRol")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Roles");
                });

            modelBuilder.Entity("GoldenEleganceProyecto.Models.Venta", b =>
                {
                    b.HasOne("GoldenEleganceProyecto.Models.Productos", "Producto")
                        .WithMany()
                        .HasForeignKey("FKProducto")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("GoldenEleganceProyecto.Models.Usuarios", "Usuario")
                        .WithMany()
                        .HasForeignKey("FKUsuario")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Producto");

                    b.Navigation("Usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
