import { openai } from '../config';

export async function makeOpenAIRequest(endpoint: string, data: any) {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        endpoint,
        data,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error making OpenAI request:', error);
    throw error;
  }
}

export async function analyzeKeywordIntents(keywords: string[]) {
  try {
    return await makeOpenAIRequest('analyze-keywords', { keywords });
  } catch (error) {
    console.error('Error analyzing keywords:', error);
    return keywords.map(keyword => ({ keyword, intent: 'Analysis failed' }));
  }
}
