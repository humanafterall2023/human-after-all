function convertTime(date: Date) {
    let hours = date.getHours() + 3 % 24;
    const minutes = date.getMinutes();

    // Determine if it's AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    // Format the output
    let formattedTime;
    if (minutes === 0) {
        formattedTime = `${formattedHours} ${period}`;
    } else {
        formattedTime = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`;
    }
    return formattedTime;
}

function convertToDay(date: Date) {
    // Define the day and month names
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    // Get the day and month from the Date object
    const day = dayNames[date.getDay()];
    const month = monthNames[date.getMonth()];

    // Get the date number
    const dateNumber = date.getDate();

    // Format the output
    return `${day}, ${month} ${dateNumber}`;
}

export const getEvents = async () => {
    const data = (await (await fetch(process.env.QUERY_URL! + "&rand=" + Math.random())).json()) as { results: any[]};
    const rawList = data.results.map((d) => {
        let estDate = new Date(d.data.time);
        let ret: any = {};
        ret.t = estDate;
        if (d.data.time) {
            ret.day = convertToDay(estDate);
            ret.time = convertTime(estDate);
        } else {
            ret.day = "TBA";
            ret.time = "TBA";
        }
        ret.description = d.data.description;
        ret.title = d.data.title;
        ret.link = d.data.eventBriteLink;
        return ret;
    });
    rawList.sort((a,b) => a.t-b.t);
    console.log(rawList);
    let finalEvents = [];
    let lastDay = null;
    for (let i = 0; i < rawList.length; i++) {
        if (rawList[i].day !== lastDay) {
            finalEvents.push({
                day: rawList[i].day,
                events: [] as any[],
            });
            lastDay = rawList[i].day;
        }
        finalEvents[finalEvents.length - 1].events.push(rawList[i]);
    }
    return finalEvents;
  };
  