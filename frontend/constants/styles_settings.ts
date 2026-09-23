import { StyleSheet } from 'react-native';

export const styles_settings = StyleSheet.create({

    settingCardSmall: {
        width: '86%',
        height: 110,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 14,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 26,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 10,
        borderWidth: 1,
        borderColor: '#000',
    },

    settingTitle: {
        color: '#9B00FF',
        fontSize: 22,
        marginTop: 8,
        fontWeight: '600',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },

    settingNumber: {
        color: '#9B00FF',
        fontSize: 42,
        fontWeight: '700',
        lineHeight: 45,
    },

    settingButton: {
        minWidth: 102,
        height: 24,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },

    settingButtonText: {
        color: '#9B00FF',
        fontSize: 12,
        fontWeight: '700',
    },

    settingModalCard: {
        width: '85%',
        maxWidth: 330,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 35,
        paddingHorizontal: 20,
        alignItems: 'center',
        position: 'relative',
    },

    settingModalTitle: {
        color: '#9B00FF',
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 30,
    },

    settingCounterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '75%',
        marginBottom: 25,
    },

    settingButtons: {
        color: '#9B00FF',
        textShadowColor: 'rgba(0,0,0,0.35)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 4,
    },

    settingCounterButton: {
        fontSize: 36,
        fontWeight: '800',

    },

    settingCounterNumber: {
        fontSize: 46,
        fontWeight: '700',
    },

    settingCard: {
        width: '86%',
        height: 160,
        borderRadius: 8,
        paddingVertical: 14,
        alignSelf: 'center',
        marginBottom: 26,
        borderWidth: 1,
        borderColor: '#000',
    },

    // Estilos modal añadir dispositivo
    addDeviceModalCard: {
        width: '86%',
        maxWidth: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        paddingVertical: 28,
        paddingHorizontal: 25,
        alignItems: 'center',
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },

    addDeviceBack: {
        position: 'absolute',
        top: 18,
        left: 18,
    },

    addDeviceTitle: {
        color: '#24123A',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 25,
    },

    addDeviceInfo: {
        color: '#9B00FF',
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },

    devicesModalCard: {
        width: '86%',
        maxWidth: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },

    devicesBack: {
        position: 'absolute',
        top: 18,
        left: 18,
        zIndex: 1,
    },

    devicesTitle: {
        color: '#24123A',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 15,
    },

    devicesList: {
        width: '100%',
    },

    deviceItem: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderTopWidth: 1,
        borderTopColor: '#CFCFCF',
    },

    deviceText: {
        color: '#9B00FF',
        fontSize: 16,
        fontWeight: '700',
    },

    confirmDeviceModalCard: {
        width: '75%',
        maxWidth: 320,
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        paddingVertical: 28,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },

    confirmDeviceText: {
        color: '#9B00FF',
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 22,
    },

    confirmDeviceButtonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },

    cancelDeviceButton: {
        width: '45%',
        height: 28,
        backgroundColor: '#555',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    acceptDeviceButton: {
        width: '45%',
        height: 28,
        backgroundColor: '#9B00FF',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    cancelDeviceButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },

    acceptDeviceButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    deviceHistoryModalCard: {
        width: '86%',
        maxWidth: 360,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 8,
    },

    deviceHistoryBack: {
        position: 'absolute',
        top: 18,
        left: 18,
        zIndex: 1,
    },

    deviceHistoryTitle: {
        color: '#24123A',
        fontSize: 22,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: 25,
        marginBottom: 15,
    },

    deviceHistoryList: {
        width: '100%',
    },

    deviceHistoryItem: {
        width: '100%',
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderTopWidth: 1,
        borderTopColor: '#CFCFCF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    deviceHistoryText: {
        color: '#9B00FF',
        fontSize: 16,
        fontWeight: '700',
    },
});