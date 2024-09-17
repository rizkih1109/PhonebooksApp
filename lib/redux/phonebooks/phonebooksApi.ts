import { api } from "@/lib/api";

export const load = () => api.get('phonebooks')

export const add = (name: string, phone: string) => api.post('phonebooks', { 
    name,
    phone
 })

export const remove = (id: string) => api.delete(`phonebooks/${id}`)

export const edit = (id: string, name: string, phone: string) => api.put(`phonebooks/${id}`, {
    name,
    phone
})