// Importerer nødvendige moduler og funktioner fra React og Firebase
import React, { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";

// Opretter en React Context for at dele data om konsulenter
export const ConsultantContext = createContext();

// Opretter en Provider-komponent for at levere data til andre komponenter
export const ConsultantProvider = ({ children }) => {
  // Bruger Reacts useState hook til at oprette en tilstand for konsulenter
  const [consultants, setConsultants] = useState({});

  // Bruger Reacts useEffect hook til at udføre kode, når komponenten monteres
  useEffect(() => {
    // Henter en reference til databasen
    const db = getDatabase();
    // Opretter en reference til "Consultants" i databasen
    const consultantsRef = ref(db, "Consultants");

    // Tilmelder en lytter til at modtage opdateringer fra databasen
    const listener = onValue(consultantsRef, (snapshot) => {
      // Henter data fra snapshot
      const data = snapshot.val();
      // Opdaterer tilstanden, hvis der er data
      if (data) {
        setConsultants(data);
      }
    });

    // Fjerner lytteren, når komponenten afmonteres
    return () => {
      off(consultantsRef, listener);
    };
  }, []);

  // Returnerer Provider-komponenten med den aktuelle tilstand og en funktion til at ændre den
  return (
    <ConsultantContext.Provider value={{ consultants, setConsultants }}>
      {children}
    </ConsultantContext.Provider>
  );
};
