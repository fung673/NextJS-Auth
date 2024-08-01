import { FormEvent } from 'react';
import styles from '../page.module.css'

type EmployeeFormProps = {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
};

export default function EmployeeForm({ onSubmit, isLoading }: EmployeeFormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      <button type="submit" className={styles.button} disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}