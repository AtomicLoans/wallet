# CAL Wallet

## Usage

1. `npm install` – install dependences
2. `cd ios && pod install && cd ..` - install CocoaPods
3. `rn-nodeify --install --hack` - install native modules
4. `node node_modules/react-native/local-cli/cli.js bundle --dev false --assets-dest ./ios --entry-file background.js --platform ios --bundle-output ./ios/background.jsbundle` - build background thread bundle
2. `npm run ios` – run demo in iOS simulator

## Demo

![Demo](https://user-images.githubusercontent.com/12267041/88858941-d37aed80-d1c6-11ea-8da4-bfbbe0c7cdce.gif)
