"use client";
import React, { useState } from "react";
import { Collapse, Spacer, Text, Grid, Row, Col } from "@nextui-org/react";
import { createTheme, NextUIProvider } from "@nextui-org/react";

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: "#d8c0b9",
      primaryLightHover: "#d8c0b9",
      primaryLightActive: "#d8c0b9",
      primaryLightContrast: "#d8c0b9",
      primary: "#d8c0b9",
      primaryBorder: "#d8c0b9",
      primaryBorderHover: "#d8c0b9",
      primarySolidHover: "#d8c0b9",
      primarySolidContrast: "$white",
      primaryShadow: "#d8c0b9",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",

      // you can also create your own color
      myColor: "#d8c0b9",

      // ...  more colors
    },
    space: {},
    fonts: {},
  },
});

const Events = () => {
  // Dummy data for events
  const eventsData = [
    {
      day: "Day 1",
      events: [
        {
          time: "10:00 AM",
          title: "Event 1",
          description: "Description for Event 1",
        },
        {
          time: "12:00 PM",
          title: "Event 2",
          description: "Description for Event 2",
        },
      ],
    },
    {
      day: "Day 2",
      events: [
        {
          time: "10:00 AM",
          title: "Event 1",
          description: "Description for Event 1",
        },
        {
          time: "12:00 PM",
          title: "Event 2",
          description: "Description for Event 2",
        },
        {
          time: "10:00 AM",
          title: "Event 1",
          description: "Description for Event 1",
        },
      ],
    },
    {
      day: "Day 3",
      events: [
        {
          time: "11:00 AM",
          title: "Event 3",
          description: "Description for Event 3",
        },
        {
          time: "2:00 PM",
          title: "Event 4",
          description: "Description for Event 4",
        },
        {
          time: "2:00 PM",
          title: "Event 4",
          description: "Description for Event 4",
        },
      ],
    },
    {
      day: "Day 4",
      events: [
        {
          time: "11:00 AM",
          title: "Event 3",
          description: "Description for Event 3",
        },
      ],
    },
    // Add more dummy data here...
  ];

  // State to track the active accordion item
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <NextUIProvider theme={theme}>
      <main className="flex flex-col items-center bg-black min-h-screen pt-8 pl-4 pr-4">
        <a className="text-xl text-center text-[#d8c0b9] font-bold" href="/">
          <i>WE'RE HUMAN, &nbsp; AFTER ALL</i>
        </a>
        <h1>Event Guide</h1>
        <Grid.Container gap={1} className="w-full justify-center">
          {eventsData.map((day, index) => (
            <Grid key={index}>
              <Text className="mr-4 mt-4 w-8" h4>
                {day.day}
              </Text>
              {day.events.map((event, eventIndex) => (
                <div key={eventIndex}>
                  <Collapse
                    title={
                      //@ts-ignore
                      <div onClick={() => setActiveAccordion(eventIndex)}>
                        <p>{event.time}</p>
                        <h3>{event.title}</h3>
                      </div>
                    }
                    //@ts-ignore
                    active={activeAccordion === eventIndex}
                    className="mr-2"
                  >
                    <Spacer y={0.5} />
                    <Text>{event.description}</Text>
                  </Collapse>
                </div>
              ))}
            </Grid>
          ))}
        </Grid.Container>
      </main>
    </NextUIProvider>
  );
};

export default Events;
