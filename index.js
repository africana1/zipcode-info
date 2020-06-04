let zipForm = document.querySelector('#zipForm');
let mainOutput = document.querySelector('#output');
let spinner = document.querySelector('#spinner');
let country = document.querySelector('#country');
let input = document.querySelector('#input');
let iconCheck = document.querySelector('.icon-check');
let iconRemove = document.querySelector('.icon-remove');

//* listen for submit
zipForm.addEventListener('submit', getLocationInfo);

if (country.value == 'us') {
  input.setAttribute('placeholder', '00210 : 99950');
}

//* to change input placeholder
country.addEventListener('change', countryChange);
function countryChange() {
  input.value = '';
  iconCheck.style.display = 'none';
  iconRemove.style.display = 'none';
  if (country.value == 'us') {
    input.setAttribute('placeholder', '00210 : 99950');
  } else if (country.value == 'de') {
    input.setAttribute('placeholder', '01067 : 99998');
  } else if (country.value == 'dk') {
    input.setAttribute('placeholder', '0800 : 9990');
  } else if (country.value == 'es') {
    input.setAttribute('placeholder', '01001 : 52080');
  } else if (country.value == 'gt') {
    input.setAttribute('placeholder', '01001 : 22027');
  } else if (country.value == 'it') {
    input.setAttribute('placeholder', '00010 : 98168');
  } else if (country.value == 'za') {
    input.setAttribute('placeholder', '0002 : 9992');
  } else if (country.value == 'th') {
    input.setAttribute('placeholder', '10100 : 96220');
  } else if (country.value == 'ru') {
    input.setAttribute('placeholder', '101000 : 901993');
  } else if (country.value == 'se') {
    input.setAttribute('placeholder', '10005 : 98499');
  } else if (country.value == 'ch') {
    input.setAttribute('placeholder', '1000 : 9658');
  } else if (country.value == 'ar') {
    input.setAttribute('placeholder', '1601 : 9431');
  } else if (country.value == 'au') {
    input.setAttribute('placeholder', '0200 : 9726');
  } else if (country.value == 'at') {
    input.setAttribute('placeholder', '1010 : 9992');
  } else if (country.value == 'hr') {
    input.setAttribute('placeholder', '10000 : 53296');
  } else if (country.value == 'gb') {
    input.setAttribute('placeholder', 'AB1: ZE3');
  } else if (country.value == 'pk') {
    input.setAttribute('placeholder', '10010 : 97320');
  }
}

function getLocationInfo(e) {
  e.preventDefault();
  spinner.style.display = 'inline-block';
  //* get zip value from input
  const zip = input.value;
  const ctry = country.value;

  //* make request
  fetch(`https://api.zippopotam.us/${ctry}/${zip}`)
    .then((response) => {
      if (response.status != 200) {
        showIcon('remove');
        output.innerHTML = `
        <article class="message is-danger">
          <div class="message-body">
            ${zip} is an invalid zipcode, please try again
            <button class="delete"></button>
          </div>          
        </article> `;
        input.value = '';
        spinner.style.display = 'none';
        throw Error(response.statusText);
      } else if (response.status > 200) {
        output.innerHTML = `
        <article class="message is-danger">
          <div class="message-body">
          Connection Offline            
            <button class="delete"></button>
          </div>          
        </article> `;
        input.value = '';
        spinner.style.display = 'none';
      } else {
        showIcon('check');
        return response.json();
      }
    })
    .then((data) => {
      //* show location info
      //console.log(data);
      let output = '';

      data.places.forEach((place) => {
        output += `        
        <article class="message is-primary">
          <div class="message-header">
            <p>Location Info: </p>
            <button class="delete"></button>
          </div>
          <div class="message-body">
            <ul>              
              <li><strong> Country: ${data.country}</strong></li>
              <li>Abbreviation: ${data['country abbreviation']}</li>
              <li>State: ${place['state']}</li>
              <li>State Abbr: ${place['state abbreviation']}</li>
              <li>City: ${place['place name']}</li>
              <li>Zip Code: ${data['post code']}</li>
              <li>Longitude: ${place['longitude']}</li>
              <li>Latitude: ${place['latitude']}</li>              
            </ul>
          </div>
        </article>         
        `;
      });

      //* insert into output div
      input.value = '';
      spinner.style.display = 'none';
      mainOutput.innerHTML = output;
    })
    .catch((err) => console.error(err));
}

//* show check or remove icon
function showIcon(icon) {
  //* clear icon
  iconCheck.style.display = 'none';
  iconRemove.style.display = 'none';

  //* set icon
  document.querySelector(`.icon-${icon}`).style.display = 'inline-flex';
}

//* listen for delete
let body = document.querySelector('body');

body.addEventListener('click', deleteLocation);

function deleteLocation(e) {
  if (e.target.className == 'delete') {
    document.querySelector('.message').remove();
    input.value = '';
    iconCheck.style.display = 'none';
    iconRemove.style.display = 'none';
  }
}
