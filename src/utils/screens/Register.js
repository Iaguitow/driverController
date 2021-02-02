import React, { useEffect, useState } from 'react';
import { Root } from "native-base";
import { ScrollView, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar, Searchbar } from 'react-native-paper';
//import useForceUpdate from 'use-force-update';

import globalLogin from "../classes/ClassGlobal.js";
import ClassUtils from "../classes/ClassUtils.js"
import RegisterUserContext from "../classes/ModalContextRegister.js";
import ClassDBUserRegister from "../classes/ClassDBUserRegister.js"
import CompoUserRegisterList from "../components/CompoUserRegisterList.js";

export default function ManagerDriver() {

  const [dsData, setDsData] = useState('');
  const [dateToday, ] = useState(new Date());

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => {
    
    const filterList = dsData.filter((items) => {
      const itemFilter = items.name? items.name.toUpperCase(): ''.toUpperCase();
      const newText = query.toUpperCase();
      console.log(itemFilter.indexOf(newText));
      return itemFilter.indexOf(newText)> -1;
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
    setRefreshing(true);
    pullData();
    wait(3000).then(() => setRefreshing(false));
  }, []);

  return (
    <Root>
      <RegisterUserContext.Provider value={{dsData, setDsData}}>
      <LinearGradient style={{ flex: 1 }} colors={['#182834', '#48D1CC']}>
        
        <Appbar.Header style={{ backgroundColor: 'transparent', borderRadius: 0, height: 60 }}>
          <Appbar.Content 
            style={{alignItems:'center'}} title={globalLogin.isLogInName} 
            subtitle={ClassUtils.getDayGreeting().toString()+' - Today: '+dateToday.toString().substring(4,10)} 
            titleStyle={{ color: 'white' }} subtitleStyle={{ color: 'white' }}
          >
          </Appbar.Content>
        </Appbar.Header>

        <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                setSearchQuery(searchQuery.slice(0,-1));
                onChangeSearch(searchQuery);
              }
            }}
            style={{marginBottom:20, width:'95%', alignSelf: 'center'}}
        />

        <ScrollView refreshControl={
          <RefreshControl tintColor={'white'} title={'UPDATING...'} titleColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />
        }
        scrollEventThrottle={100} 
        scrollEnabled={true} 
        style={{ backgroundColor: 'transparent', flex: 0 }}
        >
          <CompoUserRegisterList/>
        </ScrollView >
      </LinearGradient>
      </RegisterUserContext.Provider>
    </Root>
  );
}