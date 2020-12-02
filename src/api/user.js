import {firestore} from "./database";

class UserApi {
    static addUserDetails(details){
        const userRef = firestore.doc(`users/`);
        return userRef.add(details);
    }

    static saveUserDetails(uid, data){
        const userRef = firestore.doc(`users/${uid}`);
        return userRef.set(data, { merge: true });
    }

    static getUserDetails(uid){
        const userRef = firestore.doc(`users/${uid}`);
        return userRef.get().then((doc) => {
            if(doc.exists) {
                return doc.data();
            } else {
                return null;
            }
        });
    }
}

export default UserApi;