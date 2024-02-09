import { API_BASE_URL } from '../constants/apiBaseUrl'

async function sayHello() {
    try {

      // passes text to server with translator
      const getHello = await fetch(`${API_BASE_URL}/api/chatbot/sayHello`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      // extract translated text
      const helloJson = await getHello.json();
      
      console.log(helloJson)
      return helloJson.hello;

    } catch (error) {
      console.error("Error getting hello:", error); // handle error
    }

  }

  export { sayHello };