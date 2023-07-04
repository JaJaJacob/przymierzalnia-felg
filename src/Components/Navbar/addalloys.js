import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"
import './AddAlloys.css';

export const AlloyCompConstExp = ({listOfAlloys, onFormSubmit}) => {

    let isInDatabase = 0;
    const navigate = useNavigate();
    const defaultValues = {
        manufacturer: '',
        model: '',
        catalognumber: '',
        sizes: '',
        width: '',
        colors: '',
        ets: '',
        bps: '',
        cbs: '',
        photo: ''
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

    const handleChange2 = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value,
          });
          console.log(name, value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        for (let i = 0; i < listOfAlloys?.length; i++)
            if (values.catalognumber == listOfAlloys?.[i].catalognumber)
                isInDatabase = 1;      

        if (isInDatabase == 0)
        {
            if (values.manufacturer && values.model && values.catalognumber && values.sizes && values.width && values.colors && values.ets && values.bps && values.cbs && values.photo)
            {
                onFormSubmit(values.manufacturer, values.model, values.catalognumber, values.sizes, values.width, values.colors, values.ets, values.bps, values.cbs, values.photo)
                alert("Dodaję do bazy danych")
            }
            else 
            {
                alert("Uzupełnij wszystkie pola")
            }       
        }
        else{
            alert("Istnieje już podana marka w bazie danych")
        }                       
    }
    return (
        <>
            <div className = "AddAlloyForm">
            <div className = "AlloySelectionComponent">
            <form onSubmit={handleSubmit}>
                <div className = "ManufacturerModelDiv">
                    <div className = "ManufacturerDiv">
                        <label for="manufacturer" title="Wpisz producenta felgi">producent&nbsp;&nbsp;&nbsp;</label>
                        <input type='text' placeholder="producent" required value={values.manufacturer} onChange={(handleChange)} name="manufacturer" label="manufacturer"></input>
                    </div>
                    <div className = "ModelDiv">
                        <label for="model" title="Wpisz model felgi">model&nbsp;&nbsp;&nbsp;</label>
                        <input type='text' placeholder="model" required value={values.model} onChange={(handleChange)} name="model" label="model"></input>
                    </div>
                    <div className = "CatalogNumberDiv">
                        <label for="catalognumber" title="Wpisz numer katalogowy">nr. kat&nbsp;&nbsp;&nbsp;</label>
                        <input type='text' placeholder="numer katalogowy" required value={values.catalognumber} onChange={(handleChange)} name="catalognumber" label="catalognumber"></input>
                    </div>
                </div>
                <div className = "OtherDivs1">                  
                    <div className = "SizesDiv">
                    <label for="sizes" title="Wpisz rozmiary">rozmiary&nbsp;&nbsp;&nbsp;</label>
                    <input type='text' placeholder="rozmiary" required value={values.sizes} onChange={(handleChange)} name="sizes" label="sizes"></input>
                    </div>
                    <div className = "WidthDiv">
                    <label for="width" title="Wpisz szerokości">szerokości&nbsp;&nbsp;&nbsp;</label>
                    <input type='text' placeholder="szerokości" required value={values.width} onChange={(handleChange)} name="width" label="width"></input>
                    </div>
                    <div className = "ColorsDiv">
                    <label for="colors" title="Wpisz kolory">kolory&nbsp;&nbsp;&nbsp;</label>
                    <input type='text' placeholder="kolory" required value={values.colors} onChange={(handleChange)} name="colors" label="colors"></input>
                    </div>
                </div>
                <div className = "OtherDivs2">                  
                    <div className = "ETSDiv">
                    <label for="ets" title="Wpisz et">et&nbsp;&nbsp;&nbsp;</label>
                    <input type='text' placeholder="et" required value={values.ets} onChange={(handleChange)} name="ets" label="ets"></input>
                    </div>
                    <div className = "BPSDiv">
                    <label for="bps" title="Wpisz rozstaw śrub">bp&nbsp;&nbsp;&nbsp;</label>
                    <input type='text' placeholder="bp" required value={values.bps} onChange={(handleChange)} name="bps" label="bps"></input>
                    </div>
                    <div className = "CBSDiv">
                    <label for="cbs" title="Wpisz dostępne wielkości otworów centrujących">cb&nbsp;&nbsp;&nbsp;</label>
                    <input type='text' placeholder="cb" required value={values.cbs} onChange={(handleChange)} name="cbs" label="cbs"></input>
                    </div>
                    <div className = "PhotoDiv">
                    <label for="photo" title="Wpisz adres zdjęcia">zdj&nbsp;&nbsp;&nbsp;</label>
                    <input type='text' placeholder="link do zdjęcia" required value={values.photo} onChange={(handleChange)} name="photo" label="photo"></input>
                    </div>
                </div>
                <div className = "SubmitDiv">         
                    <input type='submit' value="dodaj felgę"></input>
                </div>
            </form>
            </div>
            </div>
        
        </>      
    )}