'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface User {
  phone: string;
  nickname: string;
  avatar: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthState>({
  user: null, isLoading: true, isLoggedIn: false,
  login: async () => {}, logout: () => {}, updateProfile: () => {},
});

const STORAGE_USER = 'ai-workspace-user';

export function useAuth() { return useContext(AuthContext); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER);
      if (saved) setUser(JSON.parse(saved));
    } catch {}
    setIsLoading(false);
  }, []);

  const login = useCallback(async (phone: string, code: string) => {
    // 模拟短信验证：所有6位数字验证码都通过
    if (code.length !== 6) throw new Error('验证码为6位数字');
    const newUser: User = {
      phone,
      nickname: `用户${phone.slice(-4)}`,
      avatar: '',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_USER, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_USER);
    setUser(null);
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...data };
      localStorage.setItem(STORAGE_USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext value={{ user, isLoading, isLoggedIn: !!user, login, logout, updateProfile }}>
      {children}
    </AuthContext>
  );
}
