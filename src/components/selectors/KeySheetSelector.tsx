import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FormEventHandler } from 'react'
import { ExamGroupData, KeySheetData, StudentData } from '../../global/types'

interface KeySheetSelectorProps {
    examGroupID: number
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const KeySheetSelector = (props: KeySheetSelectorProps) => {
    // const queryClient = useQueryClient()

    const fetchKeySheets = (): Promise<KeySheetData[]> =>
        axios
            .get<KeySheetData[]>('/api/keysheets/')
            .then((res) => res.data)

    const keySheetQuery = useQuery({
        queryKey: ['keysheets'],
        queryFn: fetchKeySheets,
    })

    const fetchExamGroupNames = (): Promise<ExamGroupData[]> =>
        axios.get(`/api/examgroups/`).then((res) => res.data)

    const examGroupQuery = useQuery({
        queryKey: ['examgroups'],
        queryFn: fetchExamGroupNames,
    })

    const { isLoading: keySheetIsLoading, isError: keySheetIsError } =
        keySheetQuery
    const { isLoading: examGroupIsLoading, isError: examGroupIsError } =
        examGroupQuery

    const keySheetData = keySheetQuery.data ?? []
    const examGroupData = examGroupQuery.data ?? []

    if (keySheetIsLoading && examGroupIsLoading) {
        return <></>
    }

    if (keySheetIsError && examGroupIsError) {
        return <></>
    }
    return (
        <div className='mb-5'>
            <label
                htmlFor='studentSelector'
                className='mb-3 block text-base font-medium text-[#07074D]'
            >
                Key Sheet
            </label>
            <select
                name='studentSelector'
                className='form-select w-full block'
                id='keySheetSelector'
                onChange={props.handleSelect}
            >
                {keySheetData.map((keySheet) => (
                    <option
                        value={keySheet.id}
                    >{`${keySheet.key_class.toUpperCase()}: ${
                        examGroupData?.find(
                            (item) => keySheet.exam_group === item.id,
                        )?.name
                    }`}</option>
                ))}
            </select>
        </div>
    )
}

export default KeySheetSelector
