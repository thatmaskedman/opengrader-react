import httpService from './httpClient'
import { ExamGroupData } from '../global/types'
import { AxiosInstance, AxiosResponse } from 'axios'

const examGroupService = {
    getAllExamGroups: () =>
        httpService.get<ExamGroupData[]>('/examgroups').then((res) => res.data),

    getExamGroup: (id: number) =>
        httpService
            .get<ExamGroupData>(`/examgroups/${id}`)
            .then((res) => res.data),

    postExamGroup: (fields: ExamGroupData) =>
        httpService
            .post<ExamGroupData>('/examgroups/', fields)
            .then((res) => res.data),

    updateExamGroup: (id: number, fields: ExamGroupData) =>
        httpService.post('/examgroups/', fields).then((res) => res.data),

    deleteExamGroup: (id: number) =>
        httpService.delete(`/examgroups/${id}`).then((res) => res.data),
}

export default examGroupService
