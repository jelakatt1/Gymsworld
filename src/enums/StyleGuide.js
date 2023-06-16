import { Dimensions, Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const IS_ANDROID = Platform.OS === 'android'

const COLOR = {
  WHITE: '#ffffff',
  BLACK: '#1E1E1E',
  YELLOW: '#FFC000',
  GREY: '#4F4F5B',
  GREY_2: '#313131',
  LIGHT_GREY: '#929292',
  LIGHT_GREY_2: '#D9D9D9',
  LIGHT_GREY_3: '#BFBFBF',
  RED: '#F44234',
  CREAM: '#FFEEBC',
  BLUE: '#0066FF',
  BLUE_2: '#A8CAFD',
  MODAL_BACKGROUND: 'rgba(0, 0, 0, 0.7)',
  GREEN: '#32CD32',
  D_GREEN: '#188B05'
};

const ActiveOpacity = 0.85;

const width = Dimensions.get("window").width
const height = Dimensions.get("window").height

const FONT = {
  PoppinsRegular: 'Poppins-Regular',
  PoppinsBold: 'Poppins-Bold',
  PoppinsExtraBold: 'Poppins-ExtraBold',
  PoppinsLight: 'Poppins-Light',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsThin: 'Poppins-Thin',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsBlack: 'Poppins-Black',
}

const KEYBOARDTYPE = {
  DEFAULT: 'default',
  NUMBERPAD: 'numberpad',
  DECIMALPAD: 'decimal-pad',
  NUMERIC: 'numeric',
  EMAILADDRESS: 'email-address',
  PHONEPAD: 'phone-pad',
  URL: 'url',
};

const JUSTIFY = {
  start: 'flex-start',
  end: 'flex-end',
  between: 'space-between',
  center: 'center',
  around: 'space-around',
  evenly: 'space-evenly',
}

const FONT_WEIGHT = {
  bold700: {
    fontFamily: IS_ANDROID ? FONT.PoppinsBold : FONT.PoppinsRegular,
    fontWeight: IS_ANDROID ? 'normal' : "700",
  },
  bold800: {
    fontFamily: IS_ANDROID ? FONT.PoppinsExtraBold : FONT.PoppinsRegular,
    fontWeight: IS_ANDROID ? 'normal' : "800",
  }
}

const TEXT_STYLE = {
  title: {
    fontFamily: FONT.PoppinsExtraBold,
    fontStyle: "normal",
    fontSize: 24,
    lineHeight: 38
  },
  semi_title: {
    fontFamily: FONT.PoppinsExtraBold,
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 30
  },
  semi_title_light: {
    fontFamily: FONT.PoppinsRegular,
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 30
  },
  text_extra_bold: {
    fontFamily: FONT.PoppinsExtraBold,
    fontStyle: "normal",
    fontSize: 18,
    lineHeight: 24
  },
  text_bold: {
    ...FONT_WEIGHT.bold700,
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 20
  },
  text: {
    fontFamily: FONT.PoppinsRegular,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 20,
  },
  small_text: {
    fontFamily: FONT.PoppinsRegular,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18,
  },
  small_text_bold: {
    ...FONT_WEIGHT.bold700,
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    lineHeight: 18,
  },
  small_title: {
    ...FONT_WEIGHT.bold700,
    fontStyle: "normal",
    lineHeight: 18,
    fontSize: 16,
  },
  bottom_tab_text: {
    fontFamily: FONT.PoppinsMedium,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 16,
    fontSize: 12,
  }
}

const commonStyles = StyleSheet.create({
  bgColor: { backgroundColor: COLOR.WHITE },
  flex_1: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  flexRowReverse: { flexDirection: 'row-reverse' },
  flexWrap: { flexWrap: 'wrap' },
  flexColumn: { flexDirection: 'column' },
  flexColumnReverse: { flexDirection: 'column-reverse' },
  alignSelfStart: { alignSelf: 'flex-start' },
  alignSelfEnd: { alignSelf: 'flex-end' },
  alignSelfStretch: { alignSelf: 'stretch' },
  alignSelfCenter: { alignSelf: 'center' },
  alignItemsCenter: { alignItems: 'center' },
  alignItemsStart: { alignItems: 'flex-start' },
  alignItemsEnd: { alignItems: 'flex-end' },
  justifyContentBetween: { justifyContent: 'space-between' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentEnd: { justifyContent: 'flex-end' },
  justifyContentStart: { justifyContent: 'flex-start' },
  justifyContentSpaceEvenly: { justifyContent: 'space-evenly' },
  justifyContentSpaceAround: { justifyContent: 'space-around' },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    alignItems: 'center',
    alignContent: 'stretch',
  },
  viewBar: {},
  noMargin: { marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0 },
  noPadding: { paddingHorizontal: 0, paddingVertical: 0 },
  pb_4: { paddingBottom: hp(4) },
  pb_8: { paddingBottom: hp(8) },
  pb_12: { paddingBottom: hp(12) },
  pb_16: { paddingBottom: hp(16) },
  pb_24: { paddingBottom: hp(24) },
  pb_32: { paddingBottom: hp(32) },
  pt_4: { paddingTop: hp(4) },
  pt_8: { paddingTop: hp(8) },
  pt_12: { paddingTop: hp(12) },
  pt_16: { paddingTop: hp(16) },
  pt_24: { paddingTop: hp(24) },
  pt_32: { paddingTop: hp(32) },
  pt_110: { paddingTop: hp(110) },
  pv_4: { paddingVertical: hp(4) },
  pv_1: { paddingVertical: hp(1) },
  pv_2: { paddingVertical: hp(2) },
  pv_8: { paddingVertical: hp(8) },
  pv_12: { paddingVertical: hp(12) },
  pv_16: { paddingVertical: hp(16) },
  pv_24: { paddingVertical: hp(24) },
  pv_32: { paddingVertical: hp(32) },
  ph_4: { paddingHorizontal: wp(4) },
  ph_8: { paddingHorizontal: wp(8) },
  ph_12: { paddingHorizontal: wp(12) },
  ph_16: { paddingHorizontal: wp(16) },
  ph_24: { paddingHorizontal: wp(24) },
  ph_32: { paddingHorizontal: wp(32) },
  pr_10: { paddingRight: wp(10) },
  pr_12: { paddingRight: wp(12) },
  mb_4: { marginBottom: hp(4) },
  mb_8: { marginBottom: hp(8) },
  mb_12: { marginBottom: hp(12) },
  mb_16: { marginBottom: hp(16) },
  mb_20: { marginBottom: hp(20) },
  mb_24: { marginBottom: hp(24) },
  mb_32: { marginBottom: hp(32) },
  mt_2: { marginTop: hp(2) },
  mt_4: { marginTop: hp(4) },
  mt_8: { marginTop: hp(8) },
  mt_12: { marginTop: hp(12) },
  mt_16: { marginTop: hp(16) },
  mt_24: { marginTop: hp(24) },
  mt_32: { marginTop: hp(32) },
  mt_60: { marginTop: hp(60) },
  mt_40: { marginTop: hp(40) },
  mt_70: { marginTop: hp(70) },
  mt_110: { marginTop: hp(110) },
  mt_130: { marginTop: hp(130) },
  mt_200: { marginTop: hp(200) },
  mt_300: { marginTop: hp(300) },
  ml_4: { marginLeft: wp(4) },
  ml_8: { marginLeft: wp(8) },
  ml_12: { marginLeft: wp(12) },
  ml_16: { marginLeft: wp(16) },
  ml_24: { marginLeft: wp(24) },
  ml_32: { marginLeft: wp(32) },
  ml_125: { marginLeft: wp(125) },
  ml_150: { marginLeft: wp(150) },
  ml_155: { marginLeft: wp(155) },
  ml_180: { marginLeft: wp(180) },
  ml_110: { marginLeft: wp(110) },
  mr_4: { marginRight: wp(4) },
  mr_8: { marginRight: wp(8) },
  mr_12: { marginRight: wp(12) },
  mr_16: { marginRight: wp(16) },
  mr_24: { marginRight: wp(24) },
  mr_32: { marginRight: wp(32) },
  mv_4: { marginVertical: hp(4) },
  mv_8: { marginVertical: hp(8) },
  mv_12: { marginVertical: hp(12) },
  mv_16: { marginVertical: hp(16) },
  mv_24: { marginVertical: hp(24) },
  mv_32: { marginVertical: hp(32) },
  mh_4: { marginHorizontal: wp(4) },
  mh_2: { marginHorizontal: wp(2) },
  mh_1: { marginHorizontal: wp(1) },
  mh_8: { marginHorizontal: wp(8) },
  mh_12: { marginHorizontal: wp(12) },
  mh_16: { marginHorizontal: wp(16) },
  mh_24: { marginHorizontal: wp(24) },
  mh_32: { marginHorizontal: wp(32) },
  textCenter: {
    textAlign: 'center',
  },
  fs_12: { fontSize: 12 },
  fs_14: { fontSize: 14 },
  fs_16: { fontSize: 16 },
  fs_18: { fontSize: 18 },
  fs_20: { fontSize: 20 },
  fs_22: { fontSize: 22 },
  fs_24: { fontSize: 24 },
  fs_28: { fontSize: 28 },
  fw_500: { fontWeight: '500' },
  fw_600: { fontWeight: '600' },
  fw_400: { fontWeight: '400' },
  bgWhite: { backgroundColor: COLOR.WHITE },
});

export {
  COLOR, width, height, wp, hp, ActiveOpacity, JUSTIFY, KEYBOARDTYPE,
  FONT, FONT_WEIGHT, TEXT_STYLE, commonStyles,
}