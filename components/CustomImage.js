import { useRef, useState } from 'react';
import { Image, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { carousel_width, border_radius, double_border_radius, ten_times_border_radius, space, three_spaces } from '../styles/default';
import colors from '../styles/colors';
import messages from '../constants/i18n';


const CustomImage = (props) => {

    const { item, index, onDelete, onSubtitleBlur } = props;

    const handleDelete = () => {
        onDelete(index)
    }

    const handleSubtitleChange = (text) => {
        onSubtitleBlur(index, text)
    }

    const inputRef = useRef(null)

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Image source={{ uri: item.image }} style={[styles.image]} />
                <TouchableOpacity style={styles.delete} onPress={handleDelete}>
                    <Ionicons name="remove-outline" size={36} color={colors.white} />
                </TouchableOpacity>
                <TextInput ref={inputRef} style={styles.input} placeholder={messages.subtitlePlaceholder} value={item.text} onChangeText={handleSubtitleChange} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: carousel_width,
        alignItems: 'center',
    },
    innerContainer: {
        backgroundColor: colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: double_border_radius,
    },
    image: {
        width: carousel_width*0.8,
        height: 250,
        margin: space,
        marginBottom: three_spaces,
        resizeMode: "cover",
        borderRadius: border_radius,
    },
    input: {
        backgroundColor: colors.white,
        width: carousel_width*0.8,
        padding: space,
        margin: 12,
        borderRadius: border_radius,
    },
    delete: {
        backgroundColor: colors.red,
        position: 'absolute',
        bottom: 60,
        paddingHorizontal: 1,
        aspectRatio: 1,
        borderRadius: ten_times_border_radius,
    }
});

export default CustomImage