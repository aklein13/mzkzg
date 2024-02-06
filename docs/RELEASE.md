# Release instructions

1. Set variables in files:
    - `MYAPP_RELEASE_KEY_PASSWORD` and `MYAPP_RELEASE_STORE_PASSWORD` in `android/gradle.properties`
    - `API_KEY` in `android/app/src/main/AndroidManifest.xml`
1. Bump `versionCode` in `android/app/build.gradle`
1. Enter `android` folder
1. `./gradlew assembleRelease` for `.apk` file to test on real device
1. `./gradlew bundleRelease` for `.aab` file to upload to Google Play Console
