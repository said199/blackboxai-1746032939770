import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useUserMode } from '../context/UserModeContext';
import { useUser } from '../context/UserContext';

export function DrawerContent(props) {
  const { isDriverMode, toggleDriverMode } = useUserMode();
  const { userData } = useUser();

  const defaultAvatar = 'https://www.fletgohn.com/backend/default-avatar.png';

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <DrawerContentScrollView {...props}>
          <View style={styles.userSection}>
            <View style={styles.userContainer}>
              <Image 
                source={{ uri: userData.photo || defaultAvatar }} 
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{userData.name || 'Usuario'}</Text>
                <Text style={styles.userEmail}>{userData.email || 'correo@ejemplo.com'}</Text>
                <Text style={styles.location}>{userData.location || 'Honduras'}</Text>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => {
                  props.navigation.navigate('EditProfile');
                  props.navigation.closeDrawer();
                }}
              >
                <MaterialCommunityIcons 
                  name="pencil" 
                  size={24} 
                  color={colors.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.drawerContent}>
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons 
                  name={isDriverMode ? "magnify" : "home-outline"} 
                  size={size} 
                  color={colors.secondary} 
                />
              )}
              label={isDriverMode ? "Buscar Fletes" : "Pedir un flete"}
              onPress={() => {
                props.navigation.navigate('Home');
                props.navigation.closeDrawer();
              }}
              labelStyle={styles.drawerLabel}
            />
            
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons name="car-outline" size={size} color={colors.text} />
              )}
              label="Mis fletes"
              onPress={() => {
                props.navigation.navigate('MyFletes');
                props.navigation.closeDrawer();
              }}
              labelStyle={styles.drawerLabel}
            />
            
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons 
                  name={isDriverMode ? "cash" : "file-document-outline"} 
                  size={size} 
                  color={colors.text} 
                />
              )}
              label={isDriverMode ? "Mis Ingresos" : "Mis Facturas"}
              onPress={() => {
                props.navigation.navigate(isDriverMode ? 'Income' : 'Invoices');
                props.navigation.closeDrawer();
              }}
              labelStyle={styles.drawerLabel}
            />
            
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons name="message-outline" size={size} color={colors.text} />
              )}
              label="Contáctanos"
              onPress={() => {
                props.navigation.navigate('Contact');
                props.navigation.closeDrawer();
              }}
              labelStyle={styles.drawerLabel}
            />

            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons name="alert-outline" size={size} color={colors.text} />
              )}
              label="Emergencia"
              onPress={() => {
                props.navigation.navigate('Emergency');
                props.navigation.closeDrawer();
              }}
              labelStyle={styles.drawerLabel}
            />
            
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons 
                  name={isDriverMode ? "account" : "account-convert"} 
                  size={size} 
                  color={isDriverMode ? colors.secondary : colors.text} 
                />
              )}
              label={isDriverMode ? "Modo Cliente" : "Modo Conductor"}
              onPress={() => {
                if (!isDriverMode && !userData.isDriverRegistered) {
                  // Navigate to driver registration screen if not registered
                props.navigation.navigate('DriverRegistration');
                props.navigation.closeDrawer();
                } else {
                  toggleDriverMode();
                  props.navigation.closeDrawer();
                }
              }}
              labelStyle={[
                styles.drawerLabel,
                isDriverMode && styles.activeLabel
              ]}
            />
            
            <DrawerItem
              icon={({ size }) => (
                <MaterialCommunityIcons name="logout" size={size} color={colors.text} />
              )}
              label="Salir"
              onPress={() => {
                // Handle logout logic here
                props.navigation.navigate('Login');
                props.navigation.closeDrawer();
              }}
              labelStyle={styles.drawerLabel}
            />
          </View>
        </DrawerContentScrollView>
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => props.navigation.closeDrawer()}
        accessibilityLabel="Cerrar menú"
      >
        <MaterialCommunityIcons name="close" size={24} color={colors.darkGreen} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    right: -20,
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  userSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.inputBg,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.inputBg,
  },
  userInfo: {
    flex: 1,
    marginLeft: 15,
  },
  editButton: {
    padding: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: colors.text,
    marginTop: 4,
  },
  drawerContent: {
    flex: 1,
    paddingTop: 10,
  },
  drawerLabel: {
    fontSize: 14,
    color: colors.text,
  },
  activeLabel: {
    color: colors.secondary,
  },
});
