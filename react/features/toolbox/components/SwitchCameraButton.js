import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Svg, { Path } from "react-native-svg"
import {MEDIA_TYPE, toggleCameraFacingMode} from "../../base/media";
import {isLocalTrackMuted} from "../../base/tracks";
import {translate} from "../../base/i18n";
import {connect} from "../../base/redux";

function SwitchCameraButton(props) {
    const _handleClick = () => {
        props.dispatch(toggleCameraFacingMode());
    }

    const _isDisabled = () => {
        return props._audioOnly || this.props._videoMuted;
    }

    return (
        <TouchableOpacity style={[styles.container, {backgroundColor: _isDisabled() ? '#dddddd' : '#fff'}]} onPress={_handleClick} disabled={_isDisabled()}>
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
        _videoMuted: isLocalTrackMuted(tracks, MEDIA_TYPE.VIDEO)
    };
}

export default translate(connect(_mapStateToProps)(SwitchCameraButton));