import styles from '../Styles/Styles';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, TextInput, AsyncStorage, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';


const URL = 'http://web-chat.eu-4.evennode.com/putchangeuser';
const urlPut = 'http://web-chat.eu-4.evennode.com/putuser';
const urlAllUsers = 'http://web-chat.eu-4.evennode.com/getusers';

export class UserNameScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            correct: true,
            error: '',
            name: '',
            inputText: '',
            userNames: [],
            data: [],
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

    ws = new WebSocket(URL);

    _storeUser = async (name) => {
        try {
            await AsyncStorage.setItem('userName', name);
        } catch (error) {
            console.log(name)
        }
    };

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

    getUsers() {
        return fetch(urlAllUsers)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson });
                this.userNames();
            })
            .catch((error) => {
                console.error(error);
            });

    }

    userNames = () => {
        let data = this.state.data;
        let userNames = [];

        data.forEach(element => {
            userNames.push(element.name)
        });

        this.setState({ userNames: userNames })
    };

    componentDidMount() {
        this._getName();
        this.getUsers();
        this.setState({correct: true, inputText: '', error: false})
    }

    addName = (inputText) => {
        this.setState({ inputText: inputText, correct: true });
    };

    submitName() {
        let foundNamePair = this.state.userNames.find(obj => { return obj === this.state.inputText });

        if (this.state.inputText !== "" && this.state.inputText.trim().length !== 0) {
            if (this.state.inputText.length >= 3 && this.state.inputText.length <= 10) {
                if (foundNamePair !== undefined) {
                    this.setState({ error: "*это имя уже занято, введите другое", correct: false })
                } else {
                    fetch(URL, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify({
                            name: this.state.inputText,
                            state: true,
                        }),
                    });

                    this.setState({ inputText: "", correct: true });
                    this.props.navigation.navigate('ChatScreen');
                    this.setState({ error: "" });
                    this._storeUser(this.state.inputText);
                }

            } else {
                this.setState({ error: "*должно быть мин 3 символа макс 10 ", correct: false })

            }

        } else {
            this.setState({ error: "*введите имя пользователя", correct: false })
        }

    }


    press() {
        return this.submitName();
    }

    cancelBtn() {
        this.setState({ inputText: "", correct: true });
        this.props.navigation.navigate('ChatScreen');
        this.setState({ error: "", correct: true })

    }

    render() {
        const isCorrect = this.state.correct;

        if (this.state.orientation === 'portrait') {
            return (
                <SafeAreaView>
                    <View style={{alignItems: 'center'}}>
                        <View>
                            <KeyboardAvoidingView
                                style={{flex: 1,}} behavior='padding'
                                keyboardVerticalOffset={
                                    Platform.select({
                                        ios: () => 110,
                                        android: () => -150
                                    })()
                                }>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.nameChangeText}>Введите имя пользователя:</Text>

                                    <TextInput placeholder={this.state.name} style={styles.changeNameTextInput}
                                               borderColor={isCorrect ? '#666' : 'red'}
                                               onChangeText={(inputText) => this.addName(inputText.trim())}
                                               clearButtonMode="always" autoCorrect={false}/>
                                    <Text style={styles.validNameText}>{this.state.error}</Text>
                                </View>
                                <View style={styles.nameChangeButtons}>
                                    <TouchableOpacity style={styles.changedNameCancelButton}
                                                      onPress={this.cancelBtn.bind(this)}>
                                        <Text style={styles.registrationBtnText}>Отмена</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.changedNameSaveButton}
                                                      onPress={() => this.press()}>
                                        <Text style={styles.loginBtnText}>ОК</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView>
                    <View style={{alignItems: 'center'}}>
                        <View>
                            <KeyboardAvoidingView
                                style={{flex: 1,}} behavior='padding'
                                keyboardVerticalOffset={
                                    Platform.select({
                                        ios: () => 110,
                                        android: () => -150
                                    })()
                                }>
                                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                                    <Text style={styles.nameChangeTextLand}>Введите имя пользователя:</Text>

                                    <TextInput placeholder={this.state.name} style={styles.changeNameTextInputLand}
                                               borderColor={isCorrect ? '#666' : 'red'}
                                               onChangeText={(inputText) => this.addName(inputText.trim())}
                                               clearButtonMode="always" autoCorrect={false}/>
                                    <Text style={styles.validNameText}>{this.state.error}</Text>
                                </View>
                                <View style={styles.nameChangeButtons}>
                                    <TouchableOpacity style={styles.changedNameCancelButtonLand}
                                                      onPress={this.cancelBtn.bind(this)}>
                                        <Text style={styles.registrationBtnText}>Отмена</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.changedNameSaveButtonLand}
                                                      onPress={() => this.press()}>
                                        <Text style={styles.loginBtnText}>ОК</Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    </View>
                </SafeAreaView>
            )
        }
    }
};



export default UserNameScreen;

