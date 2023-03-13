import ExamGroupCardList from "../layouts/ExamGroupCardList"
import {FolderPlusIcon} from '@heroicons/react/24/outline'
import ExamGroupForm from "../layouts/ExamGroupForm"
import { useState } from "react"
import ExamForm from "../layouts/ExamForm"
import UploadSpreadSheetForm from "../layouts/UploadSpreadSheetForm"

const ExamGroupCreation = () => {
    return (
        <>
           <ExamGroupForm/>
            {/* <ExamGroupCardList/> */}
            <UploadSpreadSheetForm/>
            
            <button
                className="fixed z-90 bottom-20 right-8 bg-blue-600 hover:bg-blue-700 w-16 h-16 rounded-full drop-shadow-lg flex justify-center items-center text-white ">
                <FolderPlusIcon className="h-10 w-10"/>
            </button>

        </>
    )
}

export default ExamGroupCreation