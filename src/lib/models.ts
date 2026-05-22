// 国产AI模型统一管理系统
// 为后续增加更多国产模型预留结构

export interface ModelCapability {
  tag: string;
  level: 'excellent' | 'good' | 'normal';
}

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  providerLogo?: string;
  apiEndpoint: string;
  apiKeyEnv: string;
  capabilities: ModelCapability[];
  description: string;
  tier: 'free' | 'pro';
  maxTokens: number;
  supportsStreaming: boolean;
  supportsVision: boolean;
  disabled?: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'deepseek-chat',
    name: 'DeepSeek V3',
    provider: '深度求索',
    apiEndpoint: 'https://api.deepseek.com/v1/chat/completions',
    apiKeyEnv: 'DEEPSEEK_API_KEY',
    capabilities: [
      { tag: '深度推理', level: 'excellent' },
      { tag: '编程', level: 'excellent' },
      { tag: '数学', level: 'excellent' },
      { tag: '中文理解', level: 'excellent' },
      { tag: '长文本', level: 'good' },
    ],
    description: '国产顶尖推理模型，编程和数学能力出色，完全免费',
    tier: 'free',
    maxTokens: 8192,
    supportsStreaming: true,
    supportsVision: false,
  },
  {
    id: 'kimi-moonshot',
    name: 'Kimi',
    provider: '月之暗面',
    apiEndpoint: 'https://api.moonshot.cn/v1/chat/completions',
    apiKeyEnv: 'KIMI_API_KEY',
    capabilities: [
      { tag: '长文本', level: 'excellent' },
      { tag: '阅读总结', level: 'excellent' },
      { tag: '文档分析', level: 'excellent' },
      { tag: '日常对话', level: 'good' },
    ],
    description: '200万字超长上下文，擅长长文档分析和阅读总结',
    tier: 'free',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsVision: false,
  },
  {
    id: 'doubao',
    name: '豆包',
    provider: '字节跳动',
    apiEndpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    apiKeyEnv: 'DOUBAO_API_KEY',
    capabilities: [
      { tag: '日常对话', level: 'excellent' },
      { tag: '内容创作', level: 'excellent' },
      { tag: '多模态', level: 'good' },
      { tag: '中文理解', level: 'good' },
    ],
    description: '字节跳动出品，日常对话流畅，内容创作能力强',
    tier: 'free',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsVision: true,
    disabled: true,
  },
  {
    id: 'qwen-turbo',
    name: '通义千问 Turbo',
    provider: '阿里云',
    apiEndpoint: 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
    apiKeyEnv: 'QWEN_API_KEY',
    capabilities: [
      { tag: '多模态', level: 'excellent' },
      { tag: '中文理解', level: 'excellent' },
      { tag: '内容创作', level: 'good' },
      { tag: '编程', level: 'good' },
    ],
    description: '阿里云出品，多模态能力强，中文理解和创作能力出色',
    tier: 'pro',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsVision: true,
    disabled: true,
  },
  {
    id: 'glm-4',
    name: '智谱GLM-4',
    provider: '智谱AI',
    apiEndpoint: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    apiKeyEnv: 'GLM_API_KEY',
    capabilities: [
      { tag: '深度推理', level: 'good' },
      { tag: '中文理解', level: 'excellent' },
      { tag: '编程', level: 'good' },
      { tag: '知识问答', level: 'excellent' },
    ],
    description: '清华系AI公司，中文理解和知识问答能力一流',
    tier: 'pro',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsVision: true,
    disabled: true,
  },
  {
    id: 'minimax',
    name: 'MiniMax',
    provider: 'MiniMax',
    apiEndpoint: 'https://api.minimax.chat/v1/text/chatcompletion_v2',
    apiKeyEnv: 'MINIMAX_API_KEY',
    capabilities: [
      { tag: '语音合成', level: 'excellent' },
      { tag: '多轮对话', level: 'good' },
      { tag: '内容创作', level: 'good' },
    ],
    description: '语音能力突出，支持多轮对话和内容创作',
    tier: 'free',
    maxTokens: 4096,
    supportsStreaming: true,
    supportsVision: false,
    disabled: true,
  },
];

export function getEnabledModels(): AIModel[] {
  return AI_MODELS.filter((m) => !m.disabled);
}

export function getModelById(id: string): AIModel | undefined {
  return AI_MODELS.find((m) => m.id === id);
}

// 模型调用抽象层：统一接口，不同后端
export interface ChatRequest {
  modelId: string;
  messages: { role: 'system' | 'user' | 'assistant'; content: string }[];
  stream?: boolean;
  temperature?: number;
  maxTokens?: number;
}

export async function callModel(
  request: ChatRequest,
  onChunk?: (text: string) => void,
  signal?: AbortSignal
): Promise<string> {
  const model = getModelById(request.modelId);
  if (!model) throw new Error(`模型 ${request.modelId} 未找到`);

  const apiKey = process.env[model.apiKeyEnv];
  if (!apiKey) throw new Error(`${model.name} API Key 未配置`);

  const body: Record<string, unknown> = {
    model: model.id,
    messages: request.messages,
    stream: request.stream ?? false,
    temperature: request.temperature ?? 0.7,
    max_tokens: request.maxTokens ?? model.maxTokens,
  };

  // 不同供应商的API格式差异处理
  let headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  switch (model.id) {
    case 'deepseek-chat':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    case 'kimi-moonshot':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    case 'doubao':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    case 'qwen-turbo':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    case 'glm-4':
      headers['Authorization'] = `Bearer ${apiKey}`;
      break;
    case 'minimax':
      headers['Authorization'] = `Bearer ${apiKey}`;
      body['model'] = 'abab6.5s-chat';
      break;
  }

  const response = await fetch(model.apiEndpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`${model.name} API错误: ${response.status} ${err}`);
  }

  if (request.stream && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const data = trimmed.slice(6);
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          const content =
            parsed.choices?.[0]?.delta?.content || '';
          if (content) {
            fullText += content;
            onChunk?.(content);
          }
        } catch { /* skip */ }
      }
    }
    return fullText;
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content || '';
}
