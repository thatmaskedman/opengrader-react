import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import KeySheetForm from '../layouts/KeySheetForm'
import examGroupService from '../services/examGroupService'
import keySheetService from '../services/keySheetService'
import ExamGroupSelector from '../components/selectors/ExamGroupSelector'

const KeySheetCreation = () => {
    const queryClient = useQueryClient()

    const examGroupQuery = useQuery({
        queryKey: ['examGroups'],
        queryFn: examGroupService.getAllExamGroups,
    })

    const keySheetQuery = useQuery({
        queryKey: ['keySheet'],
        queryFn: keySheetService.getAllKeySheets,
    })

    const data = examGroupQuery.data ?? []
    const keySheetData = keySheetQuery.data ?? []

    const [selectedExamGroup, setSelectedExamGroup] = useState(
        data[0]?.id ?? -1,
    )
    const [selectedKeySheet, setSelectedKeySheet] = useState(
        keySheetData[0]?.id ?? -1,
    )
    const [questionNum, setQuestionNum] = useState(0)

    const name = data.find((item) => item.id === selectedExamGroup)?.name ?? 0

    const handleExamGroupSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExamGroup(Number.parseInt(e.target.value))
        const questionNum =
            data.find((item) => item.id === selectedExamGroup)?.num_questions ??
            0
        console.log(e.target.value)
        setQuestionNum(questionNum)
    }

    return (
        <>
            <div className='mx-10 mb-5'>
                <ExamGroupSelector handleSelect={handleExamGroupSelect}/>
            </div>

            <div className='mx-10 mb-5'>
                <label
                    htmlFor='examGroupSelector'
                    className='font-base font-medium'
                >
                    Key
                </label>

                <select
                    name='examGroupSelector'
                    onChange={(e) =>
                        setSelectedKeySheet(Number.parseInt(e.target.value))
                    }
                    value={selectedKeySheet}
                    className='form-select'
                    id='examGroupSelector'
                >
                    {keySheetData
                        .filter((item) => item.exam_group === selectedExamGroup)
                        .map((keySheet) => (
                            <option key={keySheet.id}
                                value={keySheet.id}
                            >{`${keySheet.key_class.toUpperCase()}: ${name}`}</option>
                        ))}
                </select>
            </div>
            {questionNum !== 0 && (
                <KeySheetForm
                    questionNum={questionNum}
                    key_sheet={selectedKeySheet}
                />
            )}

            <div className='h-10'></div>
        </>
    )
}

export default KeySheetCreation
