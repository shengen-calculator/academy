import {firestore} from "./database";
import DateFnsAdapter from "@date-io/date-fns";


class ReserveApi {
    static addReserve({uid, reserve}) {
        const userRef = firestore.collection(`users/${uid}/reserves`);
        return userRef.add(reserve);
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