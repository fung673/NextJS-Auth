'use client'
import React from 'react';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styles from './SharedLayout.module.css';
interface SharedLayoutProps {
    children: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
    const { data: session } = useSession();

    return (
        <div className={styles.layout}>
            <nav className={styles.navbar}>
                <div className={styles.navitemsContainer}>
                    <Link href="/" className={styles.navItem}>Home</Link>
                    <Link href="/dashboard" className={styles.navItem}>Dashboard</Link>
                </div>
                <>                    {session ? (
                    <>
                        <button onClick={() => signOut()} className={styles.button}>Logout</button>
                    </>
                ) : (
                    <button onClick={() => window.location.href = '/login'} className={styles.button}>Login</button>
                )}</>
            </nav>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
};

export default SharedLayout;