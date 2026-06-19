'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-3xl" />

          {/* Content */}
          <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-white/20 rounded-3xl p-12 md:p-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-8">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-white">
                Join the Future of Rentals
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>

            <p className="text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto">
              Join thousands of landlords, tenants, and agents already using
              Houston Housing to modernize their rental experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-blue-200/60 text-sm">
                Connect your wallet to get started
              </p>
            </div>

            <p className="text-blue-200/60 text-sm mt-8">
              No credit card required • Free forever • Cancel anytime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
