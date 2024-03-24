import React from "react";

const ContactCard = ({ name, icon, email, phone }) => {
  return (
    <div className="pt-5 pl-4 ">
      <div className=" w-[210px] h-[255px]  bg-white rounded-[30px] shadow-[7px_12px_43px_#00000024]">
        <div className="flex justify-center items-center pt-12 text-6xl  text-main-green">
          {icon}
        </div>
        <div className="relative text-[24px] text-center top-10 leading-normal text-main-green">
          {name}
        </div>
        <div className="relative text-[20px] text-center top-10 leading-normal text-main-green w-full overflow-hidden p-3">
          <a href={`tel:${phone}`}>{phone}</a>
          <a href={`mailto:${email}`}>
            <span className="truncate overflow-hidden whitespace-nowrap">
              {email}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
