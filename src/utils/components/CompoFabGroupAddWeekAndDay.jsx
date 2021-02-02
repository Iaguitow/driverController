import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import DialogContext from "../classes/ModalContext.js";

const AddWeekandDay = () => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const {value, setValue} = React.useContext(DialogContext);
  const {valueWeek, setValueWeek} = React.useContext(DialogContext);

  return (
    <Provider>
      <Portal>
        <FAB.Group  fabStyle={{marginBottom:0,backgroundColor:'#ffcc5c'}} color='white'
          open={open}
          icon={open ? 'chemical-weapon' : 'plus'}
          actions={[
            {
              icon: 'plus',
              label: 'Day',
              onPress: () => setValue(true),
            },
            {
              icon: 'plus',
              label: 'Week',
              onPress: () => setValueWeek(true),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
    
  );
};

export default AddWeekandDay;