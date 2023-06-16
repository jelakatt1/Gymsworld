import { Platform, Share } from "react-native"
import { showMessage } from "react-native-flash-message"
import { passwordStrength } from 'check-password-strength'
import ImagePicker from 'react-native-image-crop-picker'
import { En } from '../enums/AppEnums'
import { COLOR, TEXT_STYLE } from "../enums/StyleGuide"


const isIOS = () => {
    return Platform.OS === 'ios';
  }

const openCamera = (callBack, width, height ) => {
    ImagePicker.openCamera({
        height: height ? height : 400,
        width: width ? width : 700,
        cropping: true,
    }).then(async image => {
        callBack(image)
    }).catch(e => {
        console.log(e);
    });
};

const openGallery = (callBack,width, height , type) => {
    ImagePicker.openPicker({
        height: height ? height : 400,
        width: width ? width : 700,
        cropping: type === En.video ? false : true,
        multiple: type === En.multiImage ? true : false,
        mediaType: En.video,
    }).then(async image => {
        callBack(image)
    }).catch(e => {
        console.log(e);
    });
};


const showFlash = (message, type = 'success', icon = "none", floating = false) => {
    showMessage({
        message: message,
        type: type,
        icon: icon,
        floating: floating,
        textStyle: { ...TEXT_STYLE.text, textAlign: 'center' },
        titleStyle: { ...TEXT_STYLE.text, textAlign: 'center' },
        style: {  backgroundColor: COLOR.RED }
    });
}

const handleEmail = (text, setEmail, callBack) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setEmail(text);
    if (emailRegex.test(text)) {
        callBack(true);
    } else {
        callBack(false);
    }
};

const passwordStrength_ = (txt, callBack) => {
    const strength = passwordStrength(txt).id;
    if (strength > 1) {
        return true;
    } else {
        return false;
    }
};

const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with activity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};

const formatDate = (date) => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}
const formateTime = (time) => {
    let hour = time.getHours();
    let mins = time.getMinutes();
    let secs = time.getSeconds();
    let formattedHour24 = hour;
    if (hour >= 12) {
      hour -= 12;
    }
    if (hour == 0) {
      hour = 12;
    }
    if (mins < 10) {
      mins = '0' + mins.toString();
    }
    if (secs < 10) {
      secs = '0' + secs.toString();
    }
    let ampm = formattedHour24 < 12 ? 'AM' : 'PM';
    //If 12 hour formating needed
    let formattedTime12 = `${hour}:${mins}:${secs} ${ampm}`;
    formattedHour24 = formattedHour24.toString().padStart(2, '0');
    let formattedTime24 = `${formattedHour24}:${mins}:00`;
    return formattedTime24 ;

  }




export { openCamera, openGallery, onShare, showFlash, passwordStrength_, formatDate, formateTime, handleEmail, isIOS}