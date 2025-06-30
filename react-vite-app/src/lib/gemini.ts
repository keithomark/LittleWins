// To use Gemini AI, get your API key from Google AI Studio or Google Cloud Console.
// Paste your API key below:
const GEMINI_API_KEY = 'AIzaSyA9MDc0mK19DNuw8-iD-30oU5vFpajKojU'; // <-- Your real Gemini API key

// Gemini API utility for suggesting steps and timeline for a goal
// Replace the fetch URL and API key with your real Gemini endpoint and credentials

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

export async function getGeminiGoalSuggestions(goalTitle: string, goalDescription?: string) {
  const prompt = `Suggest 3-5 actionable steps and a realistic timeline (in weeks) to achieve the following goal. Respond as JSON with { steps: string[], weeks: number }\n\nGoal: ${goalTitle}\n${goalDescription ? `Description: ${goalDescription}` : ''}`;

  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Gemini suggestions');
  }

  const data = await response.json();
  // Parse the Gemini response to extract steps and weeks
  // This assumes the model returns a JSON string in the first candidate's content
  try {
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const parsed = JSON.parse(text);
    return parsed;
  } catch {
    throw new Error('Failed to parse Gemini response');
  }
} 