import httpService from "./httpClient"
import { ExamData, QuestionData } from "../global/types"

const examService = {
    getAllExams: () =>  
        httpService.get<ExamData[]>('/exams')
            .then(res => res.data),

    getExam: (id: number) => 
        httpService
            .get<ExamData>(`/exams/${id}`)
            .then(res => res.data),

    postExam: (fields: ExamData) => {
        httpService.post('/exams', fields)
            .then(res => {
                // let data = res.data   
            })
    },

    updateExam: (id:number, fields: ExamData) => {
        httpService.put(`/exams/${id}`, fields)
        .then(res => {
            // let data = res.data   
        })
    },

    deleteExam: (id: number) => httpService.delete(`/exams/${id}`),

    updateExamQuestion: (id: number, fields: QuestionData) => {
        httpService.put(`/questions/${id}`)
        .then(res => {
             
        })
    },

    deleteQuestion: (id: number) => {
        httpService.delete(`/questions/${id}`)
        .then(res => {
             
        })
    },

    preview: (fields: ExamData) => {
        httpService.post('/preview', fields)
            .then(res => {
                // let data = res.data   
            })
    },
}

export default examService