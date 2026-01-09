import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.serviceoncall.app',
  appName: 'Service On Call',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000, // Shows splash for 2 seconds
      launchAutoHide: true,
      backgroundColor: "#ffffff", // Change to your brand color (e.g., #000000 for black)
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;