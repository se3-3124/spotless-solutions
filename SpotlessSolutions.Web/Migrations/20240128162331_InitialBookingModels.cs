using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpotlessSolutions.Web.Migrations
{
    /// <inheritdoc />
    public partial class InitialBookingModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserHomeConfigDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    HomeSize = table.Column<double>(type: "double precision", nullable: false),
                    BedroomCount = table.Column<int>(type: "integer", nullable: false),
                    ComfortRoomCount = table.Column<int>(type: "integer", nullable: false),
                    KitchenCount = table.Column<int>(type: "integer", nullable: false),
                    LivingRoomCount = table.Column<int>(type: "integer", nullable: false),
                    StorageCount = table.Column<int>(type: "integer", nullable: false),
                    FloorCount = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserHomeConfigDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserHomeConfigDetails_UserData_UserId",
                        column: x => x.UserId,
                        principalTable: "UserData",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserBookings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IssuedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    ConfigId = table.Column<Guid>(type: "uuid", nullable: true),
                    AddressId = table.Column<Guid>(type: "uuid", nullable: false),
                    TransportFee = table.Column<float>(type: "real", nullable: false),
                    TransportFeeForAssessment = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    BucketPath = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBookings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBookings_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBookings_UserData_UserId",
                        column: x => x.UserId,
                        principalTable: "UserData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBookings_UserHomeConfigDetails_ConfigId",
                        column: x => x.ConfigId,
                        principalTable: "UserHomeConfigDetails",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserAddOnBookDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalComputedFee = table.Column<float>(type: "real", nullable: false),
                    ServiceArguments = table.Column<string>(type: "text", nullable: false),
                    BookingReferenceId = table.Column<Guid>(type: "uuid", nullable: false),
                    ServiceId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAddOnBookDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAddOnBookDetails_AddOns_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "AddOns",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAddOnBookDetails_UserBookings_BookingReferenceId",
                        column: x => x.BookingReferenceId,
                        principalTable: "UserBookings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserServiceBookDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalComputedFee = table.Column<float>(type: "real", nullable: false),
                    ServiceArguments = table.Column<string>(type: "text", nullable: false),
                    BookingReferenceId = table.Column<Guid>(type: "uuid", nullable: false),
                    ServiceId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserServiceBookDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserServiceBookDetails_ServiceDescriptors_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "ServiceDescriptors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserServiceBookDetails_UserBookings_BookingReferenceId",
                        column: x => x.BookingReferenceId,
                        principalTable: "UserBookings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAddOnBookDetails_BookingReferenceId",
                table: "UserAddOnBookDetails",
                column: "BookingReferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAddOnBookDetails_ServiceId",
                table: "UserAddOnBookDetails",
                column: "ServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookings_AddressId",
                table: "UserBookings",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookings_ConfigId",
                table: "UserBookings",
                column: "ConfigId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBookings_UserId",
                table: "UserBookings",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserHomeConfigDetails_UserId",
                table: "UserHomeConfigDetails",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserServiceBookDetails_BookingReferenceId",
                table: "UserServiceBookDetails",
                column: "BookingReferenceId");

            migrationBuilder.CreateIndex(
                name: "IX_UserServiceBookDetails_ServiceId",
                table: "UserServiceBookDetails",
                column: "ServiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAddOnBookDetails");

            migrationBuilder.DropTable(
                name: "UserServiceBookDetails");

            migrationBuilder.DropTable(
                name: "UserBookings");

            migrationBuilder.DropTable(
                name: "UserHomeConfigDetails");
        }
    }
}
