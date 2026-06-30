import { StyleSheet } from 'react-native';

export const styles_forgotpassword = StyleSheet.create({

    infoText: {
        color: '#8A00FF',
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 20,
        textShadowColor: 'rgba(0,0,0,0.4)',
        textShadowOffset: {
            width: 0,
            height: 3,
        },
        textShadowRadius: 4,
    },

    codeInput: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: '#000',
        backgroundColor: '#EFEFEF',
        textAlign: 'center',
        fontSize: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },

    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginBottom: 35,
    },

    closeModalText: {
        color: '#000',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 22,
    },

    modalErrorText: {
        color: 'red',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 25,
    },
});
