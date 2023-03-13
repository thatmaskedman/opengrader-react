import GradedExamFrame from '../components/GradedExamFrame'
import ExamGroupCardList from '../layouts/ExamGroupCardList'
import {
    FolderPlusIcon,
    BackspaceIcon,
    ForwardIcon,
} from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { Link } from '@tanstack/react-router'
import examService from '../services/examService'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import actionsService from '../services/actionsService'
import { Switch } from '@headlessui/react'
import { ExamData } from '../global/types'
import axios from 'axios'
import ExamSelector from '../components/selectors/ExamSelector'
import StudentSelector from '../components/selectors/StudentSelector'
import KeySheetSelector from '../components/selectors/KeySheetSelector'
import ExamGroupSelector from '../components/selectors/ExamGroupSelector'

const ExamCreationWizard = () => {
    interface FormElements extends HTMLFormControlsCollection {
        studentGroupSelector: any
        name: HTMLInputElement
        controlNum: HTMLInputElement
        file: HTMLInputElement
        keySheetSelector: HTMLSelectElement
        examSelector: HTMLSelectElement
        date: HTMLInputElement
    }

    interface UsernameFormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const [selectedExam, setSelectedExam] = useState(-1)
    const [selectedExamGroup, setSelectedExamGroup] = useState(-1)
    const [keySheetID, setKeySheetID] = useState(-1)
    const [graded, setGraded] = useState(false)

    const queryClient = useQueryClient()

    const fetchExams = (): Promise<ExamData[]> =>
        axios.get('/api/exams/').then((res) => res.data)

    const examQuery = useQuery({
        queryKey: ['exams'],
        queryFn: fetchExams,
    })

    const { data, isSuccess, isLoading, isError } = examQuery

    const handleGrade = () => {
        actionsService.gradeExam(selectedExam)
        queryClient.invalidateQueries()
    }

    const handleExamGroupSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        const examGroupId = e.target.value
        console.log(examGroupId)
        setSelectedExamGroup(Number.parseInt(examGroupId))
        queryClient.invalidateQueries()
    }

    const handleExamSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        // const examId = e.currentTarget.examSelector.value
        e.preventDefault()
        const examId = e.target.value
        console.log(examId)
        setSelectedExam(Number.parseInt(examId))
    }

    if (isLoading) return 'Loading'

    if (isError) return 'Error'

    const examURLOriginal = data.find(
        (item) => item.id === selectedExam,
    )?.exam_image_original

    const examURLGraded = data.find(
        (item) => item.id === selectedExam,
    )?.exam_image_graded

    const examURLGrid = data.find(
        (item) => item.id === selectedExam,
    )?.exam_image_grid


    return (
        <>
            <div className='h-screen'>
                <div className='mx-10 mb-5'>
                    <ExamGroupSelector handleSelect={handleExamGroupSelect} />
                </div>

                <div className='mx-10 mb-5'>
                    <ExamSelector handleSelect={handleExamSelect} />
                </div>

                <button className=''></button>

                {selectedExam !== -1 && (
                    <>
                        <GradedExamFrame
                            url={examURLOriginal}
                        />
                        {examURLGraded &&
                        <>

                            <GradedExamFrame
                                url={examURLGrid}
                            />
                    
                        
                            <GradedExamFrame
                                url={examURLGraded}
                            />
                        </>
                        }
                        <div className='flex items-center justify-center p-12'>
                            <div className='m-5'>
                                <button
                                    onClick={handleGrade}
                                    className='hover:shadow-form w-50 rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                                >
                                    Grade
                                </button>
                            </div>
                            <div className='m-5'>
                                <label htmlFor=''>Graded</label>
                                <Switch
                                    checked={graded}
                                    onChange={setGraded}
                                    as={Fragment}
                                >
                                    {({ checked }) => (
                                        /* Use the `checked` state to conditionally style the button. */
                                        <button
                                            className={`${
                                                checked
                                                    ? 'bg-blue-600'
                                                    : 'bg-gray-200'
                                            } relative inline-flex h-6 w-11 items-center rounded-full`}
                                        >
                                            <span className='sr-only'>
                                                Enable notifications
                                            </span>
                                            <span
                                                className={`${
                                                    checked
                                                        ? 'translate-x-6'
                                                        : 'translate-x-1'
                                                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                                            />
                                        </button>
                                    )}
                                </Switch>
                            </div>
                        </div>
                    </>
                )}
                <Link to='/examform'>
                    <button className='fixed z-90 bottom-20 right-8 bg-blue-600 hover:bg-blue-700 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white '>
                        <FolderPlusIcon className='h-10 w-10' />
                    </button>
                </Link>
            </div>
        </>
    )
}

export default ExamCreationWizard
