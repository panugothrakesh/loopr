import { Uploader } from "@irys/upload";
import { Ethereum } from "@irys/upload-ethereum";
import { requirePrivateKey } from "./lit-client.js";
import type { EncryptedPayload, AccessControlCondition, EncryptionOptions } from "./types.js";
import { IRYS_GATEWAY } from "./types.js";

// ---------- Irys helpers ----------
async function getIrysUploader(walletPrivateKey?: string) {
    const privateKey = requirePrivateKey(walletPrivateKey);
    // The uploader will infer network configuration from the connected wallet
    const uploader = await (Uploader as any)(Ethereum).withWallet(privateKey);
    return uploader;
}

export async function storeOnIrys(
    cipherText: string,
    dataToEncryptHash: string,
    accessControlConditions: AccessControlCondition[],
    opts?: EncryptionOptions
): Promise<string> {
    const uploader = await getIrysUploader(opts?.walletPrivateKey);

    const dataToUpload: EncryptedPayload = {
        cipherText,
        dataToEncryptHash,
        accessControlConditions,
        fileName: opts?.fileName,
        contentType: opts?.contentType,
    };

    const tags = [
        { name: "Content-Type", value: "application/json" },
        ...(opts?.fileName ? [{ name: "X-File-Name", value: opts.fileName }] : []),
        ...(opts?.contentType ? [{ name: "X-Content-Type", value: opts.contentType }] : []),
    ];
    const receipt = await uploader.upload(JSON.stringify(dataToUpload), { tags });
    return receipt?.id || "";
}

export function toIrysGatewayUrl(id: string): string {
    return `${IRYS_GATEWAY}${id}`;
}

export async function retrieveFromIrys(id: string): Promise<EncryptedPayload> {
    const url = toIrysGatewayUrl(id);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to retrieve data for ID: ${id}`);
    const data = (await response.json()) as EncryptedPayload;
    return data;
}
