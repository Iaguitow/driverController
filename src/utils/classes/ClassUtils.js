import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Buffer } from "buffer"; 

import { Linking, Alert, Platform } from 'react-native';
import classManagerDay from './ClassDBDriversDay';
import classManagerWeek from './ClassDBDriversWeek';
import globalLogin from "../classes/ClassGlobal.js";

class utilsFunctions {

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    callNumber(phone) {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        }
        else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.canOpenURL(phoneNumber)
            .then(supported => {
                if (!supported) {
                    Alert.alert('Phone number is not available');
                } else {
                    return Linking.openURL(phoneNumber);
                }
            })
            .catch(err => console.log(err));
    };

    
    export(idWorkDay) {

        classManagerDay.getListDriversWorked(idWorkDay, function (resultado) {

            if (resultado[0] == 'E') {
                alert(resultado);
                return null;
            }

            var data = JSON.parse(resultado);

            var ws = XLSX.utils.json_to_sheet(data);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "DriversList");

            const wbout = XLSX.write(wb, {
                type: 'base64',
                bookType: "xlsx"
            });

            const uri = FileSystem.cacheDirectory + 'DriversList.xlsx';
            FileSystem.writeAsStringAsync(uri, wbout, {
                encoding: FileSystem.EncodingType.Base64
            });

            Sharing.shareAsync(uri, {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                dialogTitle: 'MyWater data',
                UTI: 'com.microsoft.excel.xlsx'
            });
        });
    }

    exportWeek(idWorkWeek) {

        classManagerWeek.getListDriversWorkedWeek(idWorkWeek, function (resultado) {

            if (resultado[0] == 'E') {
                alert(resultado);
                return null;
            }

            var data = JSON.parse(resultado);

            var ws = XLSX.utils.json_to_sheet(data);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "DriversList");

            const wbout = XLSX.write(wb, {
                type: 'base64',
                bookType: "xlsx"
            });

            const uri = FileSystem.cacheDirectory + 'DriversList.xlsx';
            FileSystem.writeAsStringAsync(uri, wbout, {
                encoding: FileSystem.EncodingType.Base64
            });

            Sharing.shareAsync(uri, {
                mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                dialogTitle: 'MyWater data',
                UTI: 'com.microsoft.excel.xlsx'
            });
        });
    }

    getDayGreeting(){

        const hours = new Date().getHours();
        
        switch(true){
        case hours >= 1 && hours < 12:
            return "Good Morning";
            break;
        case hours >= 12 && hours <= 18:
            return "Good Afternoon";
            break;
        case hours >= 19 && hours <= 24:
            return "Good Evening";
            break;
        default:
            return "Good Morning";
        }
    }



    /*
        arrayBufferToBase64(callback) {
        console.log(globalLogin.isLogInPhoto.data);
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(globalLogin.isLogInPhoto.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        console.log(binary);
        const result = btoa(binary);
        callback(result);
    };
    async converToBlob(img,callback){
        const options = { encoding: FileSystem.EncodingType.Base64 };
        const base64Response = await FileSystem.readAsStringAsync(
            img,
            options,
        );
        const blob = Buffer.from(base64Response, "base64");
        callback(blob)
    }*/
    /*
    function btoa(data) { return new Buffer(data, "binary").toString("base64"); }
    function atob(data) { return new Buffer(data, "base64").toString("binary"); }
    */
}


var ExportDt = new utilsFunctions();
export default ExportDt;