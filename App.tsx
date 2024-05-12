import * as tf from "@tensorflow/tfjs"
import { decodeJpeg } from "@tensorflow/tfjs-react-native"
import * as posedetection from "@tensorflow-models/pose-detection"
import { Asset } from "expo-asset"
import { useEffect, useState } from "react"
import { View, Text } from "react-native"

export default function App() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = async () => {
      try {
        await tf.ready()
        setReady(true)
      } catch (error) {
        console.log({ e: error })
      }
    }
    console.log("start")
    start()
  }, [])

  useEffect(() => {
    async function processImage() {
      const [{ localUri }] = await Asset.loadAsync(
        require("./assets/image.jpg")
      )
      try {
        const detector = await posedetection.createDetector(
          posedetection.SupportedModels.BlazePose,
          {
            runtime: "tfjs",
          }
        )
        const response = await fetch(localUri!)
        // printTime('fetched')
        const imageDataArrayBuffer = await response.arrayBuffer()
        const imageData = new Uint8Array(imageDataArrayBuffer)
        const imageTensor = decodeJpeg(imageData)
        const poses = await detector.estimatePoses(imageTensor)
        console.log({ poses })
      } catch (error) {
        console.log({ error })
      }
    }
    if (ready) {
      processImage()
    }
  }, [ready])

  return (
    <View>
      <Text>Pose example</Text>
    </View>
  )
}
