import * as React from 'react';
import { List, Avatar, IconButton, ProgressBar } from 'react-native-paper';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ClassUtils from "../classes/ClassUtils.js"
import ModalContextRegister from '../classes/ModalContextRegister'
import ContextDrawer from '../classes/ContextDrawer';
import ManagerUsers from '../classes/ClassDBUserRegister'

const CompoUserRegisterList = () => {

  const [mounted, setmounted] = React.useState(false);
  React.useEffect(() => {
      setmounted(true);
  }, [])
  
  const { userModal, setUserModal } = React.useContext(ModalContextRegister);
  const {isSwitchOnDisablesUsers, setisSwitchOnDisablesUsers} = React.useContext(ModalContextRegister);
  const { objPeopleToedit, setobjPeopleToedit } = React.useContext(ModalContextRegister);
  const { dsData, setDsData } = React.useContext(ModalContextRegister);
  const { CopydsData, setCopyDsData } = React.useContext(ModalContextRegister);
  const { FilterdsData, setFilterdsData } = React.useContext(ModalContextRegister);
  //const [dsData, setDsData]  = React.useState('WITHOUT DATA');

  function pullData(){
    ManagerUsers.getListPeoples(isSwitchOnDisablesUsers,function(resultado){
      setDsData(resultado);
      setCopyDsData(resultado);
      setFilterdsData(resultado);
      
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      pullData();
    }, [isSwitchOnDisablesUsers])
  );

  if (!mounted) {
    return (<ProgressBar indeterminate={true} color={'#48D1CC'} />);
  } 
  
  const arrayPeople = [];
  for (var i = 0, ii = dsData.length; i < ii; i++) {
    arrayPeople.push({
      idpeople: dsData[i].idpeople,
      name: dsData[i].name,
      email: dsData[i].email,
      phonenumber: dsData[i].phonenumber,
      password: dsData[i].password,
      fk_idcategory: dsData[i].fk_idcategory,
      active: dsData[i].active
    });
  }

  return (
    <View style={{ marginTop: 15 }}>
      {arrayPeople.map((obj,index) => {
        return(
      <List.Section style={{ marginBottom: -5 }} key={index}>
        <List.Item
          title={obj.name}
          description={obj.email}

          style={{
            backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 0,
            borderRadius: 0, 
            borderRightColor: obj.active=='S'?'#00FF00':"red", 
            borderLeftColor: obj.active=='S'?'#00FF00':"red", 
            borderLeftWidth: 4, borderRightWidth: 4,
            width: '95%', alignSelf: 'center'
          }}

          left={props => <Avatar.Image {...props} style={{backfaceVisibility:'false',backgroundColor:'transparent'}} 
          size={60} source={require('../images/face-Img.jpg')} />}

          right={props => <IconButton {...props} size={35}
            color={'#48D1CC'} icon="phone-in-talk" onPress={() => { ClassUtils.callNumber(obj.phonenumber); }} />}

          onPress={() => {
            setobjPeopleToedit(obj);
            setUserModal(true);
          }}
        />
      </List.Section>
        )
      })}
    </View>
  );
}

export default CompoUserRegisterList;