let controller = app.controller('MainController', ['$scope', $scope => {

    $scope.list = [];
    $scope.days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    $scope.events = [];

    //Display current Month functions
    // start=2; (0,1,2) 2 <- means january month starts on a wednesday(mon,tue,wed)

    $scope.months2020 = [
        {month: "January", days: 31, start: 2},
        {month: "February", days: 29, start: 5},
        {month: "March", days: 31, start: 6},
        {month: "April", days: 30, start: 2},
        {month: "May", days: 31, start: 4},
        {month: "June", days: 30, start: 0},
        {month: "July", days: 31, start: 2},
        {month: "August", days: 31, start: 5},
        {month: "September", days: 30, start: 1},
        {month: "October", days: 31, start: 3},
        {month: "November", days: 30, start: 6},
        {month: "December", days: 31, start: 1}
    ];

    let month_count = 3;
    $scope.currentMonth = $scope.months2020[month_count].month;


    //Settings for current month displayed (default)
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


    $scope.eventDisplay=[]; //to display events under the day

    //Add new Event Function
    $scope.count = 0;
    $scope.addItem = () => {

        if ($scope.eventName && $scope.eventDate && $scope.eventTime && $scope.eventVenue !== "") {
            $scope.count += 1;
            $scope.list.push({
                id: $scope.eventDate.toLocaleDateString() + "- 0" + $scope.count,
                eName: $scope.eventName,
                eDate: $scope.eventDate.toLocaleDateString(),
                eTime: $scope.eventTime.toLocaleTimeString(),
                eVenue: $scope.eventVenue,
                complete: false
            });
        }


        //
        // if($scope.eventDate.getMonth()>3){
        //     for(let x=3; x<=$scope.eventDate.getMonth();x++){
        //          $scope.nextMonth();
        //     }
        // }
        // if($scope.eventDate.getMonth()<3){
        //     for(let x=$scope.eventDate.getMonth(); x<3;x++){
        //         $scope.prevMonth();
        //     }
        // }
        //



        $scope.events.push({
            day: $scope.eventDate.getUTCDate()+1,
            name: $scope.eventName.toString(),
            eVenue: $scope.eventVenue,
        });





        $scope.currentEvent = {};
        for ($scope.currentEvent of $scope.events) {
            $scope.fullMonthDisplay [$scope.currentEvent.day - 1] = $scope.currentEvent.day + " * " + $scope.currentEvent.name+ " at " + $scope.currentEvent.eVenue;

        }



        $scope.eventName = "";
        $scope.eventDate = "";
        $scope.eventTime = "";
        $scope.eventVenue = "";

    };


    $scope.showMe = false;
    $scope.myFunc = function () {
        $scope.showMe = !$scope.showMe;
    };

    $scope.showMe2 = false;
    $scope.showTable = function () {
        $scope.showMe2 = !$scope.showMe2;
    };


    $scope.removeItem = () => {
        let oldList = $scope.list;
        $scope.list = [];
        angular.forEach(oldList, (checked) => {
            if (!checked.done) $scope.list.push(checked);
        });
    };


}]);






