import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai" ;
  const apiKey = 'AIzaSyC149T3NjO7JEBgHtn0zj-MUlctQRXDmsI';
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
    });
  
    try {
      const result = await chatSession.sendMessage(prompt);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.log(error);
    }
  }
  
  export default run;