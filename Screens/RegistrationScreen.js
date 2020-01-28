import styles from '../Styles/Styles';
import React, { Component } from 'react';
import {SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Dimensions, AsyncStorage} from 'react-native';
import ChatScreen from './ChatScreen';

const url = 'http://web-chat.eu-4.evennode.com/getip';
const urlAllUsers = 'http://web-chat.eu-4.evennode.com/getusers';
const urlPut = 'http://web-chat.eu-4.evennode.com/putuser';

let ws = new WebSocket('ws://web-chat.eu-4.evennode.com/');

export class RegistrationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: '',
            name: '',
            error: '',
            correct: true,
            getname: '',
            data: [],
            userNames: [],
            userIPs: [],
            ipPair: '',
            namePair: '',
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

    getUsers() {
        return fetch(urlAllUsers)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson });
                this.userNames();
                this.userIPs();
            })
            .catch((error) => {
                console.error(error);
            });

    }

    _getName = async () => {
        try {
            const value = await AsyncStorage.getItem('userName');
            if (value !== null) {
                this.setState({ name: value });
            }
        } catch (error) {
            console.log(error);
        }
    };

    userNames = () => {
        let data = this.state.data;
        let userNames = [];

        data.forEach(element => {
            userNames.push(element.name)
        });

        this.setState({ userNames: userNames })

        let foundNamePair = this.state.userNames.find(obj => { return obj === this.state.name });

        this.setState({ namePair: foundNamePair });
    };

    userIPs = () => {
        let data = this.state.data;
        let userIPs = [];

        data.forEach(element => {
            userIPs.push(element.ip)
        });

        this.setState({ userIPs: userIPs });

        let foundIPPair = this.state.userIPs.find(obj => { return obj === this.state.ip });

        this.setState({ ipPair: foundIPPair });
    };

    _storeName = async () => {
        try {
            await AsyncStorage.setItem('userName', this.state.name);
        } catch (error) {
            console.log(error)
        }
    };

    setNameState = (name) => {
        this.setState({ name: name });
    };

    ws = new WebSocket(urlPut);

    setUserName() {
        ws.send(JSON.stringify({
            ip: this.state.ip,
            name: this.state.name,
            state: true,
        }));
        fetch(urlPut, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                ip: this.state.ip,
                name: this.state.name,
                state: true,
            }),
        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ getname: responseJson })
            });
        this._storeName(this.state.getname);

        this.props.navigation.navigate('ChatScreen');
    }

    press() {
        let foundNamePair = this.state.userNames.find(obj => { return obj === this.state.name });


        if (this.state.inputText !== "") {
            if (this.state.name.length >= 3 && this.state.name.length <= 10) {
                if (foundNamePair !== undefined) {
                    this.setState({ error: "*это имя уже занято, введите другое", correct: false })
                } else {
                    this.setState({ correct: true });
                    return this.setUserName()
                }

            } else if (this.state.name === '') {
                this.setState({ error: "*введите имя пользователя", correct: false })
            } else {
                this.setState({ error: "*должно быть мин 3 символа макс 10", correct: false })
            }
        } else {
            this.setState({ error: "*введите имя пользователя", correct: false })
        }

    }

    componentDidMount() {
        this.getUserIp();
        this.getUsers();
        this.setState({ correct: true })
        this._getName();
    }

    render() {
        const isCorrect = this.state.correct;

        const { ip, ipPair, namePair } = this.state;

        if (this.state.orientation === 'portrait') {
            if (ipPair !== undefined) {
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
                            <ScrollView style={styles.welcomeScreenContainer}>
                                <View style={styles.welcomeScreenInner}>
                                    <Image source={require('../images/logo.png')} style={styles.loginScreenLogo} />
                                    <Text style={styles.loginIpTitle}>
                                        Ваш IP:
                                    </Text>
                                    <Text style={styles.loginIpNumber}>
                                        {ip}
                                    </Text>
                                    <Text style={styles.registrationAskText}>
                                        Вы зарегестрированный пользователь
                                    </Text>
                                    <TouchableOpacity style={styles.loginButton}
                                        onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                        <Text style={styles.loginBtnText}>Войти</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                )
            } else {
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
                            <ScrollView style={styles.welcomeScreenContainer}>
                                <View style={styles.welcomeScreenInner}>
                                    <Image source={require('../images/logo.png')} style={styles.loginScreenLogo} />
                                    <Text style={styles.loginIpTitle}>
                                        Ваш IP:
                                    </Text>
                                    <Text style={styles.loginIpNumber}>
                                        {ip}
                                    </Text>
                                    <Text style={styles.registrationAskText}>
                                        Введите пожалуйста свое имя:
                                    </Text>
                                    <TextInput placeholder="MyName..." style={styles.loginTextInput}
                                        onChangeText={(name) => this.setNameState(name.trim())}
                                        borderColor={isCorrect ? '#666666' : 'red'} />
                                    <Text style={styles.validNameText}>{this.state.error}</Text>
                                    <TouchableOpacity style={styles.registrationButtonSecond}
                                        onPress={() => this.press()}>
                                        <Text style={styles.registrationBtnText}>Регистрация</Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                )
            }
        } else {
            if (ipPair !== undefined) {
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
                            <ScrollView style={styles.welcomeScreenContainer}>
                                <View style={styles.welcomeScreenInner} flex={1} flexDirection='row'>
                                    <View flex={2} flexDirection='column' style={{ alignItems: 'center' }}>
                                        <Image source={require('../images/logo.png')} style={styles.loginScreenLogo} />
                                        <Text style={styles.loginIpTitle}>
                                            Ваш IP:
                                        </Text>
                                        <Text style={styles.loginIpNumber}>
                                            {ip}
                                        </Text>
                                    </View>
                                    <View flex={2} flexDirection='column' style={{ alignItems: 'center' }}>
                                        <Text style={styles.registrationAskText}>
                                            Вы зарегестрированный пользователь
                                        </Text>
                                        <TouchableOpacity style={styles.loginButton}
                                            onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                            <Text style={styles.loginBtnText}>Войти</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                )
            } else {
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
                            <ScrollView style={styles.welcomeScreenContainer}>
                                <View style={styles.welcomeScreenInner} flex={1} flexDirection='row'>
                                    <View flex={2} flexDirection='column'>
                                        <View style={{alignItems: 'center'}}>
                                            <Image source={require('../images/logo.png')} style={styles.loginScreenLogoLand} marginTop={30}/>
                                            <View>
                                                <Text style={styles.loginIpTitleLand}>
                                                    Ваш IP:
                                                </Text>
                                                <Text style={styles.loginIpNumber}>
                                                    {ip}
                                                </Text>
                                                <Text style={styles.loginApproveTextLand} >
                                                    Введите пожалуйста свое имя:
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View flex={2} flexDirection='column' style={{ marginTop: 60 }}>
                                        <TextInput placeholder="MyName..." style={styles.loginTextInput}
                                            onChangeText={(name) => this.setNameState(name.trim())}
                                            borderColor={isCorrect ? '#666666' : 'red'} />
                                        <Text style={styles.validNameText}>{this.state.error}</Text>
                                        <TouchableOpacity style={styles.registrationButtonSecond}
                                            onPress={() => this.press()}>
                                            <Text style={styles.registrationBtnText}>Регистрация</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                )
            }
        }
    }
};

export default RegistrationScreen;

