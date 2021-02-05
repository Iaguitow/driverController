import React, { useEffect, useState } from 'react';
import { Root } from "native-base";
import { ScrollView, LogBox, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar } from 'react-native-paper';
//import useForceUpdate from 'use-force-update';

import ClassUtils from "../classes/ClassUtils.js"
import globalLogin from "../classes/ClassGlobal.js";
import ContextDrawer from '../classes/ContextDrawer';
import DataWeekContext from "../classes/ModalContextWeek.js";
import CompoDriversWeek from "../components/CompoDriversWeek";
import ManagerListDriverWeek from "../classes/ClassDBDriversWeek.js"

export default function ManagerDriver() {
  
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  const {featherActive, setFeatherActive} = React.useContext(ContextDrawer);

  const [dtData, setDtData] = useState(false);
  const [dateToday, ] = useState(new Date());

  function pullData() {
    ManagerListDriverWeek.getManagerListWeek(function (resultado) {
      setDtData(resultado);
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
    setFeatherActive(true);
    pullData();
    wait(3000).then(() => {setRefreshing(false); setFeatherActive(false);});
  }, []);

  return (
    <Root>
      <DataWeekContext.Provider value={{dtData, setDtData}}>
      <LinearGradient style={{ flex: 1 }} colors={['#182834', '#48D1CC']}>
        
        <Appbar.Header style={{ backgroundColor: 'transparent', borderRadius: 0, height: 60 }}>
          <Appbar.Content style={{alignItems:'center'}} title={globalLogin.isLogInName} 
          subtitle={ClassUtils.getDayGreeting().toString()+' - Today: '+dateToday.toString().substring(4,10)} 
          titleStyle={{ color: 'white' }} subtitleStyle={{ color: 'white' }} />
        </Appbar.Header>

        <ScrollView refreshControl={
          <RefreshControl tintColor={'white'} title={'UPDATING...'} titleColor={'white'} refreshing={refreshing} onRefresh={onRefresh} />
        }
        scrollEventThrottle={100} 
        scrollEnabled={true} 
        style={{ backgroundColor: 'transparent', flex: 0 }}
        >
          <CompoDriversWeek/>
        </ScrollView >
      </LinearGradient>
      </DataWeekContext.Provider>
    </Root>
  );
}