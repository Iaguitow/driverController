import * as React from 'react';
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    Provider,
    Divider,
    TextInput,
    Switch,
    Text
} from 'react-native-paper';
import { Picker, Icon} from 'native-base';
import { View, TextInput as TextInputNative} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import ClassDBUserRegister from "../classes/ClassDBUserRegister.js"
import ModalContextRegister from "../classes/ModalContextRegister.js";
import toasted from '../components/CompoToast';

const ModalUserRegister = () => {

    const { userModal, setUserModal } = React.useContext(ModalContextRegister)
    const [load, setLoad] = React.useState(false);

    const [valueActive, setValueActive] = React.useState('Active(Off):');
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        !isSwitchOn?setValueActive('Active(On):'):setValueActive('Active(Off):')
    };

    const [dtDataCategory, setdtDataCategory] = React.useState('release_data');
    function pullDataCategory() {
        ClassDBUserRegister.getManagerListCategory(function (resultado) {
            categoryMapped(resultado);
      });
    }
  
    const categoryMapped = (data) => {
        setdtDataCategory(data.map((category, index) => {
            return (<Picker.Item key={index} label={category.namecategory.toUpperCase()} 
                    value={category.idpeoplecategory.toString()} />)
      }))
    };

    function pullData() {
        /*classManagerDriverWeek.getManagerNextWeek(function(resultado){
         });*/
    }

    useFocusEffect(
        React.useCallback(() => {
            pullData();
            pullDataCategory();
        }, [])
    );

    return (
        <Provider>
            <Portal>
                <Dialog style={{}} visible={userModal} onDismiss={() => { setUserModal(false) }}>
                    <Dialog.Title>Register New User</Dialog.Title>
                    <Divider />

                    <Dialog.Content>
                        <Paragraph>Personal Data:</Paragraph>
                        <TextInput
                            label={'Name: '}
                            style={{ backgroundColor: 'transparent', width: "100%" }}
                            theme={{
                                colors: {
                                    placeholder: 'black', text: 'black',
                                    primary: '#48D1CC', underlineColor: '#48D1CC'
                                }
                            }} />
                        <TextInput
                            label={'Email: '}
                            style={{ backgroundColor: 'transparent', width: "100%" }}
                            theme={{
                                colors: {
                                    placeholder: 'black', text: 'black',
                                    primary: '#48D1CC', underlineColor: '#48D1CC'
                                }
                            }} />
                        <View style={{ flexDirection: 'row', padding: 0 }}>
                            <TextInput
                                label={'Password: '}
                                maxLength={15}
                                style={{ backgroundColor: 'transparent', width: "50%" }}
                                theme={{
                                    colors: {
                                        placeholder: 'black', text: 'black',
                                        primary: '#48D1CC', underlineColor: '#48D1CC'
                                    }
                                }} />
                            <TextInputNative
                                editable={false}
                                value={valueActive}
                                style={{alignSelf:"center", fontSize:16, paddingRight:15, paddingLeft:10 }}
                                > 
                            </TextInputNative>
                            <Switch
                                style={{alignSelf:"center" }} 
                                value={isSwitchOn} 
                                onValueChange={onToggleSwitch} 
                            />
                        </View>
                        <View style={{ flexDirection: 'row', padding: 0 }}>
                            <TextInputNative
                                editable={false}
                                style={{paddingTop:5, fontSize:18, paddingRight:15, paddingLeft:10 }}
                            >
                                Category:
                            </TextInputNative> 
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" style={{ color: '#48D1CC' }} />}
                                style={{width:"70%", marginTop:10, borderBottomWidth:1, 
                                borderBottomColor:'rgba(0,0,0,0.28)'}}
                                placeholder="Select the Route"
                                placeholderStyle={{ color: "black" }}
                                textStyle={{ color: 'black', fontSize: 16 }}
                                placeholderIconColor="#007aff"
                                selectedValue={'2'}
                                onValueChange={(idCategorySelected) => {}}
                            >
                                {dtDataCategory}
                            </Picker>
                        </View>
                    </Dialog.Content>

                    <Divider />
                    <Dialog.Actions>
                        <Text style={{ marginRight: '30%' }}>
                            Today: {new Date().toString().substr(4, 12)}
                        </Text>
                        <Button color={'#48D1CC'} icon="content-save-all" labelStyle={{ color: 'white' }}
                            loading={load} mode="contained"
                            onPress={() => {
                                setLoad(true);
                                setUserModal(false);
                                setLoad(false);
                            }}
                        >
                            SAVE
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </Provider>
    );
};

export default ModalUserRegister;