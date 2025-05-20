import React,{useState,useEffect} from 'react'
import axios from 'axios'


function Location() {
    const [ip, setIp] = useState(null)
    const [country, setCountry] = useState(null)
    const [region,setRegion] = useState(null)

    const getGeoLocation = async()=>{
        const response = await axios.get(`${process.env.REACT_APP_LOCAION_API_KEY}`)

        setIp(response.data.ip)
        setCountry(response.data.location.country)
        setRegion(response.data.location.region)
    }
    useEffect(()=>{
      getGeoLocation()
    },[])
  return (
    <div>
      <h6>Ip Address: {ip}</h6>  
      <h6>Country: {country}</h6>  
      <h6>Region: {region}</h6>  
    </div>
  )
}

export default Location