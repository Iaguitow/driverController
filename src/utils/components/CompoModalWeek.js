import * as React from 'react';
import { Button, Paragraph, Dialog, Portal, Provider, Divider, Text, TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import classManagerDriverDay from "../classes/ClassListDriversDay.js"
import DialogContext from "../classes/ModalContext.js";
import toasted from '../components/CompoToast';

const DialogModalWeek = () => {

  const { valueWeek, setValueWeek } = React.useContext(DialogContext);
  const [dateStart, setDateStart] = React.useState(new Date());
  const [dateEnd, setDateEnd] = React.useState(new Date());
  const [weekNumber, setweekNumber] = React.useState(new Date());
  const [realDtEnd, setRealDtEnd] = React.useState(new Date());
  const [load, setLoad] = React.useState(false);

  function pullData() {
    classManagerDriverDay.getManagerNextWeek(function(resultado){
      setDateStart(new Date(resultado[0].dtStart));
      setDateEnd(new Date(resultado[0].dtEnd));
      setweekNumber(resultado[0].weekNumber);
      setRealDtEnd(resultado[0].RealEndDT);
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      pullData();
    }, [])
  );

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
  };

  const [isDatePickerVisible2, setDatePickerVisibility2] = React.useState(false);

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = (date) => {
    hideDatePicker2();
  };

  return (
    <Provider>
      <Portal>
        <Dialog style={{}} visible={valueWeek} onDismiss={() => { setValueWeek(false) }}>
          <Dialog.Title>Register the Week</Dialog.Title>
          <Divider />
          <Dialog.Content>
            <Paragraph>Next week will be:</Paragraph>
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Button color={'#48D1CC'} mode="contained" labelStyle={{ color: 'white' }} 
              style={{ width: '50%' }} title="Show Date Picker" onPress={showDatePicker}>
                {dateStart.toString().substr(4, 12)}
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                minimumDate={dateStart}
                maximumDate={dateStart}
                testID="dateTimePicker"
                value={dateStart}
                mode={'date'}
                is24Hour={true}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                accessibilityLabel={'pickername2'}
              />
              <Button color={'#48D1CC'} mode="contained" labelStyle={{ color: 'white' }} 
              style={{ width: '50%', marginLeft:10 }} title="Show Date Picker" onPress={showDatePicker2}>
                {dateEnd.toString().substr(4, 12)}
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                minimumDate={dateEnd}
                maximumDate={dateEnd}
                testID="dateTimePicker2"
                value={dateEnd}
                mode={'date'}
                is24Hour={true}
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
                accessibilityLabel={'pickername3'}
              />
            </View>
            <TextInput disabled={true} keyboardType={'numeric'} label={'Week Number: '+weekNumber.toString()} style={{ backgroundColor: 'transparent' }}
              theme={{ colors: { placeholder: '#48D1CC', text: '#48D1CC', primary: '#48D1CC', underlineColor: '#48D1CC' } }} />

          </Dialog.Content>
          <Divider />
          <Dialog.Actions>
            <Text style={{ marginRight: '30%' }}>
              Today: {new Date().toString().substr(4, 12)}
            </Text>
            <Button color={'#48D1CC'} icon="content-save-all" labelStyle={{ color: 'white' }}
              loading={load} mode="contained"
              onPress={() => {

                if(new Date(realDtEnd) > new Date()){
                  alert("Only on the last day of this week, "+new Date(realDtEnd).toString().substr(4, 12)+", you'll can create next week."); 
                  }
                  else{
                    setLoad(true);
                    const currentDateStart = (dateStart.getFullYear() + "-" + ("0" + dateStart.getMonth() + 1).slice(-2) + "-" + ("0" + dateStart.getDate()).slice(-2));
                    const currentDateEnd = (dateEnd.getFullYear() + "-" + ("0" + dateEnd.getMonth() + 1).slice(-2) + "-" + ("0" + dateEnd.getDate()).slice(-2));

                    classManagerDriverDay.insertNewWeek(currentDateStart,currentDateEnd,weekNumber, function (resultado) {
                      if (resultado.toString().includes('Update')) {
                        setValueWeek(false);
                        toasted.showToast('Sucess');
                        setLoad(false);
                        pullData();

                      } else if (resultado.toString().includes('Error')) {
                        alert("Error, Something Wrong. Contact Support.");
                        setLoad(false);
                      }
                    });
                }
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

export default DialogModalWeek;