import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import KeySheetSelector from '../components/selectors/KeySheetSelector'
import actionsService from '../services/actionsService'
import examGroupService from '../services/examGroupService'
import keySheetService from '../services/keySheetService'

const StatsView = () => {
    const queryClient = useQueryClient()

    const examGroupQuery = useQuery({
        queryKey: ['examGroups'],
        queryFn: examGroupService.getAllExamGroups,
    })

    const keySheetQuery = useQuery({
        queryKey: ['keySheets'],
        queryFn: keySheetService.getAllKeySheets,
    })
    const examGroupData = examGroupQuery.data ?? []
    const keySheetData = keySheetQuery.data ?? []

    const [keysheet, setKeySheet] = useState(examGroupData[0]?.id ?? -1)
    const [examGroup, setExamGroup] = useState(keySheetData[0]?.id ?? -1)

    return (
        <>
            <div className='flex flex-col items-center justify-center p-12'>
                <div className='mb-5'>
                    <KeySheetSelector handleSelect={e => setKeySheet(Number.parseInt(e.target.value))}/>
                </div>

                <div className='m-5'>
                    <button
                        onClick={() => actionsService.getChosenData(keysheet)}
                        className='hover:shadow-form w-50 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                    >
                        Chosen Data
                    </button>
                </div>

                <div className='mb-5'>
                    <label
                        htmlFor='name'
                        className='mb-3 block text-base font-medium text-[#07074D]'
                    >
                        Exam Group
                    </label>
                    <select
                        name='examSelector'
                        className='form-select'
                        id='examSelector'
                        onChange={(e) =>
                            setExamGroup(Number.parseInt(e.target.value))
                        }
                    >
                        {examGroupData.map((exam) => (
                            <option value={exam.id}>{exam.name}</option>
                        ))}
                    </select>
                </div>

                <div className='m-5'>
                    <button
                        onClick={() => actionsService.getExamData(examGroup)}
                        className='hover:shadow-form w-50 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                    >
                        Exam Data
                    </button>
                </div>

                <div className='m-5'>
                    <button
                        onClick={() => actionsService.getGradeData(examGroup)}
                        className='hover:shadow-form w-50 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                    >
                        Question Data
                    </button>
                </div>
            </div>
        </>
    )
}

export default StatsView
