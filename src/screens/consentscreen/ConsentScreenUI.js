import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { hp, wp } from '../../common/functions/dimensions';
// import { ExternalLink } from 'lucide-react-native';

export default function ConsentScreenUI({ consentData }) {
  const renderAppItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: item.bgColor }]}>
      <Image source={item.image} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity style={styles.demoButton}>
        {/* <ExternalLink size={16} color="#2A73D8" /> */}
        <Text style={styles.demoText}>Show Demo</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSection = ({ item }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{item.title === 'hello' ? 'Running / Walking / Cycling / Hike' : 'Step Count'}</Text>
      <FlatList
        data={item.consentListData}
        keyExtractor={(subItem) => subItem.id}
        renderItem={renderAppItem}
        ItemSeparatorComponent={() => <View style={{ height: hp(1) }} />}
      />
    </View>
  );

  return (
    <FlatList
      data={consentData}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderSection}
      contentContainerStyle={{ paddingBottom: hp(4) }}
    />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: hp(1),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(4),
    borderRadius: 10,
  },
  logo: {
    width: wp(20),
    height: hp(5),
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  demoText: {
    color: '#2A73D8',
    fontWeight: '500',
    marginLeft: wp(1),
  },
});
