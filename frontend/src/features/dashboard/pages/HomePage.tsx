import React from "react";
import { FileText, Users, Shield, Zap } from "lucide-react";

export const HomePage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full -ml-12 -mb-12 blur-2xl"></div>

        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Welcome to Docsy
          </h1>
          <p className="text-lg md:text-xl text-green-50 mb-8 leading-relaxed">
            Your modern platform for seamless document collaboration. Create,
            share, and edit documents in real-time with your team.
          </p>
          <div className="flex gap-4"></div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Docsy?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<FileText size={32} className="text-blue-500" />}
            title="Rich Text Editor"
            description="Powerful formatting tools to express your ideas exactly how you want them."
            color="bg-blue-50"
          />
          <FeatureCard
            icon={<Users size={32} className="text-purple-500" />}
            title="Real-time Collab"
            description="Work together with your team in real-time. See changes as they happen."
            color="bg-purple-50"
          />
          <FeatureCard
            icon={<Shield size={32} className="text-green-500" />}
            title="Secure Storage"
            description="Your documents are encrypted and stored securely. Your data is safe with us."
            color="bg-green-50"
          />
          <FeatureCard
            icon={<Zap size={32} className="text-amber-500" />}
            title="Lightning Fast"
            description="Optimized performance for smooth editing and instant loading times."
            color="bg-amber-50"
          />
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  color,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
    </div>
  );
};
