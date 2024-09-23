import OpenAI from "openai";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const getImprovedText = async (text: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `
        Review and fix the next text between the delimiters ~~~ and return the text fixed in a json with the this format \`{"text": <fixed_text>}\`:
        ~~~
        ${text}
        ~~~
        `,
        },
      ],
    });

    return response.choices[0].message;
  } catch (error) {
    console.log(error);
    return null;
  }
};
