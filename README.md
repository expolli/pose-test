# pose-test

Barebones tfjs image pose detection with Expo 51.

- Working OK with older devices eg Android 11, iOS 15.8.1, iOS 17.4.1. 
- NOT working with newer Android 12, 13, 14.

```
 npm i --force
 npm run start
```

Install Expo Go on your device and read QR-code. Check console logs (running time 10-20s depending on device).

OK case:
```
 LOG  start
 LOG  {"poses": [{"keypoints": [Array], "keypoints3D": [Array], "score": 0.99951171875}]}
```
Failing case:
```
 LOG start
 LOG  {"poses": []}
```
