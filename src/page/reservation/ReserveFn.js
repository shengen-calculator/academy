import DateFnsAdapter from "@date-io/date-fns";
import {timeSlots} from "../../util/TimeSlots";

export const isFutureSlot = (item) => {
    const dateFns = new DateFnsAdapter();
    const startDate = dateFns.startOfDay(new Date());
    if(dateFns.isSameDay(item.date.toDate(), startDate)) {
        const diff = dateFns.getDiff(new Date(), startDate)/60000;
        return diff < item.slot;
    }
    return dateFns.getDiff(item.date.toDate(), startDate) > 0;
};

export const isPastSlot = (item) => {
    const dateFns = new DateFnsAdapter();
    const startDate = dateFns.startOfDay(new Date());
    if(dateFns.isSameDay(item.date.toDate(), startDate)) {
        const diff = dateFns.getDiff(new Date(), startDate)/60000;
        return diff > item.slot;
    }
    return dateFns.getDiff(item.date.toDate(), startDate) < 0;
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

export const getPossibleSlots = (futureReserves, date, currentSlot) => {
    const dateFns = new DateFnsAdapter();
    let extraSlot;
    let slots = Object.keys(timeSlots).map(x => {
        return {
            min: timeSlots[x].min,
            label: timeSlots[x].label
        }
    });

    if(currentSlot) {
        extraSlot = slots.find(x => x.min === currentSlot);
    }

    if(dateFns.isSameDay(date, new Date())) {
        const startDate = dateFns.startOfDay(new Date());
        const diff = dateFns.getDiff(new Date(), startDate)/60000;
        slots = slots.filter(x => x.min > diff);
    }

    const reserved = futureReserves.items.filter(x =>
        dateFns.isSameDay(date, x.date.toDate())).map(y => y.slot);
    slots = slots.filter(x => !reserved.includes(x.min));

    if(extraSlot) {
        slots = [...slots, extraSlot];
    }

    return slots.sort((x, y) => x.min - y.min);
};