using Toybox.Application as App;
using Toybox.WatchUi as Ui;

class DashboardDelegate extends Ui.InputDelegate {
    function initialize() {
        Ui.InputDelegate.initialize();
    }

    function onKey(keyEvent) {
        var key = keyEvent.getKey();

        if (key == Ui.KEY_DOWN) {
            App.getApp().showWorkout();
            return true;
        }

        return false;
    }
}
