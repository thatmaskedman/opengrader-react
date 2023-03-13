import httpService from './httpClient'
import { ExamGroupData } from '../global/types'
import { AxiosInstance, AxiosResponse } from 'axios'
import saveAs from 'file-saver'

const actionsService = {
    getExamData: (id: number) =>
        httpService
            .get(`/examdata/${id}`, {
                responseType: 'blob',
                params: { format: 'xls' },
            })
            .then((res) => {
                saveAs(res.data, 'exam_data.xls')
            }),

    getChosenData: (id: number) =>
        httpService
            .get(`/chosendata/${id}`, {
                responseType: 'blob',
                params: { format: 'xls' },
            })
            .then((res) => {
                saveAs(res.data, 'chosen_data.xls')
            }),

    getGradeData: (id: number) =>
        httpService
            .get(`/gradedata/${id}`, {
                responseType: 'blob',
                params: { format: 'xls' },
            })
            .then((res) => {
                saveAs(res.data, 'grade_data.xls')
            }),

    gradeExam: (id: number) => httpService.put(`/exams/${id}/grade/`),
}

export default actionsService
