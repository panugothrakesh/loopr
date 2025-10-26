// ---------- Core Types ----------

export interface AccessControlCondition {
    contractAddress: string;
    standardContractType: string;
    chain: string; // e.g. "ethereum"
    method: string;
    parameters: string[];
    returnValueTest: {
        comparator: string; // e.g. "="
        value: string; // e.g. wallet address
    };
}

export interface EncryptedPayload {
    cipherText: string;
    dataToEncryptHash: string;
    accessControlConditions: AccessControlCondition[];
    fileName?: string | undefined;
    contentType?: string | undefined;
}

export interface EncryptionOptions {
    walletPrivateKey?: string;
    fileName?: string;
    contentType?: string;
    encoding?: 'ascii' | 'utf8' | 'utf-8' | 'utf16le' | 'ucs2' | 'ucs-2' | 'base64' | 'latin1' | 'binary' | 'hex';
}

export interface EncryptionResult {
    ciphertext: string;
    dataToEncryptHash: string;
}

export interface UploadResult {
    id: string;
    url: string;
    ciphertext: string;
    dataToEncryptHash: string;
}

// ---------- Constants ----------
export const LIT_NETWORK = "datil-dev" as const;
export const DEFAULT_CHAIN = "ethereum" as const;
export const IRYS_GATEWAY = "https://gateway.irys.xyz/" as const;
