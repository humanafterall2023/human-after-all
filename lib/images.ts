import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidv4 } from "uuid";

const imageThumbnail = require("image-thumbnail");

const SUPABASE_URL = "https://qyuvqrplepmjcnidbglg.supabase.co";

export type ImageCreateRequest = {
  response1: string;
  response2: string;
  response3: string;
  userEmail: string;
};

export type Image = {
  id: string;
  response1: string;
  response2: string;
  response3: string;
  userEmail: string;
  thumbnailUrl: string;
  imageUrl: string;
  created_at: string;
};

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
    // const openai = new OpenAIApi(configuration);
    // const response = await openai.createImage({
    //   prompt: "A panda rolling around",
    //   n: 1,
    //   size: "1024x1024",
    // });
    // const generatedUrl = response.data.data[0].url!;
    const generatedUrl =
      "https://www.freepnglogos.com/uploads/flour-png/flour-flower-images-transparent-background-19.png";
    const img = await fetch(generatedUrl);
    const buf = await img.arrayBuffer();
    const thumbnailBuf = await imageThumbnail(Buffer.from(new Uint8Array(buf)));
    const imgFile = uuidv4();
    const imageUrl = await uploadImage(imgFile + ".png", buf);
    const thumbnailUrl = await uploadImage(imgFile + "_t.png", thumbnailBuf);

    const { data, error } = await supabase
      .from("images")
      .insert({
        ...input,
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
