import React from 'react';
import ZocialIcon from 'react-native-vector-icons/Zocial';
import OcticonIcon from 'react-native-vector-icons/Octicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import FAIcon5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import config from '../../../resources/fonts/selection.json';
// import config from './selection.json'
// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';

const getIconFont = (type) => {
    switch (type) {
        case 'Fontisto':
            return Fontisto;
        case 'MaterialIcon':
            return MaterialIcon;
        case 'EvilIcon':
            return EvilIcon;
        case 'Feather':
            return Feather;
        case 'AntDesign':
            return AntDesign;
        case 'SimpleLineIcon':
            return SimpleLineIcon;
        case 'ZocialIcon':
            return ZocialIcon;
        case 'FoundationIcon':
            return FoundationIcon;
        case 'FAIcon5':
            return FAIcon5;
        case 'FAIcon':
            return FAIcon;
        case 'Ionicon':
            return Ionicon;
        case 'MaterialCommunityIcon':
            return MaterialCommunityIcon;
        case 'EntypoIcon':
            return EntypoIcon;
        case 'OcticonIcon':
            return OcticonIcon;
        // default:
        //     return createIconSetFromIcoMoon(config, 'icomoon', 'icomoon.ttf');;
    }
};

const Icons = ({ type, ...props }) => {
    const FontICon = getIconFont(type);
    return <FontICon {...props} />;
};

export const iconType = {
    fontisto: 'Fontisto',
    material: 'MaterialIcon',
    evil: 'EvilIcon',
    feather: 'Feather',
    ant: 'AntDesign',
    simpleLine: 'SimpleLineIcon',
    zocial: 'ZocialIcon',
    foundation: 'FoundationIcon',
    fa5: 'FAIcon5',
    fa: 'FAIcon',
    ionicon: 'Ionicon',
    materialCommunity: 'MaterialCommunityIcon',
    entypo: 'EntypoIcon',
    octicon: 'OcticonIcon',
    default: 'createIconSetFromIcoMoon'
};

export default Icons;