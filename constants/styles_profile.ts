import { StyleSheet } from 'react-native';

export const styles_profile = StyleSheet.create({

  profileCard: {
    width: '100%',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },

  profileTittle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 600,
    color: '#24123A',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: {
      width: 0,
      height: 3,
    },
    textShadowRadius: 4,
  },

  profileLabel: {
    color: '#9B00FF',
    fontSize: 22,
    marginTop: 1,
    marginBottom: 8,
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },

  profileInput: {
    width: '100%',
    height: 30,
    backgroundColor: '#EFEFEF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 12,
    marginBottom: 12,
  },

  profileInputText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },

  profileCardT: {
    width: '100%',
    borderRadius: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },

  bottomProfile: {
    paddingTop: 5,
  },

  profileButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 12,
  },

  profileSmallButton: {
    width: '45%',
    height: 35,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  profileSmallButtonText: {
    color: '#9B00FF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 13,
  },

  logoutButton: {
    width: '100%',
    height: 30,
    backgroundColor: '#FF0000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 8,
  },

  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },


  profileValue: {
    color: '#24123A',
    fontSize: 22,
    fontWeight: '700',
  },

  moreButton: {
    width: 110,
    height: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },

  moreButtonText: {
    color: '#9B00FF',
    fontSize: 12,
    fontWeight: '700',
  },

  profileContent: {
    width: '100%',
  },
});