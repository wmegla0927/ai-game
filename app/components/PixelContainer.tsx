import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import colors from '@/constants/colors';

interface PixelContainerProps extends ViewProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
  padding?: number;
}

export default function PixelContainer({ 
  children, 
  variant = 'dark',
  padding = 16,
  style, 
  ...props 
}: PixelContainerProps) {
  return (
    <View 
      style={[
        styles.container, 
        styles[variant],
        { padding },
        style
      ]} 
      {...props}
    >
      <View style={styles.innerBorder}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: colors.border,
    backgroundColor: colors.darker,
  },
  innerBorder: {
    borderWidth: 2,
    borderColor: colors.border,
    padding: 12,
    flex: 1,
  },
  primary: {
    borderColor: colors.primary,
  },
  secondary: {
    borderColor: colors.secondary,
  },
  dark: {
    borderColor: colors.border,
  },
});
