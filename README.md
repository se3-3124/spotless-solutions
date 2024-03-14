# Spotless Solutions

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![ClientApp linting](https://github.com/se3-3124/spotless-solutions/actions/workflows/client_linting.yml/badge.svg)](https://github.com/se3-3124/spotless-solutions/actions/workflows/client_linting.yml)
[![Server linting](https://github.com/se3-3124/spotless-solutions/actions/workflows/server_linting.yml/badge.svg)](https://github.com/se3-3124/spotless-solutions/actions/workflows/server_linting.yml)

A Cleaning Service Booking & Management System

## Developing

### Prerequisites

Please make sure you have the following software and SDKs installed in your system:

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Node.js >= 20](https://nodejs.org/en)

To spin up everything that this repository requires, run `docker compose up` at the
root folder of this repository.

When working with the codebase, we recommend using an IDE with intelligent code
completion and syntax highlighting, such as the latest version of [Visual Studio Code](https://code.visualstudio.com/)
with [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) &
[C# Dev Kit extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) or
[JetBrains' Rider](https://www.jetbrains.com/rider/).

### Downloading the source code

Clone the repository:

```
git clone https://github.com/se3-3124/spotless-solutions.git
cd spotless-solutions
```

### Resolving Project Dependencies

This project is using [ASP.NET Core](https://dotnet.microsoft.com/en-us/apps/aspnet) with [Vite + React](https://vitejs.dev/)
on the `ClientApp` folder. To install the dependencies, you must:

```
# Install dependencies on the server:
cd SpotlessSolutions.Web
dotnet restore

# And then on the clientapp:
cd ClientApp
npm install
```

### Setting up your environment

There are three ways you can set up your environment.
First is by editing `appsettings.json` on the
`SpotlessSolutions.Web` folder **(Not recommended)**,
by using [User Secrets](https://learn.microsoft.com/en-us/aspnet/core/security/app-secrets?view=aspnetcore-8.0)
and using Environment variables.

This README will only cover setting up User Secrets and Environment Variables.

#### What you need:

- Your Google Account's App Password (for setting up mailer, this is temporary as this will be moved to much
  better mailing solutions such as using [MailGun](https://www.mailgun.com/) in the future.) However,
  You are allowed to use other services that allow you to send mails via SMTP.
- Google Cloud's OAuth Credentials. (See [here](https://developers.google.com/identity/protocols/oauth2))
- Credentials for your Redis & Postgres database

#### Setting Up

##### Mail Configuration

For Mail Configuration, see [MailRailgun](https://github.com/se3-3124/spotless-solutions/tree/main/SpotlessSolutions.Worker.MailRailgun)

##### Google OAuth

```
dotnet user-secrets set "ExternalAuthenticators:Google:ClientSecret" "<your client secret>"
dotnet user-secrets set "ExternalAuthenticators:Google:ClientId" "<your client id>"
dotnet user-secrets set "ExternalAuthenticators:Google:RedirectUri" "https://localhost:5173/oauth2/google/oauth2callback"
```

<details>
  <summary>Environment Variables</summary>

```
ExternalAuthenticators__Google__ClientSecret=your_client_secret
ExternalAuthenticators__Google__ClientId=your_client_id
ExternalAuthenticators__Google__RedirectUri=https://localhost:5173/oauth2/google/oauth2callback
```
</details>

**NOTE: You need to replace `RedirectUri`'s Hostname both on your Google and your config once you are
deploying it to server with its hostname**

##### Your Database Connection Strings

```
dotnet user-secrets set "ConnectionStrings:Redis" "<your redis connection string>"
dotnet user-secrets set "ConnectionStrings:PrimaryContext" "<your postgres connection string>"
```

<details>
  <summary>Environment Variables</summary>

```
ConnectionStrings__Redis=your_redis_connection_string
ConnectionStrings__PrimaryContext=your_postgres_connection_string
```
</details>

##### Your JWT Secret

```
dotnet user-secrets set "JwtSettings:Secret" "<your custom secret key>"
```

<details>
  <summary>Environment Variables</summary>

```
JwtSettings__Secret=your_custom_secret_key
```
</details>

Afterward, you can update your database (Ensure that `dotnet-ef` tool is installed):

```
dotnet ef database update
```

Then, start it:

```
dotnet run
```

### Code Analysis

Before committing your code, please run `npm run lint` on `ClientApp` folder to ensure that
it follows the style this project enforces.
The CI will also spot this during the pull
request; however, it is a good practice to have it checked first before committing.

### License

Spotless Solution's Source Code is licensed under [BSD 3-Clause License](https://spdx.org/licenses/BSD-3-Clause.html).
Please see the [LICENSE](LICENSE) file for more information.
[Tl;dr](https://www.tldrlegal.com/license/bsd-3-clause-license-revised)
