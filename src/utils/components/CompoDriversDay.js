import React, { useState } from 'react';
import { List, Switch, Button, FAB } from 'react-native-paper';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Picker, Icon } from "native-base";

import toasted from '../components/CompoToast';
import globalLogin from "../classes/ClassGlobal.js"
import classManagerDriverDay from "../classes/ClassDBDriversDay.js"
import ClassUtils from "../classes/ClassUtils.js"
import DialogContext from "../classes/ModalContext.js";

const ListDriversDay = () => {

  const [dtDataRoute, setDtDataRoute] = useState('release_data');
  function pullDataRoute() {
    classManagerDriverDay.getManagerListRoutes(function (resultado) {
      setDtDataRoute(resultado);
    });
  }

  const routeMapped = () => {
    return dtDataRoute.map((route, index) => {
      return (<Picker.Item key={index} label={route.routename} value={route.keyroute.toString()} />)
    })
  };

  //const [dtData, setDtData] = useState('release_data');
  const { dtData, setDtData } = React.useContext(DialogContext);
  function pullData() {
    classManagerDriverDay.getManagerListDay(function (resultado) {
      setDtData(resultado);
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      pullData();
      pullDataRoute();
      if (globalLogin.setIntervalOnce) {
        /*setInterval(() => {
          pullData();
          toasted.showToast('Refresh');
        }, 60000);*/
        globalLogin.setIntervalOnce = false;
      }
    }, [])
  );


  const section = [];
  for (var i = 0, ii = dtData.length; i < ii; i++) {

    if (i > 0 ? dtData[i].dayDate != dtData[i - 1].dayDate : true == true) {
      const items = [];
      for (var b = 0, bb = dtData.length; b < bb; b++) {

        if (dtData[b].dayDate == dtData[i].dayDate) {
          items.push({
            name: dtData[b].name,
            worked: dtData[b].worked,
            workedWeekDays: dtData[b].workedWeekDays,
            KeyItemDriver: dtData[b].KeyItemDriver,
            KeyRouteDriver: dtData[b].KeyRouteDriver,
            phonenumber: dtData[b].phonenumber
          });
        }
      }
      section.push({
        dayDate: dtData[i].dayDate,
        driverAmount: dtData[i].driverAmountAccepted,
        keySectionDay: dtData[i].keySectionDay,
        data: items
      });
    }
  }

  return (
    <View style={{ marginTop: 15 }}>
      {section.map((obj, index) => {
        return (
          <List.Section
            title={obj.dayDate}
            titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}
            style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 0, borderRadius: 0, width: '95%', alignSelf: 'center' }}
            key={index}
            id={obj.keySectionDay}  >

            <Button mode="contained" style={{ borderRadius: 70, width: 40, backgroundColor: '#48D1CC', marginLeft: '80%' }}>
              <Text style={{ fontWeight: 'bold', marginRight: 50 }}> {obj.driverAmount != null ? obj.driverAmount : 0} </Text> </Button>
            <FAB style={styles.fab} color='white' small={false} icon="database-export" onPress={() => { ClassUtils.export(obj.keySectionDay); }} />

            <List.Accordion
              title="DRIVERS"
              key={index}
              theme={{ colors: { primary: '#48D1CC' } }}
              titleStyle={{ color: 'black', fontSize: 14 }}
              left={props => <List.Icon {...props} icon="folder" />}>

              {obj.data.map((dts, index) => {
                return (
                  <List.Item key={index} id={dts.KeyItemDriver} title={dts.workedWeekDays + " - " + dts.name}
                    titleStyle={{ color: 'black', fontSize: 14, marginLeft: -20 }}
                    style={{ borderTopColor: 'rgba(0,0,0,0.3)', borderTopWidth: 1 }}
                    onPress={() => { ClassUtils.callNumber(dts.phonenumber) }}

                    left={props => <Switch {...props} color={dts.worked == 'S' ? '#48D1CC' : 'red'}
                      onValueChange={() => {
                        classManagerDriverDay.setStatusWork(dts.KeyItemDriver, function (resultado) {
                          if (resultado.toString().includes("Update")) {
                            pullData();
                            toasted.showToast('Sucess');
                          } else {
                            alert(resultado.toString());
                          }
                        });
                      }} value={dts.worked != null ? true : false} />}

                    right={props => <Picker {...props}
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" style={{ color: '#48D1CC' }} />}
                      style={{ width: (Platform.OS === 'ios') ? 100 : 50, marginLeft: (Platform.OS === 'ios') ? -145 : 0 }}
                      placeholder="Select the Route"
                      placeholderStyle={{ color: "#bfc6ea" }}
                      textStyle={{ color: '#48D1CC', fontSize: 16 }}
                      placeholderIconColor="#007aff"
                      selectedValue={dts.KeyRouteDriver != null ? dts.KeyRouteDriver.toString() : null}
                      onValueChange={(idRouteSelected) => {
                        classManagerDriverDay.setRouteDriver(dts.KeyItemDriver, idRouteSelected, function (resultado) {
                          if (resultado.toString().includes("Update")) {
                            pullData();
                            toasted.showToast('Sucess');
                          } else {
                            alert(resultado.toString());
                          }
                        });
                      }}
                    >
                      {routeMapped()}
                    </Picker>}
                  /*right={props => <Text {...props} style={{ color: '#48D1CC', fontSize: 18, marginTop: 5 }} > {dts.workedWeekDays} </Text>}
                  onPress={() => {call modal}}*/
                  >
                  </List.Item>
                )
              })}
            </List.Accordion>
          </List.Section>
        );
      })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'relative',
    margin: 16,
    left: 0,
    bottom: 50,
    width: 55,
    marginBottom: -60,
    backgroundColor: 'purple'
  },
})

export default ListDriversDay;

