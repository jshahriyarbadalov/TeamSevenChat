
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, TextInput, AsyncStorage } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { DrawerItems } from 'react-navigation-drawer';
import ChatScreen from './ChatScreen';
import ColorScreen from './ColorScreen';
import UsersListScreen from './UsersListScreen';
import styles from "../Styles/Styles";
import UserNameScreen from "./UserNameScreen";


const urlPut = 'http://web-chat.eu-4.evennode.com/putuser';

// в этом компоненте я настроила кастом внешний вид дровера навигации

export class CustomDrawerContentComponent extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ backgroundColor: '#38006B' }}>
                    <SafeAreaView>
                        <Image source={require('../images/logotext.png')} style={styles.drawerLogoText} />
                        <DrawerItems {...this.props} />
                    </SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}

// вот это шапка дровер меню для основной страницы, здесь отображены имя и айпи юзера и тогглер навигации

class MainNavigationDrawerStructure extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            IP: ''
        }

    }

    // getUserName() {
    //     fetch(urlPut, {
    //         method: 'PUT',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json;charset=UTF-8'
    //         },
    //         body: JSON.stringify({
    //             state: true,
    //         }),
    //     }).then((response) => response.json())
    //         .then((responseJson) => {
    //             this.setState({ name: responseJson })
    //         })
    // }

    _getItem = async () => {
        try {
            const value = await AsyncStorage.getItem('userName');
            if (value !== null) {
                this.setState({ name: value });
            }
        } catch (error) {
            console.log(error);
        }
    };

    getIp() {
        fetch('http://web-chat.eu-4.evennode.com/getIp', {
            method: 'GET',
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({ IP: responseJson.ip });
            })
            .catch(error => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.getIp();
        this._getItem();
        // this.getUserName();

        this.focusListener = this.props.navigationProps.addListener('didFocus', () => {
            this._getItem();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    toggleDrawer = () => {
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        const { name, IP } = this.state;
        return (
            <SafeAreaView style={styles.mainScreenNavigationBar}>
                <View style={styles.mainScreenNavigationBarInner}>
                    <Image source={require('../images/logo.png')} style={styles.mainLogo} />
                    <View style={styles.navigationTabText}>
                        <Text style={styles.mainScreenNavigationUsername}>{name}</Text>
                        <Text style={styles.mainScreenNavigationIp}>{IP}</Text>
                    </View>
                    <TouchableOpacity onPress={this.toggleDrawer.bind(this)} style={{ position: 'absolute', right: 27, top: 31 }}>
                        <Image
                            source={require('../images/user.png')}
                            style={{ width: 33, height: 35, }}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        );
    }
}

// а вот это другая шапка навигации, для других страниц, с навигацией обратно на основную страницу. Здесь имя и апйи не нужны

class GoBackDrawerStructure extends Component {
    toggleDrawer = () => {
        this.props.navigationProps.navigate('ChatScreen')
    };
    render() {
        return (
            <SafeAreaView style={styles.mainScreenNavigationBar}>
                <View style={styles.mainScreenNavigationBarInner}>
                    <TouchableOpacity onPress={this.toggleDrawer.bind(this)} style={{ position: 'absolute', left: 31, top: 27, flex: 1, flexDirection: 'row' }}>
                        <Image source={require('../images/left-arrow.png')} style={styles.goBackIcon} />
                        <Text style={styles.goBackText}>Назад</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

// тут я слздала стак навигации для дровер навигации

const FirstStackNavigator = createStackNavigator({
    First: {
        screen: ChatScreen,
        navigationOptions: ({ navigation }) => ({

            header: <MainNavigationDrawerStructure navigationProps={navigation} />,
        }),
    },
});

const SecondStackNavigator = createStackNavigator({
    Second: {
        screen: UserNameScreen,
        navigationOptions: ({ navigation }) => ({

            header: <GoBackDrawerStructure navigationProps={navigation} />,

        }),
    },
});

const ThirdStackNavigator = createStackNavigator({
    Third: {
        screen: UsersListScreen,
        navigationOptions: ({ navigation }) => ({
            header: <GoBackDrawerStructure navigationProps={navigation} />,

        }),
    },
});

const ForthStackNavigator = createStackNavigator({
    Forth: {
        screen: ColorScreen,
        navigationOptions: ({ navigation }) => ({
            header: <GoBackDrawerStructure navigationProps={navigation} />,
        }),
    },
});

// тут сам дровер навигейшн. Обратите внимание на рутКонфигс и Конфиг. Именно в Конфиг я настроила все кастом изменения дровера, ширину и т/д

const DrawerNavigator = createDrawerNavigator({
    ChatScreen: {
        screen: FirstStackNavigator,
        navigationOptions: {
            // это чтобы основная страница не отображалась в списке меню, так как в дизайне так
            drawerLabel: () => null,
        },
    },
    UserNameScreen: {
        screen: SecondStackNavigator,
        drawerPosition: 'right',
        navigationOptions: {
            //тут иконки и текст для списка, я знаю что стили лучше перенести в файл стилей, обязательно сделаю
            drawerIcon: <Image source={require('../images/edit-icon.png')} style={{ marginBottom: 27, marginLeft: 29, marginRight: 10 }} />,
            drawerLabel: <Text style={styles.drawerItemText}>Изменить имя</Text>,
        },
    },
    UsersListScreen: {
        screen: ThirdStackNavigator,
        drawerPosition: 'right',
        navigationOptions: {
            drawerIcon: <Image source={require('../images/user-list.png')} style={{ marginBottom: 27, marginLeft: 29, marginRight: 10 }} />,
            drawerLabel: <Text style={styles.drawerItemText}>Список пользователей</Text>,
        },
    },
    ColorScreen: {
        screen: ForthStackNavigator,
        drawerPosition: 'right',
        navigationOptions: {
            drawerIcon: <Image source={require('../images/colors.png')} style={{ marginBottom: 27, marginLeft: 29, marginRight: 10 }} />,
            drawerLabel: <Text style={styles.drawerItemText}>Выбрать цвет</Text>,
        },
    },
}, {
    initialRouteName: 'ChatScreen',
    contentComponent: CustomDrawerContentComponent,
    drawerPosition: 'right',
    drawerWidth: 286,
    contentOptions: {
        activeTintColor: '#666666',
        activeBackgroundColor: '#BF80FF',

    }
});

const AppContainerDrawer = createAppContainer(DrawerNavigator);


export default class MainScreen extends Component {
    render() {
        return (
            <AppContainerDrawer />
        )
    }
};

