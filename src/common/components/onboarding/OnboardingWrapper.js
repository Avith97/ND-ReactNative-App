import React, { useCallback, useEffect, useState } from 'react' // Import useState
import {
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView
} from 'react-native'
import Animated, {
  useDerivedValue,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedRef,
  useAnimatedStyle,
  interpolate,
  useAnimatedReaction, // Import useAnimatedReaction
  runOnJS // Import runOnJS
} from 'react-native-reanimated'
import Icons, { iconType } from '../../../assets/icons/Icons'
import { hp, wp } from '../../functions/dimensions'

const { width } = Dimensions.get('window')

const MyOnboardingSlide = ({ index, x, SlideComponent }) => {
  const rStyle = useAnimatedStyle(() => {
    const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

    const scale = interpolate(x.value, inputRange, [0.5, 1, 0.5], 'extend')

    const opacity = interpolate(x.value, inputRange, [0.5, 1, 0.5], 'extend')

    return {
      transform: [{ scale }],
      opacity: opacity
    }
  })

  return (
    <Animated.View style={[styles.slideContentContainer, { width }, rStyle]}>
      <SlideComponent index={index} x={x} />
    </Animated.View>
  )
}

const OnboardingWrapper = ({ slides, onSkip, onFinish, ...props }) => {
  const x = useSharedValue(0)
  const flatListRef = useAnimatedRef()

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x
    }
  })

  const totalSteps = slides.length
  const animatedCurrentIndex = useDerivedValue(() =>
    Math.round(x.value / width)
  )

  // Use useState to manage the current index for UI re-renders
  const [currentStep, setCurrentStep] = useState(0)
  const [isLastStep, setIsLastStep] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('Continue')

  // Use useAnimatedReaction to update the local state
  useAnimatedReaction(
    () => animatedCurrentIndex.value, // Dependency
    latestIndex => {
      runOnJS(setCurrentStep)(latestIndex)
      runOnJS(setIsLastStep)(latestIndex === totalSteps - 1)
      runOnJS(setButtonLabel)(
        latestIndex === totalSteps - 1 ? 'Finish' : 'Continue'
      )
    },
    []
  )

  const handleNext = () => {
    console.log('handle next pressed')
    const nextIndex = Math.round(x.value / width) + 1
    if (nextIndex < totalSteps) {
      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true
      })
    } else {
      onFinish && onFinish()
    }
  }

  const handleBack = () => {
    const prevIndex = Math.round(x.value / width) - 1
    if (prevIndex >= 0) {
      flatListRef.current?.scrollToOffset({
        offset: prevIndex * width,
        animated: true
      })
    }
  }

  useEffect(() => {
    setTimeout(() => {
      global.myfunction = handleNext
    }, 300)
  }, [])

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${((x.value / width + 1) / totalSteps) * 100}%`
    }
  })

  const renderItem = useCallback(
    ({ item: SlideComponent, index }) => (
      <View style={{ width }} key={index}>
        <MyOnboardingSlide
          index={index}
          x={x}
          SlideComponent={SlideComponent}
        />
      </View>
    ),
    [x]
  )

  function onNext(params) {
    if (props.onNext) {
      props.onNext(handleNext)
    } else {
      handleNext()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} disabled={currentStep === 0}>
          <Icons
            name="arrow-back"
            type={iconType.ionicon}
            size={24}
            color={currentStep === 0 ? '#ccc' : 'black'}
          />
        </TouchableOpacity>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, progressStyle]} />
        </View>
        <TouchableOpacity onPress={onSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={scrollHandler}
        scrollEnabled={false}
        bounces={false}
        scrollEventThrottle={16}
      />
      <View
        style={{
          backgroundColor: '#fff',
          paddingVertical: hp(2),
          paddingHorizontal: wp(6)
        }}>
        <TouchableOpacity
          ref={r => {
            global.myref = r
          }}
          style={styles.button}
          onPress={onNext}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f8f8f8',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: wp(4),
    backgroundColor: '#fff'
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  progressBarBackground: {
    flex: 1,
    height: 6, // Slightly thicker progress bar
    backgroundColor: '#e0e0e0',
    marginHorizontal: 12,
    borderRadius: 3,
    overflow: 'hidden' // Ensure fill stays within bounds
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A7C43C',
    borderRadius: 3
  },
  skipText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500'
  },
  button: {
    backgroundColor: '#A7C43C',
    paddingVertical: hp(1),
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 8
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  slideContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 30,
    // backgroundColor: 'red',
    backgroundColor: '#fff'
  },
  slideTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  slideDescription: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    lineHeight: 26,
    marginBottom: 40
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#A7C43C',
    borderRadius: 100, // Circular placeholder
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8
  },
  imageText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default OnboardingWrapper
