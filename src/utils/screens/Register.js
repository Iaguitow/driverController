import React, { useEffect, useState } from 'react';
import { Root } from "native-base";
import { ScrollView, RefreshControl, View, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar, Searchbar } from 'react-native-paper';
//import useForceUpdate from 'use-force-update';

import globalLogin from "../classes/ClassGlobal.js";
import ClassUtils from "../classes/ClassUtils.js"
import RegisterUserContext from "../classes/ModalContextRegister.js";
import ClassDBUserRegister from "../classes/ClassDBUserRegister.js"
import CompoUserRegisterList from "../components/CompoUserRegisterList.js";
import AddUserAndRoute from "../components/CompoFabGroupAddUserAndRoute";
import ModalAddUser from "../components/CompoModalUser";
import ContextDrawer from '../classes/ContextDrawer';

export default function ManagerDriver() {

  const {featherActive, setFeatherActive} = React.useContext(ContextDrawer);

  //STATES FOR MODAL
  const [userModal, setUserModal] = useState(false);
  const [routeModal, setRouteModal] = useState(false);

  //STATES FOR DATA
  const [objPeopleToedit, setobjPeopleToedit] = useState('');
  const [dsData, setDsData] = useState('');
  const [CopydsData, setCopyDsData] = useState('');
  const [FilterdsData, setFilterdsData] = useState('');
  const [dateToday, ] = useState(new Date());

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => {
    const filterList = FilterdsData.filter((items) => {
      const itemFilter = items.name? items.name.toUpperCase(): ''.toUpperCase();
      const newText = query.toUpperCase();
      return itemFilter.indexOf(newText)!== -1;
    });
    setDsData(filterList);
    setSearchQuery(query);  
  }
    
  function pullData() {
    ClassDBUserRegister.getListPeoples(function (resultado) {
      setDsData(resultado);
    });
  }

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setFeatherActive(true);
    pullData();
    
    wait(3000).then(() => {setRefreshing(false); setFeatherActive(false);});
  }, []);

  return (
    <Root>
      
      <RegisterUserContext.Provider value={{dsData, setDsData, CopydsData, 
        setCopyDsData, FilterdsData, setFilterdsData,
        userModal, setUserModal, routeModal, setRouteModal,
        objPeopleToedit, setobjPeopleToedit}}>

      <LinearGradient style={{ flex: 1 }} colors={['#182834', '#48D1CC']}>
        
        <Appbar.Header style={{ backgroundColor: 'transparent', borderRadius: 0, height: 60 }}>
          <Appbar.Content 
            style={{alignItems:'center'}} title={globalLogin.isLogInName} 
            subtitle={ClassUtils.getDayGreeting().toString()+' - Today: '+dateToday.toString().substring(4,10)} 
            titleStyle={{ color: 'white' }} subtitleStyle={{ color: 'white' }}
          >
          </Appbar.Content>
        </Appbar.Header>
        <View style={{marginTop:Platform.OS==='ios'?0:userModal?-500:0, position:userModal&&Platform.OS!=='ios'?"absolute":"relative"}}>
          <Searchbar
              placeholder="Search"
              onChangeText={onChangeSearch}
              value={searchQuery}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === 'Backspace') {
                  setFilterdsData(CopydsData);
                }
              }}
              style={{marginBottom:20, width:'95%', alignSelf: 'center'}}
          />
        </View>
        
        <ScrollView refreshControl={
          <RefreshControl tintColor={'white'} title={'UPDATING...'} titleColor={'white'} 
          refreshing={refreshing} onRefresh={onRefresh}/>
        }
        scrollEventThrottle={100} 
        scrollEnabled={true} 
        style={{ backgroundColor: 'transparent', flex: 0 }}
        >
          <CompoUserRegisterList/>
        </ScrollView >
        <AddUserAndRoute/>

        <ModalAddUser/>
        
      </LinearGradient>
      </RegisterUserContext.Provider>
    </Root>
  );
}