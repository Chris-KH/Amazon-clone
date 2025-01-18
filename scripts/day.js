export function getDate(changeInDay = 0) {
    let today = new Date();
    today.setDate(today.getDate() + changeInDay);
    const formattedDate = today.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric' 
    });

    return formattedDate;
}