class ManagerUsers {

    getListPeoples(callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      
      return (fetch("http://172.20.10.3:3000/managerUsers/getListPeoples", requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
    }


    getManagerListCategory(callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      
      return (fetch("http://172.20.10.3:3000/managerUsers/getListCategory", requestOptions)
        .then(response => response.json())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
    }

  }
  
var manager = new ManagerUsers();
export default manager;