import { useState, useEffect } from "react";

type Event = {
  day: string,
  events: {title: string, time: string, link?: string}[];
}

const Schedule = () => {
  const [eventsData, setEventsData] = useState<Event[]>([]);

  useEffect(() => {
    const response = fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{}",
    }).then((d) =>
      d.json().then((result) => {
        setEventsData(result as Event[]);
      })
    );
  }, []);

  return (
    <div className="w-full justify-center">
      <div className="text-[#d8c0b9] font-mono" style={{fontSize:"1.3rem", fontWeight: 260, letterSpacing: "2px"}}>SCHEDULE</div>
      <br/>
      {eventsData.map((day, index) => (
        <div key={index} className="flex flex-col items-start">
          <div className="text-[#d8c0b9] text-md font-mono mt-2 mb-2">
            {day.day}
          </div>
          {day.events.map((event, eventIndex) => (
            <div style={{marginLeft: 16}} key={event.title} className="w-full">
              <div>
                <div className="text-[#749EA1] font-mono" style={{letterSpacing: "0.5px", fontSize: "0.8rem"}}>
                  {" "}
                  • {event.title}<br/>
                  <span className="text-[#d8c0b9]">{event.time}</span>{" "}
                </div>
                <br/>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
