import OpenAI from 'openai';
import { ChatResponse } from './types';

const client = new OpenAI({
  baseURL: 'https://integrate.api.nvidia.com/v1',
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export async function generateResponse(
  prompt: string, 
  onChunk: (chunk: string) => void
): Promise<ChatResponse> {
  try {
    const completion = await client.chat.completions.create({
      model: 'nvidia/llama-3.1-nemotron-70b-instruct',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
      top_p: 1,
      max_tokens: 1024,
      stream: true
    });

    let fullResponse = '';
    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        fullResponse += content;
        onChunk(fullResponse);
      }
    }
    
    return { content: fullResponse };
  } catch (error) {
    console.error('Error generating response:', error);
    return {
      content: 'I apologize, but I encountered an error. Please try again.',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}