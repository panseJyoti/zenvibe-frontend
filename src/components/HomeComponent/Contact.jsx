// components/Contact.jsx
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  return (
    <section id="contact" className="bg-[#ffffff] py-20 px-6 md:px-12 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-8 text-[#481D39]"
        >
          Let's <span className="text-[#FF00CC]">Connect</span>
        </motion.h2>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleSubmit}
          className="bg-[#fdfcfd] border border-[#FF00CC] p-8 rounded-3xl shadow-xl space-y-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#481D39] mb-1">Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[#FF00CC] text-[#000] bg-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#481D39] mb-1">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[#FF00CC] text-[#000] bg-white"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-[#481D39] mb-1">Message</label>
            <textarea
              rows="4"
              required
              placeholder="Your message..."
              className="w-full px-4 py-3 rounded-xl border border-[#ddd] focus:outline-none focus:ring-2 focus:ring-[#FF00CC] text-[#000] bg-white"
            ></textarea>
          </div>

          {/* Submit */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-[#FF00CC] text-white text-lg py-3 rounded-xl font-semibold hover:bg-[#e600b8] transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
