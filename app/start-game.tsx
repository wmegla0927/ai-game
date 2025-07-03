import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import PixelContainer from '@/components/PixelContainer';
import PixelText from '@/components/PixelText';
import PixelButton from '@/components/PixelButton';
import { useGameStore } from '@/store/gameStore';
import colors from '@/constants/colors';

export default function StartGameScreen() {
  const { initGame } = useGameStore();
  
  const handleStartNewGame = () => {
    initGame();
    router.replace('/(tabs)');
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <PixelContainer style={styles.contentContainer}>
          <PixelText variant="title" style={styles.title}>ARCANE ODYSSEY</PixelText>
          
          <PixelText style={styles.subtitle}>A Text Adventure of Dark Fantasy</PixelText>
          
          <View style={styles.divider} />
          
          <PixelText style={styles.description}>
            You awaken in a dimly lit chamber, with no memory of how you arrived. 
            The air is thick with the scent of ancient dust and forgotten magic.
          </PixelText>
          
          <PixelText style={styles.description}>
            Before you stands a weathered wooden door, its surface etched with arcane symbols 
            that seem to shift when you are not looking directly at them.
          </PixelText>
          
          <PixelText style={styles.description}>
            What dark secrets await beyond? What forgotten horrors lurk in the shadows?
            The choice is yours, adventurer.
          </PixelText>
          
          <View style={styles.buttonContainer}>
            <PixelButton 
              text="Begin Adventure" 
              variant="primary" 
              size="large"
              onPress={handleStartNewGame}
            />
          </View>
          
          <View style={styles.infoContainer}>
            <PixelText variant="subtitle" style={styles.infoTitle}>How to Play</PixelText>
            <PixelText style={styles.infoText}>
              • Read the story text carefully
            </PixelText>
            <PixelText style={styles.infoText}>
              • Choose your path: Yes, No, or Let the Fates Decide
            </PixelText>
            <PixelText style={styles.infoText}>
              • Collect items to aid your journey
            </PixelText>
            <PixelText style={styles.infoText}>
              • Rest at save points to preserve your progress
            </PixelText>
            <PixelText style={styles.infoText}>
              • Death is not the end - you will respawn at your last save point
            </PixelText>
            <PixelText style={styles.infoText}>
              • Press and hold anywhere on the text to speed up typing
            </PixelText>
          </View>
        </PixelContainer>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: colors.muted,
    marginBottom: 24,
  },
  divider: {
    height: 2,
    backgroundColor: colors.border,
    marginBottom: 24,
  },
  description: {
    marginBottom: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: colors.dark,
    borderWidth: 2,
    borderColor: colors.border,
  },
  infoTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    marginBottom: 8,
    paddingLeft: 16,
  },
});