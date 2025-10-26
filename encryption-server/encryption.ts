import { promises as fs } from "fs";
import * as path from "path";
import {
    encryptString as litEncryptString,
    decryptToString as litDecryptToString,
    encryptUint8Array as litEncryptUint8Array,
    decryptToUint8Array as litDecryptToUint8Array,
} from "@lit-protocol/encryption";
import { getLitNodeClient, getSessionSigs } from "./lit-client.js";
import { AccessControlCondition, EncryptionOptions, EncryptionResult } from "./types.js";

// ---------- Encryption ----------
export async function encryptStringWithLit(
    data: string,
    accessControlConditions: AccessControlCondition[],
    opts?: { walletPrivateKey?: string; }
): Promise<EncryptionResult> {
    const litNodeClient = await getLitNodeClient();
    const sessionSigs = await getSessionSigs(litNodeClient, opts?.walletPrivateKey);

    const { ciphertext, dataToEncryptHash } = await litEncryptString(
        {
            accessControlConditions,
            dataToEncrypt: data,
        },
        litNodeClient
    );

    return { ciphertext, dataToEncryptHash };
}

export async function encryptFileAtPath(
    filePath: string,
    accessControlConditions: AccessControlCondition[],
    opts?: { walletPrivateKey?: string; encoding?: BufferEncoding; }
): Promise<EncryptionResult> {
    const absolutePath = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    const fileBytes = await fs.readFile(absolutePath);
    const litNodeClient = await getLitNodeClient();
    await getSessionSigs(litNodeClient, opts?.walletPrivateKey); // establish session (not strictly needed for encryptUint8Array)
    const { ciphertext, dataToEncryptHash } = await litEncryptUint8Array(
        {
            accessControlConditions,
            dataToEncrypt: new Uint8Array(fileBytes.buffer, fileBytes.byteOffset, fileBytes.byteLength),
        },
        litNodeClient
    );
    return { ciphertext, dataToEncryptHash };
}

// ---------- Decryption ----------
export async function decryptData(
    ciphertext: string,
    dataToEncryptHash: string,
    accessControlConditions: AccessControlCondition[],
    opts?: { walletPrivateKey?: string; }
): Promise<string> {
    const litNodeClient = await getLitNodeClient();
    const sessionSigs = await getSessionSigs(litNodeClient, opts?.walletPrivateKey);

    const decryptedString: string = await litDecryptToString(
        {
            accessControlConditions,
            chain: "ethereum",
            ciphertext,
            dataToEncryptHash,
            sessionSigs,
        },
        litNodeClient
    );

    return decryptedString;
}

// Return full binary of a previously encrypted file (Uint8Array)
export async function decryptFileBytes(
    ciphertext: string,
    dataToEncryptHash: string,
    accessControlConditions: AccessControlCondition[],
    opts?: { walletPrivateKey?: string; }
): Promise<Uint8Array> {
    const litNodeClient = await getLitNodeClient();
    const sessionSigs = await getSessionSigs(litNodeClient, opts?.walletPrivateKey);
    const bytes = await litDecryptToUint8Array(
        {
            accessControlConditions,
            chain: "ethereum",
            ciphertext,
            dataToEncryptHash,
            sessionSigs,
        },
        litNodeClient
    );
    return bytes;
}
