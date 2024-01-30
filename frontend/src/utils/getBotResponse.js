import { API_BASE_URL } from '../constants/apiBaseUrl.js'

 // provides the bot response given the complete chat history
 async function getBotResponse(chat) {
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

  export { getBotResponse }