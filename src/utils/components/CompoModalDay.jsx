import * as React from 'react';
import { Button, Paragraph, Dialog, Portal, Provider, Divider, Text } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import classManagerDriverDay from "../classes/ClassDBDriversDay.js"
import DialogContext from "../classes/ModalContext.js";
import toasted from '../components/CompoToast';

const DialogModalDay = () => {
  
  const { value, setValue } = React.useContext(DialogContext);
  const { dtData, setDtData } = React.useContext(DialogContext);
  const [dateToday, setDate] = React.useState(new Date());
  const [load, setLoad] = React.useState(false);

  function pullData() {
    classManagerDriverDay.getManagerListDay(function (resultado) {
      setDtData(resultado);
    });
  }

  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date)
    hideDatePicker();
  };

  return (
    <Provider>
      <Portal>
        <Dialog style={{}} visible={value} onDismiss={() => { setValue(false) }}>
          <Dialog.Title>Register the Day</Dialog.Title>
          <Divider />
          <Dialog.Content>
            <Paragraph>Select the Date.</Paragraph>
            <Button color={'#48D1CC'} mode="contained" labelStyle={{ color: 'white' }} onPress={showDatePicker}>
              {dateToday.toString().substr(4, 12)}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              accessibilityLabel={'pickername1'}
            />
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
                const currentDateFormated = (dateToday.getFullYear()+"-"+("0"+(dateToday.getMonth()+1)).slice(-2)+"-"+("0"+dateToday.getDate()).slice(-2));
                classManagerDriverDay.insertNewDay(currentDateFormated, function (resultado) {
                  if (resultado.toString().includes('Update')) {
                    toasted.showToast('Sucess');
                    pullData();
                    setLoad(false);
                    setValue(false);
                    
                  } else if (resultado.toString().includes('Error')) {
                    alert("Error, Register a Week for this day. Or try another day. Or this day already exist!");
                    setLoad(false);
                  }
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

export default DialogModalDay;