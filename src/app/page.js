"use client";

import { useEffect, useRef } from "react";
// import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import Marquee from "@/components/Marquee/Marquee";
import Footer from "@/components/Footer/Footer";
import ShuffleText from "@/components/ShuffleText/ShuffleText";
import GeometricBackground from "@/components/GeometricBackground/GeometricBackground";

import "./home.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

const caseStudiesData = [
  {
    id: 1,
    title: "Industrial Carbon Capture Revolution",
    subtitle: "[ Green Energy Integration — Photobioreactor Systems ]",
    image: "/images/home/bioreactor.jpg",
    alt: "Photobioreactor system with green algae tanks",
    description: "State-of-the-art photobioreactor systems featuring vibrant green algae cultures positioned next to industrial power plants represent the future of sustainable energy integration. These glowing emerald tanks harness nature's oldest carbon sequester, transforming industrial emissions into clean energy solutions.",
    linkText: "Discover the Journey",
    href: "/archive"
  },
  {
    id: 2,
    title: "Edible Packaging Innovation",
    subtitle: "[ Sustainable Consumption — Biodegradable Solutions ]",
    image: "/images/home/packaging.jpg",
    alt: "People consuming biodegradable packaging materials",
    description: "Revolutionary edible packaging made from natural algae-based materials transforms how we think about waste. These colorful, nutritious wrappers decompose naturally into rich soil, creating a circular economy where packaging becomes part of the ecosystem rather than polluting it.",
    linkText: "Read Full Story",
    href: "/archive"
  },
  {
    id: 3,
    title: "Algae-Powered Water Purification",
    subtitle: "[ Environmental Remediation — Natural Treatment Systems ]",
    image: "/images/home/treatment.jpg",
    alt: "Water treatment facility using algae for purification",
    description: "Modern water treatment facilities harness vibrant green algae blooms to actively purify contaminated water, transforming murky polluted sources into crystal-clear streams. This eco-friendly remediation process demonstrates nature's incredible ability to heal our waterways through biological innovation.",
    linkText: "Explore the Exhibit",
    href: "/archive"
  },
  {
    id: 4,
    title: "Algae-to-Fuel Laboratory Breakthrough",
    subtitle: "[ Renewable Energy — Biomass Conversion Technology ]",
    image: "/images/home/bio-lab.jpg",
    alt: "Scientists converting algae biomass into biofuel",
    description: "High-tech laboratories where scientists process vibrant green algae biomass into golden bio-fuel represent the cutting edge of renewable energy. This revolutionary process transforms microscopic organisms into clean fuel for vehicles, offering a sustainable alternative to fossil fuels.",
    linkText: "Explore the Research",
    href: "/archive"
  },
  {
    id: 5,
    title: "Regenerative Agriculture Enhancement",
    subtitle: "[ Ecosystem Restoration — Algae-Based Fertilizers ]",
    image: "/images/home/farmer.jpg",
    alt: "Farmer applying algae-based fertilizer to crops",
    description: "Farmers using algae-derived liquid fertilizers create thriving ecosystems with oversized healthy vegetables, blooming flowers, and diverse wildlife. This regenerative agriculture approach demonstrates how algae-based nutrients can restore soil health while supporting biodiversity and sustainable food production.",
    linkText: "Learn More",
    href: "/archive"
  }
];

export default function Home() {
  const container = useRef();

  // initialize Lenis smooth scrolling instance on window
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) {
      window.lenis = lenis;
    }

    return () => {
      window.lenis = null;
    };
  }, [lenis]);

  // controls geometric background animation on scroll
  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: ".intro",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yMove = -750 * progress;
          const rotation = 360 * progress;

          gsap.to(".geo-bg", {
            y: yMove,
            rotation: rotation,
            duration: 0.1,
            ease: "none",
            overwrite: true,
          });
        },
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  // handles case studies image pinning and scale animations on scroll
  useGSAP(
    () => {
      const images = gsap.utils.toArray(".case-studies-img");

      images.forEach((img, i) => {
        const imgElement = img.querySelector("img");

        ScrollTrigger.create({
          trigger: img,
          start: "top bottom",
          end: "top top",
          onUpdate: (self) => {
            gsap.to(imgElement, {
              scale: 2 - self.progress,
              duration: 0.1,
              ease: "none",
            });
          },
        });

        ScrollTrigger.create({
          trigger: img,
          start: "top top",
          end: () =>
            `+=${
              document.querySelector(".case-studies-item").offsetHeight *
              (images.length - i - 1)
            }`,
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  // handles carousel slide transitions with clip-path animations
  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const projects = gsap.utils.toArray(".project");

      ScrollTrigger.create({
        trigger: ".carousel",
        start: "top top",
        end: `+=${window.innerHeight * (projects.length - 1)}`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress * (projects.length - 1);
          const currentSlide = Math.floor(progress);
          const slideProgress = progress - currentSlide;

          if (currentSlide < projects.length - 1) {
            gsap.set(projects[currentSlide], {
              clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
            });

            const nextSlideProgress = gsap.utils.interpolate(
              "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              slideProgress
            );

            gsap.set(projects[currentSlide + 1], {
              clipPath: nextSlideProgress,
            });
          }

          projects.forEach((project, index) => {
            if (index < currentSlide) {
              gsap.set(project, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
              });
            } else if (index > currentSlide + 1) {
              gsap.set(project, {
                clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
              });
            }
          });
        },
      });

      gsap.set(projects[0], {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis
      root
      options={{
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      }}
    >
      <div className="app" ref={container}>
        <section className="hero">
          <div className="hero-img">
            <img src="/images/home/industry.jpg" alt="" />
          </div>
          <div className="container">
            <div className="hero-copy">
              <div className="hero-copy-col">
                <ShuffleText as="h3" text="Welcome to" />
                <ShuffleText as="h1" text="Compound" />
              </div>
              <div className="hero-copy-col">
                <div className="hero-icon">
                  <img src="/images/home/hero-abstract-icon.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="intro" id="intro">
          <div className="geo-bg">
            <GeometricBackground />
          </div>
          <Marquee />
          <div className="intro-container">
            <div className="container">
              <div className="col">
                <p className="primary" style={{ marginBottom: "1em" }}>
                  // Setting the Scene
                </p>
                <div className="intro-copy">
                  <p>
                    Carbon dioxide is a greenhouse gas that is released into the atmosphere during the production of energy and within manufacturing processes. 
                  </p>
                  <p>
                    This process has led to a significant increase in global temperatures, leading to climate change and its associated impacts. Ever increasing, we need to slow down this process and find sustainable solutions. 
                  </p>
                  <p>
                    Micro and macro algae are natural carbon sinks that can help remove carbon dioxide from the atmosphere. Our aim is to harness the oldest sequester of carbon with modern solutions to decrease carbon dioxide sent into the atmosphere and grow micro, and macro algae to produce biofuel and other products. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="case-studies" id="case-studies">
          <div className="case-studies-header">
            <div className="container">
              <ShuffleText
                as="h2"
                text="How can micro and macro algae help us?"
                triggerOnScroll={true}
              />
            </div>
          </div>
        </section>

        <section className="case-studies-items">
          <div className="case-studies-items-content col">
            {caseStudiesData.map((study) => (
              <div key={study.id} className={`case-studies-item case-studies-item-${study.id}`}>
                <div className="container">
                  <h3>{study.title}</h3>
                  <p className="primary">{study.subtitle}</p>
                  <div className="case-studies-item-inner-img">
                    <img
                      src={study.image}
                      alt={study.alt}
                    />
                  </div>
                  <p>{study.description}</p>
                  {/* <div className="case-studies-item-inner-link">
                    <Link href={study.href}>{study.linkText}</Link>
                    <div className="link-icon">
                      <MdArrowOutward size={24} />
                    </div>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <div className="case-studies-items-images col">
            {caseStudiesData.map((study) => (
              <div key={study.id} className={`case-studies-img case-studies-img-${study.id}`}>
                <img src={study.image} alt="" />
                <div className="hero-img-overlay"></div>
                {/* <div className="case-studies-img-link">
                  <Link href={study.href}>
                    <span>
                      (&nbsp; View Article <MdArrowOutward />
                      &nbsp;)
                    </span>
                  </Link>
                </div> */}
              </div>
            ))}
          </div>
        </section>

        <section className="abstract-bg">
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
        </section>

        <section className="works" id="works">
          <div className="works-header">
            <div className="container">
              <ShuffleText
                as="h2"
                text="Nature alongside Modern technologies"
                triggerOnScroll={true}
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ReactLenis>
  );
}
