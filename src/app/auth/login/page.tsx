'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { Phone, ArrowRight, Shield, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  if (isLoggedIn) { router.replace('/workspace'); return null; }

  const sendCode = async () => {
    setError('');
    if (!/^1[3-9]\d{9}$/.test(phone)) { setError('请输入正确的手机号'); return; }
    setLoading(true);
    // 模拟发送验证码
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setStep('code');
    console.log('验证码: 888888 (开发环境直接显示)');
  };

  const verifyCode = async () => {
    setError('');
    if (code.length !== 6) { setError('请输入6位验证码'); return; }
    setLoading(true);
    try {
      await login(phone, code);
      router.push('/workspace');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto rounded-3xl gradient-bg flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-primary">AI Workspace</h1>
          <p className="text-secondary text-sm mt-2">中国AI效率工作台</p>
        </div>

        {/* Form */}
        <div className="glass-card p-6 space-y-5">
          {step === 'phone' ? (
            <>
              <div>
                <label className="text-sm font-medium text-primary">手机号登录</label>
                <div className="mt-2 flex items-center gap-2 bg-surface-hover rounded-2xl px-4 py-3 border border-custom focus-within:border-accent/50 transition-colors">
                  <Phone className="w-4 h-4 text-tertiary shrink-0" />
                  <span className="text-tertiary text-sm">+86</span>
                  <input
                    type="tel" maxLength={11} value={phone}
                    onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="请输入手机号"
                    className="flex-1 bg-transparent text-primary placeholder:text-tertiary focus:outline-none text-sm"
                  />
                </div>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button onClick={sendCode} disabled={loading || phone.length !== 11}
                className="w-full py-3 rounded-2xl font-medium text-white gradient-bg hover:opacity-90 disabled:opacity-40 transition-all flex items-center justify-center gap-2">
                {loading ? '发送中...' : <>{'获取验证码'} <ArrowRight className="w-4 h-4" /></>}
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-medium text-primary">
                  输入验证码
                  <span className="text-tertiary font-normal ml-2">发送至 +86 {phone}</span>
                </label>
                <input
                  type="text" maxLength={6} value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="6位验证码"
                  className="mt-2 w-full bg-surface-hover rounded-2xl px-4 py-3 border border-custom focus:border-accent/50 focus:outline-none text-primary placeholder:text-tertiary text-sm tracking-[0.5em] text-center text-lg"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button onClick={verifyCode} disabled={loading || code.length !== 6}
                className="w-full py-3 rounded-2xl font-medium text-white gradient-bg hover:opacity-90 disabled:opacity-40 transition-all">
                {loading ? '验证中...' : '登录'}
              </button>
              <button onClick={() => { setStep('phone'); setCode(''); setError(''); }}
                className="w-full text-sm text-secondary hover:text-primary transition-colors">
                更换手机号
              </button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-tertiary mt-6 flex items-center justify-center gap-1">
          <Shield className="w-3 h-3" /> 手机号仅用于登录，不会泄露
        </p>
        <p className="text-center text-[10px] text-tertiary mt-2">
          开发环境验证码: 888888
        </p>
      </div>
    </div>
  );
}
