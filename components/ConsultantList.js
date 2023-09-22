import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

function ConsultantList({ navigation }) {

    const [consultants, setConsultants] = useState();

    useEffect(() => {
        const db = getDatabase();
        const consultantsRef = ref(db, "Consultants");

        onValue(consultantsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setConsultants(data);
            }
        });

        return () => {
            off(consultantsRef);
        };
    }, []);

    // Loading state
    if (!consultants) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text>Loading...</Text>
            </View>
        );
    }

    const handleSelectConsultant = id => {
        const consultant = Object.entries(consultants).find(consultant => consultant[0] === id);
        navigation.navigate('Consultant Profile', { consultant });
    };

    const consultantArray = Object.values(consultants);
    const consultantKeys = Object.keys(consultants);

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

export default ConsultantList;

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
