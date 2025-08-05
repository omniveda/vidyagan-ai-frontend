import React from 'react';

const Copyright = () => {
  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-[white] rounded-lg text-left shadow-sm p-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#111827] mb-8">Copyright Policy</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">1. Copyright Ownership</h2>
              <p className="text-[#4B5563]">
                All content available on VidyaGan-AI platform, including but not limited to video lessons, text materials, graphics, logos, and software, is the property of VidyaGan-AI or its content suppliers and is protected by copyright laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">2. Permitted Use</h2>
              <p className="text-[#4B5563] mb-4">You may:</p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Access and view content for personal educational purposes</li>
                <li>Download materials for offline study (where explicitly permitted)</li>
                <li>Print content for personal study notes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">3. Prohibited Use</h2>
              <p className="text-[#4B5563] mb-4">You may NOT:</p>
              <ul className="list-disc pl-6 text-[#4B5563] space-y-2">
                <li>Reproduce, distribute, or publicly display our content</li>
                <li>Create derivative works based on our materials</li>
                <li>Share your account credentials with others</li>
                <li>Record, copy, or redistribute video lessons</li>
                <li>Use content for commercial purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">4. DMCA Compliance</h2>
              <p className="text-[#4B5563]">
                VidyaGan-AI respects the intellectual property rights of others. If you believe that your copyrighted work has been infringed, please contact us with detailed information about the alleged infringement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">5. Enforcement</h2>
              <p className="text-[#4B5563]">
                Violation of this copyright policy may result in immediate termination of your account and legal action. We actively monitor for unauthorized use of our content.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[#1F2937] mb-4">6. Contact for Copyright Issues</h2>
              <p className="text-[#4B5563]">
                For copyright-related inquiries, please contact us at hello@vidyaganai.com with "Copyright" in the subject line.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Copyright;