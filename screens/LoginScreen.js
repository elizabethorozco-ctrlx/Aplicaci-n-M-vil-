import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import { loginUser } from '../utils/auth';

export default function LoginScreen({ navigation }) {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!credentials.email.includes('@')) newErrors.email = 'Correo inválido';
    if (credentials.password.length < 6) newErrors.password = 'Contraseña demasiado corta';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    const success = await loginUser(credentials);
    if (success) {
      Alert.alert('Bienvenido', 'Inicio de sesión exitoso');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <InputField label="Correo electrónico" value={credentials.email} onChangeText={text => setCredentials({ ...credentials, email: text })} keyboardType="email-address" error={errors.email} />
      <InputField label="Contraseña" value={credentials.password} onChangeText={text => setCredentials({ ...credentials, password: text })} secureTextEntry error={errors.password} />
      <ButtonPrimary title="Entrar" onPress={handleLogin} />
      <ButtonPrimary title="Crear nueva cuenta" onPress={() => navigation.navigate('Register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});