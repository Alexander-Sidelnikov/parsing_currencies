import bootstrap from 'bootstrap';
import Chart from 'chart.js/auto';
import './scss/main.scss';

const axios = require('axios');

const loader = document.querySelector('.loader')
const table = document.querySelector('[data-table]') 

const refreshButton = document.querySelector('[data-refresh]')
refreshButton.addEventListener('click', function() {
  chart.style.display = 'none'
  table.classList.add('hide')
  loader.classList.remove('hide')
  document.querySelector('[data-table-content]').innerHTML = ''
  getCurrencies()  
})


function getCurrencies() {
  axios.get('https://www.floatrates.com/daily/rub.json')
    .then(function (response) {
      // handle success
      loader.classList.add('hide')
      table.classList.remove('hide')

      let currencies = Object.values(response.data)
      let count = 1
      let arrName = []
      let arrRate = []
      currencies.forEach((item) => {
        document.querySelector('[data-table-content]').insertAdjacentHTML('beforeend', `
          <tr>
            <th scope="row">${count++}</th>
            <td>${item.name}</td>
            <td>${item.inverseRate.toFixed(2)+" руб."}</td>
            <td>${item.date}</td>
          </tr>`)

          arrName.push(item.name)          
          arrRate.push(+item.inverseRate.toFixed(2))          
          
        })
        
        let myChart = new Chart(chart, {
          type: 'line',
          data: {
              labels: arrName,
              datasets: [
                {
                label: 'Стоимость валюты в рублях',
                data: arrRate,
                fill: false,                
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
          }
        }); 
  
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}

getCurrencies()


let chart = document.querySelector('#myChart');
chart.style.display = 'none'


const chartButton = document.querySelector('[data-chart]')
chartButton.addEventListener('click', function() {
  table.classList.add('hide')
      chart.style.display = 'block'  
})
