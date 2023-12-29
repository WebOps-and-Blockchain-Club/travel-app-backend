let nodeGeocoder = require('node-geocoder');
const axios = require("axios");

let options = {
    provider: 'openstreetmap'
  };

  const fetchData = async (a) => {
    try {
      const response = await axios.get(`https://api.geoapify.com/v2/places?categories=public_transport&filter=circle:${a[0].longitude},${a[0].latitude},5000&bias=proximity:${a[0].longitude},${a[0].latitude}&limit=10&apiKey=5c5169d803c740e4b9d1d375fedbe35a`)
      const result = response.data.features;
      result.forEach((feature) => {
        console.log(`Name: ${feature.properties.name}`);
        console.log(`Type: ${feature.properties.categories[1]}`);
        console.log(`Coordinates: ${feature.geometry.coordinates}`);
      });
    } catch (error) {
      console.error(error);
    }
  };  
   
let geoCoder = nodeGeocoder(options);

geoCoder.geocode('IIT Madras')
  .then(async (res)=> {
    await fetchData(res);
  })
  .catch((err)=> {
    console.log(err);
  });