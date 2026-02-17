import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCb);
const KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
	const salt = randomBytes(16).toString("hex");
	const key = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
	return `scrypt$${salt}$${key.toString("hex")}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
	const parts = storedHash.split("$");
	if (parts.length !== 3 || parts[0] !== "scrypt") {
		return false;
	}

	const salt = parts[1];
	const expectedHex = parts[2];
	const derived = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;
	const expected = Buffer.from(expectedHex, "hex");

	if (derived.length !== expected.length) {
		return false;
	}

	return timingSafeEqual(derived, expected);
}
