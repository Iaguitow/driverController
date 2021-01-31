import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { List, FAB, Switch, Button } from 'react-native-paper';
import { Picker, Icon } from "native-base";

const CompoDriversWeek = () => (
    <View>
        <List.Section 
            title={'10/01/2021 - 17/01/2021 (WEEK: 1)'}
            titleStyle={{ color: 'black', fontWeight: 'bold', fontSize: 16 }}
            style={{ backgroundColor: 'rgba(178,178,178,0.5)', marginTop: 0, width: '95%', alignSelf: 'center' }}
        >
            <FAB style={styles.fab} color='white' small={false} icon="database-export" onPress={() => {/*ClassUtils.export(obj.keySectionDay);*/}} />

            <List.Accordion 
                title="DAYS"
                theme={{ colors: { primary: '#48D1CC' } }}
                titleStyle={{ color: 'black', fontSize: 16 }}
                left={props => <List.Icon {...props} size={25} icon="folder" />}
            >
                <List.Accordion 
                    theme={{ colors: { primary: '#48D1CC' } }} 
                    style={{ borderTopColor: 'white', borderTopWidth: 3 }} 
                    title="Day 10 - (50 Drivers Worked)" id="1"
                    titleStyle={{ color: 'black', fontSize: 14 }}
                    left={props => <List.Icon {...props} icon="account-hard-hat" />}
                >

                    <List.Item 
                        style={{ borderTopColor: 'white', borderTopWidth: 1 }} 
                        title="4 - Joao"

                        left={props => <Switch {...props} color={'S' == 'S' ? '#48D1CC' : 'red'}
                            value={'S' != null ? true : false} />}
                        
                        right={props => <Picker {...props}
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" style={{color: '#48D1CC'}}/>}
                            style={{ width: (Platform.OS === 'ios')?100:50, marginLeft:(Platform.OS === 'ios')?-145:0 }}
                            placeholder="Select the Route"
                            placeholderStyle={{ color: "#bfc6ea"}}
                            textStyle={{color:'#48D1CC', fontSize:16}}
                            placeholderIconColor="#007aff"
                            selectedValue={'k01'}
                            onValueChange={() => {}}
                            >
                            <Picker.Item label={'FULL ROUTE - LARGE VAN '} value={'k01'} />
                            <Picker.Item label={'FULL ROUTE - SMALL VAN'} value={'k02'} />
                            </Picker>}
                    />

                </List.Accordion>

            </List.Accordion>
        </List.Section>
    </View>
);

const styles = StyleSheet.create({
    fab: {
      position: 'relative',
      margin: 25,
      marginTop:50,
      left: 0,
      bottom: 50,
      width: 55,
      marginBottom: -60,
      backgroundColor: 'purple'
    },
  })

export default CompoDriversWeek;