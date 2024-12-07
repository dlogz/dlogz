import {
    ConnectWallet,
    Wallet as CoinbaseWallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownFundLink,
    WalletDropdownLink,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';



export function Wallet() {
    return (
        <CoinbaseWallet>
            <ConnectWallet className='h-10 text-sm font-bold'>
                <Avatar className="h-4 w-4" />
                <Name className='text-sm font-bold' />
            </ConnectWallet>
            <WalletDropdown>
                <Identity
                    className="px-4 pt-3 pb-2"
                    hasCopyAddressOnClick
                >
                    <Avatar />
                    <Name />
                    <Address />
                    <EthBalance />
                </Identity>
                <WalletDropdownBasename />
                <WalletDropdownLink
                    icon="wallet"
                    href="https://keys.coinbase.com"
                >
                    Wallet
                </WalletDropdownLink>
                <WalletDropdownFundLink />
                <WalletDropdownDisconnect />
            </WalletDropdown>
        </CoinbaseWallet>
    );
}