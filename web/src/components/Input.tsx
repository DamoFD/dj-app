import { IconType } from "react-icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    StartAdornment?: IconType;
    StartAdornmentOnClick?: () => void;
    EndAdornment?: IconType;
    EndAdornmentOnClick?: () => void;
    className?: string;
}

const Input: React.FC<InputProps> = ({
    StartAdornment,
    StartAdornmentOnClick,
    EndAdornment,
    EndAdornmentOnClick,
    className,
    ...rest
}) => {

    return (
        <div className="relative focus-within:text-blue-600">
            {StartAdornment && <StartAdornment
                className={`absolute left-1 top-1/2 -translate-y-1/2 text-lg ${StartAdornmentOnClick ? "cursor-pointer" : ""}`}
                onClick={StartAdornmentOnClick}
            /> }
            <input className={`peer border-b border-black rounded-none px-8 text-lg focus:border-blue-600 focus:text-blue-600 ${className}`} {...rest} />
            {EndAdornment && <EndAdornment
                className={`absolute right-1 top-1/2 -translate-y-1/2 text-lg ${EndAdornmentOnClick ? "cursor-pointer" : ""}`}
                onClick={EndAdornmentOnClick}
            />}
        </div>
    );
}

export default Input;
