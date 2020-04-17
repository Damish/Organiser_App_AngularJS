let controller = app.controller('MainController', ['$scope', $scope => {

    $scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    $scope.events = [];

    //Display current Month functions
    // start=2; (0,1,2) 2 <- means january month starts on a wednesday(mon,tue,wed)

    $scope.months2020 = [
        {mId:1,month: "January", days: 31, start: 2},
        {mId:2,month: "February", days: 29, start: 5},
        {mId:3,month: "March", days: 31, start: 6},
        {mId:4,month: "April", days: 30, start: 2},
        {mId:5,month: "May", days: 31, start: 4},
        {mId:6,month: "June", days: 30, start: 0},
        {mId:7,month: "July", days: 31, start: 2},
        {mId:8,month: "August", days: 31, start: 5},
        {mId:9,month: "September", days: 30, start: 1},
        {mId:10,month: "October", days: 31, start: 3},
        {mId:11,month: "November", days: 30, start: 6},
        {mId:12,month: "December", days: 31, start: 1}
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
    $scope.count = 0;
    $scope.addItem = () => {

        if ($scope.eventName && $scope.eventDate && $scope.eventTime && $scope.eventVenue !== "") {
            $scope.count += 1;
            $scope.events.push({
                // id: $scope.eventDate.toLocaleDateString() + "- 0" + $scope.count,
                id: $scope.count,
                eName: $scope.eventName,

                eDay: $scope.eventDate.getUTCDate()+3,
                eMonth: $scope.eventDate.getUTCMonth() + 1,
                eYear: $scope.eventDate.getUTCFullYear(),

                eDate: $scope.eventDate.toLocaleDateString(),

                eTime: $scope.eventTime.toLocaleTimeString(),
                eVenue: $scope.eventVenue,
                complete: false
            });

            $scope.showEventsSelectedDay=false;
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
        // $scope.renderEventsToMonth();//events are updated to month

        $scope.eventName = "";
        $scope.eventDate = "";
        $scope.eventTime = "";
        $scope.eventVenue = "";

    };


    $scope.selectDay = (x) => {

        let currentMonthId = month_count+1;

        // $scope.testDay =x;
        // $scope.testMonth = currentMonthId;

        $scope.testDay = "Your Events for " +x +"/" + currentMonthId +"/2020";
        $scope.select_day_events=[];

        $scope.currentEvent={};
        for ($scope.currentEvent of $scope.events){


                if ( ($scope.currentEvent.eMonth+1 === currentMonthId ) && ( $scope.currentEvent.eDay===32 ||  $scope.currentEvent.eDay===33 ||  $scope.currentEvent.eDay===34)  && (x === 1) ) {
                    $scope.select_day_events.push(
                        "Remind me to "+ $scope.currentEvent.eName +" "+
                        "on "+ $scope.currentEvent.eDate +" "+
                        "at "+ $scope.currentEvent.eTime +" "+
                        "at "+ $scope.currentEvent.eVenue +"."
                    );

                    $scope.showCalender = false;
                    $scope.showEventsSelectedDay=true;
                }

                if ($scope.currentEvent.eMonth === currentMonthId  && $scope.currentEvent.eDay-2 === x) {
                    $scope.select_day_events.push(
                        "Remind me to "+ $scope.currentEvent.eName +" "+
                        "on "+ $scope.currentEvent.eDate +" "+
                        "at "+ $scope.currentEvent.eTime +" "+
                        "at "+ $scope.currentEvent.eVenue +"."
                    );

                    $scope.showCalender = false;
                    $scope.showEventsSelectedDay=true;

                }

        }




    };







    $scope.renderEventsToMonth = () => {

        $scope.currentEvent = {};

        for ($scope.currentEvent of $scope.events) {
            $scope.fullMonthDisplay [$scope.currentEvent.eDay - 1] = $scope.currentEvent.eDay + " * " + $scope.currentEvent.eName + " at " + $scope.currentEvent.eVenue;

        }

    };


    $scope.showMe = false;
    $scope.myFunc = function () {
        $scope.showMe = !$scope.showMe;
    };

    $scope.showMe2 = false;
    $scope.showTable = function () {
        $scope.showMe2 = !$scope.showMe2;
    };


    $scope.showCalender = true;
    $scope.hideCalender = function () {
        $scope.showMe =!$scope.showMe;
        $scope.showCalender = !$scope.showCalender;

    };

    $scope.showEventsSelectedDay=false;

}]);






