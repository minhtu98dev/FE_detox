type HinhAnh = {
    url: string;
};
type ListImage = []

export interface Product {
    uuid: string
    loai_san_pham_id: number
    product_name: string
    hinh_anh: HinhAnh
    price: number
    gia_giam: number
    label: number
    don_vi_tinh: string
    status: boolean
    number: number
    isDelete: boolean
    listImage: ListImage
    trademake: string
    type: string
    description: string
}

export type Products = Pick<Product, 'uuid'>[]
