import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { baseSepolia, sepolia, mainnet } from "wagmi/chains";
import { config } from "./config/wagmi";
import logo from "./assets/blue.png"

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID || "cmfcfh3j000mklg0cr7kod0cx"}
      config={{
        // Login methods
        loginMethods: ["email", "wallet"],
        // Appearance
        appearance: {
          theme: 'light',
          accentColor: '#1c01fe',
          logo: logo,
        },
        // Embedded wallets
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          requireUserPasswordOnCreate: false,
        },
        // Default chain for embedded wallets
        defaultChain: sepolia,
        // Supported chains
        supportedChains: [baseSepolia, sepolia, mainnet],
      }}
    >
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </WagmiProvider>
    </PrivyProvider>
  </React.StrictMode>
);
