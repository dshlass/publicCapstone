import React from 'react';
import Logo from '../../assets/logo.png'

class Login extends React.Component {
  render() {
    return (
      <form className='login' onSubmit={this.props.verifyLogin}>
        <div className='login__main-wrapper'> 
          <div className='login__logo-container'>
            <img className='login__logo' src={Logo} alt='company logo'/>
          </div>
          <div className='login__flex-container'>
            <label className='login__label' htmlFor='username'>Username</label>
            <input className='login__input'style={this.props.slideOutInput} type='text' name='username' required ref={this.props.username}/>
          </div>
          <div className='login__flex-container'>
            <label className='login__label' htmlFor='password'>Password</label>
            <input className='login__input' style={this.props.slideOutInput} type='password' name='username' required ref={this.props.password}/>
          </div>
          <button className='login__submit'>Submit</button>
        </div>
      </form>
    )
  }
}

export default Login;
