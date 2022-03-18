using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_pacijenti_kreveti_pacijentID",
                table: "pacijenti");

            migrationBuilder.DropIndex(
                name: "IX_pacijenti_pacijentID",
                table: "pacijenti");

            migrationBuilder.AddColumn<int>(
                name: "krevetID",
                table: "kreveti",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_kreveti_krevetID",
                table: "kreveti",
                column: "krevetID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_kreveti_pacijenti_krevetID",
                table: "kreveti",
                column: "krevetID",
                principalTable: "pacijenti",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_kreveti_pacijenti_krevetID",
                table: "kreveti");

            migrationBuilder.DropIndex(
                name: "IX_kreveti_krevetID",
                table: "kreveti");

            migrationBuilder.DropColumn(
                name: "krevetID",
                table: "kreveti");

            migrationBuilder.CreateIndex(
                name: "IX_pacijenti_pacijentID",
                table: "pacijenti",
                column: "pacijentID",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_pacijenti_kreveti_pacijentID",
                table: "pacijenti",
                column: "pacijentID",
                principalTable: "kreveti",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
