import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import {Camera, useCameraPermission, useCameraDevice, useFrameProcessor} from "react-native-vision-camera";

export default function Index() {

  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    if(!hasPermission){
      requestPermission();
    }
  }, [hasPermission]);

  if(!hasPermission){
    return (
      <Text>Please enable camera permissions in settings</Text>
    );
  }

  if(device == null){
    return (
      <Text>Camera was not found</Text>
    );
  }

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const buffer = frame.toArrayBuffer();
    const data = new Uint8Array(buffer);
    for(let i = 0; i < 30; i += 3){
      console.log(`${data[i]} ${data[i+1]} ${data[i+2]}`)
    }
    console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`)
  }, [])

  return (
    <Camera
      frameProcessor={frameProcessor}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
    />
  );
}
