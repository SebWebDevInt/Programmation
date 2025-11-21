# Achat IN-APP avec Cordova

Ce tutoriel montre comment mettre en place du paiement In-App dans une application Cordova pour une application android.

------------------------------------------------------------------

# Installation

## Ajouter la permission `BILLING` dans Cordova

La permission Android nécessaire est `com.android.vending.BILLING`. Dans un projet Cordova, vous n'avez pas besoin d'éditer directement le fichier `AndroidManifest.xml` (car Cordova le gère), mais vous devez vous assurer que le plugin d'achat que nous avons mentionné est correctement configuré.

Le plugin **`cordova-plugin-purchase`** est censé ajouter cette permission automatiquement.

### Vérifiez l'installation du Plugin

Assurez-vous que le plugin d'achat intégré est bien installé dans votre projet :

1. Ouvrez votre terminal et naviguez jusqu'au répertoire racine de votre projet Cordova.

2. Exécutez la commande suivante :

```bash
cordova plugin ls
```

3. Vérifiez que `cordova-plugin-purchase` est listé. S'il n'est pas là, réinstallez-le :

```bash
cordova plugin add cordova-plugin-purchase@latest
```

### Vérifiez le manifeste (pour confirmation)

Après l'installation du plugin et la construction de l'application, vous devriez trouver cette ligne dans le fichier `platforms/android/app/src/main/AndroidManifest.xml` :

```xml
<uses-permission android:name="com.android.vending.BILLING" />
```

## Créer et Téléverser un nouvel APK/App Bundle

Même si le plugin est installé, Google Play ne sait pas que la permission est là tant que vous n'avez pas soumis une version compilée qui inclut cette permission dans son manifeste.

1. **Reconstruire l'APK/App Bundle** : Exécutez les commandes Cordova pour reconstruire votre application Android.

```bash
cordova clean android
cordova build android --release
```

**(N'oubliez pas de signer votre APK/App Bundle si c'est une version de sortie).**

2. **Téléverser la nouvelle version :**

      * Allez dans votre **Google Play Console**.
      * Créez une nouvelle version (sur la piste de test interne, de test fermé, ou de production).
      * Téléversez le nouvel APK/App Bundle que vous venez de construire.

3. **Vérification (très important) :**
    Une fois que Google Play a traité votre nouveau fichier :

      * Allez dans les détails de cette nouvelle version.
      * Vérifiez les **Permissions** déclarées. La permission **"Facturation Google Play"** doit maintenant apparaître dans la liste.

### Création du produit dans Google Play

📌 **IMPORTANT** : Une fois que Google Play a détecté la permission dans le manifeste du **nouvel APK téléversé**, vous pourrez retourner à la section **Produits ponctuels** de votre application, et créer votre produit `version-complete`.


------------------------------------------------------------------


# Utiliser le plugin d'achats IN-APP avec Cordova

## A. Initialisation du module

Dans cette exemple une variable `version_complete` permet de savoir si l'utilisateur utilise la version complète ou non.

La fonction `achatinAppInit()` présentée ci-dessous doit bien entedu être lancé une fois que l'application est prête et entièrement chargée. Elle s'appelle donc généralement dans la fonction `onDeviceReady()` si vous écoutez l'évènement comme ceci par exemple : `document.addEventListener('deviceready', onDeviceReady, false);`.

La constante `PRODUCT_ID` sert elle a identifier le produit enregistré dans Google Play.  
❗**ATTENTION** : Le nom doit correspondre au produit dans la console Google Play !

```javascript
var version_complete = false;
const PRODUCT_ID = 'version_complete';

function achatinAppInit() {
    if (typeof CdvPurchase !== 'undefined') {
        try {
            const {store, ProductType, Platform} = CdvPurchase;

            store.register({
                id: PRODUCT_ID,
                type: ProductType.NON_CONSUMABLE,
                platform: Platform.GOOGLE_PLAY
            });

            store.when()
                .productUpdated(achatsInAppVerifier)
                .approved(achatsInAppValider);

            store.initialize([Platform.GOOGLE_PLAY]);
            achatsInAppVerifier();
        }
        catch (err) {
            version_complete = false;
            alert('STORE INDISPONIBLE' + err);
        }
    }

    $('#app').on('click', '#achat-version-complete', function() {
        achatsInAppCommander();
    });
}
```

### B. Fonction de vérification de la possession

Pour vérifier si l'utilisateur a payé son produit on peut écrire cette fonction simple :

```javascript
function achatsInAppVerifier() {
    version_complete = false;
    const {store, ProductType, Platform} = CdvPurchase;
    const product = store.get(PRODUCT_ID, Platform.GOOGLE_PLAY);
    if (product && product.owned) {
        version_complete = true;
        achatsInAppRafraichir();
    }
}
```

Une fonction permettant de rafraichir l'interface de l'application peut-être écrite. Dans l'exemple jQuery ci-dessous, des éléments de l'interface ont une classe `.version-complete` et on va simplement ajouter une classe `.paye` si l'utilisateur a bien la version complète. Il faudra alors faire le designe CSS en conséquence et traiter l'information pour ces éléments là dans l'application.

```javascript
function achatsInAppRafraichir() {
    $('.version-complete').each(function() {
        if (version_complete === true) {
            $(this).addClass('paye');
        }
        else {
            $(this).removeClass('paye');
        }
    });
}
```

### C. Fonctions d'achat

Dans la partie A, nous avons appelé deux fonctions qu'il va falloir écrire également.  
La première est appelé lorsqu'un utilisateur clique sur le bouton permettant d'acheter le produit. Le bouton ayant la classe `.achat-version-complete` qui écoute l'évènement `click` et exécute la fonction `achatsInAppCommander()`.

```javascript
function achatsInAppCommander() {
    if (version_complete) {
        alert('Vous possédez déjà la version complète.');
    }
    else {
        const {store, ProductType, Platform} = CdvPurchase;
        const product = store.get(PRODUCT_ID, Platform.GOOGLE_PLAY);

        if (product) {
            product.getOffer().order();
        }
    }
}
```

La deuxième est appelé par la bibliothèque lorsqu'un utilisateur termine son achat (évènement `store.when().approved`). On va simplement terminer la transaction et vérifier si l'achat est bien réalisé à l'aide des fonctions décrites précédemment.

```javascript
function achatsInAppValider(transaction) {
    transaction.finish();
    achatsInAppVerifier();
}
```


------------------------------------------------------------------


# 👍 FÉLICITATIONS !!! Le paiement In-APP est en place.
