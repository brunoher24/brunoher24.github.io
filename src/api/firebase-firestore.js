import * as firebase from "firebase";

const db = firebase.firestore(); // objet retourné par la méthode firestore(). cet objet contient toute la logique applicative et les méthodes liées au service de gestion des collections en base de données 

/**
 * Méthode writeData()
 *
 * Ajout de contenu dans le cloud Firestore
 * 
 * @param {string} collectionRef la référence du chemin correspondant à la collection dans laquelle on souhaite ajouter un nouvel élément
 * @param {string} docRef id du noeud de l'élément qu'on souhaite ajouter dans la collection
 * @param {object} data informations de l'objet à écrire à cet emplacement
 * 
 * @resolve {string} en cas de succès, on pourra récupérer la chaîne de caractères 'success' dans le .then(). 
 * @reject {string} en cas d'échec , on pourra récupérer la chaîne de caractères 'error' dans le .catch(). 
 */
export const writeData = (collectionRef, docRef, data) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionRef).doc(docRef).set(data)
        .then(() => {
            console.log("Document was created !");
            resolve("success");
        })
        .catch(error => {
            console.error("Error creating document: ", error);
            reject('error');
        });
    });
};

/**
 * Méthode readData()
 *
 * Récupération de data contenu dans un noeud (et non une collection)
 * 
 * @param {string} ref la référence du chemin correspondant à la collection contenant l'élément qu'on souhaite récupérer
 * @param {string} docRef id du noeud de l'élément qu'on souhaite récupérer la data
 * 
 * @resolve {object} en cas de succès, on pourra récupérer le contenu du noeud dans le .then(). 
 * @reject {object} en cas d'échec , on pourra récupérer l'objet 'error' retourné par firebase dans le .catch(). 
 */
export const readData = (ref, docRef) => {
    return new Promise((resolve, reject) => {
        let dbRef = db.collection(ref).doc(docRef);
        dbRef.get().then(querySnapshot => {
            resolve(querySnapshot.data());
        }).catch(err => {
            reject(err);
        });
    });
};

let unsubscribereadDataOn;
/**
 * Méthode readDataOn()
 *
 * Même système que la fnction reaData sauf qu'en plus on ajoute un listener qui se déclenchera
 * à chaque fois que le contenu du noeud est modifié en base de donnée 
 * 
 * @param {string} ref la référence de la collection contenant l'élément qu'on souhaite récupérer
 * @param {string} docRef id du noeud de l'élément qu'on souhaite récupérer la data
 * @callback callback function à déclencher une fois qu'on a récupéré la data qui lui sera passé en paramêtre
 * 
 */
export const readDataOn = (ref, docRef, callback) => {
    if (unsubscribereadDataOn) {
        unsubscribereadDataOn();
    }
    
    let dbRef = db.collection(ref).doc(docRef);
    unsubscribereadDataOn = dbRef.onSnapshot(querySnapshot => {
        callback(querySnapshot.data());
    });
};

let unsubscribeReadCollection;

/**
 * Méthode readCollection()
 *
 * Même système que la fonction readCollectionOnce sauf qu'en plus on ajoute un listener qui se déclenchera
 * à chaque fois que le contenu du noeud est modifié en base de donnée 
 * 
 * @callback listeningCallback function à déclencher une fois qu'on a récupéré la data qui lui sera passé en paramêtre
 * @param {string} docRef id du noeud de l'élément qu'on souhaite récupérer la data
 * @param {string} ref la référence de la collection qu'on souhaite récupérer
 * @param {bool}   orderBy existe si l'on souhaite ordonner la collection
 * @param {string} orberByField propriété en fonction de laquelle on souhaite ordonner la collection
 * @param {string} orderDir ordre décroissant ou ordre croissant valeurs possibles : 'asc' / 'desc'
 * @param {number} limitNbr limite du nombre d'éléments que l'on souhaite récupérer
 * @param {any}    elementToStartAfter élément de la collection à partir duquel (exclu) démarrer la récupération
 * 
 */
export const readCollection = (listeningCallback, ref, orderBy, orberByField, orderDir, limitNbr, startAfter) => {
  
    if (unsubscribeReadCollection) {
        unsubscribeReadCollection();
    }

    let dbRef = db.collection(ref);
    
    if(orderBy) {
        dbRef = dbRef.orderBy(orberByField, orderDir);
    }

    if(startAfter) {
        dbRef = dbRef.startAfter(startAfter);
    }

    if(limitNbr) {
        dbRef = dbRef.limit(limitNbr);
    }

    console.log(dbRef);
    unsubscribeReadCollection = dbRef.onSnapshot(snapshot => {
        console.log('Changement dans la collection !');
        snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                console.log("New doc: ", change.doc.data());
                listeningCallback(change.doc.data());
            }
        });
    });
};

export const readCollectionOnce = (ref, orderBy, orberByField, orderDir, limitNbr, startAfter) => {
    return new Promise((resolve, reject) => {
        let dbRef = db.collection(ref);
        
        if(orderBy) {
            dbRef = dbRef.orderBy(orberByField, orderDir);
        }

        if(startAfter) {
            dbRef = dbRef.startAfter(startAfter);
        }

        if(limitNbr) {
            dbRef = dbRef.limit(limitNbr);
        }

        dbRef.get().then(collection => {
            resolve(collection);
        }).catch(err => {
            reject(err);
        }); 
    });
};

/**
 * Méthode updateData()
 *
 * Modification de contenu dans le cloud Firestore
 * 
 * @param {string} collectionRef la référence du chemin correspondant à la collection dans laquelle on souhaite modifier l'un des éléments
 * @param {string} docRef id du noeud de l'élément qu'on souhaite modifier dans la collection
 * @param {object} data informations de l'objet à modifier à cet emplacement
 * 
 * @resolve {string} en cas de succès, on pourra récupérer la chaîne de caractères 'success' dans le .then(). 
 * @reject {string} en cas d'échec , on pourra récupérer la chaîne de caractères 'error' dans le .catch(). 
 */

export const updateData = (collectionRef, docRef, data) => {
    return new Promise((resolve, reject) => {
        db.collection(collectionRef).doc(docRef).update(data)
        .then(() => {
            console.log("Document was updated !");
            resolve("success");
        })
        .catch(error => {
            console.error("Error updating document: ", error);
            reject('error');
        });
    });
};
