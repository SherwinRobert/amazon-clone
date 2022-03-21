import { getDatabase, ref, get, child } from "firebase/database";

export const getOrder = async () => {
    let userId = sessionStorage.getItem("userId")
    let prod;
    const dbRef = ref(getDatabase());
    try {
        prod = await get(child(dbRef, `users/${userId}/orders`));
    } catch (error) {
        console.log(error);
    }
    return prod.val();
}