import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import './DeleteAppointment.css';

export const DeleteAppointmentCompConstExp = ({onFormChange, onFormSubmit}) =>
{
    const navigate = useNavigate();
    const initialValues = {
        mail: "",
        phone: "",
        date: ""
      };

    const [values, setValues] = useState(initialValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
          });
          console.log(name, value)
          onFormChange(values.date, values.mail, values.phone)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFormSubmit(values.date, values.mail, values.phone)
        alert('Wizyta została odwołana') 
        navigate('/')            
    }
    return (
        <>
        <div className = "DeleteAppointmentForm">
        <form onSubmit={handleSubmit}>
            <input type='date' placeholder="yyyy-mm-dd" onChange={handleChange} name="date" label="mail" required value={values.date}></input><br></br><br></br>
            <input type='email' pattern="[^ @]*@[^ @]*" placeholder="Adres e-mail" required value={values.mail} onChange={handleChange} name="mail" label="mail"></input><br></br><br></br>
            <input type='text' placeholder="Numer telefonu" required value={values.phone} onChange={handleChange} name="phone" label="phone" minLength="9" maxLength="9"></input><br></br><br></br>
            <input type='submit' value="Odwołaj mnie!"></input>
        </form>
        </div>
        </>      
    )
}