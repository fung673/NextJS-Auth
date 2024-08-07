import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          console.log('Credentials:', credentials);
          const res = await fetch("http://localhost:3000/api/auth/custom-login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });
      
          console.log('Response status:', res.status);
          const responseText = await res.text();
          console.log('Response text:', responseText);

          let data;
          try {
            data = JSON.parse(responseText);
          } catch (parseError) {
            console.error('JSON parse error:', parseError);
            throw new Error('Failed to parse server response');
          }
      
          if (res.ok && data) {
            return data;
          } else {
            throw new Error(data.error || 'Authentication failed');
          }
        } catch (error: any) {
          ///console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/Login',
  },
  session: {
    strategy: "jwt",
    maxAge: 10,
  },
});

export const GET = handler;
export const POST = handler;