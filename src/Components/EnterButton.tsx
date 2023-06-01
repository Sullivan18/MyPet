import { FunctionComponent } from "react"

interface ButtonProps {
    onClick: () => void;
}

const Button: FunctionComponent<ButtonProps> = () => {
    return(
        <button>Entrar</button>
    )
}

export default Button