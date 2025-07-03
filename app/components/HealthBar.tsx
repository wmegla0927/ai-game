import React from 'react';
import { View, StyleSheet } from 'react-native';
import PixelText from './PixelText';
import colors from '@/constants/colors';

interface HealthBarProps {
  current: number;
  max: number;
}

export default function HealthBar({ current, max }: HealthBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  let barColor = colors.success;
  if (percentage < 30) {
    barColor = colors.danger;
  } else if (percentage < 60) {
    barColor = colors.warning;
  }
  
  return (
    <View style={styles.container}>
      <PixelText style={styles.label}>HP</PixelText>
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${percentage}%`, backgroundColor: barColor }]} />
      </View>
      <PixelText style={styles.value}>{current}/{max}</PixelText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    width: 30,
    fontWeight: 'bold',
  },
  barContainer: {
    flex: 1,
    height: 16,
    backgroundColor: colors.darker,
    borderWidth: 2,
    borderColor: colors.border,
    marginHorizontal: 8,
  },
  bar: {
    height: '100%',
  },
  value: {
    width: 60,
    textAlign: 'right',
  },
});