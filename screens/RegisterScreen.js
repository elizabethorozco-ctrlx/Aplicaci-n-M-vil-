import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import InputField from '../components/InputField';
import ButtonPrimary from '../components/ButtonPrimary';
import { registerUser } from '../utils/auth';

export default function RegisterScreen({ navigation }) {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!user.name) newErrors.name = 'El nombre es obligatorio';
    if (!user.email.includes('@')) newErrors.email = 'Correo inválido';
    if (user.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    const success = await registerUser(user);
    if (success) {
      Alert.alert('Registro exitoso', 'Ahora puedes iniciar sesión');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'El correo ya está registrado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>
      <InputField label="Nombre" value={user.name} onChangeText={text => setUser({ ...user, name: text })} error={errors.name} />
      <InputField label="Correo electrónico" value={user.email} onChangeText={text => setUser({ ...user, email: text })} keyboardType="email-address" error={errors.email} />
      <InputField label="Contraseña" value={user.password} onChangeText={text => setUser({ ...user, password: text })} secureTextEntry error={errors.password} />
      <ButtonPrimary title="Registrar" onPress={handleRegister} />
      <ButtonPrimary title="Ya tengo una cuenta" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});