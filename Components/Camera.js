import React, {useState, useEffect} from "react";{}
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet,Text,View } from "react-native";
import { Camera, CameraType, getCameraPermissionsAsync, requestCameraPermissionsAsync } from "expo-camera";

export default () => {
    const type = useState(CameraType.back) // Default camera type
    const [permission, requestPermission] = Camera.useCameraPermissions();
    
    useEffect(() =>{
        requestPermissions();
    })

    const requestPermissions = async () => {
        await requestCameraPermissionsAsync(); 
    }
    const getPermissions = async () => {
        const cameraPermission = await getCameraPermissionsAsync();
        return cameraPermission.granted
    }
    if(!getPermissions()){
        return Alert.alert("İzin gerekli.", "Kamera erişimi için izin verin", [{text: "Tamam"}]);
    }

    return(
        <View style={styles.container}>
            <Camera style={styles.camera} type={type}>

            </Camera>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
});