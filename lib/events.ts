import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://qyuvqrplepmjcnidbglg.supabase.co";

export const getEvents = async () => {
    const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_SECRET_KEY!);
    const { data, error } = await supabase
      .from("events")
      .select()
      .order("created_at", { ascending: false })
      .limit(1);
    if (error) throw error;
    return data[0].data;
  };
  