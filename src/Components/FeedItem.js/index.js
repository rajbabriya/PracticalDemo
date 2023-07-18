import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../Theme/colors';

const FeedItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
        <View style={styles.cardDetails}>
            <Image style={styles.image} source={{uri: item.vDealListImage_I_220X220}}/>
            <View style={styles.descView}>
                <Text style={styles.title} numberOfLines={1}>{item.vShortDescriptionHeading}</Text>
                <Text style={styles.desc} numberOfLines={6}>{item.vShortDescription}</Text>
            </View>
            <Image style={styles.starIcon} source={require('../../Assets/Star.png')}/>
        </View>
        <Text style={styles.prizeEnabled}>
            <Text style={styles.prizeDisabled}>{item.dDealOrigianlAmount}</Text> <Text style={[styles.prizeDisabled,{textDecorationLine : 'none'}]}>/</Text> {item.dDealDiscountedAmount}
        </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    card:{
        backgroundColor: colors.white,
        padding: 5,
        margin: 5,
        borderRadius: 3
    },
    cardDetails:{
        flexDirection: 'row'
    },
    image:{
        height: 100,
        width: 100
    },
    descView:{
        flex: 1,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary
    },
    desc:{
        fontSize: 12,
        fontWeight: 'normal',
        lineHeight: 18,
        flex: 1
    },
    starIcon:{
        margin: 5,
        height: 30,
        width: 30,
        tintColor: colors.black
    },
    prizeEnabled: {
        marginTop: 5,
        marginBottom: 8,
        color: colors.green
    },
    prizeDisabled:{
        color: 'gray',
        textDecorationLine: 'line-through',
    }
})

export default FeedItem;