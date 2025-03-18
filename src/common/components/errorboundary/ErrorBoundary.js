import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Images } from '../../../utils/constants/Images';

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




