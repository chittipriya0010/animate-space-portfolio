"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PORTFOLIO_PROFILE } from "@/constants/portfolioData";
import { usePortfolio } from "./PortfolioContext";

const smoothEase = [0.16, 1, 0.3, 1];

type SubmitState = "idle" | "success" | "activation_needed" | "fallback";

export default function ContactSection() {
  const { theme } = usePortfolio();
  const isLight = theme === "light";

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Mobile App (Flutter / React Native)",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGmailUrl = (data = formData) => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${data.projectType} - ${data.name || "Client"}`);
    const body = encodeURIComponent(
      `Hello Chittipriya,\n\nName: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.projectType}\n\nMessage:\n${data.message}\n\n---\nSent from Portfolio Website`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(PORTFOLIO_PROFILE.email)}&su=${subject}&body=${body}`;
  };

  const getMailtoUrl = (data = formData) => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${data.projectType} - ${data.name || "Client"}`);
    const body = encodeURIComponent(
      `Hello Chittipriya,\n\nName: ${data.name}\nEmail: ${data.email}\nProject Type: ${data.projectType}\n\nMessage:\n${data.message}\n\n---\nSent from Portfolio Website`
    );
    return `mailto:${PORTFOLIO_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PORTFOLIO_PROFILE.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          projectType: formData.projectType,
          message: formData.message,
          _subject: `[Portfolio Inquiry] ${formData.name} - ${formData.projectType}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const data = await response.json();

      if (data.success === "true" || data.success === true) {
        setSubmitState("success");
        setIsSubmitted(true);
      } else if (
        data.message &&
        data.message.toLowerCase().includes("activation")
      ) {
        setSubmitState("activation_needed");
        setIsSubmitted(true);
      } else {
        setSubmitState("fallback");
        setIsSubmitted(true);
      }
    } catch {
      setSubmitState("fallback");
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Human Editorial Intro */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: smoothEase }}
            className="lg:col-span-5 space-y-8"
          >
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300/80">
                Contact / 04
              </span>
              <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-neutral-100 mt-2 leading-tight">
                Let&apos;s build something <span className="font-serif-editorial italic font-normal text-amber-200/90">remarkable</span>.
              </h2>
            </div>

            <p className="text-base text-neutral-400 leading-relaxed font-normal">
              Whether you are planning a high-performance mobile application, scaling an enterprise platform, or seeking an engineer for distributed systems — my inbox is always open.
            </p>

            {/* Direct Email Card */}
            <div className="p-5 rounded-2xl card-behance space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                Direct Inquiries
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={`mailto:${PORTFOLIO_PROFILE.email}`}
                  className="font-mono text-sm text-neutral-200 hover:text-amber-200 transition-colors font-medium break-all"
                >
                  {PORTFOLIO_PROFILE.email}
                </a>
                <div className="flex items-center gap-2">
                  <a
                    href={getGmailUrl({ name: "", email: "", projectType: "General Inquiry", message: "Hi Chittipriya," })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-xs font-mono text-amber-300 border border-amber-500/30 transition-colors whitespace-nowrap"
                  >
                    Open Gmail ↗
                  </a>
                  <button
                    onClick={copyEmail}
                    className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 transition-colors whitespace-nowrap"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs font-mono text-neutral-400">
              <div className="flex justify-between border-b border-white/[0.06] pb-3">
                <span>Location</span>
                <span className="text-neutral-200">India (UTC+5:30) • Remote Worldwide</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.06] pb-3">
                <span>GitHub</span>
                <a
                  href={PORTFOLIO_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-200 hover:text-white"
                >
                  @{PORTFOLIO_PROFILE.githubUsername} ↗
                </a>
              </div>
              <div className="flex justify-between">
                <span>Response Time</span>
                <span className="text-neutral-200">Within 24 Hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Tactile Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
            className="lg:col-span-7"
          >
            <div className="card-behance rounded-2xl p-7 sm:p-10">
              {isSubmitted ? (
                <div className="py-8 text-center space-y-5 animate-fadeIn">
                  {submitState === "success" && (
                    <>
                      <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-xl shadow-lg shadow-emerald-500/10">
                        ✓
                      </div>
                      <h3 className="text-2xl font-medium text-neutral-100">
                        Message Sent Directly to Chittipriya!
                      </h3>
                      <p className="text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
                        Thank you, <span className="text-neutral-200 font-semibold">{formData.name}</span>.
                        Your message has been dispatched to{" "}
                        <span className="font-mono text-neutral-200 font-semibold">{PORTFOLIO_PROFILE.email}</span>.
                        I will review your inquiry and follow up at{" "}
                        <span className="font-mono text-neutral-300">{formData.email}</span> within 24 hours.
                      </p>
                    </>
                  )}

                  {submitState === "activation_needed" && (
                    <>
                      <div className="w-14 h-14 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center justify-center mx-auto text-xl shadow-lg shadow-amber-500/10 animate-pulse">
                        ✉
                      </div>
                      <h3 className="text-xl sm:text-2xl font-medium text-neutral-100">
                        Form Activation Link Sent to Your Inbox
                      </h3>
                      <div className={`p-4 rounded-xl text-left text-xs leading-relaxed max-w-md mx-auto space-y-2 border ${
                        isLight
                          ? "bg-amber-50/80 border-amber-200 text-amber-900"
                          : "bg-amber-950/30 border-amber-500/20 text-amber-200/90"
                      }`}>
                        <p className="font-bold flex items-center gap-1.5">
                          <span>🔔</span>
                          <span>One-time setup for {PORTFOLIO_PROFILE.email}:</span>
                        </p>
                        <p>
                          FormSubmit has dispatched a verification email to <strong>{PORTFOLIO_PROFILE.email}</strong>.
                          Please check your Gmail inbox (or Spam/Updates folder) and click <strong>&quot;Activate Form&quot;</strong> once.
                        </p>
                        <p className="text-[11px] opacity-80">
                          After that one-time click, every visitor submission will land directly in your Gmail inbox automatically!
                        </p>
                      </div>

                      <p className="text-xs text-neutral-400 max-w-md mx-auto">
                        In the meantime, you can send this inquiry right now directly via Gmail:
                      </p>

                      <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                        <a
                          href={getGmailUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-400 transition-colors whitespace-nowrap"
                        >
                          <span>Open in Gmail</span>
                          <span>↗</span>
                        </a>
                        <a
                          href={getMailtoUrl()}
                          className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs border border-white/10 transition-colors whitespace-nowrap"
                        >
                          Open Mail App
                        </a>
                      </div>
                    </>
                  )}

                  {submitState === "fallback" && (
                    <>
                      <div className="w-14 h-14 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto text-xl">
                        ✉
                      </div>
                      <h3 className="text-xl font-medium text-neutral-100">
                        Send Directly to {PORTFOLIO_PROFILE.email}
                      </h3>
                      <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                        Click below to open this drafted message in Gmail or your preferred mail application:
                      </p>
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <a
                          href={getGmailUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-xs flex items-center gap-1.5 shadow-md hover:bg-amber-400 transition-colors whitespace-nowrap"
                        >
                          <span>Open in Gmail Web</span>
                          <span>↗</span>
                        </a>
                        <a
                          href={getMailtoUrl()}
                          className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs border border-white/10 transition-colors whitespace-nowrap"
                        >
                          Open Mail App
                        </a>
                      </div>
                    </>
                  )}

                  <div className="pt-4 border-t border-white/[0.06]">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmitState("idle");
                        setFormData({
                          name: "",
                          email: "",
                          projectType: "Mobile App (Flutter / React Native)",
                          message: "",
                        });
                      }}
                      className="text-xs font-mono text-neutral-400 hover:text-neutral-200 underline transition-colors whitespace-nowrap"
                    >
                      ← Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400/80 focus:outline-none text-xs text-neutral-100 placeholder:text-neutral-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400/80 focus:outline-none text-xs text-neutral-100 placeholder:text-neutral-600 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Project Scope / Topic
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400/80 focus:outline-none text-xs text-neutral-200 transition-colors"
                    >
                      <option value="Mobile App (Flutter / React Native)">Mobile Application (Flutter / React Native)</option>
                      <option value="Fintech Retailer & AEPS Integration">FinTech Retailer Platform (AEPS, DMT, BBPS)</option>
                      <option value="Enterprise ERP System">Enterprise ERP / Logistics Platform</option>
                      <option value="Full-Stack Web Platform">Full-Stack Web Engineering (Next.js)</option>
                      <option value="Applied AI & Vision Integration">Applied AI &amp; Vision Solution</option>
                      <option value="Full-Time Opportunity">Full-Time Engineering Opportunity</option>
                      <option value="General Consultation">General Consultation / Networking</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project scope, timeline, or key objectives..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:border-amber-400/80 focus:outline-none text-xs text-neutral-100 placeholder:text-neutral-600 transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:flex-1 btn-tactile py-3 rounded-xl text-xs font-medium text-neutral-100 hover:text-white flex items-center justify-center gap-2 transition-all shadow-lg whitespace-nowrap"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                          <span className="font-mono text-xs whitespace-nowrap">Sending Message...</span>
                        </div>
                      ) : (
                        <>
                          <span className="whitespace-nowrap">Send Message</span>
                          <span className="text-neutral-400 font-mono">↗</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getGmailUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-3 rounded-xl border border-white/10 hover:border-amber-400/40 text-xs font-mono text-neutral-300 hover:text-amber-200 flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                      title="Direct compose in Gmail web"
                    >
                      <span>Gmail Direct</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
