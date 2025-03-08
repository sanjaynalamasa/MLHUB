import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Image, FileText, Search, Shield, ExternalLink, Star, Users, ChevronDown, ChevronUp } from 'lucide-react';

export function Home() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // ... (keep existing features array)

  const faqs = [
    {
      question: "What is ML Hub?",
      answer: "ML Hub is a comprehensive platform for AI and machine learning development, offering tools for chat, image analysis, text processing, and more."
    },
    {
      question: "How can I get started?",
      answer: "Simply sign up for an account and explore our various AI tools. You can start with our AI Chat feature or try out our Image Understanding capabilities."
    },
    {
      question: "Do you offer support?",
      answer: "Yes, we offer 24/7 support through WhatsApp and our dedicated support team."
    },
    {
      question: "What technologies do you use?",
      answer: "We use cutting-edge AI and ML technologies including natural language processing, computer vision, and deep learning models."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a free trial period to test our services and see how they can benefit your projects."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // ... (keep existing sections until FAQ)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* ... (keep existing sections until FAQ) ... */}

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-gray-50 dark:bg-gray-700 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-left">
                    {faq.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                <div 
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openFaqIndex === index ? 'py-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ... (rest of the sections) ... */}
    </div>
  );
}