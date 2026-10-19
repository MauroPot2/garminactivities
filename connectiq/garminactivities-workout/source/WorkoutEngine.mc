class WorkoutEngine {
    private var _steps;
    private var _index = 0;
    private var _remaining = 0;
    private var _complete = false;

    function initialize() {
        _steps = [
            { :name=>"RISCALDAMENTO", :duration=>600, :minPower=>120, :maxPower=>150 },
            { :name=>"INTERVALLO 1/4", :duration=>300, :minPower=>200, :maxPower=>220 },
            { :name=>"RECUPERO 1/4", :duration=>120, :minPower=>100, :maxPower=>130 },
            { :name=>"INTERVALLO 2/4", :duration=>300, :minPower=>200, :maxPower=>220 },
            { :name=>"RECUPERO 2/4", :duration=>120, :minPower=>100, :maxPower=>130 },
            { :name=>"INTERVALLO 3/4", :duration=>300, :minPower=>200, :maxPower=>220 },
            { :name=>"RECUPERO 3/4", :duration=>120, :minPower=>100, :maxPower=>130 },
            { :name=>"INTERVALLO 4/4", :duration=>300, :minPower=>200, :maxPower=>220 },
            { :name=>"RECUPERO 4/4", :duration=>120, :minPower=>100, :maxPower=>130 },
            { :name=>"DEFATICAMENTO", :duration=>600, :minPower=>0, :maxPower=>130 }
        ];
        sync(0);
    }

    function sync(totalSeconds) {
        var elapsed = totalSeconds;
        _index = 0;
        _complete = false;

        for (var i = 0; i < _steps.size(); i += 1) {
            var duration = _steps[i][:duration];
            if (elapsed < duration) {
                _index = i;
                _remaining = duration - elapsed;
                return;
            }
            elapsed -= duration;
        }

        _index = _steps.size() - 1;
        _remaining = 0;
        _complete = true;
    }

    function currentStep() { return _steps[_index]; }

    function nextStep() {
        if (_complete || _index >= (_steps.size() - 1)) { return null; }
        return _steps[_index + 1];
    }

    function getRemaining() { return _remaining; }
    function getIndex() { return _index; }
    function getCount() { return _steps.size(); }
    function isComplete() { return _complete; }

    function progressPercent() {
        if (_complete) { return 100; }
        var duration = currentStep()[:duration];
        if (duration <= 0) { return 0; }
        return ((duration - _remaining) * 100) / duration;
    }
}
