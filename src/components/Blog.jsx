import React from 'react';

const Blog = () => {
  return (
    <div className="w-full bg-white text-black py-16 px-4 sm:px-6 lg:px-8">
      {/* 🔹 Horizontal separator */}
      <hr className="border-gray-300 mb-12" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 items-start">
        {/* 👤 Ryan – Support Card */}
        <div className="bg-gray-100 p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-black">Kcarexport For You</h2>
          <p className="text-gray-700 text-sm mb-4">
            Got questions about your next car or the shipping process? Ryan is your personal connection. We care, and we're here for you.
          </p>

          <div className="flex items-center space-x-4 mb-4">
            <img
              src="/Ceo.jpg"
              alt="Ryan Manager"
              className="w-24 h-24 object-cover rounded-full border-2 border-blue-500 shadow-md"
            />
            <div>
              <p className="font-semibold text-black">Ryan – Manager</p>
              <a
                href="https://wa.me/821089964152"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 text-sm text-white bg-gradient-to-r from-blue-500 to-red-500 px-4 py-1 rounded-full shadow hover:scale-105 transition-transform duration-300"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>

          <p className="text-gray-500 text-xs">
            Available 24/7. Your peace of mind is our priority. Let’s talk anytime.
          </p>
        </div>

        {/* ✍️ Blog Content – Right Side */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4 text-black">Latest Blog Posts</h1>
          <p className="text-gray-600 leading-relaxed">
            Stay updated with Korean auto trends, car buying tips, and real customer stories. Kcarexport is more than a platform — it’s your partner in driving success from Korea to Africa.
          </p>
        </div>
      </div>

      {/* 🔻 Footer line with brand */}
      <div className="mt-16 border-t border-gray-200 pt-6 text-left text-sm text-gray-500">
        Kcarexport
      </div>
    </div>
  );
};

export default Blog;
