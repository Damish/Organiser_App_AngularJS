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

    let month_count = 3;//current month is set to April
    $scope.currentMonth = $scope.months2020[month_count].month;

    //Settings for current month displayed (default)
    $scope.thisMonth = () => {
        $scope.fullMonthDisplay = [];

        $scope.currentMonth_Days = $scope.months2020[month_count].days;
        for (let x = 1; x <= $scope.currentMonth_Days; x++) {
            $scope.fullMonthDisplay.push(x);
        }


        $scope.monthCorrecter = [];
        $scope.monthCorrecterNo = 2;
        let correctorString = "";
        for (let x = 1; x <= $scope.monthCorrecterNo; x++) {
            for (let x = 1; x <= $scope.monthCorrecterNo; x++) {
                correctorString += (" ");
            }
            $scope.monthCorrecter.push(correctorString);
        }


    }
    $scope.thisMonth();

    // $scope.testEvent = () => {
    //     $scope.events.push({
    //         // id: $scope.eventDate.toLocaleDateString() + "- 0" + $scope.count,
    //         id: 1,
    //         eName: "Testttt",
    //
    //         eDay: 12,
    //         eMonth: 4,
    //         eYear: 2020,
    //
    //         eTime: "11:00PM",
    //         eVenue: "Home",
    //         complete: false
    //     });
    // }
    // $scope.testEvent ();

    //Previous Month calender Settings update
    $scope.prevMonth = () => {
        if (month_count > 0) {
            $scope.currentMonth = $scope.months2020[month_count -= 1].month;
            $scope.currentMonth_Days = $scope.months2020[month_count].days;
            $scope.monthCorrecterNo = $scope.months2020[month_count].start;

            $scope.fullMonthDisplay = [];
            for (let x = 1; x <= $scope.currentMonth_Days; x++) {
                $scope.fullMonthDisplay.push(x);
            }


            $scope.monthCorrecter = [];
            let correctorString = "";
            for (let x = 1; x <= $scope.monthCorrecterNo; x++) {
                for (let x = 1; x <= $scope.monthCorrecterNo; x++) {
                    correctorString += (" ");
                }
                $scope.monthCorrecter.push(correctorString);
            }


        }
    };

    //Next Month calender Settings update
    $scope.nextMonth = () => {
        if (month_count < 11) {
            $scope.currentMonth = $scope.months2020[month_count += 1].month;
            $scope.currentMonth_Days = $scope.months2020[month_count].days;
            $scope.monthCorrecterNo = $scope.months2020[month_count].start;

            $scope.fullMonthDisplay = [];
            for (let x = 1; x <= $scope.currentMonth_Days; x++) {
                $scope.fullMonthDisplay.push(x);
            }


            $scope.monthCorrecter = [];
            let correctorString = "";
            for (let x = 1; x <= $scope.monthCorrecterNo; x++) {
                for (let x = 1; x <= $scope.monthCorrecterNo; x++) {
                    correctorString += (" ");
                }
                $scope.monthCorrecter.push(correctorString);
            }


        }
    };


    // $scope.eventDisplay = []; //to display events under the day

    //Add new Event Function
    let count = -1;
    $scope.addItem = () => {

        if ($scope.eventName && $scope.eventDate && $scope.eventTime && $scope.eventVenue !== "") {
            count += 1;
            $scope.events.push({
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
            });


            $scope.showEventsSelectedDay = false;
            $scope.showCalender = true;

        }


        //
        // if($scope.eventDate.getMonth()>3){
        //     for(let x=3; x<$scope.eventDate.getMonth();x++){
        //          $scope.nextMonth();
        //     }
        // }
        // if($scope.eventDate.getMonth()<3){
        //     for(let x=$scope.eventDate.getMonth(); x<3;x++){
        //         $scope.prevMonth();
        //     }
        // }
        //
        //
        //

        // $scope.renderEventsToMonth( $scope.eventDate.getUTCMonth() + 1);//events are updated to month

        $scope.eventName = "";
        $scope.eventDate = "";
        $scope.eventTime = "";
        $scope.eventVenue = "";

        let startDate = new Date();
        let endDate = new Date();
        let seconds = (endDate.getTime() - startDate.getTime()) / 1000;


    };


    $scope.selectDay = (x) => {

        let select_day_count = -1;

        let currentMonthId = month_count + 1;

        // $scope.testDay =x;
        // $scope.testMonth = currentMonthId;

        $scope.testDay = "Your Events for " + x + "/" + currentMonthId + "/2020";
        $scope.select_day_events = [];

        $scope.currentEvent = {};
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

            }

        }


    };

    // $scope.renderEventsToMonth = (m) => {
    //
    //     $scope.currentEvent = {};
    //
    //     for ($scope.currentEvent of $scope.events) {
    //         if($scope.currentEvent.eMonth = m){
    //             $scope.fullMonthDisplay [$scope.currentEvent.eDay -3] = $scope.currentEvent.eDay-2 + " * ";
    //         }
    //     }
    //
    // };


    $scope.removeSelected = (x) => {

        $scope.showEventsSelectedDay = false;
        $scope.events.splice(x, 1);

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

        //
        // if ($scope.eventName && $scope.eventDate && $scope.eventTime && $scope.eventVenue !== "") {
        //     count += 1;
        //     $scope.events.push({
        //         // id: $scope.eventDate.toLocaleDateString() + "- 0" + $scope.count,
        //         eid: count,
        //         eName: $scope.eventName,
        //
        //         eDay: $scope.eventDate.getUTCDate() + 3,
        //         eMonth: $scope.eventDate.getUTCMonth() + 1,
        //         eYear: $scope.eventDate.getUTCFullYear(),
        //
        //         eDate: $scope.eventDate.toLocaleDateString(),
        //
        //         eTime: $scope.eventTime.toLocaleTimeString(),
        //         eVenue: $scope.eventVenue,
        //         complete: false,
        //     });
        //
        //
        //     $scope.showEventsSelectedDay = false;
        //     $scope.showCalender = true;
        //
        // }

    };


    $scope.saveChanges = () => {

        $scope.testt = oldItem_eid;
        // $scope.testaa = x+1;

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

        // $scope.select_day_events.splice(x, 1,$scope.newItem);

        //
        // for ($scope.Item of $scope.events) {
        //
        //     if($scope.Item.eid === x-1){
        //
        //
        //         $scope.events.splice(x,1,$scope.newItem );
        //
        //
        //         // $scope.events.push($scope.newItem);
        //
        //     }
        //
        // }


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
    $scope.hideCalender = function () {
        // $scope.showMe =!$scope.showMe;
        $scope.showCalender = !$scope.showCalender;

    };

    $scope.showEventsSelectedDay = false;


}]);






