import {firestore} from "./database";
import DateFnsAdapter from "@date-io/date-fns";


class ReserveApi {
    static addReserve({uid, reserve}) {
        const userRef = firestore.collection(`users/${uid}/reserves`);
        return userRef.add(reserve).then(ref => {
            const newRef = firestore.doc(`users/${uid}/reserves/${ref.id}`);
            return newRef.get().then(snap => {
                return {
                    item: snap.data(),
                    id: snap.id
                }
            })
        });
    }

    static saveReserve({uid, reserve, reserveId}) {
        const reserveRef = firestore.doc(`users/${uid}/reserves/${reserveId}`);
        return reserveRef.set(reserve, { merge: true }).then(() => {
            return reserveRef.get().then(snap => {
               return {
                   item: snap.data(),
                   id: snap.id
               }
            });
        })
    }

    static deleteReserve({uid, reserveId}) {
        const reserveRef = firestore.doc(`users/${uid}/reserves/${reserveId}`);
        return reserveRef.delete();
    }

    static getReserves({uid, date}) {
        let result = [];
        const dateFns = new DateFnsAdapter();
        const userRef = firestore.collection(`users/${uid}/reserves`)
            .where("date", ">=", dateFns.startOfDay(date))
            .where("date", "<=", dateFns.endOfDay(date));
        return userRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                        result.push({...doc.data(), id: doc.id});
                    }
                );
                return result;
            }
        );
    }

    static getPastReserves({uid, tableRef}) {
        let result = [];
        const dateFns = new DateFnsAdapter();
        const currentDate = dateFns.endOfDay(new Date());
        const userRef = firestore.collection(`users/${uid}/reserves`)
            .where("tableRef", "==", tableRef)
            .where("date", "<=", currentDate);

        return userRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                        result.push({...doc.data(), id: doc.id});
                    }
                );
                return result;
            }
        );
    }

    static getFutureReserves({uid, tableRef}) {
        let result = [];
        const dateFns = new DateFnsAdapter();
        const currentDate = dateFns.startOfDay(new Date());
        const userRef = firestore.collection(`users/${uid}/reserves`)
            .where("tableRef", "==", tableRef)
            .where("date", ">=", currentDate);

        return userRef.get().then((snapshot) => {
                snapshot.forEach((doc) => {
                        result.push({...doc.data(), id: doc.id});
                    }
                );
                return result;
            }
        );
    }
}

export default ReserveApi;