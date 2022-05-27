import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Task = (props) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            {/* <View style={styles.circular}></View> */}
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
    square: {
        width: 24, 
        height: 24,
        backgroundColor: '#C0C0C0',
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