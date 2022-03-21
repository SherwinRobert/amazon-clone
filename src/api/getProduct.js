import { getDatabase, ref, get, child } from "firebase/database";

export const getProducts = async (id) => {
    let prod;
    const dbRef = ref(getDatabase());
    try {
      prod = await get(child(dbRef, `products/${id}`));
    } catch (error) {
      console.log(error);
    }
    return prod.val();
};
