import React, {Component} from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const logout  = () => {
  cookie.remove('token')
  Router.push('/login')
}

export const login  = (token) => {
  cookie.set('token', token)
  Router.push('/dashboard')
}

export const withAuth = (AuthComponent) => {
    return class Authenticated extends React.Component {

      static async getInitialProps(ctx) {
        const token = auth(ctx)

        // Check if Page has a `getInitialProps`; if so, call it.
        const pageProps = AuthComponent.getInitialProps && await AuthComponent.getInitialProps(ctx);

        return { ...pageProps, token }
      }

      render() {
        return <AuthComponent {...this.props} />
      }
    }
}

export const auth = ctx => {
  const { token } = nextCookie(ctx)

  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    Router.push('/login')
  }

  return token
}