// import React from "react";
// import ContactUsForm from "./ContactUsForm";
// import contactImage from "../../assets/Images/contact-form-pic.png";

// const ContactForm = () => {
//   return (
//     <div className="border border-black-600 text-black-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col">
//       <h1 className="text-4xl
//             leading-10
//             font-semibold
//             bg-gradient-to-b from-[#004aad] via-[#32a7f3] to-[#6ca3cc] text-transparent bg-clip-text font-bold">
//         Got an Idea? We&apos;ve got the skills. Let&apos;s team up !!
//       </h1>
//       <p>
//         Tell us more about yourself and what you&apos;re got in mind.
//       </p>

//       <div className="mt-7">
//         <ContactUsForm />
//       </div>
//     </div>
//   );
// };

// export default ContactForm;

import React from "react";
import ContactUsForm from "./ContactUsForm";
import contactImage from "../../assets/Images/contact-form-pic.png";

const ContactForm = () => {
  return (
    <div className="bg-[white] mt-5 relative shadow-2xl z-10 text-black-300 rounded-xl p-7 lg:p-14 flex flex-col lg:flex-row gap-10 items-center">
      

      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
      <div className="flex flex-col justify-center text-center mb-10">
        <h1 className="mb-2 font-bold text-blue-100 text-[50px]">Contact Us</h1>
        <p className="text-[20px] text-gray-100">If you have any questions or need assistance, feel free to reach out.</p>
        </div>
        <img
          src={contactImage}
          alt="Contact Us"
          className="max-w-full h-auto rounded-lg"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* <h1 className="text-4xl leading-10 font-semibold bg-gradient-to-b from-[#004aad] via-[#32a7f3] to-[#6ca3cc] text-transparent bg-clip-text font-bold">
          Got an Idea? We&apos;ve got the skills. Let&apos;s team up !!
        </h1>
        <p className="mt-4">
          Tell us more about yourself and what you&apos;ve got in mind.
        </p> */}
        <div className="mt-7">
          <ContactUsForm />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
