import { z } from "zod";


export const SchemaLogin = z.object({
    matricle: z.string().trim().min(1, { message: "Must Contain 1 Characters Minimum"}),
    password: z.string().trim().min(4, { message: "Must Contain 4 Characters Minimum"})
})

export const SchemaRefresh = z.object({
    refresh: z.string().trim().min(1, { message: "Must Contain 1 Characters Minimum"}),
})