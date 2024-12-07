import { coinbaseWallet } from "wagmi/connectors";
import { http, createConfig } from "wagmi";
import { sepolia } from 'wagmi/chains';


export const wagmiConfig = createConfig({
    chains: [sepolia],
    connectors: [
        coinbaseWallet({
            appName: 'Dlogz',
        }),
    ],
    ssr: true,
    transports: {
        [sepolia.id]: http(),
    },
});

export const ETH_NULL_MEMORY = '0x0000000000000000000000000000000000000000' as `0x${string}`;