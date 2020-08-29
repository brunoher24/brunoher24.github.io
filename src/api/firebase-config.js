import * as firebase from "firebase";

export const initFirebase = () => {
    const config = {
        apiKey: "AIzaSyCM9kovHFt1FQLcDtpx4ngnvL6GWKp7ipE",
        authDomain: "clap-7e65b.firebaseapp.com",
        databaseURL: "https://clap-7e65b.firebaseio.com",
        projectId: "clap-7e65b",
        storageBucket: "clap-7e65b.appspot.com",
        messagingSenderId: "1012757911941",
        appId: "1:1012757911941:web:a6286010deafbca4df8cec",
        measurementId: "G-NRMLJ8MJ1S"
    };
        
    firebase.initializeApp(config);
    firebase.analytics();

    const auth = firebase.auth();
    auth.useDeviceLanguage(); 

    const db = firebase.firestore(); 


    return {
        auth,
        db
    }
};




