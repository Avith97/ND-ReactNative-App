import React, {useState} from 'react';
import {StyleSheet ,ScrollView} from 'react-native';
import HomeScreenUI from './HomeScreenUI';
import { Images } from '../../../utils/constants/Images';
import { hp } from '../../../common/functions/dimensions';
import ConsentScreen from '../../consentscreen/ConsentScreen';

export default function HomeScreen() {
  const [options] = useState({
    programs: [
      {
        title: 'Step Challenge',
        duration: '20 Min',
        calories: 432,
        image: Images.runner_bg_image,
        status: 'Ongoing',
      },
      {
        title: 'Cycle Challenge',
        duration: '20 Min',
        calories: 432,
        image: Images.runner_bg_image,
        status: 'Ongoing',
      },
    ],
    sessions: [
      {
        image: Images.runner_bg_image,
        title: 'Everything You Need to Know About Nonalcoholic Beer',
        author: 'Jay Manning',
        date: 'Nov 20, 2023',
        description:
          'Brewers are putting out great-tasting beers without alcohol...',
      },
      {
        image: Images.runner_bg_image,
        title: 'Eating More Plant-Based Meals May Help You Live Longer',
        author: 'Jay Manning',
        date: 'Nov 20, 2023',
        description:
          'Cutting out red and processed meats for nuts and beans...',
      },
    ],
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: hp(5)}}
      showsVerticalScrollIndicator={false}>
      <HomeScreenUI {...options} />

    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: hp(10),
  },
 
});
