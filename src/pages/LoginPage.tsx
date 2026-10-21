import { ArrowRight, CheckCircle2, Lock, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import { Breadcrumb, Button, Container, Heading, Input, Section } from '@/ui';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      setLoggedIn(true);
    }
  };

  return (
    <>
      <Container className="pt-4">
        <Breadcrumb items={[{ label: 'Homeowner Login' }]} />
      </Container>

      <Section pad="md">
        <Container className="max-w-md">
          <div className="rounded-xl border border-surface-200 bg-surface p-6 sm:p-8 shadow-md">
            <div className="text-center mb-6">
              <div className="size-12 rounded-full bg-primary-50 text-primary-600 grid place-items-center mx-auto mb-3">
                <Lock className="size-5" />
              </div>
              <Heading as="h1" level="h3">
                Homeowner Portal
              </Heading>
              <p className="text-caption text-surface-600 mt-1">
                Track your ongoing project milestones, 3D drawings, and factory dispatches.
              </p>
            </div>

            {loggedIn ? (
              <div className="py-6 text-center space-y-4">
                <CheckCircle2 className="size-12 text-success mx-auto" />
                <h3 className="text-h4 font-display font-bold text-secondary-900">
                  Welcome back!
                </h3>
                <p className="text-body text-surface-600 text-sm">
                  You are signed in as +91 {phone}. Your active 3D drawings and design schedule are up to date.
                </p>
                <Button to="/projects" fullWidth className="mt-4">
                  View My Ongoing Project
                </Button>
              </div>
            ) : !otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <Input
                  label="Registered Mobile Number"
                  prefix="+91"
                  type="tel"
                  inputMode="numeric"
                  placeholder="98765 43210"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  helper="We will send a 4-digit verification code."
                />

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={phone.length !== 10}
                  iconRight={<ArrowRight className="size-4" />}
                >
                  Send Verification OTP
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="bg-primary-50 p-3 rounded-md text-caption text-center text-primary-700">
                  OTP sent to +91 {phone}. Enter <strong>1234</strong> to demo login.
                </div>

                <Input
                  label="4-Digit Verification Code"
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="1234"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                />

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  disabled={otp.length !== 4}
                >
                  Verify & Access Portal
                </Button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-caption text-primary-600 hover:underline"
                  >
                    Change mobile number
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-surface-100 flex items-center justify-center gap-2 text-caption text-surface-600">
              <ShieldCheck className="size-4 text-success" />
              <span>Bank-grade 256-bit encrypted authentication</span>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
