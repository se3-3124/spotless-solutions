using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotlessSolutions.Web.Migrations
{
    /// <inheritdoc />
    public partial class ServicesInitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AddOns",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    AllowStandalone = table.Column<bool>(type: "boolean", nullable: false),
                    AssessmentOnly = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddOns", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ServiceDescriptors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    PricingFlags = table.Column<int[]>(type: "integer[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceDescriptors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AddOnFields",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GroupId = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    FieldType = table.Column<int>(type: "integer", nullable: false),
                    Parameters = table.Column<string>(type: "text", nullable: true),
                    ParameterValueFor = table.Column<string>(type: "text", nullable: true),
                    AddOnServiceDescriptorId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddOnFields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddOnFields_AddOns_AddOnServiceDescriptorId",
                        column: x => x.AddOnServiceDescriptorId,
                        principalTable: "AddOns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AddOnServiceRestrictionRules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    On = table.Column<int>(type: "integer", nullable: false),
                    FieldId = table.Column<string>(type: "text", nullable: false),
                    Parameters = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    AddOnServiceDescriptorId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AddOnServiceRestrictionRules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AddOnServiceRestrictionRules_AddOns_AddOnServiceDescriptorId",
                        column: x => x.AddOnServiceDescriptorId,
                        principalTable: "AddOns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceDescriptorPricingPresets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ConfigOverrides = table.Column<string>(type: "text", nullable: false),
                    ServiceDescriptorId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceDescriptorPricingPresets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceDescriptorPricingPresets_ServiceDescriptors_ServiceD~",
                        column: x => x.ServiceDescriptorId,
                        principalTable: "ServiceDescriptors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceDescriptorPricingRules",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    PricingConfig = table.Column<string>(type: "text", nullable: false),
                    ServiceDescriptorId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceDescriptorPricingRules", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceDescriptorPricingRules_ServiceDescriptors_ServiceDes~",
                        column: x => x.ServiceDescriptorId,
                        principalTable: "ServiceDescriptors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AddOnFields_AddOnServiceDescriptorId",
                table: "AddOnFields",
                column: "AddOnServiceDescriptorId");

            migrationBuilder.CreateIndex(
                name: "IX_AddOnServiceRestrictionRules_AddOnServiceDescriptorId",
                table: "AddOnServiceRestrictionRules",
                column: "AddOnServiceDescriptorId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDescriptorPricingPresets_ServiceDescriptorId",
                table: "ServiceDescriptorPricingPresets",
                column: "ServiceDescriptorId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceDescriptorPricingRules_ServiceDescriptorId",
                table: "ServiceDescriptorPricingRules",
                column: "ServiceDescriptorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AddOnFields");

            migrationBuilder.DropTable(
                name: "AddOnServiceRestrictionRules");

            migrationBuilder.DropTable(
                name: "ServiceDescriptorPricingPresets");

            migrationBuilder.DropTable(
                name: "ServiceDescriptorPricingRules");

            migrationBuilder.DropTable(
                name: "AddOns");

            migrationBuilder.DropTable(
                name: "ServiceDescriptors");
        }
    }
}
