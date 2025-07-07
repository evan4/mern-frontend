import React from 'react'

import { authStyles as styles } from "../assets/dummystyle.js";

export default function SingUp() {
  return (
    <div className={styles.signupContainer}>
      <div className={styles.headerWrapper}>
        <h3 className={styles.signupTitle}>Create Account</h3>
        <p className={styles.signupSubtitle}>Join thousands of professionals today</p>
      </div>
    </div>
  )
}
