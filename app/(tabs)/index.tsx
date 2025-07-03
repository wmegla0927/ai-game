import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGameStore } from '@/store/gameStore';
import PixelContainer from '@/components/PixelContainer';
import PixelText from '@/components/PixelText';
import PixelButton from '@/components/PixelButton';
import HealthBar from '@/components/HealthBar';
import SavePointIndicator from '@/components/SavePointIndicator';
import DeathScreen from '@/components/DeathScreen';
import TypewriterText from '@/components/TypewriterText';
import { useAudio } from '@/hooks/useAudio';
import scenes from '@/data/scenes';
import colors from '@/constants/colors';
import { Dice5 } from 'lucide-react-native';

export default function GameScreen() {
  const { 
    currentSceneId, 
    health, 
    maxHealth, 
    gold,
    isDead,
    goToScene, 
    takeDamage, 
    heal, 
    addItem, 
    addGold,
    respawn 
  } = useGameStore();
  
  const [textComplete, setTextComplete] = useState(false);
  const { playTrack, audioEnabled } = useAudio();
  const currentSceneRef = useRef(currentSceneId);
  
  const currentScene = scenes[currentSceneId];
  
  useEffect(() => {
    // Only reset state if the scene actually changed
    if (currentSceneRef.current !== currentSceneId) {
      currentSceneRef.current = currentSceneId;
      
      // Reset state when scene changes
      setTextComplete(false);
      
      // Play music if specified for the scene and audio is enabled
      if (currentScene?.music && audioEnabled) {
        playTrack(currentScene.music as any);
      }
    }
  }, [currentSceneId, currentScene, playTrack, audioEnabled]);
  
  const handleTextComplete = () => {
    setTextComplete(true);
  };
  
  const handleChoice = (choice: any) => {
    // Process any effects from the choice
    if (choice.effect) {
      switch (choice.effect.type) {
        case 'addItem':
          addItem(choice.effect.value);
          break;
        case 'damage':
          takeDamage(choice.effect.value);
          break;
        case 'heal':
          heal(choice.effect.value);
          break;
        case 'gold':
          addGold(choice.effect.value);
          break;
      }
    }
    
    // Go to the next scene
    goToScene(choice.nextSceneId);
  };
  
  const handleFateChoice = () => {
    if (!currentScene?.choices?.fate || currentScene.choices.fate.length === 0) return;
    
    // Randomly select one of the fate choices
    const randomIndex = Math.floor(Math.random() * currentScene.choices.fate.length);
    const fateChoice = currentScene.choices.fate[randomIndex];
    
    handleChoice(fateChoice);
  };
  
  if (!currentScene) {
    return (
      <View style={styles.container}>
        <PixelText>Error: Scene not found</PixelText>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <HealthBar current={health} max={maxHealth} />
        <View style={styles.goldContainer}>
          <PixelText style={styles.goldLabel}>Gold:</PixelText>
          <PixelText style={styles.goldValue}>{gold}</PixelText>
        </View>
      </View>
      
      {/* Main Game Content */}
      <ScrollView style={styles.scrollView}>
        <PixelContainer style={styles.contentContainer}>
          {/* Save Point Indicator */}
          {currentScene.isSavePoint && currentScene.savePointType && (
            <SavePointIndicator type={currentScene.savePointType} />
          )}
          
          {/* Scene Text */}
          <TypewriterText 
            text={currentScene.text} 
            onComplete={handleTextComplete}
            style={styles.sceneText}
          />
          
          {/* Choices - Show when text is complete */}
          {textComplete && currentScene.choices && (
            <View style={styles.choicesContainer}>
              <View style={styles.yesNoContainer}>
                <PixelButton 
                  text="Yes" 
                  variant="primary" 
                  onPress={() => handleChoice(currentScene.choices!.yes)}
                  style={styles.yesNoButton}
                />
                
                <PixelButton 
                  text="No" 
                  variant="secondary" 
                  onPress={() => handleChoice(currentScene.choices!.no)}
                  style={styles.yesNoButton}
                />
              </View>
              
              {currentScene.choices.fate && currentScene.choices.fate.length > 0 && (
                <TouchableOpacity 
                  style={styles.fateButton}
                  onPress={handleFateChoice}
                  activeOpacity={0.7}
                >
                  <Dice5 size={24} color={colors.text} />
                  <PixelText style={styles.fateText}>Let the Fates Decide</PixelText>
                </TouchableOpacity>
              )}
            </View>
          )}
          
          {/* Death Scene - No choices needed */}
          {currentScene.isDeath && textComplete && (
            <View style={styles.deathContainer}>
              <PixelButton 
                text="Continue..." 
                variant="danger" 
                onPress={respawn}
                style={styles.continueButton}
              />
            </View>
          )}
        </PixelContainer>
      </ScrollView>
      
      {/* Death Overlay */}
      {isDead && <DeathScreen onRespawn={respawn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusBar: {
    backgroundColor: colors.darker,
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
  },
  goldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goldLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  goldValue: {
    color: colors.warning,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    margin: 16,
  },
  sceneText: {
    marginBottom: 24,
  },
  choicesContainer: {
    marginTop: 16,
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  yesNoButton: {
    flex: 1,
  },
  fateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: colors.dark,
    borderWidth: 2,
    borderColor: colors.border,
    width: '100%',
  },
  fateText: {
    marginLeft: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  deathContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  continueButton: {
    marginTop: 16,
  },
});