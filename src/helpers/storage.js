const STORAGE_NAME = 'clap_family_firebase_app'; 
// nom de la propriété du <local/session>Storage où la data sera stockée.  

/**
 * Gestion de l' API WebStorage (window.localStorage & window.sessionStorage)
 * @constructor
 */

function Storage() {
    this.ref =  window['localStorage'];

    // à l'instanciation de ce constructor, on initialise le  localStorage, en y storant
    // un objet stringifié de type {user: {}}, s'il n'existait pas encore
    if (!this.ref[STORAGE_NAME]) {
        let data = { user : {} };
        this.ref[STORAGE_NAME] = JSON.stringify(data);
    }
    
     /**
     * Méthode get()
     *
     * Récupère dans le storage la data dans sa totalité
     * 
     */
    this.get = () => {    
       return JSON.parse(this.ref[STORAGE_NAME]); 
    };

     /**
     * Méthode getItem()
     * 
     * @param {string} prop Récupère dans le storage la data correspondant à la valeur d'une propriété précise 
     * (en l'occurence on ne peut que récupérer 'user', puisqu'il n'existe pas d'autres propriété dans notre application)
     * 
     */
    this.getItem = prop => {
        const data = this.get();
        return data[prop];
    };

    /**
     * Méthode set()
     * 
     * @param {string} prop Update la valeur d'une propriété de la data storée. (en l'occurence, on n'updatera uniquement 'user')
     * @param {string} value Nouvelle valeur de la propriété à updater qui remplace la précédente valeur 
     * 
     */
    this.set = (prop, value) => {
        const data = this.get();
        data[prop] = value;
        this.ref[STORAGE_NAME] = JSON.stringify(data);
    };  
}

export const storage = new Storage();