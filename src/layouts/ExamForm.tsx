import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useState } from 'react'
import ExamGroupSelector from '../components/selectors/ExamGroupSelector'
import ExamSelector from '../components/selectors/ExamSelector'
import KeySheetSelector from '../components/selectors/KeySheetSelector'
import StudentSelector from '../components/selectors/StudentSelector'
import { ExamData } from '../global/types'
import examGroupService from '../services/examGroupService'
import keySheetService from '../services/keySheetService'

const ExamForm = () => {
    interface FormElements extends HTMLFormControlsCollection {
        studentGroupSelector: any
        name: HTMLInputElement
        controlNum: HTMLInputElement
        file: HTMLInputElement
        keySheetSelector: HTMLSelectElement
        examGroupSelector: HTMLSelectElement
        date: HTMLInputElement
    }

    interface UsernameFormElement extends HTMLFormElement {
        readonly elements: FormElements
    }
    const [selectedKeySheet, setSelectedKeySheet] = useState(-1)
    const [selectedExamGroup, setSelectedExamGroup] = useState(-1)
    const [selectedStudent, setSelectedStudent] = useState(-1)

    const handleSubmit = (e: React.SyntheticEvent<UsernameFormElement>) => {
        e.preventDefault()

        let examFormData = new FormData()

        const imageData = e.currentTarget.elements.file.files
        if (!imageData) return

        examFormData.append(
            'student',
            e.currentTarget.elements.studentGroupSelector.value,
        )
        examFormData.append(
            'key_sheet',
            e.currentTarget.elements.keySheetSelector.value,
        )
        examFormData.append(
            'exam_group',
            e.currentTarget.elements.examGroupSelector.value,
        )
        examFormData.append('exam_image_original', imageData[0])

        console.log(examFormData)
        axios
            .postForm<ExamData>('/api/exams/', examFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res)

        e.currentTarget.reset()
    }

    const keySheetQuery = useQuery({
        queryKey: ['keySheets'],
        queryFn: keySheetService.getAllKeySheets,
    })

    const examGroupQuery = useQuery({
        queryKey: ['examGroups'],
        queryFn: examGroupService.getAllExamGroups,
    })

    const keySheetData = keySheetQuery.data ?? []
    const examGroupData = examGroupQuery.data ?? []

    // const handleSubmit = () => {
    //     axios.post("/api", data, {
    //         headers: {
    //         "Content-Type": "multipart/form-data",
    //         },
    //     })
    // }

    return (
        <div className='flex items-center justify-center p-12'>
            <div className='mx-auto w-full max-w-[550px] bg-white'>
                <form onSubmit={handleSubmit} className='py-6 px-9'>
                    {/* <div className="mb-5">
                    <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Name
                    </label>
                    <input
                    type="text"
                    name="text"
                    id="name"
                    placeholder="Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div> */}

                    <StudentSelector
                        handleSelect={(e: any): void =>
                            setSelectedStudent(e.target.value)
                        }
                    />

                    <div className='mb-5'>
                        <ExamGroupSelector
                            handleSelect={(e) => 
                                setSelectedExamGroup(Number.parseInt(e.target.value))
                            }
                        />
                    </div>
                    {selectedExamGroup !== -1 &&
                        <div className='mb-5'>
                            <KeySheetSelector
                                handleSelect={(e) =>
                                    setSelectedKeySheet(Number.parseInt(e.target.value))
                                }
                                examGroupID={selectedExamGroup}
                            />
                        </div>
                    }
                    <div className='mb-6 pt-4'>
                        <label className='mb-5 block text-xl font-semibold text-[#07074D]'>
                            Upload File
                        </label>

                        <div className='mb-8'>
                            <input
                                type='file'
                                name='file'
                                id='file'
                                className='sr-only'
                            />
                            <label
                                htmlFor='file'
                                className='relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center'
                            >
                                <div>
                                    <span className='mb-2 block text-xl font-semibold text-[#07074D]'>
                                        Drop files here
                                    </span>
                                    <span className='mb-2 block text-base font-medium text-[#6B7280]'>
                                        Or
                                    </span>
                                    <span className='inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]'>
                                        Browse
                                    </span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                        >
                            Send File
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExamForm
