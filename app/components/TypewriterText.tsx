import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PixelText from './PixelText';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  style?: any;
}

export default function TypewriterText({ 
  text, 
  speed = 30, 
  onComplete,
  style 
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isSpeedUp, setIsSpeedUp] = useState(false);
  const index = useRef(0);
  const textRef = useRef(text);
  const completedRef = useRef(false);

  // Reset when text changes
  useEffect(() => {
    index.current = 0;
    setDisplayedText('');
    setIsComplete(false);
    setIsSpeedUp(false);
    completedRef.current = false;
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    if (isComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete?.(); // ✅ call it directly when complete
      return;
    }

    if (index.current >= textRef.current.length) return;

    const currentSpeed = isSpeedUp ? 5 : speed;
    const timer = setTimeout(() => {
      setDisplayedText(prev => {
        const nextChar = textRef.current.charAt(index.current);
        index.current += 1;

        if (index.current >= textRef.current.length) {
          setIsComplete(true); // triggers onComplete via above block
        }

        return prev + nextChar;
      });
    }, currentSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, speed, isSpeedUp, isComplete, onComplete]);

  const handlePressIn = () => setIsSpeedUp(true);
  const handlePressOut = () => setIsSpeedUp(false);

  const handlePress = () => {
    if (!isComplete) {
      setDisplayedText(textRef.current);
      setIsComplete(true); // triggers onComplete
    }
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
    >
      <View>
        <PixelText style={[styles.text, style]}>
          {displayedText}
          {!isComplete && <PixelText style={styles.cursor}>_</PixelText>}
        </PixelText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  text: {
    lineHeight: 24,
  },
  cursor: {
    opacity: 1,
  },
});
