import { api } from "@/lib/api";

export const load = (keyword: string, sort: string) => api.get('phonebooks', {
    params: { keyword, sort }
})

export const add = (name: string, phone: string) => api.post('phonebooks', {
    name,
    phone
})

export const remove = (id: string) => api.delete(`phonebooks/${id}`)

export const edit = (id: string, name: string, phone: string) => api.put(`phonebooks/${id}`, {
    name,
    phone
})

export const avatar = (id: string, file: FormData) => api.put(`phonebooks/${id}/avatar`, file, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})