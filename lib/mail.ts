import { Image } from "./types";
const DEFAULT_LIST_ID = "67a17bcb52";
const SENDER_ADDRESS = "humanafterall2023@gmail.com";

const MailchimpListAPI = require("mailchimp-api-v3");
const SendGridAPI = require("@sendgrid/mail");

export const sendEmail = async (image: Image) => {
  try {
    SendGridAPI.setApiKey(process.env.SENDGRID_API_KEY);
    const message = {
      to: image.userEmail,
      from: SENDER_ADDRESS,
      subject: "Human After All",
      text: "Hello Human",
      html: `Here's what we created. <br/> <img src="${image.imageUrl}"/>`,
    };
    const response = await SendGridAPI.send(message);
  } catch (error) {
    console.error("Error sending email", error);
  }
};

export const addUserToList = async (email: string) => {
  try {
    const mailchimp = new MailchimpListAPI(process.env.MAILCHIMP_API_KEY!);
    const response = await mailchimp.post(`/lists/${DEFAULT_LIST_ID}/members`, {
      email_address: email,
      status: "subscribed",
    });
  } catch (error) {
    console.error("Error adding user to list");
  }
};
