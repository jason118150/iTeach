import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import styles from '../../styles';

const Button = (props) => {
    const { label, onPress } = props;
    return (
        <TouchableHighlight
            underlayColor='#CCC'
            onPress={() => onPress && onPress()}
            style={styles.button}>
            <Text style={styles.text}>
                {label}
            </Text>   
        </TouchableHighlight>
    );
};

Button.propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func,
};

Button.defaultProps = {
    label: '',
    onPress: () => {},
};

export default Button;
