"use client";

import React, { useState, useEffect } from "react";
import { Collapse, Spacer, Text, Avatar, Grid, Row, Col } from "@nextui-org/react";
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

const Team = () => {
  // Dummy data for team members
  const teamData = [
    {
      name: "John Doe",
      title: "Founder",
      description: "Description for John Doe",
      avatar: "https://cdn7.dissolve.com/p/D2115_32_215/D2115_32_215_1200.jpg", // Replace with actual image path
    },
    {
    name: "John Doe",
    title: "Founder",
    description: "Description for John Doe",
    avatar: "https://cdn7.dissolve.com/p/D2115_32_215/D2115_32_215_1200.jpg", // Replace with actual image path
    },
    {
    name: "John Doe",
    title: "Founder",
    description: "Description for John Doe",
    avatar: "https://cdn7.dissolve.com/p/D2115_32_215/D2115_32_215_1200.jpg", // Replace with actual image path
    },
    {
    name: "John Doe",
    title: "Founder",
    description: "Description for John Doe",
    avatar: "https://cdn7.dissolve.com/p/D2115_32_215/D2115_32_215_1200.jpg", // Replace with actual image path
    },
    // Add more team members here...
  ];

  // State to track the active accordion item
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Simulating the loading completion
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while the content is loading
  } else {

  return (
    <NextUIProvider theme={theme}>
      <main className="flex flex-col items-center bg-black min-h-screen p-8">
      <a className="text-xl text-center text-[#d8c0b9] font-bold" href="/">
        <i>WE'RE HUMAN, &nbsp; AFTER ALL</i>
      </a>
        <h1>Team</h1>
        <Grid.Container gap={2} className="justify-center">
          {teamData.map((member, index) => (
            <Grid key={index} className="w-full max-w-md">
              <Collapse
                title={
                //@ts-ignore

                  <div onClick={() => setActiveAccordion(index)}>
                    <Row align="center">
                      <Col>
                        <Avatar src={member.avatar} className="rounded" />
                      </Col>
                      <Col>
                        <Text h3>{member.name}</Text>
                        <Text>{member.title}</Text>
                      </Col>
                    </Row>
                  </div>
                }
                //@ts-ignore
                active={activeAccordion === index}
              >
                <Spacer y={0.5} />
                <Text>{member.description}</Text>
              </Collapse>
            </Grid>
          ))}
        </Grid.Container>
      </main>
    </NextUIProvider>
  );
}
};

export default Team;
