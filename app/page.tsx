import Link from "next/link";
import { FileText, Radio, BarChart3, Users, MapPin, Building2 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-full">
      {/* Hero */}
      <section className="px-8 pt-16 pb-12 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded bg-primary/5 border border-primary/10">
          <Building2 size={16} className="text-primary" />
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            Municipality of Bagong Pag-asa
          </span>
        </div>
        <h1 className="text-3xl font-bold text-text-primary leading-tight mb-4">
          DigiTALINO: A Digital Intelligence Platform
          <br />
          <span className="text-primary">for a Smarter and Resilient Pag-asa</span>
        </h1>
        <p className="text-base text-text-secondary max-w-2xl mx-auto mb-10">
          Modernizing governance through modular digital services for 150,000
          citizens
        </p>
      </section>

      {/* Module Cards */}
      <section className="px-8 pb-12 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white border border-border rounded p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <h2 className="font-semibold text-text-primary">
                e-Services Modernization
              </h2>
            </div>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Digitizing frontline LGU services — reducing business permit
              processing from 10–15 days to 1–3 business days through parallel
              department processing and AI-powered document verification.
            </p>
            <div className="flex gap-3">
              <Link
                href="/citizen"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:bg-primary-dark transition-colors"
              >
                <Users size={14} />
                Citizen Portal
              </Link>
              <Link
                href="/staff"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border text-text-primary rounded hover:bg-surface transition-colors"
              >
                <FileText size={14} />
                Staff Portal
              </Link>
            </div>
          </div>

          <div className="bg-white border border-border rounded p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded bg-accent-red/10 flex items-center justify-center">
                <Radio size={20} className="text-accent-red" />
              </div>
              <h2 className="font-semibold text-text-primary">
                Disaster Risk Management
              </h2>
            </div>
            <p className="text-sm text-text-secondary mb-6 leading-relaxed">
              Real-time flood monitoring with IoT sensors, NLP-powered citizen
              SMS reporting, and automated early warning — protecting communities
              through technology.
            </p>
            <div className="flex gap-3">
              <Link
                href="/drrmo"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-accent-red text-white rounded hover:bg-red-700 transition-colors"
              >
                <MapPin size={14} />
                DRRMO Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Municipality Profile */}
      <section className="px-8 pb-12 max-w-5xl mx-auto">
        <div className="bg-white border border-border rounded p-6">
          <h3 className="font-semibold text-text-primary mb-4">
            Municipality Profile
          </h3>
          <div className="grid grid-cols-4 gap-6">
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                Classification
              </div>
              <div className="text-sm font-medium text-text-primary">
                First-Class LGU
              </div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                Population
              </div>
              <div className="text-sm font-medium text-text-primary">
                150,000 Residents
              </div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                Barangays
              </div>
              <div className="text-sm font-medium text-text-primary">
                Urban + Remote Coverage
              </div>
            </div>
            <div>
              <div className="text-xs text-text-muted uppercase tracking-wide mb-1">
                Executive View
              </div>
              <Link
                href="/mayor"
                className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                <BarChart3 size={14} />
                Mayor Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 pb-8 max-w-5xl mx-auto">
        <div className="text-center text-xs text-text-muted pt-6 border-t border-border">
          CSCI_67 — IM Summit 2026 Demo
        </div>
      </footer>
    </div>
  );
}
