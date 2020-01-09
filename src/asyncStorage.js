import AsyncStorage from '@react-native-community/async-storage'
// import console = require('console');

export const storeData = async(key, value) => {
    try{
        await AsyncStorage.setItem(key, value)
        // alert("getValueBerhasil save data")
    }catch(e){
        console.log("gagal save AsyncStorage")
    }
    console.log("Done")
}

export const retrieveData = (key) => {
    return AsyncStorage.getItem(key).then((val) => {
        // alert("GET DATA BERHASIL")
        return JSON.parse(val)

    }).catch((e) => {
        alert("gagal getValue AsyncStorage")
    })
}

export const removeData = async(key) => {
    try{
        await AsyncStorage.removeItem(key)
        // alert("remove data berhasil")
        return true
    }catch(e) {
        return false
    }
}