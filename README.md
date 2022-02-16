# CREER UN RESEAU SOCIAL D'ENTREPRISE

Projet n°7 du parcours développeur web chez OpenClassrooms qui a pour objectif:

- Authentifier un utilisateur et maintenir sa session
- Personnaliser le contenu envoyé à un client web
- Gérer un stockage de données à l'aide de SQL
- Implémenter un stockage de données sécurisé en utilisant SQL

# Exigences émises par le comité de pilotage

- La présentation des fonctionnalités doit être simple :heavy_check_mark:
- La création d’un compte doit être simple et possible depuis un téléphone mobile :heavy_check_mark:
- Le profil doit contenir très peu d’informations pour que sa complétion soit rapide :heavy_check_mark:
- La suppression du compte doit être possible :heavy_check_mark:
- L’accès à un forum où les salariés publient des contenus multimédias doit être présent :heavy_check_mark:
- Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés :heavy_check_mark:
- Le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre :heavy_check_mark:
  salariés

## Technologies utilisées

- React
- Sass
- NodeJS
- ExpressJS
- MySQL
- Sequelize ORM

## Prérequis:

- Avoir installé GIT, NODE, npm et Mysql 5.7 sur sa machine

## POUR LE REPOSITORY

- Cloner le repository avec la commande

git clone https://github.com/Ryandev60/P7_thibaux_ryan

## MySQL

- Ouvrez un deuxième terminal.

- Connectez-vous à mysql.

mysql -u username -p groupomania < groupomania.sql

- username est le nom d'utilisateur avec lequel vous voulez connecter à la base de données
- groupomania est le mot de passe de l'utilisateur avec le quel vous souhaitez vous connectez
- groupomania.sql sont des données qui seront inserer dans la base de données

## POUR LE BACKEND

- Ouvrez le fichier " .env-sample " : vous devez assigner des valeurs aux variables suivantes:

- Token
  JWT_SECRET =

- Port pour le backend
  PORT =

- Renommer ce dossier en " .env "

- Ouvrez le fichier config.json se trouvant dans le dossier config et renseigner votre nom d'utilisateur et votre mot de passe

## Installez les dépendances

- Rendez vous dans le dossier backend en exécutant la commande cd backend depuis le terminal

- Puis installez les dépendances en exécutant la commande npm install

- Une fois les dépendances installer, lancez le backend en en exécutant la commande npm start

- Le message "Listening on port " suivi du port que vous avez choisi devrait apparaitre dans la console

## POUR LE FRONTEND

- Dans un nouveau terminal, on accède au dossier frontend en exécutant la commande cd frontend

- Puis installez les dépendances en exécutant la commande npm install

- Le message "Compiled successfully!" devrait apparaitre

## DANS LE NAVIGATEUR

- Ouvrez votre navigateur à l'adresse: http://localhost:3000/login
