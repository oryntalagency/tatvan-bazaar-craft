import { createFileRoute } from "@tanstack/react-router";
import { MapPin, QrCode, FlaskConical, ShieldCheck, FileCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-farm.jpg";

export const Route = createFileRoute("/story/traceability")({
  head: () => ({
    meta: [
      { title: "Traceability — Tatvan" },
      { name: "description", content: "From farm to jar — how we trace every ingredient back to the family that grew it." },
      { property: "og:title", content: "Traceability — Tatvan" },
      { property: "og:description", content: "From farm to jar, every ingredient at Tatvan is traceable." },
    ],
  }),
  component: TraceabilityPage,
});

function TraceabilityPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container-x relative py-20 text-primary-foreground">
          <p className="text-xs uppercase tracking-[0.35em] text-primary-foreground/80">Our Story</p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl md:text-6xl">Traceability</h1>
          <p className="mt-5 max-w-2xl text-lg text-primary-foreground/85">
            Every jar of Tatvan carries a story you can follow — from the exact
            farm and family, all the way to your kitchen.
          </p>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="font-display text-4xl text-primary">Farm to jar, in five steps</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-5">
          {[
            { icon: MapPin, t: "Farm mapped", d: "GPS-tagged plots, known by name." },
            { icon: ShieldCheck, t: "Grown clean", d: "No synthetic pesticides or fertilisers." },
            { icon: FlaskConical, t: "Lab tested", d: "Every batch, third-party verified." },
            { icon: QrCode, t: "Batch coded", d: "A unique QR on every jar." },
            { icon: FileCheck, t: "Report ready", d: "Scan to see the exact lot report." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
              <Icon className="mx-auto h-7 w-7 text-primary" />
              <h3 className="mt-3 font-display text-lg">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="container-x py-16 md:grid md:grid-cols-2 md:gap-12">
          <img src={heroImg} alt="Farm" className="h-full w-full rounded-2xl object-cover shadow-card" />
          <div className="mt-8 md:mt-0">
            <h2 className="font-display text-4xl text-primary">Know your farmer</h2>
            <p className="mt-4 text-foreground/80">
              We work with 40+ small farmer families across Uttarakhand, Madhya
              Pradesh and Kerala. Each partner is on a first-name basis with us.
            </p>
            <ul className="mt-6 space-y-3 text-foreground/80">
              <li>• Direct sourcing — no middlemen, no auctions.</li>
              <li>• Paid transparently, above local market rates.</li>
              <li>• Annual on-farm audits by our team.</li>
              <li>• Long-term commitments, not one-off orders.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="container-x py-16">
        <h2 className="font-display text-4xl text-primary">Lab reports, on every batch</h2>
        <p className="mt-3 max-w-2xl text-foreground/80">
          We test for pesticide residues, adulteration, microbial safety and
          nutritional markers. Reports are published for every batch we ship.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { b: "Batch H-2408", p: "Raw Forest Honey", d: "Aug 2024" },
            { b: "Batch G-2409", p: "A2 Bilona Ghee", d: "Sep 2024" },
            { b: "Batch A-2410", p: "Stone-Ground Atta", d: "Oct 2024" },
          ].map((r) => (
            <div key={r.b} className="rounded-xl border border-border bg-card p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">{r.d}</p>
              <p className="mt-1 font-display text-xl text-primary">{r.p}</p>
              <p className="text-sm text-muted-foreground">{r.b}</p>
              <button className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                <FileCheck className="h-4 w-4" /> View report
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="container-x grid gap-8 py-14 text-center md:grid-cols-4">
          {[
            { n: "40+", l: "Partner farms" },
            { n: "100%", l: "Lot-level testing" },
            { n: "0", l: "Middlemen" },
            { n: "5", l: "Indian states" },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-4xl">{s.n}</p>
              <p className="mt-1 text-primary-foreground/80 text-sm">{s.l}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
