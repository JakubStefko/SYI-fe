import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import AuthFooter from '../AuthFooter'
import { changeHandler } from '../../common/handlers'
import { isNotEmpty, isValidPassword } from '../../common/validators'
import '../../styles/auth.css'

function SignIn (props) {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  async function saveHandler(event) {
    event.preventDefault()

    try {
      await props.signIn(email, password)
    } catch (errorList) {
      errorListNotifier(errorList)
    }
  }

  useEffect(function () {
    if (props.token) {
      props.history.push('/')
    }
  })


  return (
    <section className='auth-container'>
      <form className='container' onSubmit={saveHandler}>
        <h1>Sign In</h1>

        <div className='input-container'>
          <header className={emailError ? 'error' : ''}>Email</header>
          <input
            placeholder='Enter your email'
            type='email'
            className={emailError ? 'input-error' : ''}
            autoFocus
            required
            value={email}
            title='Not a valid email adress'
            onChange={changeHandler.bind(this, setEmail, isNotEmpty, setEmailError)}
          />
        </div>

        <div className='input-container'>
          <header className={passwordError ? 'error' : ''}>Password</header>
          <input
            placeholder='Enter your password'
            type='password'
            className={passwordError ? 'input-error' : ''}
            required
            value={password}
            title='Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit'
            onChange={changeHandler.bind(this, setPassword, isValidPassword, setPasswordError)}
          />
        </div>

        <div className='forgot-password disabled'>
          <Link to='forgot-password'>Forgot password</Link>
        </div>

        <div>
          <button type='submit' className='primary-button'>
            Sign in
          </button>
        </div>

        <div className='middle'>
          <Link to='sign-up'>Create an account</Link>
        </div>
      </form>
      <AuthFooter />
    </section>
  )
}

SignIn.propTypes = {
  signIn: PropTypes.func,
  token: PropTypes.string,
}

export default SignIn