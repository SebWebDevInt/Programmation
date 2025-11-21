# MARKDOWN CHEAT SHEET

## Titres (H1 à H6)

```md
# Titre de Niveau 1 (H1)
## Titre de Niveau 2 (H2)
### Titre de Niveau 3 (H3)
#### Titre de Niveau 4 (H4)
##### Titre de Niveau 5 (H5)
###### Titre de Niveau 6 (H6)
```

## Paragraphes et retours à la ligne

Ceci est un paragraphe standard.
Les lignes successives sans séparation vide sont affichées sur une seule ligne.

Pour forcer un simple **Retour à la ligne** (équivalent à `<br>`), ajoutez deux espaces à la fin de la ligne.  
Comme ceci !

## Format de texte

* Texte en *italique* ou en _italique_ (`*italique*` ou en `_italique_`)
* Texte en **gras** ou en __gras__ (`**gras**` ou en `__gras__`)
* Texte en ***gras et italique*** (`***gras et italique***`)
* Pour barrer du texte, utilisez deux tildes : ~~Texte Barré~~ (`~~Texte Barré~~`)
* Pour surligner, on utilise souvent l'extension HTML (non standard) : <mark>Texte Surligné</mark> (`<mark>Texte Surligné</mark>`)

## Listes et tâches

Les listes non ordonnées sont précédés par `*`, `-` ou `+`.  
Pour un sous élément, précédé le signe utilisé de 4 espaces.

* Premier élément
* Deuxième élément
    * Sous-élément
        * Sous-sous-élément
* Troisième élément

Les listes numérotées (ou ordonnées) sont précédés du chiffre suivi d'un point `1.`, `2.`, etc...

1. Première étape
2. Deuxième étape
    * Sous-étape A
    * Sous-étape B
3. Troisième étape

Les cases à Cocher, sont une extension GFM (GitHub Flavored Markdown), qui permet d'afficher des listes de tâches. Elles peuvent être utilisées dans des listes ordonnées ou non, on précède les éléments de `[x]` quand elles sont cochées ou `[ ]` quand elles ne sont pas cochées.

* [x] Tâche terminée
* [ ] Tâche en cours
* [ ] Tâche à commencer

## Citation (Blockquote)

Pour une ciitation il suffit d'utiliser le sign `>` en début de ligne. Voici qulques exemples de citation :

> Ceci est une citation simple.

> Ceci est une citation de texte sur plusieurs lignes.  
> Notez l'utilisation des deux espaces à la fin de chaque ligne pour **forcer le retour à la ligne**.
> 
> Pour créer un nouveau paragraphe à l'intérieur du bloc de citation, utilisez `>` sur la ligne vide.
>> Il est également possible d'imbriquer une citation dans la citation.
> 
> Et aussi d'utiliser les titres, mise en forme liens et la plupart des choses vues par ailleurs.

## Liens hypertextes et lien mail

`[Texte du lien](URL)` [Lien simple vers Google](https://www.google.com)

`<email@example.com>` email@example.com

Un lien peut aussi être mis en forme **[un lien simple vers Google](https://www.google.com)** (en gras) et utiliser dans les listes, tableaux etc...

## Blocs de code

Pour parler d'une variable ou d'une commande dans un texte en ligne, utilisez les backticks : `git commit -m "Mon message"`

Utilisez 3 backticks pour créer un bloc pour les longs extraits de code. Spécifiez le langage pour la coloration syntaxique.

Exemple de code sans coloration particulière :

```
# Bloc de code
print 'En utilisant 3 backticks (```)'
```

    # Bloc de code
    print 'En utilisant une indentation de 4 espaces devant les lignes'

Exemple de code **HTML** :

```html
<section class="container">
    <h1>Titre</h1>
    <p>Ceci est un paragraphe HTML. La délimitation de son bloc commence par <b>```html</b> et se termine par <b>```</b></p>
</section>
```

Exemple de code **CSS** :

```css
.classe {
    background-color: #550000;
}
```

Exemple de code **JavaScript** :

```javascript
function hello() {
  console.log("Hello Markdown!");
}
hello();
```

## Tableaux

Exemple de tableau simple :

```markdown
| En-tête 1 | En-tête 2 | En-tête 3 |
| --- | --- | --- |
| Donnée 1 | Donnée 2 | Donnée 3 |
```

| En-tête 1 | En-tête 2 | En-tête 3 |
| --- | --- | --- |
| Donnée 1 | Donnée 2 | Donnée 3 |

L'alignement se gère sur la ligne de séparation de l'en tête. Au lieu de `---` `:---` sert à aligner à gauche `---:` à droite et `:---:` au centre.  
Exemple de tableau en gérant des alignements et de la mise en forme :

| Nom | Âge | Ville | Cadeau trouvé
| --- | ---: | :--- | :---: |
| **Camille** | 1 | *Yutz* | 🟡 |
| **Victoria** | 2 | *Metz* | 🟢 |
| **Clothilde** | 13 | *Morhange* | 🟡 |
| **Camille** | 18 | *Bousseviller* | 🔴 |

## 1.9 Séparateurs

La ligne horizontale servant à créer une délimitation se fait avec `---` ou `___` ou `***` (il est possible de mettre plus de 3 fois le symbole, mais 3 sont suffisants) :

---
***
_______________________________________________________

## Images hébergées sur Internet

![Image](https://commonmark.org/help/images/favicon.png)

## Liens vers Fichiers Locaux

* [Lien vers un fichier image local](./images/logo.png)
* [Lien vers un fichier Markdown local](./Glyphes%20Unicode.md)

## Exposants et Indices (Utilisation HTML ou LaTeX)

Le Markdown standard ne gère pas directement cela, nous utilisons donc le HTML :

* **Exposant :** $E=mc^2$ devient $E=mc^2$ ou $10^{10}$
* **Indice :** La formule de l'eau est $H_2O$ ou $H_2O$
