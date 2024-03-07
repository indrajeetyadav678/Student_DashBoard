
function register() {
    let imgs = document.getElementById('phote').value;
    let fname1 = document.getElementById('fname').value;
    let username1 = document.getElementById('username1').value;
    let number1 = document.getElementById('number').value;
    let pass1 = document.getElementById('password1').value;
    let cpass1 = document.getElementById('cpassword1').value;
    let role1 = document.getElementById('role').value;

    let regobject = {
        photo_url: imgs,
        names: fname1,
        user_id: username1,
        mobile_number: number1,
        password: pass1,
        confirm_password: cpass1,
        role: role1
    };

    if (role1 === 'Teacher' || role1 === 'Student') {
        fetch('http://localhost:3000/Registration', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(regobject)
        }).then(alert("Registration successfully done"))
    }

    else if (role1 === 'nothing') {
        alert("Please Choose Your Role")
    }
}

// ======================= login page ====================================================

// let userid_find = "";
// let password_find = "";
// let datastore2 = "";
// let repond2 = "";
// let aftertrim = "";

async function login() {
    let username2 = document.getElementById('username').value;
    let pass2 = document.getElementById('password').value;

    let aftertrim = username2.trim();

    let datastore2 = await fetch('http://localhost:3000/Registration');

    let repond2 = await datastore2.json();

    let user_find = repond2.find(items => (items.user_id));
    let pass_find = repond2.find(items => (items.password));

    if (username2 === "") {
        let user_msg = document.getElementById('username_error');
        user_msg.style.display = "block";
        document.getElementById('username_error').style.backgroundImage = "url('https://www.shutterstock.com/image-illustration/wrong-cross-symbol-isolated-3d-260nw-1074911219.jpg')"
        document.getElementById('username').style.border = "2px solid red";
        // alert("Please enter your Username")
    }

    else if (user_find !== username2) {
        document.getElementById('username_error').style.display = "block";
        document.getElementById('username_error').style.backgroundImage = "url('https://www.shutterstock.com/image-illustration/wrong-cross-symbol-isolated-3d-260nw-1074911219.jpg')"
        document.getElementById('username').style.border = "2px solid red";
        document.getElementById('username').innerHTML = "";
        document.getElementById('username').focus();
    }

    else if (user_find === username2) {
        document.getElementById('username_error').style.display = "block";
        document.getElementById('username_error').style.backgroundImage = "url('https://thumbs.dreamstime.com/b/correct-symbol-green-isolated-white-background-79321221.jpg')"
        document.getElementById('username_error').style.border = "2px solid green";
        document.getElementById('username').style.border = "2px solid green";
    }

    else if (pass2 === "") {
        let pass_msg = document.getElementById('password_error');
        pass_msg.style.display = "block";
        document.getElementById('password_error').style.backgroundImage = "url('https://www.shutterstock.com/image-illustration/wrong-cross-symbol-isolated-3d-260nw-1074911219.jpg')"
        document.getElementById('password').style.border = "2px solid red";
        alert("Please enter your Username")
    }

    else if (pass_find != pass2) {

        document.getElementById('password_error').style.display = "block";
        document.getElementById('password_error').style.backgroundImage = "url('https://www.shutterstock.com/image-illustration/wrong-cross-symbol-isolated-3d-260nw-1074911219.jpg')"
        document.getElementById('password').style.border = "2px solid red";
        document.getElementById('password').innerHTML = "";
        document.getElementById('password').focus();
    }

    else if (username2 === user_find && pass2 === user_find) {
        window.open("admindeskboard.html")
    }
    else {
        alert("username and password does not exist")
    }

}

async function log() {
    let username3 = document.getElementById('username').value;
    let pass3 = document.getElementById('password').value;

    let aftertrim = username3.trim();

    let datastore = await fetch('http://localhost:3000/Registration');

    let repond = await datastore.json();

    let loginbag = {
        user_id: aftertrim,
        pass2: pass3
    }

    fetch('http://localhost:3000/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginbag)
    })
}


// ============================= Admindeskboard page javascript ==========================

// ================ side navbar js section =============================
function admanuclose() {
    document.getElementById('baricon_close').style.display = "block";
    document.getElementById('baricon_open').style.display = "none";
    document.querySelector('#smaladminmanu').style.display = "block";
    document.querySelector('#disknavbar').style.display = "none";
    document.getElementById('user_name').style.display = "none";
    document.getElementById('profile_image1').style.display = "block";
}

function admanuopen() {
    document.getElementById('baricon_open').style.display = "block";
    document.getElementById('baricon_close').style.display = "none";
    document.querySelector('#smaladminmanu').style.display = "none";
    document.querySelector('#disknavbar').style.display = "block";
    document.getElementById('profile_image1').style.display = "none";
    document.getElementById('user_name').style.display = "block";

}

// ================= end of side navbar ===============================

async function ddata() {
    let data = await fetch('http://localhost:3000/Registration');
    let respond = await data.json();
    // let stufilter = respond.filter(items => items.role === 'Student');
    // let stfilter = respond.filter(items => items.role === 'Teacher');
    document.getElementById('records').innerHTML = respond.map(
        items => `
        <table id="fetchdata">
        <tr>
        <td id="p_img"><img src="${items.photo_url}" id="pro_img"></td>
        <td id="name_td">${items.names}</td>
        <td id="user_td">${items.user_id}</td>
        <td id="number_td">${items.mobile_number}</td>
        <td id="role_td">${items.role}</td>
        <td id="update_td"><button onclick="updatdata()">UPDATE</button></td>
        <td id="delete_td"><button onclick="deletdata()">Delete</button></td>
        </tr>
        </table>`).join(" ")

}

function updatdata(){

}

async function recordsdata(arg) {
    if (arg === "all") {
        let data = await fetch('http://localhost:3000/Registration');
        let respond = await data.json();
        // let stufilter = respond.filter(items => items.role === 'Student');
        // let stfilter = respond.filter(items => items.role === 'Teacher');
        document.getElementById('records').innerHTML = respond.map(
            items => `
            <table id="fetchdata">
            <tr>
            <td id="p_img"><img src="${items.photo_url}" id="pro_img"></td>
            <td id="name_td">${items.names}</td>
            <td id="user_td">${items.user_id}</td>
            <td id="number_td">${items.mobile_number}</td>
            <td id="role_td">${items.role}</td>
            <td id="update_td"><button onclick="">UPDATE</button></td>
            <td id="delete_td"><button onclick="">Delete</button></td>
            </tr>
            </table>`).join(" ")
    }
    else if (arg === "Student") {
        let data = await fetch('http://localhost:3000/Registration');
        let respond = await data.json();
        let stufilter = respond.filter(items => items.role === 'Student');
        // let stfilter = respond.filter(items => items.role === 'Teacher');
        document.getElementById('records').innerHTML = stufilter.map(
            items => `
            <table id="fetchdata">
            <tr>
            <td id="p_img"><img src="${items.photo_url}" id="pro_img"></td>
            <td id="name_td">${items.names}</td>
            <td id="user_td">${items.user_id}</td>
            <td id="number_td">${items.mobile_number}</td>
            <td id="role_td">${items.role}</td>
            <td id="update_td"><button onclick="">UPDATE</button></td>
            <td id="delete_td"><button onclick="">Delete</button></td>
            </tr>
            </table>`).join(" ")
    }

    else if (arg === "Teacher") {
        let data = await fetch('http://localhost:3000/Registration');
        let respond = await data.json();
        // let stufilter = respond.filter(items => items.role === 'Student');
        let stfilter = respond.filter(items => items.role === 'Teacher');
        document.getElementById('records').innerHTML = stfilter.map(
            items => `
            <table id="fetchdata">
            <tr>
            <td id="p_img"><img src="${items.photo_url}" id="pro_img"></td>
            <td id="name_td">${items.names}</td>
            <td id="user_td">${items.user_id}</td>
            <td id="number_td">${items.mobile_number}</td>
            <td id="role_td">${items.role}</td>
            <td id="update_td"><button onclick="">UPDATE</button></td>
            <td id="delete_td"><button onclick="">Delete</button></td>
            </tr>
            </table>`).join(" ")
    }

    else {
        alert("invalid click")
    }
}

// ====================== searching method code =================================================

async function finder() {
    let settext = document.getElementById('search_box').value;
    let searby = document.getElementById('Searchby').value;
    let data = await fetch('http://localhost:3000/Registration');
    let respond = await data.json();
    if (searby === "nam") {
        let found = respond.filter(items => items.names === settext);
        document.getElementById('records').innerHTML = found.map(items => `
        <table id="fetchdata">
        <tr>
        <td id="p_img"><img src="${items.photo_url}" id="pro_img"></td>
        <td id="name_td">${items.names}</td>
        <td id="user_td">${items.user_id}</td>
        <td id="number_td">${items.mobile_number}</td>
        <td id="role_td">${items.role}</td>
        <td id="update_td"><button onclick="">UPDATE</button></td>
        <td id="delete_td"><button onclick="">Delete</button></td>
        </tr>
        </table>`).join(" ")
    }

    else if (searby === "user_ID") {
        let found = respond.filter(items => items.user_id === settext);
        document.getElementById('records').innerHTML = found.map(items => `
        <table id="fetchdata">
        <tr>
        <td id="p_img"><img src="${items.photo_url}" id="pro_img"></td>
        <td id="name_td">${items.names}</td>
        <td id="user_td">${items.user_id}</td>
        <td id="number_td">${items.mobile_number}</td>
        <td id="role_td">${items.role}</td>
        <td id="update_td"><button onclick="">UPDATE</button></td>
        <td id="delete_td"><button onclick="">Delete</button></td>
        </tr>
        </table>`).join(" ")
    }

    else if (searby === "mobile_number") {
        let found = respond.filter(items => items.mobile_number === settext);
        document.getElementById('records').innerHTML = found.map(items => `
        <table id="fetchdata">
        <tr>
        <td id="p_img"><img src="${items.photo_url}" id="pro_img"></td>
        <td id="name_td">${items.names}</td>
        <td id="user_td">${items.user_id}</td>
        <td id="number_td">${items.mobile_number}</td>
        <td id="role_td">${items.role}</td>
        <td id="update_td"><button onclick="">UPDATE</button></td>
        <td id="delete_td"><button onclick="">Delete</button></td>
        </tr>
        </table>`).join(" ")
    }
    else if (searby === "none") {
        alert("please select searching option")
    }

}

// ============================= deskboard option content ================================


async function deskcontent() {
    document.getElementById('deskboard').style.display = "block";
    document.getElementById('record_manubtn').style.display = "none";
    let data = await fetch('http://localhost:3000/Registration');
    let respond = await data.json();

    // document.getElementById('total').innerHTML = respond.length;
    let studnumber = respond.filter(items => items.role === 'Student')
    // document.getElementById('total_student').innerHTML = studnumber.length;
    let teachnumber = respond.filter(items => items.role === 'Teacher')
    // document.getElementById('total_teacher').innerHTML = teachnumber.length;
    let start = 0;
    let start1 = 0;
    let start2 = 0;
    setInterval(run1, 700);
    function run1() {
        if (start <= studnumber.length) {
            let a = document.getElementById('total_student');
            a.innerHTML = start;
            start++;
        }
        else {
            clearInterval();
        }
    }
    setInterval(run2, 700);
    function run2() {
        if (start1 <= teachnumber.length) {
            let a1 = document.getElementById('total_teacher');
            a1.innerHTML = start1;
            start1++;
        }
    }

    setInterval(run3, 700);
    function run3() {
        if (start2 <= respond.length) {
            let a2 = document.getElementById('total');
            a2.innerHTML = start2;
            start2++;
        }
    }
}

function chal() {
    let start = 0;
    setInterval(run, 150);
    function run() {
        if (start <= 120) {
            let a = document.getElementById('show');
            a.innerHTML = start;
            start++;
        }

        else {
            clearInterval();
        }
    }
}