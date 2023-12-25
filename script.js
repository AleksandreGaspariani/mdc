
$(document).ready(()=> {
    prepareForWork();
})

function init(){
    localStorage.setItem('used','1');
    localStorage.setItem('state','default');
    localStorage.setItem('username','');
    localStorage.setItem('vehiclePN','');
    localStorage.setItem('property','');
    localStorage.setItem('calls','');
    localStorage.setItem('employees','');
    localStorage.setItem('cases','');
    localStorage.setItem('motd','');
    
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

function handlePlayerInput() {
    let user = $('#player_input').val();
    localStorage.setItem('username',user);
    load();
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
        case 'player':
            let user = localStorage.getItem('username');
            if (user == '') {
                $('#content').empty().append(`
                <div class='d-flex align-items-center justify-content-center m-5' style='gap: 5px;'>
                <label for=''>Find Player</label>
                    <input type='text' placeholder='Type Name' class='form-input' id='player_input'>
                    <span class='material-symbols-outlined m-0 p-0' id='find_player_button' onclick='handlePlayerInput()'>
                        chevron_right
                    </span>
                </div> 
                `)
            }else {
                $('#content').empty().append(`

                <div class='d-flex justify-content-start align-items-start'>
                    <div>
                        <p class='d-flex justify-content-center align-items-center text-danger' onclick='goToMain()' style='cursor: pointer'>
                            Go Back
                            <span class='material-symbols-outlined text-danger'>
                                reply
                            </span>
                        </p>
                        <img src='https://p1.hiclipart.com/preview/323/743/633/icon-person-icon-design-symbol-avatar-silhouette-character-cartoon-head-png-clipart.jpg' alt='' width='120px' height='auto'>
                        <div class='d-flex flex-column ms-2'>
                        <p style='font-family: VT323, monospace;'>`+localStorage.getItem('username')+`</p>
                            <div class='d-flex justify-content-center align-items-center'>
                                <p style='font-family: VT323, monospace;' class='p-0 m-0'>Age: </p>
                                <span class='p-0 m-0'>24</span>
                            </div>
                        </div>
                    </div>
                    <div class='d-flex align-items-center justify-content-center m-5' style='gap: 5px;'>
                        <label for=''>Find Player</label>
                        <input type='text' placeholder='Type Name' class='form-input' id='player_input'>
                        <span class='material-symbols-outlined m-0 p-0' id='find_player_button' onclick='handlePlayerInput()'>
                            chevron_right
                        </span>
                    </div> 
                </div>
                   
                <hr>
                <div class='d-flex w-100'>

                    <div class='d-flex flex-column w-50'>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Licenses: </h4>
                            <div style='overflow-y: scroll; max-height: 70px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: circle;'>
                                    <li>Driving: V</li>
                                    <li>Flying: X</li>
                                    <li>Fishing: X</li>
                                    <li>Hunting: X</li>
                                    <li>Firearm: X</li>
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Records: </h4>
                            <div style='max-height: 70px;' id='records-out-div' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;'>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                    <li>No active records</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div class='d-flex flex-column w-50'>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                            <h4 class='mb-3'>Propertys: </h4>
                            <div style='overflow-y: scroll; max-height: 70px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;'>
                                    <li>Santa Maria 1032</li>
                                    <li>Vespuci 1131</li>
                                    <li>Vinewood 1562</li>
                                </ul>
                            </div>
                        </div>

                        <div class='d-flex justify-content-start align-items-start flex-column mt-3'>
                        <h4 class='mb-3'>Vehicles: </h4>
                            <div style='overflow-y: scroll; max-height: 70px;' class='c_scroll'>
                                <ul class='m-0 p-0 ms-5 d-flex flex-column justify-content-start align-items-start' style='width: 300px; list-style-type: decimal-leading-zero;'>
                                    <li>Zenterno | PN: 15vh132</li>
                                    <li>Elegy | PN: 15vh132</li>
                                    <li>Rhinehart | PN: 15vh132</li>
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

   