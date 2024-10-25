const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

if (!API_KEY) {
  throw new Error('Hugging Face API key is required. Please set VITE_HUGGINGFACE_API_KEY in your environment variables.');
}

export type GenerateResponse = {
  content: string;
  error?: string;
};

export async function generateResponse(prompt: string): Promise<GenerateResponse> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        inputs: `<s>[INST] ${prompt} [/INST]`,
        parameters: {
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.15,
          do_sample: true
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate response');
    }

    const result = await response.json();
    const content = Array.isArray(result) ? result[0].generated_text : result.generated_text;

    if (!content) {
      return { content: '', error: 'No response generated' };
    }

    // Extract the response after [/INST]
    const responseContent = content.split('[/INST]').pop()?.trim() || '';
    return { content: responseContent };
  } catch (error) {
    console.error('Error generating response:', error);
    let errorMessage = 'An unexpected error occurred';
    
    if (error instanceof Error) {
      if (error.message.includes('unauthorized')) {
        errorMessage = 'Invalid API key. Please check your Hugging Face API key configuration.';
      } else if (error.message.includes('quota')) {
        errorMessage = 'API quota exceeded. Please check your Hugging Face account.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return { content: '', error: errorMessage };
  }
}