import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {

  const { image } = req.body;

  try {

    const response = await openai.responses.create({
      model: "gpt-4o",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
你是一个世界级工业设计AI。

请分析这个产品图片，并输出严格JSON：

{
  "category": "产品类别",
  "core_function": "核心功能",
  "materials": ["材料1", "材料2"],
  "style": "设计风格",
  "structure": "结构描述",
  "usage": ["使用场景1", "使用场景2"],
  "design_rules": {
    "can_change": ["可以变化的点"],
    "cannot_change": ["不能改变的核心结构"]
  }
}

要求：
- 必须真实可制造
- 不允许幻想结构
- 必须是工业设计视角
              `
            },
            {
              type: "input_image",
              image_url: image
            }
          ]
        }
      ]
    });

    const text = response.output_text;

    res.status(200).json({
      dna: JSON.parse(text)
    });

  } catch (error) {

    res.status(500).json({
      error: "AI analysis failed",
      detail: error.message
    });
  }
}
