import React, {useState, useEffect} from "react";
import { CreateAppointmentCompConstExp } from '../Components/Navbar/createAppointment'
import { useParams } from "react-router-dom";
import './CreateAppointmentPage.css';

export const CreateAppointmentFormPageConstExp = () => {

    var val = ""

    document.title = "Formularz wizytowy"

    const {appointment_date} = useParams()

    const checkFreenesxD = () => {
        fetch('/umow-wizyte/check-database-free-days', {
            method: 'POST',
            body: JSON.stringify({
                appointment_date: appointment_date,
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json()).then(data => console.log(data.available))
    }

    const handleFormSubmit = (inputName, inputSurname, inputMail, inputPhone, isFree) => {
            fetch('/umow-wizyte/stworz', {
                method: 'POST',
                body: JSON.stringify({
                    appointment_date: appointment_date,
                    client_name: inputName,
                    client_surname: inputSurname,
                    client_email: inputMail,
                    client_phone_number: inputPhone
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json()).then(message => {
                console.log(message)  
            })
            alert("Wizyta umówiona")
    }

    return (
        <>
            <div class='MainDiv4'>
                <label for="CreateAppointmentPageLabel">Umów wizytę</label>
                <label for="CreateAppointmentPageDescriptionLabel">Wprowadź imię, nazwisko, datę, adres e-mail oraz numer telefonu, aby zarejestrować wizytę</label>  
            </div>
            <CreateAppointmentCompConstExp
            userInputDate={appointment_date} 
            onFormSubmit={handleFormSubmit}/>
        </>
    )
}