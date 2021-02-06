import * as React from 'react';
import { 
    Button, Paragraph, Dialog, 
    Portal, Provider, Divider, Text, 
    TextInput, IconButton } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

//import classManagerDriverWeek from "../classes/ClassDBUserRegister.js"
import ModalContextRegister from "../classes/ModalContextRegister.js";
import ClassDBRoute from "../classes/ClassDBRoute.js";
import toasted from '../components/CompoToast';

const RouteDialog = () => {
    
    const { routeModal, setRouteModal } = React.useContext(ModalContextRegister);
    const [valueName, setValueName] = React.useState("");
    const [valueKey, setValueKey] = React.useState("");
    const [valuePrice, setvaluePrice] = React.useState("");
    const [Load, setLoad] = React.useState(false);

    return (
        <Provider>
            <Portal>
                <Dialog style={{}} visible={routeModal} onDismiss={() => {setRouteModal(false) }}>
                    <Dialog.Title>Register New Route</Dialog.Title>
                    <Divider />
                    <Dialog.Content>
                        <Paragraph>Attention! Each key MUST be unique.</Paragraph>
                        <Paragraph style={{fontWeight:"bold"}}>ROUTE NAME:</Paragraph>
                        <TextInput
                                autoCapitalize="characters"
                                placeholder="Route"
                                placeholderTextColor="rgba(0,0,0,0.3)"
                                mode="outlined"
                                defaultValue={valueName}
                                onEndEditing={(textName) => {setValueName(textName.nativeEvent.text);}}
                                style={{ backgroundColor: 'transparent', marginLeft:-15, width: "110%" }}
                                theme={{
                                    colors: {
                                        placeholder: 'black', text: 'black',
                                        primary: '#48D1CC', underlineColor: '#48D1CC'
                                    }
                                }} 
                            />
                        <Paragraph style={{fontWeight:"bold"}}>KEY AND PRICE:</Paragraph>
                        <View style={{ flexDirection: 'row', marginLeft:-30, width:"110%" }}>
                            <TextInput
                                autoCapitalize="characters"
                                placeholder="Key"
                                placeholderTextColor="rgba(0,0,0,0.3)"
                                mode="outlined"
                                maxLength={6}
                                defaultValue={valueKey}
                                onEndEditing={(textKey) => {setValueKey(textKey.nativeEvent.text);}}
                                style={{ backgroundColor: 'transparent', width: "30%", marginLeft:15 }}
                                theme={{
                                    colors: {
                                        placeholder: 'black', text: 'black',
                                        primary: '#48D1CC', underlineColor: '#48D1CC'
                                    }
                                }} 
                            />

                            <TextInput
                                keyboardType={"numeric"}
                                placeholder="Price"
                                placeholderTextColor="rgba(0,0,0,0.3)"
                                mode="outlined"
                                maxLength={3}
                                defaultValue={valuePrice}
                                onEndEditing={(textKey) => {setvaluePrice(textKey.nativeEvent.text);}}
                                style={{ backgroundColor: 'transparent', width: "50%", marginLeft:5 }}
                                theme={{
                                    colors: {
                                        placeholder: 'black', text: 'black',
                                        primary: '#48D1CC', underlineColor: '#48D1CC'
                                    }
                                }} 
                            />      
                        </View>
                    </Dialog.Content>

                    <Divider />

                    <Dialog.Actions style={{}}>
                        <Button 
                            color={'#48D1CC'} icon="content-save-all" labelStyle={{ color: 'white' }}
                            style={{width:100,marginLeft:-15,marginTop:5}}
                            loading={Load} mode="contained"
                            onPress={() => {
                                setLoad(true);
                                ClassDBRoute.insertNewRoute( valueName, valueKey, valuePrice, function (resultado) {
                                    if(resultado.toString().includes("Sucessfully")){
                                        toasted.showToast("Sucess");
                                        setValueKey("");
                                        setValueName("");
                                        setvaluePrice("");
                                        setRouteModal(false);
                                        
                                    }else{
                                        alert(resultado);

                                    }
                                setLoad(false);
                                });
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

export default RouteDialog;