import { createClient } from "@/utils/supabase/server";

export const getOrigins = async () => {
  const supabase = createClient();

  const { data: origins, error: originError } = await supabase
    .from("ruray_origin")
    .select("*");

  return { error: originError, data: origins || [] };
};
