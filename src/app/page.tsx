// src/app/page.tsx
"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="p-4">
      {/* Fade-In Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1>Welcome to HomeCook</h1>
        <p className="mt-2">
          Order a chef to cook delicious meals at your home.
        </p>
      </motion.div>

      {/* Bounce Button */}
      <div className="text-center mt-4">
        <button className="animate-bounce bg-blue-600 text-white px-4 py-2 rounded">
          Get Started
        </button>
      </div>
    </div>
  );
}
