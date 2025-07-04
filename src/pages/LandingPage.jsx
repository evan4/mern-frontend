import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutTemplate, Menu, X } from 'lucide-react';

import { landingPageStyles } from "../assets/dummystyle.js";
import { UserContext } from "../context/UserContext.jsx";
import { ProfileInfoCard } from "../components/Cards.jsx";


export default function LandingPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className={landingPageStyles.container}>
      {/*Header*/}
      <header className={landingPageStyles.header}>
        <div className={landingPageStyles.headerContainer}>
          <div className={landingPageStyles.logoContainer}>
            <div className={landingPageStyles.logoIcon}>
              <LayoutTemplate className={landingPageStyles.logoIconInner} />
            </div>
            <span className={landingPageStyles.logoText}>ResumeXpert</span>
          </div>
          {/*Mobile menu btn*/}
          <button className={landingPageStyles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ?
              <X size={24} className={landingPageStyles.mobileMenuIcon} /> :
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />}
          </button>
          {/*Desktop navigation*/}
          <div className="hidden md:flex item-center">
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button className={landingPageStyles.desktopAuthButton}
                onClick={() => setOpenAuthModal(true)}>
                <div className={landingPageStyles.desktopAuthButtonOverlay}></div>
                <span className={landingPageStyles.desktopAuthButtonText}>Get Started</span>
              </button>
            )}
          </div>
        </div>
        {/*Mobile menu */}
      </header>
    </div>
  )
}