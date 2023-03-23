import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import {
    FormEvent,
    useState,
    Fragment,
    useEffect,
    FormEventHandler,
} from 'react'
import Choices from '../components/ui/Choices'
import { KeyQuestionData, ExamGroupData, KeySheetData } from '../global/types'
import examGroupService from '../services/examGroupService'
import keySheetService from '../services/keySheetService'
import produce from 'immer'

interface KeySheetFormProps {
    questionNum: number
    key_sheet: number
    startKeyData?: KeyQuestionData[]
}

const KeySheetForm = (props: KeySheetFormProps) => {
    // if(props.key_sheet === -1)
    //     return (<></>)

    const [selectedKeyChoice, setSelectedKeyChoice] = useState(-1)
    const queryClient = useQueryClient()

    const fetchKeyQuestions = (): Promise<KeyQuestionData[]> =>
        axios
            .get<KeySheetData>(`/api/keysheets/${props.key_sheet}/`)
            .then((res) => {
                const keyQuestions = res.data.key_questions ?? []
                return keyQuestions
            })

    const keyQuestionQuery = useQuery({
        queryKey: ['keyquestions', props.key_sheet],
        queryFn: fetchKeyQuestions,
    })

    const updateKeyQuestion = ({
        id,
        data,
    }: {
        id: number
        data: KeyQuestionData
    }) =>
        axios.put<KeyQuestionData>(
            `/api/keyquestions/${selectedKeyChoice}/`,
            data,
        )

    const mutation = useMutation({
        mutationFn: updateKeyQuestion,
        onSuccess: (data) => {
            queryClient.setQueryData(['keyquestions', selectedKeyChoice], data)
        },
    })

    const { data, isLoading, isError } = keyQuestionQuery

    if (isLoading) {
        return <>Loading...</>
    }

    if (isError) {
        return <>Error</>
    }

    const handleSelect = (e: string, keyQuestion: KeyQuestionData) => {
        const keyId = keyQuestion.id ?? 0
        setSelectedKeyChoice(keyId)
        mutation.mutate({
            id: 1,
            data: { ...keyQuestion, id: keyId, chosen: e },
        })
        console.log({ ...keyQuestion, id: keyId, chosen: e })
    }

    return (
        <form>
            <div className='mb-10'>
                <ul>
                    {data.map((keyQuestion) => (
                        <li>
                            <Choices
                                key={keyQuestion.id}
                                num={keyQuestion.number}
                                handleSelect={(e: any) =>
                                    handleSelect(e, keyQuestion)
                                }
                            />
                        </li>
                    ))}
                </ul>
                {/* <div className='hover:shadow-form w-30 h-10 rounded-md bg-[#6A64F1] mb-20 py-3 px-8 text-center text-base font-semibold text-white outline-none"'>
                    <button onClick={handleSubmit}>Submit</button>
                </div> */}
            </div>
        </form>
    )
}

export default KeySheetForm
