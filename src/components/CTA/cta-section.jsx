import { Fragment } from 'react';
import ShuffleText from "@/components/ShuffleText/ShuffleText";
import ContactCTA from "@/components/ContactCTA/ContactCTA";
import Socials from "@/components/socials";

import "./cta.css"

export default function CTASection() {
    return (
        <Fragment>
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
                            text="Stay connected"
                            triggerOnScroll={true}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '2em' }}>
                        <Socials />
                    </div>
                </div>
                <ContactCTA />
            </section>
        </Fragment>
    )
}