const loginButton = document.querySelector('#loginButton');
const logoutButton = document.querySelector('#logoutButton');
const host = 'http://localhost:8000/api/';

loginButton.addEventListener('click', () => {
    login();
});

var login = () => {
    let endpoint = 'login';
    let url = host + endpoint;
    let authData = {
        name: $('#user').val(),
        password: $('#pass').val()
    }
    $.ajax({
        method: 'post',
        url: url,
        data: authData
    })
    .done((res) => {
        console.log(res);
        localStorage.setItem('authData', JSON.stringify(res));
    });
}

logoutButton.addEventListener('click', () => {
    logout();
});

var logout = () => {
    let endpoint = 'logout';
    let url = host + endpoint;
    let authDataJson = localStorage.getItem('authData');
    let authData = JSON.parse(authDataJson);
    let token = authData.token;
    let name = authData.name;

    let loginData = {
        name: name,
        tokenId: token
    }    
    console.log(loginData)
    $.ajax({
        type: 'post',
        url: url,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        data: loginData
    })
    .done((res) => {
        console.log(res);
        localStorage.removeItem('authData');
        alert('Kilépve');

    });
    
}