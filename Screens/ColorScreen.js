import styles from '../Styles/Styles';
import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { AsyncStorage } from 'react-native';


export class ColorScreen extends Component {

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


    _storeColor = async (color) => {
        try {
            await AsyncStorage.setItem('userColor', color);
        } catch (error) {
            console.log(error)
        }
    };

    render() {

        if (this.state.orientation === 'portrait') {
            return (
                <View style={{alignItems: 'center', backgroundColor: '#fafafa', flex: 1}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.colorsText}>Выбор цвета для текстового поля:</Text>
                    </View>
                    <View style={styles.colorsContainer}>
                        <View style={styles.colorInner}>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#e15f5f')
                            }}>
                                <Image source={require('../images/circle.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#5296a5')
                            }}>
                                <Image source={require('../images/circle-2.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#89db7d')
                            }}>
                                <Image source={require('../images/circle-3.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.colorInner}>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#e7e568')
                            }}>
                                <Image source={require('../images/circle-5.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#ffffff')
                            }}>
                                <Image source={require('../images/circle-6.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#c19d48')
                            }}>
                                <Image source={require('../images/circle-7.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.colorInner}>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#33cccc')
                            }}>
                                <Image source={require('../images/circle-9.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#3955eb')
                            }}>
                                <Image source={require('../images/circle-8.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#857ddb')
                            }}>
                                <Image source={require('../images/circle-4.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.colorInner}>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#ff9966')
                            }}>
                                <Image source={require('../images/circle-10.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#ffff66')
                            }}>
                                <Image source={require('../images/circle-11.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                this._storeColor('#aeaeae')
                            }}>
                                <Image source={require('../images/circle-12.png')} style={styles.colorCircle}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{alignItems: 'center', backgroundColor: '#fafafa', flex: 1, flexDirection: 'row'}}>
                    <View flex={2} flexDirection="column">
                        <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 0}}>
                            <Text style={styles.colorsText}>Выбор цвета для текстового поля:</Text>
                        </View>
                    </View>
                    <View flex={2} flexDirection="column">
                        <View style={styles.colorsContainer}>
                            <View style={styles.colorInner}>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#e15f5f')
                                }}>
                                    <Image source={require('../images/circle.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#5296a5')
                                }}>
                                    <Image source={require('../images/circle-2.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#89db7d')
                                }}>
                                    <Image source={require('../images/circle-3.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.colorInner}>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#e7e568')
                                }}>
                                    <Image source={require('../images/circle-5.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#ffffff')
                                }}>
                                    <Image source={require('../images/circle-6.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#c19d48')
                                }}>
                                    <Image source={require('../images/circle-7.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.colorInner}>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#33cccc')
                                }}>
                                    <Image source={require('../images/circle-9.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#3955eb')
                                }}>
                                    <Image source={require('../images/circle-8.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#857ddb')
                                }}>
                                    <Image source={require('../images/circle-4.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.colorInner}>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#ff9966')
                                }}>
                                    <Image source={require('../images/circle-10.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#ffff66')
                                }}>
                                    <Image source={require('../images/circle-11.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    this._storeColor('#aeaeae')
                                }}>
                                    <Image source={require('../images/circle-12.png')} style={styles.colorCircle}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }
};

export default ColorScreen;

