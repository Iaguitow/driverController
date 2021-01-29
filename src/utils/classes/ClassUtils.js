import XLSX from 'xlsx';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Linking, Alert, Platform } from 'react-native';
import classManagerDay from './ClassListDriversDay'

class exportData {

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
}

var ExportDt = new exportData();
export default ExportDt;