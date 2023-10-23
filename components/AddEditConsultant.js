// Importerer nødvendige moduler og hooks fra React og React Native
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

// Importerer Firebase database funktioner
import { getDatabase, ref, child, push, update } from "firebase/database";

// Importerer ConsultantContext for at dele data mellem komponenter
import { ConsultantContext } from './ConsultantContext';

// Definerer AddEditConsultant komponenten
function AddEditConsultant({ navigation, route }) {
    // Bruger useContext hook til at få adgang til consultants og setConsultants
    const { consultants, setConsultants } = useContext(ConsultantContext);

    // Initialiserer Firebase database
    const db = getDatabase();

    // Definerer initial state for en ny konsulent
    const initialState = {
        name: '',
        expertise: '',
        experience: '',
        contactInfo: ''
    };

    // Bruger useState hook til at styre state for en ny eller eksisterende konsulent
    const [newConsultant, setNewConsultant] = useState(initialState);

    // Tjekker om vi er i "Edit Consultant" tilstand
    const isEditConsultant = route.name === "Edit Consultant";

    // Bruger useEffect hook til at sætte state, når komponenten monteres eller opdateres
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

    // Funktion til at ændre tekstinput
    const changeTextInput = (name, event) => {
        setNewConsultant({ ...newConsultant, [name]: event });
    };

    // Funktion til at gemme konsulentdata
    const handleSave = async () => {
       
        if (isEditConsultant) {
            
            setConsultants({
                ...consultants,
                [route.params.consultant[0]]: newConsultant
            });
        } else {
          
            const newConsultantRef = await push(ref(db, "/Consultants/"), newConsultant);
            const newConsultantId = newConsultantRef.key;
            setConsultants({
                ...consultants,
                [newConsultantId]: newConsultant
            });
        }
    };

    // Returnerer JSX til at render komponenten
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

// Eksporterer AddEditConsultant komponenten
export default AddEditConsultant;

// Definerer styles til komponenten
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
