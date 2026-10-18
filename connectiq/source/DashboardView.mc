using Toybox.Graphics as Graphics;
using Toybox.Math as Math;
using Toybox.WatchUi as WatchUi;

class DashboardView extends WatchUi.DataField {
    const FTP = 200;

    var _power = null;
    var _heartRate = null;
    var _cadence = null;
    var _speed = null;
    var _distance = null;
    var _elapsedTime = null;

    function initialize() {
        DataField.initialize();
    }

    function compute(info) {
        _power = info.currentPower;
        _heartRate = info.currentHeartRate;
        _cadence = info.currentCadence;
        _speed = info.currentSpeed;
        _distance = info.elapsedDistance;
        _elapsedTime = info.elapsedTime;
    }

    function onUpdate(dc) {
        var width = dc.getWidth();

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_BLACK);
        dc.clear();

        drawHeader(dc, width);
        drawPower(dc, width);
        drawPowerZone(dc, width);
        drawSecondaryMetrics(dc, width);
        drawFooter(dc, width);
    }

    function drawHeader(dc, width) {
        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(
            width / 2,
            8,
            Graphics.FONT_XTINY,
            "GARMINACTIVITIES",
            Graphics.TEXT_JUSTIFY_CENTER
        );

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawLine(14, 31, width - 14, 31);
    }

    function drawPower(dc, width) {
        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(
            width / 2,
            42,
            Graphics.FONT_XTINY,
            "POWER",
            Graphics.TEXT_JUSTIFY_CENTER
        );

        dc.setColor(getPowerColor(), Graphics.COLOR_TRANSPARENT);
        dc.drawText(
            width / 2,
            60,
            Graphics.FONT_NUMBER_MILD,
            valueOrDash(_power),
            Graphics.TEXT_JUSTIFY_CENTER
        );

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(
            width / 2,
            112,
            Graphics.FONT_XTINY,
            "WATTS",
            Graphics.TEXT_JUSTIFY_CENTER
        );
    }

    function drawPowerZone(dc, width) {
        var zone = getPowerZone();
        var left = 18;
        var top = 138;
        var gap = 3;
        var segmentWidth = (width - 36 - (gap * 6)) / 7;

        for (var i = 1; i <= 7; i += 1) {
            var x = left + ((i - 1) * (segmentWidth + gap));
            if (i == zone) {
                dc.setColor(getPowerColor(), Graphics.COLOR_TRANSPARENT);
            } else {
                dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
            }
            dc.fillRectangle(x, top, segmentWidth, 7);
        }

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(
            width / 2,
            151,
            Graphics.FONT_SMALL,
            zone > 0 ? "ZONE " + zone.toString() : "ZONE --",
            Graphics.TEXT_JUSTIFY_CENTER
        );
    }

    function drawSecondaryMetrics(dc, width) {
        var center = width / 2;

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawLine(14, 188, width - 14, 188);
        dc.drawLine(center, 198, center, 251);

        drawMetric(
            dc,
            center / 2,
            199,
            "HR",
            valueOrDash(_heartRate),
            "BPM"
        );

        drawMetric(
            dc,
            center + (center / 2),
            199,
            "CAD",
            valueOrDash(_cadence),
            "RPM"
        );
    }

    function drawMetric(dc, x, y, label, value, unit) {
        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(x, y, Graphics.FONT_XTINY, label, Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(x, y + 17, Graphics.FONT_MEDIUM, value, Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(x, y + 43, Graphics.FONT_XTINY, unit, Graphics.TEXT_JUSTIFY_CENTER);
    }

    function drawFooter(dc, width) {
        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawLine(14, 267, width - 14, 267);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(14, 278, Graphics.FONT_XTINY, "SPEED", Graphics.TEXT_JUSTIFY_LEFT);
        dc.drawText(width - 14, 278, Graphics.FONT_XTINY, "DIST", Graphics.TEXT_JUSTIFY_RIGHT);

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(14, 294, Graphics.FONT_SMALL, formatSpeed(), Graphics.TEXT_JUSTIFY_LEFT);
        dc.drawText(width - 14, 294, Graphics.FONT_SMALL, formatDistance(), Graphics.TEXT_JUSTIFY_RIGHT);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, 294, Graphics.FONT_XTINY, formatElapsed(), Graphics.TEXT_JUSTIFY_CENTER);
    }

    function getPowerZone() {
        if (_power == null) {
            return 0;
        }

        if (_power < (FTP * 55 / 100)) { return 1; }
        if (_power < (FTP * 75 / 100)) { return 2; }
        if (_power < (FTP * 90 / 100)) { return 3; }
        if (_power < (FTP * 105 / 100)) { return 4; }
        if (_power < (FTP * 120 / 100)) { return 5; }
        if (_power < (FTP * 150 / 100)) { return 6; }
        return 7;
    }

    function getPowerColor() {
        var zone = getPowerZone();

        if (zone == 1) { return Graphics.COLOR_LT_GRAY; }
        if (zone == 2) { return Graphics.COLOR_BLUE; }
        if (zone == 3) { return Graphics.COLOR_GREEN; }
        if (zone == 4) { return Graphics.COLOR_YELLOW; }
        if (zone == 5) { return Graphics.COLOR_ORANGE; }
        if (zone == 6) { return Graphics.COLOR_RED; }
        if (zone == 7) { return Graphics.COLOR_PURPLE; }

        return Graphics.COLOR_WHITE;
    }

    function valueOrDash(value) {
        return value == null ? "--" : value.toString();
    }

    function formatSpeed() {
        if (_speed == null) {
            return "--.- km/h";
        }

        return (_speed * 3.6).format("%.1f") + " km/h";
    }

    function formatDistance() {
        if (_distance == null) {
            return "--.- km";
        }

        return (_distance / 1000.0).format("%.1f") + " km";
    }

    function formatElapsed() {
        if (_elapsedTime == null) {
            return "--:--";
        }

        var totalSeconds = Math.floor(_elapsedTime / 1000);
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;

        if (hours > 0) {
            return hours.toString() + ":" + twoDigits(minutes) + ":" + twoDigits(seconds);
        }

        return twoDigits(minutes) + ":" + twoDigits(seconds);
    }

    function twoDigits(value) {
        return value < 10 ? "0" + value.toString() : value.toString();
    }
}
