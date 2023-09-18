import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
import { ExamData } from "../global/types"
import Spinner from "./ui/Spinner"

interface GradedExamFrameProps {
    url: string | undefined 
    examID: number
}

const GradedExamFrame = (props: GradedExamFrameProps) => {    
    const fetchExam = (): Promise<ExamData> => 
        axios.get(`/api/exams/${props.examID}` )
            .then(res => res.data)

    const examQuery = useQuery({
        queryKey: ['examImages', props.examID],
        queryFn: fetchExam
    })

    const {data, isLoading, isError} = examQuery
    
    if (isLoading) {
        return <></>
    }
    
    if (isError) {
        return <></>
    }
        

    return (
            <>
                <div className='bg-gray-100 p-4 m-5'>
                    <img src={data.exam_image_original} key={data.exam_image_original} className='object-contain w-96 h-96' />
                </div>
                <div className='bg-gray-100 p-4 m-5'>
                    <img src={data.exam_image_grid} key={data.exam_image_grid} className='object-contain w-96 h-96' />
                </div>
                <div className='bg-gray-100 p-4 m-5'>
                    <img src={data.exam_image_graded} key={data.exam_image_graded} className='object-contain w-96 h-96' />
                </div>

            </>
    )
}

export default GradedExamFrame