import { View, Text, StyleSheet, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Colors from '../../../utils/constants/Colors';
import { wp } from '../../functions/dimensions';

const PinCodeTextInput = (props) => {
    const [pin, setpin] = useState('')
    const [pinErr, setpinErr] = useState(false)
    const pinref = useRef(null)
    if (__DEV__) {
        console.error = () => { }
    }

    useEffect(() => {
        if (props.pinErr) {
            pinref?.current?.shake(800)
            setpinErr(true)
            setTimeout(() => {
                setpinErr(false)
            }, 2000);
        }
    }, [props.pinErr])


    return (
        <View >
            <SmoothPinCodeInput
                ref={pinref}

                // editable={pin.length < 6}
                animated
                autoFocus={false}
                password
                restrictToNumbers
                mask="﹡"
                onTextChange={(text) => {
                    console.log('new pin -->', text)
                    setpin(text)
                    props.handleChange &&
                        props.handleChange(props.name, text)
                }}
                onFulfill={(pin) => {
                    console.log('submit pin -->', pin)
                    Keyboard.dismiss()
                    props.onPinSubmit?.(props.name, pin)
                    // setTimeout(() => {
                     // pinref.current.focus()
                     // pinref?.current?.shake(800)
                    // }, 100);
                }}

                codeLength={props.codeLength || 6}
                cellSize={wp(10)}
                cellSpacing={wp(1.8)}
                cellStyle={pinErr ? styles.cellStyleErr : styles.cellStyle}
                cellStyleFocused={styles.cellStyleFocused}
                // cellStyleFilled={{ borderColor: 'red' }}
                textStyle={styles.textStyle}
                value={props.value || pin}

            />
            {/* <SmoothPinCodeInput
                ref={pinref}
                autoFocus
                // animated
                masked={'*'}
                password
                codeLength={6}
                maskDelay={300}
                // value={props?.pin}
                onTextChange={code => { setpin(code) }}
                // onTextChange={code => props.handleChange('pin', code)}
                //  onFulfill={props?.handleSubmit}
                cellStyle={{
                    borderWidth: 1,
                    borderColor: '#484848',
                    borderRadius: 12,
                    backgroundColor: '#fff'
                }}
                cellSize={wp('10')}
                cellStyleFocused={{
                    borderColor: 'black',
                    borderWidth: 2
                }}
                value={pin}
            /> */}
        </View>
    )
}


// PinCodeTextInput. = {
//     name: PropTypes.string.isRequired,
//     value: PropTypes.string,
//     onPinSubmit: PropTypes.func.isRequired,
//     onPinChange: PropTypes.func,
//     codeLength: PropTypes.number.isRequired,
//     cellSize: PropTypes.number,
//     cellStyle: PropTypes.object,
//     cellStyleFocused: PropTypes.object,
//     textStyle: PropTypes.object,
// }



const styles = StyleSheet.create({
    textStyle: {
        fontSize: 24,
        // color: 'salmon',
        color: 'black'
    },
    cellStyle: {
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(35, 115, 192, 161)',
        // backgroundColor: 'pink',
        backgroundColor: '#f2f2f2',
    },
    cellStyleErr: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: Colors.red,
        // backgroundColor: 'pink',
        backgroundColor: '#f2f2f2',
    },
    cellStyleFocused: {
        borderWidth: 1.2,
        // borderColor: 'lightseagreen',
        borderColor: Colors.primary,
        backgroundColor: Colors.white
        // backgroundColor: 'rgba(176, 190, 197,0.6)',
        // backgroundColor: 'lightcyan',
    }
})

export default PinCodeTextInput