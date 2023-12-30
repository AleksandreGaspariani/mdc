let userInfo = [];
let vehicleInfo = [];
let propertyInfo = [];
let callsInfo= [];
let employeeInfo = [];
let casesInfo = [];
let motdInfo = [];

window.addEventListener('beforeunload', function(e){
    init();
})

$(document).ready(()=> {
    prepareForWork();
})

function closeMDC(){

}

function init(){

    localStorage.setItem('state','default');
    localStorage.setItem('username','');
    localStorage.setItem('vehiclePN','');
    localStorage.setItem('property','');
    localStorage.setItem('calls','');
    localStorage.setItem('employees','');
    localStorage.setItem('cases','');
    localStorage.setItem('motd','');

    // remove values

    userInfo = [];
    vehicleInfo = [];
    propertyInfo = [];
    callsInfo= [];
    employeeInfo = [];
    casesInfo = [];
    motdInfo = [];
    
    // load content
    handle(localStorage.getItem('state'));
}

function prepareForWork() {
    if (localStorage.getItem('used') !== null) {
        handle(localStorage.getItem('state'));
    }else {
        // insert defaults for localStorage for not geting undefined type variables.
        init();
    }
}

let vehicle = '';

let data = '{"FullName":"Veronica Woods","Age":35,"Sex":"მდედრობითი","Avatar":null,"PhoneNumber":0,"BornDate":"2023-06-24T00:00:00","IsWanted":true,"WantedText":"მკვლელობა დამამძიმებელ გარემოებებში","Licenses":["#5 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#4 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#3 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#2 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#1 | Driving | Due date 1/1/0001 12:00:00 AM"],"Vehicles":["[MUGALA] Mercedes-Benz CLS63 AMG (საჯარიმო სადგომზე 350$)","[MUGALA2] E39","[UENZBQ] Karin Dilettante (dilettante)","[9K8WFB] Invetero Coquette BlackFin (coquette3)","[TIWDCX] BF Club (club)","[2QMSCJ] Lampadati Komoda (komoda)","[T50XE3] Grotti Carbonizzare (carbonizzare)"],"Properties":["1. Paleto Blvd #2","2. Procopio Dr / Paleto Blvd #7"],"Records":["#1 | ძებნაშია | მკვლელობა დამამძიმებელ გარემოებებში","#2 | დაკავებულია | ყაჩაღობა","#3 | ანულირებულია (Thomas Anderson) | ჯგუფური თავდასხმა"],"Tickets":["#1 | გადაუხდელი | 200$ | imiromtom"],"Notes":["#1 | 12/28/2023 12:55:08 AM | მიეცა სიტყვიერი გაფრთხილება საგზაო მოძრაობის წესების დარღვევაზე"]}';
// localStorage.removeItem('userInfo');
// localStorage.setItem('userInfo', JSON.stringify(data));

function handlePlayerInput() {
    localStorage.setItem('state','player')
    let user = $('#player_input').val();
    localStorage.setItem('username',user);
    onRecievePlayerData(data); // <- pass data here
}

function onRecievePlayerData(data){

    userInfo = [];
    
    if (data.length < 1) {
        load();
    }else{
        let jsonData = JSON.parse(data);    
        userInfo = jsonData;
        load();

        // insert information into fields.
        $('#playerFullName').empty().append(`<p>`+userInfo.FullName+`</p>`);
        $('#playerAge').empty().append(userInfo.Age);
        $('#playerGender').empty().append(userInfo.Sex);
        userInfo.Avatar !== null ? $('#playerProfileImg').attr("src",userInfo.Avatar) : $('#playerProfileImg').attr("src", 'https://p1.hiclipart.com/preview/323/743/633/icon-person-icon-design-symbol-avatar-silhouette-character-cartoon-head-png-clipart.jpg');
        $('#playerPhoneNumber').empty().append(userInfo.PhoneNumber);
        userInfo.IsWanted ? $('#playerWanted').empty().append('იძებნება') && $('#playerWantedText').empty().append(userInfo.WantedText) : '';
        let bornDatePrep = userInfo.BornDate.split('T');
        let bornDate = bornDatePrep[0];
        $('#playerBornDate').empty().append(bornDate);

        userInfo.Licenses.forEach(element => {
            $('#playerLicenses').append(`<li>`+element+`</li>`);
        });

        userInfo.Records.forEach(element => {
            $('#playerRecords').append(`<li>`+element+`</li>`);
        })

        userInfo.Tickets.forEach(element => {
            $('#playerTickets').append(`<li>`+element+`</li>`);
        })

        userInfo.Vehicles.forEach(element => {
            $('#playerVehicles').append(`<li>`+element+`</li>`);
        })

        userInfo.Properties.forEach(element => {
            $('#playerProperties').append(`<li>`+element+`</li>`);
        })

        userInfo.Notes.forEach(element => {
            $('#playerNotes').append(`<li>`+element+`</li>`);
        })
    }
}

function onRecieveVehicleData(data){
    vehicleInfo = [];
    let jsonData = JSON.parse(data);    
    vehicleInfo = jsonData;
}

function onRecievePropertyData(data){
    propertyInfo = [];
    let jsonData = JSON.parse(data);    
    propertyInfo = jsonData;
}

function onRecieveCallsData(data){
    callsInfo = [];
    let jsonData = JSON.parse(data);    
    callsInfo = jsonData;
}

function onRecieveEmployeeData(data){
    employeeInfo = [];
    let jsonData = JSON.parse(data);    
    employeeInfo = jsonData;
}

function onRecieveCasesData(data){
    casesInfo = [];
    let jsonData = JSON.parse(data);    
    casesInfo = jsonData;
}

function onRecieveMotdData(data){
    motdInfo = [];
    let jsonData = JSON.parse(data);    
    motdInfo = jsonData;
}

function handleVehicleInput() {
    let vehicle = $('#vehicle_input').val();
    localStorage.setItem('vehiclePN',vehicle);
    load();
}

function goToMain() {
    init();
}

function load(){
    handle(localStorage.getItem('state'));
}

function home() {
    localStorage.setItem('state','default');
    load();
}

// BUG: it needs two click for writing data
// TODO: retrieve datas and keep it untill player click on go back. before that player will be restricted to insert another name or car plate or anything else.

function handle(param) {
    localStorage.setItem('state',param);
    let state = localStorage.getItem('state');
    switch (state) {
        case 'vehicle':
            let vehicle = localStorage.getItem('vehiclePN');

            if (vehicle == '') {
                $('#content').empty().append(`
                <div class='d-flex align-items-center justify-content-center m-5' style='gap: 5px;'>
                    <label for=''>Find Vehicle by PN</label>
                    <input type='text' placeholder='Type PN' class='form-input' id='vehicle_input' >
                    <span class='material-symbols-outlined m-0 p-0' id='find_vehicle_button' onclick='handleVehicleInput()' style='cursor: pointer'>
                        chevron_right
                    </span>
                </div> 
                `);
            }else {
                $('#content').empty().append(`
                <div class='d-flex justify-content-start align-items-start'>
                <div>
                    <p class='d-flex justify-content-center text-danger align-items-center' onclick='goToMain()' style='cursor:pointer'>
                        Go Back
                        <span class='material-symbols-outlined'>
                            reply
                        </span>
                    </p>
                    
                </div>
                <div class='d-flex align-items-center justify-content-center m-5' style='gap: 5px;'>
                    <label for=''>Find Vehicle by PN</label>
                    <input type='text' placeholder='Type PN' class='form-input' id='vehicle_input' >
                    <span class='material-symbols-outlined m-0 p-0' id='find_vehicle_button' onclick='handleVehicleInput()' style='cursor: pointer'>
                        chevron_right
                    </span>
                </div> 
            </div>
               
            <hr>

            <div class='w-100'>
                <h4>Information: </h4>
                <ul class='m-0 p-0'>
                    <li>Owner: <span class='text-info'>John Doe</span></li>
                    <li>Veh Model: <span>Zenterno</span></li>
                    <li>Veh Plate: <span class='text-info'>`+localStorage.getItem('vehiclePN')+`</span></li>
                    <li>Veh avg price: <span>430.000$</span></li>
                    <li>Insurance: <span class='text-success'>Active </span> <small>untill <span>12/11/2012</span></small></li>
                </ul>
            </div>

            <div class='d-flex w-100'>

                
                <div class='d-flex flex-column w-50'>

                    <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                        <h4 class='mb-3'>Warrants: </h4>
                        <div style='max-height: 70px;' id='records-out-div' class='c_scroll'>
                            <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;'>
                                <li>No active Warrants</li>
                            </ul>
                        </div>
                    </div>

                </div>

                <div class='d-flex flex-column w-50'>

                    <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                        <h4 class='mb-3'>Active Tickets: </h4>
                        <div style='max-height: 70px;' class='c_scroll'>
                            <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;'>
                                <li>Drives thru red light</li>
                            </ul>
                        </div>
                    </div>

                    <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                        <h4 class='mb-3'>Past Tickets: </h4>
                        <div style='max-height: 70px;' class='c_scroll'>
                            <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;'>
                                <li>ღერძულა <small>date: <span>12/11/2012 23:12:34</span></small></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </div>
                `)
            }
        break;  
        case 'vehicle':
            $('#content').empty().append(`
                <div class='border bg-dark w-50 h-25'> 
                    <h1 class='display1'>Not ready yet.</h1>
                </div>
            `);
        break;  
        case 'player':

            // if (localStorage.getItem('username') === null || localStorage.getItem('username') === undefined || localStorage.getItem('username') === '') {
            if (userInfo.length < 1 || userInfo.FullName === null) {
                $('#content').empty().append(`
                <div class='d-flex flex-column align-items-center justify-content-center'>
                    <div class='d-flex justify-content-center align-items-center m-5' style='gap: 5px;'> 
                        <label for=''>Find Player</label>
                        <input type='text' placeholder='Type Name' class='form-input' id='player_input'>
                        <span class='material-symbols-outlined m-0 p-0' id='find_player_button' onclick='handlePlayerInput()'>
                            chevron_right
                        </span>
                    </div>
                </div> 
                `)
            }else { 

                $('#content').empty().append(`

                <div class='d-flex justify-content-start align-items-start'>
                    <div>
                        <p class='d-flex justify-content-start align-items-start text-danger' onclick='goToMain()' style='cursor: pointer'>
                            Go Back
                            <span class='material-symbols-outlined text-danger'>
                                reply
                            </span>
                        </p>
                        <div class='d-flex align-items-center justify-content-center m-5' style='gap: 5px;'>
                            <label for=''>Find Player</label>
                            <input type='text' placeholder='Type Name' class='form-input' id='player_input'>
                            <span class='material-symbols-outlined m-0 p-0' id='find_player_button' onclick='handlePlayerInput()'>
                                chevron_right
                            </span>
                        </div> 
                        <div class='d-flex flex-column justify-content-start align-items-start'>   
                            <p id='playerWanted' class='m-0 p-0 text-danger'></p>
                            <small id='playerWantedText' class='m-0 p-0 text-danger playerWantedText'></small>
                            <img src='https://p1.hiclipart.com/preview/323/743/633/icon-person-icon-design-symbol-avatar-silhouette-character-cartoon-head-png-clipart.jpg' alt='' width='120px' height='auto' id='playerProfileImg'></img>
                        </div>
                        <div class='d-flex flex-column ms-2'>
                            <p style='font-family: VT323, monospace;' id='playerFullName'></p>
                            <div class='d-flex justify-content-start align-items-start'>
                                <p style='font-family: VT323, monospace;' class='p-0 m-0'>Age: </p>
                                <span class='p-0 m-0' id='playerAge'></span>
                            </div>
                            <p style='font-family: VT323, monospace;'>Sex: <span class='m-0 p-0' id='playerGender'></span></p>
                            <p style='font-family: VT323, monospace;'>Phone: <span class='m-0 p-0' id='playerPhoneNumber'></span></p>
                            <p style='font-family: VT323, monospace;'>Born At: <span class='m-0 p-0' id='playerBornDate'></span></p>
                        </div>
                    </div>
                    
                </div>
                   
                <hr>
                <div class='d-flex w-100 position-relative'>

                    <div class='d-flex flex-column w-50'>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Licenses: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-3 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: none;' id='playerLicenses'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Records: </h4>
                            <div style='max-height: 120px;' id='records-out-div' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;' id='playerRecords'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Tickets: </h4>
                            <div style='max-height: 120px;' id='records-out-div' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;' id='playerTickets'>
                                    
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div class='d-flex flex-column w-50'>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Propertys: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;' id='playerProperties'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Vehicles: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;' id='playerVehicles'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Notes: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;' id='playerNotes'>

                                </ul>
                            </div>
                        </div>

                    </div>

                    </div>
                `)
            }
            break;
    
        default:
            $('#content').empty().append(`
                <div class='w-100 h-100 position-relative d-flex flex-column justify-content-center align-items-center'>
                    <img src='imgs/logo.webp' width='250px' height='auto'>
                    <h1>Police Department MDC</h1>
                </div>
            `);
            break;
        }
    
    };