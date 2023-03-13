import { z } from 'zod'

export const ExamSchema = z.object({
    id: z.optional(z.number()),
    name: z.string().max(30),
    date: z.date(),
    num_questions: z.number().positive().lte(50),
    avg_group_grade: z.number(),
})

export const QuestionData = z.object({
    id: z.optional(z.number()),
    number: z.number(),
    chosen: z.string(),
    correct: z.boolean(),
    a_thresh: z.number(),
    b_thresh: z.number(),
    c_thresh: z.number(),
    d_thresh: z.number(),
    e_thresh: z.number(),
    a_filled: z.boolean(),
    b_filled: z.boolean(),
    c_filled: z.boolean(),
    d_filled: z.boolean(),
    e_filled: z.boolean(),
    graded_exam: z.number(),
})

export const ExamDataSchema = z.object({
    id: z.optional(z.number()),
    questions: z.optional(QuestionData.array()),
    exam_group: z.number(),
    exam_image_original: z.optional(z.string()),
    exam_image_graded: z.optional(z.string()),
    key_sheet: z.number(),
    name: z.string().max(30),
    control_number: z.string().max(10),
    file_uuid: z.optional(z.string().uuid()),
    correct_answers: z.optional(z.number()),
    wrong_answers: z.optional(z.number()),
    grade: z.optional(z.number()),
    is_graded: z.optional(z.boolean()),
})

export const KeyQuestionDataSchema = z.object({
    id: z.optional(z.number()),
    number: z.number(),
    chosen: z.enum(['', 'a', 'b', 'c', 'd', 'e']),
    key_sheet: z.optional(z.number()),
})

export const KeySheetData = z.object({
    id: z.optional(z.number()),
    key_questions: KeyQuestionDataSchema.array(),
    key_class: z.string(),
    exam_group: z.number(),
})
