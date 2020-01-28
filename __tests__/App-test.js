/**
 * @format
 */

import 'react-native';
import React from 'react';
import MyMessage from '../Components/MyMessage';
import UserMessage from '../Components/UserMessage';
import ChatScreen from '../Screens/ChatScreen';
import ColorScreen from '../Screens/ColorScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegistrationScreen from '../Screens/RegistrationScreen';
import UserNameScreen from '../Screens/UserNameScreen';
import UsersListScreen from '../Screens/UsersListScreen';
import WelcomeScreen from '../Screens/WelcomeScreen';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';




describe('Test my Ui Components', ()=>{

    it('snapshot testing MyMessage component ', ()=>{
      const myCompMessage=renderer.create(<MyMessage/>).toJSON
      expect(myCompMessage).toMatchSnapshot();
    });

    it('snapshot testing UserMessage component ', ()=>{
      const myCompUM=renderer.create(<UserMessage/>).toJSON
      expect(myCompUM).toMatchSnapshot();
    });

    it('snapshot testing ChatScreen component ', ()=>{
      const myCompChat=renderer.create(<ChatScreen/>).toJSON
      expect(myCompChat).toMatchSnapshot();
    });

    it('snapshot testing ColorScreen component ', ()=>{
      const myCompColor=renderer.create(<ColorScreen/>).toJSON
      expect(myCompColor).toMatchSnapshot();
    });

    it('snapshot testing LoginScreen component', ()=>{
      const myCompLogin=renderer.create(<LoginScreen/>).toJSON
      expect(myCompLogin).toMatchSnapshot();
    });
  
    it('snapshot testing RegistrationScreen component', ()=>{
      const myCompRegistr=renderer.create(<RegistrationScreen/>).toJSON
      expect(myCompRegistr).toMatchSnapshot();
    });

    it('snapshot testing UserNameScreen component', ()=>{
      const myCompUserName=renderer.create(<UserNameScreen/>).toJSON
      expect(myCompUserName).toMatchSnapshot();
    });

    it('snapshot testing UserListScreen component', ()=>{
      const myCompUsersList=renderer.create(<UsersListScreen/>).toJSON
      expect(myCompUsersList).toMatchSnapshot();
    });

    it('snapshot testing WelcomeScreen component', ()=>{
      const myCompWelcome =renderer.create(<WelcomeScreen/>).toJSON
      expect(myCompWelcome).toMatchSnapshot();
    });
});
