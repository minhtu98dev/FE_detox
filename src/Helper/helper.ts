import { useCartStorage } from "@/Hooks/useCartStorage";
import { Product } from "@/Types/Product.type";

export const formatCurrency = (number: number) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    });

    return formatter.format(number)
}

export const HandleAddCart = (newProduct: Product | any) => {
    const { getCartStorage } = useCartStorage();

    const oldCart = getCartStorage();
    let updatedCart: any = [];

    if (oldCart && oldCart.length) {
        updatedCart = [...oldCart];

        const existingProductIndex = oldCart.findIndex((product: Product) => product.uuid === newProduct.uuid);

        if (existingProductIndex !== -1) {
            updatedCart[existingProductIndex].quantity += newProduct.quantity;
        } else {
            updatedCart.push({ ...newProduct });
        }
    } else {
        updatedCart.push({ ...newProduct });
    }

    return updatedCart;
}


export const summaryPriceInCart = (cart: Product[]) => {
    const totalPrice: number = cart.reduce((accumulator: number, product: Product | any) => {
        // console.log("accumulator: ", accumulator);
        return accumulator + (product.quantity * product.price);
    }, 0);
    // console.log("totalPrice: ", totalPrice);
    return (totalPrice)
}