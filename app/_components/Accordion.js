const faqs = [
  {
    question: "FAQ 1: What is the Smart and Secure Harvesting System?",
    answer: "It's an IoT-based solution designed to automate and secure agricultural operations. It provides real-time monitoring of environmental conditions, smart irrigation control, and remote access via a web interface."
  },
  {
    question: "FAQ 2: Who is this system for?",
    answer: "Our system is built for farmers, greenhouse owners, and agricultural businesses looking to improve crop yield, save resources, and ensure farm security with minimal manual intervention."
  },
  {
    question: "FAQ 3: What features does the system offer?",
    answer: "It includes environmental sensors (temperature, humidity), automated irrigation based on soil data, image capture with cloud storage, security alerts, and a dashboard to control and monitor everything remotely."
  },
  {
    question: "FAQ 4: How do I access and control the system?",
    answer: "You can access the system via a secure web application from any device. The dashboard allows you to view sensor data, control irrigation, and monitor security feeds in real time."
  },
  {
    question: "FAQ 5: Is my data secure?",
    answer: "Yes. All data is stored securely in the cloud using encryption, and image uploads are handled via AWS S3 with access restrictions. We also use HTTPS for all client-server communication."
  },
  {
    question: "FAQ 6: What technologies are used in the system?",
    answer: "The system uses Node.js, MQTT, MongoDB, AWS services (S3, CloudFront, Elastic Beanstalk), and ESP8266 microcontrollers with sensors like AHT21B for environmental monitoring."
  },
  {
    question: "FAQ 7: Does the system work in remote or low-connectivity areas?",
    answer: "Yes. The system is optimized for low-bandwidth usage using lightweight MQTT communication. As long as there’s basic internet access, the system can function effectively."
  }
];


  
  function Accordion() {
    return (
      <div className="join join-vertical w-[60%]">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-arrow join-item border-base-300 border"
          >
            <input type="radio" name="my-accordion-4" defaultChecked={index === 0} />
            <div className="collapse-title text-xl font-medium">
              {faq.question}
            </div>
            <div className="collapse-content">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  export default Accordion;
  