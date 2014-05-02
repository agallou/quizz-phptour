quizz-phptour
=============

Quizz consistant à faire deviner le conférencier à partir du nom de la conférence.

Dépendances
-----------

* php / composer
* node / npm
* grunt

Installation
------------

Dépendances Node :

```
npm install
```

Dépendances PHP
```
php composer.phar install
```

Lancement
---------

Cette commande va builder le projet dans le dossier "dist" (en mode "dev") :

```
grunt
```

Push sur le page github
-----------------------

Cette commande va builder le projet en mode prod (avec minifications) et pusher le contenu du dossier "dist" sur la branche gh-pages:

```
grunt push
```
