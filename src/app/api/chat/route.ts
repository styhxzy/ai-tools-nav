import { NextRequest } from 'next/server';

// 默认使用 DeepSeek（国内可直连）
const DEEPSEEK_KEY = process.env.DEEPSEEK_API_KEY || '';
const DEEPSEEK_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(req: NextRequest) {
  try {
    const { messages, model } = await req.json();

    if (!messages?.length) {
      return Response.json({ error: '消息不能为空' }, { status: 400 });
    }

    if (!DEEPSEEK_KEY || DEEPSEEK_KEY.startsWith('sk-your-')) {
      return Response.json(
        { error: '请在 .env.local 中配置 DEEPSEEK_API_KEY' },
        { status: 500 }
      );
    }

    // 系统提示词
    const systemMsg = { role: 'system', content: '你是一个AI效率助手，帮助中国大学生和创作者完成工作。用中文回答，内容清晰有条理。' };

    const res = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${DEEPSEEK_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages: [systemMsg, ...messages],
        stream: true,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return Response.json({ error: `API错误: ${res.status}` }, { status: res.status });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(ctrl) {
        const reader = res.body?.getReader();
        if (!reader) { ctrl.close(); return; }
        const dec = new TextDecoder();
        let buf = ''; let closed = false;
        const cl = () => { if (!closed) { closed = true; ctrl.close(); } };
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buf += dec.decode(value, { stream: true });
            const lines = buf.split('\n'); buf = lines.pop() || '';
            for (const line of lines) {
              const t = line.trim();
              if (!t || !t.startsWith('data: ')) continue;
              const d = t.slice(6);
              if (d === '[DONE]') { cl(); return; }
              try {
                const p = JSON.parse(d);
                const c = p.choices?.[0]?.delta?.content;
                if (c) ctrl.enqueue(encoder.encode(c));
              } catch {}
            }
          }
        } catch {} finally { cl(); }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch {
    return Response.json({ error: '服务器内部错误' }, { status: 500 });
  }
}
