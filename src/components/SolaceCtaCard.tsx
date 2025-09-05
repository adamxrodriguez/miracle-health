"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonLikeProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  "aria-label"?: string;
};

function ButtonLike({
  href,
  onClick,
  className = "",
  children,
  ...rest
}: ButtonLikeProps) {
  const base = (
    <button type="button" onClick={onClick} className={className} {...rest}>
      {children}
    </button>
  );
  if (href) {
    return (
      <Link
        href={href}
        className={className}
        {...(rest as ComponentPropsWithoutRef<"a">)}
      >
        {children}
      </Link>
    );
  }
  return base;
}

export type SolaceCtaCardProps = {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  primaryText?: string;
  primaryHref?: string;
  onPrimaryClick?: () => void;
  secondaryText?: string;
  secondaryHref?: string;
  onSecondaryClick?: () => void;
  className?: string;
};

export default function SolaceCtaCard({
  eyebrow = "WE'RE HERE FOR YOU",
  title = <>No Matter What You Need</>,
  subtitle = (
    <>
      Give us a call or write us an email anytime. We will help you every step
      of the way.
    </>
  ),
  primaryText = "Get Started",
  primaryHref,
  onPrimaryClick,
  secondaryText = "Learn More",
  secondaryHref,
  onSecondaryClick,
  className = "",
}: SolaceCtaCardProps) {
  return (
    <section
      role="region"
      aria-label="Support call to action"
      className={`relative overflow-hidden rounded-3xl border border-white/70 bg-[#173D36] shadow-[0_10px_30px_rgba(16,24,40,.18)] ${className}`}
    >
      {/* inner highlight border */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-emerald-900/40" />

      {/* Decorative curves */}
      <svg
        className="pointer-events-none absolute -bottom-6 left-0 h-[200%] w-full opacity-70"
        viewBox="0 0 1600 800"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M-10 620 C 400 540, 900 770, 1610 700"
          fill="none"
          stroke="rgb(241, 201, 113)"
          strokeWidth="3"
          opacity=".6"
        />
        <path
          d="M-10 690 C 450 660, 1050 860, 1610 820"
          fill="none"
          stroke="white"
          strokeWidth="2"
          opacity=".65"
        />
      </svg>

      <div className="relative z-[1] grid grid-cols-1 items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-3 lg:py-12">
        {/* Copy */}
        <div className="lg:col-span-2">
          <p className="text-[13px] font-semibold tracking-[.16em] text-amber-300">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-serif text-3xl leading-tight text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-emerald-50/90">
            {subtitle}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
          <ButtonLike
            href={primaryHref}
            onClick={onPrimaryClick}
            className="inline-flex min-w-[180px] items-center justify-center rounded-xl bg-gradient-to-b from-amber-300 to-amber-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-[0_6px_18px_rgba(217, 119, 6,.35)] ring-1 ring-amber-900/20 transition-transform hover:-translate-y-[1px] active:translate-y-0"
            aria-label={
              typeof primaryText === "string" ? primaryText : "Primary action"
            }
          >
            {primaryText}
          </ButtonLike>

          <ButtonLike
            href={secondaryHref}
            onClick={onSecondaryClick}
            className="inline-flex min-w-[180px] items-center justify-center rounded-xl border border-white/30 bg-[#275E55] px-6 py-3 text-base font-semibold text-white shadow-[0_6px_18px_rgba(2,44,34,.25)] ring-1 ring-black/0 hover:bg-[#2B6A60]"
            aria-label={
              typeof secondaryText === "string"
                ? secondaryText
                : "Secondary action"
            }
          >
            {secondaryText}
          </ButtonLike>
        </div>
      </div>
    </section>
  );
}
