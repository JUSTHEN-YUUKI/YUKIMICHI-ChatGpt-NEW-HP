```tsx
export default function Home() {
  return (
    <main className="bg-[#050505] text-white overflow-x-hidden">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>
            <h1 className="text-2xl md:text-3xl tracking-[0.35em] font-light">
              YUKIMICHI
            </h1>

            <p className="text-[#d4af37] text-xs tracking-[0.25em] mt-2 uppercase">
              Japan to the World
            </p>
          </div>

          <nav className="hidden md:flex gap-8 text-sm text-white/80">
            <a href="#" className="hover:text-[#d4af37] transition">
              About
            </a>

            <a href="#" className="hover:text-[#d4af37] transition">
              Services
            </a>

            <a href="#" className="hover:text-[#d4af37] transition">
              Workflow
            </a>

            <a href="#" className="hover:text-[#d4af37] transition">
              Pricing
            </a>

            <a href="#" className="hover:text-[#d4af37] transition">
              FAQ
            </a>

            <a href="#" className="hover:text-[#d4af37] transition">
              Contact
            </a>
          </nav>

        </div>
      </header>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center text-center">

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.82)), url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1974&auto=format&fit=crop')",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 px-6 max-w-5xl">

          <p className="text-[#d4af37] tracking-[0.4em] uppercase text-xs md:text-sm mb-8">
            Japan Export & Procurement
          </p>

          <h2 className="text-5xl md:text-8xl font-light tracking-[0.25em] leading-tight">
            YUKIMICHI
          </h2>

          <p className="mt-6 text-xl md:text-2xl tracking-[0.15em] text-white/80">
            Japan to the World
          </p>

          <div className="mt-12 max-w-3xl mx-auto">

            <p className="text-white/75 text-base md:text-xl leading-[2.3]">
              日本から世界へ。<br />
              信頼できる輸出・調達サポートを、<br />
              札幌からグローバルに提供します。
            </p>

            <p className="mt-6 text-white/40 tracking-[0.1em] text-sm">
              Export & Procurement Support from Sapporo, Japan
            </p>

          </div>

          {/* BUTTONS */}
          <div className="mt-14 flex flex-col md:flex-row gap-5 justify-center">

            <button className="px-10 py-4 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition duration-500 tracking-[0.2em] text-sm">
              REQUEST A QUOTE
            </button>

            <button className="px-10 py-4 border border-white/20 hover:border-white transition duration-500 tracking-[0.2em] text-sm">
              CONTACT US
            </button>

          </div>

        </div>

      </section>

      {/* ABOUT */}
      <section className="py-32 px-6 bg-[#050505]">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          <div>

            <p className="text-[#d4af37] tracking-[0.35em] uppercase text-sm mb-6">
              About
            </p>

            <h3 className="text-4xl md:text-5xl font-light leading-tight">
              Authentic Japanese
              <br />
              Export Support
            </h3>

            <p className="mt-10 text-white/70 leading-[2.2]">
              YUKIMICHI provides export and procurement support
              from Sapporo, Japan.
              <br /><br />
              We help international customers access authentic
              Japanese products through trusted sourcing,
              local procurement, and global logistics support.
            </p>

          </div>

          {/* FOUNDER IMAGE */}
          <div className="overflow-hidden border border-white/10">

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1974&auto=format&fit=crop"
              alt="Founder"
              className="w-full h-full object-cover"
            />

          </div>

        </div>

      </section>

    </main>
  );
}
```
