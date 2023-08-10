import React, { useState, useRef } from 'react';
import { Camera, Type } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';

export default function App() {
  // Kamera tipi (arka-ön) 
  const [type, setType] = useState(Camera.Constants.Type.back);
  // Kamera referansı 
  const cameraRef = useRef(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // Permission alma:
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, exif: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      console.log('Photo captured:', photo);
      
    }
  };
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;
  const cardWidth = 5; // in cm
  const cardHeight = 8; // in cm
  //const frameWidth = (cardWidth / 14) * screenWidth; // Assuming 14cm is the card width at the current distance
  //const frameHeight = (cardHeight / 14) * screenHeight;
  

  // Ön kamera - arka kamera geçişini sağlar. Tetiklendiğinde arka kamera açıksa ön kamera açılır, ön kamera açıksa arka kamera açılır.
  const toggleCameraType = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
    
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Next ➤</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={[styles.frame, { width: cardWidth, height: cardHeight }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});