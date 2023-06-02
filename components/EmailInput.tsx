import React, { useState, useMemo } from "react";
import { Input, useInput, Grid, FormElement } from "@nextui-org/react";

// @ts-ignore
const EmailInput = ({ navigateToPage, currentPageIndex }) => {
  const {
    value: emailValue,
    reset: resetEmail,
    bindings: emailBindings,
  } = useInput("");

  const validateEmail = (value: string) => {
    return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
  };

  const helper = useMemo(() => {
    if (!emailValue)
      return {
        text: "",
        color: undefined,
      };
    const isValid = validateEmail(emailValue);
    return {
      text: isValid ? "Valid email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [emailValue]);

  //@ts-ignore
  const handleEmailInput = (e) => {
    if (e.key === "Enter") {
      if (validateEmail(emailValue)) {
        localStorage.setItem("email", emailValue);
        navigateToPage(currentPageIndex + 1);
      }
      e.preventDefault();
    }
  };

  //@ts-ignore
  const onBlur = async (e) => {
    if (validateEmail(emailValue) && !localStorage.getItem("email")) {
      localStorage.setItem("email", emailValue);
      navigateToPage(currentPageIndex + 1);
    } else {
      e.target.focus();
    }
    e.preventDefault();
  };

  return (
    <Input
      {...emailBindings}
      style={{ textAlign: "left", margin: "0", fontSize: "16px !important", border: "0.5px solid #d8c0b9", borderRadius: "2px", padding: "4px" }}
      className="bg-black font-mono top-0 left-0 right-0 bottom-0"
      aria-label="Enter your email to claim your art"
      autoFocus
      size={"xl"}
      shadow={false}
      css={{
        $$inputColor: "black",
        borderRadius: "$pill",
        "::placeholder": {
          color: "#d8c0b9",
        },
      }}
      status={helper.color as "success" | "error" | undefined}
      color={helper.color as "success" | "error" | undefined}
      helperColor={helper.color as "success" | "error" | undefined}
      helperText={helper.text}
      type="email"
      width="100%"
      rounded={false}
      bordered={true}
      onKeyPress={handleEmailInput}
      onBlur={onBlur}
    />
  );
};

export default EmailInput;
