using Toybox.Activity as Activity;
using Toybox.Graphics as Gfx;
using Toybox.WatchUi as Ui;

class WorkoutView extends Ui.DataField {
    private var _engine;

    function initialize(engine) {
        Ui.DataField.initialize();
        _engine = engine;
    }

    function onUpdate(dc) {
        var w = dc.getWidth();
        var h = dc.getHeight();
        var info = Activity.getActivityInfo();

        var timerMs = info == null ? 0 : info.timerTime;
        var totalSeconds = timerMs == null ? 0 : (timerMs / 1000);
        _engine.sync(totalSeconds);

        dc.setColor(Gfx.COLOR_WHITE, Gfx.COLOR_BLACK);
        dc.clear();

        if (_engine.isComplete()) {
            drawCompleted(dc, w, h);
            return;
        }

        var step = _engine.currentStep();
        var power = info == null ? null : info.currentPower;
        var heartRate = info == null ? null : info.currentHeartRate;
        var cadence = info == null ? null : info.currentCadence;

        drawHeader(dc, w, step);
        drawProgress(dc, w, _engine.progressPercent(), step);
        drawPower(dc, w, power, step);
        drawTimer(dc, w);
        drawMetrics(dc, w, heartRate, cadence);
        drawNext(dc, w, h);
    }

    function drawHeader(dc, w, step) {
        dc.setColor(Gfx.COLOR_LT_GRAY, Gfx.COLOR_BLACK);
        dc.drawText(8, 7, Gfx.FONT_XTINY,
            (_engine.getIndex() + 1).toString() + "/" + _engine.getCount().toString(),
            Gfx.TEXT_JUSTIFY_LEFT);

        dc.setColor(getStepColor(step), Gfx.COLOR_BLACK);
        dc.drawText(w / 2, 7, Gfx.FONT_SMALL, step[:name], Gfx.TEXT_JUSTIFY_CENTER);
    }

    function drawProgress(dc, w, percent, step) {
        var x = 10;
        var y = 38;
        var width = w - 20;

        dc.setColor(Gfx.COLOR_DK_GRAY, Gfx.COLOR_BLACK);
        dc.fillRectangle(x, y, width, 7);
        dc.setColor(getStepColor(step), Gfx.COLOR_BLACK);
        dc.fillRectangle(x, y, (width * percent) / 100, 7);
    }

    function drawPower(dc, w, power, step) {
        var minPower = step[:minPower];
        var maxPower = step[:maxPower];
        var value = power == null ? "--" : power.toString();
        var color = Gfx.COLOR_WHITE;

        if (power != null) {
            if (power < minPower) {
                color = Gfx.COLOR_YELLOW;
            } else if (power > maxPower) {
                color = Gfx.COLOR_RED;
            } else {
                color = Gfx.COLOR_GREEN;
            }
        }

        dc.setColor(color, Gfx.COLOR_BLACK);
        dc.drawText(w / 2, 72, Gfx.FONT_LARGE, value + " W", Gfx.TEXT_JUSTIFY_CENTER);

        dc.setColor(Gfx.COLOR_LT_GRAY, Gfx.COLOR_BLACK);
        dc.drawText(w / 2, 116, Gfx.FONT_SMALL,
            minPower.toString() + " - " + maxPower.toString() + " W",
            Gfx.TEXT_JUSTIFY_CENTER);
    }

    function drawTimer(dc, w) {
        dc.setColor(Gfx.COLOR_WHITE, Gfx.COLOR_BLACK);
        dc.drawText(w / 2, 151, Gfx.FONT_MEDIUM,
            formatTime(_engine.getRemaining()), Gfx.TEXT_JUSTIFY_CENTER);

        dc.setColor(Gfx.COLOR_LT_GRAY, Gfx.COLOR_BLACK);
        dc.drawText(w / 2, 184, Gfx.FONT_XTINY, "RIMANENTI", Gfx.TEXT_JUSTIFY_CENTER);
    }

    function drawMetrics(dc, w, heartRate, cadence) {
        var hrText = heartRate == null ? "-- bpm" : heartRate.toString() + " bpm";
        var cadText = cadence == null ? "-- rpm" : cadence.toString() + " rpm";

        dc.setColor(Gfx.COLOR_WHITE, Gfx.COLOR_BLACK);
        dc.drawText(12, 220, Gfx.FONT_SMALL, "FC " + hrText, Gfx.TEXT_JUSTIFY_LEFT);
        dc.drawText(w - 12, 220, Gfx.FONT_SMALL, "CAD " + cadText, Gfx.TEXT_JUSTIFY_RIGHT);
    }

    function drawNext(dc, w, h) {
        var next = _engine.nextStep();
        var y = h - 58;

        dc.setColor(Gfx.COLOR_DK_GRAY, Gfx.COLOR_BLACK);
        dc.drawLine(10, y - 8, w - 10, y - 8);

        if (next == null) { return; }

        dc.setColor(Gfx.COLOR_LT_GRAY, Gfx.COLOR_BLACK);
        dc.drawText(10, y, Gfx.FONT_XTINY, "PROSSIMO", Gfx.TEXT_JUSTIFY_LEFT);

        dc.setColor(getStepColor(next), Gfx.COLOR_BLACK);
        dc.drawText(w - 10, y, Gfx.FONT_XTINY,
            formatTime(next[:duration]) + "  " + next[:minPower].toString() + "-" + next[:maxPower].toString() + " W",
            Gfx.TEXT_JUSTIFY_RIGHT);
    }

    function drawCompleted(dc, w, h) {
        dc.setColor(Gfx.COLOR_GREEN, Gfx.COLOR_BLACK);
        dc.drawText(w / 2, h / 2 - 28, Gfx.FONT_LARGE, "FATTO!", Gfx.TEXT_JUSTIFY_CENTER);
        dc.setColor(Gfx.COLOR_WHITE, Gfx.COLOR_BLACK);
        dc.drawText(w / 2, h / 2 + 16, Gfx.FONT_SMALL, "Allenamento completato", Gfx.TEXT_JUSTIFY_CENTER);
    }

    function getStepColor(step) {
        var maxPower = step[:maxPower];

        if (maxPower <= 130) { return Gfx.COLOR_BLUE; }
        if (maxPower <= 160) { return Gfx.COLOR_GREEN; }
        if (maxPower <= 190) { return Gfx.COLOR_YELLOW; }
        if (maxPower <= 220) { return Gfx.COLOR_ORANGE; }
        if (maxPower <= 260) { return Gfx.COLOR_RED; }
        return Gfx.COLOR_PURPLE;
    }

    function formatTime(totalSeconds) {
        var minutes = totalSeconds / 60;
        var seconds = totalSeconds % 60;
        var secondsText = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
        return minutes.toString() + ":" + secondsText;
    }
}
