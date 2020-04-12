app.controller('MainController', ['$scope', $scope => {

    $scope.list = [];

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






