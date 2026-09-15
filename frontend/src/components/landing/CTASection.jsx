import { Link } from "react-router-dom";

function CTASection() {
    return (
        <section className="section container">
            <div className="cta-section">
                <h2>Ready to organize your thoughts?</h2>
                <p>Join thousands of people who trust SmartNotes to capture, organize and remember everything that matters.</p>
                <Link to="/register" className="btn btn--secondary btn--lg">
                    Get Started for Free <i className="fa-solid fa-arrow-right" />
                </Link>
            </div>
        </section>
    );
}

export default CTASection;

