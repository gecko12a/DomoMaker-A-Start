var prev = "list";

const handleDomo = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoColor").val() == '' ) {
        handleError ("Rawr! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"),$("#domoForm").serialize(), function() {
        loadDomosFromServer();
    });

    return false;
};

const DomoForm = (props) => {
    return (
        <form id="domoForm" 
            name="domoForm"
            onSubmit={handleDomo}
            action="/maker"
            method="POST"
            className="domoForm"
        >
        <label htmlFor="name">Name: </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name"/>
        <label htmlFor="age">Age: </label>
        <input id="domoAge" type="text" name="age" placeholder="Domo Age"/>
        <label htmlFor="color">Color: </label>
        <select id="domoColor" type="text" name="color" placeholder="Domo Color">
            <option value="red">Red</option>
            <option value="orange">Orange</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="indigo">Indigo</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            </select>
        <input type="hidden" name="_csrf" value={props.csrf}/>
        <input className="makeDomoSubmit" type="submit" value="Make Domo"/>
            <div class="radio">
                <input type="radio" id="list" name="view" value="list"  checked="true"/>
                <label for="list" id="radiol" >List</label>
                <input type="radio" id="range" name="view" value="range"/>
                <label for="range" id="radior">Free</label>
            </div>
      
        </form>

    );
};

const DomoList = function(props) {
    if(props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos yet</h3>
            </div>
        );
    } 

    //changes domo population
    if(prev === range){
        const domoNodes = props.domos.map(function(domo) {

            return (
                <div key={domo._id} className="domo2" >
                    <h3 className="domoName2">Name: {domo.name} </h3>
                    <h3 className="domoAge2">Age: {domo.age} </h3>
                    <h3 hidden="true" className="domoColor">{domo.color} </h3>
                    <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace2"></img>
                </div>
            );
        });

        return (
            <div className="domoList">
                {domoNodes} 
            </div>
        );
    }
    else {
        const domoNodes = props.domos.map(function(domo) {
            return (
                
                <div key={domo._id} className="domo" >
                    <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace"></img>
                    <h3 className="domoName">Name: {domo.name} </h3>
                    <h3 className="domoAge">Age: {domo.age} </h3>
                    <h3 hidden="true" className="domoColor">{domo.color} </h3>   
                    
                </div>
            );
        });

        return (
            <div className="domoList">
                {domoNodes} 
            </div>
        );
    }
};


const changeColor = () => {
    //change background color of domos
    var area = document.getElementById("domos");
    var DomoColor = document.getElementsByClassName("domoColor");


    //free range
    if(prev === range){
        let domoFaces = document.getElementsByClassName("domoFace2");
        let Domos = document.getElementsByClassName("domo2");

        area.style.width = "100%";
        area.style.marginTop = 0;
        area.style.border = "none";



        for (var i=0; i<domoFaces.length; i++) {



        let xpos = Math.floor((Math.random() * (window.innerWidth-300)) + 1);
        let ypos = Math.floor((Math.random() * (window.innerHeight-400)) + 1);
            
        domoFaces[i].style.borderColor = "" + DomoColor[i].innerText;
        Domos[i].style.background = "rgba(255,255,255,0)";

        Domos[i].style.position = "absolute";
        Domos[i].style.left = xpos + "px";
        Domos[i].style.top = 100 + ypos + "px";

        };
    }
    //list view
    else{
        let Domos = document.getElementsByClassName("domo");

        area.style.width = "40%";
        area.style.marginTop = "100px";
        area.style.border = "solid";
        area.style.borderColor = "#55acee";
        area.style.borderWidth = "2px";

        for (var i=0; i<Domos.length; i++) {
        Domos[i].style.background = "" + DomoColor[i].innerText;
        Domos[i].style.position = "static";
        };
    }
   

    //set up listeners for radio button
    //will log page state
    document.querySelector("#list").addEventListener('change',function() {
        if (this !== prev) {
            prev = this;
            loadDomosFromServer();
        }
    });

    document.querySelector("#range").addEventListener('change',function() {
        if (this !== prev) {
            prev = this;
            loadDomosFromServer();
        }
    }); 

};

const loadDomosFromServer = () => {
    sendAjax('GET', '/getDomos', null, (data) => {
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
        changeColor();
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <DomoForm csrf={csrf}/>, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );

    loadDomosFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};


$(document).ready(function() {
    getToken();
});