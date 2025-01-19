import {format, addMonths, addDays, getMonth, getDay} from 'https://cdn.jsdelivr.net/npm/date-fns@2.28.0/esm/index.js'

export function getDate(changeInDay = 0) {
    let today = new Date();
    today = addDays(today, changeInDay);

    if (getDay(today) === 0) today = addDays(today, 1);
    else if (getDay(today) === 6) today = addDays(today, 2);
    
    const formattedDate = format(today, 'EEEE, MMMM d'); 

    return formattedDate;
}