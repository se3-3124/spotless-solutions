using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotlessSolutions.Web.Migrations
{
    /// <inheritdoc />
    public partial class RenameBucketFileName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BucketPath",
                table: "Bucket");

            migrationBuilder.AddColumn<string>(
                name: "BucketId",
                table: "Bucket",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BucketId",
                table: "Bucket");

            migrationBuilder.AddColumn<Guid>(
                name: "BucketPath",
                table: "Bucket",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }
    }
}
