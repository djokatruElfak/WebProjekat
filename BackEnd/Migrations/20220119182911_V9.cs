using Microsoft.EntityFrameworkCore.Migrations;

namespace BackEnd.Migrations
{
    public partial class V9 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "x",
                table: "kreveti",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "y",
                table: "kreveti",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "brUzetihPacijenata",
                table: "doktori",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "kapacitet",
                table: "doktori",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "simptomi",
                table: "bolesti",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "x",
                table: "kreveti");

            migrationBuilder.DropColumn(
                name: "y",
                table: "kreveti");

            migrationBuilder.DropColumn(
                name: "brUzetihPacijenata",
                table: "doktori");

            migrationBuilder.DropColumn(
                name: "kapacitet",
                table: "doktori");

            migrationBuilder.DropColumn(
                name: "simptomi",
                table: "bolesti");
        }
    }
}
