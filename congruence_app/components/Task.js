import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../assets/colors/colors';

const completedHandler = (currTask) => {
    if (!currTask.completed) return styles.incomplete;
    return styles.complete;
}

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <View style={completedHandler(props)}></View>

                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View>
                <TouchableOpacity 
                // onPress={() => handleAddTask()}
                >
                    <View style={[styles.actionIcon, {backgroundColor: colors.secondary}]}>
                        <Icon name="edit" size={20} color= {colors.white} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={[styles.actionIcon, {backgroundColor: colors.secondary}]}>
                        <Icon name="delete" size={20} color= {colors.white} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alighItem: 'center',
        flexWrap: 'wrap',
    },
    incomplete: {
        width: 24, 
        height: 24,
        backgroundColor: colors.secondary,
        borderRadius: 5,
        marginRight: 15,
    },
    complete: {
        width: 24, 
        height: 24,
        backgroundColor: colors.primary,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%', 
    },
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

export default Task;