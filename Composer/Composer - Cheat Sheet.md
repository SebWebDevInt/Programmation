# COMPOSER : Mon reminder perso !

## 🎶 Présentation

Composer est un gestionnaire de dépendances écrit en PHP.

-----

## 🛠️ Installer et Configurer Composer

### Installation

Suivre les instructions sur le site de Composer : `https://getcomposer.org/`

S'assurer que le binaire est accessible depuis la variable PATH.

-----

## ⚙️ Utilisation de Composer

### Gérer les dépendances

Toutes les dépendances nécessaires au projet sont renseignées dans un fichier `composer.json`. Les dépendances installées sont elles spécifiées dans le fichier `composer.lock`. Si ce fichier existe lors de l'installation des dépendances l'installateur se basera sur les informations de ce fichier. Sinon il mettra les dépendances en dernière version possible selon les renseignements présents dans le fichier `composer.json`.

  * `composer install` : Télécharge les dépendances du projet dans le dossier `vendor` (par défaut) et crée le fichier `composer.lock`.
  * `composer update` : Met à jour l'ensemble des dépendances.
  * `composer update [dependance]` : Met à jour la dépendance spécifiée.
  * `composer require [dependance]` : Ajoute la dépendance au projet et la télécharge.

-----

## 🚀 Autoloading

Pour les librairies qui spécifient des informations d'auto-chargement, Composer génère un fichier `vendor/autoload.php`. Il suffit d'inclure alors ce fichier au projet PHP de cette manière :

```php
require __DIR__ . '/vendor/autoload.php';
```

Il est possible d'ajouter du code pour charger automatiquement des librairies à partir du fichier `composer.json`.

```json
{
    "autoload": {
        "psr-4": {"MonNamespace\\": "mon_dossier/"}
    }
}
```

Dans le cas présent, Composer chargera automatiquement le namespace `MonNamespace` qui pointera sur le dossier `mon_dossier/`.

Il faudra juste regénérer le fichier `vendor/autoload.php` à l'aide de la commande suivante pour que la modification soit prise en compte :

```bash
composer dump-autoload
```

# 🎼 COMPOSER : Le reminder de l'IA Gemini

## ⚙️ Commandes Essentielles (Installation & Mise à Jour)

| Commande | Description | Détails |
| :--- | :--- | :--- |
| `composer install` | **Installe toutes les dépendances** du projet. | Utilise `composer.lock` s'il existe (pour garantir les mêmes versions que le dernier déploiement). Si `composer.lock` n'existe pas, il se base sur `composer.json` et crée le fichier `composer.lock`. |
| `composer update` | **Met à jour toutes les dépendances** vers les dernières versions acceptées par `composer.json`. | Met à jour le fichier `composer.lock` pour refléter les nouvelles versions. |
| `composer update [vendor/package]` | Met à jour une **dépendance spécifique** (un seul paquet) sans toucher aux autres. | Utile pour tester une mise à jour isolée. |

---

## 📦 Gestion des Paquets (Ajout & Suppression)

| Commande | Description | Quand l'utiliser |
| :--- | :--- | :--- |
| `composer require [vendor/package]` | **Ajoute un paquet** au projet. | Pour ajouter une dépendance à la fois à `composer.json` et au projet (téléchargement immédiat). |
| `composer require [vendor/package] --dev` | Ajoute un paquet en tant que **dépendance de développement** (dev-dependencies). | Pour les outils utilisés uniquement en développement/tests (ex: PHPUnit), listés sous `require-dev` dans `composer.json`. |
| `composer remove [vendor/package]` | **Supprime un paquet** du projet. | Supprime le paquet de `composer.json`, du dossier `vendor/` et met à jour `composer.lock`. |

---

## 🚀 Autoloading et Optimisation

L'autoloading permet de charger automatiquement les classes sans utiliser de multiples `require()` manuels.

| Commande | Rôle | Notes |
| :--- | :--- | :--- |
| `composer dump-autoload` | **Regénère le fichier `vendor/autoload.php`**. | Obligatoire après avoir modifié la section `autoload` dans `composer.json` (ex: ajout d'un nouveau namespace PSR-4). |
| `composer dump-autoload -o` ou `-optimize` | Regénère l'autoloader en l'**optimisant** (création d'un "class map"). | Recommandé pour la **production** pour accélérer le temps de chargement des classes. |
| `composer validate` | **Vérifie la syntaxe** de votre fichier `composer.json`. | À utiliser avant de commiter ou d'installer pour s'assurer qu'il est bien formé. |

---

## 📄 Fichiers Clés

| Fichier | Rôle | Mettre sous Git ? |
| :--- | :--- | :--- |
| **`composer.json`** | **Définition du projet.** Liste les dépendances requises, les versions acceptées, l'autoloading, etc. | **OUI** ✅ |
| **`composer.lock`** | **États exacts des dépendances.** Verrouille chaque paquet à la version précise qui a été installée. | **OUI** ✅ |
| **`vendor/`** | **Dossier des dépendances téléchargées.** Contient le code de toutes les librairies externes. | **NON** ❌ (Ajouter à `.gitignore`) |

---

## ⭐️ Conseils Rapides

1.  **Isolation :** Utilisez toujours `composer.lock` pour les environnements de staging et de production (`composer install`).
2.  **Versions :** Utilisez le tilde (`~`) ou l'opérateur caret (`^`) dans `composer.json` pour définir les plages de versions acceptées (ex: `^4.0` accepte les versions $4.x.x$, mais pas $5.0$).
3.  **Binaire Local :** Si `composer` n'est pas installé globalement, vous pouvez l'exécuter localement via `./composer.phar`.
4.  **PHP Version :** Pensez à ajouter votre version PHP sous la section `require` pour éviter les dépendances incompatibles (ex: `"php": ">=8.1"`).