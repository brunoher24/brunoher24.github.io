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

    // objet retourné par la méthode firestore(). cet objet contient toute la logique applicative et les méthodes liées au service de gestion des collections en base de données
    const db = firebase.firestore(); 

    const error_msgs = {
        'auth/invalid-email'        : 'Adresse mail non valide.',
        'auth/weak-password'        : 'Mot de passe trop faible (au moins 6 caractères)',
        'auth/email-already-in-use' : 'Cette adresse mail est déjà prise !',
        'auth/user-not-found'       : 'Utilisateur non-trouvé !',
        'auth/wrong-password'       : 'Mot de passe non valide !',
        'auth/unauthorized-domain'  : `Votre domaine (${window.location.hostname}) n'est pas autorisé à effectuer cette opération. Vous pouvez l'ajouter à la liste 'OAuth redirect domains' dans votre console Firebase -> section 'Authentification' -> Onglet 'Méthode d'inscription'`,
        'auth/too-many-requests'    : 'Trop de requêtes échouées ... Veuillez réessayer dans quelques instants',
        'auth/operation-not-supported-in-this-environment' : 'Opération non supportée par votre environnement de dévelopement. "location.protocol" doit être en "http", "https" ou "chrome-extension" et l\'API "web storage" doit être activée'
      };

    return {
        auth,
        db,
        firebase,
        error_msgs
    }
};





