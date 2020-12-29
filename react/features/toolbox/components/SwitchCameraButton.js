import React, {useState, useEffect} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Svg, { Path } from "react-native-svg"
import {MEDIA_TYPE, toggleCameraFacingMode} from "../../base/media";
import { openDialog } from '../../base/dialog';
import {isLocalTrackMuted} from "../../base/tracks";
import {translate} from "../../base/i18n";
import {connect} from "../../base/redux";
import OverflowMenu from '../components/native/OverflowMenu';
import AudioRoutePickerDialog
    from "../../mobile/audio-mode/components/AudioRoutePickerDialog";

function SwitchCameraButton(props) {
    const [backgroundColor, setBackgroundColor] = useState('#fff');
    const deviceSelected = props._devices.filter(item => item.selected);
    const _handleClick = () => {
        !_isDisabled() ?
            props.dispatch(toggleCameraFacingMode())
            :
            props.dispatch(openDialog(AudioRoutePickerDialog, {callBack: getBackgroundColor }))
    }

    useEffect(() => {
        console.log('device selected: ', deviceSelected, props.tracks)
        if (deviceSelected[0]?.type === 'SPEAKER') {
            setBackgroundColor('#fff')
        } else {
            setBackgroundColor('#A0A0A0')
        }
    }, []);

    const getBackgroundColor = (device) => {
        if (device.type === "SPEAKER") {
            setBackgroundColor('#fff')
        } else {
            setBackgroundColor('#A0A0A0')
        }
    }

    const _isDisabled = () => {
        return props._audioOnly || props._videoMuted;
    }

    return (
        <View>
            {!_isDisabled() ?
                <TouchableOpacity style={[styles.container, {backgroundColor: '#fff'}]} onPress={_handleClick}>
                    <Svg
                        height="25"
                        viewBox="0 -25 512 512"
                        width="25"
                        xmlns="http://www.w3.org/2000/svg"
                        {...props}
                    >
                        <Path
                            d="M351 253h-51c-11.047 0-20-8.953-20-20s8.953-20 20-20h23.352c-15.082-25.14-42.309-41-72.813-41-31.219 0-59.871 17.066-74.773 44.54-5.27 9.706-17.41 13.308-27.118 8.038-9.71-5.266-13.308-17.406-8.043-27.113C162.512 157.085 204.637 132 250.535 132c27.336 0 53.305 8.664 75.094 25.063 9.664 7.269 18.203 15.964 25.371 25.656V163c0-11.047 8.953-20 20-20s20 8.953 20 20v50c0 22.055-17.945 40-40 40zm141 49c11.047 0 20-8.953 20-20V152c0-44.113-35.887-80-80-80h-30.36a20.003 20.003 0 01-18.937-13.555l-6.05-17.78C368.374 16.343 345.55 0 319.854 0h-127.77c-25.198 0-47.878 15.922-56.433 39.621l-6.925 19.172C125.875 66.691 118.317 72 109.914 72H80c-44.113 0-80 35.887-80 80v230c0 44.113 35.887 80 80 80h352c44.113 0 80-35.887 80-80 0-11.047-8.953-20-20-20s-20 8.953-20 20c0 22.055-17.945 40-40 40H80c-22.055 0-40-17.945-40-40V152c0-22.055 17.945-40 40-40h29.914c25.2 0 47.879-15.922 56.434-39.621l6.925-19.172C176.125 45.309 183.683 40 192.086 40h127.77a19.997 19.997 0 0118.933 13.555l6.05 17.78C353.122 95.657 375.946 112 401.642 112H432c22.055 0 40 17.945 40 40v130c0 11.047 8.953 20 20 20zm-263-17c0-11.047-8.953-20-20-20h-51c-22.055 0-40 17.945-40 40v50c0 11.047 8.953 20 20 20s20-8.953 20-20v-19.969c7.207 9.793 15.809 18.574 25.555 25.906C205.348 377.337 231.312 386 258.645 386c45.902 0 88.027-25.086 109.933-65.46 5.27-9.712 1.668-21.853-8.043-27.118-9.707-5.27-21.847-1.668-27.113 8.043C318.516 328.934 289.863 346 258.645 346c-30.504 0-57.73-15.86-72.813-41H209c11.047 0 20-8.953 20-20zm0 0"
                            fill="#585858"
                        />
                    </Svg>
                </TouchableOpacity>
                :
                <TouchableOpacity style={[styles.container, {backgroundColor: backgroundColor}]} onPress={_handleClick}>
                    <Svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 480 480"
                        width="25"
                        height="25"
                        {...props}
                    >
                        <Path
                            d="M278.944 17.577c-5.568-2.656-12.128-1.952-16.928 1.92L106.368 144.009H32c-17.632 0-32 14.368-32 32v128c0 17.632 14.368 32 32 32h74.368l155.616 124.512A16.158 16.158 0 00272 464.009c2.368 0 4.736-.512 6.944-1.568A16.05 16.05 0 00288 448.009v-416a16.05 16.05 0 00-9.056-14.432zM96 304.009H32v-128h64v128zm160 110.688l-128-102.4V167.721l128-102.4v349.376zM369.024 126.857c-6.304-6.24-16.416-6.144-22.624.128-6.208 6.304-6.144 16.416.128 22.624 24.16 23.904 37.472 56 37.472 90.4 0 34.4-13.312 66.496-37.472 90.4-6.304 6.208-6.368 16.32-.128 22.624a15.943 15.943 0 0011.36 4.736c4.064 0 8.128-1.536 11.264-4.64 30.304-29.92 46.976-70.08 46.976-113.12 0-43.04-16.672-83.2-46.976-113.152z"
                            fill="#585858"
                        />
                        <Path
                            d="M414.144 81.769c-6.272-6.208-16.416-6.176-22.624.096-6.208 6.272-6.176 16.416.096 22.624C427.968 140.553 448 188.681 448 240.009s-20.032 99.456-56.384 135.52c-6.272 6.208-6.304 16.352-.096 22.624a15.89 15.89 0 0011.36 4.736c4.064 0 8.128-1.536 11.264-4.64C456.608 356.137 480 299.945 480 240.009c0-59.936-23.392-116.128-65.856-158.24z"
                            fill="#585858"
                        />
                    </Svg>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 48,
        width: 48,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 7,
    }
})

function _mapStateToProps(state): Object {
    const { enabled: audioOnly } = state['features/base/audio-only'];
    const tracks = state['features/base/tracks'];
    return {
        _audioOnly: Boolean(audioOnly),
        _videoMuted: isLocalTrackMuted(tracks, MEDIA_TYPE.VIDEO),
        _devices: state['features/mobile/audio-mode'].devices
    };
}

export default translate(connect(_mapStateToProps)(SwitchCameraButton));