window.onload = function() {
    var start = checkStartDate();
    var end = setEndDate();
    var interval = getInterValTime(start, end);
    setIntervalTime(interval)
  };
function checkStartDate(){
    var startTime = document.getElementById("startTime");
    if (startTime.value==""){
        startTime.value = NOW(new Date());
        startTime.max = getMaxDate();
    }
    return startTime.value
}
function getInterValTime(start, end){
    var start_hours = new Date(start).getHours();
    var end_hours = new Date(end).getHours();
    var start_minutes = new Date(start).getMinutes();
    var end_minutes = new Date(end).getMinutes();
    hours = Math.abs(end_hours - start_hours);
    minutes = Math.abs(end_minutes - start_minutes);
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    var min_str = hours + ":" + minutes;
    return min_str;
    // return new Date(start) - new Date(end);
}
function setIntervalTime(interval){
    var intTime = document.getElementById("interval");
    if(intTime != "" || intTime != null){
        intTime.value = interval;
    }
}
function setEndDate(){
    var endTime = document.getElementById("endTime");
    if (endTime.value == ""){
        endTime.value = getMaxDate();
    }
    return endTime.value
}
function checkStartFutureDateStart(x){
    var startTime = document.getElementById("startTime");
    var endTime = document.getElementById("endTime");
    var intervalTime = document.getElementById("interval");
    if (x.value != null){
        if (new Date(x.value) > new Date() || new Date(x.value).getDay() < new Date().getDay()) {
            var r =window.confirm("Current date cannot be set as future date or less from current Day");
            if (r == true || r == false) {
                startTime.value = NOW(new Date());
                var finalTime = new Date(startTime.value);
                finalTime.setHours(finalTime.getHours() + parseInt(intervalTime.value.split(":")[0]));
                finalTime.setMinutes(finalTime.getMinutes() + parseInt(intervalTime.value.split(":")[1]));
                endTime.value = NOW(finalTime); 
              }
        }
        else{
            var finalTime = new Date(startTime.value);
            finalTime.setHours(finalTime.getHours() + parseInt(intervalTime.value.split(":")[0]));
            finalTime.setMinutes(finalTime.getMinutes() + parseInt(intervalTime.value.split(":")[1]));
            endTime.value = NOW(finalTime);
        }
    }
}
function checkStartFutureDateEnd(x){
    var startTime = document.getElementById("startTime");
    var endTime = document.getElementById("endTime");
    var intervalTime = document.getElementById("interval");
    if (new Date(x.value) > new Date(getMaxDate())) {
        var r =window.confirm("Current date cannot be set as future date");
        if (r == true || r == false) {
            endTime.value = getMaxDate();
          }
    }
    else if (new Date(x.value) < new Date(startTime.value)) {
        var r =window.confirm("End date cannot be less than start date");
        if (r == true || r == false) {
            endTime.value = getMaxDate();
          }
    }
    if (x.value){
        var diff = getInterValTime(startTime.value, endTime.value);
        intervalTime.value = diff;
    }
}
function checkIntervalEndDate(x){
    var startTime = document.getElementById("startTime");
    var endTime = document.getElementById("endTime");
    var intervalTime = document.getElementById("interval");
    if (x.value){
        var finalTime = new Date(startTime.value);
        finalTime.setHours(finalTime.getHours() + parseInt(x.value.split(":")[0]));
        finalTime.setMinutes(finalTime.getMinutes() + parseInt(x.value.split(":")[1]));
        if (finalTime > new Date(endTime.value) && finalTime > new Date(getMaxDate())){
            var r =window.confirm("New Time and Start Date addition cannot be more than End Date");
            if (r == true || r == false) {
                var startTime = document.getElementById("startTime");
                var endTime = document.getElementById("endTime");
                var diff = getInterValTime(startTime.value, endTime.value);
                intervalTime.value = diff;
            }
        }
        else{
            endTime.value = NOW(finalTime);
        }
    }
}
function getMaxDate(){
    var today = new Date();
    today.setHours(23);
    today.setMinutes(59);
    maxday = NOW(today);
    return maxday;
}

function NOW(date) {
    var yyyy = date.getFullYear();
    var dd = date.getDate();
    var mm = (date.getMonth() + 1);
    if (dd < 10)
        dd = "0" + dd;
    if (mm < 10)
        mm = "0" + mm;
    var cur_day = yyyy + "-" + mm + "-" + dd;
    var hours = date.getHours()
    var minutes = date.getMinutes()
    if (hours < 10)
        hours = "0" + hours;
    if (minutes < 10)
        minutes = "0" + minutes;
    var date_str = cur_day + "T" + hours + ":" + minutes;
    return date_str;
}
function getAllTimes(){
    var startTime = document.getElementById("startTime");
    var endTime = document.getElementById("endTime");
    var intervalTime = document.getElementById("interval");
    return [startTime, endTime, intervalTime]
}