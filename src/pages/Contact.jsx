
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { FaEnvelope, FaPhone, FaGlobe, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="container items-center mx-auto">
        {/* Hero Section with Responsive Image */}
        <div className="text-center mb-12">
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="English consultation and support" 
              className="mx-auto rounded-lg shadow-xl w-full max-w-4xl h-64 md:h-80 object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-[#4B5563] max-w-3xl mx-auto">
            Have questions about our courses? Need help choosing the right plan? We're here to help you start your English learning journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-[white]">
            <CardHeader>
              <CardTitle className="text-2xl">Send us a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="text-sm font-medium leading-none">Name *</label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="mt-1 text-[#9CA3AF]"
                    placeholder="Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-sm font-medium leading-none">Email *</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1 text-[#9CA3AF]"
                    placeholder="Email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-medium leading-none">Phone Number</label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1 text-[#9CA3AF]"
                    placeholder="Phone"
                  />
                </div>

                <div>
                  <label htmlFor="course" className="text-sm font-medium leading-none">Select Course</label>
                  <select
                    id="course"
                    value={formData.course}
                    onChange={(e) => handleInputChange('course', e.target.value)}
                    className="mt-1 w-full border rounded-md text-[#9CA3AF] px-3 py-2"
                  >
                    <option value="">Choose a course</option>
                    <option value="basic">Basic English Starter</option>
                    <option value="intermediate">Fluency Builder</option>
                    <option value="advanced">Pro Communicator</option>
                    <option value="crash">Crash Course</option>
                    <option value="oneone">One-on-One Mentoring</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="text-sm font-medium leading-none">Message / Inquiry</label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={4}
                    className="mt-1 text-[#9CA3AF]"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button type="submit" className="w-full bg-[#111827] text-[white] p-3 rounded-lg hover:text-[#9CA3AF]" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Office Image */}
            <div className="mb-8">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="VidyaGan-AI learning center" 
                className="rounded-lg shadow-lg w-full h-48 object-cover"
              />
            </div>

            <Card className="bg-[white]">
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#E1EFFE] p-3 rounded-lg">
                    <FaEnvelope className="h-6 w-6 text-[#1C64F2]" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-[#4B5563]">info@vidyaganai.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#E1EFFE] p-3 rounded-lg">
                    <FaPhone className="h-6 w-6 text-[#1C64F2]" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-[#4B5563]">+91 7416227573</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-[#E1EFFE] p-3 rounded-lg">
                    <FaGlobe className="h-6 w-6 text-[#1C64F2]" />
                  </div>
                  <div>
                    <p className="font-semibold">Website</p>
                    <p className="text-[#4B5563]">www.vidyaganai.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[white]">
              <CardHeader>
                <CardTitle className="text-2xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button variant="outline" size="icon" className="hover:bg-[#EBF5FF]">
                    <FaFacebook className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-[#FDF2F8]">
                    <FaInstagram className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" className="hover:bg-[#EBF5FF]">
                    <FaLinkedin className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#EBF5FF]">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Response</h3>
                <p className="text-[#374151] mb-4">
                  We typically respond to inquiries within 24 hours. For urgent matters, please call us directly.
                </p>
                <p className="text-sm text-[#4B5563]">
                  Our support team is available Monday to Friday, 9 AM to 6 PM IST.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Contact Section with Learning Environment Image */}
        <div className="mt-16 bg-[white] rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#111827] mb-6">Visit Our Learning Center</h2>
              <p className="text-lg text-[#374151] leading-relaxed mb-4">
                Experience our interactive learning environment firsthand. Schedule a visit to our center 
                where you can meet our instructors, see our facilities, and get a feel for our teaching methodology.
              </p>
              <p className="text-lg text-[#374151] leading-relaxed">
                We also offer virtual tours for those who prefer to explore our offerings online before 
                making a commitment.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/image/11.jpg"
                alt="Modern English learning center with students" 
                className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
                />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
