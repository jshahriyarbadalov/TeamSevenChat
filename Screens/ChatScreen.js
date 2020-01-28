import styles from '../Styles/Styles';
import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity, TextInput, FlatList, Platform, Alert, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import MyMessage from '../Components/MyMessage';
import UserMessage from '../Components/UserMessage';
import ReconnectingWebSocket from 'react-native-reconnecting-websocket';
import PushNotification from "react-native-push-notification";



const URL = 'ws://web-chat.eu-4.evennode.com/';
const urlPut = 'http://web-chat.eu-4.evennode.com/putuser';

PushNotification.configure({

  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  senderID: "246105469934",

  permissions: {
    alert: true,
    badge: true,
    sound: true
  },

  popInitialNotification: true,
  requestPermissions: true
});


export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalV: false,
      isLoading: true,
      messages: [],
      inputText: '',
      time: new Date().toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }),
      ws: '',
      IP: '',
      name: '',
      isyour: '',
      myname: '',
    };

    this.messageColors = [];
  }

  _getName = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) {
        this.setState({ myname: value });
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

  getNotification(name, text) {

    PushNotification.localNotification({
      title: name,
      message: text,
    });

    PushNotification.configure({
      onNotification: function (notification) {
        console.log('Notification is clicked')
      }
    })
  }

  ws = new ReconnectingWebSocket(URL)
  componentDidMount() {

    this._getName();

    fetch('http://web-chat.eu-4.evennode.com/getmessages', {
      method: 'GET',
    })
        .then(response => response.json())
        .then(responseJson => {
          this.setState({ isLoading: false, messages: responseJson.reverse(), name: responseJson.name, isyour: responseJson.ip });
        })
        .catch(error => {
          console.error(error);
        });

    this.getIp();

    this.ws.onopen = () => {
      console.log('connected')
    };

    this.ws.onmessage = evt => {
      const message = JSON.parse(evt.data)
      this.addMessage(message)
      if (this.state.IP !== message.ip) {
        this.getNotification(message.name, message.text);
      }
    };

    this.ws.onclose = () => {
      console.log('disconnected')
      this.setState({
        ws: new WebSocket(URL),
      });

    }
  }


  addMessage = message =>
      this.setState(state => ({ messages: [message, ...this.state.messages] }))

  submitMessage() {
    if (this.state.inputText !== "" && this.state.inputText.trim().length !== 0) {
      this.ws.send(JSON.stringify({
        text: this.state.inputText.trim(),
        time: this.state.time,
        ip: this.state.IP,
        name: this.state.myname,

      }));

      this.setState({ inputText: '' })

      fetch("http://web-chat.eu-4.evennode.com/putmessage", {
        method: "put",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },

        body: JSON.stringify({
          text: this.state.inputText.trim(),
          time: this.state.time,
          ip: this.state.IP,
          name: this.state.myname,
        })
      })
          .then((response) => {
            console.log(response)
          })

    } else {
      this.setState({ inputText: '' })

    }

  }

  getRandomColor = () => {

    let colors = ['#BF80FF', '#cc99ff', '#ffcccc', '#ff80d5', '#ffcccc', '#80ffbf', '#b3ccff', '#b3b3ff', '#ffcce6', '#e6b800', '#b3cccc', '#ff9980', '#99b3ff', '#6699ff', '#99bbff'];
    let color = '';
    for (let i = 0; i <= 15; i++) {
      color = colors[Math.floor(Math.random() * 16)]
    }
    return color;
  };

  render() {
    return (
        <SafeAreaView style={styles.chatScreenContainer}>
          <KeyboardAvoidingView style={{ flex: 1, }} behavior='padding'
                                keyboardVerticalOffset={
                                  Platform.select({
                                    ios: () => 110,
                                    android: () => -150
                                  })()
                                }>
            <View style={styles.chatScreenContainer}>
              <View style={styles.messagesMainContainer}>
                <View style={styles.dinamicMessagesField}>
                  <View style={styles.innerMessagesField}>
                    <FlatList
                        inverted={true}
                        data={this.state.messages}
                        renderItem={({ item }) => {
                          let color = '#666666'; //default color
                          let foundColorPair = this.messageColors.find(obj => { return obj.ip === item.ip });
                          if (foundColorPair !== undefined) {
                            color = foundColorPair.color;
                          } else {
                            color = this.getRandomColor();
                            this.messageColors.push({ ip: item.ip, color: this.getRandomColor() });
                          }

                          if (item.time !== undefined) {
                            if (item.name !== this.state.myname) {
                              return (<UserMessage text={item.text} background={color} key={item.text} name={item.name}
                                                   isyour={item.ip}
                                                   time={new Date(item.time).toLocaleTimeString(navigator.language, {
                                                     hour: '2-digit',
                                                     minute: '2-digit'
                                                   })} />)
                            } else {
                              return (<MyMessage navigation={this.props.navigation} text={item.text} background={color}
                                                 key={item.text}
                                                 time={new Date(item.time).toLocaleTimeString(navigator.language, {
                                                   hour: '2-digit',
                                                   minute: '2-digit'
                                                 })} />)
                            }
                          }
                        }}
                        keyExtractor={(item) => item.text + item.time + item.ip}

                    />

                  </View>
                </View>
              </View>
              <View style={styles.messagesInputContainer}>
                <TextInput
                    placeholder="Введите сообщение..."
                    style={styles.messagesInput}
                    multiline={true}
                    numberOfLines={4}
                    placeholderTextColor="#000000"
                    onChangeText={inputText => this.setState({ inputText })}
                    value={this.state.inputText}
                    maxLength={400}
                />
                <TouchableOpacity
                    style={styles.paperPlaneContainer}
                    onPress={this.submitMessage.bind(this)}>
                  <Image
                      source={require('../images/paper-plane.png')}
                      style={styles.paperPlaneButton}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
}
