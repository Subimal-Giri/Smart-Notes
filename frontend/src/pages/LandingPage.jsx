import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore.js";
import LandingNavbar from "../components/landing/LandingNavbar";
import Hero from "../components/landing/Hero";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import CTASection from "../components/landing/CTASection";
import LandingFooter from "../components/landing/LandingFooter";

function LandingPage() {
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    
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

