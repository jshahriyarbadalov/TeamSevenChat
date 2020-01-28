import styles from '../Styles/Styles';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, TextInput } from 'react-native';

const urlAllUsers = 'http://web-chat.eu-4.evennode.com/getusers';


export class UsersListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip: '',
            name: '',
            status: '',
            data: [],
            count: '',
        };
    }

    getUsers() {
        return fetch(urlAllUsers)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ data: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });

    }

    componentDidMount(){
        this.getUsers();
    }
    render() {
        const { count, data } = this.state;
        return (
            <SafeAreaView>
                <ScrollView>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row', marginBottom: 34, }}>
                        <Text style={styles.nameChangeText} flex="3" flexDirection="column">Список Участников:</Text>
                        <Text style={styles.nameChangeCount} flex="2" flexDirection="column">{count}</Text>
                    </View>
                    <View style={styles.usersList}>
                        {data.map(user => {
                            if(user.name) {
                                if (user.state == true) {
                                    return (
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Image source={require('../images/online.png')}
                                                   style={styles.userListIcon}/>
                                            <Text style={styles.userListName} key={user.ip}>{user.name}</Text>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={{flex: 1, flexDirection: 'row'}}>
                                            <Image source={require('../images/offline.png')}
                                                   style={styles.userListIcon}/>
                                            <Text style={styles.userListName} key={user.ip}>{user.name}</Text>
                                        </View>
                                    )
                                }
                            } else {
                                return (
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <Image source={require('../images/offline.png')}
                                               style={styles.userListIcon}/>
                                        <Text style={styles.userListName} key={user.ip}>no name</Text>
                                    </View>
                                )
                            }
                        }
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
};

export default UsersListScreen;

