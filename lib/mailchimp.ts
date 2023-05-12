import Mailchimp from "mailchimp-api-v3";

const DEFAULT_LIST_ID = "1";
const MAILCHIMP_API_KEY = "YOUR_MAILCHIMP_API_KEY";
const SENDER_ADDRESS = "YOUR_EMAIL_ADDRESS";

export const sendEmail = async (
  recipient: string,
  subject: string,
  message: string
) => {
  const mailchimp = new Mailchimp(MAILCHIMP_API_KEY);
  try {
    await mailchimp.post("/messages", {
      message: {
        subject,
        from_email: SENDER_ADDRESS,
        to: [
          {
            email: recipient,
            type: "to",
          },
        ],
        html: message,
      },
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const addUserToList = async (email: string) => {
  const mailchimp = new Mailchimp(MAILCHIMP_API_KEY);
  const listId = DEFAULT_LIST_ID;
  try {
    const response = await mailchimp.post(`/lists/${listId}/members`, {
      email_address: email,
      status: "subscribed",
    });
  } catch (error) {
    console.error("Error adding user to list:", error);
  }
};
