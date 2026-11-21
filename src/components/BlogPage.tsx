import React from 'react';
import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;


  date: string;
  readTime: string;
  image: string;
  category: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: '3D Renders',
    excerpt: 'Photorealistic visuals',


    date: '2024-01-15',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    category: 'Architecture'
  },
  {
    id: '2',
    title: 'Cinematic Walkthroughs',
    excerpt: 'Emotion-driven storytelling',
   
    date: '2024-01-12',
    readTime: '7 min read',
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/8/446010388/UC/DH/TA/23577762/3d-architectural-services-1000x1000.jpg',
    category: 'Investment'
  },
  {
    id: '3',
    title: 'VR Property Tours',
    excerpt: 'Remote property experience',
    date: '2024-01-10',
    readTime: '6 min read',
    image: 'https://360pano.in/wp-content/uploads/2024/05/vr-real-estate.jpg',
    category: 'Sustainability'
  },
  {
    id: '4',
    title: 'Interactive Experiences',
    excerpt: 'Future-ready property showcasing',
   
    date: '2024-01-08',
    readTime: '4 min read',
    image: 'https://cdn.sanity.io/images/pjiwic7p/production/92da7fb051712a61fa7cc37caa0fabf538aba77e-721x510.png?auto=format',
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
        <h1 className="text-4xl font-serif font-bold mb-4">Immersive Technology That Accelerates Real Estate Sales</h1>
        {/* <p className="text-zinc-600 text-lg">
          Stay updated with the latest trends, insights, and developments in luxury real estate.
        </p> */}
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
              
               
              </div>
              
              <h2 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h2>
              <p className="text-zinc-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
              
              <div className="flex items-center justify-between">
             
                {/* <div className="flex items-center gap-1 text-zinc-900 text-sm font-medium">
                  Read More <ArrowRight className="w-4 h-4" />
                </div> */}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}