import { useEffect, useState } from 'react'

import ExamGroupCard from '../components/ExamGroupCard'

import { Outlet, RouterProvider, Link, useMatch } from '@tanstack/react-router'

import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import httpService from '../services/httpClient'
import { ExamGroupData } from '../global/types'
import examGroupService from '../services/examGroupService'

const ExamGroupCardList = () => {
    const queryClient = useQueryClient()

    const examGroupQuery = useQuery(
        ['examGroups'],
        examGroupService.getAllExamGroups,
    )

    const data = examGroupQuery.data ?? []

    if (examGroupQuery.isLoading) {
        return (
            <>
                <h1>Loading</h1>
            </>
        )
    }

    return (
        <>
            <div className='flex flex-col initial'>
                <ul>
                    {data.map((examGroup) => (
                        <li key={examGroup.id}>
                            <ExamGroupCard
                                id={examGroup.id}
                                name={examGroup.name}
                                date={examGroup.date}
                                averageGrade={0.0}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default ExamGroupCardList
