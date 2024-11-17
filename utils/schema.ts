import { z } from "zod";


export const SchemaLogin = z.object({
    matricle: z.string().trim().min(1, { message: "Must Contain 1 Characters Minimum"}),
    password: z.string().trim().min(4, { message: "Must Contain 4 Characters Minimum"})
})

export const SchemaRefresh = z.object({
    refresh: z.string().trim().min(1, { message: "Must Contain 1 Characters Minimum"}),
})

export const SchemaPlatformChargesCreate = z.object({
    telephone: z.coerce.number().min(10, { message: "Minimum 10"}),
    amount: z.coerce.number().min(5, { message: "Minimum 5"}),
    service: z.string().trim().min(3, { message: "Must Select Service"}),
});