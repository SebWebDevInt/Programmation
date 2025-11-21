# 📱 CORDOVA CHEAT SHEET

Une fiche complète et concise pour **Apache Cordova**, couvrant l'installation de l'environnement et le flux de travail essentiel, ainsi qu'une liste des plugins les plus utiles.

-----

## 🛠️ I. Préparation de l'Environnement (Backend)

| Prérequis | Rôle | Installation (Vérification) |
| :--- | :--- | :--- |
| **Node.js & NPM** | Outil de base pour installer Cordova CLI. | `node -v` et `npm -v` |
| **Cordova CLI** | L'interface en ligne de commande principale. | `npm install -g cordova` |
| **Java JDK (ou OpenJDK)** | Nécessaire pour compiler le code Android. | Définir la variable `JAVA_HOME`. |
| **Android Studio** | Fournit le SDK Android et les outils de construction (`adb`, émulateurs). | Définir les variables `ANDROID_HOME` et `PATH`. |
| **Gradle** | Moteur de construction du projet Android (souvent géré par Android Studio). | Vérifier la version installée. |

> **Vérification de l'environnement :** Après avoir tout installé et configuré les variables d'environnement (PATH, JAVA\_HOME, etc.), exécutez `cordova requirements` pour vérifier que tout est prêt.

-----

## 🏗️ II. Flux de Travail Essentiel

| Étape | Commande (dans le terminal) | Résultat / Description |
| :--- | :--- | :--- |
| **Création du Projet** | `cordova create [dossier] [package_id] [nom_app]` | Crée la structure de base (`www/` est le dossier web). |
| **Ajout de Plateforme** | `cordova platform add [android ou ios]` | Ajoute la structure native requise (dossiers `platforms/`). |
| **Construction (Build)** | `cordova build [platform]` | Compile le code web et les ressources natives pour créer le package (`.apk` ou `.ipa`). |
| **Exécution** | `cordova run [platform]` | Déploie et exécute l'application : sur un appareil connecté ou un émulateur. |
| **Serveur de Test (Web)** | `cordova serve` | Lance un serveur web pour tester rapidement l'interface utilisateur dans le navigateur (sans les plugins natifs). |
| **Nettoyage** | `cordova clean [platform]` | Supprime les fichiers de compilation (`build/`) et les temporaires. |

-----

## 🔌 III. Plugins Essentiels (Les Fonctionnalités NATIVES)

Les plugins (via NPM) sont ce qui permet à votre code JavaScript d'accéder aux fonctionnalités du téléphone (appareil photo, GPS, etc.). Tous les plugins officiels sont préfixés par `cordova-plugin-`.

### Commande d'Installation :

```bash
cordova plugin add [nom-du-plugin]
```

| Nom du Plugin | Fonctionnalité | Utilisation Typique |
| :--- | :--- | :--- |
| **`cordova-plugin-device`** | **Informations sur l'appareil.** | Connaître la version du système, le modèle. |
| **`cordova-plugin-camera`** | **Appareil photo.** | Prendre des photos ou sélectionner dans la galerie. |
| **`cordova-plugin-geolocation`** | **Géolocalisation (GPS).** | Obtenir la position actuelle de l'utilisateur. |
| **`cordova-plugin-vibration`** | **Vibration.** | Faire vibrer le téléphone pour des notifications. |
| **`cordova-plugin-network-information`** | **Statut de la connexion.** | Vérifier si l'appareil est connecté (Wi-Fi, 4G, aucune). |
| **`cordova-plugin-file`** | **Système de fichiers.** | Lire, écrire et gérer les fichiers locaux. |
| **`cordova-plugin-inappbrowser`** | **Navigateur intégré.** | Ouvrir des liens web à l'intérieur de l'application (sans quitter). |
| **`cordova-plugin-dialogs`** | **Boîtes de dialogue natives.** | Utiliser des alertes, confirmations, ou invites natives. |

-----

## 💡 IV. Points Clés à Retenir

  * **Démarrage :** Tout le code de votre application doit être placé dans le dossier **`www/`**.
  * **Initialisation :** Votre code JavaScript ne doit pas interagir avec les plugins ou le système Cordova avant que l'événement **`deviceready`** ne soit déclenché.
    ```javascript
    document.addEventListener('deviceready', function() {
        // C'est ici que vous pouvez utiliser les plugins, ex: navigator.geolocation.getCurrentPosition(...)
    }, false);
    ```
  * **Compilation :** Pour tester les plugins ou la performance, vous devez toujours passer par les commandes `cordova build` et `cordova run`.
  * **Dépendances :** Les dépendances des plugins et plateformes sont listées dans le fichier **`config.xml`**.
