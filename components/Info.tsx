import { useState } from "react";

const Info = () => {
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
      <br />
      <div className="text-[#d8c0b9] text-center mb-4 text-mono">INFO</div>
      <div className="w-full border-b border-gray-300 h-0.5"></div>
      <div className="text-[#749EA1] mt-4 mb-4 text-mono">
        A BICYCLE FOR THE MIND
      </div>
      <div className="text-[#d8c0b9] text-mono text-sm">
        One day, long ago, our Ancestor picked up a rock, fashioned a tool, and
        shifted our timeline forever. Just like that, we rocketed forth.
        <br />
        <br />
        Without tools, however, humans are woefully inefficient...
        <br />
        In a study on animal locomotion, humans fared rather poorly. The
        beautiful condor placed first. Yet when provided a bicycle, humans blew
        the condors away.
        <br />
        <br />
        We shape tools and the tools reshape us; thereby, we reshape the world
        around us. From bicycles sprang new paths. In 2023, computers remain our
        most remarkable tool. A “bicycle for the mind.”
        <br />
        <br />
        Now, forget the bicycles, think rocket ships...
        <br />
        <br />
        At Calatrava’s WTC Ocuclus this June, Human After All will discuss these
        tools, and what they mean for our future.
        <br />
        <br />
        <a href="mailto:humanafterallai@gmail.com">CONTACT US</a>
      </div>
    </div>
  );
};

export default Info;
