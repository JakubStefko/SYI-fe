import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/auth.css'
import { changeHandler } from '../../common/handlers'
import AuthFooter from '../AuthFooter'
import { isNotEmpty, isValidName, isValidPassword } from '../../common/validators'
import { notify } from '../'

function SignUp () {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [passwordRepeatError, setPasswordRepeatError] = useState(false)

  async function saveHandler(event) {
    event.preventDefault()

    try {
      await props.signUp(name, email, password)

      notify('User account created', 'INFO')
      props.history.push('/sign-in')

    } catch (errorList) {
      notify('Not implemented YET', 'ERROR')
    }
  }

  return (
    <section className='auth-container'>
      <form className='container' onSubmit={saveHandler}>
        <h1>Sign up</h1>

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
          <header className={nameError ? 'error' : ''}>Name</header>
          <input
            placeholder='Enter your name'
            type='string'
            className={nameError ? 'input-error' : ''}
            pattern="[A-Za-z0-9_-.]{3,30}"
            value={name}
            title='name must be at least 3 characters, no more than 30 characters, and must include only letters, digits or signs: \"_\", \"-\", \".\"'
            onChange={changeHandler.bind(this, setName, isValidName, setNameError)}
          />
        </div>

        <div className='input-container'>
          <header className={passwordError ? 'error' : ''}>Password</header>
          <input
            placeholder='Enter your password'
            type='password'
            className={passwordError ? 'input-error' : ''}
            required
            title='Password must be at least 4 characters, no more than 8 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit'
            pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$'
            value={password}
            onChange={changeHandler.bind(this, setPassword, isValidPassword, setPasswordError)}
          />
        </div>

        <div className='input-container'>
          <header className={passwordRepeatError ? 'error' : ''}>Repeat password</header>
          <input
            placeholder='Repeat your password'
            type='password'
            className={passwordRepeatError ? 'input-error' : ''}
            required
            title="Passwords doesn't match"
            pattern={`^${password}$`}
            value={passwordRepeat}
            onChange={changeHandler.bind(this, setPasswordRepeat, function (input) {
              return input === password
            }, setPasswordRepeatError)}
          />
        </div>

        <div>
          <button type='submit' className='primary-button'>
            Sign up
          </button>
        </div>

        <div className='middle'>
          <Link to='sign-in'>I already have an account</Link>
        </div>
      </form>
      <AuthFooter />
    </section>
  )
}

SignUp.propTypes = {
  signUp: PropTypes.func,
}

export default SignUp