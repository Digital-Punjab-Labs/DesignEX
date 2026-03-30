import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import { Routes, Route } from "react-router-dom";
import Blog from "./pages/blog";
import {
  Search,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Filter,
  ChevronRight,
  X,
  Home,
  Heart,
  Share2,
  View,
  ArrowLeft,
  Building2
} from 'lucide-react';
import { DEVELOPMENTS, Development, UnitType } from './types';
import { cn } from './lib/utils';
import VirtualTourViewer from './components/VirtualTourViewer';
import BlogPage from './components/BlogPage';



export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedDevelopment, setSelectedDevelopment] = useState<Development | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<UnitType | null>(null);
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'blog'>('home');

  const cities = ['All', 'Ludhiana', 'Chandigarh', 'Mohali'];

  const filteredDevelopments = useMemo(() => {
    return DEVELOPMENTS.filter(d => {
      const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCity = selectedCity === 'All' || d.city === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [searchQuery, selectedCity]);

  const formatPrice = (price: number) => {
    // Format in Indian numbering system (Lakhs/Crores)
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} L`;
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleBackToDevelopments = () => {
    setSelectedDevelopment(null);
    setSelectedUnit(null);
    setCurrentPage('home');
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
  };

  if (currentPage === 'blog') {
    return (
      <div className="min-h-screen bg-zinc-50 font-sans">
        {/* Navbar */}
        <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
                <div className="w-28 h-12 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <img 
                    src="src\assets\design_ex.png" 
                    alt="Company Logo" 
                    className="w-28 h-28 object-contain"
                  />
                </div>
              </div>
              <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
                <button onClick={() => setCurrentPage('home')} className="hover:text-zinc-900 transition-colors">Developments</button>
                <a href="#" className="hover:text-zinc-900 transition-colors">Developers</a>
                <a href="#" className="hover:text-zinc-900 transition-colors">Cities</a>
                <button onClick={() => setCurrentPage('blog')} className="text-zinc-900">Blog</button>
              </div>
              <button className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all">
                Contact Expert
              </button>
            </div>
          </div>
        </nav>
        
        <BlogPage onBack={() => setCurrentPage('home')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans">
      {/* Virtual Tour Overlay */}
      <AnimatePresence>
        {isTourOpen && selectedUnit && (
          <VirtualTourViewer
            imageUrl={selectedUnit.virtualTourImage}
            title={`${selectedDevelopment?.name} - ${selectedUnit.bhk}`}
            onClose={() => setIsTourOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackToDevelopments}>
              <div className="w-28 h-12 bg-zinc-900 rounded-lg flex items-center justify-center">
                <img
                  src="src\assets\design_ex.png"
                  alt="Company Logo"
                  className="w-28 h-28 object-contain"
                />
              </div>

            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600">
              <button onClick={() => setCurrentPage('home')} className={currentPage === 'home' ? 'text-zinc-900' : 'hover:text-zinc-900 transition-colors'}>Developments</button>
              <a href="#" className="hover:text-zinc-900 transition-colors">Developers</a>
              <a href="#" className="hover:text-zinc-900 transition-colors">Cities</a>
              <button onClick={() => setCurrentPage('blog')} className={currentPage === 'blog' ? 'text-zinc-900' : 'hover:text-zinc-900 transition-colors'}>Blog</button>
            </div>
            <button className="bg-zinc-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all">
              Contact Expert
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section (Only on main page) */}
      {!selectedDevelopment && (
        <section className="relative h-[50vh] fle x items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000"
              alt="Hero"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight"
            >
              India's Most Iconic Landmarks
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-white/90 mb-8 max-w-2xl mx-auto font-light"
            >
              Discover super-luxury high-rise developments from India's premier developers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto"
            >
              <div className="flex-1 flex items-center px-4 gap-3 border-b md:border-b-0 md:border-r border-zinc-100 py-2">
                <Search className="w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search project, developer or location..."
                  className="w-full outline-none text-zinc-800 placeholder:text-zinc-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center px-4 gap-3 py-2">
                <Filter className="w-5 h-5 text-zinc-400" />
                <select
                  className="outline-none bg-transparent text-zinc-800 cursor-pointer"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <button className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-zinc-800 transition-all">
                Explore
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {!selectedDevelopment ? (
            /* Step 1: Development Grid */
            <motion.div
              key="developments"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-2">Premier Developments</h2>
                  <p className="text-zinc-500">Iconic high-rise projects across India</p>
                </div>
                <div className="flex gap-2">
                  {cities.map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all",
                        selectedCity === city
                          ? "bg-zinc-900 text-white"
                          : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-400"
                      )}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDevelopments.map((dev) => (
                  <motion.div
                    layout
                    key={dev.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedDevelopment(dev)}
                  >
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
                      <img
                        src={dev.mainImage}
                        alt={dev.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-zinc-900">
                          {dev.status}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium flex items-center gap-2">
                          View BHK Options <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-serif font-bold group-hover:text-zinc-600 transition-colors">{dev.name}</h3>
                        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{dev.developer}</span>
                      </div>
                      <div className="flex items-center gap-1 text-zinc-500 text-sm">
                        <MapPin className="w-4 h-4" />
                        {dev.location}, {dev.city}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            /* Step 2: BHK Options for Selected Development */
            <motion.div
              key="units"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={handleBackToDevelopments}
                className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Developments
              </button>

              <div className="flex flex-col md:flex-row gap-12 mb-16">
                <div className="md:w-1/3">
                  <h2 className="text-4xl font-serif font-bold mb-4">{selectedDevelopment.name}</h2>
                  <p className="text-zinc-500 font-medium mb-6">{selectedDevelopment.developer} • {selectedDevelopment.city}</p>
                  <p className="text-zinc-600 leading-relaxed font-light mb-8">
                    {selectedDevelopment.description}
                  </p>

                  <div className="mb-8">
                    <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Development Amenities</h4>
                    <div className="grid grid-cols-1 gap-3">
                      {selectedDevelopment.amenities.map(amenity => (
                        <div key={amenity} className="flex items-center gap-3 text-zinc-700">
                          <div className="w-1.5 h-1.5 bg-zinc-900 rounded-full" />
                          <span className="text-sm font-light">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-900 font-bold">
                    <Building2 className="w-5 h-5" />
                    Available Configurations
                  </div>
                </div>

                <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedDevelopment.units.map((unit) => (
                    <motion.div
                      key={unit.id}
                      whileHover={{ y: -5 }}
                      className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={() => setSelectedUnit(unit)}
                    >
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={unit.image}
                          alt={unit.bhk}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-xl font-bold">{unit.bhk}</h4>
                          <span className="text-lg font-bold text-zinc-900">{formatPrice(unit.price)}</span>
                        </div>
                        <div className="flex items-center gap-4 text-zinc-500 text-sm mb-6">
                          <div className="flex items-center gap-1">
                            <BedDouble className="w-4 h-4" /> {unit.beds}
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" /> {unit.baths}
                          </div>
                          <div className="flex items-center gap-1">
                            <Maximize className="w-4 h-4" /> {unit.sqft} sqft
                          </div>
                        </div>
                        <button className="w-full py-3 rounded-xl border border-zinc-900 text-zinc-900 font-bold hover:bg-zinc-900 hover:text-white transition-all flex items-center justify-center gap-2">
                          View Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Unit Detail Modal (Step 3) */}
      <AnimatePresence>
        {selectedUnit && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackToUnits}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={handleBackToUnits}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-zinc-900 shadow-lg hover:bg-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="md:w-1/2 h-64 md:h-auto relative group">
                <img
                  src={selectedUnit.image}
                  alt={selectedUnit.bhk}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      //setIsTourOpen(true);
                      window.open("https://design-ex-web-25sb.vercel.app/", "_blank", "noopener,noreferrer");
                    }}
                    className="bg-white/90 backdrop-blur-md text-zinc-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-white transition-all shadow-xl scale-90 group-hover:scale-100 duration-300"
                  >
                    <View className="w-5 h-5" />
                    Start 3D Tour
                  </button>
                </div>
              </div>

              <div className="md:w-1/2 p-8 overflow-y-auto">
                <div className="mb-8">
                  <h4 className="font-bold mb-3">Floor Plan</h4>
{/* 
                  <div className="w-full h-[500px] border rounded-2xl overflow-hidden">
                    <iframe
                      src="/public/brochure.pdf"
                      className="w-full h-full"
                      title="Floor Plan PDF"
                    />
                  </div> */}
                </div>

 <div className="mb-6">
                  <span className="text-zinc-500 text-sm font-medium uppercase tracking-widest mb-2 block">{selectedDevelopment?.name}</span>
                  <h2 className="text-3xl font-serif font-bold mb-2">{selectedUnit.bhk} Residence</h2>
                  <div className="flex items-center gap-2 text-zinc-500 mb-4">
                    <MapPin className="w-4 h-4" />
                    {selectedDevelopment?.location}, {selectedDevelopment?.city}
                  </div>
                  <div className="text-2xl font-bold text-zinc-900">{formatPrice(selectedUnit.price)}</div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-zinc-50 rounded-2xl">
                  <div className="text-center">
                    <div className="text-zinc-400 mb-1 flex justify-center"><BedDouble className="w-5 h-5" /></div>
                    <div className="font-bold">{selectedUnit.beds}</div>
                    <div className="text-xs text-zinc-500 uppercase">Beds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-400 mb-1 flex justify-center"><Bath className="w-5 h-5" /></div>
                    <div className="font-bold">{selectedUnit.baths}</div>
                    <div className="text-xs text-zinc-500 uppercase">Baths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-zinc-400 mb-1 flex justify-center"><Maximize className="w-5 h-5" /></div>
                    <div className="font-bold">{selectedUnit.sqft}</div>
                    <div className="text-xs text-zinc-500 uppercase">Sqft</div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold mb-3">Unit Description</h4>
                  <p className="text-zinc-600 leading-relaxed font-light">
                    {selectedUnit.description}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold mb-3">Unit Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedUnit.amenities.map(amenity => (
                      <span key={amenity} className="px-3 py-1 bg-zinc-100 text-zinc-700 text-sm rounded-lg">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div> 

                <div className="flex gap-4 mt-auto">
                  <button className="flex-1 bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-zinc-800 transition-all">
                    Inquire Now
                  </button>
                  <button className="w-14 h-14 border border-zinc-200 rounded-2xl flex items-center justify-center hover:bg-zinc-50 transition-all">
                    <Share2 className="w-6 h-6 text-zinc-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-28 h-28  rounded-lg flex items-center justify-center">
                  <img
                    src="src\assets\design_ex.png"
                    alt="Company Logo"
                    className="w-28 h-28 object-contain"
                  />
                </div>
                {/* <span className="text-2xl font-serif font-bold tracking-tight">DesignEX</span> */}
              </div>
              <p className="text-zinc-400 max-w-md font-light leading-relaxed">
                Showcasing India's most prestigious high-rise developments. We bring you closer to the skyline of modern India.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Top Cities</h4>
              <ul className="space-y-4 text-zinc-400 font-light">
                <li><a href="#" className="hover:text-white transition-colors">Ludhiana</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Chandigarh</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mohali</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pune</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Indore</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Newsletter</h4>
              <p className="text-zinc-400 text-sm mb-4 font-light">Get exclusive early access to newly launched high-rise projects.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-zinc-800 border-none rounded-xl px-4 py-2 text-sm flex-1 outline-none focus:ring-1 ring-white/20"
                />
                <button className="bg-white text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold">Join</button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-light">
            <p>© 2026 Digital Punjab Labs All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
