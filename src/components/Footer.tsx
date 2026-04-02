import { useState, useEffect } from 'react'

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false)

  // Pengganti script window.onscroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener saat komponen unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <>
      {/* BEGIN: Main Footer */}
      <footer
        className="bg-gray-50 border-t border-gray-200 mt-16 py-12"
        data-purpose="site-footer"
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="w-6 h-6 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-md flex items-center justify-center text-white font-bold text-xs italic">
              A
            </div>
            <span className="text-lg font-bold tracking-tight text-gray-900">
              Angelz28
            </span>
          </div>
          <p className="text-gray-500 text-sm mb-1">
            Your trusted source for crypto market data and insights.
          </p>
          <p className="text-gray-500 text-sm mb-4 italic">
            Angelz28 is a crypto insight platform designed and developed by{' '}
            <b>Yandi Hardiansyah</b> as a portfolio project.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400 mb-8">
            <a className="hover:text-emerald-600" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-emerald-600" href="#">
              Terms of Service
            </a>
            <a className="hover:text-emerald-600" href="#">
              Contact Us
            </a>
          </div>
          <p className="text-gray-400 text-xs">
            © 2026 Angelz28. All Rights Reserved.
          </p>
        </div>
      </footer>
      {/* END: Main Footer */}

      {/* BEGIN: Back to Top Button */}
      <button
        id="back-to-top"
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-white border border-gray-200 shadow-lg p-3 rounded-full text-gray-600 hover:text-emerald-600 transition-all duration-300 ${
          isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        data-purpose="utility-button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M5 10l7-7m0 0l7 7m-7-7v18"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
      {/* END: Back to Top Button */}
    </>
  )
}

export default Footer