'use client'
import { useState, useEffect } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import useEmployees from '../hooks/useEmployee';
import { Employee, ResponseData } from '../types/Users';
import styles from './page.module.css';
import Link from 'next/link';
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react"

export default function Home() {
  const { addEmployee, fetchEmployees, loading, error } = useEmployees();
  const [message, setMessage] = useState('');
  const [staff, setStaff] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [isStaffAdded, setIsStaffAdded] = useState(false);
  const { data: session, status } = useSession()

  const handleSubmit = async (formData: FormData) => {
    const result = await addEmployee(formData);
    if (result) {
      setNewStaffName(result.firstname);
      setIsStaffAdded(true);
    }
  };

  const handleFetchMessage = async () => {
    const data = await fetchEmployees();
    if (data) {
      setMessage(data.message);
      setStaff(data.staff[0]?.firstname || '');
    }
  };

  return (
    <div className={styles.main}>
      <h1>Welcome</h1>
      <div className={styles.welcomeMessage}>
        {status === 'loading' ? (
          'Loading...'
        ) : (
          <>{session?.user ? session.user.name : "Guest"}</>
        )}
      </div>

      <div className={styles.content}>
        <button onClick={handleFetchMessage} disabled={loading} className={styles.button}>
          {loading ? 'Fetching...' : 'Fetch Message'}
        </button>
        <EmployeeForm onSubmit={handleSubmit} isLoading={loading} />
        {isStaffAdded && <div className={styles.success}>The staff {newStaffName} has been created</div>}
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.message}>The message: {message}</div>
        <Link href='/login' className={styles.linkButton}>Login Page</Link>
      </div>
    </div>
  );
}