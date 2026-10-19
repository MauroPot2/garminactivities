class WorkoutEngine {
    private var _steps;
    private var _index = 0;
    private var _remaining = 0;
    private var _running = false;
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
        reset();
    }

    function reset() {
        _index = 0;
        _running = false;
        _complete = false;
        _remaining = _steps[0][:duration];
    }

    function toggle() {
        if (_complete) { return; }
        _running = !_running;
    }

    function tick() {
        if (!_running || _complete) { return; }

        _remaining -= 1;
        if (_remaining <= 0) {
            advance();
        }
    }

    function advance() {
        if (_complete) { return; }

        if (_index >= (_steps.size() - 1)) {
            _remaining = 0;
            _running = false;
            _complete = true;
            return;
        }

        _index += 1;
        _remaining = _steps[_index][:duration];
    }

    function currentStep() { return _steps[_index]; }

    function nextStep() {
        if (_index >= (_steps.size() - 1)) { return null; }
        return _steps[_index + 1];
    }

    function getRemaining() { return _remaining; }
    function getIndex() { return _index; }
    function getCount() { return _steps.size(); }
    function isRunning() { return _running; }
    function isComplete() { return _complete; }

    function progressPercent() {
        var duration = currentStep()[:duration];
        if (duration <= 0) { return 0; }
        return ((duration - _remaining) * 100) / duration;
    }
}
