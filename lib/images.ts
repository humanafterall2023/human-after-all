import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";
import { v4 as uuidv4 } from "uuid";
import { Image } from './types';
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


    const TIMES = [
      'morning',
      'sunrise',
      'afternoon',
      'sunset',
      'evening',
      'nighttime'
    ];
    const time = TIMES[Math.floor(Math.random() * TIMES.length)];

    const LOCATIONS = [
      'Harlem',
      'the Apollo Theatre',
      'the Metropolitan Museum of Art',
      'the Guggenheim Museum',
      'the Hudson River',
      'the Oculus Transit Hub',
      'Grand Central Station',
      'Central Park',
      'the Brooklyn Bridge',
      'the Empire State Building',
      'the Subway',
      'the World Trade Center',
      'Times Square',
      'Madison Square Garden',
      'Rockaway Beach',
      'Coney Island',
    ];

    let location = ` at ${LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]}, in New York City `;
    let artist = "post-impressionism";
    let item = "person";
    if (input.response2 === "AI") {
      item = "AI";
      artist = "surrealism";
      location = " in the cosmos";
    }
    const promptText = `describe an image of something a ${input.response1} ${item} is doing in 5 words or less`
    const promptGen = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: promptText }
      ]
    });
    const promptResponse = promptGen.data.choices[0].message?.content;
    const finalPrompt = `An oil painting of a ${item} ${promptResponse} ${location} in the style of ${artist}`;
    console.log('prompting: ', finalPrompt);
    const response = await openai.createImage({
      prompt: finalPrompt,
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
        response2: finalPrompt,
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

export const getImages = async (count?: number) => {
  const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!);
  const { data, error } = await supabase
    .from("images")
    .select()
    .order("created_at", { ascending: false })
    .limit(count ?? 100)
    .returns<Image[]>();
  if (error) throw error;
  return data;
};