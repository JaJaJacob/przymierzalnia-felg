import React from 'react'
import './StartPage.css';

export const StartPage = () => {

    document.title = "Strona główna"

    return (
        <>         
            <div className='MainDiv'>   
                <label for="StartPageLabel">Zobacz jak to wszystko zmienia</label>
                <label for="StartPageDescription">Felgi są jak buty. Nie wyjdziesz bez nich z domu. <br></br>Kupisz takie, które pasują do Twojego stylu.</label>        
            </div>
        </>
    )  
}
