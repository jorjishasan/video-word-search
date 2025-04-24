import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './useLanguage';
import AuroraText from '../UI/AuroraText';
import SectionTag from '../UI/SectionTag';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 200
    }
  }
};

const Language = () => {
  const { languages, activeLanguage, setActiveLanguage } = useLanguage();
  
  return (
    <section id="languages" className="relative py-20 overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <SectionTag
            bgColor="bg-[#EC4899]/15"
            textColor="text-[#F9A8D4]"
          >
            Global Support
          </SectionTag>
          
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-6"
            variants={itemVariants}
          >

              <AuroraText
                colors={['#BE185D', '#DB2777', '#EC4899', '#F472B6', '#F9A8D4']}
                className="font-bold"
                speed={0.9}
              >
                Search In 20+ Languages
              </AuroraText>

          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/70"
            variants={itemVariants}
          >
            Our advanced transcription technology works across multiple languages, making your video search truly global.
          </motion.p>
        </motion.div>
        
        {/* Language showcase */}
        <div className="relative max-w-4xl mx-auto mb-12 overflow-hidden">
          {/* Language grid */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 py-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            {languages.map((lang, index) => (
              <motion.div 
                key={lang.code}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className={`py-3 px-5 rounded-full cursor-pointer transition-all duration-300 
                  ${activeLanguage === index 
                    ? 'bg-gradient-to-r from-primary/30 to-accent/30 border border-primary/20' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}
                onClick={() => setActiveLanguage(index)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">{lang.flag}</span>
                  <span className={activeLanguage === index ? 'text-white' : 'text-white/80'}>
                    {lang.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Bottom message */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-white/60 text-sm">
            Our advanced algorithms are optimized to ensure accurate transcription and search across all supported languages.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Language;