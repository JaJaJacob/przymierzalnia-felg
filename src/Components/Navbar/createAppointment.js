import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
import './CreateAppointment.css';

export const CreateAppointmentCompConstExp = ({userInputDate, isFree, onFormSubmit}) =>
{
    const navigate = useNavigate();
    const defaultValues = {
        name: "",
        surname: "",
        mail: "",
        phone: "",
      };

    const [values, setValues] = useState(defaultValues);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
          });
          console.log(name, value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(isFree)
            onFormSubmit(values.name, values.surname, values.mail, values.phone, isFree)
            navigate('/')
                    
    }
    
    return (
        <>
        <div className = "MakeAppointmentForm">
            <div className = "AppointmentDate">
                Umawianie wizyty dnia {userInputDate}
            </div>
        <form onSubmit={handleSubmit}>
            <br></br>
            <input type='text' placeholder="Imię" required value={values.name} onChange={(handleChange)} name="name" label="name"></input><br></br><br></br>
            <input type='text' placeholder="Nazwisko" required value={values.surname} onChange={handleChange} name="surname" label="surname"></input><br></br><br></br>
            <input type='email' pattern="[^ @]*@[^ @]*" placeholder="Adres e-mail" required value={values.mail} onChange={handleChange} name="mail" label="mail"></input><br></br><br></br>
            <input type='text' placeholder="Numer telefonu" required value={values.phone} onChange={handleChange} name="phone" label="phone" minLength="9" maxLength="9"></input><br></br><br></br>
            <input type='submit' value="Umów mnie!"></input>
        </form>
        </div>
        </>      
    )
}