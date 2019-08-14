import React from 'react'
import {logout} from  '@lib/Auth'

class LogoutPage extends React.Component {
  componentDidMount(){
    setTimeout(logout, 2000)
  }
  render () {
    return (
      <div>You have been logged out, please wait to be redirected to home page...</div>
    )
  }
}

export default LogoutPage