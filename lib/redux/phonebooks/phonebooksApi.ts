import { api } from "@/lib/api";

export const load = () => api.get('phonebooks')

export const add = (name: string, phone: string) => api.post('phonebooks', { 
    name,
    phone
 })