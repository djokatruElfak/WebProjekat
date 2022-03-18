﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models;

namespace BackEnd.Migrations
{
    [DbContext(typeof(BolnicaContext))]
    [Migration("20220118141831_V6")]
    partial class V6
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.12");

            modelBuilder.Entity("Models.Bolest", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("nazivBolesti")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("bolesti");
                });

            modelBuilder.Entity("Models.Bolnica", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int>("duzina")
                        .HasColumnType("int");

                    b.Property<int>("kapacitet")
                        .HasColumnType("int");

                    b.Property<string>("naziv")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("sirina")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("bolnice");
                });

            modelBuilder.Entity("Models.Krevet", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("bolestID")
                        .HasColumnType("int");

                    b.Property<int?>("bolnicaID")
                        .HasColumnType("int");

                    b.Property<int>("krevetID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.HasIndex("bolestID");

                    b.HasIndex("bolnicaID");

                    b.HasIndex("krevetID")
                        .IsUnique();

                    b.ToTable("kreveti");
                });

            modelBuilder.Entity("Models.Pacijent", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Ime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prezime")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("pacijentID")
                        .HasColumnType("int");

                    b.HasKey("ID");

                    b.ToTable("pacijenti");
                });

            modelBuilder.Entity("Models.Krevet", b =>
                {
                    b.HasOne("Models.Bolest", "bolest")
                        .WithMany("bolestSpoj")
                        .HasForeignKey("bolestID");

                    b.HasOne("Models.Bolnica", "bolnica")
                        .WithMany("bolnicaSpoj")
                        .HasForeignKey("bolnicaID");

                    b.HasOne("Models.Pacijent", "pacijent")
                        .WithOne("pacijentSpoj")
                        .HasForeignKey("Models.Krevet", "krevetID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("bolest");

                    b.Navigation("bolnica");

                    b.Navigation("pacijent");
                });

            modelBuilder.Entity("Models.Bolest", b =>
                {
                    b.Navigation("bolestSpoj");
                });

            modelBuilder.Entity("Models.Bolnica", b =>
                {
                    b.Navigation("bolnicaSpoj");
                });

            modelBuilder.Entity("Models.Pacijent", b =>
                {
                    b.Navigation("pacijentSpoj");
                });
#pragma warning restore 612, 618
        }
    }
}
