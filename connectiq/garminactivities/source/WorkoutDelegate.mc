using Toybox.Application as App;
using Toybox.WatchUi as Ui;

class WorkoutDelegate extends Ui.InputDelegate {
    private var _engine;

    function initialize(engine) {
        Ui.InputDelegate.initialize();
        _engine = engine;
    }

    function onKey(keyEvent) {
        var key = keyEvent.getKey();

        if (key == Ui.KEY_START) {
            App.getApp().toggleWorkout();
            return true;
        }

        if (key == Ui.KEY_LAP) {
            if (!_engine.isComplete()) {
                _engine.advance();
                Ui.requestUpdate();
            }
            return true;
        }

        if (key == Ui.KEY_UP || key == Ui.KEY_ESC) {
            App.getApp().showDashboard();
            return true;
        }

        return false;
    }
}
