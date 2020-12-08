import DateFnsAdapter from "@date-io/date-fns";
import {timeSlots} from "../../util/TimeSlots";

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

export const getPossibleSlots = (futureReserves, date) => {
    const dateFns = new DateFnsAdapter();
    let slots = Object.keys(timeSlots).map(x => {
        return {
            min: timeSlots[x].min,
            label: timeSlots[x].label
        }
    });
    if(dateFns.isSameDay(date, new Date())) {
        const startDate = dateFns.startOfDay(new Date());
        const diff = dateFns.getDiff(new Date(), startDate)/60000;
        slots = slots.filter(x => x.min > diff);
    }
    return slots;
};