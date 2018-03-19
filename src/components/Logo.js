import React from 'react';
import {
  Image,
  View,
} from 'react-native';
import styles from './styles/Logo.styles';

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={{ uri: '' }} />
    </View>
  );
};

export default Logo;
