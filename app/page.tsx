import Link from "next/link"
import { ArrowRight, Github, MessageSquare, FileText, Shield, GitBranch, Pencil } from "lucide-react"

// Assuming Button is correctly imported and uses Shadcn's styling
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    // Use Shadcn theme variables for base background and text
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top banner - Use muted colors from theme */}
      <div className="bg-muted py-2.5 px-4 text-center text-muted-foreground border-b">
        <div className="container mx-auto flex items-center justify-center gap-2 text-xs sm:text-sm sm:justify-end">
          <span>Try our new AI detection bypass algorithm</span>
          {/* Use foreground for prominent link text */}
          <Link href="/editor" className="flex items-center font-medium text-foreground hover:underline">
            Learn more <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Navigation - Use background (potentially with transparency) and border */}
      {/* Using bg-background/95 for slight transparency effect like the previous example */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm py-3">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-6">
            {/* Logo uses default foreground */}
            <Link href="/" className="flex items-center text-lg font-semibold text-foreground">
              <Pencil className="mr-2 h-4 w-4" /> Kopywriter
            </Link>
            <nav className="hidden md:block">
              {/* Nav links use muted foreground, hover to default foreground */}
              <ul className="flex gap-5">
                <li><Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
                <li><Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground">Use Cases</Link></li>
                <li><Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground">Enterprise</Link></li>
                <li><Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
                <li><Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground">API</Link></li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-4">
              {/* Icon links use muted foreground */}
              <Link href="#" className="text-muted-foreground hover:text-foreground"><Github className="h-4.5 w-4.5" /><span className="sr-only">GitHub</span></Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground"><MessageSquare className="h-4.5 w-4.5" /><span className="sr-only">Discord</span></Link>
              <Link href="/editor" className="text-sm text-muted-foreground hover:text-foreground">Contact sales</Link>
            </div>
            {/* Button uses standard 'outline' variant which respects theme variables */}
            <Button variant="outline" size="sm" className="rounded-md">
              <Link href="/editor" className="flex items-center">Sign in <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section - Use base background */}
      <main className="flex-1">
        <section className="py-24 md:py-36 bg-background">
          <div className="container mx-auto px-4 text-center">
            {/* Heading uses foreground */}
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl text-foreground">
              AI-written content that's <span className="font-serif italic font-normal text-muted-foreground">completely undetectable</span> {/* Italic part uses muted */}
            </h1>
            {/* Paragraph uses muted foreground */}
            <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
              Kopywriter is the advanced AI writing tool that helps you create human-like content that bypasses all AI
              detectors. With git-style diff tracking, humanizing algorithms, and seamless editing, create content
              that's truly yours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {/*
                Main CTA Button: Use Shadcn's default variant (usually primary).
                If the primary color is not monochrome, you might need a custom variant
                or override styles. Forcing black/white: bg-foreground text-background.
                Let's use that forced approach for true monochrome regardless of theme's primary.
              */}
              <Button size="lg" className="rounded-md bg-foreground text-background hover:bg-foreground/90">
                <Link href="/editor" className="flex items-center">Start writing for free <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              {/* Outline button respects theme */}
              <Button variant="outline" size="lg" className="rounded-md">
                <Link href="/editor">View live demo</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features section - Use muted background, card foreground/background for cards */}
        <section className="py-20 bg-muted border-t border-b"> {/* Use theme border color */}
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-semibold text-center mb-12 text-foreground">How Kopywriter works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature Card - Use card variables */}
              <div className="bg-card text-card-foreground p-6 rounded-lg border transition-shadow hover:shadow-sm"> {/* Use theme border */}
                <div className="mb-4">
                  {/* Icons use muted foreground */}
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
                {/* Card heading uses card-foreground (or default foreground) */}
                <h3 className="text-lg font-medium mb-2 text-card-foreground">AI Content Generation</h3>
                 {/* Card paragraph uses muted foreground */}
                <p className="text-sm text-muted-foreground">
                  Create high-quality content with our advanced AI models trained on human writing patterns.
                </p>
              </div>

              <div className="bg-card text-card-foreground p-6 rounded-lg border transition-shadow hover:shadow-sm">
                <div className="mb-4">
                  <GitBranch className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-card-foreground">Git-Style Diff Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  See exactly what's changed in your content with intuitive, clear diff views.
                </p>
              </div>

              <div className="bg-card text-card-foreground p-6 rounded-lg border transition-shadow hover:shadow-sm">
                <div className="mb-4">
                  <Shield className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-card-foreground">AI Detection Bypass</h3>
                <p className="text-sm text-muted-foreground">
                  Our proprietary algorithm transforms AI text to bypass all known AI content detectors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo section - Use background, card, muted */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            {/* Window mock uses card styles */}
            <div className="max-w-4xl mx-auto bg-card rounded-lg overflow-hidden border">
              {/* Header uses muted background and border */}
              <div className="p-3 bg-muted border-b flex items-center">
                <div className="flex space-x-1.5">
                  {/* Dots use muted-foreground with opacity */}
                  <div className="w-2.5 h-2.5 bg-muted-foreground/30 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-muted-foreground/30 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-muted-foreground/30 rounded-full"></div>
                </div>
              </div>
              {/* Diff view content uses foreground/muted-foreground */}
              <div className="p-6 font-mono text-xs md:text-sm text-foreground leading-relaxed">
                <div className="mb-2 text-muted-foreground">// Watch AI content transform into human-like text</div>
                {/* Removed line: muted-foreground with opacity */}
                <div className="flex items-start mb-0.5">
                  <span className="text-muted-foreground w-4">-</span>
                  <span className="text-muted-foreground opacity-70 flex-1">
                    The artificial intelligence has analyzed the data and generated this report.
                  </span>
                </div>
                 {/* Added line: slight muted background, default foreground text */}
                <div className="flex items-start mb-3 bg-muted/50 rounded p-1"> {/* Use muted with opacity for highlight */}
                  <span className="text-muted-foreground w-4">+</span>
                  <span className="flex-1 text-foreground">
                    After carefully examining the data, I've compiled this comprehensive report.
                  </span>
                </div>

                <div className="flex items-start mb-0.5">
                   <span className="text-muted-foreground w-4">-</span>
                   <span className="text-muted-foreground opacity-70 flex-1">
                    The algorithm determined that the optimal solution is to increase production.
                   </span>
                </div>
                 <div className="flex items-start mb-3 bg-muted/50 rounded p-1">
                  <span className="text-muted-foreground w-4">+</span>
                  <span className="flex-1 text-foreground">
                    Based on my analysis, I believe we should consider ramping up production.
                  </span>
                </div>

                <div className="flex items-start mb-0.5">
                   <span className="text-muted-foreground w-4">-</span>
                   <span className="text-muted-foreground opacity-70 flex-1">
                    This conclusion is based on statistical analysis of historical trends.
                  </span>
                </div>
                <div className="flex items-start bg-muted/50 rounded p-1">
                  <span className="text-muted-foreground w-4">+</span>
                  <span className="flex-1 text-foreground">
                    I've reached this conclusion after studying past performance and market patterns.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos section - Use muted background and placeholders */}
        <section className="border-t py-16 bg-muted">
          <div className="container mx-auto px-4">
            <p className="text-center text-sm text-muted-foreground mb-8">
              Trusted by content creators, marketers, and writers worldwide
            </p>
            <div className="grid grid-cols-3 gap-8 md:grid-cols-4 lg:grid-cols-6 items-center justify-items-center">
              {/* Placeholders use muted background */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-6 w-24 bg-muted-foreground/10 opacity-60 rounded"></div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Use muted background/foreground */}
      <footer className="bg-muted text-muted-foreground py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
             <div className="md:col-span-2 mb-4 md:mb-0">
               {/* Logo uses foreground */}
               <Link href="/" className="flex items-center text-lg font-semibold text-foreground mb-2">
                 <Pencil className="mr-2 h-4 w-4" /> Kopywriter
               </Link>
               {/* Footer text uses muted-foreground */}
               <p className="text-sm text-muted-foreground max-w-xs">
                 Create AI content that reads like it was written by a human. Bypass AI detection.
               </p>
             </div>
             <div>
                {/* Headings use foreground */}
               <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Product</h3>
               {/* Links use muted-foreground, hover to foreground */}
               <ul className="space-y-1.5 text-sm">
                 <li><Link href="/editor" className="hover:text-foreground">Features</Link></li>
                 <li><Link href="/editor" className="hover:text-foreground">Use Cases</Link></li>
                 <li><Link href="/editor" className="hover:text-foreground">Pricing</Link></li>
                 <li><Link href="/editor" className="hover:text-foreground">API</Link></li>
               </ul>
             </div>
             <div>
               <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Resources</h3>
               <ul className="space-y-1.5 text-sm">
                 <li><Link href="/editor" className="hover:text-foreground">Documentation</Link></li>
                 <li><Link href="/editor" className="hover:text-foreground">Guides</Link></li>
                 <li><Link href="/editor" className="hover:text-foreground">Blog</Link></li>
               </ul>
             </div>
             <div>
               <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Company</h3>
               <ul className="space-y-1.5 text-sm">
                 <li><Link href="/editor" className="hover:text-foreground">About</Link></li>
                 <li><Link href="/editor" className="hover:text-foreground">Careers</Link></li>
                 <li><Link href="/editor" className="hover:text-foreground">Contact</Link></li>
               </ul>
             </div>
          </div>
          <div className="mt-10 border-t pt-8 flex justify-between items-center">
            <p className="text-xs text-muted-foreground">© 2025 Kopywriter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}