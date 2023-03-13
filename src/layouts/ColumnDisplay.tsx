import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react"

const ColumnDisplay = (props: {children?: ReactElement<any> | ReactElement<any>[]} ) => {
    return (
        <div className="flex flex-col bg-stone-50">
            {props.children}
        </div>
    )
}

export default ColumnDisplay