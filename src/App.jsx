import {useState,useEffect} from "react";






function App() {


    const [countries,setCountries]=useState([]);
    const [selectedCountry,setSelectedCountry]=useState("");
    const [selectedState,setSelectedState]=useState("");
    const [selectedCity,setSelectedCity]=useState("");
    const [state,setState]=useState([]);
    const [city,setCity]=useState([]);
    
    const COUNTRYENDPOINT="https://crio-location-selector.onrender.com/countries";
    const STATEENDPOINT=`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
    const CITYENDPOINT=`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;

    useEffect(()=>{
      async function fetchCountries(){
        try{
        const response= await fetch(COUNTRYENDPOINT);
        const data=await response.json();
        setCountries(data);
        console.log(data);
      }
      catch(error){
        console.error("Error fetching data",error.message);
    }
  }
    fetchCountries();
    },[]);

    useEffect(()=>{
      fetch(STATEENDPOINT).then((response)=>response.json()).then((data)=>{
        setState(data);
      }).catch((error)=>console.error("Error fetching data: ",error))
    },[selectedCountry])

    useEffect(()=>{
      fetch(CITYENDPOINT).then((response)=>response.json()).then((data)=>{
        setCity(data);
      }).catch((error)=>console.error("Error fetching data: ",error))
    },[selectedCountry, selectedState])


    

    const handleCountry=(e)=>{
       setSelectedCountry(e.target.value);
    }

    const handleState=(e)=>{
       setSelectedState(e.target.value);
    }

    const handleCity=(e)=>{
       setSelectedCity(e.target.value);
    }

   


  return (
    <>
      <select style={{width:"350px", height:"25px",margin:"30px"}} onChange={e=>handleCountry(e)}>
        <option value="someOption">Select Country</option>
        {
          countries && countries!==undefined?
          countries.map((ctr)=>{
            return(
            <option key={ctr} value= {ctr}>{ctr}</option>
            )
          }):"No Country"
        }   
      </select>
      

      <select style={{width:"350px", height:"25px",margin:"30px"}} disabled={!selectedCountry} onChange={e=>handleState(e)} >
        <option value="someOption" >Select State</option>
        {
          state && state!==undefined?
          state.map((ctr)=>{
            return(
            <option key={ctr} value={ctr}>{ctr}</option>
            )
          }):"No State"
        }   
      </select>
     

      <select style={{width:"350px", height:"25px",margin:"30px"}} disabled={!selectedState} onChange={e=>handleCity(e)}>
        <option value="someOption">Select City</option>
        {
          city && city!==undefined?
          city.map((ctr)=>{
            return(
            <option key={ctr} value={ctr}>{ctr}</option>
            )
          }):"No City"
        }   
      </select>

        {(selectedCountry && selectedState && selectedCity)? 
          <h3 style={{textAlign:"center"}}>You selected {selectedCity}, {selectedState}, {selectedCountry}</h3>:""
        }

    </>
  )
}

export default App
