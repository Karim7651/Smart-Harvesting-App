// CardSubscribeList.js
"use client"; // if using Next 13+ app directory

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CardSubscribe from "./CardSubscribe";

const plans = [
  {
    title: "Enterprise",
    price: "$99/mo",
    badge: "Best Value",
    features: [
      "Real-time Sensor Data Monitoring",
      "Predictive Crop Health Alerts (AI-driven)",
      "Secure Remote Access & Control",
      "Historical Data Analytics & Reporting",
      "Image-based Crop Disease Detection",
      "Automated Irrigation Control",
      "Multi-user Role-Based Access Management",
      "Customizable Notification & Alert System",
    ],
    disabledFeatures: [],
  },
  {
    title: "Premium",
    price: "$29/mo",
    badge: "Most Popular",
    features: [
      "Real-time Sensor Data Monitoring",
      "Predictive Crop Health Alerts (AI-driven)",
      "Secure Remote Access & Control",
      "Historical Data Analytics & Reporting",
      "Image-based Crop Disease Detection",
      "Automated Irrigation Control",
    ],
    disabledFeatures: [
      "Multi-user Role-Based Access Management",
      "Customizable Notification & Alert System",
    ],
  },
  {
    title: "Basic",
    price: "$9/mo",
    badge: "Basic Features",
    features: [
      "Real-time Sensor Data Monitoring",
      "Predictive Crop Health Alerts (AI-driven)",
      "Secure Remote Access & Control",
      "Historical Data Analytics & Reporting",
    ],
    disabledFeatures: [
      "Image-based Crop Disease Detection",
      "Automated Irrigation Control",
      "Multi-user Role-Based Access Management",
      "Customizable Notification & Alert System",
    ],
  },
];


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8, rotateY: 30 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: { duration: 0.7},
  },
};
export default function CardSubscribeList() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <div className="relative w-[97.5%] mx-auto mb-28">
      <div className="flex justify-between items-center bg-base-200 text-base-content p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold">Available Plans</h2>
      </div>
      <div
        ref={ref}
        className="border-b-[0.03rem] border-r-[0.03rem] border-l-[0.03rem] border-neutral-600 border-opacity-30 rounded-b-lg p-16"
      >
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={cardVariants}>
              <CardSubscribe {...plan} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
