import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CustomImage from './components/CustomImage';
import * as ImagePicker from 'expo-image-picker';
import { carousel_width, title } from './styles/default';
import colors from './styles/colors';
import messages from './constants/i18n';

export default function App() {

  const [images, setImages] = useState([])

  let _carouselRef = useRef()

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    setImages(images => [...images, { image: pickerResult.uri, text: '' }]);
    _carouselRef.current.snapToItem( images.length );
  }

  const handleItemDelete = (index) => {
    let imagesArray = [ ...images ];

    imagesArray.splice(index, 1)

    setImages(imagesArray)
  }

  const handleItemSubtitle = (index, newSubtitle) => {
    let imagesArray = [ ...images ];

    imagesArray[index].text = newSubtitle

    setImages(imagesArray)
  }

  const renderImage = ({ item, index }) => {
    return (
      <View style={{  }}>   
        <CustomImage item={item} index={index} onDelete={handleItemDelete} onSubtitleBlur={handleItemSubtitle} />
      </View>
    )
  }

  const renderCarousel = () => {
    if (images.length > 0) {
      return (
        <SafeAreaView style={{ height: carousel_width, margin: 10 }}>
          <Carousel
            layout={"default"}
            ref={_carouselRef}
            data={images}
            renderItem={renderImage}
            sliderWidth={carousel_width}
            itemWidth={carousel_width}
            slideStyle={styles.slideStyle}
          />
        </SafeAreaView>
      )
    }

    return (
      <View>
        <Text>{messages.noImage}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>{messages.title}</Text>
      {renderCarousel()}
      <Button
        onPress={openImagePickerAsync}
        title={messages.addImage}
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    ...title
  },
  slideStyle: {
    justifyContent: 'center'
  }
});
