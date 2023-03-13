import axios from 'axios'
import { useState } from 'react'
import ExamGroupSelector from '../components/selectors/ExamGroupSelector'

const UploadSpreadSheetForm = () => {
    const [selectedExamGroup, setSelectedExamGroup] = useState(-1)

    const handleSubmit = (e: any) => {
        e.preventDefault()

        let spreadsheetFormData = new FormData()

        const spreadsheetData = e.currentTarget.elements.file.files
        if (!spreadsheetData) return

        spreadsheetFormData.append('file', spreadsheetData[0])
        spreadsheetFormData.append(
            'examgroup',
            e.currentTarget.elements.examGroupSelector.value,
        )

        axios
            .postForm<void>('/api/upload/', spreadsheetFormData, {
                headers: {
                    // 'Accept': 'text/html; charset=utf-8',
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => res)

        e.currentTarget.reset()
    }

    return (
        <div className='flex items-center justify-center p-12'>

            <form onSubmit={handleSubmit}>
                <ExamGroupSelector
                    handleSelect={(e: any): void =>
                        setSelectedExamGroup(Number.parseInt(e.target.value))
                    }
                />

                <div className='mb-6 pt-4'>
                    <label className='mb-5 block text-xl font-semibold text-[#07074D]'>
                        Upload Spreadsheet
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
    )
}
export default UploadSpreadSheetForm
