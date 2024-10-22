interface ContentParams {
  urls: string[];
  mainKeyword: string;
  contentType: string;
  language: string;
  businessName: string;
  businessType: string;
  country: string;
  tone: string;
  claudeTemperature: number;
}

export async function generateContentFromBackend(params: ContentParams): Promise<string> {
  try {
    const response = await fetch('https://your-backend-api.com/generate-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.statusText}`);
    }

    return await response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
