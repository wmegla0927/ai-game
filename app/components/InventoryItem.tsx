import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import PixelText from './PixelText';
import { InventoryItem as InventoryItemType } from '@/types/game';
import colors from '@/constants/colors';

interface InventoryItemProps {
  item: InventoryItemType;
  onPress: (item: InventoryItemType) => void;
}

export default function InventoryItem({ item, onPress }: InventoryItemProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <PixelText style={styles.icon}>?</PixelText>
      </View>
      <View style={styles.content}>
        <PixelText variant="subtitle" style={styles.name}>{item.name}</PixelText>
        {item.effect && (
          <PixelText style={styles.effect}>
            {item.effect.type === 'damage' && `Damage: +${item.effect.value}`}
            {item.effect.type === 'heal' && `Heal: +${item.effect.value}`}
            {item.effect.type === 'protection' && `Protection: +${item.effect.value}`}
          </PixelText>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: colors.darker,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.dark,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    marginBottom: 4,
  },
  effect: {
    color: colors.primary,
    fontSize: 12,
  },
});