import React from 'react';
import { View, StyleSheet } from 'react-native';
import PixelText from './PixelText';
import { SavePointType } from '@/types/game';
import colors from '@/constants/colors';

interface SavePointIndicatorProps {
  type: SavePointType;
}

export default function SavePointIndicator({ type }: SavePointIndicatorProps) {
  const getIcon = () => {
    switch (type) {
      case 'inn':
        return '🏠';
      case 'camp':
        return '⛺';
      case 'bonfire':
        return '🔥';
      case 'keep':
        return '🏰';
      default:
        return '💾';
    }
  };
  
  const getLabel = () => {
    switch (type) {
      case 'inn':
        return 'Inn';
      case 'camp':
        return 'Camp';
      case 'bonfire':
        return 'Bonfire';
      case 'keep':
        return 'Keep';
      default:
        return 'Save Point';
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <PixelText style={styles.icon}>{getIcon()}</PixelText>
      </View>
      <PixelText style={styles.label}>{getLabel()} - Game Saved</PixelText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.dark,
    borderWidth: 2,
    borderColor: colors.success,
    marginBottom: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  icon: {
    fontSize: 20,
  },
  label: {
    color: colors.success,
    fontWeight: 'bold',
  },
});