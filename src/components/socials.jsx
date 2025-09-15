import { SocialIcon } from "react-social-icons";

const socialLinks = [
    {
        href: 'https://www.linkedin.com/company/compoundcc',
        label: 'LinkedIn'
    },
    {
        href: 'https://www.instagram.com/cmpndcc/',
        label: 'Instagram'
    }
];

export default function Socials() {
    return (
        <div className="social-links">
            {socialLinks.map((social, index) => (
                <SocialIcon url={social.href} key={index} />
            ))}
        </div>
    );
}