import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsTelephoneForwardFill, BsEnvelopeFill } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import { motion } from "framer-motion";

const Contact = () => {
  const contactItems = [
    {
      icon: <IoLogoWhatsapp className="text-green-500 text-2xl" />,
      text: "WhatsApp:",
      link: "https://wa.me/821075611177",
      value: "+82 10-8996-4152",
      color: "text-green-600"
    },
    {
      icon: <BsTelephoneForwardFill className="text-blue-500 text-xl" />,
      text: "Phone:",
      link: "tel:+821089964152",
      value: "+82 10-8996-4152",
      color: "text-blue-600"
    },
    {
      icon: <BsEnvelopeFill className="text-red-500 text-xl" />,
      text: "Email:",
      link: "mailto:kcarexport4@gmail.com",
      value: "kcarexport4@gmail.com",
      color: "text-red-600"
    },
    {
      icon: <FiMapPin className="text-purple-500 text-2xl" />,
      text: "Address:",
      value: "No. 7 on the first floor of 208 B-dong, Neungheo-daero, Yeonsu-gu, Incheon (Spring 1996)",
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-[80vh] bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We'd love to hear from you! Reach out to us through any of these channels.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          {/* CEO Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-64 h-64 lg:w-72 lg:h-72 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500"></div>
            <img
              src="/logo.png"
              alt="logo"
              className="w-full h-full rounded-full object-cover border-4 border-white relative z-10 shadow-xl"
              style={{ objectPosition: "center" }}
            />
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg space-y-6"
          >
            {contactItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="flex items-start space-x-4"
              >
                <div className={`p-2 rounded-lg bg-gray-50`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">{item.text}</h3>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`${item.color} hover:underline transition duration-300`}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-600">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="pt-4"
            >
              <a
                href="https://wa.me/821075611177"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg text-center transition duration-300 shadow-md hover:shadow-lg"
              >
                Message Us on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;