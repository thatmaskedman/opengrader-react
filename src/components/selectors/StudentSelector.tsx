import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FormEventHandler } from 'react'
import { StudentData } from '../../global/types'

interface StudentSelectProps {
    handleSelect: FormEventHandler<HTMLDivElement> & ((value: string) => void);
    examGroupID?: number
    disabled: boolean
}

const StudentSelector = (props: StudentSelectProps) => {
    const queryClient = useQueryClient()

    const fetchStudents = (): Promise<StudentData[]> =>
        axios.get('/api/students/', {params: {examgroup: props.examGroupID}})
            .then((res) => res.data)

    const studentQuery = useQuery({
        queryKey: ['students', props.examGroupID],
        queryFn: fetchStudents,
    })

    const { data, isLoading, isError } = studentQuery

    if (isLoading) {
        return <></>
    }

    if (isError) {
        return <></>
    }

    return (
        <div className='mb-5'>
            <label
                htmlFor='studentSelector'
                className='mb-3 block text-base font-medium text-[#07074D]'
            >
                Student
            </label>
            <select
                name='studentSelector'
                className='form-select w-full block'
                id='studentGroupSelector'
                disabled={props.disabled}
            >
                {data.map((student) => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                ))}
            </select>
        </div>
    )
}

export default StudentSelector
