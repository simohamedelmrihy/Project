# Membres
  -Mohamed EL MRIHY
  -Anass El Bouayadi
  -Hamza LAHBABI
  -Amine Rachid

# Description
L'objectif de notre application est de fournir à l'utilisateur un outil pour visualiser les informations concernant des routes (accidents, gravité, l'embouteillage …) ces informations permettront à ce dernier de bien choisir son chemin à l’avance ainsi pour éviter les routes qui présentent le plus d’accidents. L’application est aussi utilisée par un administrateur qui, son rôle, consiste à gérer l’application et de la mettre à jour (ex : les opérations CRUD pour les accidents).

# Instalation
  - Pour démarrer l’application on doit installer des éléments suivants :
    1) NodeJS
    2) MongoDb
    
  ## Server:
    1) il faut se positionner dans le dossier ServerSide.
    2) installer les packages NodeJs en utilisant la commande: npm install
    3) démarrer la base de données en utilisant la commande: mongod --dbpath ./data (le dossier data est dans le dossier ServerSide)
    4) enfin il faut démarrer l'application en utilisant la commande: npm start
  ## Client:
    puisque nous avons travailler avec la version 1.6.7 du Framework AngularJs il suffit d'ouvrir la page html index.html qui se trouve dans le dossier ClientSide dans un navigateur. 
  
  
# Les fonctionnalités de l’applications 
I-Pour un utilisateur simple: 
  1) Saisir une l’adresse et un rayon en mètre pour afficher les accidents qui se sont produites dans cette région.
  2) Consulter une fiche détaillée concernant l’accident ( gravité, nombre des blessés …).
  3) Saisir l’adresse de départ et d’arrivée et l'application affiche l'itinéraire correspondante avec les accidents qui se sont produites à              proximité.
  4) Ajouter un commentaire sur une accident.
  
II-Pour l'administrateur:
  1) il hérite toutes les fonctionnalités d'un utilisateur simple.
  2) il gère les accidents (ajout, modification, suppression).
  3) il gère les commentaires (ajout, modification, suppression).
  4) il gère les utilisateurs (ajout, modification, suppression).

# Tests
  pour démarrer les tests il faut se mettre dans le projet ServerSide et plus précisément dans le dossier test et executer cette        commande 
  ##
    >> mocha leNomDuFichier
 
  il y a trois fichiers de tests qui sont les suivants :
    1- commentairesTest.js
    2- accidentsTest.js
    3- usersTest.js
