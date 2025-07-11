import React from "react";
import { motion } from "framer-motion";
import { TbBusinessplan } from "react-icons/tb";
import { MdPlusOne } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";

const Apropos = () => {
  const stats = [
    { value: "15+", label: "Years Experience", icon: <TbBusinessplan className="text-3xl" /> },
    { value: "10,000+", label: "Cars Inspected", icon: <GiCheckMark className="text-3xl" /> },
    { value: "100%", label: "Customer Satisfaction", icon: <MdPlusOne className="text-3xl" /> }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trusted Korean Used Car Experts
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Delivering quality inspected vehicles from Korea to the world since 2008
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-xl shadow-lg text-center"
            >
              <div className="text-blue-600 flex justify-center mb-4">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* About Content - 1 */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Our Journey in the Automotive World
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2008, KCarExport has grown from a small local dealership to an internationally recognized exporter of premium Korean used vehicles. Our 15+ years in the industry have given us unparalleled expertise in selecting only the finest vehicles for our global clientele.
            </p>
            <p className="text-lg text-gray-600">
              What began as a passion for automobiles has transformed into a trusted business relationship with customers across continents. We bridge the gap between Korean automotive excellence and international markets.
            </p>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="/exported cars.jpg" 
              alt="Our exported cars lineup"
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </div>

        {/* About Content - 2 */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Rigorous Inspection Process
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              With over 10,000 vehicles inspected, we've perfected our 150-point checklist that evaluates every aspect of a car's condition. From engine performance to interior wear, we leave no stone unturned.
            </p>
            <p className="text-lg text-gray-600">
              Our team of certified mechanics and automotive experts ensures that only vehicles meeting our strict quality standards make it to our inventory. This meticulous approach has earned us a reputation for reliability in the international used car market.
            </p>
          </motion.div>
          <motion.div 
            className="lg:w-1/2 rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <img 
              src="/exported.jpg" 
              alt="Vehicle inspection process"
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Mission Statement */}
        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl max-w-4xl mx-auto">
            To revolutionize the used car export industry by combining Korean automotive excellence with transparent international trade practices, delivering unmatched value to our customers worldwide.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Apropos;