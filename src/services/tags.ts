import { createClient } from "@/utils/supabase/server";

export const getTags = async () => {
  const supabase = createClient();

  const { data: tags, error: tagsError } = await supabase
    .from("ruray_tag")
    .select("*");

  return { error: tagsError, data: tags || [] };
};

export const createTag = async (name: string) => {
  const supabase = createClient();

  const { data: newTag, error: tagError } = await supabase
    .from("ruray_tag")
    .insert({
      name,
      slug: name.toLowerCase().replace(" ", "-"),
    })
    .select("*");

  console.log("Create tag");

  console.log(newTag);
  console.log(tagError);

  return { error: tagError, data: newTag };
};
