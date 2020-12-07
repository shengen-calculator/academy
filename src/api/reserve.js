import {firestore} from "./database";

class ReserveApi {
    static addReserve({uid, reserve}) {
        const userRef = firestore.collection(`users/${uid}/reserves`);
        return userRef.add(reserve);
    }
}

export default ReserveApi;