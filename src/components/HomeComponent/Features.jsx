// components/Features.jsx
import { motion } from "framer-motion";
import { Smile, Activity, Star, Calendar } from "lucide-react";

const features = [
  {
    icon: <Smile size={32} className="text-[#FF00CC]" />,
    title: "Mood Tracker",
    desc: "Track your emotions daily and visualize your mood patterns over time."
  },
  {
    icon: <Activity size={32} className="text-[#FF00CC]" />,
    title: "Personalized Activities",
    desc: "Get activity suggestions tailored to your current mood and preferences."
  },
  {
    icon: <Calendar size={32} className="text-[#FF00CC]" />,
    title: "Daily Journal",
    desc: "Maintain a peaceful journaling habit to reflect on your thoughts."
  },
  {
    icon: <Star size={32} className="text-[#FF00CC]" />,
    title: "Mindfulness Tools",
    desc: "Access calming features like affirmations, breathing guides, and focus aids."
  }
];

const Features = () => {
  return (
    <section
      id="features"
      className="bg-[#FFFFFF] text-[#000000] py-16 px-6 md:px-12 dark:bg-gray-950 text-gray-800 dark:text-gray-200"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-3xl font-bold  bg-gradient-to-r from-[#481D39] to-[#FF00CC] bg-clip-text text-transparent">
          Core Features
        </h2>
        <p className="mt-4 text-[#333333]">
          Tools designed to help you relax, reflect, and realign.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto dark:bg-gray-950 text-gray-800 dark:text-gray-200">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className="bg-[#FFF] border border-[#481D39] p-6 rounded-2xl shadow hover:shadow-lg transition-all"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-[#000000] mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-[#444444]">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
