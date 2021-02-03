import * as React from 'react';
import {
    Button,
    Paragraph,
    Dialog,
    Portal,
    Provider,
    Divider,
    Text,
    TextInput
} from 'react-native-paper';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import classManagerDriverWeek from "../classes/ClassDBDriversWeek.js"
import ModalContextRegister from "../classes/ModalContextRegister.js";
import toasted from '../components/CompoToast';

const ModalUserRegister = () => {

    const { userModal, setUserModal } = React.useContext(ModalContextRegister);
    const [load, setLoad] = React.useState(false);

    function pullData() {
        /*classManagerDriverWeek.getManagerNextWeek(function(resultado){
         });*/
    }

    useFocusEffect(
        React.useCallback(() => {
            pullData();
        }, [])
    );

    return (
        <Provider>
            <Portal>
                <Dialog style={{}} visible={userModal} onDismiss={() => { setUserModal(false) }}>
                    <Dialog.Title>Register New User</Dialog.Title>
                    <Divider />
                    <Dialog.Content>
                        <Paragraph>Next week will be:</Paragraph>
                        <View style={{ flexDirection: 'row', padding: 5 }}>

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