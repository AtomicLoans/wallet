import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '@ui-kitten/components';

const Word = ({children}) => {
  return (
    <View style={styles.word}>
      <Text numberOfLines={1}>{children}</Text>
    </View>
  );
};

const partitionArray = (array, size) =>
  array
    .map((e, i) => (i % size === 0 ? array.slice(i, i + size) : null))
    .filter(e => e);

const SeedPhraseTable = ({mnemonic}) => {
  const words = mnemonic.split(' ');
  const wordLines = partitionArray(words, 3);
  console.log(wordLines);
  return wordLines.map((line, i) => {
    return (
      <View style={styles.wordLine} key={i}>
        <Text style={styles.num}>{i * 3 + 1}.</Text>
        {line.map((word, j) => (
          <Word key={`${word}-${j}`}>{word}</Word>
        ))}
      </View>
    );
  });
};

const styles = StyleSheet.create({
  word: {
    backgroundColor: 'rgba(143, 155, 179, 0.08)',
    borderWidth: 1,
    borderColor: '#8F9BB3',
    borderRadius: 20,
    padding: 10,
    flex: 1,
    margin: 6,
    alignItems: 'center',
  },
  wordLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  num: {
    width: 24,
  },
});

export default SeedPhraseTable;
