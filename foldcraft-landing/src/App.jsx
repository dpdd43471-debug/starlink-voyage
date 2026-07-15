import { useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'

const NAV_LINKS = ['Home', 'Projects', 'Studio', 'Reach Us']

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-geist">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: '70% center' }}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
      />

      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            Foldcraft
          </span>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side - Desktop */}
        <div className="hidden md:block">
          <button className="rounded-lg bg-white px-5 py-2 text-sm font-medium text-black hover:scale-105 transition-transform">
            Let&apos;s Talk
          </button>
        </div>

        {/* Right Side - Mobile Hamburger */}
        <button
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden active:scale-90"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <Menu
            size={24}
            className={`absolute text-white transition-all duration-300 ${
              mobileMenuOpen
                ? 'rotate-90 opacity-0 scale-0'
                : 'rotate-0 opacity-100 scale-100'
            }`}
          />
          <X
            size={24}
            className={`absolute text-white transition-all duration-300 ${
              mobileMenuOpen
                ? 'rotate-0 opacity-100 scale-100'
                : '-rotate-90 opacity-0 scale-0'
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`absolute inset-x-0 top-0 z-20 bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'h-screen opacity-100'
            : 'h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`flex h-full flex-col justify-center px-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] delay-100 ${
            mobileMenuOpen
              ? 'translate-y-0 opacity-100'
              : 'translate-y-8 opacity-0'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={closeMenu}
              className="py-3 text-3xl font-medium text-white/90 hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
          <button
            onClick={closeMenu}
            className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black hover:scale-105 transition-transform"
          >
            Let&apos;s Talk
          </button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        {/* Top Section */}
        <div className="max-w-3xl">
          <p className="mb-4 text-xs text-white/90 sm:mb-6 sm:text-sm animate-[fadeSlideUp_0.8s_ease_0.2s_both]">
            Brand &amp; Visual Storytelling
          </p>
          <h1 className="text-3xl font-medium leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-[fadeSlideUp_0.8s_ease_0.4s_both]">
            Shaping visual <br />
            narratives, <br />
            one pixel at a time.
          </h1>
        </div>

        {/* Bottom Section */}
        <div>
          <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg animate-[fadeSlideUp_0.8s_ease_0.7s_both]">
            Turning vision into reality through craft, motion, and an endless
            pursuit of beauty.
          </p>
          <button className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:scale-105 transition-transform sm:px-6 sm:py-3 animate-[fadeSlideUp_0.8s_ease_0.9s_both]">
            Explore Work
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}