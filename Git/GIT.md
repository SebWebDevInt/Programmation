Absolument \! Voici la conversion de votre document HTML sur Git en syntaxe Markdown, conservant la structure, les titres, les blocs de code et les notes d'alerte.

-----

# Git

Git est le système de gestion de version décentralisé open source qui facilite les activités GitHub sur votre ordinateur. Cet aide-mémoire permet un accès rapide aux instructions des commandes Git les plus utilisées.

-----

## 🛠️ Installer et Configurer Git

### Installation

Suivre les instructions sur le site de Git suivant le système d'exploitation : `https://git-scm.com`

S'assurer que le binaire est accessible depuis la variable PATH.

### Configuration

  * `git config --global user.name "votre_pseudo"` : Définit le nom associé aux opérations de commit.
  * `git config --global user.email moi@email.com` : Définit l'email associé aux opérations de commit.

Les commandes suivantes permettent d'activer la colorisation de la sortie en ligne de commande :

```bash
git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto
```

-----

## 🏗️ Initialiser un projet

Pour démarrer un nouveau dépôt à partir d'un dossier en local :

  * `git init [nom-du-projet]` : Crée un dépôt local à partir du nom spécifié.

Pour cloner un dépôt depuis une URL existante :

  * `git clone http://github.com/nom_du_depot` : Télécharge un projet et tout son historique de versions.

Pour un nouveau projet comme pour un projet cloné, un dossier `.git` est créé à la racine du projet qui contient l'historique des modifications et la configuration.

-----

## 💻 Utilisation de GitHub

### Suivre les modifications du dépôt

  * `git status` : Liste tous les nouveaux fichiers et les fichiers modifiés à commiter.
  * `git diff` : Montre les modifications de fichier qui ne sont pas encore indexées.
  * `git log` : Montre l'historique des versions pour la branche courante.

### Enregistrement de modifications

  * `git add [fichier]` : Ajoute des fichiers à la liste de ceux devant faire l’objet d’un commit.
  * `git commit` : Enregistre l'ensemble des modifications dans le dépôt local.
  * `git commit [fichier] [fichier]` : Enregistre les fichiers spécifiés dans le dépôt local.

### Les branches

  * `git branch` : Liste toutes les branches locales dans le dépôt courant.
  * `git branch [nom-de-branche]` : Crée une nouvelle branche.
  * `git checkout [nom-de-branche]` : Bascule sur la branche spécifiée et met à jour le répertoire de travail.
  * `git checkout master` : Bascule sur la branche master.
  * `git merge [nom-de-branche]` : Combine dans la branche courante l'historique de la branche spécifiée.
  * `git branch -d [nom-de-branche]` : Supprime la branche spécifiée (devenue inutile une fois fusionnée à une autre branche).
  * `git branch -D [nom-de-branche]` : Supprime la branche spécifiée en perdant les changements non fusionnés.

### Réorganisation

  * `git rm [fichier]` : Supprime le fichier du répertoire de travail et met à jour l'index.
  * `git rm --cached [fichier]` : Supprime le fichier du système de suivi de version mais le préserve localement.
  * `git mv [fichier-nom] [fichier-nouveau-nom]` : Renomme le fichier et prépare le changement pour un commit.

### Annulation/Correction

  * `git commit --amend` : Permet de modifier la description du dernier commit effectué.
  * `git reset [commit]` : Annule tous les commits après le commit spécifié, en conservant les modifications localement.
  * `git reset --hard [commit]` : Supprime tout l'historique et les modifications effectuées après le commit spécifié.
  * `git reset HEAD^` : `HEAD^` permet de faire référence à l'avant dernier commit.
  * `git checkout [fichier]` : Permet de récupérer un fichier non commité à l'état du dernier commit.
  * `git reset HEAD -- fichier_a_supprimer` : Annule l'ajout d'un fichier via `git add` en cas d'erreur.

### Demander à Git d’ignorer des fichiers (`.gitignore`)

  * `git ls-files --other --ignored --exclude-standard` : Liste tous les fichiers exclus du suivi de version dans ce projet.

> **ATTENTION** à ne pas commiter des informations sensibles comme la configuration de bases de données, des mots de passe ou autres \!

Pour ne pas commiter certains dossiers et/ou fichiers, il faut les ajouter au fichier `.gitignore` à la racine du dépôt.
Entrez un nom de fichier par ligne, comme ceci :

```text
un_fichier.ext
un_dossier/un_fichier.ext
*.ext
un_dossier/*
```

> **Partagez** la configuration à mettre en place via des fichiers `.dist` par exemple avec des configurations de base à modifier.

-----

## 🔄 Synchroniser les changements

  * `git pull` : Télécharge les nouveautés du serveur dans votre dépôt local en gardant les modifications.
  * `git push` : Envoie tous les commits du dépôt local sur le serveur.

-----

## ➕ Autres commandes

  * `git config --global http.proxy 0.0.0.0:0000` : Permet de communiquer avec un serveur Git placé derrière un proxy.