import React, { useState } from 'react'
import { FaGoogle, FaGithub } from "react-icons/fa";
import "styles/LoginForm.css";
import { authService } from 'fbase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";



function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log('data->',data)
    } catch (error) {
      setError(error.message);
    } finally{
      setLoading(false);
    }
  };

  const toggleAccount = () => setNewAccount(prev => !prev);

  const onSocialClick = async (e) => {
    const { target: { name } } = e;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log('data->',data)
  };

  const onChange = (e) => {
    const { target: { name, value } } = e;
    if (name === "email") {
      setEmail(value);
      console.log(value); // 이메일 상태의 변화를 확인
    } else if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div className='login-wrapper'>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Sign in</h2>
          <div className='inputbox'>
          <input type="email" id="email" name="email" required value={email} onChange={onChange} />
          <span>Username</span>
          <i></i>
          </div>
          <div className='inputbox'>
          <input type="password" id="password" name="password" required value={password} onChange={onChange} />
          <span>Password</span>
          <i></i>
          </div>
          <div class="links">
            <a href='#'>Forgot Password</a>
            <a href='#' onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</a>
          </div>         
          <input type='submit' value="Login"></input>
          {error && <span className='error'>{error}</span>}
          <div className='social-login'>
          <button onClick={onSocialClick} name="google" className='Googlebtn' >Continue with Google <i><FaGoogle /></i></button>
          <button onClick={onSocialClick} name="github" className='Githubbtn'>Continue with Github <i><FaGithub /></i></button>
        </div>
        </form>

      </div>
    </div>
  );
}
export default LoginForm