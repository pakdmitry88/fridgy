import React, { Component } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import classes from './Login.module.scss'
import { changeInputAC } from '../../../redux/Actions/actions'
import { thunkLogin } from '../../../redux/Thunk/authThunk'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import AddFridgeItem from '../AddFridgeItem/AddFridgeItem'

class Login extends Component {
  componentDidUpdate() {
    if (this.props.loginStatus) {
      this.props.history.push('/')
    }
  }

  login = (e) => {
    e.preventDefault()
    //Refact Сделать валидацию
    const { loginText, loginPass } = this.props
    this.props.thunkLogin(loginText, loginPass)
  }

  changeInput = (e) => {
    const inputValue = e.target.value
    const inputName = e.target.name
    const formName = e.target.closest('form').name
    this.props.changeInputAC(formName, inputName, inputValue)
  }


  render() {
    const { loginText, loginPass, error } = this.props
    return (
      <Container>
      <section className='authPage'>
        <Form name="loginForm" className={classes.form + ' formSend'} onSubmit={this.login}>
          <legend>Login</legend>
          <Form.Group controlId="formBasicEmail">
            <Form.Control required value={loginText} onChange={this.changeInput} type="email" placeholder="Enter email" name="loginText" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control required value={loginPass} onChange={this.changeInput} type="password" placeholder="Password" name="loginPass" />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <Button variant="primary" type="submit" >
            Submit
          </Button>
          <div>
            <hr />
            <NavLink activeClassName={classes.active} to="/registration">Not registered? Register here </NavLink>
          </div>

          {
            <Form.Text className={`${error.status ? "red" : "hidden"} `}>error: {error.message}</Form.Text>
          }
        </Form>
      </section>
      </Container>
    )
  }
}

export default connect(
  (state) => ({
    ...state.authReducer.loginForm,
    loginStatus: state.authReducer.loginStatus,
    error: state.authReducer.error
  }),
  { changeInputAC, thunkLogin }
)(Login)
