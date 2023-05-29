import { useState } from "react";

const Schedule = () => {
  const eventsData = [
    {
      day: "SUNDAY, JUNE 4",
      events: [
        {
          time: "Coding A New World (4 PM)",
          title: "Pokey Rule (Cursorless), Ben Reinhrdt (Speculative Technologies)",
          description: "Description for Event 1",
        },
        {
          time: "Holography, Cryptography, Pornography and the Surreal AI Art Process (6 PM)",
          title: "Sarah Meyohas",
          description: "Description for Event 2",
        },
      ],
    },
    {
      day: "MONDAY, JUNE 5",
      events: [
        {
          time: "Surrealism, and the Potentials of Future Storytelling (5 PM)",
          title: "Eric Kohn (Indiewire), Isabelle Sandoval, Mary Harron, and Henry Joost",
          description: "Description for Event 1",
        },
        {
          time: "On working with an AI on script (? PM)",
          title: "Mads Damsbo x Piotr Winiewicz",
          description: "Description for Event 1",
        },
        {
          time: "The law and ethics of AI and IP (? PM)",
          title: "Marisa and Jim Janowitz",
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
          time: "Women in VR and Film (2 PM)",
          title: "Julie Cavaliere",
          description: "Description for Event 5",
        },
        {
          time: "New Works in AI and AI Karaoke (6 PM)",
          title: "John Fitzgerald",
          description: "Description for Event 6",
        },
      ],
    },
    {
      day: "THURSDAY, JUNE 8",
      events: [
        {
          time: "Capture The Flag and Data Security, A Brave New World (5 PM)",
          title: "Nisos and Enigma",
          description: "Description for Event 7",
        },
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
          time: "Pressman Film (5 PM - Late)",
          title: "Daliland Premier",
          description: "Description for Event 8",
        },
      ],
    },
    {
      day: "SATURDAY, JUNE 10",
      events: [
        {
          time: "(All Day)",
          title: "Transient Labs",
          description: "Description for Event 8",
        },
        {
          time: "(12 PM)",
          title: "The Colberts, A Surreal Family",
          description: "Description for Event 8",
        },
      ],
    },
    {
      day: "SUNDAY, JUNE 11",
      events: [
        {
          time: "(All Day)",
          title: "Neo Futurists - Experimental Theatre",
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
      <br />
      <div className="text-[#d8c0b9] text-center">SCHEDULE</div>
      <br />
      <div className="w-full border-b border-gray-300 h-0.5"></div>
      {eventsData.map((day, index) => (
        <div key={index} className="flex flex-col items-start">
          <div className="text-[#d8c0b9] text-md text-mono mt-2 mb-2">
            <b>{day.day}</b>
          </div>
          {day.events.map((event, eventIndex) => (
            <div key={event.title} className="w-full">
              <div onClick={() => handleAccordionClick(eventIndex)}>
                <div className="text-[#749EA1]">
                  {" "}
                  • {event.title}&nbsp; - &nbsp;{" "}
                  <span className="text-[#d8c0b9]">{event.time}</span>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
