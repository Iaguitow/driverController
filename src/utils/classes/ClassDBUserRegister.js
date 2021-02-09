class ManagerUsers {

    getListPeoples(disabledUsers,callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"disabledUsers":disabledUsers});
      
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
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

    insertNewUser(userName,userMail,userPassword,userCategory,userActive,userPhonenumber,callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({"userName":userName,"userMail":userMail,"userPassword":userPassword,
      "userCategory":userCategory,"userActive":userActive,"userPhonenumber":userPhonenumber});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
      
      return (fetch("http://172.20.10.3:3000/managerUsers/insertNewUser", requestOptions)
        .then(response => response.text())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
    }

    updateUser(userName,userMail,userPassword,userCategory,userActive,userPhonenumber,idpeople,callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({"userName":userName,"userMail":userMail,"userPassword":userPassword,
      "userCategory":userCategory,"userActive":userActive,"userPhonenumber":userPhonenumber,"idpeople":idpeople});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
      
      return (fetch("http://172.20.10.3:3000/managerUsers/updateUser", requestOptions)
        .then(response => response.text())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
    }

    insertNewUserPhoto(idUser,photoBlob,callback) {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({"photoBlob":photoBlob,"idUser":idUser});

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };
      
      return (fetch("http://172.20.10.3:3000/managerUsers/insertNewUserPhoto", requestOptions)
        .then(response => response.text())
        .then(result => {
          callback(result);
        }
      ).catch(error => {console.log('error', error); return error}));
    }

  }
  
var manager = new ManagerUsers();
export default manager;