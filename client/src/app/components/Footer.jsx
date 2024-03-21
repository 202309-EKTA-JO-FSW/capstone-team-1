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
    <footer class="bg-white dark:bg-gray-900 fixed bottom-0 w-full  mx-auto p-4 py-6 lg:py-8 ">
      <div class="md:flex md:justify-between space-y-10 md:space-y-0">
        <div class="mb-6 md:mb-0 md:mr-12 pl-2 ">
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
          <div class="text-center text-base md:text-left pt-2 ">
            Experience the joy of culinary excellence
          </div>
        </div>
        <div class="grid grid-cols-2 gap-8 sm:gap-35 sm:grid-cols-3">
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Browse
            </h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li>
                <a href="/" class="hover:underline">
                  Home
                </a>
              </li>
              <li class="mb-4">
                <a href="/restaurant" class="hover:underline">
                  Restaurants
                </a>
              </li>
              <li>
                <a href="/about-us" class="hover:underline">
                  About us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Follow us
            </h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              {teamMembers.map((member, index) => (
                <li key={index} class="mb-4">
                  <div class="flex items-center">
                    <p class="mr-2">{member.Name}</p>
                    <div class="flex">
                      {member.Github && (
                        <a
                          href={member.Github}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="hover:underline mr-2"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {member.Linkedin && (
                        <a
                          href={member.Linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          class="hover:underline"
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
            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
              Contact Us
            </h2>
            <ul class="text-gray-500 dark:text-gray-400 font-medium">
              <li class="mb-4">
                <a
                  href="mailto:team1.recoder@gmail.com"
                  class="hover:underline"
                >
                  team1.recoder@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr class="my-1 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-1" />
      <div class="sm:flex sm:items-center justify-center py-1">
        <span class="text-sm text-gray-600 sm:text-center dark:text-gray-500">
          © 2024{" "}
          <a href="/" class="hover:underline">
            FreshFix™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
