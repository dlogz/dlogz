import { coinbaseWallet } from "wagmi/connectors";
import { http, createConfig } from "wagmi";
import { baseSepolia } from 'wagmi/chains';


export const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
        coinbaseWallet({
            appName: 'Dlogz',
        }),
    ],
    ssr: true,
    transports: {
        [baseSepolia.id]: http(),
    },
});

export const ETH_NULL_MEMORY = '0x0000000000000000000000000000000000000000' as `0x${string}`;