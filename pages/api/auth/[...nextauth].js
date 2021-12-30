import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
            identifier: credentials.email,
            password: credentials.password,
          })

          if (data) {
            console.log('authorized!', data)

            return data
          } else return null
        } catch (e) {
          // console.log('caught error');
          // const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          // throw new Error(errorMessage + '&email=' + credentials.email)
          return null
        }
      },
    }),
  ],
  session: {
    jwt: true,
    maxAge: 1 * 3 * 60 * 60, // 3 hrs

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: 'test',
  pages: {
    signIn: '/login',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // Getting the JWT token from API response
    async jwt({ token, user }) {
      const isSignIn = user ? true : false

      if (isSignIn) {
        token.jwt = user.jwt

        token.id = user.user.id

        token.name = user.user.username

        token.email = user.user.email
      }

      return token
    },

    async session({ session }) {
      return session
    },
  },
}

export default NextAuth(options)
