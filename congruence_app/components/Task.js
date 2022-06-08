import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
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
        backgroundColor: '#C0C0C0',
        borderRadius: 5,
        marginRight: 15,
    },
    complete: {
        width: 24, 
        height: 24,
        backgroundColor: '#008000',
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%', 

    },
    circular: {
        width: 12,
        hieght: 12,
        borderColor: '#C0C0C0',
        borderWidth: 2,
        borderRadius: 5,
    },
    
});

export default Task;