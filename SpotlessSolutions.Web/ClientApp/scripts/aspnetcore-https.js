// This script sets up HTTPS for the application using the ASP.NET Core HTTPS certificate
import fs from 'fs';
import * as child_process from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseFolder = path.join(__dirname, '../generated_certs');
if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, {recursive: true});
}

const certificateName = "spotless-solutions"

const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  child_process.spawn('dotnet', [
    'dev-certs',
    'https',
    '--export-path',
    certFilePath,
    '--format',
    'Pem',
    '--no-password',
  ], { stdio: 'inherit', })
  .on('exit', (code) => process.exit(code));
}
