// ##  Footer Component

import Link from "next/link";
import React from "react";

export type FooterLink = {
  label: string | React.ReactNode;
  href: string;
  external?: boolean;
};
export type FooterColumn = { heading: string; links: FooterLink[] };

export type SolaceFooterProps = {
  brandName?: string;
  columns?: FooterColumn[];
  phone?: string;
  email?: string;
  address?: string;
  className?: string;
};

function NavItem({ link }: { link: FooterLink }) {
  const className =
    "text-sm text-emerald-50/90 hover:text-white transition-colors";

  // If label is a JSX element, render it directly without wrapping in Link/a
  if (React.isValidElement(link.label)) {
    return <div className={className}>{link.label}</div>;
  }

  if (link.external) {
    return (
      <a
        className={className}
        href={link.href}
        target="_blank"
        rel="noopener nofollow"
      >
        {link.label}
      </a>
    );
  }
  return (
    <Link className={className} href={link.href}>
      {link.label}
    </Link>
  );
}

export const DEFAULT_SPECIALTIES = [
  { label: "Elder Care", href: "/elder-care" },
  { label: "Chronic Illness", href: "/chronic-illness" },
  { label: "Cancer", href: "/cancer" },
  { label: "Stroke", href: "/stroke" },
  { label: "Misdiagnosis", href: "/misdiagnosis" },
  { label: "Healthcare Navigation", href: "/healthcare-navigation" },
  { label: "Dementia", href: "/dementia" },
  { label: "COPD", href: "/copd" },
  { label: "Alzheimer's", href: "/alzheimers" },
  { label: "Medical Bills", href: "/medical-bills" },
  { label: "Disability Support", href: "/disability-support" },
  { label: "Parkinson's", href: "/parkinsons" },
  { label: "Chronic Fatigue", href: "/chronic-fatigue" },
  { label: "Kidney Disease", href: "/kidney-disease" },
  { label: "Preventative Care", href: "/preventative-care" },
  { label: "Chronic Pain", href: "/chronic-pain" },
  { label: "Multiple Sclerosis", href: "/multiple-sclerosis" },
  { label: "Caregiver Support", href: "/caregiver-support" },
  { label: "End of Life Care", href: "/end-of-life-care" },
  { label: "New Diagnosis", href: "/new-diagnosis" },
] as const;

export default function SolaceFooter({
  brandName = "Find Solace, Inc.",
  columns,
  phone = "(240) 693-3281",
  email = "support@solace.health",
  address = "123 Palm Ave, Jacksonville, FL",
  className = "",
}: SolaceFooterProps) {
  const HIPAApic = "/HIPAA.png";
  const Partnerpic = "/partner.png";

  type SpecialtySectionProps = {
    title?: string;
    specialties?: readonly { label: string; href: string }[];
    onSelect?: (term: string) => void; // optional click handler to integrate with search
    className?: string;
  };

  function SpecialtySection({
    title = "Find an advocate by specialty",
    specialties = DEFAULT_SPECIALTIES,
    onSelect,
    className = "",
  }: SpecialtySectionProps) {
    return (
      <section
        className={`relative rounded-3xl bg-[#173D36] px-6 py-10 text-white sm:px-6 ${className}`}
      >
        {/* top divider */}
        <div className="absolute left-6 right-6 top-0 h-px bg-white/30" />

        {/* Header */}
        <h2 className="mb-6 mt-2  font-semibold tracking-tight ">{title}</h2>

        {/* Specialty grid (MAPPED) */}
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {specialties?.map((s) => (
            <li key={s.label} className="leading-7">
              <Link
                href={s.href}
                className="rounded-md text-left text-emerald-50 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300/60"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* bottom divider */}
        <div className="mt-10 h-px w-full bg-white/30" />

        {/* STATIC bottom content (no mapping) */}
        <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Our Mission */}
          <div>
            <h3 className=" font-semibold">Our Mission</h3>
            <p className="mt-4 max-w-md text-emerald-50/90">
              Solace&apos;s mission is to empower patients, improve outcomes,
              and restore the promise of the U.S. healthcare system.
            </p>
            <div className="mt-6 inline-flex items-center  rounded-xl   ">
              <img src="/partner.svg" alt="Partner" className="h-12 w-auto" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className=" font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-emerald-50/90">
              <li className="flex items-start gap-3">
                <img
                  src="/Mail_icon.svg"
                  alt="Email"
                  className="mt-1 inline-block h-5 w-5"
                />
                <a
                  className="hover:text-white"
                  href="mailto:hello@solace.health"
                >
                  hello@solace.health
                </a>
              </li>
              <li className="flex items-start gap-3">
                <img
                  src="/Phone_icon.svg"
                  alt="Phone"
                  className="mt-1 inline-block h-5 w-5"
                />
                <div>
                  <a className="hover:text-white" href="tel:2406933281">
                    (240) 693-3281
                  </a>
                  <p className="text-sm italic text-emerald-100/70">
                    9am to 5pm PT
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <img
                  src="/NotificationBell_icon.svg"
                  alt="Notification"
                  className="mt-1 inline-block h-5 w-5"
                />
                <a className="hover:text-white" href="#">
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className=" font-semibold">Company</h3>
            <ul className="mt-4 space-y-3 text-emerald-50/90">
              <li>
                <a className="hover:text-white" href="#">
                  Our Mission
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-white" href="#">
                  For Payers
                </a>
              </li>
            </ul>
          </div>

          {/* Recruiting */}
          <div>
            <h3 className=" font-semibold">Recruiting</h3>
            <ul className="mt-4 space-y-4 text-emerald-50/90">
              <li>
                <div className="text-emerald-100/80 flex items-center">
                  <img
                    src="/Search_icon.png"
                    alt="Search"
                    className="mr-2 h-5 w-5"
                  />
                  <em>For corporate roles:</em>
                </div>
                <a
                  className="mt-1 inline-block hover:text-white"
                  href="mailto:recruiting@solace.health"
                >
                  recruiting@solace.health
                </a>
              </li>
              <li>
                <div className="text-emerald-100/80 flex items-center">
                  <img
                    src="/Search_icon.png"
                    alt="Search"
                    className="mr-2 h-5 w-5"
                  />
                  <em>For advocate roles:</em>
                </div>
                <a
                  className="mt-1 inline-block hover:text-white"
                  href="mailto:advocate@solace.health"
                >
                  advocate@solace.health
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <footer
      className={`relative mt-12 bg-[#173D36] text-white ${className}`}
      aria-label="SOLACE HEALTH Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Brand + contact */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="grid h-12 w-28 place-items-center    shadow-emerald-200/50">
              <img
                src="/Solace.svg"
                alt="Solace"
                className="h-5 w-auto"
                style={{
                  filter:
                    "brightness(100%)   sepia(10%)   brightness(1) contrast(1.2)",
                }}
              />
            </div>
          </div>
        </div>

        <SpecialtySection />

        {/* bottom row */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/15 pt-6 text-xs text-emerald-100/80 sm:flex-row sm:items-center">
          <p className="italic">
            © {new Date().getFullYear()} {brandName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <span aria-hidden></span>
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <span aria-hidden></span>

            <img src={HIPAApic} alt="HIPAA" className="h-12 w-auto" />
          </div>
        </div>
      </div>
    </footer>
  );
}
