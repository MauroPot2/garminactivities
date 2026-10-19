using Toybox.Application as App;
using Toybox.WatchUi as Ui;

class WorkoutDelegate extends Ui.InputDelegate {
    private var _view;
    private var _engine;

    function initialize(view, engine) {
        Ui.InputDelegate.initialize();
        _view = view;
        _engine = engine;
    }

    function onKey(keyEvent) {
        var key = keyEvent.getKey();

        if (key == Ui.KEY_START) {
            toggleWorkout();
            return true;
        }

        if (key == Ui.KEY_LAP) {
            if (!_engine.isComplete()) {
                _engine.advance();
                Ui.requestUpdate();
            }
            return true;
        }

        if (key == Ui.KEY_ESC) {
            App.getApp().finishRecording();
            return false;
        }

        return false;
    }

    function toggleWorkout() {
        if (_engine.isComplete()) {
            return;
        }

        _engine.toggle();
        if (_engine.isRunning()) {
            App.getApp().startRecording();
        } else {
            App.getApp().pauseRecording();
        }
        Ui.requestUpdate();
    }
}
