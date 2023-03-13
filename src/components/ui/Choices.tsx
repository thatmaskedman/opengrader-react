import { RadioGroup } from "@headlessui/react"
import { FormEventHandler, useState } from "react"

interface ChoicesProps {
    id?: number
    num?: number
    key?: number
    handleSelect: FormEventHandler<HTMLDivElement> & ((value: string) => void)
}

const Choices = (props: ChoicesProps) => {
    
    return (

        <RadioGroup onChange={props.handleSelect}>
            <div className="flex select-none text-1xl my-3">
                {<h1 className="px-2 mx-4 w-5">{props.num}.</h1> ?? <></>}
                <RadioGroup.Option value='a'>
                {({checked}) => (
                        <span className={checked ? "px-4 m-1 h-20 w-20 rounded-full bg-black text-white border border-solid border-black": "px-4 m-1 h-20 w-20 rounded-full bg-white border border-solid border-black"}>A</span>
                    )}
                </RadioGroup.Option>
                <RadioGroup.Option value='b'>
                {({checked}) => (
                        <span className={checked ? "px-4 m-1 h-20 w-20 rounded-full bg-black text-white border border-solid border-black": "px-4 m-1 h-20 w-20 rounded-full bg-white border border-solid border-black"}>B</span>
                    )}
                </RadioGroup.Option> 
                <RadioGroup.Option value='c'>
                {({checked}) => (
                        <span className={checked ? "px-4 m-1 h-20 w-20 rounded-full bg-black text-white border border-solid border-black": "px-4 m-1 h-20 w-20 rounded-full bg-white border border-solid border-black"}>C</span>
                    )}
                </RadioGroup.Option> 
                <RadioGroup.Option value='d'>
                    {({checked}) => (
                        <span className={checked ? "px-4 m-1 h-20 w-20 rounded-full bg-black text-white border border-solid border-black": "px-4 m-1 h-20 w-20 rounded-full bg-white border border-solid border-black"}>D</span>
                    )}
                </RadioGroup.Option> 
                <RadioGroup.Option value='e'>
                    {({checked}) => (
                        <span className={checked ? "px-4 m-1 h-20 w-20 rounded-full bg-black text-white border border-solid border-black": "px-4 m-1 h-20 w-20 rounded-full bg-white border border-solid border-black"}>E</span>
                    )}
                </RadioGroup.Option> 

            </div>
        </RadioGroup>            

    )
}

export default Choices

