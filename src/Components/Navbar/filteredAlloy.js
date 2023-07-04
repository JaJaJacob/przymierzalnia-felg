import React, {useState} from 'react';
import { useNavigate } from "react-router-dom"
import './FilteredAlloy.css';

export const FilteredAlloyCompConstExp = ({listOfAlloys}) => {

    if (!listOfAlloys){
        return ( 
            <></> 
        )
    }
    if (listOfAlloys) {
        return (
            <>
                {listOfAlloys?.map(alloy => {
                        return (
                            <div className='AlloyDivWrapper'>
                                <div className='AlloyDivHidden'>
                                    <label for='CatalogNumberLabel'>[{alloy.catalog_number}]<br></br></label>
                                    <label for='SizeLabel'>[{alloy.sizes}] cali<br></br></label>
                                    <label for='WidthLabel'>[{alloy.width}] J<br></br></label>
                                    <label for='ColorLabel'>[{alloy.colors}]<br></br></label>
                                    <label for='ETLabel'>[{alloy.ets}] ET<br></br></label>
                                    <label for='BPLabel'>[{alloy.bolt_patterns}] BP<br></br></label>
                                    <label for='CBLabel'>[{alloy.cb}] CB<br></br></label>
                                        
                                </div>
                                <div className='AlloyDiv'>                           
                                    <div className={alloy.id}>
                                        <div className="PhotoPlaceholder">
                                            <div className="photo" style={{backgroundImage: `url(${alloy.photo})`}}>                               
                                            </div>
                                        </div>
                                        <div className="AlloysLabelsPlaceholders">
                                            <div className="AlloyManufacturerPlaceholder">
                                                <label for="AlloyManufacturerLabel">{alloy.manufacturer}</label>
                                            </div>
                                            <div className="AlloyModelPlaceholder">
                                                <label for="AlloyModelLabel">{alloy.model}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>      
                            </div>
                            )
                        }
                    )
                }
            </>      
        )
    }
}