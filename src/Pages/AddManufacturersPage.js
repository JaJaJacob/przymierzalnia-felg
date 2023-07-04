import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { ManufacturerCompConstExp } from '../Components/Navbar/addnewmanufacturer';
import './AddNewManufacturerPage.css';

export const AddNewManufacturerPageConstExp = () => {

    document.title = "Dodawanie marki"

    const [manufacturer, setManufacturer] = useState()

    useEffect(() => {
        fetch('/add-car-manufacturer-16782648965927349587367').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setManufacturer(data))
        console.log("test")
    }, [])

    const handleFormSubmit = (inputManufacturer) => {
            fetch('/add-car-manufacturer-16782648965927349587367', {
                method: 'POST',
                body: JSON.stringify({
                    manufacturer: inputManufacturer,
                }),
                headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json()).then(message => {
                console.log(message);
            })
    }
        return (
            <>  
                <div class='MainDiv5'>
                    <label for="AddManufacturerLabel">Dodaj markę</label>
                </div>        
                <ManufacturerCompConstExp listOfManufacturers={manufacturer}
                onFormSubmit={handleFormSubmit}/>
            </>
        )
}