"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Home() {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");

  const handleEarlyAccessClick = () => {
    setShowEmailInput(true);
  };

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the email submission
    alert(`Thank you! We'll send updates to ${email}`);
    setShowEmailInput(false);
    setEmail("");
  };

  const handleCancel = () => {
    setShowEmailInput(false);
    setEmail("");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* Hero header section */}
        <div className="text-center sm:text-left mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">What's on your mind today?</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">We make your computer come to life</p>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
              href="/chat"
            >
              Chat with Ara
            </Link>
          </motion.div>

          {/* Fixed size container to prevent layout shifts */}
          <div className="relative h-12 min-w-[158px] md:min-w-[350px] flex justify-center sm:justify-start">
            <AnimatePresence mode="sync">
              {!showEmailInput ? (
                <motion.button
                  key="early-access-button"
                  onClick={handleEarlyAccessClick}
                  className="absolute rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-[158px] whitespace-nowrap"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: -40, scale: 0.2, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    opacity: { duration: 0.2 }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Early Access
                </motion.button>
              ) : null}

              {showEmailInput && (
                <motion.div
                  key="email-form-container"
                  className="absolute flex items-center gap-2"
                  initial={{ x: 40, scale: 0.8 }}
                  animate={{ x: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                >
                  <motion.button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] h-10 sm:h-12 w-10 sm:w-12 flex items-center justify-center bg-white dark:bg-black hover:bg-gray-100 dark:hover:bg-gray-900"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <X size={16} />
                  </motion.button>

                  <motion.form
                    onSubmit={handleSubmitEmail}
                    className="flex items-center"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      className="rounded-l-full border border-solid border-black/[.08] dark:border-white/[.145] px-4 h-10 sm:h-12 focus:outline-none focus:ring-2 focus:ring-foreground min-w-[200px] md:min-w-[250px]"
                    />
                    <motion.button
                      type="submit"
                      className="rounded-r-full border border-solid border-transparent bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get
                    </motion.button>
                  </motion.form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
