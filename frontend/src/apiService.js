// google cloud server
const API_BASE_URL = "http://127.0.0.1:8000"; // https://backend-ao4yls34ba-uc.a.run.app

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


  // provides the bot response given the complete chat history
 async function botResponse(chat) {
    try {
        // passes entire chat as a JSON list to server, which provides a response
        // using the OpenAI API
        const server_response = await fetch(`${API_BASE_URL}/api/chatbot/`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completeChat: chat }), 
        });

        // extract bot's resopnse and return as JSON item for the chat list
        const responseJson = await server_response.json();
        return { "role":"assistant", "content": responseJson.reply };

    } catch (error) {
        console.error("Error responding to message:", error); // handle error
    }
  }

  export { translateText, botResponse };