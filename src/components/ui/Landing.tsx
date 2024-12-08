"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import Link from "next/link";
import ConnectWalletPage from "../ConnectWallet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { DialogHeader } from "./dialog";

export default function Landing() {
  const [ref1, inView1] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref2, inView2] = useInView({ threshold: 0.3, triggerOnce: true });
  const [ref3, inView3] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="text-center">
            <motion.h1
              className="text-6xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Blockchain Liberation:
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {" "}
                Empowering Voices, Preserving Privacy
              </span>
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Express yourself freely while maintaining complete privacy through
              zero-knowledge proofs
            </motion.p>

            <Dialog>
              <DialogTrigger>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition duration-300">
                    Get Started
                  </button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className=" max-h-96">
                <DialogHeader>
                  <DialogTitle>Connect Wallet</DialogTitle>
                </DialogHeader>
                <ConnectWalletPage />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute right-0 w-96 h-96 rounded-full bg-pink-600/20 blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, 100, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        ref={ref1}
        className="py-20 bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-12"
          >
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-transparent backdrop-blur-sm border border-purple-800/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Zero-Knowledge Proofs
              </h3>
              <p className="text-gray-400">
                Verify your identity without revealing personal information
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-transparent backdrop-blur-sm border border-purple-800/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Decentralized Storage
              </h3>
              <p className="text-gray-400">
                Your content, distributed and encrypted across the blockchain
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-900/50 to-transparent backdrop-blur-sm border border-purple-800/20">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Anonymous Email
              </h3>
              <p className="text-gray-400">
                Secure communication through ZK-email integration
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        ref={ref2}
        className="py-20 bg-gradient-to-br from-black to-indigo-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-xl text-gray-400">
              Powered by cutting-edge blockchain technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Create Your Account
                    </h3>
                    <p className="text-gray-400">
                      Sign up using Coinbase Wallet Kit for seamless blockchain
                      integration
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Verify Your Identity
                    </h3>
                    <p className="text-gray-400">
                      Generate ZK proofs to verify your identity without
                      revealing personal data
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Start Blogging
                    </h3>
                    <p className="text-gray-400">
                      Write and publish content with complete anonymity
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView2 ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative h-96 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Secure & Private
                    </h3>
                    <p className="text-gray-300">
                      Your identity is protected by ZK proofs
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        ref={ref3}
        className="py-20 bg-gradient-to-br from-indigo-900 to-black relative overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView3 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Anonymous Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join the future of private, secure, and decentralized blogging
            </p>
            <Dialog>
              <DialogTrigger>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition duration-300">
                    Get Started
                  </button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className=" max-h-96">
                <DialogHeader>
                  <DialogTitle>Connect Wallet</DialogTitle>
                </DialogHeader>
                <ConnectWalletPage />
              </DialogContent>
            </Dialog>
          </div>
        </motion.div>

        {/* Background decoration */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute w-full h-full"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)",
            }}
          />
        </div>
      </motion.section>
    </div>
  );
}
