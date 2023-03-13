import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { FormEventHandler } from "react"
import { ExamGroupData, StudentData } from "../../global/types"

interface ExamGroupSelectorProps {
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const ExamGroupSelector = (props: ExamGroupSelectorProps) => {
    const queryClient = useQueryClient()
    queryClient.invalidateQueries()

    const fetchExamGroups = (): Promise<ExamGroupData[]> => 
        axios.get('/api/examgroups/')
            .then(res => res.data)

    const studentQuery = useQuery({
        queryKey: ['examgroups'], 
        queryFn: fetchExamGroups
    })

    const {data, isLoading, isError} = studentQuery

    if(isLoading){
        return <></>
    }
    
    if(isError){
        return <></>
    }

    return (
        <div className="mb-5">
            <label htmlFor="studentSelector" className="mb-3 block text-base font-medium text-[#07074D]" >Exam Group</label>
            <select name="examGroupSelector" className="form-select w-full block" id="examGroupSelector" onChange={props.handleSelect}>
                {data.map(examGroup => 
                    <option key={examGroup.id} value={examGroup.id}>{examGroup.name}</option>
                )}
            </select>
        </div>
    )
}

export default ExamGroupSelector