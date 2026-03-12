import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of High-Rise Living in India',
    excerpt: 'Exploring how modern architecture is reshaping urban skylines across major Indian cities.',
    content: 'The landscape of Indian cities is rapidly evolving with the rise of luxury high-rise developments...',
    author: 'Arjun Sharma',
    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    category: 'Architecture'
  },
  {
    id: '2',
    title: 'Investment Opportunities in Luxury Real Estate',
    excerpt: 'Why premium developments are becoming the preferred choice for discerning investors.',
    content: 'The luxury real estate market in India has shown remarkable resilience and growth...',
    author: 'Priya Mehta',
    date: '2024-01-12',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    category: 'Investment'
  },
  {
    id: '3',
    title: 'Sustainable Design in Modern Developments',
    excerpt: 'How green building practices are becoming standard in luxury high-rise projects.',
    content: 'Sustainability is no longer just a buzzword in the real estate industry...',
    author: 'Rajesh Kumar',
    date: '2024-01-10',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
    category: 'Sustainability'
  },
  {
    id: '4',
    title: 'Smart Home Technology in Premium Residences',
    excerpt: 'The integration of IoT and smart systems in luxury apartments and penthouses.',
    content: 'Technology is revolutionizing the way we live, and luxury residences are at the forefront...',
    author: 'Neha Gupta',
    date: '2024-01-08',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800',
    category: 'Technology'
  }
];

interface BlogPageProps {
  onBack: () => void;
}

export default function BlogPage({ onBack }: BlogPageProps) {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
        >
          ← Back to Blog
        </button>
        
        <article>
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded-full mb-4">
              {selectedPost.category}
            </span>
            <h1 className="text-4xl font-serif font-bold mb-4">{selectedPost.title}</h1>
            <div className="flex items-center gap-6 text-zinc-500 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {selectedPost.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(selectedPost.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {selectedPost.readTime}
              </div>
            </div>
          </div>
          
          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="w-full h-64 object-cover rounded-2xl mb-8"
            referrerPolicy="no-referrer"
          />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-zinc-600 leading-relaxed">
              {selectedPost.content}
            </p>
          </div>
        </article>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8"
      >
        ← Back to Home
      </button>

      <div className="mb-12">
        <h1 className="text-4xl font-serif font-bold mb-4">Real Estate Insights</h1>
        <p className="text-zinc-600 text-lg">
          Stay updated with the latest trends, insights, and developments in luxury real estate.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <motion.article
            key={post.id}
            whileHover={{ y: -5 }}
            className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedPost(post)}
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-zinc-100 text-zinc-700 text-xs rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-zinc-500">{post.readTime}</span>
              </div>
              
              <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
              <p className="text-zinc-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
                <div className="flex items-center gap-1 text-zinc-900 text-sm font-medium">
                  Read More <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}