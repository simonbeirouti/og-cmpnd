"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";
import ShuffleText from "@/components/ShuffleText/ShuffleText";
import UpdateNavigator from "@/components/UpdateNavigator/UpdateNavigator";

import "./archive.css";

export default function UpdatePageClient({ update }) {
    const container = useRef();

    // controls pinning of the source section
    useGSAP(
        () => {
            let pinAnimation;

            const initPinning = () => {
                if (pinAnimation) {
                    pinAnimation.kill();
                }

                if (window.innerWidth > 900) {
                    pinAnimation = ScrollTrigger.create({
                        trigger: ".sticky-archive",
                        start: "top top",
                        endTrigger: ".gallery",
                        end: "bottom bottom",
                        pin: ".source",
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                    });
                }
            };

            initPinning();

            const handleResize = () => {
                initPinning();
            };

            window.addEventListener("resize", handleResize);

            return () => {
                if (pinAnimation) {
                    pinAnimation.kill();
                }
                window.removeEventListener("resize", handleResize);
            };
        },
        { scope: container }
    );

    return (
        <ReactLenis root>
            <div className="archive" ref={container}>
                <section className="archive-hero">
                    <div className="container">
                        <ShuffleText
                            as="h1"
                            text={update.title}
                        />
                        <div className="archive-hero-img-wrapper">
                            <div className="archive-hero-img-wrapper-row">
                                <p>+</p>
                                <p>+</p>
                                <p>+</p>
                            </div>
                            <div className="archive-hero-img-wrapper-row">
                                <div className="archive-hero-img">
                                    <img src={update.thumbnailImage} alt="" />
                                </div>
                            </div>
                            <div className="archive-hero-img-wrapper-row">
                                <p>+</p>
                                <p>+</p>
                                <p>+</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="sticky-archive" style={{ marginBottom: "100px" }}>
                    <div className="archive-col source">
                        <div className="container">
                            <div className="source-img">
                                <img src={update.featureImage} alt="" />
                            </div>
                            <div className="source-content">
                                <p className="primary">[ {update.title} ]</p>
                                <h4>{update.subtitle}</h4>
                                <p className="secondary" style={{ marginTop: "1rem" }}>{update.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="archive-col gallery">
                        <div className="container">
                            <div className="gallery-copy">
                                <div dangerouslySetInnerHTML={{ __html: update.body.html }} />
                                {/* <div className="gallery-images-container">
                                    <div className="gallery-row main-img">
                                        <img src="/images/home/prompt-eg-2.jpeg" alt="" />
                                    </div>
                                    <div className="gallery-row sub-images">
                                        <div className="sub-images-col">
                                            <img src="/images/home/prompt-1.jpeg" alt="" />
                                        </div>
                                        <div className="sub-images-col">
                                            <img src="/images/home/prompt-2.jpeg" alt="" />
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>

                <UpdateNavigator currentUpdate={update} mode="next" />
            </div>
        </ReactLenis>
    );
};