import React, { useState, useMemo } from "react";
import { Input, useInput, Grid, FormElement } from "@nextui-org/react";

// @ts-ignore
const EmailInput = ({ setisEmailPressed }) => {
  const { value: emailValue, reset: resetEmail, bindings: emailBindings } = useInput("");

  const validateEmail = (value) => {
    return value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
  };

  const helper = useMemo(() => {
    if (!emailValue)
      return {
        text: "",
        color: "",
      };
    const isValid = validateEmail(emailValue);
    return {
      text: isValid ? "Valid email" : "Enter a valid email",
      color: isValid ? "success" : "error",
    };
  }, [emailValue]);

  const handleEmailInput = async (e) => {
    if (e.key === "Enter") {
      setisEmailPressed(true);
      console.log("Email Inputted: " + emailValue);
      e.preventDefault();
    }
  };

  return (
    <Input
      {...emailBindings}
      style={{ fontSize: "0.82rem" }}
      className="bg-black font-mono top-0 left-0 right-0 bottom-0"
      aria-label="Enter your email to claim your art"
      clearable
      shadow={false}
      onClearClick={resetEmail}
      css={{
        $$inputColor: "black",
        borderRadius: "$pill",
        "::placeholder": {
          color: "#d8c0b9",
        },
      }}
      status={helper.color}
      color={helper.color}
      helperColor={helper.color}
      helperText={helper.text}
      type="email"
      width="100%"
      placeholder="+ Enter your email to claim your art"
      rounded={false}
      bordered={false}
      onKeyPress={handleEmailInput}
    />
  );
};

export default EmailInput;