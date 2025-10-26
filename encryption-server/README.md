# Encryption Server

A TypeScript-based encryption server that integrates Lit Protocol for encryption/decryption and Irys for decentralized storage. This server provides both HTTP API endpoints and command-line tools for secure file and data encryption.

## Features

- 🔐 **Lit Protocol Integration**: Encrypt/decrypt data using Lit Protocol's access control conditions
- 🌐 **Irys Storage**: Store encrypted data on the decentralized Irys network
- 🚀 **HTTP API**: RESTful endpoints for encryption operations
- 💻 **CLI Tools**: Command-line scripts for file operations
- 🔑 **Wallet Support**: Works with private keys or BIP39 mnemonics
- 📁 **File Support**: Handle both text and binary files
- 🛡️ **Access Control**: Define who can decrypt your data

## Prerequisites

- Node.js 18+ 
- npm or yarn
- A wallet with some ETH for gas fees
- Private key or BIP39 mnemonic

## Installation

1. Clone the repository and navigate to the encryption-server directory:
```bash
cd encryption-server
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

## Configuration

1. Copy the environment example file:
```bash
cp env.example .env
```

2. Edit `.env` with your configuration:
```env
# Required: Your wallet private key or BIP39 mnemonic
PRIVATE_KEY=your_private_key_here

# Optional: Server port (default: 8787)
PORT=8787

# Optional: Recipient address for testing
RECIPIENT_ADDRESS=0x29FB8276DdA3Fe8a841552CA6BF7518D0Fa9eE25
```

## Usage

### HTTP Server

Start the server:
```bash
npm run serve
```

The server will be available at `http://localhost:8787` (or your configured port).

#### API Endpoints

**Health Check**
```bash
GET /api/health
```

**Upload Encrypted Data**
```bash
POST /api/irys/upload
Content-Type: application/json

{
  "cipherText": "encrypted_data_here",
  "dataToEncryptHash": "hash_here",
  "accessControlConditions": [...],
  "fileName": "optional_filename",
  "contentType": "optional_content_type"
}
```

### CLI Tools

**Upload a file:**
```bash
npm run upload:file -- /path/to/file.txt 0xRecipientAddress
```

**Download and decrypt a file:**
```bash
npm run download:file -- irys_id_here /output/directory
```

**Test the complete flow:**
```bash
npm run test:flow
```

## API Reference

### Types

```typescript
interface AccessControlCondition {
  contractAddress: string;
  standardContractType: string;
  chain: string;
  method: string;
  parameters: string[];
  returnValueTest: {
    comparator: string;
    value: string;
  };
}

interface EncryptedPayload {
  cipherText: string;
  dataToEncryptHash: string;
  accessControlConditions: AccessControlCondition[];
  fileName?: string;
  contentType?: string;
}
```

### Core Functions

```typescript
// Encrypt and upload string data
const result = await encryptAndUploadString(
  "Hello, World!",
  accessControlConditions,
  { walletPrivateKey: "0x..." }
);

// Encrypt and upload file
const result = await encryptAndUploadFile(
  "/path/to/file.pdf",
  accessControlConditions,
  { walletPrivateKey: "0x..." }
);

// Download and decrypt by ID
const decrypted = await downloadAndDecryptById(
  "irys_id_here",
  { walletPrivateKey: "0x..." }
);
```

### Access Control Examples

**Single Address Access:**
```typescript
const acc = accForSingleAddress("0x1234...");
```

**Custom Access Control:**
```typescript
const acc: AccessControlCondition[] = [
  {
    contractAddress: "",
    standardContractType: "",
    chain: "ethereum",
    method: "",
    parameters: [":userAddress"],
    returnValueTest: { 
      comparator: "=", 
      value: "0x1234..." 
    },
  },
];
```

## Development

### Build
```bash
npm run build
```

### Development Mode
```bash
npm run dev
```

### Project Structure

```
encryption-server/
├── scripts/           # CLI tools
├── dist/             # Compiled JavaScript
├── types.ts          # TypeScript type definitions
├── lit-client.ts     # Lit Protocol client
├── encryption.ts     # Core encryption functions
├── irys-storage.ts   # Irys storage integration
├── utils.ts          # Utility functions
├── server.ts         # HTTP server
└── package.json      # Dependencies and scripts
```

## Security Notes

- Keep your private key secure and never commit it to version control
- Use environment variables for sensitive configuration
- The server uses Lit Protocol's access control conditions for decryption
- All data is encrypted before being stored on Irys

## Troubleshooting

**"Missing PRIVATE_KEY" error:**
- Ensure your `.env` file contains a valid `PRIVATE_KEY`
- The key can be a 64-character hex string or BIP39 mnemonic

**"Upload failed" error:**
- Check that your wallet has sufficient ETH for gas fees
- Verify your private key is correct

**"Failed to retrieve data" error:**
- Ensure the Irys ID is correct
- Check that the data hasn't expired

## License

ISC
