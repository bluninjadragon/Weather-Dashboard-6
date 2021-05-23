function init() {
    getApi();
}

function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    const requestUrl = 'https://openweathermap.org/api/one-call-api';
  
    fetch(requestUrl)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
      })
    }
init();