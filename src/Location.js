import { useEffect, useState } from 'react';
import './Location.css';

function Location(){
    let [countries,setCountries]=useState([])
    let [states,setStates]=useState([])
    let [cities,setCities]=useState([])

    let [selectedCountry,setSelectedCountry]=useState("")
    let [selectedState,setSelectedState]=useState("")
    let [selectedCity,setSelectedCity]=useState("")


    useEffect(()=>{
        fetch("https://crio-location-selector.onrender.com/countries")
        .then((response)=>response.json())
        .then((data)=>{
            setCountries(data)
        })
        .catch((error)=>{console.log(error)})
    },[])

    const handleCountryChange=(event)=>{
        setSelectedState("");
        setSelectedCity("");
        setSelectedCountry(event.target.value)
        getStates(event.target.value)
    }
    function getStates(payload){
        fetch(`https://crio-location-selector.onrender.com/country=${payload}/states`)
        .then((response) => response.json())
        .then((data) => {
            setStates(data);
            setCities([]);
        })
        .catch((error) => console.error(error));
    }
    const handleStateChange=(event)=>{
        setSelectedCity("");
        setSelectedState(event.target.value)
        getCities(event.target.value)
    }
    const handleCityChange=(event)=>{
        setSelectedCity(event.target.value)
    }
    function getCities(payload){
        fetch(` https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${payload}/cities`)
        .then((response) => response.json())
        .then((data) => {
          setCities(data)
        })
        .catch((error) => console.error(error));
    }
    return(<>
    <h1>Select Location</h1>
    <div className="dropdownFlex">
    <select value={selectedCountry} onChange={handleCountryChange} >
    <option value="" disabled>
              Select Country
            </option>
        {countries.map((country,index)=>(
        <option key={country} value={country}>{country}</option>
        ))}
    </select>
    <select value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
    <option value="" disabled>
              Select State
            </option>
        {states.map((state,index)=>(
        <option key={state} value={state}>{state}</option>
        ))}
    </select>
    <select value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
    <option value="" disabled>
              Select City
            </option>
        {cities.map((city,index)=>(
        <option key={city} value={city}>{city}</option>
        ))}
    </select>
    </div>
    {selectedCountry && selectedCity && selectedState &&
    <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
    }
   
    </>)
}
export default Location;