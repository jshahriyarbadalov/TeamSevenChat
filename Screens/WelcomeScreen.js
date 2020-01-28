import styles from '../Styles/Styles';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import Mychecknet from "../Components/Netcheck"
export class WelcomeScreen extends Component {
    constructor(props) {
        super(props);

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

    render() {
        if (this.state.orientation === 'portrait') {
            return (
                <SafeAreaView style={styles.welcomeScreenContainer}>
                    <Mychecknet />

                    <View style={styles.welcomeScreenInner}>
                        <Image source={require('../images/logo.png')} style={styles.welcomeScreenLogo} />
                        <Text style={styles.welcomeScreenTitle}>
                            Добро пожаловать в Team7Chat!
                        </Text>
                        <TouchableOpacity style={styles.registrationButton}
                            onPress={() => this.props.navigation.navigate('RegistrationScreen')}>
                            <Text style={styles.registrationBtnText}>Регистрация</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton}
                            onPress={() => this.props.navigation.navigate('LoginScreen')}>
                            <Text style={styles.loginBtnText}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            )
        } else {
            return (
                <SafeAreaView style={styles.welcomeScreenContainer}>
                    <Mychecknet />
                    <View style={styles.welcomeScreenInner} flex={1} flexDirection='row' >
                        <View flex={2} flexDirection='column' style={{ alignItems: 'center' }}>
                            <Image source={require('../images/logo.png')} style={styles.welcomeScreenLogo} marginTop={10} />
                            <Text style={styles.welcomeScreenTitle}>
                                Добро пожаловать в Team7Chat!
                            </Text>
                        </View>
                        <View flex={2} flexDirection='column' style={{ alignItems: 'center' }}>
                            <TouchableOpacity style={styles.registrationButton}
                                marginTop={10}
                                onPress={() => this.props.navigation.navigate('RegistrationScreen')}>
                                <Text style={styles.registrationBtnText}>Регистрация</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginButton}
                                onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                <Text style={styles.loginBtnText}>Войти</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </SafeAreaView>
            )
        }
    }
};

export default WelcomeScreen;

