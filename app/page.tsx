import Link from "next/link"
import { ArrowRight, Github, MessageSquare, FileText, Shield, GitBranch } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-500 py-3 px-4 text-center text-white">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm sm:justify-end">
          <span>Try our new AI detection bypass algorithm</span>
          <Link href="#" className="flex items-center font-medium hover:underline">
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <header className="border-b bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center text-xl font-bold">
              <span className="mr-2">✍️</span> Kopywriter
            </Link>
            <nav className="hidden md:block">
              <ul className="flex gap-6">
                <li>
                  <Link href="#" className="text-sm hover:text-gray-600">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-gray-600">
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-gray-600">
                    Enterprise
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-gray-600">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-gray-600">
                    API
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                <MessageSquare className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
              <Link href="#" className="text-sm hover:text-gray-600">
                Contact sales
              </Link>
            </div>
            <Button variant="outline" className="rounded-full border-gray-300 px-4">
              Sign in <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Gradient blob */}
          <div className="absolute right-0 top-0 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-teal-200 via-purple-200 to-rose-200 opacity-70 blur-3xl"></div>

          <div className="container mx-auto px-4 text-center">
            <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              AI-written content that's <span className="font-serif italic font-normal">completely undetectable</span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg text-gray-700">
              Kopywriter is the advanced AI writing tool that helps you create human-like content that bypasses all AI
              detectors. With git-style diff tracking, humanizing algorithms, and seamless editing, create content
              that's truly yours.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="rounded-full bg-gray-900 px-6 py-6 text-white hover:bg-gray-800">
                Start writing for free <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-full border-gray-300 px-6 py-6">
                View live demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How Kopywriter works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Content Generation</h3>
                <p className="text-gray-600">
                  Create high-quality content with our advanced AI models trained on human writing patterns.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <GitBranch className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Git-Style Diff Tracking</h3>
                <p className="text-gray-600">
                  See exactly what's changed in your content with intuitive, color-coded diff views.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-rose-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Detection Bypass</h3>
                <p className="text-gray-600">
                  Our proprietary algorithm transforms AI text to bypass all known AI content detectors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-sm text-gray-500">content.md - Kopywriter</div>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="mb-2 text-gray-500">// Watch AI content transform into human-like text</div>
                <div className="bg-red-50 text-red-800 px-2 py-1 rounded mb-1">
                  - The artificial intelligence has analyzed the data and generated this report.
                </div>
                <div className="bg-green-50 text-green-800 px-2 py-1 rounded mb-3">
                  + After carefully examining the data, I've compiled this comprehensive report.
                </div>

                <div className="bg-red-50 text-red-800 px-2 py-1 rounded mb-1">
                  - The algorithm determined that the optimal solution is to increase production.
                </div>
                <div className="bg-green-50 text-green-800 px-2 py-1 rounded mb-3">
                  + Based on my analysis, I believe we should consider ramping up production.
                </div>

                <div className="bg-red-50 text-red-800 px-2 py-1 rounded mb-1">
                  - This conclusion is based on statistical analysis of historical trends.
                </div>
                <div className="bg-green-50 text-green-800 px-2 py-1 rounded">
                  + I've reached this conclusion after studying past performance and market patterns.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos section */}
        <section className="border-t py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <p className="text-center text-gray-500 mb-8">
              Trusted by content creators, marketers, and writers worldwide
            </p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center">
                  <div className="h-8 w-24 bg-gray-200 opacity-70"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <Link href="/" className="flex items-center text-xl font-bold">
                <span className="mr-2">✍️</span> Kopywriter
              </Link>
              <p className="mt-2 text-gray-400 max-w-md">
                Create AI content that reads like it was written by a human. Bypass AI detection with our advanced
                humanizing technology.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Product</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Use Cases
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      API
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm">© 2025 Kopywriter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
