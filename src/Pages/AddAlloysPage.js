import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { AlloyCompConstExp } from '../Components/Navbar/addalloys'
import './AddAlloysPage.css';

export const AddNewAlloyPageConsExp = () => {

    document.title = "Dodawanie felgi"

    const [alloy, setAlloy] = useState()

    useEffect(() => {
        fetch('/add-alloy-348968392197572812234').then(response => {
            if (response.ok) {
                return response.json()
            }
        }).then(data => setAlloy(data))
    }, [])

    const handleFormSubmit = (inputManufacturer, inputModel, inputCatalogNumber, inputSizes, inputWidth, inputColors, inputETS, inputBPS, inputCBS, inputPhoto) => {
        fetch('/add-alloy-348968392197572812234', {
            method: 'POST',
            body: JSON.stringify({
                alloyManufacturer: inputManufacturer,
                alloyModel: inputModel,
                alloyCatalogNumber: inputCatalogNumber,
                alloySizes: inputSizes,
                alloyWidths: inputWidth,
                alloyColors: inputColors,
                alloyETS: inputETS,
                alloyBPS: inputBPS,
                alloyCBS: inputCBS,
                alloyPhoto: inputPhoto
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
            <div class='MainDiv7'>
                <label for="AddAlloyLabel">Dodaj felgę</label>
            </div>
            <AlloyCompConstExp listOfAlloys={alloy}
            onFormSubmit={handleFormSubmit}/>
        </>
    )

}