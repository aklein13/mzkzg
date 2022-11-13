1. `./gradlew bundleRelease`
2. Set `API_KEY` in `./app/src/main/AndroidManifest.xml`
3. Set `MYAPP_RELEASE_STORE_PASSWORD` (cp-clip) in `gradle.properties`

In case of `keystore load: Keystore was tampered with, or password was incorrect` remove `./app/build`. I wasted 1 hour
on this...
