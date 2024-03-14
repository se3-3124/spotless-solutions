FROM mcr.microsoft.com/dotnet/runtime:8.0 AS base
USER $APP_UID
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["SpotlessSolutions.Worker.MailRailgun/SpotlessSolutions.Worker.MailRailgun.csproj", "SpotlessSolutions.Worker.MailRailgun/"]
RUN dotnet restore "SpotlessSolutions.Worker.MailRailgun/SpotlessSolutions.Worker.MailRailgun.csproj"
COPY . .
WORKDIR "/src/SpotlessSolutions.Worker.MailRailgun"
RUN dotnet build "SpotlessSolutions.Worker.MailRailgun.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "SpotlessSolutions.Worker.MailRailgun.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "SpotlessSolutions.Worker.MailRailgun.dll"]
