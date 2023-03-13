import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FormEventHandler } from 'react'
import { StudentData } from '../../global/types'

interface StudentSelectProps {
    handleSelect: FormEventHandler<HTMLDivElement> & ((value: string) => void)
}

const StudentSelector = (props: StudentSelectProps) => {
    // const queryClient = useQueryClient()

    const fetchStudents = (): Promise<StudentData[]> =>
        axios.get('/api/students/').then((res) => res.data)

    const studentQuery = useQuery({
        queryKey: ['students'],
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
            >
                {data.map((student) => (
                    <option key={student.id} value={student.id}>{student.name}</option>
                ))}
            </select>
        </div>
    )
}

export default StudentSelector
