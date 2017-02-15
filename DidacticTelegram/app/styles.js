import {Dimensions, StyleSheet} from 'react-native'

const styles = StyleSheet.create({
	  cameraContainer: {
	    flex: 1,
	    backgroundColor: '#000000',
	    justifyContent:'flex-end',
        flexDirection: 'column',
	  },
	  camera: {
		position: 'absolute',
	    top: 0,
	    left: 0,
	    height: Dimensions.get('window').height,
	    width: Dimensions.get('window').width
	  },
	  ibutton: {
	    margin: 20,
        padding: 10,
	    alignSelf: 'center',
	  },
})

export {styles}