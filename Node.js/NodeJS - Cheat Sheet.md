# 🚀 Node.js Cheat Sheet

Node.js est un environnement d'exécution JavaScript côté serveur, asynchrone et événementiel, basé sur le moteur V8 de Chrome.

## ⚙️ I. Commandes de Base (CLI)

| Commande | Rôle | Exemple |
| :--- | :--- | :--- |
| `node [fichier]` | Exécute un fichier JavaScript. | `node app.js` |
| `node -v` | Affiche la version actuelle de Node.js. | |
| `npm init` | Crée un nouveau fichier `package.json` (début du projet). | |
| `npm start` | Exécute la commande définie par le script `start` dans `package.json`. | |
| `npm install` | Installe toutes les dépendances listées dans `package.json`. | |

-----

## 📦 II. Gestion des Paquets (NPM)

| Commande | Rôle | Fichier affecté |
| :--- | :--- | :--- |
| `npm install [module]` | Installe le module en tant que dépendance du projet. | Ajout à `dependencies` dans `package.json`. |
| `npm install [module] --save-dev` | Installe le module en tant que dépendance de développement. | Ajout à `devDependencies` dans `package.json`. |
| `npm install -g [module]` | Installe le module **globalement** (accessible depuis n'importe quel terminal). | Aucune modification du `package.json`. |
| `npm uninstall [module]` | Désinstalle et retire le module de `package.json`. | Suppression de `dependencies`. |
| `npm update` | Met à jour tous les paquets du projet vers la dernière version compatible. | Mise à jour de `package-lock.json`. |

-----

## 🧩 III. Modules & Objets Essentiels

### Modules Natifs (Inclus dans Node.js)

Pour utiliser ces modules, vous devez d'abord les importer : `const fs = require('fs');`

| Module | Rôle | Fonction Clé |
| :--- | :--- | :--- |
| **`fs`** | **File System** : Opérations de lecture/écriture de fichiers. | `fs.readFile()`, `fs.writeFile()` |
| **`http`** | **Réseau** : Création de serveurs web simples. | `http.createServer()` |
| **`path`** | **Chemins** : Manipulation des chemins de fichiers (compatible OS). | `path.join()`, `path.resolve()` |
| **`events`** | **Événements** : Mise en œuvre du patron de conception Émetteur/Écouteur. | `EventEmitter` |
| **`os`** | **Système d'exploitation** : Infos sur le système hôte. | `os.cpus()`, `os.platform()` |

### Objets Globaux

| Objet | Rôle |
| :--- | :--- |
| `process` | Informations sur le processus Node.js en cours (accès à l'environnement, `process.env`). |
| `module.exports` | Définit ce que le module actuel expose lorsqu'il est requis par d'autres fichiers. |
| `__dirname` | Chemin absolu du répertoire contenant le fichier en cours d'exécution. |
| `__filename` | Chemin absolu du fichier en cours d'exécution. |

-----

## ⏳ IV. Gestion de l'Asynchronisme

Node.js repose sur un modèle non bloquant.

### 1\. Callbacks (Traditionnel)

```javascript
// Lecture asynchrone
fs.readFile('fichier.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```

### 2\. Promises (Standard Moderne)

```javascript
// Utilisation de la version Promise de fs
const fsPromises = require('fs/promises');

fsPromises.readFile('fichier.txt')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
```

### 3\. Async/Await (Le plus Lisible)

```javascript
const fsPromises = require('fs/promises');

async function lireFichier() {
    try {
        const data = await fsPromises.readFile('fichier.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.error("Erreur de lecture :", err);
    }
}
lireFichier();
```

-----

## 🖥️ V. Exemple de Serveur HTTP Simple

Ceci est le code de base pour démarrer un serveur sur le port 3000.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // 200 = OK
    res.statusCode = 200; 
    // Type de contenu
    res.setHeader('Content-Type', 'text/plain'); 
    res.end('Bonjour, ceci est mon serveur Node.js !');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}/`);
});
```