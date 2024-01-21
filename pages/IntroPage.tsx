import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import AppStyles from '../utils/globalStyles';
import { useDispatch } from 'react-redux';
import { toggleShowIntroPage } from '../reduxStore/slices/pagesStateSlice';

const IntroPage = () => {
  const dispatch = useDispatch();
  const [showText2, setShowText2] = React.useState(false);
  const [showText3, setShowText3] = React.useState(false);
  const [showText4, setShowText4] = React.useState(false);

  return (
    <View style={styles.main}>
      <Text style={AppStyles.paragraph}>
        In the vast expanse of the cosmos, you find yourself as a lone explorer.
      </Text>
      {!showText2 && (
        <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          onPress={() => setShowText2(true)}>
          Continue
        </Button>
      )}

      {showText2 && (
        <Text style={AppStyles.paragraph}>
          The known universe is now in a state of desolation, having witnessed the
          collapse of a golden age marked by advanced technology and widespread
          prosperity. The aftermath of a devastating war has left humanity in a dark
          age, scattered and struggling to survive.
        </Text>
      )}
      {!showText3 && showText2 && (
        <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          onPress={() => setShowText3(true)}>
          Continue
        </Button>
      )}

      {showText3 && (
        <Text style={AppStyles.paragraph}>
          Amidst the cosmic ruins, an opportunity emerges. Rare solar minerals, and
          long lost technology highly sought after by powerful corporations, present
          a chance for fortune amidst the prevailing darkness.
        </Text>
      )}
      {!showText4 && showText2 && showText3 && (
        <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          onPress={() => setShowText4(true)}>
          Continue
        </Button>
      )}

      {showText4 && <Text style={AppStyles.paragraph}>Do not trust anyone.</Text>}
      {showText4 && (
        <Button
          style={AppStyles.button}
          labelStyle={AppStyles.buttonText}
          mode='contained'
          onPress={() => dispatch(toggleShowIntroPage())}>
          Begin Your Journey
        </Button>
      )}
    </View>
  );
};

export default IntroPage;

const styles = StyleSheet.create({
  main: {
    height: '100%',
    backgroundColor: 'black',
    paddingTop: 200,
    paddingHorizontal: 10,
  },
});
