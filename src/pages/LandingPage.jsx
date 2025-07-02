import React, { useState } from "react";
import { LayoutTemplate, Menu, X } from 'lucide-react';

import { landingPageStyles } from "../assets/dummystyle.js";

export default function LandingPage() {
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
              <X size={24} className={landingPageStyles.mobileMenuIcon}/>:
              <Menu size={24} className={landingPageStyles.mobileMenuIcon} />}
          </button>
          {/*Desktop navigation*/}
          <div className="hidden md:flex item-center">
          </div>
        </div>
      </header>
    </div>
  )
}