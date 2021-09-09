/**
 * Forecast custom service
 * @exports forecast to app.js
 * 
 */
 const request = require('postman-request');

 /**
  * 
  * Using Callback Abstraction Pattern
  * @param {string} lng Longitude
  * @param {string} lat Latitude
  * @param {function} callback forecast callback
  */
const forecast = ( lat, lng, callback ) => {
  const url = `http://api.weatherstack.com/current?access_key=5f2ef73ef5a30e700edad50847bd172c&query=${ parseFloat( lat ) },${ parseFloat( lng ) }`;
  request( { url, json: true }, ( error, { body } ) => {
    if( error ) {
      callback( 'Unable to connect to Weather service!', undefined );
    } else if ( body.error ){
      callback( 'Unable to find location', undefined );
    } else {
      callback( undefined,  `<img src="${ body.current.weather_icons[0] }" alt="${ body.current.weather_descriptions[0] }"/><p>It is currently ${ body.current.temperature } degrees out. It feels like ${ body.current.feelslike } out. There is a ${ body.current.precip }% chance of rain and finally there is a ${ body.current.wind_dir } Wind Direction.</p>` );
    }
  });
}

module.exports = { forecast };