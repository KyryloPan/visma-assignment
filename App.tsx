import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [fileNameText, setFileNameText] = useState('');
  const [extentionText, setExtentionText] = useState('');
  const [dateText, setDateText] = useState('');
  const [sizeText, setSizeText] = useState('');

  const [fileList, setFileList] = useState([] as any);

  const [showModal, setShowModal] = useState(false);

  const inputValues = [
    {
      name: 'File Name',
      value: fileNameText,
      onChangeText: (text: string) => {setFileNameText(text)},
      index: 0,
    },
    {
      name: 'Extention',
      value: extentionText,
      onChangeText: (text: string) => setExtentionText(text),
      index: 1,
    },
    {
      name: 'Date',
      value: dateText,
      onChangeText: (text: string) => setDateText(text),
      index: 2,
    },
    {
      name: 'Size',
      value: sizeText,
      onChangeText: (text: string) => setSizeText(text),
      index: 3,
    },
  ];

  const handleSaveData = () => {
    setFileList([
      ...fileList, {
        extention: extentionText,
        size: sizeText,
        fileName: fileNameText,
        date: dateText,
      },
    ])
    setShowModal(false);
  };

  const handleClearData = () => {
    setFileList([])
    setShowModal(false);
  };

  const resultText = () => {
    let resultText = '';
    if (fileNameText) {
      resultText = fileNameText;
    }
    if (extentionText) {
      resultText = `${fileNameText}.${extentionText}`;
    }
    if (dateText) {
      resultText = `${fileNameText}.${extentionText}(${dateText})`;
    }
    if (sizeText) {
      resultText = `${fileNameText}.${extentionText}(${dateText}, ${sizeText})`;
    }
    return resultText;
  }

  const AddRecord = () => {
    return (
      <View style={styles.addRecordMain}>
        <View style={styles.addRecordHead}>
          <Text>Add Record</Text>
        </View>
        <TouchableOpacity
          style={styles.addRecordHeadCancelBtn}
          onPress={() => setShowModal(false)}
        >
          <Text>X</Text>
        </TouchableOpacity>

        {inputValues.map(inputVal => {
          return (
            <View style={styles.addRecordInputCont} key={inputVal.index}>
              <Text style={styles.inputText}>{inputVal.name}</Text>
              <TextInput
                style={styles.addRecordInput}
                onChangeText={(text) => {
                  inputVal.onChangeText(text)
                }}
                value={inputVal.value}
                maxLength={inputVal.index === 0 ? 64 : 20}
              />
            </View>
          )
        })}

        <>
          <Text>Result:</Text>
          <Text>{resultText()}</Text>
        </>

        <View style={styles.addRecordButtonsCont}>
          <Button
            onPress={() => {handleClearData()}}
            title="Clear"
            color="grey"
          />
          <Button
            onPress={() => {handleSaveData()}}
            title="Save"
            color="grey"
          />
        </View>

      </View>
    )
  };

  return (
    <View style={styles.containerMain}>
      <View style={styles.containerLeft}>
        <View style={styles.leftHead}>
          <View style={styles.headButtonCont}>
            <Button
              onPress={() => {setShowModal(true)}}
              title="+"
              color="black"
            />
          </View>
        </View>
        <View style={styles.fileList}>

        {/* Check if fileList is not empty to render list */}
        {fileList.length !== 0 && (
          <FlatList
            data={fileList}
            renderItem={({item}) => {
              return (
                <View style={styles.listCont}>
                  <Text>{item.fileName}.{item.extention}</Text>
                  <Text>{item.date}</Text>
                </View>
                )
              }}
          />
        )}
        </View>
      </View>
      <View style={styles.containerRight}>
        <Text>Rigth List</Text>
      </View>
      {showModal && AddRecord()}
    </View>
  );
}

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerLeft: {
    width: '50%',
    margin: 10,
    padding: 10,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  containerRight: {
    margin: 10,
    padding: 10,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  leftHead: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  fileList: {
    padding: 3,
  },
  addRecordMain: {
    flex: 1,
    width: 300,
    position: 'absolute',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  addRecordHead: {
    padding: 5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  addRecordHeadCancelBtn: {
    width: 20,
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 5,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
  },
  addRecordInputCont: {
    padding: 5,
  },
  addRecordInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 2,
  },
  inputText: {
    paddingBottom: 2,
  },
  addRecordButtonsCont: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marin: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  listCont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headButtonCont: {
    width: 30,
  },
});
