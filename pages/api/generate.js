import axios from "axios";

export default async function handler(req, res) {
  const { text } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: text,
        max_tokens: 100,
        n: 1,
        stop: ["\n"],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
