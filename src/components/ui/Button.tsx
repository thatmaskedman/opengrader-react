import { FC } from "react";

type ButtonProps = {
    innerText: string 
}

const Button = ({innerText}: ButtonProps) => {
    return (
        <>
            <button className="">{innerText}</button>
        </>
    )
}

export default Button