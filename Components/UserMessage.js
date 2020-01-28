import styles from '../Styles/Styles';
import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class MyMessage extends Component {

    render() {
        return (
            <View style={styles.userMessageRow}>
                <Text style={styles.userTimeText}>{this.props.time}</Text>
                <View style={styles.userMessageContainer} backgroundColor={this.props.background}>
                    <View flex={1} flexDirection="row">
                        <Text style={styles.otherUserName}>{this.props.name}</Text>
                        <Text style={styles.otherUserName}>:</Text>
                        <Text style={styles.otherUserIp}>{this.props.isyour}</Text>
                    </View>
                    <Text style={styles.userMessageText}>{this.props.text}</Text>
                </View>
            </View>
        )
    }
};

export default MyMessage;

