# TriStop

### Polish app displaying a real time timetable from Tristar stop system in Tri-City.
The data comes from [Tristar API](http://ckan.multimediagdansk.pl/dataset/tristar).

Keep in  mind that the data is not 100% accurate. 

It's just an approximation but usually works out much better then fixed timetable.
Although it display the data only up to something like 30 minutes into the future.

## Download
### Android:
1. Make sure you have `unknown sources` option checked
2. Download .apk from [Releases](https://github.com/aklein13/mzkzg/releases)
3. Install it

## Screenshots:

### List of stops
<img src="https://imgur.com/EwkesXl.jpg" width="250px"/>

- You can search in general stop list including every stop from every city or filter by favourites.
- Long press on a stop name to show it on the map

### Stop timetable
<img src="https://imgur.com/5CnLBof.jpg" width="250px"/>

List of departures for specified stop alongside with headsign and destination.
- Press star to add a stop to favourites
- Press refresh icon or use refresh gesture to refresh the list
- Press red cross to exit
- Press to add a bus line to open menu in which you can:
    - add bus line to favourites which will be indicated with a bold font on every stop
    - display bus line on the map

### Map
<img src="https://i.imgur.com/bTKgGV6.png" width="250px"/>

Map of stops (long press on the stop name) or stops with a route (press on the departure).

## Dev Instruction:
1. After downloading repository run [Yarn](https://yarnpkg.com/)
```bash
$ yarn
```
2. Use `react-native run-android`

## TODO:
- sort stops by distance from the user (GPS)
