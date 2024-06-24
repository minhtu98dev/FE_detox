import { useLocalStorage } from "./useLocalStorage";

const PREFIX = `pl_cart`;

export const useCartStorage = () => {
    const { getItem, setItem, removeItem } = useLocalStorage();

    const getCartStorage = () => {
        const cartLocalStorage: string | null = getItem(PREFIX);

        const cart = cartLocalStorage
            ? JSON.parse(cartLocalStorage)
            : null;

        return cart;
    };

    const saveCartStorage = (cartInput: any) => {
        const convertCartInput = JSON.stringify(cartInput);
        setItem(PREFIX, convertCartInput);
    };

    const clearCartStorage = () => {
        removeItem(PREFIX);
    };

    return { getCartStorage, saveCartStorage, clearCartStorage };
};
