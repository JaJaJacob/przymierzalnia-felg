import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"
import './AddNewManufacturer.css';

export const ManufacturerCompConstExp = ({listOfManufacturers, onFormSubmit}) => {

    let isInDatabase = 0;
    const navigate = useNavigate();
    const defaultValues = {
        manufacturer: "",
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
        for (let i = 0; i < listOfManufacturers?.length; i++)
            if (values.manufacturer == listOfManufacturers?.[i].manufacturer)
                isInDatabase = 1;      

        if (isInDatabase == 0)
        {
            onFormSubmit(values.manufacturer) 
            alert("Dodaję do bazy danych")
        }
        else{
            alert("Istnieje już podana marka w bazie danych")
        }          
    }
    
    return (
        <>
        <div className = "AddManufacturerForm">
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="Marka" required value={values.manufacturer} onChange={(handleChange)} name="manufacturer" label="manufacturer"></input><br></br><br></br>
                <input type='submit' value="Dodaj pojazd"></input>
            </form>
        </div>
        </>      
    )

      
}