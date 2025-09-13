

import { useFormStatus } from "react-dom";

import { login } from './api/login';

function Submit() {
  const status = useFormStatus();
  console.log("LoginForm pending=", status.pending, " data=", status.data)

  return (
    <button disabled={status.pending}>
        {status.pending ? "Submitting..." : "Submit"}
    </button>)
}

const submitForm = async (e) => {
    e.preventDefault();
    let username: string = e.target.elements[0].value;
    let password: string = e.target.elements[1].value;
    //
    console.log("username: ", username, "password: ", password  );
    try {
      await login(username, password);
    //   navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
    }
  }  

export function LoginForm() {
    
    

    return (
        <>
         <form onSubmit={submitForm}>
            
                <label htmlFor='email'>Name</label>
                <input
                type='text'
                />
                <label htmlFor='password'>Password</label>
                <input
                type='password'
                />
            <Submit />
         </form>    


        </>
    )
}

