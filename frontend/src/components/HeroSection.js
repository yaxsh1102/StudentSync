import React, { useState } from "react";
import { motion } from "framer-motion"; // For animations
import { Link } from "react-router-dom";
import { BsCaretDownFill } from "react-icons/bs";

const HeroSection = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What services does StudentSync offer?",
      answer:
        "StudentSync provides a variety of services including event management, community engagement, dormitory and flatmate matching, and more. Our goal is to support students in every aspect of their academic life.",
    },
    {
      question: "Is there any cost associated with using StudentSync?",
      answer:
        "No, StudentSync’s accommodation services are free. You can search for dormitories, flats, and flatmates without any cost.",
    },
    {
      question: "What kind of events are offered on StudentSync?",
      answer:
        "StudentSync offers a variety of events including educational seminars, networking events, hackathons, workshops, and social gatherings. These events aim to help students connect, learn, and grow in their academic and social lives.",
    },
    {
      question: "What are the benefits of joining a student community?",
      answer:
        "Student communities offer a space to connect with like-minded peers, share knowledge, collaborate on projects, and participate in group events. They provide networking opportunities and support for both academic and personal growth.",
    },
    {
      question: "Can I create my own student community?",
      answer:
        "Yes, StudentSync encourages students to create communities around niche topics like entrepreneurship, coding, sustainability, or even hobbies. Specialized communities allow students to connect deeply with others who share their unique interests.",
    },
    {
      question: "How does StudentSync help with finding dormitories?",
      answer:
        "StudentSync provides a platform where students can explore various dormitory options based on location, price, and amenities. You can filter your search according to your needs and connect directly with dorm providers.",
    },
    {
      question:
        "What kind of accommodation options are available on StudentSync?",
      answer:
        "Apart from dormitories, StudentSync also offers listings for apartments, shared flats, and co-living spaces. Whether you're looking for something close to campus or budget-friendly options, StudentSync provides a variety of choices.",
    },
    {
      question: "How do I contact a dormitory or flat provider?",
      answer:
        "Each listing on StudentSync includes contact information for the provider. You can send a message or call directly to inquire about availability, pricing, and other details.",
    },
    {
      question:
        "How does StudentSync ensure the safety of students when finding flatmates or dormitories?",
      answer:
        "StudentSync verifies accommodation listings and encourages users to meet potential flatmates in public places or via virtual meetings before committing to living arrangements. We also provide a review system where students can rate their experiences.",
    },
  ];

  const services = [
    {
      title: "Event Management and Participation",
      description:
        "StudentSync offers a robust event management platform tailored for students. Whether you're looking to host educational seminars, fun social gatherings, or professional networking events, we provide tools to manage every aspect of the event lifecycle. Students can explore upcoming events, register, and receive reminders. Additionally, you can track attendance, gather feedback, and engage with participants through our platform, ensuring a seamless experience from start to finish.",
      image: "events.jpg",
    },
    {
      title: "Community Building for Students",
      description:
        "We believe that community is at the heart of student life. StudentSync offers a space where students can form and join communities based on shared interests, academic goals, or hobbies. Whether you're interested in entrepreneurship, coding, sports, or the arts, our platform allows you to connect with peers, collaborate on projects, and participate in community-driven events. Community members can create groups, host discussions, and share resources, fostering a sense of belonging and growth.",
      image: "communities.jpg",
    },
    {
      title: "Finding Dormitories Made Easy",
      description:
        "Looking for a place to stay can be stressful. StudentSync makes the process easier by providing a comprehensive platform to search for dormitories. You can filter options by location, price, amenities, and more. Whether you need a quiet, study-friendly environment or a more social space, we have a variety of listings to suit your needs. Our platform also includes reviews from fellow students, helping you make an informed decision before moving in.",
      image: "dormitory.jpg",
    },
    {
      title: "Flatmate Matching for a Harmonious Living Experience",
      description:
        "Finding the right flatmate is crucial for a comfortable living experience. Our flatmate matching service helps students find compatible roommates based on lifestyle preferences, study habits, and personal interests. You can browse potential flatmates, chat with them, and set up meetings to ensure you're making the right choice. With StudentSync, you can feel confident about your living situation and focus more on your academic and social life.",
      image: "flatmate.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('hero-img.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-black opacity-70"></div>

        {/* Content */}
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Headline */}
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500 mb-4">
            Unleashing Your Potential: Connect, Engage, and Succeed with
            StudentSync
          </h1>

          {/* Subtext */}
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join a thriving ecosystem where students find tailored events, build
            supportive communities, and access top-notch accommodations.
            StudentSync is here to elevate your academic and social journey.
          </p>

          {/* Buttons */}
          <div className="flex justify-center space-x-6">
            {/* Primary Button */}
            <Link
              to="/signup"
              className="bg-yellow-500 text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-600 transition duration-300"
            >
              Get Started
            </Link>

            {/* Secondary Button */}
            <Link
              to="#about"
              className="border border-yellow-500 text-yellow-500 px-8 py-3 rounded-full font-bold hover:bg-yellow-500 hover:text-black transition duration-300"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Events */}
            <div className="relative bg-gray-800 p-8 rounded-lg hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
              <img
                src="events1.jpg"
                alt="Events"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-yellow-400">Events</h3>
              <p className="text-gray-400">
                Join exciting student events, seminars, and workshops to enhance
                your skills.
              </p>
              <Link
                to="#"
                className="text-yellow-500 hover:text-yellow-400 mt-4 inline-block"
              >
                Learn More &rarr;
              </Link>
            </div>

            {/* Communities */}
            <div className="relative bg-gray-800 p-8 rounded-lg hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
              <img
                src="communities1.jpg"
                alt="Communities"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-yellow-400">
                Communities
              </h3>
              <p className="text-gray-400">
                Connect with like-minded students and join active communities.
              </p>
              <Link
                to="#"
                className="text-yellow-500 hover:text-yellow-400 mt-4 inline-block"
              >
                Join Now &rarr;
              </Link>
            </div>

            {/* Dormitory */}
            <div className="relative bg-gray-800 p-8 rounded-lg hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
              <img
                src="dormitory1.jpg"
                alt="Dormitory"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-yellow-400">
                Dormitory
              </h3>
              <p className="text-gray-400">
                Find comfortable and affordable student dormitories near your
                campus.
              </p>
              <Link
                to="#"
                className="text-yellow-500 hover:text-yellow-400 mt-4 inline-block"
              >
                Explore Dorms &rarr;
              </Link>
            </div>

            {/* Flatmate */}
            <div className="relative bg-gray-800 p-8 rounded-lg hover:shadow-xl hover:-translate-y-2 transform transition duration-500">
              <img
                src="flatmate1.jpg"
                alt="Flatmate"
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold text-yellow-400">
                Flatmate
              </h3>
              <p className="text-gray-400">
                Looking for a flatmate? Find the perfect person to share your
                space.
              </p>
              <Link
                to="#"
                className="text-yellow-500 hover:text-yellow-400 mt-4 inline-block"
              >
                Find Flatmate &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services with image */}
      <section className="py-20 text-white">
        <div className="container mx-auto">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "" : "md:flex-row-reverse"
                } items-center`}
              >
                {/* Image */}
                <div className="md:w-1/2 w-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="rounded-lg shadow-lg w-full h-full object-cover"
                  />
                </div>
                {/* Text */}
                <div className="md:w-1/2 w-full p-8">
                  <h3 className="text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-r from-black via-gray-900 to-black text-center text-white"
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8">
            About StudentSync
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
            StudentSync is a student-centered platform designed to bridge gaps
            between students and essential services. We understand the
            challenges of student life and are here to make it easier. Our
            platform connects students with the best events, vibrant
            communities, and convenient accommodation options, all tailored to
            enhance your academic journey.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
            From discovering local events that align with your interests to
            finding the perfect dormitory or flatmate, StudentSync is committed
            to supporting your growth and well-being. Our mission is to provide
            a seamless experience, helping you focus on what truly matters: your
            education and personal development.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
            Join us in creating a more connected and supportive student
            community. With StudentSync, you'll have all the resources you need
            right at your fingertips. Experience a new level of convenience and
            community engagement that will empower you throughout your academic
            career.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 text-white">
        <div className="w-10/12 mx-auto">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700"
                onClick={() => toggleFAQ(index)}
              >
                <div className="text-xl font-semibold text-yellow-400 flex items-center justify-between">
                  <span>{faq.question}</span>
                  <BsCaretDownFill size={25} />
                </div>
                {activeFAQ === index && (
                  <p className="text-gray-400 mt-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12">
            Get in Touch
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Have questions or need support? Reach out to us and we'll be happy
            to assist you.
          </p>
          <form className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-semibold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                placeholder="Your Name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-semibold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-300 text-sm font-semibold mb-2"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                id="message"
                className="w-full bg-gray-900 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-yellow-500"
                rows="4"
                placeholder="Your Message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
