import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"

interface GradedExamFrameProps {
    url: string | undefined
}

const GradedExamFrame = (props: GradedExamFrameProps) => {
    
    return (
            <>
            <div className='bg-gray-100 p-4 m-5'>
                <img src={props.url} className='object-contain w-96 h-96' />
            </div>
            </>
    )
}

export default GradedExamFrame