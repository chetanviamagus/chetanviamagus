interface Window {
  isIos: () => boolean;
  isInStandaloneModeIOS: () => boolean;
  isAndroid: () => boolean;
  isInStandaloneModeAndroid: () => boolean;
  env: any;
  navigation: any;
}
