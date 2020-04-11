"use strict";

var prev = "list";

var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoColor").val() == '') {
    handleError("Rawr! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var DomoForm = function DomoForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "domoForm",
    name: "domoForm",
    onSubmit: handleDomo,
    action: "/maker",
    method: "POST",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "domoName",
    type: "text",
    name: "name",
    placeholder: "Domo Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "domoAge",
    type: "text",
    name: "age",
    placeholder: "Domo Age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "color"
  }, "Color: "), /*#__PURE__*/React.createElement("select", {
    id: "domoColor",
    type: "text",
    name: "color",
    placeholder: "Domo Color"
  }, /*#__PURE__*/React.createElement("option", {
    value: "red"
  }, "Red"), /*#__PURE__*/React.createElement("option", {
    value: "orange"
  }, "Orange"), /*#__PURE__*/React.createElement("option", {
    value: "yellow"
  }, "Yellow"), /*#__PURE__*/React.createElement("option", {
    value: "green"
  }, "Green"), /*#__PURE__*/React.createElement("option", {
    value: "blue"
  }, "Blue"), /*#__PURE__*/React.createElement("option", {
    value: "indigo"
  }, "Indigo"), /*#__PURE__*/React.createElement("option", {
    value: "purple"
  }, "Purple"), /*#__PURE__*/React.createElement("option", {
    value: "pink"
  }, "Pink")), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Make Domo"
  }), /*#__PURE__*/React.createElement("div", {
    "class": "radio"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    id: "list",
    name: "view",
    value: "list",
    checked: "true"
  }), /*#__PURE__*/React.createElement("label", {
    "for": "list",
    id: "radiol"
  }, "List"), /*#__PURE__*/React.createElement("input", {
    type: "radio",
    id: "range",
    name: "view",
    value: "range"
  }), /*#__PURE__*/React.createElement("label", {
    "for": "range",
    id: "radior"
  }, "Free")));
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos yet"));
  } //changes domo population


  if (prev === range) {
    var domoNodes = props.domos.map(function (domo) {
      return /*#__PURE__*/React.createElement("div", {
        key: domo._id,
        className: "domo2"
      }, /*#__PURE__*/React.createElement("h3", {
        className: "domoName2"
      }, "Name: ", domo.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "domoAge2"
      }, "Age: ", domo.age, " "), /*#__PURE__*/React.createElement("h3", {
        hidden: "true",
        className: "domoColor"
      }, domo.color, " "), /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/domoface.jpeg",
        alt: "domo face",
        className: "domoFace2"
      }));
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, domoNodes);
  } else {
    var _domoNodes = props.domos.map(function (domo) {
      return /*#__PURE__*/React.createElement("div", {
        key: domo._id,
        className: "domo"
      }, /*#__PURE__*/React.createElement("img", {
        src: "/assets/img/domoface.jpeg",
        alt: "domo face",
        className: "domoFace"
      }), /*#__PURE__*/React.createElement("h3", {
        className: "domoName"
      }, "Name: ", domo.name, " "), /*#__PURE__*/React.createElement("h3", {
        className: "domoAge"
      }, "Age: ", domo.age, " "), /*#__PURE__*/React.createElement("h3", {
        hidden: "true",
        className: "domoColor"
      }, domo.color, " "));
    });

    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, _domoNodes);
  }
};

var changeColor = function changeColor() {
  //change background color of domos
  var area = document.getElementById("domos");
  var DomoColor = document.getElementsByClassName("domoColor"); //free range

  if (prev === range) {
    var domoFaces = document.getElementsByClassName("domoFace2");
    var Domos = document.getElementsByClassName("domo2");
    area.style.width = "100%";
    area.style.marginTop = 0;
    area.style.border = "none";

    for (var i = 0; i < domoFaces.length; i++) {
      var xpos = Math.floor(Math.random() * (window.innerWidth - 300) + 1);
      var ypos = Math.floor(Math.random() * (window.innerHeight - 400) + 1);
      domoFaces[i].style.borderColor = "" + DomoColor[i].innerText;
      Domos[i].style.background = "rgba(255,255,255,0)";
      Domos[i].style.position = "absolute";
      Domos[i].style.left = xpos + "px";
      Domos[i].style.top = 100 + ypos + "px";
    }

    ;
  } //list view
  else {
      var _Domos = document.getElementsByClassName("domo");

      area.style.width = "40%";
      area.style.marginTop = "100px";
      area.style.border = "solid";
      area.style.borderColor = "#55acee";
      area.style.borderWidth = "2px";

      for (var i = 0; i < _Domos.length; i++) {
        _Domos[i].style.background = "" + DomoColor[i].innerText;
        _Domos[i].style.position = "static";
      }

      ;
    } //set up listeners for radio button
  //will log page state


  document.querySelector("#list").addEventListener('change', function () {
    if (this !== prev) {
      prev = this;
      loadDomosFromServer();
    }
  });
  document.querySelector("#range").addEventListener('change', function () {
    if (this !== prev) {
      prev = this;
      loadDomosFromServer();
    }
  });
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#domos"));
    changeColor();
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: csrf
  }), document.querySelector("#makeDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: []
  }), document.querySelector("#domos"));
  loadDomosFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
