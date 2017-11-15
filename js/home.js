'use strict';

//Welcomes user and requests name
const username = document.getElementById('Name');

function welcome(){
    const welcomeForm = 'Hey' + ' ' + username;
    return welcomeForm;
}
console.log(welcome());
console.log(username);