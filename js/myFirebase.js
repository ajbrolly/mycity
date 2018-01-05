var config = {
    apiKey: 'AIzaSyDMqNQ9pA7C5sKkMHm8U6BAdExqtprHAwE',
    authDomain: 'mycity-188015.firebaseapp.com',
    databaseURL: 'https://mycity-188015.firebaseio.com',
    projectId: 'mycity-188015',
    storageBucket: 'mycity-188015.appspot.com',
    messagingSenderId: '986949142496'
};

firebase.initializeApp(config);

var database = firebase.database();

var databaseKeys = [];

$(document).ready(function () {

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

    // var databaseKeys = [];
    // var count = 0;

    // var map;
    // var cleveland;
    // var marker;
    // var infowindow;
    // var service;

    // Code to sign in with Google profile via Firebase
    var user;
    var uid;

    function toggleSignIn() {
        if (!firebase.auth().currentUser) {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function (result) {
                var token = result.credential.accessToken;
                user = result.user;
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                if (errorCode === 'auth/account-exists-with-different-credential') {
                    console.log('User already signed up with a different auth provider for that email.');
                } else {
                    console.error(error);
                }
            });
        } else {
            firebase.auth().signOut();
        }
        document.getElementsByClassName('quickstart-sign-in').disabled = true;
        document.getElementsByClassName('quickstart-mobile').disabled = true;

    };

    function initApp() {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                console.log(user);
                uid = user.uid;
                document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                document.getElementById('quickstart-mobile').textContent = 'Sign out';

            } else {
                document.getElementById('quickstart-sign-in').textContent = 'Sign in with Google';
                document.getElementById('quickstart-mobile').textContent = 'Sign in with Google';

            }
            document.getElementById('quickstart-sign-in').disabled = false;
            document.getElementById('quickstart-mobile').disabled = false;

        });
        document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
        document.getElementById('quickstart-mobile').addEventListener('click', toggleSignIn, false);

    };

    initApp();

    firebase.auth().onIdTokenChanged(function (user) {
        if (user) {
            // User is signed in or token was refreshed.
            console.log('User signed in.')
        } else {
            console.log('No user signed in.');
        }
    });


    // Profile Page
    // firebase.auth().onIdTokenChanged(function (user) {
    //     if (user) {
    //         // User is signed in or token was refreshed.
    //         console.log('User signed in.');
    //         // upcomingEvents();
    //         $('#profHowTo').empty();
    //         $('#login-message').empty();
    //         $('#profile-page').show();
    //         $('#user-name').append(', ' + user.displayName);
    //         $('#prof-pic').append('<img src="' + user.photoURL + '" alt="Profile Picture" />');
    //         $('#favorites').empty();
    //         database.ref().on('child_added', function (snapshot) {
    //             var savedPlace = snapshot.val();
    //             var favePlace = savedPlace.id;
    //             var recent = savedPlace.recent;
    //             var key = snapshot.key;
    //             console.log('Key: ' + key + ' Location: ' + favePlace);
    //             databaseKeys.push(key);
    //             console.log(databaseKeys);
    //             if (uid === savedPlace.user) {
    //                 console.log(savedPlace);
    //                 if (recent === false) {
    //                     logPlaceDetails(favePlace);
    //                 } else if (recent === true) {
    //                     logRecentDetails(favePlace);
    //                 }
    //             }
    //         });
    //     } else {
    //         console.log('No user signed in.');
    //         $('#profile-page').hide();
    //         $('#user-name').empty();
    //         $('#prof-pic').empty();
    //         $('#favorites').empty();
    //         var noUser = ('<h5>Sign in to access your profile page.</h5>');
    //         $('#login-message').append(noUser);
    //     }
    // });


});


