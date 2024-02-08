let userInfo = [];
let vehicleInfo = [];
let propertyInfo = [];
let callsInfo= [];
let employeeInfo = [];
let casesInfo = [];
let motdInfo = [];

let state = 'default';

window.addEventListener('beforeunload', function(e){
    init();
})

$(document).ready(()=> {
    init();
})

function closeFromGame(){
    // mp.trigger('hideMDC'); //testirebisas gadaxaze es metodi
}

function closeMDC(){
    state = 'default';
    $('#MDC-display').addClass('d-none').css('opacity', 0);
}

function openMDC(){
    state = 'default';
    $('#MDC-display').removeClass('d-none').css('opacity', 100);
}

function init(){

    state = 'default';
    // remove values

    userInfo = [];
    vehicleInfo = [];
    propertyInfo = [];
    callsInfo= [];
    employeeInfo = [];
    casesInfo = [];
    motdInfo = [];
    
    // load content
    handle(state);
}

// function prepareForWork() {
//     if (localStorage.getItem('used') !== null) {
//         handle(localStorage.getItem('state'));
//     }else {
//         // insert defaults for localStorage for not geting undefined type variables.
//         init();
//     }
// }

//** original purposes

// let playerData = [];
// let vehicleData = [];
// let propertyData = [];

//** testing purposes
let playerData = '{"FullName":"Veronica Woods","Age":35,"Sex":"მდედრობითი","Avatar":null,"PhoneNumber":0,"BornDate":"2023-06-24T00:00:00","IsWanted":true,"WantedText":"მკვლელობა დამამძიმებელ გარემოებებში","Licenses":["#5 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#4 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#3 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#2 | Weapon License - FPM | Due date 1/1/0001 12:00:00 AM","#1 | Driving | Due date 1/1/0001 12:00:00 AM"],"Vehicles":["[MUGALA] Mercedes-Benz CLS63 AMG (საჯარიმო სადგომზე 350$)","[MUGALA2] E39","[UENZBQ] Karin Dilettante (dilettante)","[9K8WFB] Invetero Coquette BlackFin (coquette3)","[TIWDCX] BF Club (club)","[2QMSCJ] Lampadati Komoda (komoda)","[T50XE3] Grotti Carbonizzare (carbonizzare)"],"Properties":["1. Paleto Blvd #2","2. Procopio Dr / Paleto Blvd #7"],"Records":["#1 | ძებნაშია | მკვლელობა დამამძიმებელ გარემოებებში","#2 | დაკავებულია | ყაჩაღობა","#3 | ანულირებულია (Thomas Anderson) | ჯგუფური თავდასხმა"],"Tickets":["#1 | გადაუხდელი | 200$ | imiromtom"],"Notes":["#1 | 12/28/2023 12:55:08 AM | მიეცა სიტყვიერი გაფრთხილება საგზაო მოძრაობის წესების დარღვევაზე"]}';
let vehicleData = '{"VINCode":"VIN05126694","OwnerName":"Veronica Woods","VehicleName":"Mercedes-Benz CLS63 AMG","VehicleCodeName":"cls2015","LicensePlate":"MUGALA","ColorCode1":0,"ColorCode2":0,"ImpoundPrice":350,"ImpoundReason":"სატესტო","PreviousOwners":["1. Pearce Jackson - 8/14/2019 6:02:06 PM","2. Jonathan Woods - 12/1/2016 6:01:44 PM"],"AssignedTo":[]}';
let propertyData = '{"OwnerName":"Veronica Woods","Address":"Paleto Blvd #2","PreviousOwners":["1. Thomas Anderson - 1/8/2016 3:05:04 PM","2. Jonathan Woods - 1/11/2024 3:05:04 PM","3. Thomas Anderson - 1/8/2016 3:05:04 PM","4. Jonathan Woods - 1/11/2024 3:05:04 PM","5. Jonathan Woods - 1/11/2024 3:05:04 PM","6. Thomas Anderson - 1/8/2016 3:05:04 PM","7. Jonathan Woods - 1/11/2024 3:05:04 PM"]}';
let callsData = '[{"ID":4,"Status":1,"Caller":"Andrew Garfield","CallerNumber":550612,"Location":"Somewhere in New York","Date":"26/01/2020 18:31:05 (( 26/01/2024 21:32:03 ))","CallResponders":[{"Unit":"L201","OfficerNames":"Bondo Gaoxrebuli"},{"Unit":"A204","OfficerNames":"Jonathan Woods, Veronica Woods"}],"CallButtons":["Join","Respond"]},{"ID":3,"Status":0,"Caller":"Jonathan Woods","CallerNumber":551267,"Location":"Paleto Blvd #44","Date":"26/01/2020 18:31:05 (( 26/01/2024 21:32:03 ))","CallResponders":[],"CallButtons":["Leave","Close"]}]';


function handlePlayerInput() {
    state = 'player'
    let user = $('#player_input').val(); // -> user name which was requested.
    // mp.trigger('MDC_RequestPlayerData', user); //testirebisas gadaxaze es method
    onRecievePlayerData(playerData); // <- pass data here
}

function onRecievePlayerData(data){

    playerData = data;
    userInfo = [];
    
    if (data.length > 1) {
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
    }else{
        load();
    }
}

function handleVehicleInput() {
    state = 'vehicle';
    let vehicle = $('#vehicle_input').val(); // -> vehicle license plate which was requested.
    // mp.trigger('MDC_RequestVehicleData', vehicle); //testirebisas gadaxaze es metodi
    onRecieveVehicleData(vehicleData); // <- pass data here
}

function onRecieveVehicleData(data){
    vehicleData = data;
    vehicleInfo = [];

    if (data.length < 1) {
        load();
    }else{
        let jsonData = JSON.parse(data);    
        vehicleInfo = jsonData;
        load();

        // insert Data.
        $('#vehicleVIN').append(vehicleInfo.VINCode);
        $('#vehicleOwner').append(vehicleInfo.OwnerName);
        $('#vehicleName').append(vehicleInfo.VehicleName);
        $('#vehicleCodeName').append(vehicleInfo.VehicleCodeName);
        $('#vehiclePlate').append(vehicleInfo.LicensePlate);
        $('#vehicleColor1').append(vehicleInfo.ColorCode1);
        $('#vehicleColor2').append(vehicleInfo.ColorCode2);

        if (vehicleInfo.ImpoundPrice > 0) {
            $('#vehicleImpound').append(`
                <small class='m-0 p-0 text-danger'>ავტომობილი იმყოფება საჯარიმოზე.</small>
                <p class='m-0 p-0 text-info'>საჯარიმოზე გადაყვანის მიზეზი: `+vehicleInfo.ImpoundReason+` | `+vehicleInfo.ImpoundPrice+`$</p>
            `)
        // }else {
        //     $('#vehicleImpound').append(`
        //         <p class='m-0 p-0 text-info'>ავტომობილი არ იმყოფება/არ უნდა იმყოფებოდეს საჯარიმოზე.</p>
        //     `)
        }

        vehicleInfo.PreviousOwners.forEach(element => {
            $('#vehiclePreviousOwners').append(`
                <li class='text-info'>`+element+`</li>
            `);
        });

        vehicleInfo.AssignedTo.forEach(element => {
            $('#vehicleAssignedTo').append(`
                <li class='text-info'>`+element+`</li>
            `);
        });

    }
}

function handlePropertyInput() {
    state = 'property';
    let propertyAddress = $('#property_input').val(); // -> vehicle license plate which was requested.
    // mp.trigger('MDC_RequestPropertyData', propertyAddress); //testirebisas gadaxaze es metodi
    onRecievePropertyData(propertyData); // <- pass data here
}

function onRecievePropertyData(data){
    propertyData = data;
    propertyInfo = [];
    
    if (data.length < 1) {
        load();
    }else{
        let jsonData = JSON.parse(data);    
        propertyInfo = jsonData;
        load();

        // insert Data.

        $('#propertyOwner').append(propertyInfo.OwnerName);
        $('#propertyAddress').append(propertyInfo.Address);

        propertyInfo.PreviousOwners.forEach(element => {
            $('#propertyPreviousOwners').append(`
                <li class='text-info'>`+element+`</li>
            `);
        });
    }
}

function markPropertyLocation() {
    console.log(propertyInfo.Address); // address which supposted to be writen in gps and locate it.
}

function handleCallsInput() {
    state = 'calls';
    // mp.trigger('MDC_RequestPropertyData', propertyAddress); //testirebisas gadaxaze es metodi
    onRecieveCallsData(callsData); // <- pass data here
}

function onRecieveCallsData(data){
    callsData = data;
    callsInfo = [];

    if (data.length < 1) {
        load();
    }else {
        let jsonData = JSON.parse(data);    
        callsInfo = jsonData;
        load();
        
        appendRemodalForCalls();

        callsInfo.forEach(element => {
            let tempId = element.ID;
            let buttons = element.CallButtons;
            $('#callsTab').append(`
                <div class='ps-4 w-auto call-item d-flex flex-column justify-content-start align-items-start rounded-2' ondblclick='currentCallInformation(`+tempId+`)'> 
                    <p class='text-info'>Number Owner: <span class='call-number-owner'>`+element.Caller+`</span></p>
                    <p class='text-info'>From: <span class='call-from'>`+element.CallerNumber+`</span></p>
                    <p class='text-info'>Location <span class='call-location'>`+element.Location+`</span></p>
                    <p class='text-info'>Status: <span class='call-status'>`+element.Status+`</span></p>
                    <small class='text-info'>Date: <span class='c'>`+element.Date+`</span> </small>
                    <div class='position-relative d-flex flex-column justify-content-start align-items-start'>
                        <small>Call responds</small>
                        <div class='d-flex w-100 flex-wrap callRespond-`+tempId+`' style='gap: 10px;'>
                            
                        </div>
                    </div>

                    <div class='d-flex mt-3 w-100 justify-content-between align-items-center' id='callButtonsArea`+tempId+`'>
                        
                    </div>

                </div>
            `);

            if (element.CallResponders.length > 0) {
                element.CallResponders.forEach(element => {
                    
                    $('.callRespond-'+tempId+'').append(`
                        <span class='btn py-0 px-3 rounded-3 c_badge d-flex flex-column justify-content-start align-items-start'>
                            <p class='m-0 p-0'>`+element.Unit+`</p>
                        </span>
                    `)
                });
            }else {
                $('.callRespond-'+tempId+'').append(`
                    <span class='btn py-0 px-3 rounded-3 c_badge d-flex flex-column justify-content-start align-items-start'>
                        Theres no responders yet.
                    </span>
                `)
            }

            for (let i = 0; i < buttons.length; i++) {
                const buttonName = buttons[i];
                $('#callButtonsArea'+tempId).append(`
                    <p class='btn btn-outline-info py-0 px-2 call-respond' onclick="respondOnCall(`+tempId+`,'`+buttonName+`')">`+buttonName+`</p>
                `)
            };
        });

    }
}

function respondOnCall(id, button) {

    console.log('it`s '+id+' call, and button which was clicked is: '+button);

}

function appendRemodalForCalls(){
    $('#callsTab').append(`
        <div class="w-75 h-75 position-absolute p-2 m-0 c_scroll d-none" style="right: 10%; top: 10%;" id="remodal">
            <!-- Close Tab -->
            <div class="d-flex justify-content-end align-items-center border-bottom">
                <span class="material-symbols-outlined" onclick="closeRemodal()" style="cursor: pointer;">
                    close
                </span>
            </div>
            <!--  -->

            <div class="d-flex flex-column text-white p-5" id='remodalInfoTab'>
            
            </div>
        </div>
    `)
}

function currentCallInformation(callNum) {
    // Collect information
    // MP.trigger('MDC_test',callNum);

    let data = '{"ID":4,"Status":1,"Caller":"Andrew Garfield","CallerNumber":550612,"Location":"Somewhere in New York","Date":"26/01/2020 18:31:05 (( 26/01/2024 21:32:03 ))","CallResponders":[{"Unit":"L201","OfficerNames":"Bondo Gaoxrebuli"},{"Unit":"A204","OfficerNames":"Jonathan Woods, Veronica Woods"}],"CallNotes":[{"Name":"Andrew Garfield","Text":"vigaca ragacas afuchebs ubanshi pirvel sartulze","Date":"26/01/2020 19:11:45 (( 26/01/2024 22:12:19 ))"},{"Name":"Jonathan Woods","Text":"adgilze mivedit ver vipovet caller, verc damrgvevi, tumca sheinishna shavi infernus misvlisas romelic samxretit daidzra","Date":"26/01/2020 19:12:25 (( 26/01/2024 22:13:08 ))"}]}'; // აქ

    insertCurrentCallInformation(data);
}

function insertCurrentCallInformation(data){

    let tempData = JSON.parse(data);

    $('#remodalInfoTab').empty().append(`
        <small>Date: `+tempData.Date+`</small>
        <p>Caller Number: <span>`+tempData.CallerNumber+`</span></p>
        <p>Number Owner: <span>`+tempData.Caller+`</span></p>
        <p>Caller Location: <span>`+tempData.Location+`</span></p>
        <p>Status: <span>`+tempData.Status+`</span></p>
        <p>Call responds</p>
        <div class='d-flex w-100 flex-wrap remodalRespondersList' style='font-size: 18px !important; gap: 10px;overflow-x: auto;'>

        </div>
        <hr>
        <p>Description: </p>
        <small>`+tempData.CallNotes[0].Text+`</small>
        <hr>
        <p>Text respond on calls</p>
        <div class="h-auto px-3 py-1 w-100 d-flex flex-column justify-content-start align-items-start commentList c_scroll">
            
        </div>
        <!-- Write Comment -->
        <div class="w-100">
            <textarea name="comment" id="writenComment" cols="60" class="w-100 h-25 c_scroll" placeholder="Type your comment here"></textarea>
            <button class="btn btn-outline-light w-100" onclick="sendComment(`+tempData.ID+`)">Send</button>
        </div>
        <!--  -->
    `);

    tempData.CallResponders.forEach(element => {
        $('.remodalRespondersList').append(`
            <span class='btn py-0 px-3 rounded-3 c_badge d-flex flex-column justify-content-start align-items-start'>
                <p class='m-0 p-0'>`+element.Unit+`</p>
                <small class='m-0 p-0'>`+element.OfficerNames+`</small>
            </span>
        `);
    })

    for (let index = 1; index < tempData.CallNotes.length; index++) {
        const element = tempData.CallNotes[index];

        $('.commentList').append(`
            <div class='comment d-flex flex-column'>
                <div class='d-flex justify-content-start align-items-center' style='gap: 15px;'>
                    <p class='responderName'>`+element.Name+`</p>
                    <small>`+element.Date+`</small>
                </div>
                <p>`+element.Text+`</p>
            </div>
        `);
    }

    $('#remodal').toggleClass('d-none');

}

function closeRemodal(){
    $('#remodal').toggleClass('d-none');
}

function sendComment(id){

    let forCallNum = id;
    let comment = $('#writenComment').val();
    console.log(comment);
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


function goToMain() {
    init();
}

function load(){
    handle(state);
}

function home() {
    state = 'default';
    load();
}

function handle(param) {
    state = param;
    
    switch (state) {
        case 'vehicle':

            if (vehicleInfo.length < 1 || vehicleInfo.VINCode === null || vehicleInfo.VINCode === undefined) {
                $('#content').empty().append(`
                <div class='d-flex flex-column align-items-center justify-content-center m-5' style='gap: 5px;'>
                    <label for=''>Find Vehicle by PN</label>
                    <div class='d-flex align-items-center'> 
                        <input type='text' placeholder='Type PN' class='form-input form-control' id='vehicle_input' >
                        <span class='material-symbols-outlined m-0 p-0' id='find_vehicle_button' onclick='handleVehicleInput()' style='cursor: pointer'>
                            chevron_right
                        </span>
                    </div>
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
                <div class='d-flex flex-column align-items-start justify-content-start m-5 ms-0'>
                    <label for=''>Find Vehicle by PN</label>
                    <div class='d-flex align-items-center'> 
                        <input type='text' placeholder='Type PN' class='form-input form-control' id='vehicle_input' >
                        <span class='material-symbols-outlined m-0 p-0' id='find_vehicle_button' onclick='handleVehicleInput()' style='cursor: pointer'>
                            chevron_right
                        </span>
                    </div>
                </div> 
            </div>
               
            <hr>

            <div class='w-100'>
                <h4>Information: </h4>
                <ul class='m-0 p-0'>
                    <li>Vehicle VIN Code: <span class='text-info' id='vehicleVIN'></span></li>
                    <li>Owner: <span class='text-info' id='vehicleOwner'></span></li>
                    <li>Veh Name: <span class='text-info' id='vehicleName'></span></li>
                    <li>Veh Code Name: <span class='text-info' id='vehicleCodeName'></span></li>
                    <li>Veh Plate: <span class='text-info' id='vehiclePlate'></span></li>
                    <li>Car Color: <span class='text-info' id='vehicleColor1'></span> | <span class='text-info' id='vehicleColor2'></span></li>
                </ul>
            </div>

            <div class='d-flex w-100'>

                
                <div class='d-flex flex-column w-50'>

                    <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                        <h4 class='mb-3'>Previous Owners: </h4>
                        <div style='max-height: 70px;' id='records-out-div' class='c_scroll'>
                            <ul class='m-0 p-0 ms-2 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: none;' id='vehiclePreviousOwners'>
                                
                            </ul>
                        </div>
                    </div>

                </div>

                <div class='d-flex flex-column w-50'>

                    <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                        <h4 class='mb-3'>Impound Information: </h4>
                        <div style='max-height: 120px;' class='c_scroll'>
                            <ul class='m-0 p-0 ms-2 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;' id='vehicleImpound'>

                            </ul>
                        </div>
                    </div>

                    <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                        <h4 class='mb-3'>Vehicle assigned to : </h4>
                        <div style='max-height: 120px;' class='c_scroll'>
                            <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;' id='vehicleAssignedTo'>
                                
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
                    <div class='d-flex flex-column justify-content-center align-items-center m-5 my-2' style='gap: 5px;'> 
                        <label for=''>Find Player</label>
                        <div class='d-flex align-items-center'> 
                            <input type='text' placeholder='Type Name' class='form-input form-control' id='player_input'>
                            <span class='material-symbols-outlined m-0 p-0' id='find_player_button' onclick='handlePlayerInput()'>
                                chevron_right
                            </span>
                        </div>
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
                        <div class='d-flex flex-column align-items-start justify-content-center m-5 my-3' style='gap: 5px;'>
                            <label for=''>Find Player</label>
                            <div class='d-flex align-items-center'> 
                                <input type='text' placeholder='Type Name' class='form-input form-control' id='player_input'>
                                <span class='material-symbols-outlined m-0 p-0' id='find_player_button' onclick='handlePlayerInput()'>
                                    chevron_right
                                </span>
                            </div>
                        </div> 
                        <div class='d-flex flex-column justify-content-start align-items-start'>   
                            <p id='playerWanted' class='m-0 p-0 text-danger'></p>
                            <small id='playerWantedText' class='m-0 p-0 text-danger playerWantedText'></small>
                            <img src='https://p1.hiclipart.com/preview/323/743/633/icon-person-icon-design-symbol-avatar-silhouette-character-cartoon-head-png-clipart.jpg' alt='' width='120px' height='auto' id='playerProfileImg'></img>
                        </div>
                        <div class='d-flex flex-column ms-2'>
                            <p style='font-family: VT323, monospace;' id='playerFullName' class='text-info'></p>
                            <div class='d-flex justify-content-start align-items-start'>
                                <p style='font-family: VT323, monospace;' class='p-0 m-0'>Age: </p>
                                <span class='p-0 m-0 text-info' id='playerAge'></span>
                            </div>
                            <p style='font-family: VT323, monospace;'>Sex: <span class='m-0 p-0 text-info' id='playerGender'></span></p>
                            <p style='font-family: VT323, monospace;'>Phone: <span class='m-0 p-0 text-info' id='playerPhoneNumber'></span></p>
                            <p style='font-family: VT323, monospace;'>Born At: <span class='m-0 p-0 text-info' id='playerBornDate'></span></p>
                        </div>
                    </div>
                    
                </div>
                   
                <hr>
                <div class='d-flex w-100 position-relative'>

                    <div class='d-flex flex-column w-50'>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Licenses: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-2 d-flex flex-column justify-content-start align-items-start text-info' style='width: 300px; list-style-type: none;' id='playerLicenses'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Records: </h4>
                            <div style='max-height: 120px;' id='records-out-div' class='c_scroll'>
                                <ul class='m-0 p-0 ms-2 d-flex flex-column text-info justify-content-start align-items-start' style='width: 300px; list-style-type: none;' id='playerRecords'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Tickets: </h4>
                            <div style='max-height: 120px;' id='records-out-div' class='c_scroll'>
                                <ul class='m-0 p-0 ms-2 d-flex flex-column text-info justify-content-start align-items-start' style='width: 300px; list-style-type: none;' id='playerTickets'>
                                    
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div class='d-flex flex-column w-50'>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Propertys: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-2 d-flex text-info flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: none;' id='playerProperties'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Vehicles: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-4 d-flex text-info flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal;' id='playerVehicles'>
                                    
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Notes: </h4>
                            <div style='max-height: 120px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-2 d-flex text-info flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: none;' id='playerNotes'>

                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
                `)
            }
            break;

        case 'calls':
            if(callsInfo.length < 1) {
                $('#content').empty().append(`
                    <div class='d-flex flex-column w-100 jsutify-content-start align-items-center'> 
                        <h3 class='text-info'>There is no Calls yet.</h3>
                    </div>
                `)
            }else {
                $('#content').empty().append(`
                    <div class='m-5 w-auto d-flex flex-wrap justify-content-start align-items-start' id='callsTab' style='gap: 15px;'>
                    
                        
                    
                    </div>
                `);
                
                // After getting data it will run foreach loop and insert collected data there.
                // $('#callsTab').append(`

                // `);
            }
        break;

        case 'property':
            if (propertyInfo.length < 1) {
                $('#content').empty().append(`
                <div class='d-flex flex-column align-items-center justify-content-center'>
                    <div class='d-flex justify-content-center align-items-center m-5' style='gap: 5px;'> 
                        <label for=''>Find Property by Address</label>
                        <input type='text' placeholder='Type Address' class='form-input' id='property_input'>
                        <span class='material-symbols-outlined m-0 p-0' id='find_property_button' onclick='handlePropertyInput()' style='cursor: pointer'>
                            chevron_right
                        </span>
                    </div>
                </div> 
                `)
            }else {
                $('#content').empty().append(`
                    <div class='d-flex flex-column justify-content-start align-items-start'>
                        <div class='w-100'>
                            <p class='d-flex justify-content-start text-danger align-items-center' onclick='goToMain()' style='cursor:pointer'>
                                Go Back
                                <span class='material-symbols-outlined' id='find_property_button' onclick='handlePropertyInput()' style='cursor: pointer'>
                                    reply
                                </span>
                            </p>
                        </div>

                        <div class='d-flex w-100 flex-row align-items-center justify-content-center m-5 ms-0'>
                            <div class='w-75 d-flex flex-column'>
                                <label for='' class='text-start'>Find Property information by address</label>
                                <div class='d-flex justify-content-start align-items-center w-50'>
                                    <input type='text' placeholder='Type Address' class='form-control' id='property_input' style='width: 100%;'>
                                    <span class='material-symbols-outlined m-0 p-0' id='find_vehicle_button' onclick='handlePropertyInput()' style='cursor: pointer'>
                                        chevron_right
                                    </span>
                                </div>
                            </div>
                            <div class='w-25 d-flex justify-content-center align-items-center'>
                                <button class='btn btn-outline-info' onclick='markPropertyLocation()'>Mark Location</button>
                            </div>
                        </div> 
                    </div>
                
                    <hr>

                    <div class='w-100'>
                        <h4>Information: </h4>
                        <ul class='m-0 p-0'>
                            <li>Property Address: <span class='text-info' id='propertyAddress'></span></li>
                            <li>Owner: <span class='text-info' id='propertyOwner'></span></li>
                        </ul>
                    </div>

                    <div class='d-flex w-100'>

                        <div class='d-flex flex-column w-100'>

                            <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                                <h4 class='mb-3'>Previous Owners: </h4>
                                <div style='max-height: 120px;' id='records-out-div' class='c_scroll'>
                                    <ul class='m-0 p-0 ms-2 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: none;' id='propertyPreviousOwners'>
                                        
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