import { LlmProvider } from './llm-provider.interface';

const OLLAMA_URL = 'http://127.0.0.1:11434';

export class OllamaProvider implements LlmProvider {
  async embed(text: string): Promise<number[]> {
    const response = await fetch(`${OLLAMA_URL}/api/embed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'nomic-embed-text',
        input: text,
      }),
    });

    const data = await response.json();
    return data.embeddings[0];
  }

  async generateAnswer(question: string, context: string): Promise<string> {
    const prompt = `
      Answer the question using only the context below.
        Context: ${context}
        Question: ${question}
      `;

    const response = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:3b',
        prompt: prompt,
        stream: false,
      }),
    });

    const data = await response.json();
    return data.response;
  }
}
