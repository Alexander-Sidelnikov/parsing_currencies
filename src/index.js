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
      console.log(response);
      console.log(response.data);
      console.log(Object.values(response.data));
      console.log('Status', response.status);

      

      loader.classList.add('hide')
      table.classList.remove('hide')

      let currencies = Object.values(response.data)
      let count = 1
      let arrName = []
      let arrRate = []
      currencies.forEach((item) => {
        // console.log(+item.inverseRate.toFixed(2))
        document.querySelector('[data-table-content]').insertAdjacentHTML('beforeend', `
          <tr>
            <th scope="row">${count++}</th>
            <td>${item.name}</td>
            <td>${item.inverseRate.toFixed(2)+" руб."}</td>
            <td>${item.date}</td>
          </tr>`)


          // ===========================================

          arrName.push(item.name)          
          arrRate.push(+item.inverseRate.toFixed(2))

          
          // ===========================================
          
        })
        console.log("arrName:", arrName)
        console.log("arrRate:", arrRate)
        let myChart = new Chart(chart, {
          type: 'line',
          data: {
              labels: arrName,
              datasets: [
                {
                label: 'Стоимость валюты в рублях',
                data: arrRate,
                fill: false,
                // backgroundColor: [
                //   'rgba(255, 99, 132, 0.2)',
                //   'rgba(255, 159, 64, 0.2)',
                //   'rgba(255, 205, 86, 0.2)',
                //   'rgba(75, 192, 192, 0.2)',
                //   'rgba(54, 162, 235, 0.2)',
                //   'rgba(153, 102, 255, 0.2)',
                //   'rgba(201, 203, 207, 0.2)'
                // ],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }
            ]
          },
          options: {
            responsive: true,
          }
        });


        

        // let myChart = new Chart(chart, {
        //   type: 'bar',
        //   data: {
        //     labels: arrName.slice(129),
        //     datasets: [
        //       {
        //         label: 'Dataset 1',
        //         data: arrRate.slice(129),
        //         borderColor: 'rgb(75, 192, 192)',
        //         backgroundColor: [
        //           'rgba(255, 99, 132, 0.2)',
        //           'rgba(54, 162, 235, 0.2)',
        //           'rgba(255, 206, 86, 0.2)',
        //           'rgba(75, 192, 192, 0.2)',
        //           'rgba(153, 102, 255, 0.2)',
        //           'rgba(255, 159, 64, 0.2)'
        //       ],
        //       }              
        //     ]
        //   },
        //   options: {
        //     responsive: true,
        //     indexAxis: 'y',            
        //     elements: {
        //       bar: {
        //         borderWidth: 2,
        //       }
        //     },
        //     responsive: true,
        //     plugins: {
        //       legend: {
        //         position: 'right',
        //       },
        //       title: {
        //         display: true,
        //         text: 'Chart.js Horizontal Bar Chart'
        //       }
        //     }
        //   },
        // });





  
  
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
// chart.classList.add('hide')
chart.style.display = 'none'

// let myChart = new Chart(chart, {
//   type: 'line',
//   data: {
//       labels: [item.name],
//       datasets: [{
//         label: 'My First Dataset',
//         data: [item.inverseRate.toFixed(2)],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//       }]
//   }
// });







const chartButton = document.querySelector('[data-chart]')
chartButton.addEventListener('click', function() {
  table.classList.add('hide')
  // chart.classList.toggle('hide')
      chart.style.display = 'block'


  
})
