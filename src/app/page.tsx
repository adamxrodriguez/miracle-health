"use client";
import { useMemo, useState } from "react";
import MiracleCtaCard from "../components/MiracleCtaCard";
import { useAdvocates } from "../lib/hooks/useAdvocates";
import type { Advocate } from "../lib/api";

export default function Home() {
  const { advocates, isLoading, error } = useAdvocates();
  const [query, setQuery] = useState("");

  // Case-insensitive match across multiple fields
  const filtered = useMemo(() => {
    if (!query) return advocates;
    const q = query.toLowerCase();
    return advocates.filter((a) => {
      const fields = [
        a.firstName,
        a.lastName,
        a.city,
        a.degree,
        String(a.yearsOfExperience),
        ...(Array.isArray(a.specialties) ? a.specialties : []),
      ]
        .filter(Boolean)
        .map((v) => String(v).toLowerCase());
      return fields.some((f) => f.includes(q));
    });
  }, [advocates, query]);

  const clearQuery = () => setQuery("");

  return (
    <main className="min-h-screen ">
      {/* Banner */}
      <div
        id="banner"
        className="text-white pt-1"
        style={{ backgroundColor: "rgb(202, 138, 4)" }}
      >
        <div className="mx-auto max-w-7xl px-2 pb-4 pt-1 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mt-6 flex flex-col items-center justify-center gap-1 sm:flex-row">
              <div className="flex items-center gap-2 text-yellow-50">
                <span className="text-sm">
                  Miracle Health Providers are covered by your
                </span>
              </div>
              <div className="flex items-center gap-1 text-yellow-50">
                <img
                  src="/check-mark.svg"
                  alt="check-mark"
                  className="h-5 w-5"
                />
                <span className="text-sm">Medicare plan!</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-50">
                <a
                  href="https://www.linkedin.com/in/adamrodriguez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:text-white transition-colors flex items-center gap-1"
                >
                  Learn more about Adam Rodriguez
                  <img
                    src="/icon-arrow-right-white.svg"
                    alt="arrow"
                    className="h-3 w-3"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* END Banner */}

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8 flex flex-col items-start gap-6 sm:mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-28 place-items-center    shadow-yellow-200/50">
              <img
                src="/Miracle.svg"
                alt="Miracle"
                className="h-8 w-auto"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(75%) sepia(98%) saturate(7491%) hue-rotate(359deg) brightness(102%) contrast(105%)",
                }}
              />
            </div>

          </div>
        </header>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            Miracle Health Providers
          </h1>
          <p className="mt-1 mb-3 text-sm text-slate-600">
            Find the right advocate by name, city, degree, specialty, or years
            of experience.
          </p>
        </div>

        {/* Search */}
        <section 
          className="mb-6 rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm backdrop-blur sm:p-6"
          aria-label="Search advocates directory"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-xl">
              <label htmlFor="advocate-search" className="sr-only">
                Search advocates by name, city, degree, specialty, or years of experience
              </label>
              <input
                id="advocate-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search advocates…"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 pr-10 text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-yellow-600 focus:ring-4 focus:ring-yellow-500"
                aria-label="Search advocates"
                aria-describedby="search-status"
                aria-live="polite"
              />
              {query ? (
                <button
                  onClick={clearQuery}
                  type="button"
                  className="absolute inset-y-0 right-0 mr-2 grid place-items-center rounded-lg px-2 text-slate-500 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  aria-label="Clear search"
                >
                  ×
                </button>
              ) : null}
            </div>
            <div id="search-status" className="text-sm text-slate-600" aria-live="polite">
              {query ? (
                <span>
                  Searching for:{" "}
                  <span className="font-medium text-slate-800">{query}</span>
                </span>
              ) : (
                <span>Type to search the directory.</span>
              )}
            </div>
          </div>
        </section>

        {/* Content */}
        <section>
          {isLoading ? (
            <div className="grid place-items-center rounded-2xl border border-slate-200 bg-white/70 p-10 text-slate-600 shadow-sm">
              <Spinner />
              <p className="mt-3 text-sm">Loading advocates…</p>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-800">
              <p className="font-medium">We could not load the directory.</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div 
              className="rounded-2xl border border-slate-200 bg-white/70 p-10 text-center text-slate-600 shadow-sm"
              role="status"
              aria-live="polite"
            >
              <p className="text-base font-medium">
                No advocates match "{query}".
              </p>
              <p className="mt-1 text-sm">
                Try a different name, city, degree, specialty or years of
                experience.
              </p>
              <button
                type="button"
                onClick={clearQuery}
                className="mt-4 inline-flex items-center rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-black shadow hover:bg-gradient-to-r hover:from-yellow-500 hover:to-purple-600 transition-all duration-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2"
                aria-label="Reset search and show all advocates"
              >
                Reset search
              </button>
            </div>
          ) : (
            <DirectoryTable advocates={filtered} />
          )}
        </section>

        <div className="mt-10 ">
        <MiracleCtaCard
          eyebrow="I AM HERE FOR YOU"
          title="No Matter What You Need"
          subtitle="Give me a call or write me an email anytime. I will help you every step of the way."
          primaryText="Get Started:  Call me!"
          primaryHref="tel:7184836420"
          secondaryText="Learn More: Email me"
          secondaryHref="mailto:adamxrodriguez@gmail.com"
        />
          </div>

        {/* Footer */}
        <footer className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Miracle Health Providers App. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}

function DirectoryTable({ advocates }: { advocates: Advocate[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow">
      <div className="max-h-[70vh] overflow-auto" role="region" aria-label="Advocates directory table">
        <table 
          className="min-w-full table-fixed border-collapse"
          role="table"
          aria-label="Health care advocates directory"
        >
          <thead className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur">
            <tr className="text-left text-xs uppercase tracking-wider text-slate-600">
              <Th className="w-36">First Name</Th>
              <Th className="w-36">Last Name</Th>
              <Th className="w-40">City</Th>
              <Th className="w-40">Degree</Th>
              <Th>Specialties</Th>
              <Th className="w-44">Years of Experience</Th>
              <Th className="w-44">Phone</Th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {advocates.map((a, idx) => (
              <tr
                key={a.id ?? `${a.firstName}-${a.lastName}-${idx}`}
                className="hover:bg-purple-50/40 focus-within:bg-purple-50/40"
                tabIndex={0}
                role="row"
                aria-label={`${a.firstName} ${a.lastName}, ${a.degree} in ${a.city}`}
              >
                <Td>{a.firstName}</Td>
                <Td>{a.lastName}</Td>
                <Td>{a.city}</Td>
                <Td>{a.degree}</Td>
                <Td>
                  <div className="flex flex-wrap gap-1.5 py-1" role="list" aria-label="Specialties">
                    {(a.specialties || []).map((s, i) => (
                      <span
                        key={`${s}-${i}`}
                        className="rounded-full border border-purple-200 bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-800"
                        role="listitem"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </Td>
                <Td>
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {a.yearsOfExperience}
                  </span>
                </Td>
                <Td>
                  <a
                    href={`tel:${a.phoneNumber}`}
                    className="text-yellow-700 underline decoration-yellow-300 underline-offset-2 hover:text-yellow-800 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 rounded"
                    aria-label={`Call ${a.firstName} ${a.lastName} at ${a.phoneNumber}`}
                  >
                    {a.phoneNumber}
                  </a>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th className={`px-4 py-3 text-[11px] font-semibold ${className}`}>
      {children}
    </th>
  );
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`truncate px-4 py-3 text-sm text-slate-800 ${className}`}>
      {children}
    </td>
  );
}

function Spinner() {
  return (
    <svg
      className="h-6 w-6 animate-spin text-yellow-600"
      viewBox="0 0 24 24"
      aria-hidden="true"
      aria-label="Loading"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
