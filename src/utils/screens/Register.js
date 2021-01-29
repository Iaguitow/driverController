import React from 'react';
import { Button, View, Text } from 'react-native';

export default function HomeScreen({ navigation },email,passsowrd) {
    console.log("deu");
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>register</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

// ... other code from the previous section