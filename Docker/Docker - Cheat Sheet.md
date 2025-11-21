# 🐳 DOCKER CHEAT SHEET

## 🧱 Gestion des Images (Images)

Les images sont les **modèles** immuables et légers qui contiennent tout le nécessaire pour lancer une application (code, librairies, runtime).

| Commande | Rôle | Exemple d'utilisation |
| :--- | :--- | :--- |
| `docker pull [image:tag]` | Télécharge une image depuis un registre (comme Docker Hub). | `docker pull nginx:latest` |
| `docker build -t [nom]:[tag] .` | Construit une nouvelle image à partir d'un fichier `Dockerfile`. | `docker build -t mon-app:v1 .` |
| `docker images` | Liste toutes les images stockées localement. Equivalent à `docker image ls` | |
| `docker rmi [image_id]` | Supprime une image locale (si aucun conteneur ne l'utilise). Equivalent à `docker image rm [image_id]` | `docker rmi 1a2b3c4d` |
| `docker image prune` | Supprime toutes les images non utilisées (dangling images). | |

---

## 📦 Gestion des Conteneurs (Containers)

Les conteneurs sont des **instances exécutables** des images. Ils sont l'application en cours d'exécution.

| Commande | Rôle | Exemple d'utilisation |
| :--- | :--- | :--- |
| `docker run [image]` | Crée et démarre un nouveau conteneur à partir d'une image. | `docker run nginx` |
| `docker run -d -p 8080:80 --name [nom] [image]` | **CRÉER & DÉMARRER (Le plus fréquent)** | |
| | `-d` : Exécute le conteneur en arrière-plan (detached mode). | |
| | `-p [hôte]:[conteneur]` : Mappe un port de la machine hôte au conteneur. | `docker run -d -p 80:80 nginx` |
| | `--name [nom]` : Donne un nom facile à utiliser au conteneur. | `docker run --name webapp ...` |
| `docker ps` | Liste tous les conteneurs **en cours d'exécution**. | |
| `docker ps -a` | Liste **tous** les conteneurs (actifs et arrêtés). | |
| `docker stop [id_ou_nom]` | Arrête un conteneur en cours d'exécution (le processus s'arrête proprement). | `docker stop webapp` |
| `docker start [id_ou_nom]` | Redémarre un conteneur arrêté. | `docker start webapp` |
| `docker restart [id_ou_nom]` | Arrête puis redémarre le conteneur. | |
| `docker rm [id_ou_nom]` | Supprime définitivement un conteneur arrêté. | `docker rm webapp` |
| `docker container prune` | Supprime tous les conteneurs arrêtés. | |

---

## 🛠️ Inspection et Débogage

| Commande | Rôle | Exemple d'utilisation |
| :--- | :--- | :--- |
| `docker logs [id_ou_nom]` | Affiche les logs du conteneur (sortie standard). | `docker logs -f webapp` (`-f` suit les logs en temps réel) |
| `docker exec -it [id_ou_nom] bash` | Ouvre un shell interactif à l'intérieur du conteneur. | `docker exec -it webapp sh` |
| `docker inspect [id_ou_nom]` | Affiche des informations détaillées de bas niveau (IP, volumes, config, etc.). | |

---

## 📝 Le Dockerfile (Le strict minimum)

Le `Dockerfile` est le fichier recette pour construire votre image.

| Instruction | Rôle | Exemple |
| :--- | :--- | :--- |
| `FROM` | **Image de base.** Définit l'image sur laquelle vous construisez. | `FROM node:18-alpine` |
| `WORKDIR` | **Répertoire de travail.** Définit le dossier par défaut pour les commandes suivantes. | `WORKDIR /app` |
| `COPY` | **Copie les fichiers locaux** vers l'image. | `COPY . .` |
| `RUN` | **Exécute une commande** *pendant la construction* de l'image. | `RUN npm install` |
| `EXPOSE` | **Documente le port** sur lequel l'application tourne dans le conteneur. | `EXPOSE 3000` |
| `CMD` | **Commande par défaut** exécutée au démarrage du conteneur. | `CMD ["npm", "start"]` |

---

## 🌐 Docker Compose (Simplification Multi-Conteneurs)

Docker Compose permet de gérer des applications composées de plusieurs services (conteneurs) via un seul fichier de configuration (`docker-compose.yml`).

| Commande (dans le dossier du `yml`) | Rôle |
| :--- | :--- |
| `docker compose up` | Crée et démarre tous les services définis dans le fichier `yml`. |
| `docker compose up -d` | Crée et démarre en arrière-plan. |
| `docker compose down` | Arrête et supprime les conteneurs, réseaux et volumes créés par `up`. |
| `docker compose logs` | Affiche les logs agrégés de tous les services. |


-------------------------------------------------


# Le fichier `docker-compose.yml`

Vous trouverez ici un aperçu succinct des propriétés et une simple **fiche de référence (cheat sheet)** que vous pouvez utiliser !

-----

## Structure du fichier

Ceci présente la structure de base de chaque fichier `docker-compose`. Avec les paramètres de base, il peut s'agir d'un fichier `docker-compose.yml` ou d'un `docker-compose.override.yml`.

```yaml
services:
    container1:
        properties: values

    container2:
        properties: values

networks:
    network:

volumes:
    volume:
```

## Types YML

Chaque propriété Compose a un ou plusieurs types possibles. Les différentes possibilités sont une simple paire **clé:valeur**, un **tableau (array)** ou un **dictionnaire (dictionary)**.

### Valeur

```yaml
key: value
```

### Tableau (Array)

```yaml
key:
    - value
    - value
```

### Dictionnaire (Dictionary)

```yaml
master:
    key: value
    key: value
```

## Propriétés

Il existe quelques propriétés que vous pouvez utiliser dans un conteneur. Les plus importantes sont listées ici avec une courte description, le type et un exemple d'utilisation.

### build (valeur)

Construit une image avec le nom spécifié en utilisant le `Dockerfile` dans le répertoire spécifié.

```yaml
container:
    build: ./path
    image: image-name
```

### image (valeur)

Utilise une image qui est présente sur le système ou qui peut être téléchargée depuis le Docker Hub.

```yaml
image: image-name
```

### container\_name (valeur)

Spécifie le nom du conteneur, qui permettra d'y accéder.

```yaml
container_name: name
```

### volumes (tableau)

Crée des volumes de conteneur pour persister les données et pour rendre certains répertoires accessibles sur le système hôte.

```yaml
volumes:
    - /path/to/host-dir:/path/to/container-dir
```

### command (valeur)

Remplace la commande de démarrage du conteneur.

```yaml
command: command-to-execute
```

### environment (dictionnaire/tableau)

Définit des variables d'environnement à utiliser à l'intérieur du conteneur.

```yaml
environment:
    KEY: VALUE
---
environment:
    - KEY=VALUE
```

### env\_file (dictionnaire/tableau)

Définit des variables d'environnement dans un fichier `.env` à utiliser à l'intérieur du conteneur. Les variables d'environnement spécifiées dans ce fichier remplaceront les variables spécifiées dans la propriété `environment`.

```yaml
env_file: .env
---
env_file:
    - .env
```

### restart (valeur)

Spécifie une règle de redémarrage pour le conteneur. (`no`, `always`, `on-failure`, `unless-stopped`)

```yaml
restart: unless-stopped
```

### networks (tableau)

Définit les réseaux auxquels un conteneur doit être attaché.

```yaml
networks:
    - network-name
```

### ports (tableau)

Définit les ports à exposer aux autres conteneurs et au système hôte.

```yaml
ports:
    - "9999:9999"
```

### expose (tableau)

Définit les ports à exposer **uniquement** aux autres conteneurs.

```yaml
expose:
    - "9999"
```

### network\_mode (valeur)

Définit le pilote réseau pour le conteneur. (`bridge`, `host`, `none`, `service:[nom du service]`, `container:[nom/id du conteneur]`)

```yaml
network_mode: host
```

### depends\_on (tableau)

Spécifie l'ordre de construction, de démarrage et d'arrêt du conteneur.

```yaml
depends_on:
    - container-name
```

-----

## Autres

### Conteneur Inactif (idle container)

Définit la commande pour que le conteneur ne fasse rien \! Le conteneur ne s'arrêtera pas et il est possible d'y entrer sans problème. Principalement utile uniquement pour le débogage.

```yaml
command: tail -f /dev/null
```

### Volumes nommés (named volumes)

Crée des volumes nommés qui peuvent être utilisés dans la propriété `volumes`. [Plus d'informations](https://docs.docker.com/compose/compose-file/compose-file-v3/#volume-configuration-reference).

```yaml
services:
    container:
        image: image-name
        volumes:
            - data-volume:/path/to/dir

volumes:
    data-volume:
```

### Réseaux (networks)

Crée de nouveaux réseaux qui peuvent être utilisés dans la propriété `networks`. Cela spécifiera le nom et le pilote réseau. [Plus d'informations](https://docs.docker.com/compose/networking/).

```yaml
networks:
    frontend:
        driver: bridge
```