
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://qyuvqrplepmjcnidbglg.supabase.co';

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

async function uploadImage(
    filename: string,
    buffer: ArrayBuffer,
  ) {
    const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!)
    const { error } = await supabase.storage
      .from('images')
      .upload(filename, buffer, {
        cacheControl: "60",
        upsert: false,
        contentType: 'img/png',
      });
    if (error) throw error;
    return SUPABASE_URL + '/storage/v1/object/public/images/' + filename;
  }

export const createImage = async (input: Image) => {
    const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!)
    
    const thumbnailUrl = '';
    const imageUrl = '';
    // TODO: fetch image from OpenAI, downsize to thumbnail and store in object store
    //uploadImage('',)
    //uploadImage('',)
    const { data, error } = await supabase
      .from("images")
      .insert({
        ...input,
        thumbnailUrl,
        imageUrl
      })
      .select()
      .returns<Image>()
      .single();
    if (error) throw error;
    return data;
  }

  export const getImages = async () => {
    const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!)
    const { data, error } = await supabase
      .from("images")
      .select("*")
      .order("created_at", { ascending: false})
      .returns<Image[]>();
    if (error) throw error;
    return data;
  }