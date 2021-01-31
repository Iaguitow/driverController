import React, { useEffect, useState } from 'react';
import { Root } from "native-base";
import { ScrollView, LogBox, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar } from 'react-native-paper';
//import useForceUpdate from 'use-force-update';

import ListDriversPerDay from '../components/CompoDriversDay';
import AddweekandDay from '../components/compoFabGroup';
import globalLogin from "../classes/ClassGlobal.js";
import DialogDay from '../components/CompoModalDay';
import DialogDayWeek from '../components/CompoModalWeek';
import DialogContext from "../classes/ModalContext.js";
import classManagerDriverDay from "../classes/ClassListDriversDay.js"
import ClassUtils from "../classes/ClassUtils.js"

export default function ManagerDriver() {
  
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [])

  const [value, setValue] = useState(false);
  const [valueWeek, setValueWeek] = useState(false);
  const [dtData, setDtData] = useState(false);
  const [dateToday, ] = useState(new Date());

  function pullData() {
    classManagerDriverDay.getManagerListDay(function (resultado) {
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
    pullData();
    wait(3000).then(() => setRefreshing(false));
  }, []);



  return (
    <Root>
      <DialogContext.Provider value={{value, setValue, valueWeek, setValueWeek, dtData, setDtData}}>
        <LinearGradient style={{ flex: 1 }} colors={['#182834', '#48D1CC']}>
          
          <Appbar.Header style={{ backgroundColor: 'transparent', borderRadius: 0, height: 50 }}>
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
            <ListDriversPerDay />
          </ScrollView >

          <AddweekandDay />
          <DialogDay />
          <DialogDayWeek/>

        </LinearGradient>
      </DialogContext.Provider>
    </Root>
  );
}