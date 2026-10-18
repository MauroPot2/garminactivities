using Toybox.Application as Application;

class GarminActivitiesApp extends Application.AppBase {
    function initialize() {
        AppBase.initialize();
    }

    function getInitialView() {
        return [ new DashboardView() ];
    }
}
