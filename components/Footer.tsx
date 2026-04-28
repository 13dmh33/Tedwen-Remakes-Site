import Logo from "./Logo";
export default function Footer() {
  return (
    <footer className="bg-warm-dark border-t border-border-gray py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Logo size={48} variant="light" />
          <div className="flex gap-4">
            <a href="https://www.instagram.com/TEDWENRemakesLLC" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-warm-gray hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="https://www.facebook.com/people/Tedwen-Remakes-LLC/100095170577049" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-warm-gray hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
            </a>
          </div>
        </div>
        <div className="border-t border-border-gray pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-warm-gray">
          <p>© {new Date().getFullYear()} Tedwen Remakes LLC. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
