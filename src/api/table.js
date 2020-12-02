import {firestore} from "./database";

class TableApi {
    static addTable(uid, table){
        const userRef = firestore.doc(`users/${uid}/tables`);
        return userRef.add(table);
    }
    static updateTable(uid, table, tableId){
        const userRef = firestore.doc(`users/${uid}/tables/${tableId}`);
        return userRef.set(table);
    }

    static getTables(uid){
        const userRef = firestore.doc(`users/${uid}/tables`);
        return  userRef.get().then((snapshot) => {
            snapshot.forEach((doc) => {
               return doc.data();
           })
        });
    }
}

export default TableApi;