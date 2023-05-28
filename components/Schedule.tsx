import { useState } from "react";

const Schedule = () => {
  const eventsData = [
    {
      day: "SUNDAY, JUNE 4",
      events: [
        {
          time: "Cursorless (4 PM)",
          title: "Pokey Rule",
          description: "Description for Event 1",
        },
        {
          time: "Robotics (5 PM)",
          title: "Ben Reinhardt",
          description: "Description for Event 2",
        },
      ],
    },
    {
      day: "MONDAY, JUNE 5",
      events: [
        {
          time: "Film's Future (5 PM)",
          title: "Eric Kohn",
          description: "Description for Event 1",
        },
        {
          time: "Holograms (6 PM)",
          title: "Sarah Meyohas",
          description: "Description for Event 3",
        },
        {
          time: "New Painting (7 PM)",
          title: "Emma Webster",
          description: "Description for Event 4",
        },
      ],
    },
    {
      day: "TUESDAY, JUNE 6",
      events: [
        {
          time: "Women in VR, XR, and Film (2 PM)",
          title: "Julie Cavaliere",
          description: "Description for Event 5",
        },
        {
          time: "New Work + AI Karaoke (6 PM)",
          title: "John Fitzgerald",
          description: "Description for Event 6",
        },
      ],
    },
    {
      day: "THURSDAY, JUNE 8",
      events: [
        {
          time: "In Search of Time (8 PM)",
          title: "Atlas V",
          description: "Description for Event 7",
        },
      ],
    },
    {
      day: "FRIDAY, JUNE 9",
      events: [
        {
          time: "Surreality (5 - Late)",
          title: "Daliland",
          description: "Description for Event 8",
        },
      ],
    },
  ];
  

  const [activeAccordion, setActiveAccordion] = useState(null);

    // @ts-ignore
  const handleAccordionClick = (eventIndex) => {
    setActiveAccordion((prevAccordion) =>
      prevAccordion === eventIndex ? null : eventIndex
    );
  };

  return (
    <div className="w-full justify-center">
      <div className="text-[#d8c0b9] text-center">SCHEDULE</div>
      <div className="w-full border-b border-gray-300 h-0.5"></div>
      {eventsData.map((day, index) => (
        <div key={index} className="flex flex-col items-start">
          <div className="text-[#d8c0b9] text-md text-mono mt-2 mb-2">{day.day}</div>
          {day.events.map((event, eventIndex) => (
            <div key={event.title} className="w-full">
              <div onClick={() => handleAccordionClick(eventIndex)}>
                <div className="text-[#749EA1]"> • {event.title}&nbsp; - &nbsp; <span className="text-[#d8c0b9]">{event.time}</span> </div>
              </div>
              {activeAccordion === eventIndex && (
                <div className="text-[#d8c0b9]">{event.description}</div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
