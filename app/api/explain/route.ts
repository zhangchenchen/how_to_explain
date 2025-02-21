import { respData, respErr } from "@/lib/resp";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const zhipu = createOpenAICompatible({
  name: "zhipu",
  apiKey: process.env.ZHIPU_API_KEY,
  baseURL: process.env.ZHIPU_BASE_URL,
});

export async function POST(req: Request) {
  try {
    const { content, audience } = await req.json();
    
    if (!content || !audience) {
      return respErr("Content and target audience are required");
    }

    // Construct prompt with emphasis on visual elements and markdown formatting
    const prompt = `
As an expert educator, help me explain complex concepts using visual elements and clear structure.

CONTENT TO EXPLAIN: ${content}
TARGET AUDIENCE: ${audience}

Please provide your explanation in markdown format with the following notes:

Note:
- Use clear headings and subheadings (markdown #, ##)
- if the content is a url, please read the content of the url first and then explain the content
- Incorporate emojis for visual engagement
- Use tables, lists, and ASCII diagrams for visual learning
- Use examples and illustrations to help explain the concept
- Keep language appropriate for ${audience}
- Focus on visual and interactive elements
- Maintain a clear, organized structure
- Keep the words limit to 600 words
`;

    // 首先尝试使用 OpenRouter
    // try {
    //   const textModel = openrouter("deepseek/deepseek-r1-distill-llama-70b:free");
    //   const { text, warnings } = await generateText({
    //     model: textModel,
    //     prompt,
    //     temperature: 0.7,
    //   });

    //   if (!warnings || warnings.length === 0) {
    //     return respData({ explanation: text });
    //   }
    //   console.log("OpenRouter generation warning:", warnings);
    // } catch (error) {
    //   console.error("OpenRouter generation failed:", error);
    // }

    // 如果 OpenRouter 失败，尝试使用智谱 AI
    try {
      const textModel = zhipu("glm-4-plus");  // 使用智谱的 GLM-4 模型
      const { text, warnings } = await generateText({
        model: textModel,
        prompt,
        temperature: 0.7,
      });

      if (!warnings || warnings.length === 0) {
        return respData({ explanation: text });
      }
      console.error("Zhipu generation warning:", warnings);
    } catch (error) {
      console.error("Zhipu generation failed:", error);
    }

    // 如果所有尝试都失败
    return respErr("Failed to generate explanation with all available providers");
    
  } catch (err) {
    console.error("Failed to generate explanation:", err);
    return respErr("Failed to generate explanation. Please try again later");
  }
} 