import React, { Component } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { Picker } from 'react-native-picker-dropdown';
import styles from './styles/Login.styles';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: '',
            username: '',
            email: '',
        };
    }
    onPress = () => {
        this.setState({
            status: '',
            username: '',
            email: '',
        })
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={{ uri: '' }} />
                </View>
                <View style={styles.form}>
                    <View style={styles.formInput}>
                        <Text style={styles.text}>
                            身份 ：
                        </Text>
                        <Picker
                            style={styles.picker}
                            textStyle={styles.text}
                            selectedValue={this.state.status}
                            onValueChange={(itemValue, itemIndex) => this.setState({status: itemValue})}>
                            <Picker.Item label='老師' value='teacher' />
                            <Picker.Item label='學生' value='student' />
                        </Picker>
                        <Text style={styles.text}>
                            暱稱 ：
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(username) => this.setState({username})}
                            value={this.state.username} />
                        <Text style={styles.text}>
                            E-mail :
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(email) => this.setState({email})}
                            value={this.state.email} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            underlayColor='steelblue'
                            onPress={this.onPress}
                            style={styles.button}>
                            <Text style={styles.buttonLabel}>
                                註冊
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }
}
