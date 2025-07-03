import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import PixelText from './PixelText';
import PixelButton from './PixelButton';
import colors from '@/constants/colors';

interface DeathScreenProps {
  onRespawn: () => void;
}

export default function DeathScreen({ onRespawn }: DeathScreenProps) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <PixelText variant="title" color={colors.danger} style={styles.title}>
          YOU DIED
        </PixelText>
        
        <PixelText style={styles.message}>
          Death is not the end in this realm. Your soul drifts through darkness until it finds its way back to the last sanctuary you visited.
        </PixelText>
        
        <PixelText style={styles.message}>
          You awaken, your possessions gone but your memories intact.
        </PixelText>
        
        <PixelButton
          text="Continue from last save"
          variant="primary"
          size="large"
          onPress={onRespawn}
          style={styles.button}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    zIndex: 10,
  },
  content: {
    width: '100%',
    maxWidth: 500,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 32,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  button: {
    marginTop: 32,
  },
});