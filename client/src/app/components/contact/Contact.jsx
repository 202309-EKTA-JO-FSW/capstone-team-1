import React from "react";
import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";

const Contact = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 px-20">
      <div>
        <div className="px-4 py-16">
          <h2 className="text-3xl font-bold ">Get in Touch</h2>

          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you. E-mail us, give us a call or fill out
            the contact Form and we'll get back to you the soonest!
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-2 px-2 py-2">
          <ContactCard
            icon={<MdAlternateEmail />}
            name={"E-mail"}
            email={"team1.recoder@gmail.com"}
          />
          <ContactCard
            icon={<FaPhoneVolume />}
            name={"Phone"}
            phone={"+962771231231"}
          />
        </div>
      </div>
      <div>
        <div className="px-4 py-2">
          <ContactForm />
        </div>{" "}
      </div>{" "}
    </div>
  );
};

export default Contact;
