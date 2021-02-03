import * as React from 'react';
import { FAB, Portal, Provider } from 'react-native-paper';
import ModalContextRegister from "../classes/ModalContextRegister.js";

const AddUserAndRoute = () => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const { userModal, setUserModal } = React.useContext(ModalContextRegister);
  const { routeModal, setRouteModal } = React.useContext(ModalContextRegister);

  return (
    <Provider>
      <Portal>
        <FAB.Group  fabStyle={{marginBottom:0,backgroundColor:'#ffcc5c'}} color='white'
          open={open}
          icon={open ? 'chemical-weapon' : 'plus'}
          actions={[
            {
              icon: 'account-multiple-plus',
              label: 'Users',
              onPress: () => setUserModal(true),
            },
            {
              icon: 'routes-clock',
              label: 'Routes',
              onPress: () => setRouteModal(true),
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

export default AddUserAndRoute;