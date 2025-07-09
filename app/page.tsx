import Image from "next/image";
import Link from "next/link";

const faqs = [
  {
    q: "What is Vinktree?",
    a: "Vinktree is a modern link-in-bio platform that lets you share all your important links with one URL, customize your profile, and unlock premium features."
  },
  {
    q: "How much does premium cost?",
    a: "Premium is just ₹10/month and unlocks unlimited links, analytics, and more."
  },
  {
    q: "Can I use Vinktree for free?",
    a: "Yes! You can create a free account and add up to 3 links. Upgrade anytime for more."
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We use industry-standard security and never share your data with third parties."
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center justify-between px-4 py-0">
      {/* Animated Hero Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-pulse opacity-30">
          <ellipse cx="720" cy="300" rx="700" ry="200" fill="url(#paint0_radial)" />
          <defs>
            <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientTransform="translate(720 300) scale(700 200)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#a5b4fc" />
              <stop offset="1" stopColor="#f0abfc" stopOpacity="0.5" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      {/* Hero Section */}
      <main className="flex flex-col items-center gap-10 w-full max-w-3xl pt-24 pb-10">
        <div className="flex flex-col items-center gap-4">
          <Image
            className="dark:invert drop-shadow-lg animate-bounce"
            src="/next.svg"
            alt="Next.js logo"
            width={80}
            height={80}
            priority
          />
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white text-center leading-tight">
            Vinktree
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl mt-2">
            The modern way to manage your <span className="text-blue-600 font-bold">link-in-bio</span>.<br />
            Share all your links, grow your audience, and unlock premium features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
            <Link
              className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 shadow-lg transition text-center text-lg w-full sm:w-auto focus:ring-4 focus:ring-blue-300"
              href="/register"
            >
              Get Started Free
            </Link>
            <Link
              className="rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 transition text-center text-lg w-full sm:w-auto focus:ring-4 focus:ring-blue-200"
              href="/login"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <section className="w-full flex flex-col items-center mt-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <span className="text-gray-500 text-sm">Trusted by creators at</span>
            <div className="flex gap-4">
              <Image src="/globe.svg" alt="Brand1" width={24} height={24} />
              <Image src="/window.svg" alt="Brand2" width={24} height={24} />
              <Image src="/vercel.svg" alt="Brand3" width={24} height={24} />
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full mt-12">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex flex-col items-center bg-white/80 rounded-xl p-6 shadow-md">
              <span className="bg-blue-100 text-blue-600 rounded-full p-3 mb-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <h3 className="text-lg font-bold mb-1">Sign Up</h3>
              <p className="text-gray-500 text-center text-sm">Create your free Vinktree account in seconds.</p>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-xl p-6 shadow-md">
              <span className="bg-purple-100 text-purple-600 rounded-full p-3 mb-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <h3 className="text-lg font-bold mb-1">Add Your Links</h3>
              <p className="text-gray-500 text-center text-sm">Connect all your socials, websites, and more.</p>
            </div>
            <div className="flex flex-col items-center bg-white/80 rounded-xl p-6 shadow-md">
              <span className="bg-pink-100 text-pink-600 rounded-full p-3 mb-3">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <h3 className="text-lg font-bold mb-1">Share & Grow</h3>
              <p className="text-gray-500 text-center text-sm">Share your Vinktree link and watch your audience grow.</p>
            </div>
          </div>
        </section>

        {/* Mockup Section */}
        <section className="w-full flex flex-col items-center mt-16">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">See Your Profile in Action</h2>
          <div className="w-full max-w-xl bg-white/90 rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <Image src="/globe.svg" alt="Profile Mockup" width={80} height={80} className="mb-2" />
            <div className="w-full flex flex-col items-center gap-2">
              <span className="text-lg font-bold text-gray-900">@yourusername</span>
              <span className="text-gray-500 text-sm">your.bio/description here</span>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">Instagram</span>
                <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">YouTube</span>
                <span className="px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold">Portfolio</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-2xl mt-16">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white/80 rounded-lg p-4 shadow flex flex-col">
                <span className="font-semibold text-gray-800 mb-1">{faq.q}</span>
                <span className="text-gray-500 text-sm">{faq.a}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Premium Call-to-Action */}
        <section className="w-full flex flex-col items-center mt-16">
          <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 rounded-2xl shadow-xl p-8 flex flex-col items-center w-full max-w-xl animate-pulse">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center">Go Premium for More Power</h2>
            <p className="text-white text-center mb-4 text-lg">Unlock unlimited links, analytics, and priority support for just <span className="font-bold">₹10/month</span>.</p>
            <Link
              href="/register"
              className="bg-white text-purple-700 font-bold px-8 py-3 rounded-lg shadow hover:bg-purple-50 transition text-lg"
            >
              Try Premium Now
            </Link>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="w-full py-8 flex flex-col items-center gap-4 text-gray-400 text-xs bg-transparent mt-8">
        <div className="flex gap-4">
          <a
            className="inline-flex items-center gap-2 hover:underline hover:text-blue-600"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/globe.svg" alt="Docs" width={16} height={16} />
            Next.js Docs
          </a>
          <a
            className="inline-flex items-center gap-2 hover:underline hover:text-blue-600"
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/vercel.svg" alt="Vercel" width={16} height={16} />
            Deploy on Vercel
          </a>
          <a
            className="inline-flex items-center gap-2 hover:underline hover:text-blue-600"
            href="mailto:support@vinktree.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Contact
          </a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
        <div>&copy; {new Date().getFullYear()} Vinktree. All rights reserved.</div>
      </footer>
    </div>
  );
}
