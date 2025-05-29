import React, { useCallback } from 'react';
import { Dimensions, View, TouchableOpacity, Text, StyleSheet, SafeAreaView } from 'react-native';
import Animated, {
    useDerivedValue,
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedRef,
    useAnimatedStyle,
    interpolate,
} from 'react-native-reanimated';
import Icons, { iconType } from '../../../assets/icons/Icons';


const { width } = Dimensions.get('window');

const OnboardingWrapper = ({ slides, onSkip, onFinish }) => {
    const x = useSharedValue(0);
    const flatListRef = useAnimatedRef();

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            x.value = event.contentOffset.x;
        },
    });

    const totalSteps = slides.length;
    const currentIndex = useDerivedValue(() => Math.round(x.value / width));

    const handleNext = () => {
        flatListRef.current?.scrollToOffset({ offset: (Math.round(x.value / width) + 1) * width, animated: true });
    };

    const handleBack = () => {
        flatListRef.current?.scrollToOffset({ offset: (Math.round(x.value / width) - 1) * width, animated: true });
    };

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: `${((x.value / width + 1) / totalSteps) * 100}%`,
        };
    });

    const renderItem = useCallback(
        ({ item: SlideComponent, index }) => (
            <View style={{ width }} key={index}>
                <SlideComponent index={index} x={x} />
            </View>
        ),
        [x]
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* progress bar & buttons */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack}>
                    <Icons
                        name="arrow-back"
                        type={iconType.ionicon}
                        size={24} color={'black'}
                    />
                </TouchableOpacity>
                <View style={styles.progressBarBackground}>
                    <Animated.View style={[styles.progressBarFill, progressStyle]} />
                </View>
                <TouchableOpacity onPress={onSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            </View>
            {/* slider content */}
            <Animated.FlatList
                ref={flatListRef}
                data={slides}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            />
            {/* footer */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    progressBarBackground: {
        flex: 1,
        height: 4,
        backgroundColor: '#eee',
        marginHorizontal: 12,
        borderRadius: 2,
    },
    progressBarFill: {
        height: 4,
        backgroundColor: '#A7C43C',
        borderRadius: 2,
    },
    skipText: {
        color: '#666',
    },
    button: {
        backgroundColor: '#A7C43C',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
    },
});

export default OnboardingWrapper;
