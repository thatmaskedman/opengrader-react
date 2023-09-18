import React, { useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import KeySheetForm from '../layouts/KeySheetForm'
import examGroupService from '../services/examGroupService'
import keySheetService from '../services/keySheetService'
import ExamGroupSelector from '../components/selectors/ExamGroupSelector'
import KeySheetSelector from '../components/selectors/KeySheetSelector'


const KeySheetCreation = () => {
    const [selectedExamGroup, setSelectedExamGroup] = useState(-1)
    const [selectedKeySheet, setSelectedKeySheet] = useState(-1)
    const [questionNum, setQuestionNum] = useState(0)

    const queryClient = useQueryClient()

    const examGroupQuery = useQuery({
        queryKey: ['examGroups', selectedExamGroup],
        queryFn: examGroupService.getAllExamGroups,
    })

    const keySheetQuery = useQuery({
        queryKey: ['keySheet', selectedKeySheet],
        queryFn: keySheetService.getAllKeySheets,
        initialData: [],

    })

    const data = examGroupQuery.data ?? []
    const keySheetData = keySheetQuery.data ?? []


    const name = data.find((item) => item.id === selectedExamGroup)?.name ?? 0

    const handleExamGroupSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedExamGroup(Number.parseInt(e.target.value))
        const questionNum =
            data.find((item) => item.id === selectedExamGroup)?.num_questions ??
            0
        console.log(e.target.value)
        setQuestionNum(questionNum)
    }
    const handleKeySheetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value)
        setSelectedKeySheet(Number.parseInt(e.target.value))
    }

    return (
        <>
            <div className='mx-10 mb-5'>
                <ExamGroupSelector handleSelect={handleExamGroupSelect}/>
            </div>

            <div className='mx-10 mb-5'>

                <KeySheetSelector handleSelect={handleKeySheetSelect} examGroupID={selectedExamGroup}/>

            </div>
            {(questionNum !== 0 && selectedKeySheet !== -1) && (
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
