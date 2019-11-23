import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';



function DoubleTap({tech, navigation}) {
  
  var lastTap = null;
  const delay = 300;
  const onDoubleTap = () => null;
  const onOneTap = () => null;

  function handleDoubleTap() {
    const now = Date.now();
    if (this.lastTap && (now - lastTap) < delay) {
      onDoubleTap;
    } else {
      lastTap = now;
      onOneTap;
      console.log(props)
    }
  }

    return (
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        {React.props.Children}
      </TouchableWithoutFeedback>
    );
}

export default DoubleTap
