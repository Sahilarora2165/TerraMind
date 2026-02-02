import React, { useState } from 'react';
import { ForumPost, ForumReply } from '../types';
import { MessageSquare, User, Send, ChevronDown, ChevronUp, Loader2, Award, Search, PlusCircle } from 'lucide-react';
import { generateForumReply } from '../services/gemini';

const CommunityForum: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: '1',
      author: 'Rajesh from Kothrud',
      question: 'Has anyone tried growing Drumsticks (Shevga) in a 20-inch pot? Will it survive the Pune summer?',
      timestamp: Date.now() - 86400000 * 2,
      tags: ['Pot Gardening', 'Summer', 'Kothrud'],
      replies: [
        { id: 'r1', author: 'Meera K.', text: 'Yes! Just ensure you prune it regularly to keep it manageable.', timestamp: Date.now() - 86400000, isExpert: false },
        { id: 'r2', author: 'Pune Agri-Expert', text: 'Shevga is hardy. Use a mix of coco peat and garden soil to retain moisture during May heat waves.', timestamp: Date.now() - 43200000, isExpert: true }
      ]
    },
    {
      id: '2',
      author: 'Senior Gardener Baner',
      question: 'Best organic solution for Mealy Bugs on Hibiscus? Neem oil isn\'t working well this monsoon.',
      timestamp: Date.now() - 86400000,
      tags: ['Pest Control', 'Monsoon', 'Organic'],
      replies: [
        { id: 'r3', author: 'Pune Agri-Expert', text: 'Try a mixture of garlic, chilli and soap water. It\'s very effective for persistent pests in Pune\'s humid monsoon.', timestamp: Date.now() - 3600000, isExpert: true }
      ]
    },
    {
      id: '3',
      author: 'IT Pro Hinjewadi',
      question: 'Recommended nurseries near Hinjewadi Phase 3 for organic vegetable saplings?',
      timestamp: Date.now() - 3600000,
      tags: ['Hinjewadi', 'Nurseries'],
      replies: []
    }
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [userName, setUserName] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePostQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !userName.trim() || isPosting) return;

    setIsPosting(true);
    const newPost: ForumPost = {
      id: Math.random().toString(36).substr(2, 9),
      author: `${userName} (Pune)`,
      question: newQuestion,
      timestamp: Date.now(),
      tags: ['General', 'Community'],
      replies: []
    };

    setPosts(prev => [newPost, ...prev]);
    setNewQuestion('');
    setUserName('');

    // Auto-generate mock expert reply
    try {
      const expertText = await generateForumReply(newPost.question);
      const expertReply: ForumReply = {
        id: 'expert-' + Date.now(),
        author: 'Pune Agri-Expert',
        text: expertText,
        timestamp: Date.now() + 2000,
        isExpert: true
      };
      
      setPosts(prev => prev.map(p => 
        p.id === newPost.id ? { ...p, replies: [...p.replies, expertReply] } : p
      ));
    } catch (error) {
      console.error("Failed to auto-reply", error);
    } finally {
      setIsPosting(false);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-slate-900">Community Forum</h2>
          <p className="text-slate-500">Share knowledge and get expert advice from Pune's urban farming community.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 rounded-2xl border border-slate-200 w-full md:w-64 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Post Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm sticky top-8">
            <div className="flex items-center gap-2 mb-6">
              <PlusCircle className="text-emerald-600 w-6 h-6" />
              <h3 className="text-xl font-bold text-slate-800">Ask the Community</h3>
            </div>
            <form onSubmit={handlePostQuestion} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name/Location</label>
                <input 
                  type="text" 
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="e.g. Amit from Baner"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your Question</label>
                <textarea 
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full h-32 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  placeholder="What are you struggling with?"
                />
              </div>
              <button 
                type="submit" 
                disabled={isPosting || !newQuestion.trim() || !userName.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                {isPosting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Post Question</>}
              </button>
            </form>
          </div>
        </div>

        {/* Posts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2 px-2">
            <h3 className="font-bold text-slate-800">Recent Discussions</h3>
            <span className="text-sm text-slate-400">{filteredPosts.length} questions</span>
          </div>
          
          {filteredPosts.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-10" />
              <p>No questions found matching your search.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:border-emerald-200">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 w-10 h-10 rounded-full flex items-center justify-center text-slate-500">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{post.author}</h4>
                        <p className="text-xs text-slate-400">{new Date(post.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {expandedPost === post.id ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                  </div>
                  
                  <p className="text-slate-700 leading-relaxed mb-4">{post.question}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-slate-400 mt-4">
                    <MessageSquare className="w-4 h-4" />
                    {post.replies.length} {post.replies.length === 1 ? 'Reply' : 'Replies'}
                  </div>
                </div>

                {expandedPost === post.id && (
                  <div className="bg-slate-50 border-t border-slate-100 p-6 space-y-4">
                    {post.replies.length === 0 ? (
                      <p className="text-center text-slate-400 text-sm italic">Waiting for community responses...</p>
                    ) : (
                      post.replies.map((reply) => (
                        <div key={reply.id} className={`p-4 rounded-2xl shadow-sm ${reply.isExpert ? 'bg-emerald-50 border border-emerald-100' : 'bg-white border border-slate-100'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${reply.isExpert ? 'text-emerald-700' : 'text-slate-700'}`}>
                                {reply.author}
                              </span>
                              {reply.isExpert && <Award className="w-4 h-4 text-emerald-600" />}
                            </div>
                            <span className="text-[10px] text-slate-400">{new Date(reply.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                          <p className={`text-sm ${reply.isExpert ? 'text-emerald-800' : 'text-slate-600'}`}>{reply.text}</p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;