import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  View, 
  TouchableOpacityProps,
  Platform,
} from 'react-native';
import PixelText from './PixelText';
import colors from '@/constants/colors';

interface PixelButtonProps extends TouchableOpacityProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export default function PixelButton({ 
  text, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  style, 
  ...props 
}: PixelButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        style,
      ]}
      {...props}
    >
      <View style={styles.pixelBorder}>
        <PixelText 
          style={[
            styles.text,
            styles[`${size}Text`],
          ]}
          color={colors.background}
        >
          {text}
        </PixelText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.dark,
    padding: 2,
    ...Platform.select({
      web: {
        cursor: 'pointer',
      },
    }),
  },
  pixelBorder: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  danger: {
    backgroundColor: colors.danger,
    borderColor: colors.danger,
  },
  small: {
    minWidth: 80,
  },
  medium: {
    minWidth: 120,
  },
  large: {
    minWidth: 200,
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
});