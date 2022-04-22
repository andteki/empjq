const host = 'http://localhost:8000/api/';

$('#loginButton').on('click', event => {
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
        data: authData,
        dataType: 'json',
        success: (res) => {
            let authData = {
                name: res.name,
                token: res.token
            }
            localStorage.setItem('authData', JSON.stringify(authData));
        },
        error: () => {
            console.log('Hiba! A belépés sikertelen!')
        }
    });
}


$('#logoutButton').on('click', () => {
    logout();
});

function logout() {
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

