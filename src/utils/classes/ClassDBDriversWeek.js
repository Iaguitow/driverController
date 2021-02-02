class ManagerListDriverWeek {
  
    getManagerListWeek(callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      
      return (fetch("http://172.20.10.3:3000/list/managerDriversWeek", requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
  }
  
    getManagerNextWeek(callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      
      return (fetch("http://172.20.10.3:3000/managerDrivers/NextWeek", requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
    }
  
    getManagerListRoutes(callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      
      return (fetch("http://172.20.10.3:3000/managerDrivers/Routes", requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
    }
  
    getListDriversWorkedWeek(idWorkWeek,callback) {
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({"idWorkWeek":idWorkWeek});
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
  
      return (fetch("http://172.20.10.3:3000/managerDrivers/DriversWorkedWeek", requestOptions)
        .then(response => response.text())
        .then(
          result => {
            callback(result);
  
          }
        ).catch(error => console.log('error', error)));
      }
  
    insertNewWeek(dateStart, dateEnd, weekNumber, callback){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({"dateStart":dateStart,"dateEnd":dateEnd,"weekNumber":weekNumber})
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
  
      return (fetch("http://172.20.10.3:3000/managerDrivers/insertNewWeek", requestOptions)
      .then(response => response.text())
      .then(
        result => {
          if(result.toString().includes("Update")){
            callback(result.toString());
          }
          else {
            callback("Error, Register a Week for this day.");
          }
        }
      ).catch(error => console.log('error', error)));
    }
  }
  
    var manager = new ManagerListDriverWeek();
    export default manager;