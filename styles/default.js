import { StyleSheet, Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

const carousel_width = viewportWidth*0.95

const space = 5;
const three_spaces = space * 3

const border_radius = 5
const double_border_radius = border_radius * 2
const ten_times_border_radius = border_radius * 10

const title = { 
    fontSize: 26,
    fontWeight: 'bold'
}

export { carousel_width, viewportWidth, viewportHeight, border_radius, double_border_radius, ten_times_border_radius, space, three_spaces, title }