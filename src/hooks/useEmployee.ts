import { useState } from 'react';
import { Employee, ResponseData } from '../types/Users';

export default function useEmployees() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const addEmployee = async (formData: FormData): Promise<Employee | null> => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add employee');
      }
      const data = await response.json();
      return data.employee;
    } catch (err) {
      setError('An error occurred while adding employee');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async (): Promise<ResponseData | null> => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (err) {
      setError('An error occurred while fetching data');
      console.error(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { addEmployee, fetchEmployees, loading, error };
}