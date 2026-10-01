import Image from 'next/image';
import './ContactCard.css';

export default function ContactCard() {
    return (
        <div className="contact-card-container">
            <div className="contact-card-inner">
                <div className="contact-banner">
                    <div className="banner-content">
                        <h3 className="banner-title">
                            <span className="light">Schedule</span>
                            <span className="bold">a quick call</span>
                            <span className="light">to discuss</span>
                            <span className="bold">your project</span>
                        </h3>
                    </div>
                    <div className="banner-image">
                        <Image
                            src="/nazmul.jpg"
                            alt="Nazmul Hoque"
                            width={300}
                            height={300}
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>

                <div className="contact-info">
                    <span className="contact-name">Nazmul Hoque</span>
                    <span className="contact-dot">•</span>
                    <span className="contact-title">Founder & Lead Motion Designer</span>
                </div>

                <div className="contact-actions">
                    <button className="btn-schedule">Schedule a call</button>
                    <a href="#" className="social-icon" aria-label="Instagram">
                        <svg viewBox="0 0 24 24"><path d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7ZM12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7ZM17.62 5.12C18.23 5.12 18.73 5.62 18.73 6.23C18.73 6.84 18.23 7.34 17.62 7.34C17.01 7.34 16.51 6.84 16.51 6.23C16.51 5.62 17.01 5.12 17.62 5.12ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" /></svg>
                    </a>
                    <a href="#" className="social-icon" aria-label="LinkedIn">
                        <svg viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C13.93 9.94 13 10.63 12.6 11.71V10.14H9.27V18.5H12.6V13.2A1.65 1.65 0 0 1 14.25 11.55C15.17 11.55 15.17 12.41 15.17 13.2V18.5H18.5M7.07 8.11A1.65 1.65 0 0 1 5.42 6.46C5.42 5.54 6.15 4.81 7.07 4.81A1.65 1.65 0 0 1 8.72 6.46C8.72 7.38 8 8.11 7.07 8.11M5.42 18.5V10.14H8.72V18.5H5.42Z" /></svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
