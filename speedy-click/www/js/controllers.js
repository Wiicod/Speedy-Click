var default_time=5;
var default_zen_time_allow=3600;
var default_time_bonus=3;
var default_time_label="5s";
var default_score_label="0 hit";
var bonusSize=50;
var scoreBonus=450;
var one_minute=60;

angular.module('sc.controllers', [])

    .controller('SCCtrl', ['$scope','$rootScope',function($scope,$rootScope) {
        $scope.wiicod_name="Wiicod";
        $scope.wiicod_link="http://www.wiicod.com";

        $scope.error_mesage_pseudo="Pseudo all ready use, take an other";

    }])

    .controller('StatsCtrl', ['$scope','RankFactory','ScoreFactory','$ionicLoading',
    function($scope,RankFactory,ScoreFactory,$ionicLoading){
    setCardSize(20);
    $scope.refreshScore=function(){
      $ionicLoading.show({ template: '<span translate="">Chargement des scores</span><br><ion-spinner icon="dots" class="spinner-light"></ion-spinner>' });
      RankFactory.getRanks().then(function(ranks){
        $scope.ranks = ranks;
        $ionicLoading.hide();
        //alert("rank "+JSON.stringify(ranks));
      },function(msg){
        $ionicLoading.hide();
        alert(msg);
      });

      ScoreFactory.getScores().then(function(scores){
        $scope.scores = scores;
        $ionicLoading.hide();
        //alert("scores "+JSON.stringify(scores));
      },function(msg){
        $ionicLoading.hide();
        alert(msg);
      });//*/
    }
      $scope.filtre={
        area:"local",
        type:"classic",
        flag_area:true,
        flag_type:true,
        rank_order:"click"
      };
      $scope.frank_order = function(ro){
        $scope.filtre.rank_order=ro;
      };

      $scope.myrank = 46;

      $scope.showActive =function(index){

        if(index == $scope.myrank){
          return 'activeMarkClass';
        }
        return '';
      };

      $scope.$watch('filtre.flag_type',function(){
        $scope.filtre.type=$scope.filtre.flag_type?"classic":"zen";
      });
      $scope.$watch('filtre.flag_area',function(){
        $scope.filtre.area = $scope.filtre.flag_area?"local":"world";
      });
       /* Pour les test
       $scope.scores=[
          {"player":"Zephyr","click":4125,"type":"zen","speed":890},
          {"player":"Zephyr","click":4125,"type":"zen","speed":445},
          {"player":"Zephyr","click":4125,"type":"zen","speed":45},
          {"player":"Zephyr","click":125,"type":"classic","speed":400},
          {"player":"Zephyr","click":125,"type":"classic","speed":542},
          {"player":"Zephyr","click":125,"type":"classic","speed":78}
        ];
        $scope.ranks=[
          {"rank":1,"username":"Zephyr","click":4125,"country":"Cameroon","speed":45,type:"zen"},
          {"rank":1,"username":"Zephyr","click":4125,"country":"Cameroon","speed":45,type:"classic"},
          {"rank":2,"username":"Foris","click":4205,"country":"Cameroon","speed":45,type:"zen"},
          {"rank":2,"username":"Foris","click":4025,"country":"Cameroon","speed":45,type:"classic"},
          {"rank":3,"username":"Spij","click":425,"country":"Cameroon","speed":45,type:"zen"},
          {"rank":3,"username":"Spij","click":425,"country":"Cameroon","speed":45,type:"classic"},
          {"rank":4,"username":"Quentin","click":125,"country":"France","speed":4,type:"zen"},
          {"rank":4,"username":"Quentin","click":125,"country":"France","speed":4,type:"classic"}
        ];
       //*/
        //* cas reels
      $ionicLoading.show({ template: '<span translate="">Chargement des scores</span><br><ion-spinner icon="dots" class="spinner-light"></ion-spinner>' });
        RankFactory.getRanks().then(function(ranks){
          $scope.ranks = ranks;
          $ionicLoading.hide();
          //alert("rank "+JSON.stringify(ranks));
        },function(msg){
          alert(msg);
          $ionicLoading.hide();
        });

        ScoreFactory.getScores().then(function(scores){
          $scope.scores = scores;
          $ionicLoading.hide();
        },function(msg){
          alert(msg);
          $ionicLoading.hide();
        });//*/

    }])

  .controller('HomeCtrl', ['$scope','$ionicPopup','$location','$timeout','PlayerFactory','$rootScope','$interval',
    function($scope,$ionicPopup,$location,$timeout,PlayerFactory,$rootScope,$interval) {

      $scope.player={};

      $scope.rotate=function(){
        $('#container').removeClass('pulse');
        if($('#container').hasClass('bounce')){
          $('#container').removeClass('bounce');
        }
        else {
          $('#container').addClass('bounce');
        }
        //
      }
      $timeout(function() {
        $interval(function(){
          $scope.rotate();
        },30000);
      },30000)


    $(document).ready(function() {
      var x=(ny-95)/3;
      var y=(ny-95-384)/2;
      if(nx>419){
        document.getElementById('container').style.marginTop=x+"px";
      }
      else{
        document.getElementById('container').style.marginTop=y+"px";
      }
    });

    $scope.popupGameMode  = function() {

      var confirmPopup = $ionicPopup.alert({
        title: 'Game mode',
        template: '<hr class="divider-short" style="margin-bottom: 2px;margin-top: 2px;">',
        buttons: [
          {
            text: '<button class="button btn-calmed" ui-sref="play-classic">Classic </button>',
            type: ' btn-gold',
            onTap: function(e) {
              $location.path("play-classic");
            }
          },
          {
            text: '<button class="button" ui-sref="play-zen">Zen </button>',
            type: ' btn-gold',
            onTap: function(e) {
              $location.path("play-zen");
            }
          }
        ]
      });
      confirmPopup.then(function(res) {
        if(res) {
          console.log('You are sure');
        } else {
          console.log('You are not sure');
        }
      });
    };

      //alert("ici");
      PlayerFactory.getPlayerInformation();

      // recuperation des données utilisateur
      PlayerFactory.getPlayer().then(function(data){
          //alert("player "+JSON.stringify(data));
          if(data!=undefined){
            // utilisateur déjà present. affichage d'un mot de bienvenu
            $scope.showWellcomePopup(data.username);
            $scope.player=data;
            $rootScope.player=data;
          }
          else{
            // utilisateur pas encore present, enregistrement
            $scope.showUsernameFormPopup();
          }
        },
        function(data){
          alert(JSON.stringify(data));
        })

      $scope.showMultiPopup = function() {
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          template: '<p style="text-align: justify; font-size: 10px" translate="">leave us a comment for describe what you will like to see in this mode.</p>',
          title: '<span translate="">Multi player mode</span>',
          subTitle: '<span translate="">Coming soon</span>',
          buttons: [
            {
              text: 'Comment',
              type: 'btn-gold',
              onTap: function(e) {
                myPopup.close();
                $location.path("option");
              }
            },
            {
              text: 'Close',
              type: 'btn-gold',
              onTap: function(e) {
                myPopup.close();
              }
            }
          ]
        });
      };
      $scope.showWellcomePopup = function(username) {
      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        //template: '<input type="text" style="padding: 0px 5px" ng-model="user.username">',
        title: '<span translate="">Wellcome </span><span class="red">'+username+'</span>'
        //subTitle: 'Please use normal things',
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
        //
      });

      $timeout(function() {
        myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);
    };
      $scope.showUsernameFormPopup = function() {
      $scope.user = {};

      // An elaborate, custom popup
      var myPopup = $ionicPopup.show({
        template: '<input type="text" style="padding: 0px 5px" ng-model="user.username">',
        title: '<span translate="">Enter your username</span>',
        //subTitle: 'Please use normal things',
        scope: $scope,
        buttons: [
          //{ text: 'Cancel' },
          {
            text: '<span translate="">Save</span>',
            type: 'btn-gold',
            onTap: function(e) {
              if (!$scope.user.username) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                // verification si le user la n'exite pas deja
                PlayerFactory.addPlayer({username:$scope.user.username}).then(function(data){
                  //alert(JSON.stringify(data));
                    $scope.showWellcomePopup($scope.user.username);
                },
                function(data){
                  alert(JSON.stringify(data));
                });
                return $scope.user.username;
              }
            }
          }
        ]
      });

      myPopup.then(function(res) {
        console.log('Tapped!', res);
        //
      });

      $timeout(function() {
        //myPopup.close(); //close the popup after 3 seconds for some reason
      }, 3000);
    };
    //$scope.showPopup();

  }])


  .controller('HelpCtrl', ['$scope',function($scope,NavbarFactory) {
    setCardSize(-45);
  }])

    .controller('MultiCtrl',  ['$scope','$ionicPopup','$location','$interval','$timeout',
    function($scope,$ionicPopup,$location,$interval,$timeout) {
      $(".play-zone").css('height',(ny-95)/2+"px");
      $("#play-zone2").css("margin-top","43px");

      var time=default_time;
      $scope.time=default_time_label;
      var state=true;

      $scope.hit1=0;
      $scope.hit2=0;
      $scope.Click1=function(e){
        if(state){
          if(compteur1%3==0){
            $('#bonus1').removeClass('red');
            $('#bonus1').removeClass('gold');
            $('#bonus1').addClass('white');
          }
          else if(compteur1%3==1){
            $('#bonus1').removeClass('red');
            $('#bonus1').addClass('gold');
            $('#bonus1').removeClass('white');
          }
          else if(compteur1%3==2){
            $('#bonus1').addClass('red');
            $('#bonus1').removeClass('gold');
            $('#bonus1').removeClass('white');
          }
          $timeout(function(){
            $("#bonus1").css('top', '-100px');
            $("#bonus1").css('left', '-100px');
          },500);

          compteur1++;
          $("#bonus1").css('top', (e.clientY-25)+'px');
          $("#bonus1").css('left', (e.clientX-25)+'px');

          $scope.StartChrono();
          $scope.hit1+=10;
        }
      };
      var compteur1=0;
      var compteur2=0;

      $scope.Click2=function(e){
        if(state){
          if(compteur2%3==0){
            $('#bonus2').removeClass('red');
            $('#bonus2').removeClass('gold');
            $('#bonus2').addClass('white');
          }
          else if(compteur2%3==1){
            $('#bonus2').removeClass('red');
            $('#bonus2').addClass('gold');
            $('#bonus2').removeClass('white');
          }
          else if(compteur2%3==2){
            $('#bonus2').addClass('red');
            $('#bonus2').removeClass('gold');
            $('#bonus2').removeClass('white');
          }
          $timeout(function(){
            $("#bonus2").css('top', '-100px');
            $("#bonus2").css('left', '-100px');
          },500);
          compteur2++;
          $("#bonus2").css('top', (e.clientY-25)+'px');
          $("#bonus2").css('left', (e.clientX-25)+'px');

          $scope.StartChrono();
          $scope.hit2+=10;
        }
      };

      $scope.winner="";

      // Gestion du chrono
      $scope.StartChrono = function() {
        // Don't start a new fight if we are already fighting
        if ( angular.isDefined(chrono_multi) ) return;

        chrono_multi = $interval(function() {
          if(time>0){
            time--;
            $scope.time=""+time;
            if(time==0){
              state=false;
            }
          }
          else{
            state=false;
            if($scope.hit1>$scope.hit2){
              $scope.winner="<span translate=''>Winner is</span> <span class='red' translate=''>Player 1</span>";
            }
            else if($scope.hit1<$scope.hit2){
              $scope.winner="<span translate=''>Winner is</span> <span class='red' translate=''>Player 2</span>";
            }
            else {
              $scope.winner="Egality";
            }
            $scope.popupGameEnd(true);
            $scope.StopChrono();
          }

        }, 1000);
      };

      $scope.StopChrono=function(){
        $interval.cancel(chrono_multi);
        chrono_multi=undefined;
      }

      $scope.Restart=function(){
        $scope.hit1=0;
        $scope.hit2=0;
        $scope.time=default_time_label;
        time=default_time;
        $scope.StartChrono();
        state=true;
        compteur1=0;
        compteur2=0;
      }

      $scope.popupGameEnd  = function(etat) {
        $scope.StopChrono();
        if($scope.winner==""){
          $scope.winner="Pause";
        }
        var hide="";
        if(etat){
          hide="hide";
        }
        var confirmPopup = $ionicPopup.alert({
          title: $scope.winner,
          //template: 'Score : '+$scope.score,
          buttons: [
            {
              text: '<button class="button btn-calmed" ui-sref="play-classic"><i class="icon ion-refresh"></i> </button>',
              type: ' btn-gold',
              onTap: function(e) {
                $scope.Restart();
              }
            },
            {
              text: '<button class="button btn-calmed" ui-sref="play-classic"><i class="icon ion-play"></i> </button>',
              type: ' btn-gold '+hide,
              onTap: function(e) {
                $scope.StartChrono();
              }
            },
            {
              text: '<button class="button" ui-sref="play-zen"><i class="icon ion-android-exit"></i> </button>',
              type: ' btn-gold',
              onTap: function(e) {
                $location.path("home");
              }
            }
          ]
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.StartChrono();
    }])

    .controller('PlayZenCtrl',  ['$scope','$ionicPopup','$location','$interval','$timeout','ScoreFactory','RankFactory',
    function($scope,$ionicPopup,$location,$interval,$timeout,ScoreFactory,RankFactory) {
      $scope.type_jeu="zen";
      $scope.popupGamePause  = function() {
        $scope.StopChrono();
        var confirmPopup = $ionicPopup.alert({
          title: 'Score : '+$scope.score,
          //template: 'Score : '+$scope.score,
          buttons: [
            {
              text: '<button class="button btn-calmed" ui-sref="play-classic"><i class="icon ion-refresh"></i> </button>',
              type: ' btn-gold',
              onTap: function(e) {
                $scope.Restart();
              }
            },
            {
              text: '<button class="button" ui-sref="play-zen"><i class="icon ion-play"></i> </button>',
              type: ' btn-gold',
              onTap: function(e) {
                $scope.StartChrono();
              }
            },
            {
              text: '<button class="button"><i class="icon ion-android-exit"></i> </button>',
              type: ' btn-gold',
              onTap: function(e) {
                // enregistrement du score
                saveScore($scope,time,ScoreFactory,RankFactory)
                $location.path("home");
              }
            }
          ]
        });
        confirmPopup.then(function(res) {
          if(res) {
            console.log('You are sure');
          } else {
            console.log('You are not sure');
          }
        });
      };

      $scope.showStopZenPopup = function() {
        $scope.StopChrono();
        var myPopup = $ionicPopup.show({
          template: '<p class="text-center"><span translate="">Your score :</span> '+$scope.score+'</p>',
          title: '<span translate="">Temps de jeu depasse</span>',
          subTitle: '<span translate="">Le temps de jeu permis en ce mode est d\'une heure</span>',
          scope: $scope,
          buttons: [
            //{ text: 'Cancel' },
            {
              text: '<button class="button"><i class="icon ion-refresh"></i> </button>',
              type: 'btn-gold',
              onTap: function(e) {
                $scope.Restart();
              }
            },
            {
              text: '<button class="button"><i class="icon ion-android-exit"></i> </button>',
              type: 'btn-gold',
              onTap: function(e) {
                $location.path("home");
              }
            }
          ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
          //
        });
      };
      $scope.time="00 : 00";
      var time=0;
      var state=true;
      var compteur1=0;

      $scope.hit=0;
      $scope.score=default_score_label;
      $scope.Click=function(e){
          if(state){
            if(compteur1%3==0){
              $('#bonus1').removeClass('red');
              $('#bonus1').removeClass('gold');
              $('#bonus1').addClass('white');
            }
            else if(compteur1%3==1){
              $('#bonus1').removeClass('red');
              $('#bonus1').addClass('gold');
              $('#bonus1').removeClass('white');
            }
            else if(compteur1%3==2){
              $('#bonus1').addClass('red');
              $('#bonus1').removeClass('gold');
              $('#bonus1').removeClass('white');
            }
            $timeout(function(){
              $("#bonus1").css('top', '-100px');
              $("#bonus1").css('left', '-100px');
            },500);

            compteur1++;
            $("#bonus1").css('top', (e.clientY-70)+'px');
            $("#bonus1").css('left', (e.clientX-25)+'px');
            $scope.hit+=10;
            $scope.score=$scope.hit+" hits";

          }
      }

      $scope.StartChrono = function() {
      // Don't start a new fight if we are already fighting
      if ( angular.isDefined(chrono_player_zen) ) return;
      chrono_player_zen = $interval(function() {
        time++;
        $scope.time=formatTime(time);
        if(time==default_zen_time_allow)// 1 heur de jeu arret
        {
          $scope.StopChrono();
          $scope.showStopZenPopup();
          saveScore($scope,time,ScoreFactory,RankFactory)
        }
      }, 1000);
    };
      $scope.StopChrono=function(){
        $interval.cancel(chrono_player_zen);
        chrono_player_zen=undefined;
      }
      $scope.Restart=function(){
          $scope.hit=0
          $scope.score=default_score_label;
          $scope.time=0;
        time=0;
          state=true;
          compteur1=0;
        $scope.StartChrono();
      };

      $scope.StartChrono();
    }])
    .controller('PlayClassicCtrl',  ['$scope','$ionicPopup','$location','$interval','$timeout','ScoreFactory','RankFactory',
    function($scope,$ionicPopup,$location,$interval,$timeout,ScoreFactory,RankFactory) {
      $scope.type_jeu="classic";
        $scope.popupGamePause  = function(etat) {
          $scope.StopChrono();
          var hide="";
          if(etat){
            hide="hide";
          }
          var confirmPopup = $ionicPopup.alert({
            title: 'Score : '+$scope.score,
            template: '<span ng-if="isHighScore" translate="">Your are the new <span class="red">Speed Master</span>!!!</span>',
            buttons: [
              {
                text: '<button class="button btn-calmed" ui-sref="play-classic"><i class="icon ion-refresh"></i> </button>',
                type: ' btn-gold',
                onTap: function(e) {
                  $scope.Restart();
                }
              },
              {
                text: '<button class="button" ui-sref="play-zen"><i class="icon ion-play"></i> </button>',
                type: ' btn-gold '+hide,
                onTap: function(e) {
                  $scope.StartChrono();
                }
              },
              {
                text: '<button class="button" ui-sref="play-zen"><i class="icon ion-android-exit"></i> </button>',
                type: ' btn-gold',
                onTap: function(e) {
                  $location.path("home");
                }
              }
            ]
          });
          confirmPopup.then(function(res) {
            if(res) {
              console.log('You are sure');
            } else {
              console.log('You are not sure');
            }
          });
        };

        var time=default_time;
        $scope.time=default_time_label;
        var state=true;

        /*** Bonus ***/

        var minY=51+bonusSize;
        var maxY=ny-114-bonusSize;
        var minX=0+bonusSize;
        var maxX=nx-bonusSize;

        var X;var Y;

        $scope.setBonus=function(e){
          X=getCoordonnees(minX,maxX);
          Y=getCoordonnees(minY,maxY);
          $(".bonus").css('top',Y);
          $(".bonus").css('left',X);

          // if no touch
          $timeout(function(){
            $(".bonus").css('top','-100px');
            $(".bonus").css('left','-100px');
          },1000)
        }
        /**** End Bonus ****/
        var compteur1=0;
        $scope.hit=0;
        $scope.score=default_score_label;
        $scope.Click=function(e){
            if(state){
              if(compteur1%3==0){
                $('#bonus1').removeClass('red');
                $('#bonus1').removeClass('gold');
                $('#bonus1').addClass('white');
              }
              else if(compteur1%3==1){
                $('#bonus1').removeClass('red');
                $('#bonus1').addClass('gold');
                $('#bonus1').removeClass('white');
              }
              else if(compteur1%3==2){
                $('#bonus1').addClass('red');
                $('#bonus1').removeClass('gold');
                $('#bonus1').removeClass('white');
              }
              $timeout(function(){
                $("#bonus1").css('top', '-100px');
                $("#bonus1").css('left', '-100px');
              },500);

              compteur1++;
              $("#bonus1").css('top', (e.clientY-70)+'px');
              $("#bonus1").css('left', (e.clientX-25)+'px');

                $scope.StartChrono();
                $scope.hit+=10;
                $scope.score=$scope.hit+" hits";
              if($scope.hit%scoreBonus==0){
                $scope.setBonus();
              }
            }
        }

        $scope.Bonus=function(){
          $('.bonus').css('top','-100px');
          time+=default_time_bonus;
          $scope.time=time;
        }

        // Gestion du chrono_player
        $scope.StartChrono = function() {
            // Don't start a new fight if we are already fighting
            if ( angular.isDefined(chrono_player) ) return;

          chrono_player = $interval(function() {
                if(time>0){
                    time--;
                    $scope.time=time;
                    if(time==0){
                        state=false;
                    }
                }
                else{
                    state=false;
                    $scope.popupGamePause(true);
                  if(time==0){
                    // enregistrement du score
                    ScoreFactory.addScore({click:$scope.hit , speed:$scope.hit/10, type : "classic" }).then(function(data){
                        //alert("addScore "+JSON.stringify(data));
                    },
                    function(data){
                      alert(JSON.stringify(data));
                    })

                  }
                    $scope.StopChrono();
                }

            }, 1000);
        };

        $scope.StopChrono=function(){
          $interval.cancel(chrono_player);
          chrono_player=undefined;
        }

        $scope.Restart=function(){
            $scope.hit=0;
            $scope.score=default_score_label;
            $scope.time=default_time_label;
            time=default_time;
            $scope.StartChrono();
            state=true;
            compteur1=0;
        }

        $scope.StartChrono();


    }])

    .controller('OptionCtrl',  ['$scope','$rootScope','CommentFactory','$ionicPopup','$location','$ionicLoading',
    function($scope,$rootScope,CommentFactory,$ionicPopup,$location,$ionicLoading) {

      $scope.showCommentPopup = function() {
        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
          //template: '<input type="text" style="padding: 0px 5px" ng-model="user.username">',
          title: '<span translate="">Comment saved</span>',
          subTitle: '<span translate="">Thank you for helping us</span>',
          buttons: [
            {
              text: '<button class="button" ui-sref="play-zen">Close </button>',
              type: ' btn-gold',
              onTap: function(e) {
                $location.path("home");
              }
            }
          ]
        });

        myPopup.then(function(res) {
          console.log('Tapped!', res);
          myPopup.close();
          //
        });

        //$timeout(function() {
        //  myPopup.close(); //close the popup after 3 seconds for some reason
        //}, 2000);
      };

      $scope.langues=[{value:"en",name:"English"},{value:"fr",name:"Français"}];
      setCardSize(-10);
        $scope.SaveOption=function(langue,comment){
          console.info(comment,langue, $rootScope.player);
          if(langue!=null){
            // TODO redemarrer l'application en changeant la langue Evaris tu sais comment tu vas gerer ça
          }
          if(comment!=null){
            $ionicLoading.show({ template: '<ion-spinner icon="dots" class="spinner-light"></ion-spinner>' });
            CommentFactory.addComment(comment).then(function(data){
              $ionicLoading.hide();
              $scope.showCommentPopup();
            },function(msg){
              $ionicLoading.hide();
              alert(msg);
            });
          }
        }
    }]);


function getCoordonnees(min,max){
  console.log(min,max);
  return Math.random()*(max -min)+min;
}

function setCardSize(x){
  var size=ny-93-44-100-x;
  $(".card-scroll").css('height',size+'px');
  $("#textarea").css('height',(size-162)+'px');
}

function formatTime(second){
  var minute =parseInt(second/one_minute);
  var s=second-(minute*one_minute);
  if(minute<10){
    minute="0"+minute;
  }
  if(s<10){
    s="0"+s;
  }
  var final_time=minute+" : "+s;
  return final_time;
}

function saveScore(scope,time,ScoreFactory,RankFactory){
  if(scope.hit>0){
    ScoreFactory.addScore({click:scope.hit , speed:scope.hit/time, type : scope.type_jeu }).then(function(data){
        //alert("add "+JSON.stringify(data));
        if(data.isHighScore){
          scope.isHighScore=true;
        }
        else{

        }
      },
      function(data){
        //alert(JSON.stringify(data));
      })
  }
}
