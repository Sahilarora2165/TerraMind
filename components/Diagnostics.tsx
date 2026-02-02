
import React, { useState, useRef } from 'react';
import { diagnosePlant } from '../services/gemini';
import { Camera, Upload, Loader2, CheckCircle, ShieldAlert, ThermometerSun } from 'lucide-react';
import { Diagnosis } from '../types';

const Diagnostics: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState<'Plant Issue' | 'Soil Health'>('Plant Issue');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const diagnosis = await diagnosePlant(image, mode);
      setResult(diagnosis);
    } catch (error) {
      console.error(error);
      alert("Analysis failed. Try a clearer image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-heading font-bold text-slate-900">Smart Diagnostics</h2>
        <p className="text-slate-500">Identify issues instantly with our computer vision AI.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
              <button 
                onClick={() => setMode('Plant Issue')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${mode === 'Plant Issue' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
              >
                Plant Issue
              </button>
              <button 
                onClick={() => setMode('Soil Health')}
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${mode === 'Soil Health' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
              >
                Soil Health
              </button>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-square bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden group"
            >
              {image ? (
                <img src={image} alt="Target" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="w-8 h-8 text-slate-400" />
                  </div>
                  <p className="text-slate-600 font-semibold">Click to upload photo</p>
                  <p className="text-slate-400 text-sm mt-1">Accepts PNG, JPG</p>
                </div>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*" 
              />
            </div>

            <button 
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="w-full bg-emerald-600 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Analyze with AI'}
            </button>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-800">Results & Remedies</h4>
            
            {result ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl">
                  <div className="flex items-center gap-2 text-emerald-700 font-bold mb-2">
                    <CheckCircle className="w-5 h-5" />
                    Diagnosis Identified
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-900 mb-2">{result.issue}</h3>
                  <div className="text-emerald-700/70 text-sm mb-4">Confidence: {result.confidence}</div>
                  
                  <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-amber-500 mt-1" />
                      <div>
                        <p className="font-bold text-slate-800">Organic Remedy</p>
                        <p className="text-slate-600 text-sm">{result.remedy}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <ThermometerSun className="w-5 h-5 text-slate-400 mt-1" />
                    <p className="text-sm text-slate-500">
                      <strong>Pune Tip:</strong> During summer heat waves (March-May), use a green shade net to prevent leaf burn for affected plants.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 border border-slate-100 rounded-3xl p-8 text-center bg-slate-50/50">
                <ShieldAlert className="w-12 h-12 mb-4 opacity-10" />
                <p>Upload a photo of your plant or soil to get an instant AI-powered diagnosis.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diagnostics;
