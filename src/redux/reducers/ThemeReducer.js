import actions from "../action_types/actions";

const initialState = {
  //   text
  textColorPrimary: '#1D1D1D',
  textColorSecondary: '#666666',
  textColorTertiary: '#999999',

  // background colors
  backgroundPrimary: '#FFFFFF',
  backgroundSecondary: '#F0F0F0',
  backgroundTertiary: '#E0E0E0',

  isDarkModeEnable: false, 
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case actions.SET_THEME:
      return {...state, ...payload};
    default:
      return state;
  }
};
