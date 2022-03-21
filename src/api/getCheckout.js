import { getDatabase, ref, get, child } from "firebase/database";

export const getCheckout = async () => {
    let userId = sessionStorage.getItem("userId")
  let prod;
  const dbRef = ref(getDatabase());
  try {
    prod = await get(child(dbRef, `users/${userId}/checkout`));
  } catch (error) {
    console.log(error);
  }
  return prod.val();
};
