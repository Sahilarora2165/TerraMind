
import React, { useState } from 'react';
import { MarketplaceItem } from '../types';
import { Store, ShoppingBag, Plus, Star, MapPin, Building2 } from 'lucide-react';

const Marketplace: React.FC = () => {
  const [view, setView] = useState<'Farmer' | 'Restaurant'>('Farmer');
  const [listings, setListings] = useState<MarketplaceItem[]>([
    { id: '1', farmer: 'Rajesh P.', produce: 'Organic Spinach', quantity: 5, price: 40, timestamp: Date.now() },
    { id: '2', farmer: 'Meera K.', produce: 'Cherry Tomatoes', quantity: 2, price: 120, timestamp: Date.now() - 10000 },
  ]);

  const [newItem, setNewItem] = useState({ produce: '', quantity: 0, price: 0 });

  const addListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.produce || newItem.quantity <= 0) return;
    const item: MarketplaceItem = {
      id: Math.random().toString(),
      farmer: 'You (Farm-to-Table)',
      produce: newItem.produce,
      quantity: newItem.quantity,
      price: newItem.price,
      timestamp: Date.now(),
    };
    setListings([item, ...listings]);
    setNewItem({ produce: '', quantity: 0, price: 0 });
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-900">Urban Marketplace</h2>
          <p className="text-slate-500">Sell your organic harvest directly to local Pune restaurants.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-2xl w-fit self-start md:self-center">
          <button 
            onClick={() => setView('Farmer')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'Farmer' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500'}`}
          >
            <Store className="w-4 h-4" /> Farmer Mode
          </button>
          <button 
            onClick={() => setView('Restaurant')}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'Restaurant' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500'}`}
          >
            <Building2 className="w-4 h-4" /> Restaurant Mode
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {view === 'Farmer' ? (
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-800">List Your Produce</h3>
              <form onSubmit={addListing} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Produce Name</label>
                  <input 
                    type="text" 
                    value={newItem.produce}
                    onChange={(e) => setNewItem({ ...newItem, produce: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="e.g., Organic Okra"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Quantity (kg)</label>
                    <input 
                      type="number" 
                      value={newItem.quantity || ''}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Price (₹/kg)</label>
                    <input 
                      type="number" 
                      value={newItem.price || ''}
                      onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
                  <Plus className="w-5 h-5" /> Post Listing
                </button>
              </form>
            </div>
            
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <h4 className="font-bold flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                Farmer Trust Score
              </h4>
              <p className="text-slate-400 text-sm">Your rating among 12 local restaurants in Pune.</p>
              <div className="text-4xl font-bold">4.8<span className="text-lg font-normal opacity-50">/5</span></div>
              <div className="bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[96%]" />
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-1">
            <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 space-y-4">
              <h3 className="text-xl font-bold text-blue-900">Buying for Your Kitchen?</h3>
              <p className="text-blue-700/70 text-sm">Browse ultra-fresh, zero-mile produce from Pune's terrace farmers. High quality, organic, and harvested same-day.</p>
              <div className="flex items-center gap-2 text-blue-800 text-sm font-bold">
                <MapPin className="w-4 h-4" /> Kothrud, Pune (Nearby)
              </div>
            </div>
          </div>
        )}

        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-slate-800">Current Market Listings</h3>
            <span className="text-sm text-slate-400">{listings.length} items available</span>
          </div>
          {listings.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p>No listings in your area. Be the first to sell!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {listings.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-emerald-200 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-100 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 font-bold text-xl uppercase">
                      {item.produce.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">{item.produce}</h4>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1 font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">₹{item.price}/kg</span>
                        <span>•</span>
                        <span>{item.quantity}kg available</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /> 4.8</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-2 font-medium">Sold by {item.farmer}</p>
                    </div>
                  </div>
                  <button className={`px-6 py-2 rounded-xl font-bold transition-all ${view === 'Restaurant' ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>
                    {view === 'Restaurant' ? 'Buy Now' : 'Edit Listing'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
