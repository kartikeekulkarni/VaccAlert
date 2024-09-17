using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace vaccalertDotnet.Models
{
    public partial class vaccalertContext : DbContext
    {
        public vaccalertContext()
        {
        }

        public vaccalertContext(DbContextOptions<vaccalertContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Address> Addresses { get; set; } = null!;
        public virtual DbSet<Booking> Bookings { get; set; } = null!;
        public virtual DbSet<Child> Children { get; set; } = null!;
        public virtual DbSet<City> Cities { get; set; } = null!;
        public virtual DbSet<District> Districts { get; set; } = null!;
        public virtual DbSet<Efmigrationshistory> Efmigrationshistories { get; set; } = null!;
        public virtual DbSet<Hospital> Hospitals { get; set; } = null!;
        public virtual DbSet<Parent> Parents { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<State> States { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Vaccine> Vaccines { get; set; } = null!;
        public virtual DbSet<VaccineStock> VaccineStocks { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Yash@2010;database=vaccalert", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.34-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => e.Adid)
                    .HasName("PRIMARY");

                entity.ToTable("address");

                entity.HasIndex(e => e.City, "cityfk_idx");

                entity.HasIndex(e => e.District, "districtfk_idx");

                entity.HasIndex(e => e.State, "statefk_idx");

                entity.Property(e => e.Adid).HasColumnName("adid");

                entity.Property(e => e.Area)
                    .HasMaxLength(300)
                    .HasColumnName("area");

                entity.Property(e => e.City).HasColumnName("city");

                entity.Property(e => e.District).HasColumnName("district");

                entity.Property(e => e.Pincode).HasColumnName("pincode");

                entity.Property(e => e.State).HasColumnName("state");

                entity.HasOne(d => d.CityNavigation)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.City)
                    .HasConstraintName("cityfk");

                entity.HasOne(d => d.DistrictNavigation)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.District)
                    .HasConstraintName("districtfk");

                entity.HasOne(d => d.StateNavigation)
                    .WithMany(p => p.Addresses)
                    .HasForeignKey(d => d.State)
                    .HasConstraintName("statefk");
            });

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasKey(e => e.Bkid)
                    .HasName("PRIMARY");

                entity.ToTable("booking");

                entity.HasIndex(e => e.Cid, "cfkey_idx");

                entity.HasIndex(e => e.Hid, "hfkey_idx");

                entity.HasIndex(e => e.Pid, "pfkey_idx");

                entity.Property(e => e.Bkid).HasColumnName("bkid");

                entity.Property(e => e.AptDate).HasColumnName("apt_date");

                entity.Property(e => e.BkDate).HasColumnName("bk_date");

                entity.Property(e => e.Cid).HasColumnName("cid");

                entity.Property(e => e.Hid).HasColumnName("hid");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.Status)
                    .HasMaxLength(45)
                    .HasColumnName("status");

                entity.Property(e => e.Vid).HasColumnName("vid");

                entity.HasOne(d => d.CidNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.Cid)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("cfkey");

                entity.HasOne(d => d.HidNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.Hid)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("hfkey");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.Bookings)
                    .HasForeignKey(d => d.Pid)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("pfkey");
            });

            modelBuilder.Entity<Child>(entity =>
            {
                entity.HasKey(e => e.Cid)
                    .HasName("PRIMARY");

                entity.ToTable("child");

                entity.HasIndex(e => e.Pid, "pidfkey_idx");

                entity.Property(e => e.Cid).HasColumnName("cid");

                entity.Property(e => e.Cname)
                    .HasMaxLength(205)
                    .HasColumnName("cname");

                entity.Property(e => e.Dob).HasColumnName("dob");

                entity.Property(e => e.Gender)
                    .HasMaxLength(45)
                    .HasColumnName("gender");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.HasOne(d => d.PidNavigation)
                    .WithMany(p => p.Children)
                    .HasForeignKey(d => d.Pid)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("pidfkey");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("cities");

                entity.HasIndex(e => e.Did, "districtfkey_idx");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Cityname)
                    .HasMaxLength(255)
                    .HasColumnName("cityname");

                entity.Property(e => e.Did).HasColumnName("did");

                entity.HasOne(d => d.DidNavigation)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.Did)
                    .HasConstraintName("districtfkey");
            });

            modelBuilder.Entity<District>(entity =>
            {
                entity.HasKey(e => e.Did)
                    .HasName("PRIMARY");

                entity.ToTable("districts");

                entity.HasIndex(e => e.Sid, "statefkey_idx");

                entity.Property(e => e.Did).HasColumnName("did");

                entity.Property(e => e.Dname)
                    .HasMaxLength(255)
                    .HasColumnName("dname");

                entity.Property(e => e.Sid).HasColumnName("sid");

                entity.HasOne(d => d.SidNavigation)
                    .WithMany(p => p.Districts)
                    .HasForeignKey(d => d.Sid)
                    .HasConstraintName("statefkey");
            });

            modelBuilder.Entity<Efmigrationshistory>(entity =>
            {
                entity.HasKey(e => e.MigrationId)
                    .HasName("PRIMARY");

                entity.ToTable("__efmigrationshistory");

                entity.Property(e => e.MigrationId).HasMaxLength(150);

                entity.Property(e => e.ProductVersion).HasMaxLength(32);
            });

            modelBuilder.Entity<Hospital>(entity =>
            {
                entity.HasKey(e => e.Hid)
                    .HasName("PRIMARY");

                entity.ToTable("hospital");

                entity.HasIndex(e => e.Hadress, "address_idx");

                entity.HasIndex(e => e.Uid, "uid_idx");

                entity.Property(e => e.Hid).HasColumnName("hid");

                entity.Property(e => e.Contact)
                    .HasMaxLength(15)
                    .HasColumnName("contact");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .HasColumnName("email");

                entity.Property(e => e.Hadress).HasColumnName("hadress");

                entity.Property(e => e.Hname)
                    .HasMaxLength(205)
                    .HasColumnName("hname");

                entity.Property(e => e.Status)
                    .HasColumnName("status")
                    .HasDefaultValueSql("'0'");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.Url)
                    .HasMaxLength(100)
                    .HasColumnName("url");

                entity.HasOne(d => d.HadressNavigation)
                    .WithMany(p => p.Hospitals)
                    .HasForeignKey(d => d.Hadress)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("haddress");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Hospitals)
                    .HasForeignKey(d => d.Uid)
                    .HasConstraintName("uidforeignkey");
            });

            modelBuilder.Entity<Parent>(entity =>
            {
                entity.HasKey(e => e.Pid)
                    .HasName("PRIMARY");

                entity.ToTable("parent");

                entity.HasIndex(e => e.Paddress, "address_idx");

                entity.HasIndex(e => e.Uid, "uid_idx");

                entity.Property(e => e.Pid).HasColumnName("pid");

                entity.Property(e => e.Contact)
                    .HasMaxLength(205)
                    .HasColumnName("contact");

                entity.Property(e => e.Email)
                    .HasMaxLength(205)
                    .HasColumnName("email");

                entity.Property(e => e.Fname)
                    .HasMaxLength(205)
                    .HasColumnName("fname");

                entity.Property(e => e.Lname)
                    .HasMaxLength(205)
                    .HasColumnName("lname");

                entity.Property(e => e.Paddress).HasColumnName("paddress");

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.HasOne(d => d.PaddressNavigation)
                    .WithMany(p => p.Parents)
                    .HasForeignKey(d => d.Paddress)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("address");

                entity.HasOne(d => d.UidNavigation)
                    .WithMany(p => p.Parents)
                    .HasForeignKey(d => d.Uid)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("uid");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasKey(e => e.Rid)
                    .HasName("PRIMARY");

                entity.ToTable("role");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Rname)
                    .HasMaxLength(200)
                    .HasColumnName("rname");
            });

            modelBuilder.Entity<State>(entity =>
            {
                entity.HasKey(e => e.Sid)
                    .HasName("PRIMARY");

                entity.ToTable("states");

                entity.Property(e => e.Sid).HasColumnName("sid");

                entity.Property(e => e.Sname)
                    .HasMaxLength(200)
                    .HasColumnName("sname");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Uid)
                    .HasName("PRIMARY");

                entity.ToTable("users");

                entity.HasIndex(e => e.Rid, "rid_idx");

                entity.HasIndex(e => e.Uname, "uname_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Uid).HasColumnName("uid");

                entity.Property(e => e.Password)
                    .HasMaxLength(200)
                    .HasColumnName("password");

                entity.Property(e => e.Rid).HasColumnName("rid");

                entity.Property(e => e.Uname)
                    .HasMaxLength(205)
                    .HasColumnName("uname");

                entity.HasOne(d => d.RidNavigation)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.Rid)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("rid");
            });

            modelBuilder.Entity<Vaccine>(entity =>
            {
                entity.HasKey(e => e.Vid)
                    .HasName("PRIMARY");

                entity.ToTable("vaccine");

                entity.Property(e => e.Vid).HasColumnName("vid");

                entity.Property(e => e.Description)
                    .HasMaxLength(255)
                    .HasColumnName("description");

                entity.Property(e => e.Dose)
                    .HasMaxLength(255)
                    .HasColumnName("dose");

                entity.Property(e => e.Route)
                    .HasMaxLength(255)
                    .HasColumnName("route");

                entity.Property(e => e.Site)
                    .HasMaxLength(255)
                    .HasColumnName("site");

                entity.Property(e => e.VaccineName)
                    .HasMaxLength(255)
                    .HasColumnName("vaccine_name");

                entity.Property(e => e.Whentogive)
                    .HasMaxLength(255)
                    .HasColumnName("whentogive");
            });

            modelBuilder.Entity<VaccineStock>(entity =>
            {
                entity.HasKey(e => e.Vsid)
                    .HasName("PRIMARY");

                entity.ToTable("vaccine_stock");

                entity.HasIndex(e => e.Hid, "hfkey_idx");

                entity.HasIndex(e => e.Vid, "vfkey_idx");

                entity.Property(e => e.Vsid).HasColumnName("vsid");

                entity.Property(e => e.Hid).HasColumnName("hid");

                entity.Property(e => e.Stock).HasColumnName("stock");

                entity.Property(e => e.Vid).HasColumnName("vid");

                entity.HasOne(d => d.HidNavigation)
                    .WithMany(p => p.VaccineStocks)
                    .HasForeignKey(d => d.Hid)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("hospitalfkey");

                entity.HasOne(d => d.VidNavigation)
                    .WithMany(p => p.VaccineStocks)
                    .HasForeignKey(d => d.Vid)
                    .HasConstraintName("vaccinefkey");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
