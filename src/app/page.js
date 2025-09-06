"use client";

import { useEffect, useRef } from "react";
// import Link from "next/link";
import Image from "next/image";
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
    title: "Micro & Macro Algae farming",
    subtitle: "[ C/Farm ]",
    image: "/home/bioreactor.jpg",
    alt: "Photobioreactor system with green algae tanks",
    description: "Utilise carbon from manufacturing and energy production to grow algae in dedicated photobioreactors. Positioned near emitters, this harnesses Earth's oldest carbon sequesterer to transform emissions into clean solutions.",
    linkText: "Discover the Journey",
    href: "/archive"
  },
  {
    title: "Earth and Human Safe Packaging",
    subtitle: "[ C/Labs ]",
    image: "/home/packaging.jpg",
    alt: "People consuming biodegradable packaging materials",
    description: "Single-use packaging and plastic-lined containers majorly contribute to global plastic waste. Algae-based alternatives reduce waste, foster sustainability, and maintain food safety standards, benefiting the environment instead of polluting it.",
    linkText: "Read Full Story",
    href: "/archive"
  },
  // {
  //   title: "Natural Water Purification",
  //   subtitle: "[ C/Farms ]",
  //   image: "/home/treatment.jpg",
  //   alt: "Water treatment facility using algae for purification",
  //   description: "Natural methods of water purification are essential for maintaining clean water sources. Algae-based systems sustainably treat wastewater by removing excess nutrients and pollutants, reducing energy costs and emissions while generating biomass for multiple applications. This benefits society through eco-friendly resource recovery, enabling future reuse of treated water for irrigation or industrial purposes.",
  //   linkText: "Explore the Exhibit",
  //   href: "/archive"
  // },
  {
    title: "Agriculture ",
    subtitle: "[ C/Labs ]",
    image: "/home/farmer.jpg",
    alt: "Farmer applying algae-based fertilizer to crops",
    description: "Algae-derived fertilisers, created from nutrient-absorbing biomass, enrich soil with organic NPK (Nitrogen, Phosphorus and Potassium), boosting crop yields and microbial health. It benefits the planet, while aiding farmers with cost-effective, sustainable options for enhanced productivity and soil longevity.",
    linkText: "Learn More",
    href: "/archive"
  },
  {
    title: "Algae to Bio-Fuel",
    subtitle: "[ C/Labs ]",
    image: "/home/bio-lab.jpg",
    alt: "Scientists converting algae biomass into biofuel",
    description: "Algae biofuel production harnesses photosynthetic growth to yield biodiesel, bioethanol, and biogas, capturing CO2 and using wastewater as a nutrient source for algae cultivation. This benefits society via renewable energy, emission reductions, and economic growth, while enabling treated water reuse for agriculture and industry.",
    linkText: "Explore the Research",
    href: "/archive"
  },
  {
    title: "Community initiatives",
    subtitle: "[ C/People ]",
    image: "/home/people.jpg",
    alt: "People in shallow water farming seaweed",
    description: "Strengthening coastal blue economies by supporting small-scale farmers, is vital to the success of regenerative systems. By sharing knowledge, skills, and resources, our community initiatives enable coastal growers to adopt sustainable practices that protect marine ecosystems and secure their livelihoods. At the same time, tourism and educational programs raise awareness, create new income streams, and foster deeper connections between people and the ocean.",
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
            `+=${document.querySelector(".case-studies-item").offsetHeight *
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
  // useGSAP(
  //   () => {
  //     if (typeof window === "undefined") return;

  //     const projects = gsap.utils.toArray(".project");

  //     ScrollTrigger.create({
  //       trigger: ".carousel",
  //       start: "top top",
  //       end: `+=${window.innerHeight * (projects.length - 1)}`,
  //       pin: true,
  //       pinSpacing: true,
  //       scrub: 1,
  //       invalidateOnRefresh: true,
  //       onUpdate: (self) => {
  //         const progress = self.progress * (projects.length - 1);
  //         const currentSlide = Math.floor(progress);
  //         const slideProgress = progress - currentSlide;

  //         if (currentSlide < projects.length - 1) {
  //           gsap.set(projects[currentSlide], {
  //             clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
  //           });

  //           const nextSlideProgress = gsap.utils.interpolate(
  //             "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  //             "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
  //             slideProgress
  //           );

  //           gsap.set(projects[currentSlide + 1], {
  //             clipPath: nextSlideProgress,
  //           });
  //         }

  //         projects.forEach((project, index) => {
  //           if (index < currentSlide) {
  //             gsap.set(project, {
  //               clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
  //             });
  //           } else if (index > currentSlide + 1) {
  //             gsap.set(project, {
  //               clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
  //             });
  //           }
  //         });
  //       },
  //     });

  //     gsap.set(projects[0], {
  //       clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
  //     });

  //     return () => {
  //       ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     };
  //   },
  //   { scope: container }
  // );

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
            <img src="/home/industry.jpg" alt="" />
          </div>
          <div className="container">
            <div className="hero-copy">
              <div className="hero-copy-col">
                <ShuffleText as="h3" text="Welcome to" />
                <ShuffleText as="h1" text="Compound" />
                <div className="hero-sdg">
                  <Image
                    src="/sdg/9.jpg"
                    alt="SDG 9"
                    width={120}
                    height={120}
                  />
                  <Image
                    src="/sdg/12.jpg"
                    alt="SDG 12"
                    width={120}
                    height={120}
                  />
                  <Image
                    src="/sdg/13.jpg"
                    alt="SDG 13"
                    width={120}
                    height={120}
                  />
                  <Image
                    src="/sdg/14.jpg"
                    alt="SDG 14"
                    width={120}
                    height={120}
                  />
                </div>
              </div>
              <div className="hero-copy-col">
                <div className="hero-icon">
                  <img src="/home/stencil.png" alt="" />
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
                    Carbon dioxide is part of earths natural cycle but human activity has pushed CO<span className="small">2</span> levels to record highs. Extra CO<span className="small">2</span> traps heat, drives climate change; turning the ocean acidic and disrupting ecosystems.
                  </p>
                  <p>
                    Micro and macro algae are natural carbon sinks that can help us sequester carbon. Our aim is to cut carbon emissions by using the oldest sequester of carbon — Algae!
                  </p>
                  <p>
                    By intertwining it with modern technology and sustainable farming practices; both on land and at sea; we can restore marine forests, regenerate biodiversity and provide scalable, nature-based climate solutions.
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
            {caseStudiesData.map((study, index) => (
              <div key={index} className={`case-studies-item case-studies-item-${index}`}>
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
            {caseStudiesData.map((study, index) => (
              <div key={index} className={`case-studies-img case-studies-img-${index}`}>
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

        <section className="founders-section">
          <div className="founders-container">
            <div className="founders-header">
              <h4>[ Meet the Founders ]</h4>
            </div>
            <div className="founders-grid">
              <div className="founder-item">
                <div className="founder-img">
                  <img src="/team/vasu.jpg" alt="Vasundhara Gaur" />
                  <div className="hero-img-overlay"></div>
                </div>
                <div className="founder-info">
                  <h4>Vasundhara Gaur</h4>
                  <p>[ C/EO ]</p>
                </div>
              </div>
              <div className="founder-item">
                <div className="founder-img">
                  <img src="/team/simon.jpg" alt="Simon Beirouti" />
                  <div className="hero-img-overlay"></div>
                </div>
                <div className="founder-info">
                  <h4>Simon Beirouti</h4>
                  <p>[ C/TO ]</p>
                </div>
              </div>
            </div>
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
