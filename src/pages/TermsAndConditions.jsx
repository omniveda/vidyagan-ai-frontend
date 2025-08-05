import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[white] rounded-lg text-left shadow-sm p-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#111827] mb-8">Terms & Conditions</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">1. Acceptance of Terms</h2>
              <p className="text-[#4B5563]">
                By accessing and using VidyaGan-AI's services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">2. Course Access and Usage</h2>
              <p className="text-[#4B5563] mb-4">
                Upon enrollment, you will receive access to:
              </p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Video lessons for the duration of your subscription</li>
                <li>Practice materials and assignments</li>
                <li>Certificate upon successful completion</li>
                <li>Optional one-on-one sessions (if purchased separately)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">3. Payment Terms</h2>
              <p className="text-[#4B5563]">
                All course fees must be paid in advance. Refunds are available within 7 days of purchase if no significant course content has been accessed.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">4. User Responsibilities</h2>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Maintain confidentiality of your account credentials</li>
                <li>Use the platform for educational purposes only</li>
                <li>Respect intellectual property rights</li>
                <li>Provide accurate information during registration</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">5. Limitation of Liability</h2>
              <p className="text-[#4B5563]">
                VidyaGan-AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">6. Contact Information</h2>
              <p className="text-[#4B5563]">
                For questions about these Terms & Conditions, please contact us at hello@vidyaganai.com
              </p>
            </section>
          </div>
        </div>
      </div>
      </div>
  );
};

export default TermsAndConditions;