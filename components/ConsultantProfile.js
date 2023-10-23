import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, remove } from "firebase/database";
import { ConsultantContext } from './ConsultantContext';

function ConsultantProfile({ route, navigation }) {
    const { consultants, setConsultants } = useContext(ConsultantContext);
    const [consultant, setConsultant] = useState({});
    const db = getDatabase();
    
    useEffect(() => {
        if (route.params && route.params.consultant) {
            setConsultant(route.params.consultant[1]);
        }
        return () => {
            setConsultant({});
        };
    }, []);

    const handleEdit = () => {
        const consultantData = route.params.consultant;
        navigation.navigate('Edit Consultant', { consultant: consultantData });
    };

    const confirmDelete = () => {
        Alert.alert('Er du sikker?', 'Vil du slette konsulenten?', [
            { text: 'Annuller', style: 'cancel' },
            { text: 'Slet', style: 'destructive', onPress: () => handleDelete() },
        ]);
    };

    const handleDelete = async () => {
        try {
            const id = route.params.consultant[0];
            const consultantRef = ref(db, `Consultants/${id}`);
            await remove(consultantRef);
            Alert.alert('Slettet', 'Konsulenten er slettet');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Fejl', 'Noget gik galt. Kunne ikke slette konsulenten.');
            console.error(`Error: ${error.message}`);
        }
    };

    if (!consultant) {
        return <Text>Ingen data</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleEdit}>
                    <Text style={styles.buttonText}>Rediger</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={confirmDelete}>
                    <Text style={styles.buttonText}>Slet</Text>
                </TouchableOpacity>
            </View>
            {
                Object.entries(consultant).map((item, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={styles.label}>{item[0]} </Text>
                        <Text style={styles.value}>{item[1]}</Text>
                    </View>
                ))
            }
        </View>
    );
}

export default ConsultantProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        width: '45%'
    },
    deleteButton: {
        backgroundColor: '#FF3B30'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        height: 60,
        marginVertical: 8,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    label: {
        fontWeight: 'bold',
        width: 120,
        fontSize: 16
    },
    value: {
        flex: 1,
        fontSize: 16
    }
});