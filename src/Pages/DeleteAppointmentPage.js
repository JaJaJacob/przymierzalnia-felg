import React from "react";
import { DeleteAppointmentCompConstExp } from "../Components/Navbar/deleteAppointment";
import './DeleteAppointmentPage.css';

export const DeleteAppointmentFormPageExp = () => {

    document.title = "Odwołaj wizytę"

    const handleFormSubmit = (inputDate, inputMail, inputPhone) => {
        fetch('/odwolaj-wizyte/odwolaj', {
            method: 'POST',
            body: JSON.stringify({
                appointment_date: inputDate,
                client_email: inputMail,
                client_phone_number: inputPhone,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(message => {
            console.log(message)  
        })
    }

    return (
        <>
            <div class='MainDiv3'>
                <label for="DeleteAppointmentPageLabel">Odwołaj wizytę</label>
                <label for="DeleteAppointmentPageDescriptionLabel">Wprowadź datę, adres e-mail oraz numer telefonu, aby odwołać wizytę</label>  
            </div>
            <div className="ContentDiv3">
                <DeleteAppointmentCompConstExp onFormSubmit={handleFormSubmit}/>
            </div>  
        </>
    )
}