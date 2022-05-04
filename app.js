function insertdata() {

    let data = {
        money: 0
    };
    
    fetch('/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Data is stored:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      }); }
    
    function getdata() {
        fetch("/data")
        .then(response => response.json())
        .then(data => {
            money = Number(data.data[0].money);
            console.log(JSON.stringify(data));
        });
      }
    
    
    function deletedata() {
    
        let data = {
          highscoreID: prompt("HighscoreID:")
        }
      
        fetch('/highscore', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Data is deleted:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }

      function updatedata() {
    
        let data = {
          dataID: "62613136a149683fdbc31029",
          money: money
        }
      
        fetch('/data', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Data is deleted:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }