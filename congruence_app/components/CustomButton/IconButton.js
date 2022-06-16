import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../assets/colors/colors.js';

const IconButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={[styles.actionIcon, {backgroundColor: colors.secondary}]}>
                <Icon name={props.icon} size={20} color= {colors.white} />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    actionIcon: {
        height: 25,
        width: 25,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        borderRadius: 3,
      },
});

export default IconButton;