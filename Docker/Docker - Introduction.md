# 🐳 Mise en place d'un environnement de développement Doker

**Docker** est l'environnement le plus puissant et flexible pour le développement d'application web moderne.

L'installation et la configuration sous **Windows 11** reposent sur le **Sous-système Windows pour Linux (WSL 2)** pour garantir les meilleures performances.  
Ce guide présente comment installer Docker et faire une configuration simple d'un serveur de développement classique.

-----

## ⚙️ Installation de Docker Desktop sur Windows

### Installer WSL 2 (si ce n'est pas déjà fait)

1.  **Ouvrez le Terminal Windows** (ou PowerShell) **en mode Administrateur**.
2.  Exécutez cette commande pour installer WSL et la distribution Linux par défaut (Ubuntu) :
    ```bash
    wsl --install
    ```
3.  **Redémarrez votre PC** lorsque le processus est terminé.
4.  Après le redémarrage, une fenêtre de console Ubuntu s'ouvrira. Suivez les instructions pour créer un nom d'utilisateur et un mot de passe Linux (ceux-ci n'affectent pas votre compte Windows).

### Installer Docker Desktop

1.  **Téléchargez** l'installateur de [Docker Desktop pour Windows](https://www.docker.com/products/docker-desktop).
2.  **Exécutez l'installateur** et suivez les instructions.
3.  Assurez-vous que l'option **"Use WSL 2 instead of Hyper-V (recommended)"** est cochée pendant l'installation.
4.  Une fois l'installation terminée, **lancez Docker Desktop**. L'application peut prendre quelques minutes pour démarrer la première fois. Vérifiez que le voyant dans le coin inférieur gauche (ou dans la barre des tâches) est **vert** pour confirmer qu'il est en cours d'exécution.

## 🧱 Création d'un environnement de développement PHP & MySQL

Maintenant que Docker est installé, nous allons créer l'environnement PHP et MySQL avec un seul fichier de configuration appelé `docker-compose.yml`.

### Structurer votre Projet

Créez un dossier pour votre projet, par exemple `AppPHP`.

À l'intérieur de ce dossier, créez deux éléments :

1.  Un dossier nommé **`public`** (ce sera le dossier où vous mettrez tous vos fichiers PHP, y compris votre `index.php`).
2.  Un fichier nommé **`docker-compose.yml`** (assurez-vous que l'extension est bien `.yml` et non `.txt`).

Votre structure de base devrait ressembler à ceci :

```
AppPHP/
├── app/
│   └── index.php (Votre code PHP ira ici)
└── docker-compose.yml
```

### Remplir le Fichier `docker-compose.yml`

Copiez le contenu suivant dans votre fichier `docker-compose.yml`. Il définit les deux conteneurs (services) : `db` et `web`.

```yaml
services:
  # 1. SERVICE DE BASE DE DONNÉES (MySQL 8.0)
  db:
    image: mysql:8.0
    container_name: mysql80
    restart: always # Redémarre automatiquement
    environment:
      # !! MODIFIEZ CES VALEURS POUR LA PRODUCTION, mais conservez-les ici pour le local !!
      MYSQL_ROOT_PASSWORD: root_pass
      MYSQL_DATABASE: ma_bdd
      MYSQL_USER: admin
      MYSQL_PASSWORD: admin_pass
    volumes:
      # Persiste les données de la DB pour qu'elles ne soient pas perdues
      - db-data:/var/lib/mysql 
    ports:
      # Le port 3306 est exposé au PC hôte (pour les outils externes comme DBeaver)
      - "3306:3306" 

  # 2. SERVICE WEB (PHP 8.2 + Apache)
  web:
    image: php:8.2-apache 
    container_name: php82
    restart: always
    volumes:
      # LIE votre dossier local 'public' au dossier web du conteneur (/var/www/html)
      - ./public:/var/www/html 
    ports:
      # Expose le port 80 du conteneur au port 8080 de votre PC (http://localhost:8080)
      - "8080:80" 
    depends_on:
      - db # S'assure que la DB est démarrée avant le serveur web

volumes:
  # Définition du volume persistant pour les données de la DB
  db-data:
```

### Démarrer l'Environnement

1.  **Ouvrez votre terminal Windows** (cmd ou PowerShell) et naviguez jusqu'à votre dossier de projet :
2.  Lancez les conteneurs :
    ```bash
    docker-compose up -d
    ```

**Félicitations \!** Docker va télécharger les images, créer les réseaux et démarrer vos services.

### Connexion à la Base de Données

Dans votre code PHP (votre classe `MyBDD` ou `PDO`), vous utiliserez les informations de connexion suivantes :

| Paramètre | Valeur Docker |
| :--- | :--- |
| **Hôte (Host)** | **`db`** (C'est le nom du service défini dans `docker-compose.yml`) |
| **Nom d'utilisateur** | `admin` |
| **Mot de passe** | `admin_pass` |
| **Nom de la DB** | `ma_bdd` |

Votre chaîne de connexion PDO sera :
`new PDO("mysql:host=db;dbname=ma_bdd;charset=utf8", "admin", "admin_pass");`

Votre application sera accessible via votre navigateur à l'adresse **`http://localhost`**.

## 🌏 Création d'un serveur web NGINX

Voici un autre cas d'usage pour un serveur web simple à l'aide de NGINX.

### Fichier `docker-compose.yml`

Copiez le contenu suivant dans votre fichier `docker-compose.yml`.

```yaml
services:
  webserver:
    image: nginx:latest
    container_name: nginx
    restart: always
    volumes:
      # Le dossier racine de mon projet est www (c'est là que se trouve le fichier index.html)
      - ./www:/usr/share/nginx/html
    ports:
      - "8080:80"
```

### Démarrer l'Environnement

1.  **Ouvrez votre terminal Windows** (cmd ou PowerShell) et naviguez jusqu'à votre dossier de projet :
2.  Lancez les conteneurs :
    ```bash
    docker-compose up -d
    ```

Le serveur est maintenant accessible sur l'URL suivante : **`http://localhost:8080`**.