/*
 * Developed by Samarajeewa D.
 * Registration No: IT18189704
 * Last Updated : 20.04.2020 12:12AM
 * Email:damishs88@gmail.com
 */

app. controller('MainController', function ($scope, $interval, $window) {

    /*
    * This events array is used to save incoming events.
    */
    $scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    $scope.events = [];

    /*
    * the months2020[] array is where the data about months in 2020 is saved.
    * i.e. Currently this organiser app is working only for 2020.
    * start=2; (0,1,2) 2 <- means january month starts on a wednesday(mon,tue,wed)
    */
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

    /*
    * This method works for any month :) with the given parameters
    * monthCount - month id in months array (default is 3)
    * monthCorrector - month start in months array.To display 1st day of month in corresponding day in week.
    * y - the last addded new event id
    */
    $scope.currentMonthRender = (monthCount, monthCorrecter, y) => {
        // month_count = 3;

        $scope.currentMonth = $scope.months2020[monthCount].month;
        $scope.thisMonth_realMonth = $scope.months2020[monthCount].month;
        $scope.thisMonth_realMonthCorrector = monthCorrecter;

        month_count_global = monthCount;
        month_corrector_global = monthCorrecter;

        $scope.fullMonthDisplay = [];
        $scope.currentMonth_Days = $scope.months2020[monthCount].days;
        for (let x = 1; x <= $scope.currentMonth_Days; x++) {
            if (x === y) {
                $scope.fullMonthDisplay.push({
                    id: x,
                    hasEvents: "New Event",
                });
            } else {
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
    };

    //Settings for current month displayed (default)
    $scope.thisMonthApril = () => {

        $scope.currentMonth = $scope.months2020[3].month;//display month name on top
        $scope.currentMonthRender(3, 2, 100); //y=100 to confirm there is no events at the begining :)
    };

    $scope.thisMonthApril(); //default display April month function fired :) Any time you visit.you see this month.

    /*
    * This method updates Previous Month calender Settings
    */
    $scope.prevMonth = () => {

        month_corrector_global = $scope.months2020[month_count_global - 1].start;
        $scope.currentMonth = $scope.months2020[month_count_global - 1].month;
        $scope.currentMonthRender(month_count_global -= 1, month_corrector_global, 100);
    };

    /*
    * This method updates Next Month calender Settings
    */
    $scope.nextMonth = () => {

        month_corrector_global = $scope.months2020[month_count_global + 1].start;
        $scope.currentMonth = $scope.months2020[month_count_global + 1].month;
        $scope.currentMonthRender(month_count_global += 1, month_corrector_global, 100);
    };


    let count = -1;
    $scope.currentEvent1 = {};
    /*
    * This method is used to add new Item to the events array
    */
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
                eHours:$scope.eventTime.getUTCHours(),
                eMinutes:$scope.eventTime.getUTCMinutes(),
                eSeconds:$scope.eventTime.getUTCSeconds(),
                eventDateFull: $scope.eventDate,
                eventTimeFull: $scope.eventTime,
                eTime: $scope.eventTime.toLocaleTimeString(),
                eVenue: $scope.eventVenue,
                complete: false,
            };
            $scope.events.push($scope.newItem);

            if ($scope.eventDate.getMonth() === 3) {
                $scope.thisMonth_realMonth = "This month is april.Month rendering caused error.";
                $scope.thisMonthApril();
                $scope.fullMonthDisplay [$scope.newItem.eDay - 3].hasEvents = "New Event";
            }

            if ($scope.eventDate.getMonth() > 3) {
                $scope.thisMonth_realMonth = "This month is after april.Month rendering caused error.";
                for (let month_count = 3; month_count < $scope.eventDate.getMonth(); month_count++) {
                    $scope.nextMonth();
                    $scope.fullMonthDisplay [$scope.newItem.eDay - 3].hasEvents = "New Event";
                }
                month_count_global = $scope.eventDate.getMonth();
            }

            if ($scope.eventDate.getMonth() < 3) {

                $scope.thisMonth_realMonth = "This month is before april.Month rendering caused error.";

                let prevMonthNo = $scope.eventDate.getMonth();
                for (prevMonthNo; prevMonthNo < (month_count_global+1); prevMonthNo++) {
                    $scope.prevMonth();
                    $scope.fullMonthDisplay [$scope.newItem.eDay - 3].hasEvents = "New Event";
                }
                month_count_global = $scope.eventDate.getMonth();
            }

            $scope.showEventsSelectedDay = false;
            // $scope.showCalender = true;

            $scope.showMe = false;
        }
        $scope.eventName = "";
        $scope.eventDate = "";
        $scope.eventTime = "";
        $scope.eventVenue = "";



        $scope.findEventToExpire();



    };

    /*
    * This method is used to display events of a selected day in any month.
    */
    $scope.selectDay = (x) => {

        let select_day_count = -1;
        let currentMonthId = month_count_global + 1;

        $scope.testDay1 = x;
        // $scope.testMonth = currentMonthId;
        $scope.testDay = "Your Events for " + x + "/" + currentMonthId + "/2020";
        $scope.testDayWords = "Your Events for " + x + "/" + currentMonthId + "/2020";


        /*
        * This select_day_events[] array is used to save events for the selected day(x) in corresponding month.
        */
        $scope.select_day_events = [];
        $scope.currentEvent = {};
        $scope.eventsAvailable = "No Events";

        for ($scope.currentEvent of $scope.events) {
            select_day_count += 1;
            /*
            *when selected day is 1,
            *unfortunately getUTCDate() method returns 31,20,29 for the selecting of day 1.(previous month's no.of days)
            * Therefore each selected day is added 3 for easy searching purposes.
            */
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

            //when selected day is not 1, x = (2-31)
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

    /*
    * This method is used to delete event from the events array.
    * x - event id to remove
    */
    $scope.removeSelected = (x) => {

        $scope.showEventsSelectedDay = false;
        $scope.events.splice(x, 1);

        $scope.currentMonthRender(month_count_global, month_corrector_global, 100);

        $scope.showEventNameLatestExpire = false;
    };

    $scope.btnAddItem = true;
    $scope.btnSaveChanges = false;

    let oldItem_eid;//old item location saved as a variable for use in saveChanges() function

    /*
    * This method is used to display selected event details to user.(old details)
    * x - event id to edit
    */
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

    /*
     * This method is used to save changes which are done by the user.
    */
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

        $scope.showEventNameLatestExpire = false;




    };


    /*
     * The Below methods are used to show/hide certain items to user.
    */
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
    $scope.showTable3 = false;
    $scope.hideCalender = function () {
        // $scope.showMe =!$scope.showMe;
        $scope.showCalender = !$scope.showCalender;
        $scope.showTable3 = !$scope.showTable3;

    };

    $scope.showDeveloperData = false;
    $scope.showDev = function () {
        $scope.showDeveloperData = !$scope.showDeveloperData;
        $scope.showTable2 = false;
        $scope.showMe = false;
    };

    $scope.showEventsSelectedDay = false;
    $scope.showSelectedDayEvents = function () {
        $scope.showEventsSelectedDay = false;
    };

    $scope.showEventNameLatestExpire = false;
    $scope.showEventNameLatestExpireFun = function () {
        $scope.showEventNameLatestExpire =  !$scope.showEventNameLatestExpire;
    };

    /*
     * This method is used to find the latest event to expire and countdown.
     */
    $scope.findEventToExpire = () => {

        $scope.dateExpire_ofDay1 = new Date(
            2020,
            $scope.events[0].eMonth-1,
            $scope.events[0].eDay-1,
            $scope.events[0].eHours-18,
            $scope.events[0].eMinutes-30,
            $scope.events[0].eSeconds-0,
            0
        );


        for ($scope.currentEvent of $scope.events){

            $scope.dateExpire = new Date(
                2020,
                $scope.currentEvent.eMonth-1,
                $scope.currentEvent.eDay-1,
                $scope.currentEvent.eHours-18,
                $scope.currentEvent.eMinutes-30,
                $scope.currentEvent.eSeconds-0,
                0
            );

            if ($scope.dateExpire <= $scope.dateExpire_ofDay1) {

                $scope.dateExpire_ofDay1 = $scope.dateExpire;

                $interval(function () {

                    let expireDate = Math.floor($scope.dateExpire_ofDay1 / 1000);
                    let nTime = Math.floor(Date.now() / 1000);
                    let remaining = expireDate - nTime;
                    $scope.rDays = parseInt(remaining / 60 / 60 / 24);
                    $scope.rHours = parseInt((remaining - ($scope.rDays * 60 * 60 * 24)) / 60 / 60);
                    $scope.rMinutes = parseInt((remaining - ($scope.rDays * 60 * 60 * 24) - ($scope.rHours * 60 * 60)) / 60);
                    $scope.rSeconds = parseInt(remaining - ($scope.rDays * 60 * 60 * 24) - ($scope.rHours * 60 * 60) - ($scope.rMinutes * 60));

                    $scope.remaining_Statement = "Next Event will Auto Expire in,";
                    $scope.rRemaining =  $scope.rDays + " Days " + $scope.rHours + " Hours " + $scope.rMinutes + " Minutes " + $scope.rSeconds + " Seconds ";


                    if(remaining===0){

                        $scope.showEventsSelectedDay = false;

                        $scope.events.splice($scope.currentEvent.eid, 1);

                        $scope.currentMonthRender(month_count_global, month_corrector_global, 100);

                        $scope.showEventNameLatestExpire = false;

                    }


                }, 1000);


                $scope.eventNameLatestExpire =  "Remind me about " + $scope.currentEvent.eName + " " +
                "on " + $scope.currentEvent.eDate + " " +
                "at " + $scope.currentEvent.eTime + " " +
                "at " + $scope.currentEvent.eVenue + "." ;

                $scope.showEventNameLatestExpire = true;




            }

        }

    }

});
