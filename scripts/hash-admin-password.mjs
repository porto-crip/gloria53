import crypto from "node:crypto";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const password = await rl.question("Admin password: ");
rl.close();

const salt = crypto.randomBytes(16).toString("hex");
const hash = crypto.scryptSync(password, salt, 64).toString("hex");

console.log(`SEED_ADMIN_PASSWORD_HASH=scrypt:${salt}:${hash}`);
