'use client'
import { FormEvent, useState } from 'react';
import styles from './page.module.css'

type Employee = {
  id: number;
  firstname: string;
  lastname: string;
  employeenumber: number;
  salary: number;
  country: string;
};

type ResponseData = {
  message: string;
  staff: Employee[];
};

type FormData = {
  firstName: string;
  lastName: string;
  employeenumber: string;
  salary: string;
  country: string;
};

export default function Home() {
  const [message, setMessage] = useState('');
  const [staff, setStaff] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [isStaffAdded, setIsStaffAdded] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('');
    setIsStaffAdded(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to add staff');
      }

      const responseData = await response.json();
      setNewStaffName(responseData.employee.firstname);
      setIsStaffAdded(true);
      form.reset(); // Reset the form after successful submission
    } catch (err) {
      setError('An error occurred while adding staff');
      console.error(err);
    }
  }

  const fetchMessage = async () => {
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: ResponseData = await response.json();
      setMessage(data.message);
      setStaff(data.staff[0]?.firstname || '');
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
    }
  };

  return (
    <div className={styles.main}>
      <button onClick={fetchMessage}>Fetch Message</button>
      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>First name:</label>
        <input type="text" name="firstName" required />
        <label className={styles.label}>Last name:</label>
        <input type="text" name="lastName" required />
        <label className={styles.label}>Employee number:</label>
        <input type="number" name="employeenumber" required />
        <label className={styles.label}>Salary:</label>
        <input type="number" name="salary" step="0.01" required />
        <label className={styles.label}>Country:</label>
        <input type="text" name="country" required />
        <button type="submit" className={styles.button}>Submit</button>
      </form>
      {isStaffAdded && <div>The staff {newStaffName} has been created</div>}
      {error && <div className={styles.error}>{error}</div>}
      <div>The message: {message} {staff}</div>
    </div>
  );
}