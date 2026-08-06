import { SYSTEM_PROMPT } from './systemPrompt';
import { getKnowledgeBaseContext } from './knowledgeBase';
import { getLiveInventoryContext, saveAppointmentBooking, sendBookingEmailToSales } from './supabaseContext';
import { type ChatMessage, formatChatHistory, type ConversationState } from './chatHistoryManager';

export const generateAIResponse = async (
  userQuery: string,
  chatHistory: ChatMessage[],
  conversationState: ConversationState
): Promise<{
  response: string;
  updatedState: ConversationState;
  bookingData?: any;
}> => {
  try {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
      console.error("VITE_GROQ_API_KEY is missing");
      return {
        response: "API Key error. Please contact support.",
        updatedState: conversationState,
      };
    }

    // 1. Fetch live inventory
    const liveInventory = await getLiveInventoryContext();

    // 2. Get knowledge base
    const kbContext = getKnowledgeBaseContext();

    // 3. Add conversation state context to system prompt
    const stateContext = formatConversationStateForPrompt(conversationState);

    // 4. Assemble full system prompt
    const fullSystemPrompt = `
${SYSTEM_PROMPT}

${kbContext}

${liveInventory}

${stateContext}
    `.trim();

    // 5. Format chat history
    const recentHistory = formatChatHistory(chatHistory);

    // 6. Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: fullSystemPrompt },
          ...recentHistory,
          { role: 'user', content: userQuery },
        ],
        temperature: 0.4,
        max_tokens: 300,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq API Error:", data.error);
      return {
        response: "Unable to process request. Please try again.",
        updatedState: conversationState,
      };
    }

    const aiResponse = data.choices?.[0]?.message?.content || "Thank you for contacting Unique Cars Ltd!";

    // 7. Detect booking completion and save if needed
    let updatedState = { ...conversationState };
    let bookingData = null;

    // Check if user provided phone number (last required field)
    if (
      conversationState.stage === 'BOOKING' &&
      conversationState.bookingData?.name &&
      conversationState.bookingData?.email &&
      conversationState.bookingData?.phone &&
      conversationState.bookingData?.appointmentDate &&
      conversationState.bookingData?.appointmentTime
    ) {
      // All booking data collected - save to database
      const completeBookingData = {
        ...conversationState.bookingData,
        createdAt: new Date().toISOString(),
      };

      const saveResult = await saveAppointmentBooking(completeBookingData as any);
      if (saveResult.success) {
        const emailResult = await sendBookingEmailToSales(completeBookingData as any);
        console.log("Email send result:", emailResult);
        updatedState.stage = 'COMPLETE';
        bookingData = completeBookingData;
      }
    }

    return {
      response: aiResponse,
      updatedState,
      bookingData,
    };
  } catch (err) {
    console.error("AI Generation Error:", err);
    return {
      response: "Connection error. Please try again.",
      updatedState: conversationState,
    };
  }
};

// Helper: Format conversation state for AI context
const formatConversationStateForPrompt = (state: ConversationState): string => {
  const { stage, customerPreferences, selectedVehicle, bookingData } = state;

  let context = `
=== CONVERSATION STATE ===
Current Stage: ${stage}
`;

  if (stage === 'QUALIFYING' && customerPreferences) {
    context += `
Customer Preferences So Far:
- Budget: ${customerPreferences.budget || 'Not specified'}
- Vehicle Type: ${customerPreferences.vehicleType || 'Not specified'}
- Make: ${customerPreferences.make || 'Not specified'}
- Model: ${customerPreferences.model || 'Not specified'}
- Transmission: ${customerPreferences.transmission || 'Not specified'}

Continue qualifying the customer. Ask for missing information.`;
  }

  if (stage === 'PRESENTING') {
    context += `
Customer is in PRESENTING stage. Recommend vehicles based on their preferences and show 2-4 matching vehicles from inventory.
Customer preferences: ${JSON.stringify(customerPreferences)}`;
  }

  if (stage === 'BOOKING') {
    context += `
Customer is in BOOKING stage for vehicle: ${selectedVehicle || 'TBD'}
Booking data collected so far:
- Name: ${bookingData?.name || 'Not provided'}
- Email: ${bookingData?.email || 'Not provided'}
- Phone: ${bookingData?.phone || 'Not provided'}
- Date: ${bookingData?.appointmentDate || 'Not provided'}
- Time: ${bookingData?.appointmentTime || 'Not provided'}

Continue collecting missing booking information. Ask one question at a time.`;
  }

  if (stage === 'COMPLETE') {
    context += `\nBooking is COMPLETE. Confirm details and thank customer.`;
  }

  return context;
};
