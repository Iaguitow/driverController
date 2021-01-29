import { Component } from 'react';
import { Toast } from 'native-base'

class Toasts extends Component {

  static showToast(info) {
    switch (info) {
      case 'Refresh':
        Toast.show({
          text: 'Data Updated!',
          buttonText: "Okay",
          duration: 3000,
          //style: {width:500,alignItems:'center'}
        })
        break;
      case 'Sucess':
        Toast.show({
          text: 'Sucessfully Updated.',
          buttonText: "Okay",
          duration: 3000
        })
        break;
      case 'WrongLogin':
        Toast.show({
          text: 'Username or Password Incorrect',
          buttonText: "Okay",
          duration: 3000
        })
        break;
      default:
        Toast.show({
          text: 'Something Went Wrong',
          buttonText: "Okay",
          duration: 3000
        })
    }
  }
}

export default Toasts