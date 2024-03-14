using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotlessSolutions.Web.Migrations
{
    /// <inheritdoc />
    public partial class AddFileBucketTracker : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bucket",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BucketPath = table.Column<Guid>(type: "uuid", nullable: false),
                    FileSize = table.Column<long>(type: "bigint", nullable: false),
                    TimeUploaded = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    OwnerId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bucket", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bucket_UserData_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "UserData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bucket_OwnerId",
                table: "Bucket",
                column: "OwnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bucket");
        }
    }
}
