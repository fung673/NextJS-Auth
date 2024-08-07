'use client';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../page.module.css'

const LoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      setLoginStatus(`Logged in as ${session?.user?.name || 'User'}`);
    } else if (status === 'unauthenticated') {
      setLoginStatus('Not logged in');
    }
  }, [status, session]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        username: account,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoginStatus('');
      } else if (result?.ok) {
        setLoginStatus(`Logged in as ${account}`);
        setError('');
      }
    } catch (error) {
      setError('An unexpected error occurred');
      setLoginStatus('');
    }
    setIsLoading(false);
  };

  const checkLoginStatus = () => {
    if (status === 'loading') {
      setLoginStatus('Checking login status...');
    } else if (status === 'authenticated') {
      setLoginStatus(`Logged in as ${session?.user?.name || 'User'}`);
    } else {
      setLoginStatus('Not logged in');
    }
  };

  return (
    <div className={styles.main}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Account:
          <input
            type="text"
            value={account}
            onChange={(event) => setAccount(event.target.value)}
            className={styles.input}
          />
        </label>
  
        <label className={styles.label}>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={styles.input}
          />
        </label>
  
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
      <div className={styles.statusSection}>
        <button onClick={checkLoginStatus} className={styles.button}>
          Check Login Status
        </button>
        <div className={styles.statusMessage}>
          {loginStatus && <p>{loginStatus}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;