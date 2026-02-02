
import React, { useState, useRef } from 'react';
import { editFarmImage } from '../services/gemini';
import { Palette, Wand2, Download, RefreshCcw, Loader2, Image as ImageIcon } from 'lucide-react';

const ImageEditor: React.FC = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSourceImage(reader.result as string);
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!sourceImage || !prompt) return;
    setLoading(true);
    try {
      const result = await editFarmImage(sourceImage, prompt);
      setEditedImage(result);
    } catch (error) {
      console.error(error);
      alert("Image editing failed. Ensure your prompt is descriptive.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-heading font-bold text-slate-900">Farming Design Lab</h2>
        <p className="text-slate-500">Visualize upgrades to your Pune garden using AI image editing.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">1. Upload Garden Photo</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-all overflow-hidden relative group"
              >
                {sourceImage ? (
                  <img src={sourceImage} alt="Source" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-bold">Upload Garden Photo</p>
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">2. Describe Upgrades</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Add a greenhouse cover', 'Make it look lush and green', 'Add vertical planters'..."
                className="w-full h-32 px-4 py-3 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              />
              <div className="flex gap-2 flex-wrap">
                {['Add Greenery', 'Make it Lush', 'Vertical Garden', 'Greenhouse'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => setPrompt(p)}
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={handleEdit}
              disabled={!sourceImage || !prompt || loading}
              className="w-full bg-emerald-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-800 disabled:bg-slate-300 transition-all shadow-xl shadow-emerald-900/10"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Wand2 className="w-5 h-5" /> Generate Visualization</>}
            </button>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">3. AI-Generated Preview</label>
            <div className="aspect-video bg-slate-900 rounded-3xl overflow-hidden flex items-center justify-center relative border border-slate-800 shadow-2xl">
              {editedImage ? (
                <>
                  <img src={editedImage} alt="Generated" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur p-3 rounded-xl hover:bg-white transition-colors">
                      <Download className="w-5 h-5 text-slate-900" />
                    </button>
                    <button 
                      onClick={() => setEditedImage(null)}
                      className="bg-white/90 backdrop-blur p-3 rounded-xl hover:bg-white transition-colors"
                    >
                      <RefreshCcw className="w-5 h-5 text-slate-900" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center p-12">
                  {loading ? (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                      </div>
                      <p className="text-slate-400 font-medium">Gemini 2.5 is imagining your future garden...</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Palette className="w-12 h-12 text-slate-800 mx-auto opacity-20" />
                      <p className="text-slate-500 font-medium">Your design will appear here</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex items-start gap-3">
              <Wand2 className="w-5 h-5 text-amber-500 mt-1 shrink-0" />
              <p className="text-xs text-amber-700">
                <strong>Tip:</strong> Be specific! Instead of "edit my garden", try "add a tomato plant in a large clay pot next to the railing".
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
