"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Project = {
  name: string;
  desc: string;
  chips: string[];
  image: string;
  live: string;
};

type MoreProject = {
  name: string;
  tagline: string;
  desc: string;
  chips: string[];
  image: string;
  live: string | null;
};

const PROJECTS: Project[] = [
  {
    name: "Nextly",
    desc: "Open-source headless CMS & visual page builder for Next.js — on npm and accepted into the Vercel OSS Program. Server-rendered blocks, field-level RBAC, version history, scheduled releases and pluggable DB/storage adapters.",
    chips: ["Next.js", "TypeScript", "Drizzle ORM", "Node.js", "TanStack Query", "Docker", "Monorepo"],
    image: "/projects/nextly-real.webp",
    live: "https://nextlyhq.com/",
  },
  {
    name: "RextAI",
    desc: "AI content-intelligence & SEO platform trusted by 500+ teams (4.8/5 on G2) — 2,000+ word E-E-A-T articles with a humanization layer, on-page SEO automation and one-click auto-publish to WordPress, Webflow, Ghost and Shopify.",
    chips: ["Next.js", "React", "TypeScript", "Node.js", "OpenAI API", "Tailwind CSS"],
    image: "/projects/rextai-real.webp",
    live: "https://rext.ai/",
  },
  {
    name: "HireIQ (Evalyn)",
    desc: "AI-powered recruitment & evaluation platform that cuts screening time by 90% — automated AI interviews, real-time coding assessments with instant scoring, and smart candidate matching with per-candidate AI insights.",
    chips: ["Next.js", "React", "TypeScript", "Node.js", "OpenAI API", "Tailwind CSS"],
    image: "/projects/hireiq-real.webp",
    live: "https://evalyn-omega.vercel.app/",
  },
  {
    name: "4Rivers Equipment",
    desc: "Enterprise e-commerce & rental platform for a John Deere / Wirtgen dealership serving three US states — migrated from WordPress to Nextly with shop filtering, customer accounts, quote-based checkout and CMS-driven pages.",
    chips: ["Next.js", "Nextly CMS", "React", "TypeScript", "Redux Toolkit", "Google Maps API"],
    image: "/projects/4rivers-real.webp",
    live: "https://4riversequipment.com/",
  },
];

const MORE_PROJECTS: MoreProject[] = [
  {
    name: "21Century Equipment",
    tagline: "John Deere Dealership E-Commerce",
    desc: "Rebuilt the John Deere dealership storefront on Nextly, migrating off WordPress — structured catalog browsing, cart & quote flows, dealer locator map, IntelliDealer customer portal and OEM parts portal.",
    chips: ["Next.js", "Nextly CMS", "Redux Toolkit", "Google Maps API"],
    image: "/projects/21century-real.webp",
    live: "https://21stcenturyequipment.com/",
  },
  {
    name: "The Backyard",
    tagline: "John Deere Residential Storefront",
    desc: "21st Century Equipment's dedicated residential John Deere store — equipment and parts search, shop and garage catalogs, dealer locations, events and blog, extending the dealership to suburban and rural homeowners.",
    chips: ["Next.js", "Nextly CMS", "React", "TypeScript"],
    image: "/projects/backyard-21st.webp",
    live: "https://thebackyard.com/",
  },
  {
    name: "Shopify CRO Studio",
    tagline: "Conversion Rate Optimization for Shopify Brands",
    desc: "CRO platform for Shopify / Shopify Plus brands — audits, A/B testing and page-speed work with measurable case-study lifts (+22% subscription rate, +14.2% mobile conversion), plus Shopify SEO, AI SEO and GEO.",
    chips: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/projects/shopify-cro-real.webp",
    live: "https://cro-nu.vercel.app/",
  },
  {
    name: "YouTube Automation",
    tagline: "Multi-Channel AI Content Factory",
    desc: "Four branded YouTube channels produced daily by GitHub Actions cron pipelines — Node.js engines for trend research, Ollama metadata and Whisper narration, published via the YouTube Data API with 5-platform cross-posting.",
    chips: ["Node.js", "GitHub Actions", "MCP", "Ollama", "Whisper"],
    image: "/projects/youtube-automation.webp",
    live: null,
  },
];

export default function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLElement>(null);
  const [expanded, setExpanded] = useState(false);

  const total = PROJECTS.length + (expanded ? MORE_PROJECTS.length : 0);
  const totalRef = useRef(total);
  totalRef.current = total;

  useEffect(() => {
    const mm = gsap.matchMedia(rootRef);

    // must match the @media block in globals.css exactly
    mm.add(
      "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
      () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self: ScrollTrigger) => {
              if (fillRef.current) {
                fillRef.current.style.transform = `scaleX(${self.progress})`;
              }
              if (countRef.current) {
                const idx =
                  Math.round(self.progress * (totalRef.current - 1)) + 1;
                countRef.current.textContent = String(idx).padStart(2, "0");
              }
            },
          },
        });

        gsap.from(".section__title > span", {
          yPercent: 110,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: pin, start: "top 80%" },
        });
      }
    );

    mm.add(
      "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
      () => {
        gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
          gsap.from(panel, {
            y: 70,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: panel, start: "top 88%" },
          });
        });
      }
    );

    return () => mm.revert();
  }, []);

  // recompute pinned-scroll distances after panels are appended/removed
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => window.clearTimeout(id);
  }, [expanded]);

  return (
    <section className="showcase" id="work" ref={rootRef}>
      <div className="showcase__pin" ref={pinRef}>
        <div className="showcase__head">
          <h2 className="section__title">
            <span>
              Selected <span className="accent">Builds</span>
            </span>
          </h2>
          <p className="showcase__count">
            <em ref={countRef}>01</em> — {String(total).padStart(2, "0")}
          </p>
        </div>
        <div className="showcase__track" ref={trackRef}>
          {PROJECTS.map((project, i) => (
            <article className="panel" key={project.name}>
              <div className="panel__info">
                <span className="panel__num" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="panel__name">{project.name}</h3>
                <p className="panel__desc">{project.desc}</p>
                <div className="panel__chips">
                  {project.chips.map((chip) => (
                    <span className="chip" key={chip}>
                      {chip}
                    </span>
                  ))}
                </div>
                <a
                  className="panel__link"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit live site ↗
                </a>
              </div>
              <div className="panel__media">
                <img
                  src={project.image}
                  alt={`${project.name} — screenshot`}
                  loading="lazy"
                />
              </div>
            </article>
          ))}

          {expanded &&
            MORE_PROJECTS.map((project, i) => (
              <article className="panel" key={project.name}>
                <div className="panel__info">
                  <span className="panel__num" aria-hidden="true">
                    {String(PROJECTS.length + i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="panel__name">{project.name}</h3>
                  <p className="panel__tagline">{project.tagline}</p>
                  <p className="panel__desc">{project.desc}</p>
                  <div className="panel__chips">
                    {project.chips.map((chip) => (
                      <span className="chip" key={chip}>
                        {chip}
                      </span>
                    ))}
                  </div>
                  {project.live ? (
                    <a
                      className="panel__link"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit live site ↗
                    </a>
                  ) : (
                    <span className="panel__link panel__link--static">
                      CI-run automation — no public URL
                    </span>
                  )}
                </div>
                <div className="panel__media">
                  <img
                    src={project.image}
                    alt={`${project.name} — ${project.live ? "screenshot" : "pipeline"}`}
                    loading="lazy"
                  />
                </div>
              </article>
            ))}

          <div className="panel panel--end">
            <p className="panel__end-label" aria-hidden="true">
              {expanded ? "$ all builds loaded ✓" : "$ load --more"}
            </p>
            <button
              type="button"
              className={`more-toggle${expanded ? " is-open" : ""}`}
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded
                ? "Show less"
                : `View ${MORE_PROJECTS.length} more projects`}
              <span className="more-toggle__icon" aria-hidden="true">
                ↓
              </span>
            </button>
          </div>
        </div>
        <div className="showcase__progress" aria-hidden="true">
          <i ref={fillRef} />
        </div>
      </div>
    </section>
  );
}
