import {firestore} from "./database";

class UserApi {
    static saveUserDetails(uid, details){
        const userRef = firestore.doc(`users/${uid}`);
        return userRef.set(details);
    }

    static getUserDetails(uid){
        const userRef = firestore.doc(`users/${uid}`);
        return  userRef.get();
    }
}

export default UserApi;