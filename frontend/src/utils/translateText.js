import { API_BASE_URL } from '../constants/apiBaseUrl'

// translates text from norwegian to english 
async function translateText(text) {
    try {
      // passes text to server with translator
      const botTranslation = await fetch(`${API_BASE_URL}/api/chatbot/translator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ textToTranslate: text }),
      });

      // extract translated text
      const translationJson = await botTranslation.json();
      return translationJson.translation;

    } catch (error) {
      console.error("Error translating text:", error); // handle error
    }
  }

  export { translateText };