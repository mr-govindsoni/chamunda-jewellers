"use client";
import { MapPin, Phone, Clock, Award, ShieldCheck, Search, Users, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function StoreInfo() {
  const whyChooseUs = [
    { icon: <ShieldCheck className="w-6 h-6" />, title: "100% Hallmarked", desc: "Guaranteed Purity" },
    { icon: <Award className="w-6 h-6" />, title: "Certified Diamonds", desc: "IGI & GIA Graded" },
    { icon: <Search className="w-6 h-6" />, title: "Transparent Pricing", desc: "No Hidden Costs" },
    { icon: <Users className="w-6 h-6" />, title: "Customer First", desc: "Lifetime Exchange" },
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#eebf63]/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#eebf63]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#1f163b]/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
        >
          
          {/* Visit Our Store */}
          <div className="bg-[#1f163b] p-8 md:p-10 rounded-2xl shadow-[0_20px_40px_-10px_rgba(31,22,59,0.3)] border border-[#eebf63]/20 flex flex-col justify-center relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#eebf63]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <h3 className="text-3xl font-serif text-[#eebf63] font-medium tracking-wide mb-8 relative z-10">Visit Our Store</h3>
            <ul className="space-y-6 font-sans relative z-10">
              <li className="flex items-start gap-5 group/item">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-[#eebf63]/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#eebf63] group-hover/item:border-[#eebf63] transition-all duration-300 shadow-[0_0_15px_rgba(238,191,99,0)] group-hover/item:shadow-[0_0_15px_rgba(238,191,99,0.4)]">
                  <MapPin className="w-5 h-5 text-[#eebf63] group-hover/item:text-[#1f163b] transition-colors" />
                </div>
                <div>
                  <h4 className="font-semibold text-white tracking-wide">Chamunda Jewellers</h4>
                  <p className="text-sm text-gray-300 mt-1.5 leading-relaxed font-light">Charwas, Churu,<br />Rajasthan - 331403, India</p>
                </div>
              </li>
              <li className="flex items-center gap-5 group/item">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-[#eebf63]/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#eebf63] transition-all duration-300">
                  <Phone className="w-5 h-5 text-[#eebf63] group-hover/item:text-[#1f163b] transition-colors" />
                </div>
                <span className="text-sm text-gray-300 font-medium tracking-widest">+91 63672 46095</span>
              </li>
              <li className="flex items-start gap-5 group/item">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-[#eebf63]/30 flex items-center justify-center flex-shrink-0 group-hover/item:bg-[#eebf63] transition-all duration-300">
                  <Clock className="w-5 h-5 text-[#eebf63] group-hover/item:text-[#1f163b] transition-colors" />
                </div>
                <div className="text-sm text-gray-300 space-y-1.5 font-light tracking-wide">
                  <p>Mon - Sat: <span className="text-white font-medium">9:30 AM - 8:30 PM</span></p>
                  <p>Sunday: <span className="text-white font-medium">10:00 AM - 8:00 PM</span></p>
                </div>
              </li>
            </ul>
            <a 
              href="https://maps.app.goo.gl/z2MMsspgUnUhFn6c6" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-10 w-full bg-[#eebf63] text-[#1f163b] py-3.5 rounded-lg text-sm font-bold tracking-widest uppercase hover:bg-[#110722] hover:text-[#eebf63] border border-[#eebf63] transition-all duration-300 flex justify-center items-center gap-3 relative z-10 shadow-lg"
            >
              GET DIRECTIONS <Navigation className="w-4 h-4" />
            </a>
          </div>

          {/* Map */}
          <div className="bg-gray-100 rounded-2xl overflow-hidden h-[400px] lg:h-auto shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-gray-200 relative group">
            <div className="absolute inset-0 bg-[#1f163b]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 mix-blend-multiply"></div>
            <iframe 
              src="https://maps.google.com/maps?q=27.8022645,74.4050571&z=16&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'contrast(1.1) saturate(1.2)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
            ></iframe>
          </div>

          {/* Why Choose Us */}
          <div className="bg-[#fafafa] p-8 md:p-10 rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col justify-center">
            <h3 className="text-3xl font-serif text-[#1f163b] font-medium tracking-wide mb-8">Why Choose Us?</h3>
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6"
            >
              {whyChooseUs.map((feature, idx) => (
                <motion.div key={idx} variants={itemVariants} className="flex items-center gap-5 group cursor-pointer p-4 -m-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#eebf63]/20">
                  <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center border border-gray-100 shadow-sm group-hover:bg-[#1f163b] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500 relative">
                    <div className="absolute inset-0 rounded-xl bg-[#eebf63] opacity-0 group-hover:opacity-20 animate-pulse-gold pointer-events-none"></div>
                    <div className="text-[#d4a54c] group-hover:text-[#eebf63] transition-colors">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-[#1f163b] group-hover:text-[#d4a54c] transition-colors">{feature.title}</h4>
                    <p className="text-xs font-medium tracking-wide text-gray-500 mt-1 uppercase">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
