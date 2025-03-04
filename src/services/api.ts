
// API service for handling metrics data

// Types for our API responses
export interface PlatformMetricsResult {
  app_usage_distribution: Record<string, number>;
  total_active_chats: number;
  total_conversations: number;
  total_file_attachments: number;
  total_liked_messages: number;
  total_messages: number;
  total_users: number;
}

export interface AdditionalMetricsResult {
  app_usage_distribution: Record<string, number>;
  average_messages_per_conversation: number;
  average_messages_per_user: number;
  file_type_distribution: Record<string, number>;
  like_ratio: number;
  model_usage_distribution: Record<string, number>;
  system_prompt_usage: number;
  total_active_conversations: number;
  total_conversations: number;
  total_file_attachments: number;
  total_inactive_conversations: number;
  total_liked_messages: number;
  total_messages: number;
  total_users: number;
}

export interface AdvancedMetricsResult {
  average_message_length: number;
  conversation_duration_stats: {
    avg_duration: string;
    max_duration: string;
    min_duration: string;
  };
  daily_message_counts: {
    day: string;
    message_count: number;
  }[];
  longest_conversation: {
    conv_id: string;
    message_count: number;
  };
  max_message_length: number;
  multi_model_conversations: number;
  top_5_most_active_users: {
    message_count: number;
    user_id: string;
  }[];
}

export interface ChatAnalysisResult {
  average_execution_time: number;
  average_tokens_per_request: number;
  daily_tokens_trend: {
    daily_tokens: number;
    day: string;
  }[];
  guardrail_trigger_distribution: Record<string, number>;
  prompt_vs_completion_ratio: number;
  total_completion_tokens: number;
  total_guardrail_events: number;
  total_prompt_tokens: number;
  total_successful_requests: number;
  total_tokens: number;
}

export interface ConversationDetail {
  app_description: string | null;
  app_details: string | null;
  app_id: string;
  appname: string | null;
  chat_id: string;
  chat_title: string;
  completion_tokens: number;
  conv_id: string;
  created_at: string;
  created_time: string;
  execution_time: number;
  file_data: string | null;
  file_name: string | null;
  file_type: string | null;
  guardrails_reason: string;
  guardrails_status: string;
  id: number;
  input_keys: string | null;
  is_active: boolean;
  liked: string | null;
  model_name: string;
  model_provider: string;
  msg: string;
  msg_from: string;
  msg_to: string;
  prompt_template: string | null;
  prompt_tokens: number;
  successful_requests: number;
  system_prompt: string | null;
  total_tokens: number;
  updated_date: string;
  user_id: string;
  verbose: string;
}

export interface ConversationDetailsResult {
  [conv_id: string]: ConversationDetail[];
}

export interface ChatAnalysisTotals {
  total_completion: number;
  total_prompt: number;
  total_successful_requests: number;
  total_tokens: number;
}

// Mock API functions to simulate API calls
export const fetchPlatformMetrics = async (): Promise<PlatformMetricsResult> => {
  // In a real app, this would make an API call
  return {
    app_usage_distribution: {
      "1b2d3e4c-5a6f-7d8a-9e0f-3b2c1d4a5e6f": 22,
      "1e4d9f35-6b1f-4238-91f0-8a7c2d5e4a11": 18,
      "2f3e4d5a-1b6c-7d8e-9a0f-4c5b1a2d3e6f": 32,
      "3f1a0e24-b5b4-4f3e-9e8c-2f1dcb1d8b44": 19,
      "4d5a6c7d-9e3b-2f1a-0f8c-7d3e1b4c5a6f": 29,
      "5a6c7d9e-3b2f-4a1d-8c9e-0f7b1a2d3c4e": 19,
      "7c2b8a5d-1f2e-4839-8d9a-3c5e0f7a6c92": 29,
      "8c9e0f7b-5a1d-2d3e-4c6b-7d8a1f3e5c2b": 31,
      "9b5c6d84-2e1f-4a3b-9d8c-7e2f1a0d5b6c": 23,
      "9e0f7b1a-2d3e-4c5a-6f8d-1b2c3d4a5e7f": 28
    },
    total_active_chats: 127,
    total_conversations: 250,
    total_file_attachments: 0,
    total_liked_messages: 0,
    total_messages: 250,
    total_users: 10
  };
};

export const fetchAdditionalMetrics = async (): Promise<AdditionalMetricsResult> => {
  return {
    app_usage_distribution: {
      "1b2d3e4c-5a6f-7d8a-9e0f-3b2c1d4a5e6f": 22,
      "1e4d9f35-6b1f-4238-91f0-8a7c2d5e4a11": 18,
      "2f3e4d5a-1b6c-7d8e-9a0f-4c5b1a2d3e6f": 32,
      "3f1a0e24-b5b4-4f3e-9e8c-2f1dcb1d8b44": 19,
      "4d5a6c7d-9e3b-2f1a-0f8c-7d3e1b4c5a6f": 29,
      "5a6c7d9e-3b2f-4a1d-8c9e-0f7b1a2d3c4e": 19,
      "7c2b8a5d-1f2e-4839-8d9a-3c5e0f7a6c92": 29,
      "8c9e0f7b-5a1d-2d3e-4c6b-7d8a1f3e5c2b": 31,
      "9b5c6d84-2e1f-4a3b-9d8c-7e2f1a0d5b6c": 23,
      "9e0f7b1a-2d3e-4c5a-6f8d-1b2c3d4a5e7f": 28
    },
    average_messages_per_conversation: 1.0,
    average_messages_per_user: 25.0,
    file_type_distribution: {},
    like_ratio: 0.0,
    model_usage_distribution: {
      "gpt-3.5": 49,
      "gpt-4": 74,
      "lamma": 61,
      "mixtral": 66
    },
    system_prompt_usage: 0,
    total_active_conversations: 127,
    total_conversations: 250,
    total_file_attachments: 0,
    total_inactive_conversations: 123,
    total_liked_messages: 0,
    total_messages: 250,
    total_users: 10
  };
};

export const fetchAdvancedMetrics = async (): Promise<AdvancedMetricsResult> => {
  return {
    average_message_length: 34.0,
    conversation_duration_stats: {
      avg_duration: "0:00:00.000007",
      max_duration: "0:00:00.001000",
      min_duration: "0:00:00"
    },
    daily_message_counts: [
      {
        day: "Thu, 27 Feb 2025 00:00:00 GMT",
        message_count: 250
      }
    ],
    longest_conversation: {
      conv_id: "db8c2c46-7d36-403b-af1d-48ab93686618",
      message_count: 1
    },
    max_message_length: 34,
    multi_model_conversations: 0,
    top_5_most_active_users: [
      {
        message_count: 34,
        user_id: "5c4b3a2d-1e0f-98b7-6a5c-4d3e2f1e0d9c"
      },
      {
        message_count: 28,
        user_id: "9e8d7c6b-5a4f-32e1-bc0a-8d7e6f5c4b3a"
      },
      {
        message_count: 25,
        user_id: "3f1a3b92-8c2b-4a44-bc93-6e6f0f786b98"
      },
      {
        message_count: 25,
        user_id: "b7e1a2d3-6c4e-45f2-9b88-1c2d3a4e5f67"
      },
      {
        message_count: 24,
        user_id: "f3c5b8a4-17a2-4f8e-91b6-2d0a9cfeb6f9"
      }
    ]
  };
};

export const fetchChatAnalysis = async (): Promise<ChatAnalysisResult> => {
  return {
    average_execution_time: 1.292,
    average_tokens_per_request: 486.36,
    daily_tokens_trend: [
      {
        daily_tokens: 695009,
        day: "Thu, 27 Feb 2025 00:00:00 GMT"
      }
    ],
    guardrail_trigger_distribution: {
      "Policy violation": 19,
      "Potentially harmful language": 32,
      "Sensitive content detected": 29,
      "Spam detected": 20,
      "User flagged inappropriate": 22
    },
    prompt_vs_completion_ratio: 0.671,
    total_completion_tokens: 385214,
    total_guardrail_events: 122,
    total_prompt_tokens: 258606,
    total_successful_requests: 1429,
    total_tokens: 695009
  };
};

export const fetchConversationDetails = async (
  userId?: string,
  appId?: string,
  modelName?: string
): Promise<ConversationDetailsResult> => {
  // This is a simplified version that would normally filter based on the parameters
  // For demo purposes, we're returning a subset of the data
  return {
    "0414b579-3bc3-4c7b-986d-9250fae68bdc": [{
      "app_description": null,
      "app_details": null,
      "app_id": "5a6c7d9e-3b2f-4a1d-8c9e-0f7b1a2d3c4e",
      "appname": null,
      "chat_id": "0a447e88-3d48-45ff-88a4-80e574b77c2f",
      "chat_title": "User Support Chat",
      "completion_tokens": 702,
      "conv_id": "0414b579-3bc3-4c7b-986d-9250fae68bdc",
      "created_at": "Thu, 27 Feb 2025 16:12:03 GMT",
      "created_time": "Thu, 27 Feb 2025 16:12:02 GMT",
      "execution_time": 0.58,
      "file_data": null,
      "file_name": null,
      "file_type": null,
      "guardrails_reason": "Potentially harmful language",
      "guardrails_status": "no",
      "id": 441,
      "input_keys": null,
      "is_active": true,
      "liked": null,
      "model_name": "gpt-3.5",
      "model_provider": "watsonx",
      "msg": "Hello! How can I assist you today?",
      "msg_from": "AI",
      "msg_to": "user",
      "prompt_template": null,
      "prompt_tokens": 1216,
      "successful_requests": 5,
      "system_prompt": null,
      "total_tokens": 4213,
      "updated_date": "Thu, 27 Feb 2025 16:12:02 GMT",
      "user_id": "9e8d7c6b-5a4f-32e1-bc0a-8d7e6f5c4b3a",
      "verbose": "This is a detailed explanation of the response given to the user."
    }],
    "0ba2ccd8-b32e-4078-a640-250dc73bfbf3": [{
      "app_description": null,
      "app_details": null,
      "app_id": "7c2b8a5d-1f2e-4839-8d9a-3c5e0f7a6c92",
      "appname": null,
      "chat_id": "cd02b5cf-9e16-4ed5-aac8-c5a7de1dab19",
      "chat_title": "User Support Chat",
      "completion_tokens": 864,
      "conv_id": "0ba2ccd8-b32e-4078-a640-250dc73bfbf3",
      "created_at": "Thu, 27 Feb 2025 16:11:48 GMT",
      "created_time": "Thu, 27 Feb 2025 16:11:48 GMT",
      "execution_time": 0.95,
      "file_data": null,
      "file_name": null,
      "file_type": null,
      "guardrails_reason": "Policy violation",
      "guardrails_status": "yes",
      "id": 342,
      "input_keys": null,
      "is_active": false,
      "liked": null,
      "model_name": "gpt-4",
      "model_provider": "watsonx",
      "msg": "Hello! How can I assist you today?",
      "msg_from": "AI",
      "msg_to": "user",
      "prompt_template": null,
      "prompt_tokens": 128,
      "successful_requests": 6,
      "system_prompt": null,
      "total_tokens": 2778,
      "updated_date": "Thu, 27 Feb 2025 16:11:48 GMT",
      "user_id": "9e8d7c6b-5a4f-32e1-bc0a-8d7e6f5c4b3a",
      "verbose": "This is a detailed explanation of the response given to the user."
    }]
  };
};

export const fetchChatAnalysisTotals = async (
  userId?: string,
  appId?: string,
  modelName?: string
): Promise<ChatAnalysisTotals> => {
  return {
    total_completion: 1279,
    total_prompt: 355,
    total_successful_requests: 2,
    total_tokens: 2266
  };
};
