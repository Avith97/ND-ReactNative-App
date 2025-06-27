import React from 'react'

// Officially supported icon imports
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Lucide from 'react-native-vector-icons/Lucide'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Octicons from 'react-native-vector-icons/Octicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Zocial from 'react-native-vector-icons/Zocial'

import config from './selection.json'
import { createIconSetFromIcoMoon } from 'react-native-vector-icons'

// Font getter function with inline brand support
const getIconFont = type => {
  switch (type) {
    case 'AntDesign':
      return AntDesign
    case 'Entypo':
      return Entypo
    case 'EvilIcons':
      return EvilIcons
    case 'Feather':
      return Feather
    case 'FontAwesome':
      return FontAwesome
    case 'FontAwesome5':
      return props => <FontAwesome5 {...props} />
    case 'FontAwesome5Brand':
      return props => <FontAwesome5 {...props} brand />
    case 'FontAwesome6':
      return props => <FontAwesome6 {...props} />
    case 'FontAwesome6Brand':
      return props => <FontAwesome6 {...props} brand />
    case 'Fontisto':
      return Fontisto
    case 'Foundation':
      return Foundation
    case 'Ionicons':
      return Ionicons
    // case 'Lucide':
    //   return Lucide
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons
    case 'MaterialIcons':
      return MaterialIcons
    case 'Octicons':
      return Octicons
    case 'SimpleLineIcons':
      return SimpleLineIcons
    case 'Zocial':
      return Zocial
    default:
      return createIconSetFromIcoMoon(config, 'icomoon', 'icomoon.ttf')
  }
}

// Main icon component
const Icons = ({ type, ...props }) => {
  const FontIcon = getIconFont(type)
  return <FontIcon {...props} />
}

// Exportable icon types map
export const iconType = {
  ant: 'AntDesign',
  entypo: 'Entypo',
  evil: 'EvilIcons',
  feather: 'Feather',
  fa: 'FontAwesome',
  fa5: 'FontAwesome5',
  fa5b: 'FontAwesome5Brand',
  fa6: 'FontAwesome6',
  fa6b: 'FontAwesome6Brand',
  fontisto: 'Fontisto',
  foundation: 'Foundation',
  ionicon: 'Ionicons',
  lucide: 'Lucide',
  materialCommunity: 'MaterialCommunityIcons',
  material: 'MaterialIcons',
  octicon: 'Octicons',
  simpleLine: 'SimpleLineIcons',
  zocial: 'Zocial',
  default: 'createIconSetFromIcoMoon'
}

export default Icons
