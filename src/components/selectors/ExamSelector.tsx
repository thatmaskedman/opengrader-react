import { useQueryClient, useMutation, useQuery, QueryClient } from "@tanstack/react-query"
import axios from "axios"
import { FormEventHandler } from "react"
import { ExamData, StudentData } from "../../global/types"

interface ExamSelectProps {
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
    examGroup?: number 
}

const ExamSelector = (props: ExamSelectProps) => {
    const queryClient = useQueryClient()

    const fetchExam = (): Promise<ExamData[]> => 
        axios.get('/api/exams/', {params: {examgroup: props.examGroup}} )
            .then(res => res.data)

    const fetchStudentNames = (): Promise<StudentData[]> =>
         axios.get(`/api/students/`)
            .then(res => res.data)

    const studentQuery = useQuery({
        queryKey: ['students', props.examGroup], 
        queryFn:  fetchStudentNames
    })
    
    const examQuery = useQuery({
        queryKey: ['exams', props.examGroup],
        queryFn: fetchExam
    })


    const {isLoading: examIsLoading, isError: examIsError} = examQuery
    const {isLoading: studentIsLoading, isError: studentIsError} = studentQuery

    const examData = examQuery.data ?? []
    const studentData = studentQuery.data ?? []

    if(studentIsLoading && examIsLoading){
        return <></>
    }
    
    if(examIsError && studentIsError){
        return <></>
    }

    return (
        <div className="mb-5">
            <label htmlFor="examSelector" className="mb-3 block text-base font-medium text-[#07074D]" >Exam from: </label>
            <select name="examSelector" className="form-select w-full block" onChange={props.handleSelect} id="examSelector">
                {examData.map(exam =>
                    <option value={exam.id}> {studentData.find(s => s.id === exam.student)?.name}</option>
                )}
            </select>
        </div>
    )
}
export default ExamSelector