console.log( 'Client side javascript file is loaded' );

/**
 * Fetch API isn't valid in Node JS
 * It's only valid in Client Side code
 * 
 * @uses Promises
 */

const $weatherForm = document.querySelector('form');
const $messageOne = document.querySelector('#message-1');
const $messageTwo = document.querySelector('#message-2');

$weatherForm.addEventListener( 'submit', (e) => {

  e.preventDefault();

  const $search = $weatherForm.querySelector('input');
  const location = $search.value;

  $messageOne.textContent = 'Loading...';
  $messageTwo.innerHTML = '';  

  /**
   * Calls App Weather endpoint
   */
  fetch( `/weather?address=${ location }` ).then( ( response ) => {
    response.json().then( ( data ) => {
      if( data.error ) {
        $messageOne.textContent = data.error;
      } else {
        // Show API results
        $messageOne.textContent = data.location;
        $messageTwo.innerHTML = data.forecast.replace(/(<\/?(?:a|p|img)[^>]*>)|<[^>]+>/ig, '$1');
      }
    });
  });
});