
function LandingFooter() {
    return (
        <footer className="landing-footer container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <div className="landing-brand">
                        <div className="landing-brand__icon"><i className="fa-solid fa-note-sticky" /></div>
                        Smart Notes
                    </div>
                    <p>The simple way to capture ideas, organize your thoughts, and never miss what matters.</p>
                </div>
                <div className="footer-col">
                    <h5>Product</h5>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How it works</a>
                    <a href="#faq">FAQ</a>
                </div>
                <div className="footer-col">
                    <h5>Company</h5>
                    <a href="#">About</a>
                    <a href="#">Blog</a>
                    <a href="#">Contact</a>
                </div>
                <div className="footer-col">
                    <h5>Legal</h5>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} SmartNotes. All rights reserved.</span>
                <div className="footer-socials">
                    <a href="#"><i className="fa-brands fa-twitter" /></a>
                    <a href="#"><i className="fa-brands fa-github" /></a>
                    <a href="#"><i className="fa-brands fa-linkedin-in" /></a>
                </div>
            </div>
        </footer>        
    );
}

export default LandingFooter

