import React, { Component } from 'react';
import { View, StyleSheet, Image, DevSettings } from 'react-native';
import { Images } from '../../../utils/constants/Images';
import CustomButton from '../buttons/CustomButton';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log('ErrorBoundary caught an error:===>', error, errorInfo);
    }


    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <View style={styles.container}>
                    <Image
                        source={Images.err_boundary}
                        resizeMode='contain'
                        style={{
                            flex: 1,
                            // height: '',
                            width: '100%'
                        }}
                    />
                    <CustomButton
                        title={'Reload'}

                        onPress={() => DevSettings.reload()}
                        btnStyles={{
                            // width: wp(70),
                            height: hp(6),
                            borderRadius: 0,
                            // alignSelf: 'center'
                            // backgroundColor: 'white',
                            // elevation: 5
                        }}
                        btnTitleStyles={{
                            // color: '#CF352E',
                            fontFamily: Fonts.semiBold,
                            fontSize: fontSize.normal
                        }}
                    />
                </View>
            );
        }
        return this.props.children
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FAE6E5'
    },
});

export default ErrorBoundary;




