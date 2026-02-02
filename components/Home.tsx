import React from 'react';
import { Section } from '../types';
import { ArrowRight, Sprout, ShieldCheck, ShoppingCart, Users, MessageSquare } from 'lucide-react';

interface HomeProps {
  onNavigate: (section: Section) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading text-slate-900 font-bold">
          Empowering Pune's <span className="text-emerald-600">Terrace Revolution</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl">
          AI-powered app for organic urban farming in Pune. Get personalized advice, diagnose issues, sell produce, and connect with fellow farmers.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <button 
          onClick={() => onNavigate(Section.Advisor)}
          className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="bg-emerald-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
            <Sprout className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">AI Agri-Advisor</h3>
          <p className="text-slate-500 mb-4 text-sm">Personalized crop planning based on your terrace space and Pune's micro-climate.</p>
          <div className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:translate-x-1 transition-transform">
            Get your plan <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button 
          onClick={() => onNavigate(Section.Chat)}
          className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
            <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">AI Assistant</h3>
          <p className="text-slate-500 mb-4 text-sm">Real-time chat with our AI for immediate gardening help and expert advice.</p>
          <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:translate-x-1 transition-transform">
            Chat now <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button 
          onClick={() => onNavigate(Section.Forum)}
          className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="bg-purple-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Community Forum</h3>
          <p className="text-slate-500 mb-4 text-sm">Ask questions, share tips, and learn from other organic farmers in Pune.</p>
          <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:translate-x-1 transition-transform">
            Join the forum <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button 
          onClick={() => onNavigate(Section.Diagnostics)}
          className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="bg-amber-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-amber-600 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Smart Diagnostics</h3>
          <p className="text-slate-500 mb-4 text-sm">Instant AI analysis for plant pests and soil health with organic remedies.</p>
          <div className="flex items-center gap-2 text-amber-600 font-semibold group-hover:translate-x-1 transition-transform">
            Diagnose now <ArrowRight className="w-4 h-4" />
          </div>
        </button>

        <button 
          onClick={() => onNavigate(Section.Marketplace)}
          className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left"
        >
          <div className="bg-slate-100 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-slate-600 group-hover:scale-110 transition-transform">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Marketplace</h3>
          <p className="text-slate-500 mb-4 text-sm">Connect directly with local Pune restaurants to sell your organic terrace harvest.</p>
          <div className="flex items-center gap-2 text-slate-600 font-semibold group-hover:translate-x-1 transition-transform">
            Sell produce <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h3 className="text-2xl font-bold mb-4">Join Pune's Green Community</h3>
          <p className="text-slate-300 mb-6">Connect with fellow terrace farmers in areas like Kothrud, Baner, and Viman Nagar. Share tips, seeds, and experiences.</p>
          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Find Local Groups
          </button>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-emerald-500/20 to-transparent hidden md:block" />
      </div>
    </div>
  );
};

export default Home;