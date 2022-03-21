import { getDatabase, ref, set } from "firebase/database";

const setOrder = async (data) => {
  let userId = sessionStorage.getItem("userId");
  const db = getDatabase();
  await set(ref(db, `users/${userId}/orders`), data);
};

export default setOrder;
