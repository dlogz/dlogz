import { FunctionComponent } from "react";
import { Wallet } from "./Wallet";

export const Header: FunctionComponent = () => {


    return (
        <header className="flex flex-row items-center justify-between px-6 py-3 border-b border-white/10">
            <div className="flex flex-row flex-1">
                <h1>Dlogz</h1>
            </div>
            <div className="">
                <Wallet />
            </div>
        </header>
    );
};