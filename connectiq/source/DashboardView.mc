using Toybox.Graphics as Graphics;
using Toybox.Math as Math;
using Toybox.WatchUi as WatchUi;

class DashboardView extends WatchUi.DataField {
    const FTP = 200;
    const USE_MOCK_DATA = true;

    var _power = null;
    var _heartRate = null;
    var _averageHeartRate = null;
    var _cadence = null;
    var _averageCadence = null;
    var _speed = null;
    var _averageSpeed = null;
    var _distance = null;
    var _totalAscent = null;
    var _elapsedTime = null;
    var _grade = null;
    var _previousAltitude = null;
    var _previousDistance = null;

    function initialize() {
        DataField.initialize();

        if (USE_MOCK_DATA) {
            applyMockData();
        }
    }

    function compute(info) {
        if (USE_MOCK_DATA) {
            applyMockData();
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

            // Ignore tiny distance changes to avoid noisy/unstable percentages.
            if (deltaDistance >= 3.0) {
                var instantGrade = (deltaAltitude / deltaDistance) * 100.0;

                // Reject unrealistic spikes from GPS/barometric jitter.
                if (instantGrade > 30.0) {
                    instantGrade = 30.0;
                } else if (instantGrade < -30.0) {
                    instantGrade = -30.0;
                }

                // Light smoothing so the value is useful while riding.
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

    function applyMockData() {
        _power = 218;
        _heartRate = 152;
        _averageHeartRate = 148;
        _cadence = 87;
        _averageCadence = 84;
        _speed = 34.7 / 3.6;
        _averageSpeed = 31.8 / 3.6;
        _distance = 12400.0;
        _totalAscent = 326;
        _elapsedTime = 5058000;
        _grade = 7.2;
    }

    function onUpdate(dc) {
        var width = dc.getWidth();

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_BLACK);
        dc.clear();

        drawPower(dc, width);
        drawPowerZone(dc, width);
        drawSecondaryMetrics(dc, width);
        drawRideMetrics(dc, width);
        drawClimbMetrics(dc, width);
    }

    function drawPower(dc, width) {
        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, 4, Graphics.FONT_XTINY, "POWER", Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(getPowerColor(), Graphics.COLOR_TRANSPARENT);
        dc.drawText(
            width / 2,
            21,
            Graphics.FONT_NUMBER_MILD,
            valueOrDash(_power),
            Graphics.TEXT_JUSTIFY_CENTER
        );

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(width / 2, 70, Graphics.FONT_XTINY, "WATTS", Graphics.TEXT_JUSTIFY_CENTER);
    }

    function drawPowerZone(dc, width) {
        var zone = getPowerZone();
        var left = 14;
        var top = 91;
        var gap = 3;
        var segmentWidth = (width - 28 - (gap * 6)) / 7;

        for (var i = 1; i <= 7; i += 1) {
            var x = left + ((i - 1) * (segmentWidth + gap));
            if (i == zone) {
                dc.setColor(getPowerColor(), Graphics.COLOR_TRANSPARENT);
            } else {
                dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
            }
            dc.fillRectangle(x, top, segmentWidth, 9);
        }

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(
            width / 2,
            104,
            Graphics.FONT_SMALL,
            zone > 0 ? "ZONE " + zone.toString() : "ZONE --",
            Graphics.TEXT_JUSTIFY_CENTER
        );
    }

    function drawSecondaryMetrics(dc, width) {
        var center = width / 2;

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawLine(14, 137, width - 14, 137);
        dc.drawLine(center, 151, center, 211);

        drawMetric(
            dc,
            center / 2,
            148,
            "HR",
            valueOrDash(_heartRate),
            formatAverageNumber(_averageHeartRate),
            "BPM"
        );

        drawMetric(
            dc,
            center + (center / 2),
            148,
            "CAD",
            valueOrDash(_cadence),
            formatAverageNumber(_averageCadence),
            "RPM"
        );
    }

    function drawMetric(dc, x, y, label, value, average, unit) {
        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(x, y, Graphics.FONT_XTINY, label, Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(x, y + 16, Graphics.FONT_MEDIUM, value, Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(x, y + 40, Graphics.FONT_XTINY, average, Graphics.TEXT_JUSTIFY_CENTER);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(x, y + 53, Graphics.FONT_XTINY, unit, Graphics.TEXT_JUSTIFY_CENTER);
    }

    function drawRideMetrics(dc, width) {
        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawLine(14, 218, width - 14, 218);

        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(14, 227, Graphics.FONT_XTINY, "SPEED", Graphics.TEXT_JUSTIFY_LEFT);
        dc.drawText(width - 14, 227, Graphics.FONT_XTINY, "DIST", Graphics.TEXT_JUSTIFY_RIGHT);

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(14, 242, Graphics.FONT_SMALL, formatSpeed(), Graphics.TEXT_JUSTIFY_LEFT);
        dc.drawText(width - 14, 242, Graphics.FONT_SMALL, formatDistance(), Graphics.TEXT_JUSTIFY_RIGHT);

        dc.setColor(Graphics.COLOR_DK_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(14, 266, Graphics.FONT_XTINY, formatAverageSpeed(), Graphics.TEXT_JUSTIFY_LEFT);
    }

    function drawClimbMetrics(dc, width) {
        dc.setColor(Graphics.COLOR_LT_GRAY, Graphics.COLOR_TRANSPARENT);
        dc.drawText(14, 284, Graphics.FONT_XTINY, "GRADE", Graphics.TEXT_JUSTIFY_LEFT);
        dc.drawText(width / 2, 284, Graphics.FONT_XTINY, "TIME", Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(width - 14, 284, Graphics.FONT_XTINY, "ASCENT", Graphics.TEXT_JUSTIFY_RIGHT);

        dc.setColor(Graphics.COLOR_WHITE, Graphics.COLOR_TRANSPARENT);
        dc.drawText(14, 299, Graphics.FONT_SMALL, formatGrade(), Graphics.TEXT_JUSTIFY_LEFT);
        dc.drawText(width / 2, 302, Graphics.FONT_XTINY, formatElapsed(), Graphics.TEXT_JUSTIFY_CENTER);
        dc.drawText(width - 14, 299, Graphics.FONT_SMALL, formatAscentValue(), Graphics.TEXT_JUSTIFY_RIGHT);
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

    function formatAverageNumber(value) {
        return value == null ? "AVG --" : "AVG " + value.toString();
    }

    function formatSpeed() {
        if (_speed == null) {
            return "--.- km/h";
        }

        return (_speed * 3.6).format("%.1f") + " km/h";
    }

    function formatAverageSpeed() {
        if (_averageSpeed == null) {
            return "AVG --.-";
        }

        return "AVG " + (_averageSpeed * 3.6).format("%.1f");
    }

    function formatDistance() {
        if (_distance == null) {
            return "--.- km";
        }

        return (_distance / 1000.0).format("%.1f") + " km";
    }

    function formatGrade() {
        if (_grade == null) {
            return "--.-%";
        }

        return _grade.format("%.1f") + "%";
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

    function formatAscentValue() {
        if (_totalAscent == null) {
            return "-- m";
        }

        return _totalAscent.toString() + " m";
    }
}
