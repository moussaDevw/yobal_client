import React, {createContext, useState, Alert} from 'react';
// import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-community/google-signin';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';
import Spinner from 'react-native-loading-spinner-overlay';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [spinner, setSpinner] = useState(false)
  const [userAdress, setUserAdress] = useState(null)
  const [chosenAdress, setChosenAdress] = useState(null)
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        spinner,
        setSpinner,
        userAdress,
        setUserAdress,
        chosenAdress,
        setChosenAdress,
        // login: async (email, password) => {
        //   try {
        //     await auth().signInWithEmailAndPassword(email, password);
        //   } catch (e) {
        //     console.log(e);
        //   }
        // },

        // register: async (email, password) => {
        //   try {
        //     await auth().createUserWithEmailAndPassword(email, password);            
        //   } catch (e) {
        //     console.log(e);
        //   }
        // },
        // logout: async () => {
        //   try {
        //     await auth().signOut();
        //   } catch (e) {
        //     console.log(e);
        //   }
        // },
        // forgotPass : async(email) => {
        //   await auth().sendPasswordResetEmail(email);
        //   try {
        //     await auth().sendPasswordResetEmail(email);
        //   } catch (e) {
        //     console.log(e);
        //   }


        // }
      }}>
      {children}
      <Spinner
          visible={spinner}
          // textContent={'Patientez...'}          
      />
    </AuthContext.Provider>
  );
};
