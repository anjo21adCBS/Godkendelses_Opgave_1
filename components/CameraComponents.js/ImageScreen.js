// Importerer nødvendige moduler og hooks fra React og React Native
import React, {useEffect, useState} from "react";
import {Dimensions, Image, StyleSheet, View} from "react-native";

// Definerer ImageScreen komponenten, der tager 'route' som en prop
const ImageScreen = ({route}) => {

    // Opretter en lokal state variabel 'image' og dens setter funktion 'setImage'
    const [image, setImage] = useState('')

    // useEffect hook, der kører når komponenten monteres
    useEffect(() => {
        // Sætter 'image' state til billedets URI fra 'route.params'
        setImage(route.params.image);

        // Cleanup funktion, der kører når komponenten afmonteres
        return () => {
            // Nulstiller 'image' state
            setImage('')
        }
    }, []);  // Tomt afhængighedsarray sikrer, at useEffect kun kører ved montering og afmontering

    // Returnerer JSX til at vise billedet
    return(
        <View>
            <Image
                // Bruger ternær operator til at tjekke, om 'image' er tilgængelig
                source={{ uri: image ?  image : null }}
                // Sætter billedets bredde til skærmens bredde
                width={Dimensions.get('window').width}
                // Sætter billedets højde til skærmens højde
                height={Dimensions.get('window').height}
            />
        </View>
    )
}

// Eksporterer ImageScreen komponenten, så den kan bruges i andre filer
export default ImageScreen;
