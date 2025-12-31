import React, { useState, useEffect } from 'react';

import collisionrepair from './assets/collision-repair.png';
import paintrefinish from './assets/paint-refinish.png';
import whychooseus from './assets/why-choose-us.png';

// --- CUSTOM ICONS (No external libraries needed) ---
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const CarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/><path d="M5 17h2"/><path d="M15 17h2"/></svg>
);
const PaintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z"/><path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7"/><path d="M14.5 17.5 4.5 15"/></svg>
);
const HammerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H14.14c-.83 0-1.64.33-2.25.94L9.5 10.2"/></svg>
);
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#EAB308" stroke="#EAB308" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);

function App() {
  const [formData, setFormData] = useState({ name: '', phone: '', vehicle: '' });
  const [status, setStatus] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.phone) {
      setStatus('Please enter a phone number so we can call you back.');
      return;
    }
    setStatus('Sending...');
    setTimeout(() => {
      setStatus('Request received! We will call you shortly.');
      setFormData({ name: '', phone: '', vehicle: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans selection:bg-blue-200">
      
      {/* --- NAVIGATION --- */}
      {/* --- MODERN CINEMATIC NAVBAR --- */}
      <nav 
        className={`fixed w-full top-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-slate-900/95 backdrop-blur-md border-slate-800 py-3 shadow-2xl' 
            : 'bg-transparent border-white/10 py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* BRANDING SECTION */}
            <div className="flex items-center gap-4">
              {/* Modern Monogram Logo */}
              <div className="relative group cursor-pointer">
                <div className={`absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200 ${scrolled ? 'bg-blue-600' : 'bg-white'}`}></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-blue-700 to-slate-900 rounded-lg flex items-center justify-center border border-white/10">
                  <span className="text-xl font-black text-white tracking-tighter">QBR</span>
                </div>
              </div>

              {/* Text Logo - Hidden on small mobile */}
              <div className="hidden sm:flex flex-col">
                <span className="text-xl font-bold text-white tracking-wide uppercase leading-none">
                  Quality Body
                </span>
                <span className="text-xs font-bold text-blue-500 tracking-[0.3em] uppercase mt-1">
                  Repair
                </span>
              </div>
            </div>

            {/* CENTER NAVIGATION - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              {['Services', 'About', 'Contact'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="relative group py-2"
                >
                  <span className={`text-sm font-bold uppercase tracking-wider transition-colors ${scrolled ? 'text-gray-400 group-hover:text-white' : 'text-gray-300 group-hover:text-white'}`}>
                    {item}
                  </span>
                  {/* Animated Underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* RIGHT ACTION SECTION */}
            <div className="flex items-center gap-6">
              
              {/* Phone Number - The Priority */}
              <a href="tel:7182661300" className="hidden lg:flex flex-col items-end group">
                <span className="text-xs text-gray-400 uppercase tracking-widest font-semibold group-hover:text-blue-400 transition-colors">
                  24/7 Assistance
                </span>
                <span className={`text-xl font-black tracking-tight transition-colors ${scrolled ? 'text-white' : 'text-white'}`}>
                  718-266-3100
                </span>
              </a>

              {/* CTA Button */}
              <a 
                href="#contact"
                className="bg-white text-slate-900 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-sm font-bold text-sm uppercase tracking-wide transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
              >
                Get Quote
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* --- SIMPLE & MODERN SPLIT HERO --- */}
      <div className="relative bg-slate-900 w-full overflow-hidden">
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 min-h-[600px] lg:h-screen lg:max-h-[800px]">
            
            {/* LEFT SIDE: CONTENT */}
            <div className="flex flex-col justify-center px-6 py-20 lg:py-0 lg:pr-12 relative z-10">
              
              {/* Subtle Blue Glow behind text */}
              <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 -translate-y-1/2 -z-10"></div>

              {/* Badge */}
              <div className="inline-flex self-start items-center gap-2 px-3 py-1 rounded-md bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                Insurance Claim Specialists
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 tracking-tight">
                Collision Repair. <br/>
                <span className="text-blue-500">Simplified.</span>
              </h1>

              {/* Description */}
              <p className="text-lg text-slate-300 mb-10 leading-relaxed max-w-lg">
                We take the stress out of accidents. From filing the claim to the final coat of paint, we handle the entire process directly with your insurance provider.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a 
                  href="tel:7182663100" 
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-900/50"
                >
                  <PhoneIcon /> 
                  <span>Call 718-266-3100</span>
                </a>
                <a 
                  href="#contact" 
                  className="flex items-center justify-center px-8 py-4 bg-transparent border border-slate-600 hover:border-white text-white font-bold rounded-lg transition-all"
                >
                  Get an Estimate
                </a>
              </div>

              {/* Simple Features List */}
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-semibold text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="text-blue-500"><CheckIcon /></div>
                  <span>We Accept All Insurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-blue-500"><CheckIcon /></div>
                  <span>Direct Billing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-blue-500"><CheckIcon /></div>
                  <span>Fast Turnaround</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: IMAGE (Full Height) */}
            <div className="relative h-64 lg:h-full w-full">
              {/* Overlay to ensure image blends with dark theme if needed */}
              <div className="absolute inset-0 bg-slate-900/20 z-10"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1590247657922-26cb437db874?q=80&w=2070&auto=format&fit=crop" 
                alt="Modern Auto Body Shop Bay" 
                className="w-full h-full object-cover"
              />
              
              {/* Diagonal Cut (Optional: adds a tiny bit of style without complexity) */}
              <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-slate-900 to-transparent hidden lg:block z-20"></div>
            </div>

          </div>
        </div>
      </div>

      {/* --- INFINITE INSURANCE MARQUEE --- */}
      <div className="bg-white border-b border-gray-100 relative overflow-hidden py-10">
        
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">We Accept All Major Providers</p>
          <h3 className="text-xl font-bold text-slate-900">Direct Billing & Supplemental Handling</h3>
        </div>

        {/* Gradient Masks (Fades edges for a premium look) */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        {/* The Scrolling Track */}
        <div className="flex w-[200%] animate-scroll hover:[animation-play-state:paused]">
          
          {/* LOGO SET 1 */}
          <div className="flex justify-around items-center w-1/2 px-8 gap-12 text-slate-400 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="cursor-pointer text-2xl font-black italic tracking-tighter hover:text-[#005596] transition-colors">GEICO</span>
            <span className="cursor-pointer text-2xl font-bold tracking-tight hover:text-[#E31837] transition-colors">State Farm</span>
            <span className="cursor-pointer text-2xl font-bold hover:text-[#0075C9] font-serif transition-colors">Allstate</span>
            <span className="cursor-pointer text-2xl font-black uppercase tracking-tighter hover:text-[#0077C8] transition-colors">Progressive</span>
            <span className="cursor-pointer text-2xl font-bold hover:text-[#FFD100] transition-colors">Liberty Mutual</span>
            <span className="cursor-pointer text-2xl font-black tracking-widest hover:text-[#003876] transition-colors">USAA</span>
            <span className="cursor-pointer text-2xl font-bold italic hover:text-[#0073CF] transition-colors">Nationwide</span>
            <span className="cursor-pointer text-2xl font-bold uppercase tracking-wide hover:text-[#E41F35] transition-colors">Farmers</span>
            <span className="cursor-pointer text-2xl font-serif font-black hover:text-[#E31B23] transition-colors">Travelers</span>
            <span className="cursor-pointer text-2xl font-black text-slate-800 rounded-full border-2 border-slate-300 px-2 hover:border-[#D7282F] hover:text-[#00549A] transition-colors">AAA</span>
          </div>

          {/* LOGO SET 2 (Duplicate for smooth loop) */}
          <div className="flex justify-around items-center w-1/2 px-8 gap-12 text-slate-400 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="cursor-pointer text-2xl font-black italic tracking-tighter hover:text-[#005596] transition-colors">GEICO</span>
            <span className="cursor-pointer text-2xl font-bold tracking-tight hover:text-[#E31837] transition-colors">State Farm</span>
            <span className="cursor-pointer text-2xl font-bold hover:text-[#0075C9] font-serif transition-colors">Allstate</span>
            <span className="cursor-pointer text-2xl font-black uppercase tracking-tighter hover:text-[#0077C8] transition-colors">Progressive</span>
            <span className="cursor-pointer text-2xl font-bold hover:text-[#FFD100] transition-colors">Liberty Mutual</span>
            <span className="cursor-pointer text-2xl font-black tracking-widest hover:text-[#003876] transition-colors">USAA</span>
            <span className="cursor-pointer text-2xl font-bold italic hover:text-[#0073CF] transition-colors">Nationwide</span>
            <span className="cursor-pointer text-2xl font-bold uppercase tracking-wide hover:text-[#E41F35] transition-colors">Farmers</span>
            <span className="cursor-pointer text-2xl font-serif font-black hover:text-[#E31B23] transition-colors">Travelers</span>
            <span className="cursor-pointer text-2xl font-black text-slate-800 rounded-full border-2 border-slate-300 px-2 hover:border-[#D7282F] hover:text-[#00549A] transition-colors">AAA</span>
          </div>
          
        </div>

        {/* Bottom Trust Note */}
        <div className="text-center mt-8">
           <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gray-100 text-xs font-semibold text-gray-500">
             <CheckIcon /> Don't see yours? We accept all valid US auto insurance.
           </span>
        </div>
      </div>

      {/* --- SERVICES SECTION (Fixed Images) --- */}
      <div id="services" className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tr from-gray-200/50 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">Complete Restoration Services</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              We combine old-school craftsmanship with modern technology. Every vehicle that leaves our shop meets strict factory safety specifications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <CarIcon />, 
                title: "Collision Repair", 
                // Working Image: Mechanic working on car
                image: collisionrepair,
                desc: "Major structural repairs using laser-measuring systems to ensure your frame is straightened to the millimeter." 
              },
              { 
                icon: <PaintIcon />, 
                title: "Paint & Refinish", 
                // Working Image: Blue car / Painting detail
                image: paintrefinish,
                desc: "Computerized color matching and a dust-free downdraft booth guarantee a showroom shine that lasts a lifetime." 
              },
              { 
                icon: <HammerIcon />, 
                title: "Dent & Scratch", 
                // Working Image: Polishing/Detailing
                image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
                desc: "From door dings to deep scratches, we use Paintless Dent Repair (PDR) and blending techniques to erase damage." 
              }
            ].map((service, index) => (
              <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-all duration-500 z-10"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute -bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-lg z-20 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                </div>
                <div className="pt-10 pb-8 px-8">
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6">
                    {service.desc}
                  </p>
                  <div className="flex items-center text-blue-600 font-bold text-sm uppercase tracking-wide group-hover:gap-2 transition-all cursor-pointer">
                    <span>Book Service</span>
                    <span className="text-xs transition-transform transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- FEATURE / ABOUT SPLIT --- */}
      <div id="about" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Side */}
            <div className="lg:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              
              <img 
                src={whychooseus} 
                alt="Mechanic working details" 
                className="relative rounded-2xl shadow-2xl z-10"
              />
              
              {/* Floating Badge - Changed from Warranty to Free Estimates */}
              <div className="absolute bottom-8 -right-8 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block border border-gray-100">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-blue-100 p-2 rounded-full text-blue-600"><CheckIcon /></div>
                  <span className="font-bold text-slate-900">Free Estimates</span>
                </div>
                <p className="text-xs text-gray-500 pl-10">No appointment necessary</p>
              </div>
            </div>

            {/* Text Side */}
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-6">Why Bensonhurst Chooses Us</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                At <span className="font-semibold text-blue-700">Quality Body Repair</span>, we treat every car like it belongs to our own family. 
                Dealing with an accident is stressful enough—your repair shop shouldn't be.
              </p>
              
              <div className="space-y-6">
                {[
                  "We handle all insurance paperwork for you.",
                  "Fast turnaround times without cutting corners.",
                  "We speak Russian.", // Updated Language
                  "Located conveniently at 221 Bay 37th Street."
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-slate-900 p-3 rounded-lg text-white">
                    <MapPinIcon />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">221 Bay 37th Street</p>
                    <p className="text-gray-500 text-sm">Brooklyn, NY 11214</p>
                  </div>
                  {/* Fixed Google Maps Link */}
                  <a 
                    href="https://www.google.com/maps/dir//221+Bay+37th+St,+Brooklyn,+NY+11214" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="ml-auto text-blue-600 font-bold text-sm hover:underline"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- CONTACT SECTION (Slick Dark Mode - No Form) --- */}
      <div id="contact" className="relative py-24 bg-slate-950 overflow-hidden">
        
        {/* Technical Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Ready to Restore?
          </h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Stop driving with damage. Call us for a preliminary quote or visit our shop in Bensonhurst.
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center mb-12">
             {/* Phone Card */}
             <a href="tel:7182663100" className="flex-1 group bg-slate-900 border border-slate-800 p-8 rounded-xl hover:border-blue-600 transition-all cursor-pointer shadow-lg hover:shadow-blue-900/20">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <PhoneIcon />
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Call Us Now</p>
              <p className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">718-266-3100</p>
            </a>

            {/* Hours Card */}
            <div className="flex-1 bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-600/20 text-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Opening Hours</p>
              <p className="text-xl font-bold text-white">Mon-Fri: 8am - 5pm</p>
              <p className="text-sm font-medium text-slate-500 mt-1">Weekends: Closed</p>
            </div>
          </div>

          {/* MAP EMBED (Full Width) */}
          <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative group">
            {/* The Map Overlay */}
            <div className="absolute inset-0 bg-blue-900/20 pointer-events-none z-10 mix-blend-overlay group-hover:bg-transparent transition-all duration-500"></div>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189.3512434285379!2d-73.99313305750185!3d40.59414482956964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c245a8c0db75db%3A0x52a30c0be40c63e2!2s221%20Bay%2037th%20St%2C%20Brooklyn%2C%20NY%2011214!5e0!3m2!1sen!2sus!4v1765559958166!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{border:0, filter: 'grayscale(100%) invert(92%) contrast(83%)'}} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Quality Body Repair Map"
              className="w-full h-full"
            ></iframe>
          </div>

        </div>
      </div>
      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-16 border-t border-white/5 relative">
        
        {/* Subtle Top Glow Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10">
            
            {/* BRAND COLUMN */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                
                {/* Modern Logo Block (Matches Navbar) */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-blue-600 rounded-lg blur opacity-20"></div>
                  {/* Main Box */}
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-700 to-slate-900 rounded-lg flex items-center justify-center border border-white/10 shadow-2xl">
                    <span className="text-lg font-black text-white tracking-tighter">QBR</span>
                  </div>
                </div>

                {/* Text Logo */}
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white leading-none">Quality Body</span>
                  <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mt-1">Repair</span>
                </div>
              </div>
              
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Expert collision repair and color matching in Bensonhurst. We bring your vehicle back to factory condition without the stress.
              </p>
            </div>

            {/* CONTACT COLUMN */}
            <div className="text-center md:text-right">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Contact Us</p>
              <a href="tel:7182663100" className="block text-2xl font-bold text-white hover:text-blue-500 transition-colors mb-2">
                718-266-3100
              </a>
              <address className="not-italic text-slate-400 text-sm">
                221 Bay 37th Street<br/>
                Brooklyn, NY 11214
              </address>
            </div>
          </div>

          {/* COPYRIGHT BAR */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-xs font-medium uppercase tracking-wide">
              &copy; 2025 Quality Body Repair. All rights reserved.
            </p>
            <div className="flex gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50"></span>
               <span className="text-xs text-slate-500 font-medium">Operational & Accepting Claims</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;