import {recordHeader, recordList, createList, recordHeader_V} from './tableFunctions.js';

const OPTIONS = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'bf9390a9b8msh17df33611fce81ap1ce934jsna08cf0a0eac7',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
};
  
const fetchIpInfo = country => {
    return fetch(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, OPTIONS)
      .then(res => res.json())
      .catch(err => console.error(err))
};
  
const $ = selector => document.querySelector(selector)
const $form = $('#form')
const $input = $('#input')
const $submit = $('#submit')

  
$form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const {value} = $input
  
  $submit.setAttribute('disabled', '')
  $submit.setAttribute('aria-busy', 'true')

  const ipInfo = await fetchIpInfo(value)
  var infoIPresponse = ipInfo['response']
  var table = document.getElementById("display_json_data");
  var table_v = document.getElementById("display_json_data_vertical");

  if (infoIPresponse[0] == undefined ) {
    table.innerHTML='<th>'+'Not Found'+'</th>';
    $submit.removeAttribute('disabled')
    $submit.removeAttribute('aria-busy')

  } else {
    // Show Json raw data
    // if (ipInfo) {
    //   $results.innerHTML = JSON.stringify(infoIPresponse, null, 2)
    // }

    //Get the headers from JSON data
    var headers = Object.keys(infoIPresponse[0]);
        
    //Prepare html header
    var headerRowHTML = recordHeader(headers);     
    
    //Prepare all the employee records as HTML
    var allRecordsHTML= recordList( infoIPresponse, headers);

    //Append the table header and all records
    //var table=document.getElementById("display_json_data");
    
    table.innerHTML=headerRowHTML + allRecordsHTML;

    var headerRowHTML_V = recordHeader_V(headers, infoIPresponse);
    table_v.innerHTML = headerRowHTML_V;

    $submit.removeAttribute('disabled')
    $submit.removeAttribute('aria-busy')
  }
})

