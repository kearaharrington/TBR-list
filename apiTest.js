const axios = require("axios");

// const options = {
//   method: 'GET',
//   url: 'https://hapi-books.p.rapidapi.com/search/the+walking+dead',
//   headers: {
//     'X-RapidAPI-Key': '9856763d15msh19adf6884d1d1e7p19ecc4jsn1367133694d1',
//     'X-RapidAPI-Host': 'hapi-books.p.rapidapi.com'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

const options = {
  method: 'GET',
  url: 'https://amazon-kindle-scraper.p.rapidapi.com/search/love',
  params: {api_key: 'bc09e263d60d1bbdfc2455c657c5e9bd'},
  headers: {
    'X-RapidAPI-Key': '9856763d15msh19adf6884d1d1e7p19ecc4jsn1367133694d1',
    'X-RapidAPI-Host': 'amazon-kindle-scraper.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});