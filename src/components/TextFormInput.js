import React from 'react';
import {
  Text,
  TextInput,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles/TextFormInput.styles';

const TextFormInput = (props) => {
  const { label, onChangeText, value } = props;
  return (
    <View>
      <Text style={styles.text}>
        {label}
      </Text>
      <TextInput style={styles.input} onChangeText={onChangeText} value={value} />
    </View>
  );
};

TextFormInput.propTypes = {
  label: PropTypes.string,
  onChangeText: PropTypes.func,
  value: PropTypes.string,
};

TextFormInput.defaultProps = {
  label: '',
  onChangeText: () => {},
  value: '',
};

export default TextFormInput;
