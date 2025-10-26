import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  FileSignature,
  Lock,
  Mail,
  Zap,
  Globe,
  CheckCircle2,
  ArrowRight,
  FileText,
  Users,
  Eye,
  Sparkles,
} from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <FileSignature className="w-6 h-6" />,
      title: 'Digital Signatures',
      description: 'Create legally binding digital signatures with blockchain-verified proof of authenticity.',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'End-to-End Encryption',
      description: 'Documents are encrypted and only accessible to authorized parties with proper credentials.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: 'Onchain Verification',
      description: 'Every signature is recorded on the blockchain, providing immutable proof of agreement.',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Integration',
      description: 'Simply add signers by email - they receive a secure link to review and sign documents.',
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: 'Address-Based Access',
      description: 'Only users with the specified wallet address can view, sign, and decrypt documents.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Sign and execute agreements in minutes, not days. Streamline your workflow effortlessly.',
    },
  ];

  const useCases = [
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Business Contracts',
      description: 'NDAs, employment agreements, and service contracts',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Project Deals',
      description: 'Partnership agreements and collaborative ventures',
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Legal Documents',
      description: 'Any legal agreement requiring verified signatures',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Agreement',
      description: 'Upload or create your document and define signing parties',
    },
    {
      number: '02',
      title: 'Send Invite',
      description: 'Add signers by email - they receive a secure signing link',
    },
    {
      number: '03',
      title: 'Sign & Verify',
      description: 'Parties sign with their wallet, creating an immutable blockchain record',
    },
    {
      number: '04',
      title: 'Execute Onchain',
      description: 'Agreement is stored encrypted and verified on the blockchain',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[#f6f6f4] border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3"
            >
              <img
                src="/loopr.png"
                alt="Loopr Logo"
                className="h-12 w-auto"
              />
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-white font-medium shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              style={{ background: 'linear-gradient(135deg, #0047ff 0%, #00d4ff 100%)' }}
            >
              Launch App
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-primary-100 mb-6">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-600">
                Blockchain-Powered Digital Signatures
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-dark-500 mb-6 leading-tight">
              Sign Agreements
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                On the Blockchain
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Create tamper-proof, legally binding agreements with cryptographic security.
              Send, sign, and verify contracts onchain with complete transparency and privacy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/onboarding')}
                className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-white font-semibold text-lg shadow-2xl transition-all hover:scale-105 hover:shadow-primary-500/50"
                style={{ background: 'linear-gradient(135deg, #0047ff 0%, #00d4ff 100%)' }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center gap-2 rounded-xl px-8 py-4 bg-white text-dark-500 font-semibold text-lg shadow-lg border-2 border-gray-200 hover:border-primary-500 transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary-500" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary-500" />
                <span>Blockchain Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary-500" />
                <span>Legally Binding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-dark-500 mb-4">
              Powerful Features for Secure Signing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and verify digital agreements with blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-gray-200 hover:border-primary-500 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-500 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-dark-500 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple, secure, and seamless signing process in just four steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div
                    className="text-6xl font-bold mb-4 opacity-10"
                    style={{
                      background: 'linear-gradient(135deg, #0047ff 0%, #00d4ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-dark-500 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-primary" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-dark-500 mb-4">
              Perfect For Any Agreement
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From business contracts to project deals, secure any type of agreement onchain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-secondary-50 hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-5 text-primary-500 group-hover:scale-110 transition-transform">
                  {useCase.icon}
                </div>
                <h3 className="text-xl font-bold text-dark-500 mb-3">{useCase.title}</h3>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to Start Signing?
          </h2>
          <p className="text-xl text-gray-300 mb-10 leading-relaxed">
            Join the future of digital agreements. Create your first blockchain-verified contract today.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="group inline-flex items-center gap-2 rounded-xl px-10 py-5 text-dark-500 bg-white font-bold text-lg shadow-2xl transition-all hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-primary-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary-500 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f6f6f4] border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/loopr.png"
                alt="Loopr Logo"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-600 text-center">
              © 2025 Loopr. All rights reserved. Blockchain-powered digital signatures.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
