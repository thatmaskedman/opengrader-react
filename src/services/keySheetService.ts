import httpService from "./httpClient"
import { KeySheetData, KeyQuestionData } from "../global/types"
import { AxiosResponse } from "axios"

const keySheetService = {
    getAllKeySheets: () =>  
        httpService
            .get<KeySheetData[]>('/keysheets')
            .then((res) => res.data),

    getKeySheet: (id: number) =>
        httpService
            .get<KeySheetData>(`/keysheets/${id}`)
            .then(res => res.data),

    postKeySheet: (fields: KeySheetData) => 
        httpService
            .post<KeySheetData>('/keysheets/', fields)
            .then(res => res.data),

    postKeyQuestions: (keyQuestions: KeyQuestionData[]) => 
        httpService
            .post('/keyquestions/', keyQuestions)
            .then(res => res.data),

    updateKeySheet: (id: number, fields: KeySheetData) =>
        httpService
            .post(`/keysheets/${id}`, fields)
            .then(res => res.data),

    deleteKeySheet: (id: number) =>
        httpService
            .delete(`/keysheets/${id}`)
            .then(res => res.data),

    updateKeyQuestion: (id: number, fields: KeyQuestionData) =>
        httpService
            .put(`/keyquestions/${id}`, fields)
            .then(res => res.data),
}

export default keySheetService