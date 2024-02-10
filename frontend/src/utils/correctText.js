import { API_BASE_URL } from '../constants/apiBaseUrl'
import { defaultLanguage } from '../constants/userSettings.js' 

async function correctText(text) {
    try {

      // passes text to server with translator
      const botCorrection = await fetch(`${API_BASE_URL}/api/chatbot/corrector`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            learning_language: localStorage.getItem('learnLanguage' || defaultLanguage),
            user_content: text
        }),
      });

      // extract translated text
      const correctedJson = await botCorrection.json();
      console.log(correctedJson)
      return correctedJson;

    } catch (error) {
      console.error("Error getting hello:", error); // handle error
    }

  }

  export { correctText };