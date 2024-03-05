# Spotless Solutions Mail Railgun

This worker serves as a service that sends mail in a queue
to ensure that mails are delivered successfully.

## Developing

### Prerequisites

Please make sure you have the following software and SDKs
installed in your system:

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [RabbitMQ](https://www.rabbitmq.com/)

To spin up everything that this repository requires, run
`docker compose up` at the root folder of this
repository.

When working with the codebase, we recommend using an IDE
with intelligent code completion and syntax highlighting,
such as the latest version of [Visual Studio Code](https://code.visualstudio.com/)
with [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) & [C# Dev Kit extension](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit) or
[JetBrains' Rider](https://www.jetbrains.com/rider/).

### Downloading the source code

Clone the repository:

```
git clone https://github.com/se3-3124/spotless-solutions.git
cd spotless-solutions
```

### Resolving Project Dependencies

```
cd SpotlessSolutions.Worker.MailRailgun
dotnet restore
```

### Setting up your environment

This requires you the following:

- Your mail server's SMTP credentials
- Postgres address and credential

#### Setting up

Configure the mail server to use your SMTP credentials and
your database:

<details>
    <summary>Using appsettings.json file</summary>

```json
{
  "Mailer": {
    "Username": "your smtp server username",
    "Password": "your smtp server password",
    "Hostname": "your smtp host",
    "Port": "your smtp port, NOT A STRING",
    "Address": "your email address"
  }
}
```
</details>

<details>
    <summary>Using environment variables</summary>

```sh
dotnet user-secrets set "Mailer:Username" "your smtp server username"
dotnet user-secrets set "Mailer:Password" "your smtp server password"
dotnet user-secrets set "Mailer:Hostname" "your smtp server host"
dotnet user-secrets set "Mailer:Port" "your smtp server port"
dotnet user-secrets set "Mailer:Address" "your email address"
```
</details>

<details>
    <summary>Setting environment variables</summary>

**NOTE: This is using unix syntax of setting variables.**
**For windows see [here](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Environment_Variables.html#zz-2.).**

```sh
export Mailer__Username='your smtp server username'
export Mailer__Password='your smtp server password'
export Mailer__Hostname='your smtp server hostname'
export Mailer__Port=your_smtp_port
export Mailer__Address='your email address'
```
</details>

#### Starting the Worker:

```
dotnet run
```

## License

Spotless Solution's Source Code is licensed under [BSD 3-Clause License](https://spdx.org/licenses/BSD-3-Clause.html).
Please see the [LICENSE](../LICENSE) file for more information.
[Tl;dr](https://www.tldrlegal.com/license/bsd-3-clause-license-revised)
