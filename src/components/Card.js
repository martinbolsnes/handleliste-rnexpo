import { Text, StyleSheet, Pressable, Switch } from 'react-native';

export default function Card(props) {
  return (
    <Pressable
      style={styles.task}
      onLongPress={() => props.deleteItem(props.index)}
    >
      <Text
        style={{
          ...styles.text,
          textDecorationLine: props.data.isSelected ? 'line-through' : 'none',
        }}
      >
        {props.data.text}
      </Text>
      <Switch
        trackColor={{ false: '#F5EFEF', true: '#AD1DEB' }}
        value={props.data.isSelected}
        onValueChange={(value) => props.setIsSelected(props.index, value)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    backgroundColor: '#fefefe',
    borderRadius: 8,
    borderColor: '#12121230',
    borderWidth: 1,
    shadowColor: '#12121230',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,

    elevation: 4,
  },

  text: {
    fontSize: 18,
    fontWeight: '500',
  },
});
