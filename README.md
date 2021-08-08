# Notify me - Solinca

Mobile app that allows the clients of Solinca's fitness clubs to configure his/her favorite classes and clubs and receive a push notification when a spot is available for these classes and also easily check all the classes with available spots in the favorite clubs. This way, there is no need to frequently access Solinca’s app/site to check if some spots emerged for the classes that the user intends to book. This app was developed with React Native using Expo, TypeScript, Styled Components, i18n internationalization and Push Notifications.
Communicates with a Backend developed using Node.JS, Express.JS an MongoDB, which checks the available  classes and saves user preferences, and send push notifications using expo-server-sdk package [Backend GitHub Repository](https://github.com/marianapatcosta/solinca-notification-portal-be). 


![notify-me-solinca-overview](https://user-images.githubusercontent.com/43031902/128646754-08c402f0-af64-49af-be69-9e629341742d.png)
## Project setup

```
yarn install
```


### Compiles and hot-reloads for development using Expo Go

```
yarn start
```

### Build expo app for android devices

```
expo build:android
```

### Build expo app for ios devices

```
expo build:ios
```
