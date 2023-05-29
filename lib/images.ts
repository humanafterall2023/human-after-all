import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidv4 } from "uuid";
import { Image } from "./types";
const imageThumbnail = require("image-thumbnail");

const SUPABASE_URL = "https://qyuvqrplepmjcnidbglg.supabase.co";

async function uploadImage(filename: string, buffer: ArrayBuffer) {
  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!);
  const { error } = await supabase.storage
    .from("images")
    .upload(filename, buffer, {
      cacheControl: "60",
      upsert: false,
      contentType: "img/png",
    });
  if (error) throw error;
  return SUPABASE_URL + "/storage/v1/object/public/images/" + filename;
}

export const createImage = async (input: Image) => {
  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!);
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  try {
    input.response1 = input.response1.split(" ")[0];
    const openai = new OpenAIApi(configuration);
    const ARTISTS = ["Van Gogh"];
    const artist = ARTISTS[Math.floor(Math.random() * ARTISTS.length)];

    const TIMES = [
      "morning",
      "sunrise",
      "afternoon",
      "sunset",
      "evening",
      "nighttime",
    ];
    const time = TIMES[Math.floor(Math.random() * TIMES.length)];
    const response = await openai.createImage({
      prompt: `A photograph of a ${input.response1} human in New York City, ${time}, in the style of ${artist}`,
      n: 1,
      size: "512x512",
    });
    const generatedUrl = response.data.data[0].url!;

    const img = await fetch(generatedUrl);
    const buf = await img.arrayBuffer();
    const thumbnailBuf = await imageThumbnail(Buffer.from(new Uint8Array(buf)));
    const imgFile = uuidv4();
    const imageUrl = await uploadImage(imgFile + ".png", buf);
    const thumbnailUrl = await uploadImage(imgFile + "_t.png", thumbnailBuf);

    const { data, error } = await supabase
      .from("images")
      .insert({
        response1: input.response1,
        response2: time,
        response3: artist,
        userEmail: input.userEmail,
        thumbnailUrl,
        imageUrl,
      })
      .select()
      .returns<Image>()
      .single();
    if (error) throw error;
    return data as Image;
  } catch (error: any) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
};

export const getImages = async () => {
  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!);
  const { data, error } = await supabase
    .from("images")
    .select()
    .order("created_at", { ascending: false })
    .limit(1000)
    .returns<Image[]>();
  if (error) throw error;
  return data;
};
