$(document).ready(function () {
    // Initializes ToolTips for Category Search Buttons
    $('.tooltipped').tooltip({ delay: 50 });

    // Initializes Collapsible Search Bar & page How-To
    $('.collapsible').collapsible();

});

    // var config = {
    //     apiKey: 'AIzaSyDMqNQ9pA7C5sKkMHm8U6BAdExqtprHAwE',
    //     authDomain: 'mycity-188015.firebaseapp.com',
    //     databaseURL: 'https://mycity-188015.firebaseio.com',
    //     projectId: 'mycity-188015',
    //     storageBucket: 'mycity-188015.appspot.com',
    //     messagingSenderId: '986949142496'
    // };

    // firebase.initializeApp(config);

    // var database = firebase.database();

    var map;
    var cleveland;
    var marker;
    var infowindow;
    var service;


    // Initiates Google map
    function initMap() {
        cleveland = { lat: 41.49932, lng: -81.6943605 };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: cleveland,
            styles: [
                {
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#7A309C"
                        }
                    ]
                },
                {
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "color": "#f5f5f5"
                        }
                    ]
                },
                {
                    "featureType": "administrative.land_parcel",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#7A309C"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#5BC0DE"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#e5e5e5"
                        }
                    ]
                },
                {
                    "featureType": "poi.park",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#5BC0DE"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#757575"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#616161"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#9e9e9e"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#eeeeee"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#BCD5DE"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#85C9DE"
                        }
                    ]
                }
            ]
        });
    };

    // Pulls Google Maps results, and loops through results for a given category
    // Runs createMarker function and passes in Google Maps results
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    };
    // Creates a new marker and displays it on the map
    function createMarker(place) {
        var placeLoc = place.geometry.location;
        marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function () {
            console.log(place);
            if (place.vicinity) {
                infowindow.setContent('<div class="infoWindow"><h5 class="center">' + place.name + '</h5><p>' + place.vicinity + '</p><p>' + 'Rating: ' + place.rating + '</p>' + '<button id="save">' + 'Save' + '</button>' + '</div><div id="save-msg"></div>');
            }
            if (place.formatted_address) {
                infowindow.setContent('<div class="infoWindow"><h5 class="center">' + place.name + '</h5><p>' + place.formatted_address + '</p><p>' + 'Rating: ' + place.rating + '</p>' + '<button id="save">' + 'Save' + '</button>' + '</div><div id="save-msg"></div>');
            }
            infowindow.open(map, this);
            $('#save').on('click', function () {
                $('#save-msg').append('Saved!');
                var newName = place.name;
                var newId = place.place_id;
                console.log(newName);
                console.log(newId);
                var savePlace = {
                    name: newName,
                    id: newId,
                    user: uid,
                    recent: false,
                };
                database.ref().push(savePlace);
            });
        });
    };

    // CATEGORY BUTTONS
    // ----------------------------- //
    // Restaurant & Bar Search Button
    $('#restaurants').on('click', function () {
        initMap();
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['restaurant']
        }, callback);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['bar']
        }, callback);
    });

    // Entertainment Search Button
    $('#entertainment').on('click', function () {
        initMap();
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['casino']
        }, callback);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['bowling_alley']
        }, callback);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['stadium']
        }, callback);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['amusement_park']
        }, callback);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['aquarium']
        }, callback);
    });

    // Museum Search Button
    $('#museums').on('click', function () {
        initMap();
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['museum']
        }, callback);
    });

    // Shopping Search Button
    $('#shopping').on('click', function () {
        initMap();
        infowindow = new google.maps.InfoWindow();
        service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['shopping_mall']
        }, callback);
        service.nearbySearch({
            location: cleveland,
            radius: 10000,
            type: ['clothing_store']
        }, callback);
    });

    $('#searchButton').on('click', function () {
        var searchLocation = $("#searchInput").val().trim();
        infowindow = new google.maps.InfoWindow();
        initMap();
        var request = {
            location: cleveland,
            radius: 10000,
            query: searchLocation
        }
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
    });



    // Code to sign in with Google profile via Firebase
    // var user;
    // var uid;

    // function toggleSignIn() {
    //     if (!firebase.auth().currentUser) {
    //         var provider = new firebase.auth.GoogleAuthProvider();
    //         firebase.auth().signInWithPopup(provider).then(function (result) {
    //             var token = result.credential.accessToken;
    //             user = result.user;
    //         }).catch(function (error) {
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             var email = error.email;
    //             var credential = error.credential;
    //             if (errorCode === 'auth/account-exists-with-different-credential') {
    //                 console.log('User already signed up with a different auth provider for that email.');
    //             } else {
    //                 console.error(error);
    //             }
    //         });
    //     } else {
    //         firebase.auth().signOut();
    //     }
    //     document.getElementById('quickstart-sign-in').disabled = true;
    // };

    // function initApp() {
    //     firebase.auth().onAuthStateChanged(function (user) {
    //         if (user) {
    //             // User is signed in.
    //             console.log(user);
    //             uid = user.uid;
    //             document.getElementById('quickstart-sign-in').textContent = 'Sign out';
    //         } else {
    //             document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
    //         }
    //         document.getElementById('quickstart-sign-in').disabled = false;
    //     });
    //     document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
    // };

    // window.onload = function () {
    //     initApp();
    // };

    // firebase.auth().onIdTokenChanged(function (user) {
    //     if (user) {
    //         // User is signed in or token was refreshed.
    //         console.log('User signed in.')
    //     } else {
    //         console.log('No user signed in.');
    //     }
    // });


