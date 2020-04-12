app.controller('MainController', ['$scope', $scope => {

    $scope.list = [];

    $scope.days = ["mon","tue","wed","thu","fri","sat","sun"];

    $scope.week1 = ["1","2","3","4","5","6","7"];
    $scope.week2 = ["8","9","10","11","12","13","14"];
    $scope.week3 = ["15","16","17","18","19","20","21"];
    $scope.week4 = ["22","23","24","25","26","27","28"];
    $scope.week51 = ["29","30"," ","  ","   ","    ","     "];
    $scope.week52 = ["29","30","31"," ","  ","   ","    "];
    $scope.week53 = [" ","  ","   ","    ","     ","      ","       "];
    $scope.week54 = ["29"," ","  ","   ","    ","     ","      "];

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






