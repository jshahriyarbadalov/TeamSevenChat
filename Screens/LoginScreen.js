import styles from '../Styles/Styles';
import React, { Component } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, AsyncStorage, Dimensions } from 'react-native';
import ChatScreen from './ChatScreen';

const url = 'http://web-chat.eu-4.evennode.com/getip';
const urlPut = 'http://web-chat.eu-4.evennode.com/putuser';


export class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: '',
            name: '',
            users: [],
            myname: '',
        };

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            orientation: isPortrait() ? 'portrait' : 'landscape'
        };

        // Event Listener for orientation changes
        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    getUserIp() {
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ ip: responseJson.ip });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getUserName() {
        fetch(urlPut, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                id: this.state.id,
                state: true,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ myname: responseJson })
            })
    }

    _getName = async () => {
        try {
            const value = await AsyncStorage.getItem('userName');
            if (value !== null) {
                this.setState({ name: value });
                console.log(value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    componentDidMount() {
        this.getUserIp();
        this._getName();
        this.getUserName();
    }

    render() {
        const { ip, myname, name } = this.state;
        if (this.state.orientation === 'portrait') {
            console.log(myname)
            if (myname !== 0) {
                return (
                    <SafeAreaView style={styles.welcomeScreenContainer}>
                        <KeyboardAvoidingView
                            style={{ flex: 1, }} behavior='padding'
                            keyboardVerticalOffset={
                                Platform.select({
                                    ios: () => 110,
                                    android: () => -150
                                })()
                            }>
                            <View style={styles.welcomeScreenInner}>
                                <Image source={require('../images/logo.png')} style={styles.loginScreenLogo} />
                                <Text style={styles.loginIpTitle}>
                                    Ваш IP:
                                </Text>
                                <Text style={styles.loginIpNumber}>
                                    {ip}
                                </Text>
                                <Text style={styles.loginApproveText}>
                                    Вы зарегестрированный пользователь, введите пожалуйста свое имя:
                                </Text>
                                <TextInput value={ name } style={styles.loginTextInput} />
                                <TouchableOpacity style={styles.loginButton}
                                    onPress={() => this.props.navigation.navigate('ChatScreen')}>
                                    <Text style={styles.loginBtnText}>Войти</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                )
            } else {
                return (
                    <SafeAreaView style={styles.welcomeScreenContainer}>
                        <View style={styles.welcomeScreenInner}>
                            <Image source={require('../images/logo.png')} style={styles.loginScreenLogo} />
                            <Text style={styles.loginIpTitle}>
                                Ваш IP:
                            </Text>
                            <Text style={styles.loginIpNumber}>
                                {ip}
                            </Text>
                            <Text style={styles.loginApproveText}>
                                Вы не зарегестрированный пользователь, пожалуйста, зарегестрируйтесь
                            </Text>
                            <TouchableOpacity style={styles.registrationButton}
                                onPress={() => this.props.navigation.navigate('RegistrationScreen')}>
                                <Text style={styles.registrationBtnText}>Регистрация</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )
            }
        } else {
            if (myname !== 0) {
                return (
                    <SafeAreaView style={styles.welcomeScreenContainer}>
                        <KeyboardAvoidingView
                            style={{ flex: 1, }} behavior='padding'
                            keyboardVerticalOffset={
                                Platform.select({
                                    ios: () => 110,
                                    android: () => -150
                                })()
                            }>
                            <View style={styles.welcomeScreenInner} flex={1} flexDirection='row'>
                                <View flex={2} flexDirection='column'>
                                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={require('../images/logo.png')} style={styles.loginScreenLogoLand} />
                                        <Text style={styles.loginIpTitleLand}>
                                            Ваш IP:
                                        </Text>
                                        <Text style={styles.loginIpNumber}>
                                            {ip}
                                        </Text>
                                        <Text style={styles.loginApproveTextLand} >
                                            Вы зарегестрированный пользователь, введите пожалуйста свое имя:
                                        </Text>
                                    </View>
                                </View>
                                <View flex={2} flexDirection='column'>
                                    <TextInput value={ name } style={styles.loginTextInput} />
                                    <TouchableOpacity style={styles.loginButton}
                                        onPress={() => this.props.navigation.navigate('ChatScreen')}>
                                        <Text style={styles.loginBtnText}>Войти</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                )
            } else {
                return (
                    <SafeAreaView style={styles.welcomeScreenContainer}>
                        <View style={styles.welcomeScreenInner}>
                            <Image source={require('../images/logo.png')} style={styles.loginScreenLogo} />
                            <Text style={styles.loginIpTitle}>
                                Ваш IP:
                            </Text>
                            <Text style={styles.loginIpNumber}>
                                {ip}
                            </Text>
                            <Text style={styles.loginApproveText} >
                                Вы не зарегестрированный пользователь, пожалуйста, зарегестрируйтесь
                            </Text>
                            <TouchableOpacity style={styles.registrationButton}
                                onPress={() => this.props.navigation.navigate('RegistrationScreen')}>
                                <Text style={styles.registrationBtnText}>Регистрация</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                )
            }
        }
    }
};

export default LoginScreen;

