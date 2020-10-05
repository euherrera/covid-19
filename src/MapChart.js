import React, { memo } from "react";
import axios from 'axios';
import AutoComplete from './AutoComplete';
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const rounded = num => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};
let newObj = {};
let newArr = [];

const loadCountries = () => {
    const URI = 'https://api.covid19api.com/countries'
               axios.get(URI)
        
        
                .then(resp => {
                    
                    let data = resp.data;
                     for (var { Country:  country} of data) {
                         newArr.push(country);
                     }
                     console.log(newArr);
                })
    
}

const loadCountry = (country) => {
        const url = 'https://api.covid19api.com/dayone/country/'
        
        
        
//          function removeDuplicates(newArr) {
//              newArr.splice(0, newArr.length, ...(new Set(newArr)))
//              
//          }
        
       
            axios.get(url + country)
        
        
                .then(res => {
                    console.log(res.data)
                    let data = res.data;
                    let newArr = [];
                     
                     var lastItem = data[data.length - 1];
//                     var slicedDate = lastItem.Date.slice(0, 10);
//                     console.log('last item: ' + lastItem.Country + ' ' + lastItem.Confirmed + ' ' + lastItem.Deaths + ' ' + lastItem.Recovered);
                     if(lastItem.Confirmed !== undefined){
                         newObj.confirmed = lastItem.Confirmed;
                         newObj.deaths = lastItem.Deaths;
                         newObj.recovered = lastItem.Recovered;
                     }
//                    for (var { Country:  country, Date: date, Confirmed: confirmed, Deaths: deaths, Recovered: recovered, Lat: Lat, Lon: Lon} of data) {
//                        
//
//                        newObj.country = country;
//                        var slicedDate = date.slice(0, 10);
//                        newObj.date = slicedDate;
//                        newObj.confirmed = confirmed;
//                        newObj.deaths = deaths;
//                        newObj.recovered = recovered;
//                        var coors = [];
//                        coors.push(Lon, Lat)
//                        newObj.coordinates = coors;
//                        newObj.markerOffset = 15;
//                        //console.log(newObj)
//                        newArr.push(newObj);
//                        removeDuplicates(newArr);
//                        console.log('data'+ country + 'date: ' + slicedDate);
//                        
//                    }
                 
                })
           
            
        
   return newObj;
}

const MapChart = ({ setTooltipContent }) => {
   loadCountries() 
  return (
      
    <div className="container">
      <h3 className='display-4 h3 text-center'>Coronavirus Data Worldwide</h3>
      
      <AutoComplete 
        options={newArr}
      />
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
             
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    
                          loadCountry(NAME);
                          setTooltipContent(
                            `Country: ${NAME}
                            Confirmed:  ${newObj.confirmed}
                            Deaths: ${newObj.deaths}` 
                            )
                     
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
   
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default memo(MapChart);
