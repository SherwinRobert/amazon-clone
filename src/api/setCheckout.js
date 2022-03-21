import { getDatabase, ref, set} from "firebase/database";

const setCheckout = (endpoint = "",data) => {
    let userId = sessionStorage.getItem("userId")
    const db = getDatabase();
    set(ref(db, `users/${userId}/checkout${endpoint}`), data);
}

export default setCheckout;