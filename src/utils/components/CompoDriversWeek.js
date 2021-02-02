import * as React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { List, FAB, Switch, ProgressBar } from 'react-native-paper';
import { Picker, Icon } from "native-base";
import { useFocusEffect } from '@react-navigation/native';

import ManagerListDriverWeek from "../classes/ClassDBDriversWeek.js"
import ClassUtils from "../classes/ClassUtils.js"
import DataWeekContext from "../classes/ModalContextWeek.js";

const CompoDriversWeek = () => {

    const [mounted, setmounted] = React.useState(false);

    React.useEffect(() => {
        setmounted(true);
    }, [])

    const [dtDataRoute, setDtDataRoute] = React.useState('release_data');
    function pullDataRoute() {
        ManagerListDriverWeek.getManagerListRoutes(function (resultado) {
            setDtDataRoute(resultado);
        });
    }

    //const [dtData, setDtData] = React.useState('release_data');
    const { dtData, setDtData } = React.useContext(DataWeekContext);
    function pullData() {
        ManagerListDriverWeek.getManagerListWeek(function (resultado) {
            setDtData(resultado);
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            pullData();
            pullDataRoute();
        }, [])
    );

    const routeMapped = () => {
        return dtDataRoute.map((route, index) => {
            return (<Picker.Item key={index} label={route.routename} value={route.keyroute.toString()} />)
        })
    };

    const section = [];
    for (var i = 0, ii = dtData.length; i < ii; i++) {
        const days = [];
        if (i > 0 ? dtData[i].WeekDate != dtData[i - 1].WeekDate : true == true) {

            for (var c = 0, cc = dtData.length; c < cc; c++) {
                const items = [];
                if (c > 0 ? ((dtData[c].WeekDate == dtData[i].WeekDate) && (dtData[c].dayDate != dtData[c - 1].dayDate)) : (dtData[c].WeekDate == dtData[i].WeekDate)) {

                    for (var b = 0, bb = dtData.length; b < bb; b++) {

                        if (dtData[b].dayDate == dtData[c].dayDate) {
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

                    days.push({
                        dayDate: dtData[c].dayDate,
                        driverAmount: dtData[c].driverAmountAccepted,
                        items: items
                    });
                }
            }

            section.push({
                WeekDate: dtData[i].WeekDate,
                keySectionWeek: dtData[i].keySectionWeek,
                days: days
            });
        }
    }

    if (!mounted) {
        return (<ProgressBar indeterminate={true} color={'#48D1CC'} />);
    }

    return (
        <View>
            {section.map((weekObj, index) => {
                return (
                    <List.Section
                        title={weekObj.WeekDate}
                        titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 0, marginTop: 0, width: '95%', alignSelf: 'center' }}
                        key={index}
                    >
                        <FAB style={styles.fab} color='white' small={false} icon="database-export"
                            onPress={() => {
                                    ClassUtils.exportWeek(weekObj.keySectionWeek);
                                }} />

                        <List.Accordion
                            title="DAYS"
                            theme={{ colors: { primary: '#48D1CC' } }}
                            titleStyle={{ color: 'black', fontSize: 16 }}
                            left={props => <List.Icon {...props} size={25} icon="folder" />}
                            key={index}
                        >
                            {weekObj.days.map((daysObj, index) => {

                                return (

                                    <List.Accordion
                                        theme={{ colors: { primary: '#48D1CC' } }}
                                        style={{ borderTopColor: 'rgba(0,0,0,0.3)', borderTopWidth: 3 }}
                                        title={daysObj.dayDate + ' - '+daysObj.driverAmount+' WORKED'}
                                        titleStyle={{ color: 'black', fontSize: 14 }}
                                        left={props => <List.Icon {...props} icon="account-hard-hat" />}
                                        key={index}
                                    >
                                        {daysObj.items.map((item, index) => {
                                            return (
                                                <List.Item
                                                    style={{ borderTopColor: 'rgba(0,0,0,0.3)', borderTopWidth: 1 }}
                                                    title={item.name}
                                                    key={index}
                                                    onPress={() => {ClassUtils.callNumber(item.phonenumber)} }

                                                    left={props => <Switch {...props} color={item.worked == 'S' ? '#48D1CC' : 'red'}
                                                    value={item.worked != null ? true : false} />}

                                                    right={props => <Picker {...props}
                                                        mode="dropdown"
                                                        iosIcon={<Icon name="arrow-down" style={{ color: '#48D1CC' }} />}
                                                        style={{
                                                            width: (Platform.OS === 'ios') ? 100 : 50,
                                                            marginLeft: (Platform.OS === 'ios') ? -145 : 0
                                                        }}
                                                        placeholder="Select the Route"
                                                        placeholderStyle={{ color: "#bfc6ea" }}
                                                        textStyle={{ color: '#48D1CC', fontSize: 16 }}
                                                        placeholderIconColor="#007aff"
                                                        selectedValue={'1'}
                                                        onValueChange={() => { }}
                                                    >
                                                        {routeMapped()}

                                                    </Picker>}
                                                />
                                            )
                                        })
                                        }

                                    </List.Accordion>
                                )
                            })
                            }
                        </List.Accordion>
                    </List.Section>
                )
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    fab: {
        position: 'relative',
        margin: 25,
        marginTop: 60,
        left: 0,
        bottom: 60,
        width: 55,
        marginBottom: -60,
        backgroundColor: 'purple'
    },
})

export default CompoDriversWeek;