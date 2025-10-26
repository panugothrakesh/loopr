import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";
import { LitAccessControlConditionResource, createSiweMessageWithRecaps, generateAuthSig } from "@lit-protocol/auth-helpers";
import type { SessionSigsMap } from "@lit-protocol/types";
import { LIT_ABILITY } from "@lit-protocol/constants";
import { LIT_NETWORK, DEFAULT_CHAIN } from "./types.js";

// ---------- Internal singletons ----------
let litClientSingleton: LitNodeClient | null = null;

export async function getLitNodeClient(): Promise<LitNodeClient> {
    if (litClientSingleton) return litClientSingleton;
    const client = new LitNodeClient({ litNetwork: LIT_NETWORK });
    await client.connect();
    litClientSingleton = client;
    return client;
}

export function requirePrivateKey(override?: string): string {
    const rawIn = override || process.env.PRIVATE_KEY;
    if (!rawIn) throw new Error("Missing PRIVATE_KEY in environment or function argument");
    const raw = rawIn.trim().replace(/^['"]|['"]$/g, "");
    if (/^0x[0-9a-fA-F]{64}$/.test(raw)) return raw;
    if (/^[0-9a-fA-F]{64}$/.test(raw)) return `0x${raw}`;
    const words = raw.split(/\s+/).filter(Boolean);
    if (words.length >= 12 && words.length <= 24) {
        try {
            const walletFromMnemonic = ethers.Wallet.fromMnemonic(raw);
            return walletFromMnemonic.privateKey;
        } catch { }
    }
    throw new Error(
        "PRIVATE_KEY must be a 64-hex string (with or without 0x) or a valid BIP39 mnemonic."
    );
}

// ---------- Session signatures (Node, SIWE) ----------
export async function getSessionSigs(litNodeClient: LitNodeClient, walletPrivateKey?: string): Promise<SessionSigsMap> {
    const privateKey = requirePrivateKey(walletPrivateKey);
    const wallet = new ethers.Wallet(privateKey);
    const walletAddress = await wallet.getAddress();

    const sessionSigs = await litNodeClient.getSessionSigs({
        chain: DEFAULT_CHAIN,
        resourceAbilityRequests: [
            {
                resource: new LitAccessControlConditionResource("*"),
                ability: LIT_ABILITY.AccessControlConditionDecryption,
            },
        ],
        authNeededCallback: async (params: any) => {
            const toSign = await createSiweMessageWithRecaps({
                uri: params.uri,
                expiration: params.expiration,
                resources: params.resourceAbilityRequests,
                walletAddress,
                nonce: await litNodeClient.getLatestBlockhash(),
                litNodeClient,
            });
            return await generateAuthSig({ signer: wallet, toSign });
        },
    });

    return sessionSigs;
}

// ---------- Shutdown helper ----------
export async function shutdownLit(): Promise<void> {
    if (litClientSingleton) {
        try {
            await litClientSingleton.disconnect?.();
        } catch { }
        litClientSingleton = null;
    }
}
