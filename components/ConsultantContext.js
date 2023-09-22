import React, { createContext, useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from "firebase/database";

export const ConsultantContext = createContext();

export const ConsultantProvider = ({ children }) => {
  const [consultants, setConsultants] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const consultantsRef = ref(db, "Consultants");

    const listener = onValue(consultantsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setConsultants(data);
      }
    });

    return () => {
      off(consultantsRef, listener);
    };
  }, []);

  return (
    <ConsultantContext.Provider value={{ consultants, setConsultants }}>
      {children}
    </ConsultantContext.Provider>
  );
};
