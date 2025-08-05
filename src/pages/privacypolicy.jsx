import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[white] rounded-lg text-left shadow-sm p-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#111827] mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">1. Information We Collect</h2>
              <p className="text-[#4B5563] mb-4">We collect information you provide directly to us, such as:</p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Name, email address, and phone number</li>
                <li>Payment information for course purchases</li>
                <li>Learning progress and assessment results</li>
                <li>Communication preferences</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Provide and improve our educational services</li>
                <li>Process payments and send transaction confirmations</li>
                <li>Track learning progress and provide personalized recommendations</li>
                <li>Send important updates about your courses</li>
                <li>Respond to your questions and provide customer support</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">3. Information Sharing</h2>
              <p className="text-[#4B5563]">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2 mt-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With trusted service providers who assist in our operations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">4. Data Security</h2>
              <p className="text-[#4B5563]">
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">5. Your Rights</h2>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Access and update your personal information</li>
                <li>Request deletion of your account and data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">6. Contact Us</h2>
              <p className="text-[#4B5563]">
                If you have questions about this Privacy Policy, please contact us at hello@vidyaganai.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
