import { Button, ButtonProps } from "./button";
import { useState } from "react";

interface PromiseButtonProps extends ButtonProps {
    onClick: () => Promise<void> | void;
    disabled?: boolean;
}

const PromiseButton: React.FC<PromiseButtonProps> = ({ onClick, children, disabled }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            await onClick();
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button onClick={handleClick} disabled={loading || disabled}>
            {loading ? "Loading..." : children}
        </Button>
    );
};

export default PromiseButton;
