# Plan de Implementación - FletGo App

## 1. Estructura del Proyecto
- Inicializar proyecto React Native con Expo
- Configurar estructura de carpetas:
  ```
  /src
    /assets
      /images
        logo.png
    /screens
      LoginScreen.js
    /components
      PhoneInput.js
      CustomButton.js
    /theme
      colors.js
      typography.js
  ```

## 2. Diseño de Pantalla de Login
- Implementar diseño minimalista y moderno
- Elementos principales:
  - Logo FletGo centrado en la parte superior
  - Input de teléfono con selector de código de país
  - Botón principal "Iniciar Sesión"
  - Texto y link para "Registrarse"

## 3. Paleta de Colores
```javascript
export const colors = {
  primary: '#000000',      // Negro del logo
  secondary: '#40E0D0',    // Turquesa/Verde agua
  text: '#808080',         // Gris del texto
  background: '#FFFFFF',   // Fondo blanco
  inputBg: '#F5F5F5',     // Fondo de inputs
}
```

## 4. Componentes a Desarrollar
1. PhoneInput
   - Selector de código de país
   - Campo de número telefónico
   - Validación de formato

2. CustomButton
   - Botón principal con estilo corporativo
   - Estados: normal, presionado, deshabilitado

## 5. Funcionalidades Iniciales
- Validación de número telefónico
- Integración con códigos de país de Centroamérica
- Navegación básica hacia pantalla de registro

## 6. Dependencias Necesarias
- expo
- react-native
- react-navigation
- react-native-phone-number-input
- expo-linear-gradient (para efectos visuales)
