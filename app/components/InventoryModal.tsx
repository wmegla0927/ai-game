import React from 'react';
import { Modal, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import PixelContainer from './PixelContainer';
import PixelText from './PixelText';
import PixelButton from './PixelButton';
import InventoryItem from './InventoryItem';
import { InventoryItem as InventoryItemType } from '@/types/game';
import colors from '@/constants/colors';
import { X } from 'lucide-react-native';

interface InventoryModalProps {
  visible: boolean;
  onClose: () => void;
  inventory: InventoryItemType[];
  onUseItem: (itemId: string) => void;
}

export default function InventoryModal({ 
  visible, 
  onClose, 
  inventory, 
  onUseItem 
}: InventoryModalProps) {
  const [selectedItem, setSelectedItem] = React.useState<InventoryItemType | null>(null);
  
  const handleItemPress = (item: InventoryItemType) => {
    setSelectedItem(item);
  };
  
  const handleUseItem = () => {
    if (selectedItem) {
      onUseItem(selectedItem.id);
      setSelectedItem(null);
    }
  };
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <PixelContainer style={styles.modalContainer}>
          <View style={styles.header}>
            <PixelText variant="title">Inventory</PixelText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <ScrollView style={styles.itemList}>
              {inventory.length === 0 ? (
                <PixelText style={styles.emptyText}>Your inventory is empty.</PixelText>
              ) : (
                inventory.map((item) => (
                  <InventoryItem 
                    key={item.id} 
                    item={item} 
                    onPress={handleItemPress} 
                  />
                ))
              )}
            </ScrollView>
            
            {selectedItem && (
              <View style={styles.itemDetails}>
                <PixelText variant="subtitle">{selectedItem.name}</PixelText>
                <PixelText style={styles.description}>{selectedItem.description}</PixelText>
                {selectedItem.effect && (
                  <PixelButton 
                    text="Use Item" 
                    variant="secondary" 
                    onPress={handleUseItem} 
                    style={styles.useButton}
                  />
                )}
              </View>
            )}
          </View>
          
          <PixelButton 
            text="Close" 
            variant="primary" 
            onPress={onClose} 
            style={styles.closeButtonBottom}
          />
        </PixelContainer>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  closeButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  itemList: {
    flex: 1,
    marginBottom: 16,
  },
  itemDetails: {
    padding: 16,
    backgroundColor: colors.dark,
    borderWidth: 2,
    borderColor: colors.border,
    marginBottom: 16,
  },
  description: {
    marginVertical: 8,
    color: colors.muted,
  },
  useButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  closeButtonBottom: {
    marginTop: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: 20,
  },
});