# Les variables et l'affichage
nom = 'Sébastien'
age = 20
taille = 1.74
print('{} mesure {}m'.format(nom, taille), 'OU', '{1} mesure {0}m'.format(taille, nom), 'OU', '{name} mesure {height}m'.format(name=nom, height=taille))
print('%s mesure %fm' % (nom, taille), 'OU', '%s mesure %.2fm' % (nom, taille))

# Affichage multiligne
print("""
	------
	|    |
	|    |
	------""")

# Quelques opérateurs
nb = 20
nb2 = 3
print('{} divisé par {} ='.format(nb, nb2), nb // nb2, 'reste', nb % nb2, 'OU', nb / nb2)
print("Utilisation de tous les opérateurs : 2 ** 4 * 5 / 2 + 15 - 4 % 4 =", 2 ** 4 * 5 / 2 + 15 - 4 % 4)

# L'affichage des types de variable et le type datetime
from datetime import datetime
print('La date du jour :', datetime.now())
print('Nom est de type :', type(nom), 'datetime est de type :', type(datetime), 'taille est de type :', taille.__class__)
print('Age est de type :', age.__class__, 'La division de 15 par 2 est de type :', (15 / 2).__class__)

# Les flottants et les comportements bizarres
print('Exemple avec les flottants 3.5 + 2.5 =', 3.5 + 2.5, '| 0.1 + 0.1 + 0.1 =', 0.1 + 0.1 + 0.1, '| -2 + -3 =', -2 + -3)

# Les structures de langage
for i in range(5):
	print(nom.upper() + ' mesure ' + str(taille) + 'm', end=' | ')
print();

i = 0
while i < 8:
	i = i + 1
	if i != 5 and i != 6:
		print(i, end=' - ')

# Autres détails
#\a émet une alerte sonore au niveau du système
print('\aShalala\tTabulation\tSaut àla\nligne')
nom = 'Seb'
nom2 = nom
nom3 = 'Patrick'
print(id(nom), id(nom2), id(nom3))

# Fonctions sur les chaines
nom = 'seb neiter'
print(nom.title(), nom.center(30, '-'))
print(dir(nom))
print(nom.__len__(), 'OU', len(nom))