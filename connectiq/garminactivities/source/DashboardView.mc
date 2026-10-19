using Toybox.Activity as Activity;
using Toybox.Graphics as Graphics;
using Toybox.Math as Math;
using Toybox.WatchUi as WatchUi;

class DashboardView extends WatchUi.DataField {
    const DEFAULT_FTP = 200;

    private var _ftp = DEFAULT_FTP;
    private var _power = null;
    private var _heartRate = null;
    private var _averageHeartRate = null;
    private var _cadence = null;
    private var _averageCadence = null;
    private var _speed = null;
    private var _averageSpeed = null;
    private var _distance = null;
    private var _totalAscent = null;
    private var _elapsedTime = null;
    private var _grade = null;
    private var _previousAltitude = null;
    private var _previousDistance = null;

    function initialize() {
        WatchUi.DataField.initialize();
    }

    function onUpdate(dc) {
        updateActivityData();

        var width = dc.getWidth();
        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_BLACK);
        dc.clear();

        drawHeader(dc, width);
        drawPower(dc, width);
        drawPowerZone(dc, width);
        drawPrimaryMetrics(dc, width);
        drawRideMetrics(dc, width);
    }

    function updateActivityData() {
        var info = Activity.getActivityInfo();
        if (info == null) {
            return;
        }

        _power = info.currentPower;
        _heartRate = info.currentHeartRate;
        _averageHeartRate = info.averageHeartRate;
        _cadence = info.currentCadence;
        _averageCadence = info.averageCadence;
        _speed = info.currentSpeed;
        _averageSpeed = info.averageSpeed;
        _distance = info.elapsedDistance;
        _totalAscent = info.totalAscent;
        _elapsedTime = info.elapsedTime;

        updateGrade(info.altitude, info.elapsedDistance);
    }

    function updateGrade(altitude, distance) {
        if (altitude == null || distance == null) {
            return;
        }

        if (_previousAltitude != null && _previousDistance != null) {
            var deltaDistance = distance - _previousDistance;
            var deltaAltitude = altitude - _previousAltitude;

            if (deltaDistance >= 3.0) {
                var instantGrade = (deltaAltitude / deltaDistance) * 100.0;
                if (instantGrade > 30.0) {
                    instantGrade = 30.0;
                } else if (instantGrade < -30.0) {
                    instantGrade = -30.0;
                }

                if (_grade == null) {
                    _grade = instantGrade;
                } else {
                    _grade = (_grade * 0.7) + (instantGrade * 0.3);
                }
            }
        }

        _previousAltitude = altitude;
        _previousDistance = distance;
    }

    function drawHeader(dc, width) {
        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, 3, Graphics.FONT_XTINY, "GARMINACTIVITIES", Graphics.TEXT_JUSTIFY_CENTER);
    }

    function drawPower(dc, width) {
        dc.setColor(getPowerColor(), Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, 18, Graphics.FONT_NUMBER_MILD, valueOrDash(_power), Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, 68, Graphics.FONT_SMALL, "WATTS", Graphics.TEXT_JUSTIFY_CENTER);
    }

    function drawPowerZone(dc, width) {
        var zone = getPowerZone();
        var left = 14;
        var top = 93;
        var gap = 3;
        var segmentWidth = (width - 28 - (gap * 6)) / 7;

        for (var i = 1; i <= 7; i += 1) {
            var x = left + ((i - 1) * (segmentWidth + gap));
            dc.setColor(i == zone ? getPowerColor() : Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
            dc.fillRectangle(x, top, segmentWidth, 10);
        }

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, 106, Graphics.FONT_MEDIUM, zone > 0 ? "Z" + zone.toString() : "Z--", Graphics.TEXT_JUSTIFY_CENTER);
    }

    function drawPrimaryMetrics(dc, width) {
        var center = width / 2;

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawLine(12, 140, width - 12, 140);
        dc.drawLine(center, 147, center, 222);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(center / 2, 147, Graphics.FONT_SMALL, "HR", Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(center + (center / 2), 147, Graphics.FONT_SMALL, "CAD", Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(center / 2, 167, Graphics.FONT_LARGE, valueOrDash(_heartRate), Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(center + (center / 2), 167, Graphics.FONT_LARGE, valueOrDash(_cadence), Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(center / 2, 203, Graphics.FONT_SMALL, formatAverageNumber(_averageHeartRate), Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(center + (center / 2), 203, Graphics.FONT_SMALL, formatAverageNumber(_averageCadence), Graphics.TEXT_JUSTIFY_CENTER);
    }

    function drawRideMetrics(dc, width) {
        var third = width / 3;

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawLine(12, 229, width - 12, 229);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(third / 2, 236, Graphics.FONT_XTINY, "SPEED", Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(third + (third / 2), 236, Graphics.FONT_XTINY, "DIST", Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText((third * 2) + (third / 2), 236, Graphics.FONT_XTINY, "GRADE", Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(third / 2, 253, Graphics.FONT_MEDIUM, formatSpeedValue(), Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(third + (third / 2), 253, Graphics.FONT_MEDIUM, formatDistanceValue(), Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText((third * 2) + (third / 2), 253, Graphics.FONT_MEDIUM, formatGrade(), Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(third / 2, 286, Graphics.FONT_SMALL, formatAverageSpeed(), Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(third + (third / 2), 286, Graphics.FONT_SMALL, formatElapsed(), Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText((third * 2) + (third / 2), 286, Graphics.FONT_SMALL, formatAscentValue(), Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(third / 2, 309, Graphics.FONT_XTINY, "AVG KM/H", Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(third + (third / 2), 309, Graphics.FONT_XTINY, "TIME", Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText((third * 2) + (third / 2), 309, Graphics.FONT_XTINY, "ASCENT", Graphics.TEXT_JUSTIFY_CENTER);
    }

    function getPowerZone() {
        if (_power == null) { return 0; }
        if (_power < (_ftp * 55 / 100)) { return 1; }
        if (_power < (_ftp * 75 / 100)) { return 2; }
        if (_power < (_ftp * 90 / 100)) { return 3; }
        if (_power < (_ftp * 105 / 100)) { return 4; }
        if (_power < (_ftp * 120 / 100)) { return 5; }
        if (_power < (_ftp * 150 / 100)) { return 6; }
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

    function formatAverageNumber(value) {
        return value == null ? "AVG --" : "AVG " + value.toString();
    }

    function formatSpeedValue() {
        return _speed == null ? "--.-" : (_speed * 3.6).format("%.1f");
    }

    function formatAverageSpeed() {
        return _averageSpeed == null ? "--.-" : (_averageSpeed * 3.6).format("%.1f");
    }

    function formatDistanceValue() {
        return _distance == null ? "--.-" : (_distance / 1000.0).format("%.1f");
    }

    function formatGrade() {
        return _grade == null ? "--.-%" : _grade.format("%.1f") + "%";
    }

    function formatElapsed() {
        if (_elapsedTime == null) { return "--:--"; }

        var totalSeconds = Math.floor(_elapsedTime / 1000);
        var hours = Math.floor(totalSeconds / 3600);
        var minutes = Math.floor((totalSeconds % 3600) / 60);
        var seconds = totalSeconds % 60;

        if (hours > 0) {
            return hours.toString() + ":" + twoDigits(minutes);
        }
        return twoDigits(minutes) + ":" + twoDigits(seconds);
    }

    function twoDigits(value) {
        return value < 10 ? "0" + value.toString() : value.toString();
    }

    function formatAscentValue() {
        return _totalAscent == null ? "--" : _totalAscent.format("%.0f");
    }
}
