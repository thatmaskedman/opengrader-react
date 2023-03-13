import { useState } from "react"
import { Dialog } from '@headlessui/react'
import { ExamGroupData } from "../global/types"
import examGroupService from "../services/examGroupService"
import keySheetService from "../services/keySheetService"

const ExamGroupForm = () => {

    interface FormElements extends HTMLFormControlsCollection {
        name: HTMLInputElement,
        numQuestions: HTMLInputElement,
        date: HTMLInputElement,
      }

    interface UsernameFormElement extends HTMLFormElement {
        readonly elements: FormElements
    }

    const handleSubmit = (e: React.SyntheticEvent<UsernameFormElement>) => {
        e.preventDefault()
        const data: ExamGroupData = {
            name: e.currentTarget.elements.name.value,
            num_questions: Number.parseInt(e.currentTarget.elements.numQuestions.value),
            date: e.currentTarget.elements.date.value,
            avg_group_grade: 0.0
        }

        examGroupService.postExamGroup(data)
            .then(res => {
                const examGroupID = res.id ?? -1
                
                if(examGroupID === -1) 
                    return

                ['a', 'b', 'c', 'd', 'e'].forEach(key => {
                    keySheetService.postKeySheet({
                        key_class: key,
                        exam_group: examGroupID
                    })
                })
            })
        e.currentTarget.reset()
    }

    const [selectedKeySheet, setSelectedKeySheet] = useState(-1)

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={handleSubmit}
                className="py-6 px-9"
                >
                <div className="mb-5">
                    <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Exam group name
                    </label>
                    <input
                    type="text"
                    name="text"
                    id="name"
                    placeholder="Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>

                <div className="mb-5">
                    <label
                    htmlFor="numQuestions"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Number of questions
                    </label>
                    <input
                    type="number"
                    name="numQuestions"
                    id="numQuestions"
                    placeholder="Questions number"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>

                <div className="mb-5">
                    <label
                    htmlFor="date"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                    >
                    Date 
                    </label>
                    <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="Date"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                </div>

                <div>
                    <button
                    type="submit" 
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    >
                    Submit
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default ExamGroupForm