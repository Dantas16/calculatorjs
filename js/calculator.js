/**
* Calculator JS
*
* @author Gutemberg <gti5tecnologias@outlook.com>
*/

var calculator = {
    //Store the total got on the calculation
    total_calc: 0,
    
    //Show a message
    showMsg: function (msg) {
        "use strict";
        var alert_msg = document.getElementById('alert-msg');
        
        if (msg === undefined || msg === '') {
            alert_msg.setAttribute('class', alert_msg.className.replace('show', 'hide'));
            return false;
        }
        
        alert_msg.setAttribute('class', alert_msg.className.replace('hide', 'show'));
        
        alert_msg.innerHTML = msg;
    },

    //Show the total
    showTotal: function(total){
        "use strict";
        var total_place = document.getElementById('total-res');
        var div = total_place.parentNode;
        
        if (total === undefined || total === '') {
            div.setAttribute('class', div.className.replace('show', 'hide'));
            return false;
        }

        div.setAttribute('class', div.className.replace('hide', 'show'));
        total_place.innerHTML = total;
    },

    //Get the value of input result
    getInpResult: function () {
        "use strict";
        return document.getElementById('result');
    },

    //Get the value, parse to int number and set in the view
    setValue: function (btn) {
        "use strict";
        var val = (btn.value != '.') ? parseInt(btn.value) : btn.value;
        
        calculator.setView(val);
    },

    //Get the action, identify and set to result place
    setAction: function (btn) {
        "use strict";
        var action = btn.value;
        //If clear the result place
        if (action === 'c') {
            calculator.setView(false);
            return false;
        }
        //If to calculate and get total
        if (action === '=') {
            var total = calculator.getTotal();
            return false;
        }

        if (action === '<') {
            calculator.delEach();
            return false;
        }

        //Verify if there is an action in input value (avoid to has more than one action per time)
        var inpRes = calculator.getInpResult();
        
        if (inpRes.value.search(/[\+\-\*\/\^]/g) != -1) {
            calculator.showMsg('Only one operation per time is allowed!');
            return false;
        }
        
        calculator.setView(action);
    },

    //Get the value, identify the operation, does the calculation
    getTotal: function () {
        "use strict";
        var toCalc = calculator.getInpResult();
        var val = toCalc.value;
        
        if (val.length < 3) { return false; }

        var pos = val.search(/[\+\-\*\/\^]/g); //Look for the action
        
        var action = val.substring(pos, pos + 1); //get the action

        var val1 = val.substring(0, pos); //Get the first value
            val1 = parseFloat(val1);
        
        var val2 = val.substr(pos + 1); //Get the second value
            val2 = parseFloat(val2);
        
        var res = 0;
        switch (action) {
            case '+':
                res = val1 + val2;
            break;
            case '-':
                res = val1 - val2;
            break;
            case '*':
                res = val1 * val2;
            break;
            case '/':
                res = val1 / val2;
            break;
            case '^':
                res = Math.pow(val1, val2);
            break;
        }

        calculator.total_calc = res;

        calculator.getInpResult().value = res;

        calculator.showTotal(res);

        calculator.showMsg('');
    },

    //Remove from end
    delEach: function () {
        "use strict";
        var inpRes = calculator.getInpResult();

        var total = inpRes.value.length;

        var newVal = inpRes.value.slice(0, total-1);

        calculator.getInpResult().value = (newVal === '' || newVal === undefined) ? 0 : newVal;
    },

    //Set the values to result input
    setView: function(val){
        "use strict";
        var inpRes = calculator.getInpResult();
        var inpVal = inpRes.value;
        //If clear
        if (val === false) {
            inpRes.value = 0;
            calculator.showMsg('');
            calculator.showTotal('');
            return false;
        }
        //If the value in the input is zero (No value is set)
        if (inpVal === '0' && val != '.') {
            //If the value to be set is a number (Avoid to set the first value a string like an action)
            if (typeof val == 'number') {
                inpRes.value = val;
                return false;
            } else {
                return false;
            }
        }
        
        calculator.showMsg('');
        inpRes.value += val;
    }
};

var addListeners = function () {
    "use strict";
    //Actions Buttons
    var btns_actions = document.querySelectorAll('.calc-action');
    for (var i = 0; i < btns_actions.length; i++) {
        btns_actions[i].addEventListener('click', function () { calculator.setAction(this); }, false);
    }

    //Number Buttons
    var btns_number = document.querySelectorAll('.cal-num');
    for (var i = 0; i < btns_number.length; i++) {
        btns_number[i].addEventListener('click', function () { calculator.setValue(this); }, false);
    }
};

document.addEventListener('DOMContentLoaded', function () { addListeners(); }, false);