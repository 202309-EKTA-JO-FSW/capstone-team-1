"use client";
import React from "react";
import Logo from "./navbar/Logo";
import Image from "next/image";
import Link from "next/link";
import FreshFix from "../../../public/FreshFix.png";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const teamMembers = [
  {
    Name: "Gorgees Odisho",
    Github: "https://github.com/gorgees04",
    Linkedin: "https://www.linkedin.com/in/gorgees/",
  },
  {
    Name: "Nour Kayyali",
    Github: "https://github.com/NourKy",
    Linkedin: "https://www.linkedin.com/in/nour-kayyali-1991ky/",
  },
  {
    Name: "Hala Qitouqa",
    Github: "https://github.com/hqitouqa",
    Linkedin: "https://www.linkedin.com/in/hala-qitouqa/",
  },
  {
    Name: "Aya Ahmad",
    Github: "https://github.com/ayaahmad01",
    Linkedin: "https://www.linkedin.com/in/aya-ahmad-180079232/",
  },
];
function Footer() {
  return (
    <footer className=" bg-white border-t border-gray-100 hadow-lg w-full mx-auto p-4 pt-6 lg:pt-8">
      <div className="md:flex md:justify-between space-y-10 md:space-y-0 pb-10">
        <div className="mb-6 md:mb-0 md:mr-12 pl-2 ">
          <Logo />
          <Link href="/">
            <Image
              src={FreshFix}
              alt="FreshFix"
              width={100}
              height={70}
              priority="true"
              className="w-auto h-auto"
            />
          </Link>
          <div className="text-center text-base md:text-left pt-2 ">
            Experience the joy of culinary excellence
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:gap-35 sm:grid-cols-3">
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase ">
              Browse
            </h2>
            <ul className="text-gray-500  font-medium">
              <li className="mb-3">
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li className="mb-3">
                <a href="/restaurant" className="hover:underline">
                  Restaurants
                </a>
              </li>
              <li>
                <a href="/about-us" className="hover:underline">
                  About us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase ">
              Follow us
            </h2>
            <ul className="text-gray-500 font-medium">
              {teamMembers.map((member, index) => (
                <li key={index} className="mb-3">
                  <div className="flex items-center">
                    <p className="mr-2">{member.Name}</p>
                    <div className="flex">
                      {member.Github && (
                        <a
                          href={member.Github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline mr-2"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {member.Linkedin && (
                        <a
                          href={member.Linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-sm font-semibold text-gray-900 uppercase ">
              Contact Us
            </h2>
            <ul className="text-gray-500 font-medium">
              <li className="mb-4">
                <a
                  href="mailto:team1.recoder@gmail.com"
                  className="hover:underline"
                >
                  team1.recoder@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="my-1 border-gray-200 sm:mx-auto  lg:my-1" />
      <div className="sm:flex sm:items-center justify-center pt-1">
        <span className="text-sm text-gray-600 sm:text-center">
          © 2024{" "}
          <a href="/" className="hover:underline">
            FreshFix™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
