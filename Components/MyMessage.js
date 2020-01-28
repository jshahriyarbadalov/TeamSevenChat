import styles from '../Styles/Styles';
import React, { Component } from 'react';
import {View, Text, AsyncStorage} from 'react-native';

export class MyMessage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            color: '#ffffff',
        };
    }


    _getItem = async() => {
        try {
            const value = await AsyncStorage.getItem('userColor');
            if (value !== null) {
                this.setState({color: value});
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this._getItem();
        const { navigation } = this.props;
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            this._getItem();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {

        const {color} = this.state;

        return (
            <View style={styles.myMessageRow}>
                <Text style={styles.timeText}>{this.props.time}</Text>
                <View style={styles.myMessageContainer} backgroundColor={color}>
                    <Text style={styles.myMessageText}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
};

export default MyMessage;

