'use client'
import { useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import useEmployees from '../hooks/useEmployee';
import { Employee, ResponseData } from '../types/Users';
import styles from '../styles/page.module.css'


export default function Home() {
  const { addEmployee, fetchEmployees, loading, error } = useEmployees();
  const [message, setMessage] = useState('');
  const [staff, setStaff] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [isStaffAdded, setIsStaffAdded] = useState(false);

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
      <button onClick={handleFetchMessage} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Message'}
      </button>
      <EmployeeForm onSubmit={handleSubmit} isLoading={loading} />
      {isStaffAdded && <div className={styles.success}>The staff {newStaffName} has been created</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div>The message: {message} {staff}</div>
    </div>
  );
}