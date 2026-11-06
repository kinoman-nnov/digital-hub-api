import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url); // возвращает URL-адрес файла storage.js
const __dirname = path.dirname(__filename);

export const PROJECT_ROOT = path.resolve(__dirname, '../../');

export const STORAGE_DIR = path.resolve(PROJECT_ROOT, process.env.STORAGE_DIR || './storage');

export const TEMP_DIR = path.join(STORAGE_DIR, 'temp');