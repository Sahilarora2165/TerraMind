
import React, { useState } from 'react';
import { Search, CookingPot, Clock, Flame, Users } from 'lucide-react';

const Recipes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const recipes = [
    { 
      name: 'Pune Organic Palak Paneer', 
      crop: 'Spinach', 
      time: '25 min', 
      difficulty: 'Medium', 
      servings: 2,
      tags: ['Organic', 'Terrace Harvest', 'Vegetarian'],
      image: 'https://picsum.photos/seed/palak/400/300'
    },
    { 
      name: 'Bhandarkar Road Cherry Tomato Salad', 
      crop: 'Tomatoes', 
      time: '10 min', 
      difficulty: 'Easy', 
      servings: 1,
      tags: ['Raw', 'Healthy', 'Fresh'],
      image: 'https://picsum.photos/seed/tomato/400/300'
    },
    { 
      name: 'Viman Nagar Crispy Bhindi', 
      crop: 'Okra', 
      time: '15 min', 
      difficulty: 'Easy', 
      servings: 4,
      tags: ['Crispy', 'Maharashtrian'],
      image: 'https://picsum.photos/seed/bhindi/400/300'
    }
  ];

  const filtered = recipes.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.crop.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-900">Farm-to-Table Recipes</h2>
          <p className="text-slate-500">Wholesome Maharashtrian dishes using your fresh harvest.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by crop or dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-2xl border border-slate-200 w-full md:w-64 focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((recipe, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-800">
                {recipe.crop}
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="font-bold text-xl text-slate-800 leading-tight">{recipe.name}</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 border-t pt-4">
                <div className="flex flex-col items-center justify-center">
                  <Clock className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-[10px] text-slate-500">{recipe.time}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Flame className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-[10px] text-slate-500">{recipe.difficulty}</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <Users className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-[10px] text-slate-500">{recipe.servings} Serves</span>
                </div>
              </div>
              <button className="w-full bg-emerald-50 text-emerald-700 py-3 rounded-xl font-bold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2">
                <CookingPot className="w-4 h-4" /> View Full Recipe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
