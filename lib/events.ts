import moment from 'moment';
import 'moment-timezone';

function convertTime(date: string) {
    const d = moment(date);
    d.tz('America/New_York');
    return d.format('h:mm A') + ' EDT'
}

function convertToDay(date: string) {
    const d = moment(date);
    d.tz('America/New_York');
    // Define the day and month names
    const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];

    // Get the day and month from the Date object
    const day = dayNames[d.day()];
    const month = monthNames[d.month()];

    // Get the date number
    const dateNumber = d.date();

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
            ret.day = convertToDay(d.data.time);
            ret.time = convertTime(d.data.time);
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
  