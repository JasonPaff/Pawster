import React, { useState } from 'react'
import { connect } from 'react-redux'
import '../../styles/ServiceOptions.css'
import * as actionCreators from "../../store/action_creators/filterActionCreator"



const mapDispatchToProps = (dispatch) => {
    return {
        onToggleService: (value) => dispatch(actionCreators.toggleService(value)),
    }
}

const data = {
    "services": [
        {
            "id": 1,
            "name": "Services",
            "options": [
                {
                    "id": 11,
                    "name": "doesBoarding",
                    "label": "Boarding",
                },
                {
                    "id": 12,
                    "name": "doesHouseSitting",
                    "label": "Home Sitting",
                },
                {
                    "id": 13,
                    "name": "doesDropInVisits",
                    "label": "Drop-in Visits",
                },
                {
                    "id": 14,
                    "name": "doesDayCare",
                    "label": "Day Care",
                },
                {
                    "id": 15,
                    "name": "doesDogWalking",
                    "label": "Dog Walking",
                }
            ]
        },
    ]
}




function ServiceOptions(props) {
    const radioButtons = data.services.map(({ id, name, options}) => {
        return <div key={id}>
                    <h2>{name}</h2>
                    {options.map((opt) => {
                        console.log(name)
                        return <div key={opt.id} >
                            <input 
                            type="radio"
                            value={opt.name}
                            name={name}
                            onChange={() => props.onToggleService({[opt.name]: true})}
                            />
                            {opt.label}
                        </div>
                    })}
                </div>
    })

    // radio updates global state in real time?
    
    return (
      <div className="flex-col justify-center">
        <h1>Service Filter</h1>

        {radioButtons}
        
      </div>
    );
}
  
export default connect(null, mapDispatchToProps)(ServiceOptions);