// components/About.jsx
import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="bg-[#ffffff] py-20 px-6 md:px-12 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-3xl font-bold mb-4 text-[#481D39]"
        >
          Welcome to <span className="text-[#FF00CC]">ZenVibe</span>
        </motion.h2>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-[#444] max-w-2xl mx-auto text-lg mb-10"
        >
          A calm space to track your mood, express your feelings, and align with your inner peace.
        </motion.p>

        {/* Content Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white border border-[#FF00CC] p-6 rounded-3xl shadow-md flex flex-col items-center"
        >
          {/* Image */}
          <img
            src="/images/main1.jpg"
            alt="ZenVibe"
            className="w-56 h-56 rounded-xl object-cover mb-6"
          />

          {/* Description */}
          <p className="text-[#333] text-base leading-relaxed mb-4">
            ZenVibe is your companion on the journey of self-care. We blend mood tracking, journaling,
            and mindfulness tools to help you find balance and clarity in your day-to-day life.
          </p>
          <p className="text-[#555] text-sm">
            Empower your mind with personalized experiences, peaceful affirmations, and a modern interface that feels as good as it looks.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
