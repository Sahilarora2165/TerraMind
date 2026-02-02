import React, { useState } from 'react';
import { getAgriAdvice } from '../services/gemini';
import { Loader2, Droplets, Sun, MapPin, AlertCircle, Sprout } from 'lucide-react';

const AgriAdvisor: React.FC = () => {
  const [space, setSpace] = useState<number>(50);
  const [sunlight, setSunlight] = useState('Full');
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<any>(null);

  const handleGenerate = async () => {
    if (space < 10) return alert("Terrace space must be at least 10 sq ft.");
    setLoading(true);
    try {
      // Mock weather for Pune
      const mockWeather = { temp: 28, condition: 'Partly Cloudy', rainProb: 10 };
      const data = await getAgriAdvice(space, sunlight, mockWeather);
      setAdvice(data);
    } catch (error) {
      console.error(error);
      alert("Failed to get advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-900">AI Agri-Advisor</h2>
          <p className="text-slate-500">Personalized planning for your Pune terrace garden.</p>
        </div>
        <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Pune, Maharashtra
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Terrace Space (sq ft)</label>
              <input 
                type="number" 
                value={space}
                onChange={(e) => setSpace(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="e.g., 50"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Sunlight Exposure</label>
              <select 
                value={sunlight}
                onChange={(e) => setSunlight(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                <option>Full Sunlight (6+ hours)</option>
                <option>Partial Sunlight (3-6 hours)</option>
                <option>Shade / Indirect Light</option>
              </select>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Custom Plan'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {advice ? (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-emerald-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-emerald-300 text-sm font-bold uppercase tracking-wider">Top Suggestion</span>
                  <h3 className="text-3xl font-bold mt-2 mb-4">{advice.cropSuggestion}</h3>
                  <p className="text-emerald-100 leading-relaxed max-w-xl">{advice.reasoning}</p>
                </div>
                <div className="absolute right-[-20px] top-[-20px] opacity-10">
                  <Sprout className="w-48 h-48" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Water Budget</h4>
                    <p className="text-slate-500 text-sm mt-1">{advice.waterBudget}</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Daily Alert</h4>
                    <p className="text-slate-500 text-sm mt-1">{advice.alert}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
              <Sprout className="w-12 h-12 mx-auto mb-4 opacity-20" />
              <p>Configure your terrace settings to see your personalized farming plan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgriAdvisor;