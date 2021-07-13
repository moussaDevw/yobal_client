import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get("window");

export const SCREEN_HEIGHT = height;
export const SCREEN_WIDTH = width;

export const TEXT_INPUT_HEIGHT = 150;
export const FOOTER_HEIGHT = 70;

export const LOGIN_VIEW_HEIGHT = TEXT_INPUT_HEIGHT + FOOTER_HEIGHT;

export const colors = [{gray:'#d8d8d8', lightBlue: '#758ab6', darkBlue:'#3b5998', sobmre:'#293e6a'}]

export const prefix = 'https://api.yobalapp.com/'