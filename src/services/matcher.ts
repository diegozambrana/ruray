import { createClient } from "@/utils/supabase/server";

export const getMatchers = async () => {
  const supabase = createClient();

  const { data: matchers, error: matcherError } = await supabase
    .from("ruray_matcher")
    .select("*");

  return { error: matcherError, data: matchers || [] };
};
