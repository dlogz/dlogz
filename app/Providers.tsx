"use client";

import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains'; // add baseSepolia for testing
import { AnonAadhaarProvider } from '@anon-aadhaar/react';

export function Providers(props: { children: ReactNode }) {
    return (
        <OnchainKitProvider
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            chain={base} // add baseSepolia for testing
        >
            <AnonAadhaarProvider _useTestAadhaar={true}>
                {props.children}
            </AnonAadhaarProvider>
        </OnchainKitProvider>
    );
}