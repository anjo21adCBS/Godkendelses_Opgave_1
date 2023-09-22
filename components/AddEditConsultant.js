import React, { useContext, useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { getDatabase, ref, child, push, update } from "firebase/database";
import { ConsultantContext } from './ConsultantContext';

function AddEditConsultant({ navigation, route }) {
    const { consultants, setConsultants } = useContext(ConsultantContext);
    const db = getDatabase();

    const initialState = {
        name: '',
        expertise: '',
        experience: '',
        contactInfo: ''
    };

    const [newConsultant, setNewConsultant] = useState(initialState);
    const isEditConsultant = route.name === "Edit Consultant";

    useEffect(() => {
        if (isEditConsultant) {
            const consultant = route.params.consultant[1];
            if (consultant) {
                setNewConsultant(consultant);
            }
        }
        return () => {
            setNewConsultant(initialState);
        };
    }, []);

    const changeTextInput = (name, event) => {
        setNewConsultant({ ...newConsultant, [name]: event });
    };

    const handleSave = async () => {
        // ... (din eksisterende kode)

        if (isEditConsultant) {
            // ... (din eksisterende kode for at opdatere en konsulent)
            setConsultants({
                ...consultants,
                [route.params.consultant[0]]: newConsultant
            });
        } else {
            // ... (din eksisterende kode for at tilføje en ny konsulent)
            const newConsultantRef = await push(ref(db, "/Consultants/"), newConsultant);
            const newConsultantId = newConsultantRef.key;
            setConsultants({
                ...consultants,
                [newConsultantId]: newConsultant
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Object.keys(initialState).map((key, index) => {
                        return (
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={newConsultant[key]}
                                    onChangeText={(event) => changeTextInput(key, event)}
                                    style={styles.input}
                                    placeholder={`Indtast ${key}`}
                                />
                            </View>
                        );
                    })
                }
                <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
                    <Text style={styles.buttonText}>{isEditConsultant ? "Gem ændringer" : "Tilføj konsulent"}</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default AddEditConsultant;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F5F5'
    },
    row: {
        flexDirection: 'row',
        height: 60,
        marginVertical: 8,
        alignItems: 'center'
    },
    label: {
        fontWeight: 'bold',
        width: 120,
        fontSize: 16
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        flex: 1,
        fontSize: 16
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 16
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
});