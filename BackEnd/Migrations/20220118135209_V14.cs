using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V14 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "bolesti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nazivBolesti = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bolesti", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "bolnice",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    naziv = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    kapacitet = table.Column<int>(type: "int", nullable: false),
                    duzina = table.Column<int>(type: "int", nullable: false),
                    sirina = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bolnice", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "kreveti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    bolnicaID = table.Column<int>(type: "int", nullable: true),
                    bolestID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_kreveti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_kreveti_bolesti_bolestID",
                        column: x => x.bolestID,
                        principalTable: "bolesti",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_kreveti_bolnice_bolnicaID",
                        column: x => x.bolnicaID,
                        principalTable: "bolnice",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "pacijenti",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prezime = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    pacijentID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pacijenti", x => x.ID);
                    table.ForeignKey(
                        name: "FK_pacijenti_kreveti_pacijentID",
                        column: x => x.pacijentID,
                        principalTable: "kreveti",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_kreveti_bolestID",
                table: "kreveti",
                column: "bolestID");

            migrationBuilder.CreateIndex(
                name: "IX_kreveti_bolnicaID",
                table: "kreveti",
                column: "bolnicaID");

            migrationBuilder.CreateIndex(
                name: "IX_pacijenti_pacijentID",
                table: "pacijenti",
                column: "pacijentID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pacijenti");

            migrationBuilder.DropTable(
                name: "kreveti");

            migrationBuilder.DropTable(
                name: "bolesti");

            migrationBuilder.DropTable(
                name: "bolnice");
        }
    }
}
