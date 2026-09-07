export interface LlmProvider {
  embed(text: string): Promise<number[]>;

  generateAnswer(question: string, context: string): Promise<string>;
}
