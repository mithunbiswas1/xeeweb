"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Input from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { MdAlignHorizontalCenter } from "react-icons/md";
import { CgPhone } from "react-icons/cg";
import { FaMapPin } from "react-icons/fa";

const STATIC_SETTINGS = {
  email: "contact@xeeweb.com",
  phone: "+1 (234) 567-890",
  address: "123 Main Street, Your City, Country",
};

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);

      // Simulate sending message (static)
      setTimeout(() => {
        setIsLoading(false);
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 1000);
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-8 gap-8 max-w-5xl mx-auto my-10 bg-white shadow border border-gray-200 rounded-sm">
        {/* Left Side - Contact Form */}
        <div className="md:col-span-5 p-6">
          <h2 className="text-2xl font-semibold mb-1">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Have any questions? Fill out the form and we’ll get back to you
            shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              error={errors.name}
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
            />

            <Input
              label="Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              error={errors.subject}
            />

            <Textarea
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Leave us a message..."
              error={errors.message}
            />

            <Button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message →"}
            </Button>
          </form>
        </div>

        {/* Right Side - Contact Info */}
        <div className="md:col-span-3 p-6 bg-gray-50 flex flex-col justify-center space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer hover:underline">
              <MdAlignHorizontalCenter size={20} /> {STATIC_SETTINGS.email}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer hover:underline">
              <CgPhone size={20} /> {STATIC_SETTINGS.phone}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <div className="flex items-center gap-2 text-gray-800 cursor-pointer hover:underline">
              <FaMapPin size={20} /> {STATIC_SETTINGS.address}
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full overflow-hidden container rounded-sm py-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.022421364412!2d144.982433!3d-37.801265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642e88a0026e9%3A0x600c49a633a699c6!2s100%20Smith%20St%2C%20Collingwood%20VIC%203066%2C%20Australia!5e0!3m2!1sen!2sus!4v1700000000000"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUsPage;
