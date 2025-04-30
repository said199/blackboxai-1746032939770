
Built by https://www.blackbox.ai

---

```markdown
# FletGo App

## Project Overview
FletGo App is a simple and modern mobile application built with React Native using Expo. This application focuses on providing a user-friendly login experience, featuring phone number input with country code selection. The app is designed to be minimalistic yet functional, catering to users across Central America.

## Installation
To get started with the FletGo App, ensure you have Node.js and Expo installed on your machine. Follow the steps below:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/fletgo-app.git
   cd fletgo-app
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   expo start
   ```

4. Scan the QR code with your Expo Go app on your mobile device, or run it on an emulator.

## Usage
Once the app is running, you'll see a sleek login screen featuring:

- A logo at the top
- A phone number input field with a country code selector
- A primary "Iniciar Sesión" button
- A link for users to register if they don’t have an account

The app currently supports validation for phone numbers, especially for users in Central America.

## Features
- Minimalistic and modern design
- Phone number input with validation
- Country code selector tailored for Central American codes
- Basic navigation to the registration screen

## Dependencies
The FletGo App relies on the following dependencies to function correctly:

- **expo**: A framework for React Native.
- **react-native**: A core library for a mobile app.
- **react-navigation**: For handling navigation in the application.
- **react-native-phone-number-input**: For easy phone number input and validation.
- **expo-linear-gradient**: For visual enhancement using linear gradients.

To view the full list of installed dependencies, see the package.json file.

## Project Structure
The folder structure of the FletGo App is organized as follows:

```
/src
  /assets
    /images
      logo.png         # Icon/logo used in the application
  /screens
    LoginScreen.js     # Main screen for user login
  /components
    PhoneInput.js      # Custom input component for phone number
    CustomButton.js     # Custom button with corporate styling
  /theme
    colors.js          # Color palette used throughout the application
    typography.js      # Typography styles for text elements
```

The organization of components and screens facilitates easy navigation and maintenance of the codebase, ensuring expandability for future features.

## Conclusion
The FletGo App is a continuing project that aims to enhance user experience with simple features. Contributions and feedback are welcome as we work towards adding more functionalities and optimizing performance.

Feel free to reach out or contribute to the development!
```