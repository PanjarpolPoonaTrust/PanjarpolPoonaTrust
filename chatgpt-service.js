// ChatGPT Service Integration
class ChatGPTService {
    constructor() {
        this.API_KEY = ''; // Add your OpenAI API key here
        this.API_URL = 'https://api.openai.com/v1/chat/completions';
        this.SYSTEM_PROMPT = `You are NAARAD, an AI assistant for Poona Panjarpole Trust. 
        You should ONLY answer questions related to:
        1. The trust's location, contact details, and visiting hours
        2. Information about the cattle (number, care, treatment)
        3. Donation and payment methods
        4. Products for sale
        5. Treatment options
        
        For any other questions, politely redirect to these topics.
        Always maintain a friendly and helpful tone.
        Keep responses concise and include relevant links when possible.`;
    }

    async getResponse(userMessage) {
        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: this.SYSTEM_PROMPT },
                        { role: "user", content: userMessage }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling ChatGPT:', error);
            return "I apologize, but I'm having trouble connecting right now. Please try asking about our trust, cattle, or donations.";
        }
    }
}

// Export the service
window.ChatGPTService = ChatGPTService; 