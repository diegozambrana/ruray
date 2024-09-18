import { createClient } from "@/utils/supabase/server";

export const getTags = async () => {
  const supabase = createClient();

  const { data: tags, error: tagsError } = await supabase
    .from("ruray_tag")
    .select("*");

  return { error: tagsError, data: tags || [] };
};
