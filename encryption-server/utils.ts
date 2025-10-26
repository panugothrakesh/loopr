import * as path from "path";
import { encryptStringWithLit, encryptFileAtPath, decryptData, decryptFileBytes } from "./encryption.js";
import { storeOnIrys, toIrysGatewayUrl, retrieveFromIrys } from "./irys-storage.js";
import { shutdownLit } from "./lit-client.js";
import { AccessControlCondition, EncryptionOptions, UploadResult, DEFAULT_CHAIN } from "./types.js";

// ---------- Orchestration convenience helpers ----------
export async function encryptAndUploadString(
    data: string,
    accessControlConditions: AccessControlCondition[],
    opts?: { walletPrivateKey?: string; }
): Promise<UploadResult> {
    const { ciphertext, dataToEncryptHash } = await encryptStringWithLit(data, accessControlConditions, opts);
    const id = await storeOnIrys(ciphertext, dataToEncryptHash, accessControlConditions, opts);
    return { id, url: toIrysGatewayUrl(id), ciphertext, dataToEncryptHash };
}

export async function encryptAndUploadFile(
    filePath: string,
    accessControlConditions: AccessControlCondition[],
    opts?: { walletPrivateKey?: string; encoding?: BufferEncoding; }
): Promise<UploadResult> {
    const { ciphertext, dataToEncryptHash } = await encryptFileAtPath(filePath, accessControlConditions, opts);
    const fileName = path.basename(filePath);
    // naive content-type guess by extension; callers can override by passing opts.contentType when we add it
    const ext = path.extname(fileName).toLowerCase();
    const defaultType = ext === ".pdf" ? "application/pdf" : ext === ".png" ? "image/png" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "application/octet-stream";
    const id = await storeOnIrys(ciphertext, dataToEncryptHash, accessControlConditions, { ...opts, fileName, contentType: defaultType });
    return { id, url: toIrysGatewayUrl(id), ciphertext, dataToEncryptHash };
}

export async function downloadAndDecryptById(
    id: string,
    opts?: { walletPrivateKey?: string; }
): Promise<string> {
    const { cipherText, dataToEncryptHash, accessControlConditions } = await retrieveFromIrys(id);
    return decryptData(cipherText, dataToEncryptHash, accessControlConditions, opts);
}

export async function downloadAndDecryptFileBytesById(
    id: string,
    opts?: { walletPrivateKey?: string; }
): Promise<Uint8Array> {
    const { cipherText, dataToEncryptHash, accessControlConditions } = await retrieveFromIrys(id);
    return decryptFileBytes(cipherText, dataToEncryptHash, accessControlConditions, opts);
}

// ---------- Example ACC helper ----------
export function accForSingleAddress(address: string): AccessControlCondition[] {
    return [
        {
            contractAddress: "",
            standardContractType: "",
            chain: DEFAULT_CHAIN,
            method: "",
            parameters: [":userAddress"],
            returnValueTest: { comparator: "=", value: address },
        },
    ];
}

// Re-export shutdown function for convenience
export { shutdownLit };
