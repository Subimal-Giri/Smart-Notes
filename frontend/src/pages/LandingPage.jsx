import LandingNavbar from "../components/landing/LandingNavbar";
import Hero from "../components/landing/Hero";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";

function LandingPage() {
    return (
        <div className="landing">
            <LandingNavbar />
            <Hero />
            <FeaturesSection />
            <HowItWorks />
            <CTASection />        
            <LandingFooter />
        </div>
    );
}

export default LandingPage;

