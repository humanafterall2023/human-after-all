"use client";
import Image from "next/image";
import Title from "@/components/Title";
import { Button, Input, Spacer, useInput } from "@nextui-org/react";
import * as React from "react";
import { motion } from "framer-motion"

import { createTheme, NextUIProvider } from "@nextui-org/react";
import { useState, useMemo } from "react";
import FinalPage from "@/components/FinalPage";
import FirstPage from "@/components/FirstPage";
import PreviewPage from "@/components/PreviewPage";

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

export default function Home() {
  const [query, setQuery] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPressed, setisPressed] = useState(false);
  const [isEmailPressed, setisEmailPressed] = useState(false);

  return (
    <NextUIProvider theme={theme}>
      <main className="flex flex-col items-center bg-black min-h-screen p-8">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center justify-between flex-1"
        >
        <Title isPressed={isPressed} />
        {!isPressed ? (
          <>
            <FirstPage
              query={query}
              setQuery={setQuery}
              setisPressed={setisPressed}
              setImageUrl={setImageUrl}
            />
          </>
        ) : (
          <>
            {!isEmailPressed ? (
              <PreviewPage
                query={query}
                imageUrl={imageUrl}
                setisEmailPressed={setisEmailPressed}
              />
            ) : (
              <FinalPage imageUrl={imageUrl} />
            )}
          </>
        )}
        </motion.div>
      </main>
    </NextUIProvider>
  );
}
