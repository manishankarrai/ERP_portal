export interface User {
    _id ?: string ;
    name: string;
    email?: string;
    token?: string;
    role?: 'manager' | 'employee' | 'admin' | '';
    password ?: string 
  }
  
