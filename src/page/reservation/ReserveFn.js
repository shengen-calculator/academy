import DateFnsAdapter from "@date-io/date-fns";

export const isFutureSlot = (item) => {
    const dateFns = new DateFnsAdapter();
    const startDate = dateFns.startOfDay(new Date());
    if(dateFns.isSameDay(item.date.toDate(), startDate)) {
        const diff = dateFns.getDiff(new Date(), startDate)/60000;
        return diff < item.slot;
    }
    return true;
};


export const isPastSlot = (item) => {
    const dateFns = new DateFnsAdapter();
    const startDate = dateFns.startOfDay(new Date());
    if(dateFns.isSameDay(item.date, startDate)) {
        const diff = dateFns.getDiff(new Date(), startDate)/60000;
        return diff > item.slot;
    }
    return true;
};

export const compareItems = (x, y) => {
    const dateFns = new DateFnsAdapter();
    const xDate = x.date.toDate();
    const yDate = y.date.toDate();

    if(dateFns.isSameDay(xDate, yDate)) {
        if(x.slot === y.slot)
            return 0;

        return x.slot > y.slot ? 1 : -1;
    }
    return dateFns.getDiff(xDate,yDate) > 0 ? 1 : -1;
};