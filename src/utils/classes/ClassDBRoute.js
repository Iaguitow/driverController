class ManageRoute {
    insertNewRoute(namRoute,keyRoute, routePrice,callback) {
      
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({"namRoute":namRoute,"keyRoute":keyRoute,"routePrice":routePrice});
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw
        };
    
        return (fetch("http://172.20.10.3:3000/managerRoute/insertNewRoute", requestOptions)
          .then(response => response.text())
          .then(
            result => {
              callback(result);
    
            }
          ).catch(error => console.log('error', error)));
        }
}

const ManageRoutes = new ManageRoute();
export default ManageRoutes;