import React, { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { inputStyles as styles } from "../assets/dummystyle.js";

export default function Input({
  value, onChange, label, placeholder, type = "text"
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputContainer(isFocused)}>
        <input type={type === "password" ? (showPassword ? "text" : "password") : type} 
        placeholder={placeholder} value={value}
        className={styles.inputField} onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}/>
        {type === "password" && (
          <button onClick={() => setShowPassword(!showPassword)} className={styles.showPassword}>
          {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
          </button>
        )}
      </div>
    </div>
  )
}
