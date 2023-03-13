export interface ExamGroupData {
    id?: number
    name: string
    date: string
    num_questions: number
    avg_group_grade: any
}

export interface QuestionData {
    id?: number | null
    number: number
    chosen: string
    correct: false
    a_thresh: null
    b_thresh: null
    c_thresh: null
    d_thresh: null
    e_thresh: null
    a_filled: boolean
    b_filled: boolean
    c_filled: boolean
    d_filled: boolean
    e_filled: boolean
    graded_exam: number
}

export interface ExamData {
    id?: number
    questions?: QuestionData[]
    exam_group: number
    exam_image_original?: string
    exam_image_graded?: string
    exam_image_grid?: string
    key_sheet: number
    student: number
    file_uuid?: string
    correct_answers?: number
    wrong_answers?: number
    grade?: number
    is_graded?: boolean
}

export interface KeyQuestionData {
    id?: number
    number: number
    chosen: string
    key_sheet?: number
}

export interface KeySheetData {
    id?: number
    key_questions?: KeyQuestionData[]
    key_class: string
    exam_group: number
}

export interface StudentData {
    id?: number
    name: string
    control_number: string
}
