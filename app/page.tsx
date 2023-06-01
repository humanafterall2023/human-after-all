"use client";
import Title from "@/components/Title";
import * as React from "react";
import { motion } from "framer-motion";

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { useState } from "react";
import FirstPage from "@/components/FirstPage";
import EmailPage from "@/components/EmailPage";
import LastPage from "@/components/LastPage";

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
    fonts: {

    },
  },
});

const pages = [FirstPage, EmailPage, LastPage];

export default function Home() {
  const [toggle, setToggle] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = React.useState(0);

  const handleReset = () => {
    setCurrentPageIndex(0);
  };

  // @ts-ignore
  const navigateToPage = (index) => {
    setCurrentPageIndex(index);
  };

  const renderPage = () => {
    const PageComponent = pages[currentPageIndex];
    return (
      <PageComponent
        navigateToPage={navigateToPage}
        currentPageIndex={currentPageIndex}
        setToggle={setToggle}
      />
    );
  };

  return (
    <NextUIProvider theme={theme}>
      <main className="flex flex-col items-center bg-black min-h-screen p-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center flex-1"
        >
          <Title
            navigateToPage={navigateToPage}
            handleReset={handleReset}
            toggle={toggle}
            setToggle={setToggle}
          />
          {!toggle && renderPage()}
        </motion.div>
      </main>
    </NextUIProvider>
  );
}
