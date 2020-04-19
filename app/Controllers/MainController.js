let controller = app.controller('MainController', ['$scope', $scope => {

    $scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    $scope.events = [];

    //Display current Month functions
    // start=2; (0,1,2) 2 <- means january month starts on a wednesday(mon,tue,wed)
    $scope.months2020 = [
        {mId: 1, month: "January", days: 31, start: 2},
        {mId: 2, month: "February", days: 29, start: 5},
        {mId: 3, month: "March", days: 31, start: 6},
        {mId: 4, month: "April", days: 30, start: 2},
        {mId: 5, month: "May", days: 31, start: 4},
        {mId: 6, month: "June", days: 30, start: 0},
        {mId: 7, month: "July", days: 31, start: 2},
        {mId: 8, month: "August", days: 31, start: 5},
        {mId: 9, month: "September", days: 30, start: 1},
        {mId: 10, month: "October", days: 31, start: 3},
        {mId: 11, month: "November", days: 30, start: 6},
        {mId: 12, month: "December", days: 31, start: 1}
    ];

    let month_count_global = 3;//default current month is set to April
    let month_corrector_global = $scope.months2020[3].start; //April month day1 correcter is set as default

    //works for any month :) with the given parameters
    $scope.currentMonthRender = (monthCount,monthCorrecter,y) => {
        // month_count = 3;

        $scope.currentMonth = $scope.months2020[monthCount].month;
        $scope.thisMonth_realMonth=$scope.months2020[monthCount].month;
        $scope.thisMonth_realMonthCorrector=monthCorrecter;

        month_count_global = monthCount;
        month_corrector_global = monthCorrecter;

        $scope.fullMonthDisplay = [];
        $scope.currentMonth_Days = $scope.months2020[monthCount].days;
        for (let x = 1; x <= $scope.currentMonth_Days; x++) {
            if(x===y){
                $scope.fullMonthDisplay.push({
                    id: x,
                    hasEvents: "New Event",
                });
            }
            else {
                $scope.fullMonthDisplay.push({
                    id: x,
                    hasEvents: " ",
                });
            }
        }

        $scope.monthCorrecter = [];
        let correctorString = "";
        for (let x = 1; x <= month_corrector_global; x++) {
            for (let x = 1; x <= month_corrector_global; x++) {
                correctorString += (" ");
            }
            $scope.monthCorrecter.push(correctorString);
        }
    }

    //Settings for current month displayed (default)
    $scope.thisMonthApril = () => {

        $scope.currentMonth = $scope.months2020[3].month;//display month name on top
        $scope.currentMonthRender(3,2,100); //y=100 to confirm there is no events at the begining :)
    };

    $scope.thisMonthApril(); //default display April month function fired :) Any time you visit.you see this month.

    //Previous Month calender Settings update
    $scope.prevMonth = () => {

        month_corrector_global = $scope.months2020[month_count_global-1].start;
        $scope.currentMonth = $scope.months2020[month_count_global-1].month;
        $scope.currentMonthRender(month_count_global-=1,month_corrector_global,100);
    };

    //Next Month calender Settings update
    $scope.nextMonth = () => {

        month_corrector_global = $scope.months2020[month_count_global+1].start;
        $scope.currentMonth = $scope.months2020[month_count_global+1].month;
        $scope.currentMonthRender(month_count_global+=1,month_corrector_global,100);
    };

    //Add new Event Function
    let count = -1;
    $scope.currentEvent1 = {};
    $scope.addItem = () => {

        $scope.thisMonthApril();
        if ($scope.eventName && $scope.eventDate && $scope.eventTime && $scope.eventVenue !== "") {
            count += 1;
            $scope.newItem = {
                // id: $scope.eventDate.toLocaleDateString() + "- 0" + $scope.count,
                eid: count,
                eName: $scope.eventName,
                eDay: $scope.eventDate.getUTCDate() + 3,
                eMonth: $scope.eventDate.getUTCMonth() + 1,
                eYear: $scope.eventDate.getUTCFullYear(),
                eDate: $scope.eventDate.toLocaleDateString(),
                eventDateFull: $scope.eventDate,
                eventTimeFull: $scope.eventTime,
                eTime: $scope.eventTime.toLocaleTimeString(),
                eVenue: $scope.eventVenue,
                complete: false,
            };
            $scope.events.push($scope.newItem);

            if($scope.eventDate.getMonth()===3){
                $scope.thisMonth_realMonth="This month is april.Month rendering caused error."
                $scope.thisMonthApril();
                $scope.fullMonthDisplay [$scope.newItem.eDay - 3].hasEvents = "New Event";
            }

            if($scope.eventDate.getMonth()>3){
                $scope.thisMonth_realMonth="This month is after april.Month rendering caused error."
                for(let month_count=3; month_count<$scope.eventDate.getMonth();month_count++){
                    $scope.nextMonth();
                    $scope.fullMonthDisplay [$scope.newItem.eDay - 3].hasEvents = "New Event";
                }
                month_count_global=$scope.eventDate.getMonth();
            }

            if($scope.eventDate.getMonth()<3){

                $scope.thisMonth_realMonth="This month is before april.Month rendering caused error."

                let prevMonthNo=$scope.eventDate.getMonth();
                for(prevMonthNo;prevMonthNo<(month_count_global);prevMonthNo++){
                    $scope.prevMonth();
                    $scope.fullMonthDisplay [$scope.newItem.eDay - 3].hasEvents = "New Event";
                }
                month_count_global=$scope.eventDate.getMonth();
            }

            $scope.showEventsSelectedDay = false;
            // $scope.showCalender = true;

            $scope.showMe = false;
        }
        $scope.eventName = "";
        $scope.eventDate = "";
        $scope.eventTime = "";
        $scope.eventVenue = "";

    };

    $scope.selectDay = (x) => {

        let select_day_count = -1;
        let currentMonthId = month_count_global + 1;

        $scope.testDay1 = x;
        // $scope.testMonth = currentMonthId;
        $scope.testDay = "Your Events for " + x + "/" + currentMonthId + "/2020";
        $scope.testDayWords = "Your Events for " + x + "/" + currentMonthId + "/2020";

        $scope.select_day_events = [];
        $scope.currentEvent = {};
        $scope.eventsAvailable = "No Events";

        for ($scope.currentEvent of $scope.events) {
            select_day_count += 1;

            //when selected day is 1
            if (($scope.currentEvent.eMonth + 1 === currentMonthId) && ($scope.currentEvent.eDay === 32 || $scope.currentEvent.eDay === 33 || $scope.currentEvent.eDay === 34) && (x === 1)) {
                $scope.select_day_events.push({
                    id: select_day_count,
                    content: "Remind me about " + $scope.currentEvent.eName + " " +
                        "on " + $scope.currentEvent.eDate + " " +
                        "at " + $scope.currentEvent.eTime + " " +
                        "at " + $scope.currentEvent.eVenue + "."
                });
                $scope.showMe = false;
                $scope.showEventsSelectedDay = true;

                $scope.eventsAvailable = "Events available";

            }

            //when selected day is not 1 (2-31)
            if ($scope.currentEvent.eMonth === currentMonthId && $scope.currentEvent.eDay - 2 === x) {
                $scope.select_day_events.push({
                    id: select_day_count,
                    content: "Remind me about " + $scope.currentEvent.eName + " " +
                        "on " + $scope.currentEvent.eDate + " " +
                        "at " + $scope.currentEvent.eTime + " " +
                        "at " + $scope.currentEvent.eVenue + "."
                });
                $scope.showMe = false;
                $scope.showEventsSelectedDay = true;

                $scope.eventsAvailable = "Events available";
            }
        }
        $scope.showEventsSelectedDay = true;
    };

    $scope.removeSelected = (x) => {

        $scope.showEventsSelectedDay = false;
        $scope.events.splice(x, 1);

        $scope.currentMonthRender(month_count_global,month_corrector_global,100);
    };

    $scope.btnAddItem = true;
    $scope.btnSaveChanges = false;

    let oldItem_eid;//old item location saved as a variable for use in saveChanges() function

    $scope.editSelected = (x) => {

        $scope.showEventsSelectedDay = false;
        $scope.showMe = true;

        $scope.oldItem = {};

        for ($scope.oldItem of $scope.events) {

            if ($scope.oldItem.eid === x) {

                $scope.btnAddItem = false;
                $scope.btnSaveChanges = true;

                // $scope.testt = $scope.oldItem.eid;

                oldItem_eid = $scope.oldItem.eid;

                $scope.eventName = $scope.oldItem.eName;
                $scope.eventDate = $scope.oldItem.eventDateFull;
                $scope.eventTime = $scope.oldItem.eventTimeFull;
                $scope.eventVenue = $scope.oldItem.eVenue;


            }

        }

    };

    $scope.saveChanges = () => {

        $scope.testt = oldItem_eid;

        $scope.newItem = {
            eName: $scope.eventName,
            eDate: $scope.eventDate.toLocaleDateString(),
            eTime: $scope.eventTime.toLocaleTimeString(),
            eVenue: $scope.eventVenue,

            eid: oldItem_eid,
            eDay: $scope.eventDate.getUTCDate() + 3,
            eMonth: $scope.eventDate.getUTCMonth() + 1,
            eYear: $scope.eventDate.getUTCFullYear(),
            eventDateFull: $scope.eventDate,
            eventTimeFull: $scope.eventTime,
            complete: false,

        };

        $scope.events.splice(oldItem_eid, 1, $scope.newItem);


        $scope.showEventsSelectedDay = false;
        $scope.showMe = false;
        $scope.showTable2 = true;


        $scope.eventName = "";
        $scope.eventDate = "";
        $scope.eventTime = "";
        $scope.eventVenue = "";


    };

    $scope.showMe = false;
    $scope.myFunc = function () {
        $scope.showMe = !$scope.showMe;
        $scope.btnAddItem = true;
        $scope.btnSaveChanges = false;
    };

    $scope.showTable2 = false;
    $scope.showTable = function () {
        $scope.showTable2 = !$scope.showTable2;
    };

    $scope.showCalender = true;
    $scope.showTable3=false;
    $scope.hideCalender = function () {
        // $scope.showMe =!$scope.showMe;
        $scope.showCalender = !$scope.showCalender;
        $scope.showTable3 = !$scope.showTable3;

    };

    $scope.showDeveloperData=false;
    $scope.showDev = function () {
        $scope.showDeveloperData = !$scope.showDeveloperData;
        $scope.showTable2 = false;
        $scope.showMe = false;
    };

    $scope.showEventsSelectedDay = false;
    $scope.showSelectedDayEvents = function () {
        $scope.showEventsSelectedDay =false;
    };

}]);







