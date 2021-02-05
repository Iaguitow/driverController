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
import ClassUtils from "../classes/ClassUtils.js"
import toasted from '../components/CompoToast';

const ModalUserRegister = () => {

    const {isSwitchOnDisablesUsers, setisSwitchOnDisablesUsers} = React.useContext(ModalContextRegister);
    const { objPeopleToedit, setobjPeopleToedit } = React.useContext(ModalContextRegister);
    const { userModal, setUserModal } = React.useContext(ModalContextRegister)
    const { dsData, setDsData } = React.useContext(ModalContextRegister);
    const [load, setLoad] = React.useState(false);

    const [keyDialog, setkeyDialog] = React.useState(0);
    const [valueName, setValueName] = React.useState("");
    const [valueEmail, setValueEmail] = React.useState("");
    const [valuePassword, setValuePassword] = React.useState("");
    const [phoneNumber, setValuePhone] = React.useState("");

    const [valueActive, setValueActive] = React.useState('Active(Off):');
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const onToggleSwitch = () => {
        setIsSwitchOn(!isSwitchOn)
        !isSwitchOn?setValueActive('Active(On):'):setValueActive('Active(Off):')
    };

    const [keyCategory, setKeyCategory] = React.useState("2");
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
        ClassDBUserRegister.getListPeoples(isSwitchOnDisablesUsers, function(resultado){
            setDsData(resultado);
         });
    }

    useFocusEffect(
        React.useCallback(() => {
            if(userModal){
                setValueName(objPeopleToedit.name);
                setValueEmail(objPeopleToedit.email);
                setValuePassword(objPeopleToedit.password);
                setValuePhone(objPeopleToedit.phonenumber);
                setValueActive(objPeopleToedit.active==""||objPeopleToedit.active=="N"?'Active(Off):':'Active(On):');
                setIsSwitchOn(objPeopleToedit.active==""||objPeopleToedit.active=="N"?false:true);
                setKeyCategory(objPeopleToedit.fk_idcategory.toString());
                setkeyDialog(keyDialog+1);
            }
            pullDataCategory();
        }, [userModal])
    );
    
    return (
        <Provider>
            <Portal>
                <Dialog key={keyDialog} style={{}} visible={userModal} onDismiss={() => {
                    setUserModal(false);
                    
                    }}>
                    <Dialog.Title>Register New User</Dialog.Title>
                    <Divider />

                    <Dialog.Content>
                        <View>
                        <Paragraph>Personal Data:</Paragraph>
                        <TextInput
                            label={'Name*: '}
                            type="text"
                            defaultValue={valueName}
                            onEndEditing={(textName) => {setValueName(textName.nativeEvent.text);}}
                            style={{ backgroundColor: 'transparent', width: "100%" }}
                            theme={{
                                colors: {
                                    placeholder: 'black', text: 'black',
                                    primary: '#48D1CC', underlineColor: '#48D1CC'
                                }
                            }} />
                        <TextInput
                            label={'E-mail*: '}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            defaultValue={valueEmail}
                            onEndEditing={(textEmail) => {setValueEmail(textEmail.nativeEvent.text);}}
                            style={{ backgroundColor: 'transparent', width: "100%" }}
                            theme={{
                                colors: {
                                    placeholder: 'black', text: 'black',
                                    primary: '#48D1CC', underlineColor: '#48D1CC'
                                }
                            }} />
                        <View style={{ flexDirection: 'row', padding: 0 }}>
                            <TextInput
                                label={'Phone Number*: '}
                                type="text"
                                defaultValue={phoneNumber}
                                onEndEditing={(textPhone) => {setValuePhone(textPhone.nativeEvent.text);}}
                                keyboardType="numeric"
                                maxLength={11}
                                style={{ backgroundColor: 'transparent', width: "48%" }}
                                theme={{
                                    colors: {
                                        placeholder: 'black', text: 'black',
                                        primary: '#48D1CC', underlineColor: '#48D1CC'
                                    }
                                }} />
                            <TextInput
                                label={'Password*: '}
                                defaultValue={valuePassword}
                                onEndEditing={(textPassword) => {setValuePassword(textPassword.nativeEvent.text);}}
                                maxLength={15}
                                style={{ backgroundColor: 'transparent', width: "48%",marginLeft:8 }}
                                theme={{
                                    colors: {
                                        placeholder: 'black', text: 'black',
                                        primary: '#48D1CC', underlineColor: '#48D1CC'
                                    }
                                }} />

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
                                selectedValue={keyCategory}
                                onValueChange={(idCategorySelected) => {setKeyCategory(idCategorySelected.toString());}}
                            >
                                {dtDataCategory}
                            </Picker>
                        </View>
                        </View>
                    </Dialog.Content>

                    <Divider />
                    <Dialog.Actions>
                        <View style={{flexDirection: 'row',marginRight:"25%"}}>
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
                        <Button color={'#48D1CC'} icon="content-save-all" labelStyle={{ color: 'white' }}
                            loading={load} mode="contained"
                            onPress={() => {
                                setLoad(true);
                                if(ClassUtils.validateEmail(valueEmail)){
                                    if(objPeopleToedit.idpeople!=0){
                                        ClassDBUserRegister.updateUser(
                                            valueName,
                                            valueEmail,
                                            valuePassword,
                                            keyCategory,
                                            isSwitchOn?'S':'N',
                                            phoneNumber, objPeopleToedit.idpeople, function(resultado) {
                                                if(resultado.toString().includes("Sucessfully")){
                                                    pullData();
                                                    setUserModal(false);
                                                    toasted.showToast("Refresh");
                                                    
                                                }else{
                                                    alert(resultado);

                                                }
                                            setLoad(false);
                                        });

                                    }else{

                                        if(valueName==""){
                                            alert("Name Required.");
                                            setLoad(false);
                                            return null;

                                        }else if(valueEmail==""){
                                            alert("E-mail Required.");
                                            setLoad(false);
                                            return null;

                                        }else if(valuePassword==""){
                                            alert("Password Required.");
                                            setLoad(false);
                                            return null;

                                        }else if(phoneNumber==""){
                                            alert("Phone Number Required.");
                                            setLoad(false);
                                            return null;
                                        }

                                        ClassDBUserRegister.insertNewUser(
                                            valueName,
                                            valueEmail,
                                            valuePassword,
                                            keyCategory,
                                            isSwitchOn?'S':'N',
                                            phoneNumber, function(resultado) {
                                                if(resultado.toString().includes("Sucessfully")){
                                                    pullData();
                                                    setUserModal(false);
                                                    toasted.showToast("Sucess");
                                                    
                                                }else{
                                                    alert(resultado);

                                                }
                                            setLoad(false);
                                        });
                                    }
                                }
                                else{
                                    alert("Invalid E-mail, try another one.");
                                    setLoad(false);
                                }
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