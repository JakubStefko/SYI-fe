import React from 'react'
import PrivacyPolicy from '../../assets/privacy_policy.pdf'

function AuthFooter() {
  return (
    <footer>
      <select disabled value='en'>
        <option value='en'>English</option>
        <option value='pl'>Polski</option>
      </select>
      <a
        href={PrivacyPolicy}
        download='privacy_policy.pdf'
      >
        Privacy policy
      </a>
    </footer>
  )
}

export default AuthFooter
