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
// Assuming Icons component is available at this path
// import Icons, { iconType } from '../../../assets/icons/Icons';


const { width } = Dimensions.get('window');

// Dummy Icons component for demonstration if the original path is not accessible
// In a real project, ensure your Icons component is correctly imported.
const Icons = ({ name, size, color }) => (
    <Text style={{ fontSize: size, color }}>
        {name === 'arrow-back' ? '<' : ''}
    </Text>
);
const iconType = { ionicon: 'ionicon' }; // Dummy iconType

// Example SlideComponent with Zoom Effect
const MyOnboardingSlide = ({ index, x, SlideComponent }) => {
    const rStyle = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * width, // When the previous slide is fully in view
            index * width,       // When this slide is fully in view
            (index + 1) * width  // When the next slide is fully in view
        ];

        const scale = interpolate(
            x.value,
            inputRange,
            [0.8, 1, 0.8], // Scale down when off-screen, normal when on-screen
            'clamp' // Ensure values don't go beyond 0.8 or 1
        );

        const opacity = interpolate(
            x.value,
            inputRange,
            [0.5, 1, 0.5], // Fade out when off-screen, full opacity when on-screen
            'clamp'
        );

        return {
            transform: [{ scale }],
            opacity: opacity
        };
    });

    return (
        <Animated.View style={[styles.slideContentContainer, { width }, rStyle]}>
            <SlideComponent index={index} x={x} />
        </Animated.View>
    );
};


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
        const nextIndex = Math.round(x.value / width) + 1;
        if (nextIndex < totalSteps) {
            flatListRef.current?.scrollToOffset({ offset: nextIndex * width, animated: true });
        } else {
            // If it's the last slide, call onFinish
            onFinish && onFinish();
        }
    };

    const handleBack = () => {
        const prevIndex = Math.round(x.value / width) - 1;
        if (prevIndex >= 0) {
            flatListRef.current?.scrollToOffset({ offset: prevIndex * width, animated: true });
        }
    };

    const progressStyle = useAnimatedStyle(() => {
        return {
            width: `${((x.value / width + 1) / totalSteps) * 100}%`,
        };
    });

    const renderItem = useCallback(({ item: SlideComponent, index }) => (
            // Pass `x` and `index` to the SlideComponent for animation
            <View style={{ width }} key={index}>
                {/* <SlideComponent index={index} x={x} /> */}
                <MyOnboardingSlide index={index} x={x} SlideComponent={SlideComponent} />
            </View>
        ),
        [x]
    );

    const isLastSlide = useDerivedValue(() => {
        return currentIndex.value === totalSteps - 1;
    });

    const buttonText = useDerivedValue(() => {
        return isLastSlide.value ? 'Finish' : 'Continue';
    });

    return (
        <SafeAreaView style={styles.container}>
            {/* progress bar & buttons */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} disabled={currentIndex.value === 0}>
                    <Icons
                        name="arrow-back"
                        type={iconType.ionicon}
                        size={24}
                        color={currentIndex.value === 0 ? '#ccc' : 'black'} // Grey out if on first slide
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
                <Animated.Text style={styles.buttonText}>{buttonText.value}</Animated.Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    progressBarBackground: {
        flex: 1,
        height: 6, // Slightly thicker progress bar
        backgroundColor: '#e0e0e0',
        marginHorizontal: 12,
        borderRadius: 3,
        overflow: 'hidden', // Ensure fill stays within bounds
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: '#A7C43C',
        borderRadius: 3,
    },
    skipText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
    button: {
        backgroundColor: '#A7C43C',
        paddingVertical: 18, // More padding for a larger button
        margin: 20,
        borderRadius: 12, // More rounded corners
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 8, // Android shadow
    },
    buttonText: {
        color: 'white',
        fontWeight: '700', // Bolder text
        fontSize: 18,
    },
    // Styles for the example MyOnboardingSlide
    slideContentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#fff',
    },
    slideTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    slideDescription: {
        fontSize: 18,
        textAlign: 'center',
        color: '#555',
        lineHeight: 26,
        marginBottom: 40,
    },
    imagePlaceholder: {
        width: 200,
        height: 200,
        backgroundColor: '#A7C43C',
        borderRadius: 100, // Circular placeholder
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.8,
    },
    imageText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default OnboardingWrapper;

// How to use OnboardingWrapper:
/*
// In your App.js or a parent component:
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import OnboardingWrapper from './OnboardingWrapper'; // Adjust path as needed

// Define your individual slide components.
// These components will receive 'index' and 'x' (the shared scroll value) as props.
// 'MyOnboardingSlide' is provided as an example of such a component,
// demonstrating how to apply the zoom and fade effect.
const Slide1 = (props) => <MyOnboardingSlide {...props} />;
const Slide2 = (props) => <MyOnboardingSlide {...props} />;
const Slide3 = (props) => <MyOnboardingSlide {...props} />;

const App = () => {
    const slides = [Slide1, Slide2, Slide3]; // Add more slides as needed

    const handleSkip = () => {
        console.log('Skipped onboarding!');
        // Navigate to your main app screen
    };

    const handleFinish = () => {
        console.log('Finished onboarding!');
        // Navigate to your main app screen
    };

    return (
        <View style={{ flex: 1 }}>
            <OnboardingWrapper
                slides={slides}
                onSkip={handleSkip}
                onFinish={handleFinish}
            />
        </View>
    );
};

export default App;
*/
