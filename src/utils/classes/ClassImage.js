import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

export default function ImagePickers(callback) {

  (async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  })

  async function resizeImage(image, callback) {
    const manipResult = await ImageManipulator.manipulateAsync(
      image.localUri || image.uri,
      [{ resize: {height:160} }],
      { compress: 1, base64:true, format: ImageManipulator.SaveFormat.PNG }
    );
    callback(manipResult);
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      resizeImage(result, function (imageResizeble){
        callback(imageResizeble);
      });
    }
  };

  
  pickImage();
}