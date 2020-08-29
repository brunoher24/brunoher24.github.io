import { auth } from '../App';
import { storage } from '../helpers/storage';


/**
 * Méthode signinWithEmailAndPassword()
 *
 * Connexion au service d'authentification Firebase 
 * à l'aide d'une adresse mail et d'un mot de passe . Utilisation de la méthode 'signInWithEmailAndPassword' appartenant à l'objet firebase.auth()
 * 
 * @param {string} email adresse mail (doit correspondre à une adresse mail existante associée au bon mot de passe)
 * @param {string} password mot de passe (doit correspondre au bon mot de passe associé à l'adresse mail)
 * 
 *
 */
export const signinWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {  
        auth.signInWithEmailAndPassword(email, password)
        .then(success => {
            if (success) {
                const uid = success.user.uid;
                console.log('SIGNIN_WITH_EMAIL_AND_PASSWORD SUCCESS ==>', success);
                storage.set('user', {email, uid, password});
                resolve(uid);
            } else {
                reject('error');
            }
        })
        .catch(error => {
            console.log('SIGNIN_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
            /*
            let popup = new Popup(firebase_.errors[errorCode]);
            popup = null;
            */
            reject(error);
        });   
    });
};

export const signout = () => {
  storage.set('user', {});
};

/**
 * Méthode signupWithEmailAndPassword()
 *
 * Création d'un compte utilisateur au sein du service d'authentification Firebase 
 * à l'aide d'une adresse mail et d'un mot de passe . Utilisation de la méthode 'createUserWithEmailAndPassword' appartenant à l'objet firebase.auth()
 * 
 * @param {string} email adresse mail (ne doit pas déjà exister dans le service d'authentification, doit respecter le format _@_.__, sinon une erreur est retournée)
 * @param {string} password mot de passe (au moins 6 caractères).
 * 
 * @resolve {string} en cas de succes, l'id de l'utilisateur est retorunée dans le bloc de complétion .then(). 
 * @reject {void} en cas d'echec de la connexion, aucune valeur n'est retournée dans le bloc d'erreur .catch(). 

 */

export const signupWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        auth.createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD FAILURE ==>', error);
            /*
            let popup = new Popup(firebase_.errors[errorCode]);
            popup = null;
            */
            reject();
        }).then(function(success) {
            if (success) {
                console.log('SIGNUP_WITH_EMAIL_AND_PASSWORD SUCCESS ==>', success);
                const userId = success.user.uid;
                resolve(userId);
            }
        });
    });
};








