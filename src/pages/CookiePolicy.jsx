import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[white] text-left rounded-lg shadow-sm p-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#111827] mb-8">Usage Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">1. Acceptable Use</h2>
              <p className="text-[#4B5563] mb-4">VidyaGan-AI platform is intended for:</p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Personal English language learning and skill development</li>
                <li>Educational purposes only</li>
                <li>Individual use by the registered account holder</li>
                <li>Legitimate communication and interaction with instructors</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">2. Prohibited Activities</h2>
              <p className="text-[#4B5563] mb-4">Users are strictly prohibited from:</p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Sharing account credentials with multiple users</li>
                <li>Using automated tools to access content</li>
                <li>Attempting to hack, disrupt, or damage the platform</li>
                <li>Uploading malicious content or viruses</li>
                <li>Harassing other users or instructors</li>
                <li>Using the platform for any illegal activities</li>
                <li>Creating multiple accounts to circumvent restrictions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">3. Account Responsibilities</h2>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Maintain the security of your login credentials</li>
                <li>Provide accurate and up-to-date information</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Use the platform in accordance with all applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">4. Content Guidelines</h2>
              <p className="text-[#4B5563] mb-4">When participating in forums, chat, or submitting assignments:</p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Be respectful and professional in all communications</li>
                <li>Do not share personal contact information</li>
                <li>Keep discussions relevant to learning objectives</li>
                <li>Report any inappropriate behavior to our support team</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">5. Consequences of Misuse</h2>
              <p className="text-[#4B5563] mb-4">Violation of this usage policy may result in:</p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Warning and temporary restriction of access</li>
                <li>Suspension of account privileges</li>
                <li>Permanent account termination</li>
                <li>Legal action in cases of severe violations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">6. Reporting Violations</h2>
              <p className="text-[#4B5563]">
                If you encounter any misuse of the platform or have concerns about user behavior, please report it immediately to hello@vidyaganai.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
