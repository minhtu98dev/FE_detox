import { ProductType } from '@/Types/ProductType.type'
import http from "@/lib/utils"


const Models = {
    list: 'typeProduct',
};

export const getProductTypes = (
    signal?: AbortSignal) =>
    http.get<ProductType>(`${Models.list}`, {
        signal
    })

