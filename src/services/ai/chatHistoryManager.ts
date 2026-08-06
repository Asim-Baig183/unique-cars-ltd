export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface CustomerBookingData {
  name: string;
  email: string;
  phone: string;
  vehicleId?: string;
  vehicleDetails?: string; // "2015 Honda Civic"
  appointmentDate: string;
  appointmentTime: string;
  createdAt: string;
}

export interface ConversationState {
  stage: 'QUALIFYING' | 'PRESENTING' | 'BOOKING' | 'COMPLETE';
  customerPreferences?: {
    budget?: string;
    vehicleType?: string;
    make?: string;
    model?: string;
    transmission?: string;
    timeline?: string;
  };
  selectedVehicle?: string;
  bookingData?: Partial<CustomerBookingData>;
}

export const formatChatHistory = (messages: ChatMessage[], maxMessages = 8): ChatMessage[] => {
  // Retain system context and trim older messages to save tokens
  if (messages.length <= maxMessages) return messages;
  return messages.slice(-maxMessages);
};

// Initialize conversation state
export const initializeConversationState = (): ConversationState => {
  return {
    stage: 'QUALIFYING',
    customerPreferences: {},
    bookingData: {},
  };
};

// Update conversation stage
export const updateConversationStage = (
  state: ConversationState,
  newStage: ConversationState['stage']
): ConversationState => {
  return { ...state, stage: newStage };
};

// Update customer preferences from conversation
export const updateCustomerPreferences = (
  state: ConversationState,
  preferences: Partial<ConversationState['customerPreferences']>
): ConversationState => {
  return {
    ...state,
    customerPreferences: { ...state.customerPreferences, ...preferences },
  };
};

// Update booking data
export const updateBookingData = (
  state: ConversationState,
  data: Partial<CustomerBookingData>
): ConversationState => {
  return {
    ...state,
    bookingData: { ...state.bookingData, ...data },
  };
};

// Set selected vehicle
export const setSelectedVehicle = (
  state: ConversationState,
  vehicleDetails: string
): ConversationState => {
  return {
    ...state,
    stage: 'BOOKING',
    selectedVehicle: vehicleDetails,
    bookingData: { ...state.bookingData, vehicleDetails },
  };
};
