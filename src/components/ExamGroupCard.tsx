import { useEffect, useState } from "react"
import { ExamGroupData } from "../global/types"
import httpService from "../services/httpClient" 

import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline"

interface ExamGroupsProps {
    id: number | null | undefined
    name: string 
    date: string 
    averageGrade: number

}

const ExamGroupCard = (props: ExamGroupsProps) => {
    
    return (
            <div className='flex rounded-lg shadow-lg border-black px-2 py-4 my-2 mx-3 '>
                <div className="flex flex-col">
                    <div className='flex h-4 w-auto font-bold mx-10'>
                        <h1 className="font-medium">{props.name}</h1>
                    </div>
                    <div className='flex py-x1 w-auto'>
                        <h1 className="font-light">{props.date}</h1>
                    </div>
                    <div className='flex w-auto px'>
                        <h3>{props.averageGrade}</h3>
                    </div>
                    <div>

                </div>

                </div>
            </div>
        )
    }

export default ExamGroupCard