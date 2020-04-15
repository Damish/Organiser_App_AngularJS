let controller = app.controller('MainController', ['$scope', $scope => {

    $scope.list = [];

    $scope.days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    $scope.week1 = ["1","2","3","4","5","6","7"];
    $scope.week2 = ["8","9","10","11","12","13","14"];
    $scope.week3 = ["15","16","17","18","19","20","21"];
    $scope.week4 = ["22","23","24","25","26","27","28"];
    $scope.week51 = ["29","30"," ","  ","   ","    ","     "];
    $scope.week52 = ["29","30","31"," ","  ","   ","    "];
    $scope.week53 = [" ","  ","   ","    ","     ","      ","       "];
    $scope.week54 = ["29"," ","  ","   ","    ","     ","      "];

    $scope.fullMonth = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"," ","  ","   ","    ","     "];

    $scope.monthCorrecter =[" ","  ","   ",];


    $scope.myEvent={
        day:1,
        name:"hello"
    };

    // $scope.currentListEvent={};
    //
    // for($scope.currentListEvent of $scope.list){
    //
    //     $scope.events.push ({
    //         day:1,
    //         name: $scope.eventName ,
    //         time:$scope.eventTime.toLocaleTimeString()
    //
    //     });
    //
    // }



    $scope.events = [
        {
            day:1,
            name:"Eating",
            time:"12:05pm"
        },
        {
            day:2,
            name:"Drinking",
            time:"12:05pm"
        },
        {
            day:15,
            name:"Meeting",
            time:"12:05pm"
        },
        {
            day:16,
            name:"Hello World",
            time:"12:05pm"
        },
        {
            day:17,
            name:"At home",
            time:"12:05pm"
        },
        {
            day:22,
            name:"Studies",
            time:"12:05pm"
        }

    ];

    $scope.currentEvent={};

    for($scope.currentEvent of $scope.events){

        $scope.fullMonth [ $scope.currentEvent.day-1] = $scope.currentEvent.day + " # " + $scope.currentEvent.name;

    }




    $scope.count = 0;
    $scope.addItem = () => {

        if( $scope.eventName && $scope.eventDate && $scope.eventTime && $scope.eventVenue !== ""  ){

                $scope.count += 1;

                $scope.list.push({
                     id: $scope.eventDate.toLocaleDateString() + "- 0" +$scope.count,
                     eName: $scope.eventName ,
                     eDate: $scope.eventDate.toLocaleDateString() ,
                     eTime: $scope.eventTime.toLocaleTimeString() ,
                     eVenue: $scope.eventVenue ,
                     complete: false
                });

        };

        $scope.eventName="";
        $scope.eventDate = "";
        $scope.eventTime= "";
        $scope.eventVenue= "";

    };

    $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    };

    $scope.showMe2 = false;
    $scope.showTable = function() {
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






