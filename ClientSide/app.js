var application = angular.module('mainApp', ['ui.router', 'ngStorage', 'ngMap']);

application.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'signupController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .state('userAccueil', {
      url: '/userAccueil',
      templateUrl: 'views/userAccueil.html',
      controller: 'userAccueilController'
    })
    .state('userAccueil.direction', {
      url: '/direction',
      templateUrl: "views/direction.html",
      controller: 'directionController'
    })

    .state('userAccueil.zone', {
      url: '/zone',
      templateUrl: 'views/zone.html',
      controller: 'zoneController'
    })

    .state('userAccueil.detailAccident', {
      url: '/detailAccident',
      templateUrl: 'views/detailAccident.html',
      controller: 'detailAccidentController',
      params: {
        obj: null
      }
    })

    .state('adminAccueil', {
      url: '/adminAccueil',
      templateUrl: 'views/adminAccueil.html',
      controller: 'adminAccueilController'
    })

    .state('adminAccueil.comments', {
      url: '/comments',
      templateUrl: 'views/comments.html',
      controller: 'commentsController'
    })

    .state('adminAccueil.accidents', {
      url: '/accidents',
      templateUrl: 'views/accidents.html',
      controller: 'accidentsController'
    })

    .state('adminAccueil.users', {
      url: '/users',
      templateUrl: 'views/users.html',
      controller: 'usersController'
    })

    .state('adminAccueil.zone', {
      url: '/zone',
      templateUrl: 'views/zone.html',
      controller: 'zoneController'
    })

    .state('adminAccueil.direction', {
      url: '/direction',
      templateUrl: 'views/direction.html',
      controller: 'directionController'
    })

    .state('adminAccueil.detailAccident', {
      url: '/detailAccident',
      templateUrl: 'views/detailAccident.html',
      controller: 'detailAccidentController',
      params: {
        obj: null
      }
    })

    .state('adminAccueil.ajoutAccident', {
      url: '/ajoutAccident',
      templateUrl: 'views/ajoutAccident.html',
      controller: 'ajoutAccidentController',
      params: {
        obj: null
      }
    })
});

//-----------------------------------------Services-----------------------------------------------

application.factory('signService', function ($http) {
  var myService = {
    setUser: function (data) {
      var promise = $http.post('http://127.0.0.1:3000/sign/signup', data).then(function (response) {
        return response.data;
      }, function (error) {
        return error.data;
      });
      return promise;
    },
    login: function (data) {
      var promise = $http.post('http://127.0.0.1:3000/sign/login', data).then(function (response) {
        return response.data;
      }, function (error) {
        return error.data;
      });
      return promise;
    }
  };
  return myService;
});

application.factory('directionService', function ($http) {
  var myService = {
    getMarkers: function (token, data) {
      var promise = $http.post('http://127.0.0.1:3000/map?token=' + token, data).then(function (response) {
        return response.data;
      }, function (error) {
        return error.data;
      });
      return promise;
    },
    getCircle: function (token, data) {
      var promise = $http.post('http://127.0.0.1:3000/map/circle?token=' + token, data).then(function (response) {
        return response.data;
      }, function (error) {
        return error.data;
      });
      return promise;
    },
    getDetails: function (token, data) {
      var promise = $http.post('http://127.0.0.1:3000/map?token=' + token, data).then(function (response) {
        return response.data;
      }, function (error) {
        return error.data;
      });
      return promise;
    },

  };
  return myService;
});

application.factory('detailsService', function ($http, $state) {
  var myService = {
    getDetails: function (token, id) {
      var promise = $http.get('http://127.0.0.1:3000/caracteristique/' + id + '?token=' + token).then(function (response) {
        return response.data;
      }, function (error) {
        $state.go('login');
      });
      return promise;
    },
    addCommentaire: function (token, data) {
      var promise = $http.post('http://127.0.0.1:3000/commentaire?token=' + token, data).then(function (response) {
        return response.data;
      }, function (error) {
        $state.go('login');
      });
      return promise;
    },
    getCommentaires: function (token, id) {
      var promise = $http.get('http://127.0.0.1:3000/commentaire?accident=' + id + '&token=' + token).then(function (response) {
        return response.data;
      }, function (error) {
        $state.go('login');
      });
      return promise;
    }
  };
  return myService;
});

application.factory('adminService', function ($http, $state) {
  var myService = {
    getAccidents: function (token) {
      var promise = $http.get('http://127.0.0.1:3000/caracteristique?token=' + token).then(function (response) {
        return response.data;
      }, function (error) {
        $state.go('login');
      });
      return promise;
    },
    addAccident: function (token, data) {
      var promise = $http.post('http://127.0.0.1:3000/caracteristique?token=' + token, data).then(function (response) {
        return response.data;
      }, function (error) {
        $state.go('login');
      });
      return promise;
    },
    suppAccident: function (token, id) {
      var promise = $http.delete('http://127.0.0.1:3000/caracteristique/'+id+'?token=' + token, {id, id}).then(function (response) {
        console.log('response', response);
        return response.data;
      }, function (error) {
        $state.go('login');
      });
      return promise;
    }
  };
  return myService;
});

//----------------------------------------controllers--------------------------------------------

application.controller('accidentsController', function ($scope, $localStorage, $state, adminService) {
  if ($localStorage.token) {
    adminService.getAccidents($localStorage.token)
      .then(function (d) {
        $scope.accidents = d;
      });
    $scope.suppAccident = function (id) {
      console.log('jjjjjjjjjjjjj');
      adminService.suppAccident($localStorage.token, id)
        .then(function (d) {
          console.log('ddddddddd', d);
          $state.go('adminAccueil.accidents');
        });
    };
    $scope.getAccientDetails = function (mark) {
      $state.go('adminAccueil.detailAccident', {
        obj: mark
      });
    }
    $scope.ajoutAccident = function () {
      $state.go('adminAccueil.ajoutAccident');
    }
  } else {
    $state.go('login');
  }
});

application.controller('ajoutAccidentController', function ($scope, $localStorage, $state, NgMap, adminService) {
  if ($localStorage.token) {
    $scope.enregistrerAcc = function () {
      var data = {
        indiceGravite: $scope.indiceGravite1,
        nbreDeces: $scope.nbreDeces1,
        nbreHosspitalise: $scope.nbreHosspitalise1,
        nbreBlesseleger: $scope.nbreBlesseleger1,
        lumiere: $scope.lumiere1,
        catRoute: $scope.catRoute1,
        regime: $scope.regime1,
        situation: $scope.situation1,
        departement: $scope.departement1,
        codeInsee: $scope.codeInsee1,
        adresse: $scope.adresse1,
        numAccident: $scope.numAccident1,
      }
      adminService.addAccident($localStorage.token, data)
        .then(function (d) {
          $state.go('adminAccueil.accidents');
        });
    }
  } else {
    $state.go('login');
  }
});





application.controller('commentsController', function ($scope, $localStorage, $state) {
  if ($localStorage.token) {
    //$scope.message = $localStorage.role;
  } else {
    $state.go('login');
  }
});

application.controller('adminAccueilController', function ($scope, $localStorage, $state) {
  if ($localStorage.token) {
    $scope.deconnecter = function () {
      $localStorage.token = null;
      $localStorage.role = null;
      $state.go('login');
    }
  } else {
    $state.go('login');
  }
});

application.controller('detailAccidentController', function ($scope, $localStorage, $state, $stateParams, detailsService) {
  if ($localStorage.token) {
    $scope.mark = $stateParams.obj;
    detailsService.getDetails($localStorage.token, $stateParams.obj._id)
      .then(function (d) {
        $scope.accident = d;
      });
    $scope.getComments = function (token, id) {
      detailsService.getCommentaires(token, id)
        .then(function (d) {
          $scope.comments = d;
        });
    }
    $scope.getComments($localStorage.token, $stateParams.obj._id);

    $scope.addCommentaire = function (id) {
      var data = {
        message: $scope.message,
        num_accident: id
      }
      detailsService.addCommentaire($localStorage.token, data)
        .then(function (d) {
          $scope.getComments($localStorage.token, $stateParams.obj._id);
          $scope.message = "";
        });
    }
  } else {
    $state.go('login');
  }
});

application.controller('zoneController', function ($rootScope, $scope, $localStorage, $state, directionService, NgMap) {
  if ($localStorage.token) {
    $scope.centre = [48.8534100, 2.3488000];
    NgMap.getMap().then(function (map) {
      console.log('map', map);
      $scope.map1 = map;
    });

    $scope.getCircle = function () {
      $scope.markers1 = [];
      var direction = {
        origin: $scope.circle,
        distance: $scope.distance
      }
      $scope.showCircle = true;
      directionService.getCircle($localStorage.token, direction)
        .then(function (d) {
          $scope.centre = d.centre;
          $scope.distance1 = $scope.distance;
          $scope.markers1 = d.resultat;
        });
    };

    $scope.showDetail1 = function (e, mark) {
      console.log('ddddddddddd', mark);
      $scope.mark2 = mark;
      $scope.map1.showInfoWindow('foo-iww', $scope.mark2._id);
    };

    $scope.getDetails1 = function () {
      console.log('ffffffff', $scope.mark2);
      if ($localStorage.role === "user") {
        $state.go('userAccueil.detailAccident', {
          obj: $scope.mark2
        });
      } else if ($localStorage.role === "admin") {
        $state.go('adminAccueil.detailAccident', {
          obj: $scope.mark2
        });
      }
    };
  } else {
    $state.go('login');
  }
});

application.controller('directionController', function ($rootScope, $scope, $localStorage, $state, directionService, NgMap) {
  if ($localStorage.token) {
    $scope.showDirection = false;
    console.log('heeeeeeeeeeereeeeeee');
    NgMap.getMap().then(function (map) {
      console.log('map', map);
      $scope.map = map;
    });
    $scope.getDirection = function () {
      console.log('oooooooooo', direction);
      $scope.markers = [];
      var direction = {
        origin: $scope.origin,
        destination: $scope.destination
      }
      directionService.getMarkers($localStorage.token, direction)
        .then(function (d) {
          $scope.markers = d;
          $scope.showDirection = true;
          $scope.origin1 = $scope.origin;
          $scope.destination1 = $scope.destination;
        });
    };
    $scope.showDetail = function (e, mark) {
      $scope.mark = mark;
      $scope.map.showInfoWindow('foo-iw', mark._id);
    };

    $scope.getDetails = function () {
      if ($localStorage.role === "user") {
        $state.go('userAccueil.detailAccident', {
          obj: $scope.mark
        });
      } else if ($localStorage.role === "admin") {
        $state.go('adminAccueil.detailAccident', {
          obj: $scope.mark
        });
      }
    };
  } else {
    $state.go('login');
  }
});

application.controller('userAccueilController', function ($rootScope, $scope, $localStorage, $state, directionService, NgMap) {
  if ($localStorage.token) {
    $scope.deconnecter = function () {
      $localStorage.token = null;
      $localStorage.role = null;
      $state.go('login');
    }
  } else {
    $state.go('login');
  }
});

application.controller('signupController', function ($scope, $state, signService) {
  $scope.enregistrer = function () {
    var user = {
      nom: $scope.nom,
      prenom: $scope.prenom,
      email: $scope.email,
      password: $scope.password
    };
    signService.setUser(user).then(function (d) {
      if (d.message === "user created") {
        $state.go('login');
      } else {
        $scope.erreur = d.message;
      }
    });
  }
});

application.controller('loginController', function ($scope, $localStorage, $state, signService) {
  $scope.login = function () {
    var user = {
      email: $scope.mail,
      password: $scope.password
    };

    signService.login(user).then(function (d) {
      if (d.message === "Auth successful") {
        $localStorage.token = d.token;
        console.log('aaaaaaaaaa', d.token);
        $localStorage.role = d.role;
        if (d.role === "user") {
          $state.go('userAccueil.zone');
        }
        if (d.role === "admin") {
          $state.go('adminAccueil.accidents');
        }
      } else {
        $scope.erreur = d.message;
      }
    });
  }
});

application.controller('usersController', function ($scope, $localStorage, $state) {
  if ($localStorage.token) {
    //$scope.message = $localStorage.role;
  } else {
    $state.go('login');
  }
});
