nb1 = 'str'
while (not nb1.isdigit()):
	print("Entrez un nombre entier : ", end='')
	nb1 = input()

nb2 = 'str'
while (not nb2.isdigit()):
	print("Entrez un autre nombre entier : ", end='')
	nb2 = input()

somme = int(nb1) + int(nb2)
multiplication = int(nb1) * int(nb2)
print("La somme de", nb1, 'et', nb2, 'est égal à', somme)
print("La multiplication de {0} par {1} est égal à {2}".format(nb1, nb2, multiplication))
