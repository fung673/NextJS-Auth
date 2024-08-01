export type Employee = {
    id: number;
    firstname: string;
    lastname: string;
    employeenumber: number;
    salary: number;
    country: string;
  };
  
  export type ResponseData = {
    message: string;
    staff: Employee[];
  };