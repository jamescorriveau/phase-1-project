fetch("http://api.weatherapi.com/v1/future.json?key=7db73fb6ebd6428c97d163149231311&q=New York&dt=2023-12-13")
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
