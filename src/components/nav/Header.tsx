import { FunctionComponent } from "react";
import { WalletComponents } from "./Wallet";

export const Header: FunctionComponent = () => {


    return (
        <header className="flex flex-row items-center justify-between px-2 py-1 border-b border-white/10">
            <div className="flex flex-row flex-1">
                <h1>Dlogz</h1>
            </div>
            <div className="">
                <WalletComponents />
            </div>
        </header>
    );
};