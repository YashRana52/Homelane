import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { brand } from '@/config/brand';
import { Breadcrumb, Button, Container, Heading, Input, Section } from '@/ui';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />
      </Container>

      <Section pad="md">
        <Container>
          <div className="max-w-2xl">
            <Heading as="h1" level="display">
              Get in Touch
            </Heading>
            <p className="text-body-lg text-surface-600 mt-2">
              Have questions about your interior project, partnership inquiries, or existing orders? We are here to help.
            </p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 items-start">
            {/* Contact Information & Channels */}
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg border border-surface-200 bg-surface p-6 shadow-xs">
                  <Phone className="size-6 text-primary-500 mb-3" />
                  <h2 className="font-display font-semibold text-secondary-700">Call Us</h2>
                  <p className="text-caption text-surface-600 mt-1">Available 9:00 AM – 9:00 PM</p>
                  <a href={brand.phoneHref} className="text-sm font-bold text-primary-600 mt-2 block hover:underline">
                    {brand.phone}
                  </a>
                </div>

                <div className="rounded-lg border border-surface-200 bg-surface p-6 shadow-xs">
                  <Mail className="size-6 text-primary-500 mb-3" />
                  <h2 className="font-display font-semibold text-secondary-700">Email Us</h2>
                  <p className="text-caption text-surface-600 mt-1">Responses within 4 hours</p>
                  <a href={`mailto:${brand.email}`} className="text-sm font-bold text-primary-600 mt-2 block hover:underline">
                    {brand.email}
                  </a>
                </div>
              </div>

              <div className="rounded-lg border border-surface-200 bg-surface p-6 shadow-xs space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-primary-500 mt-1 shrink-0" />
                  <div>
                    <h2 className="font-display font-semibold text-secondary-700">Central Headquarters</h2>
                    <p className="text-body text-surface-600 text-sm mt-1">
                      Aangan Interiors Design Hub, 4th Floor, Salarpuria Cyber Park, Electronic City Phase 1, Bengaluru, Karnataka 560100
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 border-t border-surface-100 pt-4">
                  <Clock className="size-5 text-primary-500 mt-1 shrink-0" />
                  <div>
                    <h2 className="font-display font-semibold text-secondary-700">Studio Hours</h2>
                    <p className="text-body text-surface-600 text-sm mt-1">
                      Monday to Sunday: 10:00 AM – 8:00 PM (All studios open on weekends)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Form */}
            <div className="rounded-xl border border-surface-200 bg-surface p-6 sm:p-8 shadow-md">
              <h2 className="text-h3 font-display font-bold text-secondary-700 mb-2">
                Send a Direct Message
              </h2>
              <p className="text-caption text-surface-600 mb-6">
                Fill out the form below and our team will get in touch with you shortly.
              </p>

              {sent ? (
                <div className="py-8 text-center bg-primary-50 rounded-lg p-6">
                  <ShieldCheck className="size-12 text-success mx-auto mb-3" />
                  <h3 className="text-h4 font-display font-bold text-secondary-900">Message Received!</h3>
                  <p className="text-body text-surface-600 text-sm mt-2">
                    Thank you, {name}. Our customer success team has received your inquiry and will contact you via email or phone within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    label="Full Name"
                    required
                    placeholder="Ankit Verma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    placeholder="ankit@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div>
                    <label htmlFor="contact-message" className="text-caption text-surface-600 mb-1.5 block font-semibold">
                      Your Message <span className="text-primary-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      placeholder="Tell us about your home floorplan, requirements or query..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="text-body rounded-sm border border-surface-300 w-full p-3 outline-none focus:border-primary-500"
                    />
                  </div>
                  <Button type="submit" fullWidth size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
