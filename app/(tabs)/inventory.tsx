import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useGameStore } from '@/store/gameStore';
import PixelContainer from '@/components/PixelContainer';
import PixelText from '@/components/PixelText';
import InventoryItem from '@/components/InventoryItem';
import colors from '@/constants/colors';
import { InventoryItem as InventoryItemType } from '@/types/game';

export default function InventoryScreen() {
  const { inventory, useItem } = useGameStore();
  const [selectedItem, setSelectedItem] = useState<InventoryItemType | null>(null);
  
  const handleItemPress = (item: InventoryItemType) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  
  const handleUseItem = () => {
    if (selectedItem) {
      useItem(selectedItem.id);
      setSelectedItem(null);
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <PixelContainer style={styles.contentContainer}>
          <PixelText variant="title" style={styles.title}>Your Inventory</PixelText>
          
          {inventory.length === 0 ? (
            <View style={styles.emptyContainer}>
              <PixelText style={styles.emptyText}>
                Your inventory is empty. Explore the world to find items.
              </PixelText>
            </View>
          ) : (
            <View style={styles.itemsContainer}>
              {inventory.map((item) => (
                <InventoryItem 
                  key={item.id} 
                  item={item} 
                  onPress={handleItemPress} 
                />
              ))}
            </View>
          )}
          
          {selectedItem && (
            <PixelContainer variant="secondary" style={styles.detailsContainer}>
              <PixelText variant="subtitle">{selectedItem.name}</PixelText>
              <PixelText style={styles.description}>{selectedItem.description}</PixelText>
              
              {selectedItem.effect && (
                <View style={styles.effectContainer}>
                  <PixelText style={styles.effectLabel}>Effect:</PixelText>
                  <PixelText style={styles.effectValue}>
                    {selectedItem.effect.type === 'damage' && `Damage: +${selectedItem.effect.value}`}
                    {selectedItem.effect.type === 'heal' && `Heal: +${selectedItem.effect.value}`}
                    {selectedItem.effect.type === 'protection' && `Protection: +${selectedItem.effect.value}`}
                  </PixelText>
                </View>
              )}
              
              {selectedItem.effect && (
                <TouchableOpacity 
                  style={styles.useButton}
                  onPress={handleUseItem}
                  activeOpacity={0.7}
                >
                  <PixelText style={styles.useButtonText}>USE ITEM</PixelText>
                </TouchableOpacity>
              )}
            </PixelContainer>
          )}
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    margin: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.dark,
    borderWidth: 2,
    borderColor: colors.border,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
  },
  itemsContainer: {
    marginBottom: 16,
  },
  detailsContainer: {
    marginTop: 16,
  },
  description: {
    marginVertical: 8,
    color: colors.muted,
  },
  effectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  effectLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  effectValue: {
    color: colors.primary,
  },
  useButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: '#34d399',
    alignItems: 'center',
  },
  useButtonText: {
    color: colors.dark,
    fontWeight: 'bold',
  },
});