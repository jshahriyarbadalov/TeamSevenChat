import React, { Component } from 'react';
import {
    Text,
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import Dialog, { DialogFooter, DialogButton, DialogContent, SlideAnimation } from 'react-native-popup-dialog';





export default class Mychecknet extends Component {

    constructor(props) {
        super(props);
        this.state = {
          ModalV: false,
       
        }

      }
    

    checkNet = () => {

        NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            if (state.isConnected === false) {
                this.setState({ ModalV: true })
            }else {
                this.setState({ ModalV: false })
            }


        });

    }
    componentDidMount() {

        this.checkNet()
    
    }
    componentWillUnmount() {
        this.checkNet()

      }

    render() {
        return (
            <Dialog
                dialogStyle={{ backgroundColor: 'rgba(56, 0, 107, 0.8)', alignItems: 'center', justifyContent: 'center', }}
                hasOverlay={true}
                overlayOpacity={0.5}
                width={0.8}
                height={0.3}
                visible={this.state.ModalV}
                dialogAnimation={new SlideAnimation({
                    slideFrom: 'top',
                })}
                rounded={true}

            >
                <DialogContent >
                    <Text style={{ color: 'white', fontSize: 15 }}>Проверьте соединение с сетью</Text>
                </DialogContent>
            </Dialog>



        );
    }
}
