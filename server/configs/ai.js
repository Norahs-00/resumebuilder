import OpenAI from "openai";

const apiKey =
  process.env.OPENAI_API_KEY || process.env.OPENAI_KEY || process.env.OPENAI_SECRET;

const hasOpenAIKey =
  typeof apiKey === "string" &&
  apiKey.trim() !== "" &&
  !apiKey.startsWith("your_") &&
  apiKey.startsWith("sk-");

const ai = hasOpenAIKey
  ? new OpenAI({
      apiKey,
      baseURL: process.env.OPENAI_BASE_URL,
    })
  : null;

export { ai, hasOpenAIKey };
export default ai;
