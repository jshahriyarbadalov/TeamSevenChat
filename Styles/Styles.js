import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    welcomeScreenContainer: {
        backgroundColor: '#38006B',
        flex: 1,
    },

    welcomeScreenLogo: {
        width: 105,
        height: 94,
        marginTop: 50,
    },

    loginScreenLogo: {
        width: 105,
        height: 94,
        marginTop: 36,
    },

    loginScreenLogoLand: {
        width: 90,
        height: 80,
        marginTop: 0,
    },

    welcomeScreenInner: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    welcomeScreenTitle: {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 20,
        lineHeight: 24,
        textAlign: 'center',
        maxWidth: 218,
        color: '#ffffff',
        marginTop: 22,
    },

    registrationButton: {
        width: 159,
        height: 52,
        backgroundColor: '#CC80FF',
        borderRadius: 10,
        marginTop: 30,
    },

    registrationButtonSecond: {
        width: 159,
        height: 52,
        backgroundColor: '#CC80FF',
        borderRadius: 10,
        marginTop: 10,
    },

    loginButton: {
        width: 159,
        height: 52,
        backgroundColor: '#9C4DCC',
        borderRadius: 10,
        marginTop: 15,
    },

    registrationBtnText: {
        fontSize: 18,
        lineHeight: 50,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },

    loginBtnText: {
        fontSize: 18,
        lineHeight: 50,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },

    loginIpTitle: {
        fontSize: 20,
        lineHeight: 24,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 20,
    },

    loginIpTitleLand: {
        fontSize: 18,
        lineHeight: 24,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 20,
    },

    loginIpNumber: {
        fontSize: 20,
        lineHeight: 26,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 10,
    },

    loginApproveText: {
        fontSize: 18,
        lineHeight: 21,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 20,
        width: 230,
    },


    loginApproveTextLand: {
        fontSize: 15,
        lineHeight: 21,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 20,
        width: 180,
    },

    loginTextInput: {
        width: 327,
        height: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        lineHeight: 21,
        paddingLeft: 33,
        paddingRight: 33,
        marginTop: 20,
        marginBottom: 10,
    },

    registrationAskText: {
        fontSize: 18,
        lineHeight: 21,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 20,
        width: 230,
    },

    chatScreenContainer: {
        backgroundColor: '#fafafa',
        justifyContent: 'flex-end',
        flex: 1,
    },

    mainScreenNavigationBar: {
        backgroundColor: '#38006B',

        flexDirection: 'row',
    },

    mainScreenNavigationBarInner: {
        backgroundColor: '#38006B',
        flex: 1,
        height: 99,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

    mainLogoAndName: {
        flex: 1,
        height: 99,
        flexDirection: 'row',
    },

    mainLogo: {
        width: 60,
        height: 58,
        marginTop: 22,
        marginLeft: 19,
    },

    mainScreenNavigationUsername: {
        fontSize: 24,
        lineHeight: 28,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 38,
    },

    mainScreenNavigationIp: {
        fontSize: 12,
        lineHeight: 14,
        color: '#666666',
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },

    navigationTabText: {
        alignItems: 'flex-start',
        marginLeft: 10,
    },

    messagesInputContainer: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 43,
        marginLeft: 26,
        marginRight: 10,
    },

    messagesInput: {
        flex: 4,
        flexDirection: 'column',
        width: '100%',
        height: 58,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#C4C4C4',
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 14,
        lineHeight: 30,
    },

    paperPlaneButton: {
        width: 32,
        height: 33,
        marginLeft: 14,
        marginTop: 15,
    },

    paperPlaneContainer: {
        flex: 1,
        flexDirection: 'column',
    },

    myMessageContainer: {
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        maxWidth: '70%',
        padding: 20,
        marginRight: 28,
        marginBottom: 20,
    },

    userMessageContainer: {
        backgroundColor: '#BF80FF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        maxWidth: '70%',
        padding: 20,
        paddingTop: 10,
        marginLeft: 28,
        marginBottom: 20,
    },

    myMessageText: {
        fontSize: 15,
        lineHeight: 18,
        color: '#000000',
        textAlign: 'left',
        fontStyle: 'normal',
    },

    userMessageText: {
        fontSize: 15,
        lineHeight: 18,
        color: '#ffffff',
        textAlign: 'left',
        fontStyle: 'normal',
    },

    otherUserName: {
        fontSize: 15,
        lineHeight: 18,
        color: '#38006B',
        textAlign: 'left',
        fontStyle: 'normal',
        paddingBottom: 5,
    },

    otherUserIp: {
        fontSize: 11,
        lineHeight: 18,
        color: '#666666',
        textAlign: 'left',
        fontStyle: 'normal',
        paddingBottom: 5,
        marginLeft: 10,
    },

    myMessageRow: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flex: 1,
        flexDirection: 'row',
    },

    userMessageRow: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'row',
    },

    timeText: {
        color: '#9C4DCC',
        fontSize: 12,
        lineHeight: 14,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: 'bold',
        position: 'absolute',
        left: 28,
        top: 20,
    },

    userTimeText: {
        color: '#9C4DCC',
        fontSize: 12,
        lineHeight: 14,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: 'bold',
        position: 'absolute',
        right: 28,
        top: 20,
    },

    messagesMainContainer: {
        backgroundColor: '#fafafa',
        marginBottom: 120,
    },

    innerMessagesField: {

    },

    goBackText: {
        color: '#ffffff',
        fontSize: 24,
        lineHeight: 28,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 10,
        flex: 2,
        flexDirection: 'column',
    },

    drawerItemText: {
        color: '#ffffff',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginBottom: 27,
    },

    drawerLogoText: {
        width: 179,
        height: 33,
        marginLeft: 49,
        marginTop: 57,
        marginBottom: 57,
    },

    goBackIcon: {
        width: 24,
        height: 24,
        flex: 2,
        flexDirection: 'column',
        marginTop: 12,
        marginRight: 10,
    },

    nameChangeText: {
        color: '#6A1B9A',
        fontSize: 24,
        lineHeight: 28,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 44,
    },

    nameChangeTextLand: {
        color: '#6A1B9A',
        fontSize: 24,
        lineHeight: 28,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 20,
    },

    nameChangeCount: {
        color: '#6A1B9A',
        fontSize: 24,
        lineHeight: 28,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'normal',
        marginTop: 44,
        marginLeft: 44,
    },

    userListIcon: {
        marginRight: 16,
    },

    usersList: {
        marginLeft: 37,
    },

    userListName: {
        color: '#000000',
        fontSize: 18,
        lineHeight: 21,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: 'normal',
        marginBottom: 22,
    },

    colorsText: {
        color: '#6A1B9A',
        fontSize: 24,
        lineHeight: 28,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        marginTop: 44,
        maxWidth: 264,
    },

    changeNameTextInput: {
        width: 327,
        height: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        lineHeight: 21,
        paddingLeft: 33,
        paddingRight: 33,
        marginTop: 79,
        marginBottom: 12,

    },

    changeNameTextInputLand: {
        width: 327,
        height: 55,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 18,
        lineHeight: 21,
        paddingLeft: 33,
        paddingRight: 33,
        marginTop: 20,
        marginBottom: 10,

    },

    changedNameCancelButton: {
        width: 145,
        height: 52,
        backgroundColor: '#CC80FF',
        borderRadius: 10,
        marginTop: 22,
        justifyContent: 'flex-start',
    },

    changedNameSaveButton: {
        width: 145,
        height: 52,
        backgroundColor: '#9C4DCC',
        borderRadius: 10,
        marginTop: 22,
        justifyContent: 'flex-end',
    },

    changedNameCancelButtonLand: {
        width: 145,
        height: 52,
        backgroundColor: '#CC80FF',
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'flex-start',
    },

    changedNameSaveButtonLand: {
        width: 145,
        height: 52,
        backgroundColor: '#9C4DCC',
        borderRadius: 10,
        marginTop: 10,
        justifyContent: 'flex-end',
    },

    nameChangeButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 327,
    },

    colorsContainer: {
        marginTop: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 55,
        marginLeft: 55,
    },

    colorCircle: {
        width: 40,
        height: 40,
        marginBottom: 36,
        marginLeft: 18,
        marginRight: 18,
    },

    colorInner: {
        flexDirection: 'column',
        alignItems: 'center',
    },

    validNameText: {
        color: 'red',
        textAlign: 'left'
    }
});

export default styles;

