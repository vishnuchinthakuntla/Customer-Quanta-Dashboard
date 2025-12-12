import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <motion.div
        className="relative w-16 h-16 border-4 border-transparent border-t-slate-blue border-b-dark-cyan rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-lg font-semibold text-slate-blue"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loader;