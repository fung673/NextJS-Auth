'use client';
import { signIn, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import styles from '../page.module.css'
import Table from "../../components/Table";

const DashboardPage = () => {
    const { data: session, status } = useSession();
    const [loginStatus, setLoginStatus] = useState('');
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === 'authenticated') {
            setLoginStatus(`Logged in as ${session?.user?.name || 'User'}`);
        } else if (status === 'unauthenticated') {
            setLoginStatus('Not logged in');
        }
    }, [status, session]);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (status === 'authenticated') {
                try {
                    const response = await fetch('/api/employees');
                    if (!response.ok) {
                        throw new Error('Failed to fetch employees');
                    }
                    const data = await response.json();
                    setEmployees(data);
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchEmployees();
    }, [status]);

    if (loginStatus === 'Not logged in') {
        return (
            <div className={styles.main}>
                <h1>Unauthorized</h1>
                <div className={styles.statusMessage}>You are not authorized to see this page.</div>
            </div>
        );
    }

    if (isLoading) return <div className={styles.main}>Loading...</div>;
    if (error) return <div className={styles.main}>Error: {error}</div>;

    return (
        <div className={styles.main}>
            <h1>Employee List</h1>
            <Table data={employees} />
        </div>
    );
}

export default DashboardPage;