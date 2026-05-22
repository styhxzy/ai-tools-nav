import { ToolFeature } from '@/types/tool';
import {
  MessageCircle,
  FileText,
  Code,
  Globe,
  Search,
  BookOpen,
  Brain,
  GraduationCap,
  Terminal,
  Files,
  BarChart,
  Sparkles,
  Bug,
  CheckCircle,
  FolderTree,
  MessageSquare,
  Wand,
  Layout,
  Image,
  Users,
  Palette,
  Download,
  Heart,
  Languages,
  ScrollText,
  Upload,
  Sliders,
  GitBranch,
  ZoomIn,
  ImagePlus,
  PenLine,
  Network,
  CheckSquare,
  Database,
  FileSearch,
  LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  MessageCircle, FileText, Code, Globe, Search,
  BookOpen, Brain, GraduationCap, Terminal, Files, BarChart,
  Sparkles, Bug, CheckCircle, FolderTree, MessageSquare,
  Wand, Layout, Image, Users, Palette, Download,
  Heart, Languages, ScrollText, Upload,
  Sliders, GitBranch, ZoomIn, ImagePlus,
  PenLine, Network, CheckSquare, Database, FileSearch,
};

interface ToolFeaturesProps {
  features: ToolFeature[];
}

export function ToolFeatures({ features }: ToolFeaturesProps) {
  return (
    <div className="mb-10" id="features">
      <h2 className="text-xl font-bold text-gray-900 mb-6">功能介绍</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature) => {
          const Icon = iconMap[feature.icon] || Sparkles;
          return (
            <div
              key={feature.title}
              className="glass-card p-5"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1.5">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
