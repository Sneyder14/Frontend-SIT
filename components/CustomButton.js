import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomButton({ title, onPress, backgroundColor, textColor, icon }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        backgroundColor && { backgroundColor }
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={textColor || '#FFFFFF'}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, textColor && { color: textColor }]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3376ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_800ExtraBold'
  },
});
