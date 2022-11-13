# Build

1. Set `API_KEY` in `./app/src/main/AndroidManifest.xml`
2. Set `MYAPP_RELEASE_STORE_PASSWORD` (cp-clip) in `gradle.properties`
3. `./gradlew bundleRelease` for Play Store (`./app/builds/outputs/bundle/release/app.aab`)
4. `./gradlew assembleRelease` for .apk (`./app/builds/outputs/apk/release/app-release.apk`)

In case of `keystore load: Keystore was tampered with, or password was incorrect` remove `./app/build`. I wasted 1 hour
on this...
