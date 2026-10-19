using Toybox.Application as App;
using Toybox.WatchUi as Ui;

class WorkoutDelegate extends Ui.BehaviorDelegate {
    private var _view;
    private var _engine;

    function initialize(view, engine) {
        Ui.BehaviorDelegate.initialize();
        _view = view;
        _engine = engine;
    }

    function onSelect() {
        if (_engine.isComplete()) {
            return true;
        }

        _engine.toggle();
        if (_engine.isRunning()) {
            App.getApp().startRecording();
        } else {
            App.getApp().pauseRecording();
        }
        Ui.requestUpdate();
        return true;
    }

    function onKey(keyEvent) {
        var key = keyEvent.getKey();

        if (key == Ui.KEY_LAP) {
            _engine.advance();
            Ui.requestUpdate();
            return true;
        }

        return false;
    }

    function onBack() {
        App.getApp().finishRecording();
        return false;
    }
}
