using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "kapacitet",
                table: "bolnice");

            migrationBuilder.AddColumn<string>(
                name: "dodatneInfo",
                table: "pacijenti",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "godinaRodjenja",
                table: "pacijenti",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "doktorID",
                table: "kreveti",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "doktori",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    bolnicaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_doktori", x => x.ID);
                    table.ForeignKey(
                        name: "FK_doktori_bolnice_bolnicaID",
                        column: x => x.bolnicaID,
                        principalTable: "bolnice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_kreveti_doktorID",
                table: "kreveti",
                column: "doktorID");

            migrationBuilder.CreateIndex(
                name: "IX_doktori_bolnicaID",
                table: "doktori",
                column: "bolnicaID");

            migrationBuilder.AddForeignKey(
                name: "FK_kreveti_doktori_doktorID",
                table: "kreveti",
                column: "doktorID",
                principalTable: "doktori",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_kreveti_doktori_doktorID",
                table: "kreveti");

            migrationBuilder.DropTable(
                name: "doktori");

            migrationBuilder.DropIndex(
                name: "IX_kreveti_doktorID",
                table: "kreveti");

            migrationBuilder.DropColumn(
                name: "dodatneInfo",
                table: "pacijenti");

            migrationBuilder.DropColumn(
                name: "godinaRodjenja",
                table: "pacijenti");

            migrationBuilder.DropColumn(
                name: "doktorID",
                table: "kreveti");

            migrationBuilder.AddColumn<int>(
                name: "kapacitet",
                table: "bolnice",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
