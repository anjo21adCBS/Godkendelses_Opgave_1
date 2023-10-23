// Importerer nødvendige moduler og komponenter fra React og React Native
import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { ConsultantContext } from './ConsultantContext'; // Importerer ConsultantContext

// Definerer ConsultantList komponenten
function ConsultantList({ navigation }) {

    // Bruger useContext hook til at få adgang til ConsultantContext
    const { consultants, setConsultants } = useContext(ConsultantContext);

    // Viser en indlæsningsindikator, hvis consultants ikke er tilgængelige
    if (!consultants) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading...</Text>
            </View>
        );
    }

    // Håndterer valg af en konsulent
    const handleSelectConsultant = id => {
        const consultant = Object.entries(consultants).find(consultant => consultant[0] === id);
        navigation.navigate('Consultant Profile', { consultant });
    };

    // Konverterer consultants objektet til et array for nemmere håndtering
    const consultantArray = Object.values(consultants);
    const consultantKeys = Object.keys(consultants);

    // Returnerer en FlatList for at vise konsulentinformation
    return (
        <FlatList
            data={consultantArray}
            keyExtractor={(item, index) => consultantKeys[index]}
            renderItem={({ item, index }) => {
                return (
                    <TouchableOpacity style={styles.container} onPress={() => handleSelectConsultant(consultantKeys[index])}>
                        <Text style={styles.label}>
                            {item.name} ({item.expertise})
                        </Text>
                    </TouchableOpacity>
                );
            }}
        />
    );
}

// Eksporterer ConsultantList komponenten
export default ConsultantList;

// Definerer styles med StyleSheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        margin: 8,
        padding: 16,
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#F5F5F5'
    },
    label: { 
        fontWeight: 'bold',
        fontSize: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
