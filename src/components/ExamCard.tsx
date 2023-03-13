import {FC} from 'react' 

interface ExamFields {
    id: number
    name: string
    controlNum: string
}

const ExamCard = (props: ExamFields) => {
    return (
        <div className="flex flexrow shadow py-5 mx-5 my-5">
            <div className="basis-1/2 px-5">
                <h1 className="font-sans text-md"> {props.name}</h1>
            </div>
            <div className="basis-1/2">
                <h2 className="font-sans">{props.controlNum}</h2>
            </div>
        </div>
    )
}

export default ExamCard