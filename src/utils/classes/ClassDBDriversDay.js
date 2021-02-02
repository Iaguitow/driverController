class ManagerListDriverDay {
  
  getManagerListDay(callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      
      return (fetch("http://172.20.10.3:3000/list/managerDrivers", requestOptions)
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

  getListDriversWorked(idWorkDay,callback) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"idWorkDay":idWorkDay});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    return (fetch("http://172.20.10.3:3000/managerDrivers/DriversWorked", requestOptions)
      .then(response => response.text())
      .then(
        result => {
          callback(result);

        }
      ).catch(error => console.log('error', error)));
    }

  insertNewDay(dayToday,callback) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"dayToday":dayToday});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };

    return (fetch("http://172.20.10.3:3000/managerDrivers/insertNewDay", requestOptions)
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


  setStatusWork(idDriver,callback) {
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"idDriver":idDriver});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw
    };
    return (fetch("http://172.20.10.3:3000/managerDrivers/setStatus", requestOptions)
      .then(response => response.text())
      .then(
        result => {
          if(result.toString().includes("Update")){
            callback(result.toString());
          }
          else {
            callback("Any error");;
          }
        }
      ).catch(error => console.log('error', error)));
    }

    setRouteDriver(idDriver, idRoute, callback) {
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({"idDriver":idDriver,"idRoute":idRoute});
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
      return (fetch("http://172.20.10.3:3000/managerDrivers/setRoute", requestOptions)
        .then(response => response.text())
        .then(
          result => {
            if(result.toString().includes("Update")){
              callback(result.toString());
            }
            else {
              callback("Any error");;
            }
          }
        ).catch(error => console.log('error', error)));
      }
}

  var manager = new ManagerListDriverDay();
  export default manager;