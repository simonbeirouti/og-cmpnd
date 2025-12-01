import ShuffleText from "@/components/ShuffleText/ShuffleText";
import Image from "next/image";
import "./proposal.css";
import SignupForm from "./SignupForm";
import { getInterestedCount } from "./actions";

const proposalItems = [
    {
        title: "Demonstrate living design systems.",
        text: "Transform invisible ecological processes into tangible design experiences. By integrating live algae cultures that absorb carbon dioxide and release oxygen, the work highlights how biological systems can become active, functional components within our built environments.",
        image: "/mdw/moss.png",
        alt: "Living design systems"
    },
    {
        title: "Advance circular and bio-based material design.",
        text: "Showcase seaweed as a renewable and biodegradable material that can replace extractive, non-renewable resources. The installation encourages designers and audiences to imagine a circular design economy grounded in living, regenerative materials.",
        image: "/mdw/packaging.png",
        alt: "Circular material design"
    },
    {
        title: "Reframe human–nature relationships.",
        text: "Invite visitors to engage sensorially with algae and seaweed, to breathe with them, observe their rhythms, and reflect on the interconnectedness of human and marine life.",
        image: "/mdw/seabath.png",
        alt: "Human-nature relationships"
    },
    {
        title: "Bridge research and experience.",
        text: "Merge biological knowledge with design practice to create accessible, multisensory storytelling around sustainability and material futures.",
        image: "/mdw/lab.png",
        alt: "Research and experience"
    },
    {
        title: "Inspire design as a restorative force.",
        text: "Aligning with the Melbourne Design Week 2026 theme Design the world you want, the installation positions design as a catalyst for ecological empathy and systemic change.",
        image: "/mdw/blocks.png",
        alt: "Design as a restorative force"
    }
];

export default async function MDWProposal() {
    const initialCount = await getInterestedCount();
    return (
        <section className="updates">
            <div className="container">
                <div className="updates-container">
                    <section className="header-section">
                        <ShuffleText as="h1" text="MDW Proposal" />
                    </section>

                    <div className="mdw-intro-container">
                        <div className="mdw-intro-inner">
                            <div className="mdw-intro-col">
                                <p className="mdw-intro-label" style={{ marginBottom: "1em" }}>
                                    // Breathing with Algae and Seaweed
                                </p>
                                <div className="mdw-intro-copy">
                                    <p>
                                        Imagine stepping into a world where design and nature breathe in harmony, inviting you to rediscover our planet's innate ability to heal itself. Breathing with Algae and Seaweed, a captivating living installation proposed by Compound for Melbourne Design Week, transforms the ocean's most remarkable carbon absorbers into an immersive experience. Through elegant transparent vessels teeming with vibrant microalgae, you'll witness the magic of photosynthesis unfolding in real time, as the system gently purifies the air and infuses it with fresh oxygen. Crafted from innovative seaweed-derived bioplastics and bio-composites, the structure embodies a gentle shift toward regenerative practices, fostering a circular economy that nurtures rather than depletes. Echoing the theme "Design the World You Want," this project beckons us to envision built environments that partner with living systems, restoring balance and sparking wonder in our shared future.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="proposal-grid">
                        {proposalItems.map((item, index) => (
                            <div key={index} className="proposal-item">
                                <div className="proposal-content">
                                    <h2 className="proposal-title">{item.title}</h2>
                                    <p className="proposal-text">{item.text}</p>
                                </div>
                                <div className="proposal-image-wrapper">
                                    <Image
                                        src={item.image}
                                        alt={item.alt}
                                        width={600}
                                        height={400}
                                        className="proposal-image"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="signup-section-wrapper">
                        <SignupForm initialCount={initialCount} />
                    </div>
                </div>
            </div>
        </section>
    );
}