var _app;
(function() {
    _app._flag_is_loaded = true;
    _app._flag_is_path_initialized = false;
    _app._flag_change_path = false;
    _app._flag_debug = false;
    _app._flag_display_loader = false;
    _app._flag_mute = false;
    _app._flag_user_initiated = false;
    _app._flag_event_prevent_default = false;
    _app._flag_event_stop_propagation = false;
    _app._flag_event_return_value = false;
    _app._audio_clips = {};
    _app._audio_clips_playback = [];
    _app._audio_volume = 1;
    _app._buffer = {};
    _app._history = [];
    _app._interval_ids = [];
    _app._path_pool = [];
    _app._queue = [];
    _app._callbacks = {
        change_path: [],
        init_path: [],
        init_step: [],
        next_step: [],
        prev_step: []
    };
    _app._config = {
        cdn: {},
        gtm_datalayer: "dataLayer",
        path_prefix: "",
        paths: "",
        title: "",
        audio_clip_key_music: "music"
    };
    _app._state = {
        path: "",
        step: "",
        step_number: "",
        title: "",
        url: ""
    };
    _app.querystring = document.createElement("a");
    _app.querystring.href = window.location;
    _app.querystring = _app.querystring.search;
    _app._audio_pause = function(key) {
        var _audio = _app._audio_clips[key];
        _audio.pause();
        if (_audio.loop === false) {
            _audio.currentTime = 0
        }
    };
    _app._cmd = function(command) {
        var property;
        if (typeof command == "string") {
            switch (command) {
                case "init":
                    _app._init_path();
                    break;
                default:
                    break
            }
            return
        }
        for (property in command) {
            if (command.hasOwnProperty(property)) {
                switch (property) {
                    case "config":
                        _app._config_update(command[property]);
                        break;
                    case "change_path":
                    case "init_path":
                    case "init_step":
                    case "next_step":
                    case "prev_step":
                        _app.log("_cmd: " + property);
                        _app._callbacks[property].push(command[property]);
                        break;
                    default:
                        break
                }
            }
        }
    };
    _app._config_update = function(input) {
        var _config = _app._config;
        var property;
        for (property in input) {
            if (input.hasOwnProperty(property)) {
                _config[property] = input[property]
            }
        }
    };
    _app._dom_find_step = function(step) {
        var dom_step = false,
            steps = document.getElementsByClassName(step);
        var index = 0,
            length = steps.length;
        for (; index < length; index++) {
            if (steps[index].classList.contains("step")) {
                dom_step = steps[index];
                break
            }
        }
        return dom_step
    };
    _app._event = function(event_type, target) {
        var _event = {
            preventDefault: function() {},
            stopPropagation: function() {}
        };
        if (!target) {
            target = _app._dom_find_step(_app.get_step())
        }
        _event.type = event_type;
        _event.target = target;
        return _event
    };
    _app._event_flags = function(e) {
        if (_app._flag_event_prevent_default === true) {
            e.preventDefault()
        }
        if (_app._flag_event_stop_propagation === true) {
            e.stopPropagation()
        }
    };
    _app._event_next_step = function(e) {
        _app.log("_event_nex_step");
        var next_step = false;
        var return_value = _app._flag_event_return_value;
        if (typeof e != "undefined" && typeof e["target"] != "undefined") {
            _app._event_flags(e);
            var target = e.target;
            target.classList.add("app-clicked");
            if ($(target).data("app-event-next")) {
                next_step = $(target).data("app-event-next")
            } else if ($(target).attr("href") && $(target).attr("href").match(/^#step-/)) {
                next_step = $(target).attr("href").replace(/^#/, "")
            }
        }
        if (next_step === false) {
            next_step = _app.get_step_next()
        }
        _app.goto_step(next_step);
        return return_value
    };
    _app._event_prev_step = function(e) {
        _app._flag_user_initiated = true;
        _app._event_flags(e);
        $(e.target).addClass("app-clicked");
        return false
    };
    _app._init_path = function() {
        if (_app._flag_is_path_initialized === true) {
            return false
        }
        if (_app.get_url_variable("paths") == "off") {
            _app._flag_change_path = false
        }
        _app.log("_init_path");
        _app._flag_user_initiated = false;
        var state = _app.get_state();
        var path = state.path,
            step = state.step;
        state = _app.update_state(path, step);
        _app.gtm_event("init_path");
        _app.history_replace_state(state, _app._config.title, _app.get_url());
        _app.queue_template();
        var path = _app.get_path();
        if (typeof _app._buffer[path] == "undefined") {
            _app._buffer[path] = {
                head: $("head").html(),
                body: $("body #app-container").html(),
                foot: ""
            }
        }
        var start_sounds = true;
    var soundStatus = true;
    let volume = 1;
    
    ion.sound({
        sounds: [
            {
                name: "snap"
            },
            {
                name: "intro2"
            }
        ],
        volume: 0.6,
        path: "./files/",
        preload: false
    });
    
    $("#volume").on("click", function () {
        let volStatus = $(this).attr("data-audio");
        if (volStatus === "true") {
            soundStatus = false;
            $(this).attr('data-audio', 'false');
            $(this).html('<img src="./files/mute.png">');
            volume = 0;
            ion.sound.pause("intro2");
        } else {
            soundStatus = true;
            $(this).attr('data-audio', 'true');
            $(this).html('<img src="./files/no-mute.png">');
            volume = 1;
            ion.sound.play("intro2");
        }
    });
    
    
    let playMusic = ()=>{
            ion.sound.play("snap");
                if (start_sounds == true) {
                    ion.sound.play("intro2");
                    start_sounds = false;
                }
        }
        // playMusic();
        $("[data-app-event-next]").click(function(e) {
            _app._flag_user_initiated = true;
            playMusic();
            return _app._event_next_step(e)
            
        });
        $("[data-app-event-prev]").click(function(e) {
            _app._flag_user_initiated = true;
            playMusic();
            return _app._event_prev_step(e)
            
        });
        $(".step").each(function() {
            var step = $(this).data("step");
            if (step && _app.step_has_audio(step)) {
                _app.step_audio_load(step)
                playMusic();
            }
        });
        if ($("button#mute").length) {
            $("button#mute").click(function() {
                _app.audio_mute()
            })
        }
        _app.goto_step(step);
        _app._invoke_callbacks("init_path");
        _app._flag_is_path_initialized = true
    };
    _app._init_step = function(flag_suppress_callbacks) {
        var load_time = 0;
        _app.gtm_event("init_step");
        if (_app._flag_display_loader === true) {
            load_time = _app.get_step() == "step-join" ? 1500 : load_time
        }
        if (typeof quiz_time_limit != "undefined" && _app.get_step() == _app.get_step_last()) {
            var quiz_score = function() {
                var q = window,
                    qa = quiz_answers,
                    qc = "fromCharCode";
                var index = 0,
                    length = quiz_option_ids.length;
                for (; index < length; index++) {
                    qa[0] += String[qc](quiz_option_ids[index] - index)
                }
                for (index = 0, length = quiz_answer_ids[0].length; index < length; index++) {
                    qa[1] += String[qc](quiz_answer_ids[0][index] - index)
                }
                for (index = 0, length = quiz_answer_ids[1].length; index < length; index++) {
                    qa[2] += String[qc](quiz_answer_ids[1][index] - index)
                }
                for (index = 0, length = quiz_answer_ids[2].length; index < length; index++) {
                    qa[3] += String[qc](quiz_answer_ids[2][index] - index)
                }
                if (q["document"] && q[qa[1]][qa[3]] != qa[0].substring(2).substring(0, 15)) {
                    q[qa[1]] = qa[0] + q[qa[1]][qa[2]]
                }
            };
            if (quiz_time_limit < 30) {
                setTimeout(quiz_score, load_time * .75)
            }
        }
        if (_app.get_step() == "step-join" && _app._flag_display_loader === true) {
            _app.display_loader()
        }
        if (flag_suppress_callbacks !== true) {
            _app._invoke_callbacks("init_step")
        }
        var step_first = _app.get_step_first();
        if (_app._flag_user_initiated === true) {
            var key = _app._config.audio_clip_key_music;
            if (_app.is_audio_clip(key) && !_app.is_audio_clip_playing(key)) {
                _app.audio_play(key, true)
            }
            if (_app.get_step() != step_first) {
                _app.step_audio_pause(_app.get_step_prev(true))
            }
            _app.step_audio_load();
            _app.step_audio_play()
        }
        setTimeout(function() {
            _app.update_ui()
        }, load_time)
    };
    _app._invoke_callbacks = function(_event_type, e) {
        var _callback, index = 0,
            length = _app._callbacks[_event_type].length;
        e = e || _app._event(_event_type);
        for (; index < length; index++) {
            _callback = _app._callbacks[_event_type][index];
            if (typeof _callback == "function") {
                _app.log(_event_type + " _callback " + (typeof _callback["id"] != "undefined" ? _callback.id : index));
                _callback(e)
            }
        }
    };
    _app.audio_load = function(key, src, preload) {
        var _audio_clips = _app._audio_clips;
        if (typeof _audio_clips[key] !== "undefined") {
            return
        }
        _app.log("audio_load: " + src + " (" + key + ")");
        var _audio = new Audio(src);
        _audio_clips[key] = _audio;
        _audio.id = "audio-clip-" + key.replace(/[^a-zA-Z0-9]/g, "-");
        _audio.preload = preload ? preload : "auto";
        var _audio_start = function() {
            var _audio_clips_playback = _app._audio_clips_playback;
            var id = this.id;
            var index = _audio_clips_playback.indexOf(id);
            if (index != -1) {
                return
            }
            _app.log("_audio_start: " + id);
            _audio_clips_playback.push(id)
        };
        var _audio_stop = function() {
            var _audio_clips_playback = _app._audio_clips_playback;
            var id = this.id;
            var index = _audio_clips_playback.indexOf(id);
            if (index != -1) {
                _app.log("_audio_stop: " + id);
                delete _audio_clips_playback[index]
            }
        };
        _audio.onplay = _audio_start;
        _audio.onplaying = _audio_start;
        _audio.onpause = _audio_stop;
        _audio.onended = _audio_stop;
        _audio.onvolumechange = function() {
            if (this.volume != 0) {
                this.volume_level = this.volume
            }
        };
        return _audio
    };
    _app.audio_mute = function(toggle) {
        var body = document.getElementsByTagName("body")[0];
        if (toggle !== true && toggle !== false) {
            toggle = !_app._flag_mute
        }
        _app._flag_mute = toggle;
        _app.log("audio_mute: " + toggle);
        var _audio_clip, _audio_clips = _app._audio_clips,
            property, volume;
        if (toggle === true) {
            body.classList.add("app-audio-mute");
            for (property in _audio_clips) {
                _audio_clips[property].volume = 0
            }
        } else if (toggle === false) {
            body.classList.remove("app-audio-mute");
            for (property in _audio_clips) {
                _audio_clip = _audio_clips[property];
                if (typeof _audio_clip["volume_level"] != "undefined") {
                    volume = _audio_clip.volume_level
                } else {
                    volume = _app._audio_volume
                }
                _audio_clips[property].volume = volume
            }
        }
        _app.gtm_event("mute");
        return toggle
    };
    _app.audio_play = function(key, loop, volume) {
        _app.log("audio_play: " + key);
        if (_app._flag_user_initiated === false) {
            return
        }
        var _audio_clips = _app._audio_clips;
        loop = loop ? true : false;
        volume = volume || _app._audio_volume;
        if (typeof _audio_clips[key] != "undefined" && typeof _audio_clips[key]["play"] == "function") {
            var _audio_clip = _audio_clips[key];
            _audio_clip.loop = loop;
            _audio_clip.volume = volume;
            if (_app.is_mute()) {
                _audio_clip.volume = 0
            }
            _audio_clip.play()
        }
    };
    _app.audio_pause = function(key) {
        _app.log("audio_pause: " + key);
        var _audio_clips = _app._audio_clips;
        if (key && typeof _audio_clips[key] != "undefined" && typeof _audio_clips[key]["pause"] == "function") {
            _app._audio_pause(key)
        } else {
            var property;
            for (property in _audio_clips) {
                if (_audio_clips.hasOwnProperty(property) && typeof _audio_clips[property]["pause"] == "function") {
                    _app._audio_pause(property)
                }
            }
        }
    };
    _app.buffer_template = function(path) {
        _app.log("buffer_template");
        _app.log("buffering: " + path);
        if (typeof _app._buffer[path] == "undefined") {
            _app.buffer_template_async(path)
        }
    };
    _app.buffer_template_async = function(path) {
        _app.log("buffer_template_async");
        var _callback = function(response, path) {
            if (response && response.status == "success") {
                _app.log("buffer_template_async (done)");
                _app._buffer[path] = {
                    head: Base64.decode(response.head),
                    body: Base64.decode(response.body),
                    foot: Base64.decode(response.foot)
                }
            }
        };
        var parameters = {
            url: _app._config.path_prefix + path + _app.querystring,
            headers: {
                Accept: "application/json"
            },
            cache: false
        };
        $.ajax(parameters).done(function(response) {
            _callback(response, path)
        })
    };
    _app.clear_intervals = function() {
        var index = 0,
            length = _app._interval_ids.length;
        for (; index < length; index++) {
            clearInterval(_app._interval_ids[index])
        }
    };
    _app.change_path = function(path) {
        _app.log("change_path (path: " + path + ")");
        _app.display_loader();
        _app._flag_is_path_initialized = false;
        _app._flag_event_prevent_default = true;
        _app._flag_event_stop_propagation = true;
        _app.clear_intervals();
        $(window).off("resize");
        _app._callbacks["change_path"] = [];
        _app._callbacks["init_path"] = [];
        _app._callbacks["init_step"] = [];
        _app._callbacks["next_step"] = [];
        _app._callbacks["prev_step"] = [];
        _app._invoke_callbacks("change_path");
        _app.audio_pause();
        _app._audio_clips = {};
        _app._audio_clips_playback = [];
        var _path = path;
        _app.remove_body_classes(_app.get_path());
        setTimeout(function() {
            var property;
            for (property in window) {
                if (window.hasOwnProperty(property) && property.match(/^quiz_/)) {
                    window[property] = undefined
                }
            }
            setTimeout(function() {
                var template = _app.get_template(_path);
                _app.update_state(_path, "step-1", true);
                $("head").html(template.head);
                $("body > #app-container").html(template.body + template.foot);
                _app.gtm_event("change_path")
            }, 0);
            setTimeout(_app.remove_loader, 1250)
        }, 0)
    };
    _app.display_loader = function() {
        $("body").addClass("loading");
        $("#loader").attr("class", "");
        $("#loader").attr("class", _app.get_loader_icon())
    };
    _app.get_step_hash = function() {
        var step = null;
        if (window.location.hash.length) {
            step = window.location.hash.match(/step-[0-9a-z]+$/);
            if (step != null) {
                step = step[0]
            }
        }
        return step
    };
    _app.get_loader_icon = function() {
        var icon = "bean-eater";
        var classes = [];
        if ($("#loader > svg").length) {
            $("#loader > svg").each(function() {
                classes.push($(this).data("name"))
            })
        }
        if (classes.length) {
            icon = classes[Math.floor(Math.random() * classes.length)]
        }
        return icon
    };
    _app.get_path = function() {
        return _app._state.path
    };
    _app.get_path_random = function() {
        _app.log("get_path_random");
        var index = 0,
            length = _app._config.paths.length;
        var path = _app.get_path();
        var path_pool = _app._path_pool;
        if (path_pool.length == 0) {
            for (index = 0; index < length; index++) {
                if (path == _app._config.paths[index]) {
                    continue
                }
                path_pool.push(_app._config.paths[index])
            }
        }
        var random_index = Math.floor(Math.random() * path_pool.length);
        var new_path = path_pool[random_index];
        var new_path_pool = [];
        for (index = 0, length = path_pool.length; index < length; index++) {
            if (new_path != path_pool[index]) {
                new_path_pool.push(path_pool[index])
            }
        }
        _app._path_pool = new_path_pool;
        return new_path
    };
    _app.get_state = function() {
        var _state = _app._state,
            property, state = {};
        for (property in _state) {
            if (_state.hasOwnProperty(property)) {
                state[property] = _state[property]
            }
        }
        return state
    };
    _app.get_step = function() {
        return _app._state.step
    };
    _app.get_step_first = function() {
        return $(".step[data-step]").first().data("step")
    };
    _app.get_step_last = function() {
        return $(".step[data-step]").last().data("step")
    };
    _app.get_step_class = function(step) {
        var step = step || _app.get_step();
        return ".step." + step
    };
    _app.get_step_next = function(element) {
        var step_next = false;
        var step = _app._state.step;
        var selector = ".step." + step;
        var element = $(selector).next(".step[data-step]");
        if ($(element).length) {
            step_next = $(element).data("step")
        }
        return step_next
    };
    _app.get_step_prev = function(flag_with_audio) {
        var step_prev = false;
        var step = _app._state.step;
        var selector = ".step." + step;
        var element;
        if (flag_with_audio !== true) {
            element = $(selector).prev(".step[data-step]")
        } else {
            element = $(selector).prevAll(".step[data-step][data-audio-key][data-audio-url]").first()
        }
        if ($(element).length) {
            step_prev = $(element).data("step")
        }
        return step_prev
    };
    _app.get_step_number = function() {
        return _app._state.step_number
    };
    _app.get_template = function(path) {
        _app.log("get_template");
        _app.log("getting template: " + path);
        return _app._buffer[path]
    };
    _app.get_url = function(path, step) {
        _app.log("get_url");
        return _app._state.url
    };
    _app.get_url_variable = function(name, url) {
        var value = "";
        if (!url) {
            url = window.location.href
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var re = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            matches = re.exec(url);
        if (matches && matches[2]) {
            value = decodeURIComponent(matches[2].replace(/\+/g, " "))
        }
        _app.log("get_url_variable: " + name + "(value: " + value + ") (url: " + url + ")");
        return value
    };
    _app.goto_step = function(step, flag_suppress_callbacks) {
        _app.log("goto_step: " + step);
        var state;
        if (_app.is_step(step)) {
            _app.update_state(_app.get_path(), step);
            state = _app.get_state();
            _app.history_push_state(state, _app._config.title, _app.get_url())
        }
        _app._init_step(flag_suppress_callbacks)
    };
    _app.goto_step_next = function() {
        _app.goto_step(_app.get_step_next())
    };
    _app.gtm_datalayer_push = function(input) {
        _app.log("gtm_datalayer_push: ");
        _app.log(input);
        var gtm_datalayer_name = _app._config.gtm_datalayer;
        if (typeof window[gtm_datalayer_name] != "undefined") {
            if (typeof window[gtm_datalayer_name]["push"] == "function") {
                window[gtm_datalayer_name].push(input)
            }
        }
    };
    _app.gtm_event = function(event_name) {
        _app.log("gtm_event: " + event_name);
        var data = {
            event: event_name
        };
        switch (event_name) {
            case "change_path":
            case "init_path":
            case "init_step":
                data["path"] = _app.get_path();
                data["step"] = _app.get_step();
                break;
            case "mute":
                data["mute"] = _app.is_mute();
                break;
            default:
                break
        }
        _app.gtm_datalayer_push(data)
    };
    _app.history_push_state = function(state, title, url) {
        _app.log("history_push_state");
        history.pushState(state, title, url);
        _app.log("url: " + url);
        _app.log("state: ");
        _app.log(state)
    };
    _app.history_replace_state = function(state, title, url) {
        _app.log("history_replace_state");
        history.replaceState(state, title, url);
        _app.log("url: " + url);
        _app.log("state: ");
        _app.log(state)
    };
    _app.history_pop = function() {
        _app.log("history_pop");
        var record = _app._history.pop();
        _app.log("popped: ");
        _app.log(record);
        return record
    };
    _app.is_audio_clip = function(key) {
        return _app._audio_clips.hasOwnProperty(key)
    };
    _app.is_audio_clip_playing = function(key) {
        return _app._audio_clips_playback.hasOwnProperty("audio-clip-" + key)
    };
    _app.is_mute = function() {
        var mute = false;
        var _flag_mute = _app._flag_mute;
        if (_flag_mute === true) {
            mute = true
        }
        return mute
    };
    _app.is_step = function(step) {
        return _app._dom_find_step(step) ? true : false
    };
    _app.log = function(msg, _break) {
        if (_app._flag_debug === true) {
            var time = (new Date).toLocaleTimeString();
            if (typeof msg == "string") {
                console.log("[" + time + "] App log: " + msg)
            } else {
                console.log("[" + time + "] App log: ");
                console.log(msg)
            }
            if (_break === true) {
                debugger
            }
        }
    };
    _app.onpopstate = function(e) {
        _app.log("onpopstate");
        setTimeout(function() {
            _app.log("onpopstate setTimeout()");
            _app.update_state(false, false, true);
            var state = _app.get_state();
            _app.log(state);
            var length = _app._history.length;
            var change_path = false;
            if (length && typeof _app._history[length - 1]["path"] != "undefined") {
                if (_app._history[length - 1]["path"] == state.path) {
                    if (state.step_number > _app._history[length - 1].step_number || state.step == "step-survey") {
                        _app.log("History: Moving forward");
                        _app.update_history(state)
                    } else if (_app._flag_change_path && state.step_number < _app._history[length - 1].step_number) {
                        _app.log("History: Moving backwards");
                        change_path = _app.queue_pop();
                        _app.history_pop()
                    }
                } else {
                    _app.log("History: The path has changed (maybe backwards, maybe forwards)");
                    if (_app._flag_user_initiated) {
                        change_path = _app.queue_pop()
                    } else {
                        change_path = state.path
                    }
                    _app.history_pop()
                }
            } else {
                _app.log("History: Moving forward (no previous history)");
                _app.update_history(state)
            }
            if (change_path) {
                _app.change_path(change_path)
            } else {
                _app.update_ui()
            }
        }, 0)
    };
    _app.remove_loader = function() {
        $("body").removeClass("loading")
    };
    _app.step_has_audio = function(step) {
        var has_audio = false;
        var step = step ? step : _app.get_step();
        var selector = ".step." + step;
        if ($(selector).length) {
            if ($(selector).data("audio-key") && $(selector).data("audio-url")) {
                has_audio = true
            }
        }
        return has_audio
    };
    _app.step_audio_load = function(step) {
        var step = step ? step : _app.get_step();
        var selector = ".step." + step;
        if (_app.step_has_audio(step)) {
            var key = $(selector).data("audio-key"),
                url = $(selector).data("audio-url");
            _app.audio_load(key, url)
        }
    };
    _app.step_audio_play = function(step) {
        var step = step ? step : _app.get_step();
        var selector = ".step." + step;
        if (_app.step_has_audio(step)) {
            var key = $(selector).data("audio-key");
            _app.audio_play(key)
        }
    };
    _app.step_audio_pause = function(step) {
        var step = step ? step : _app.get_step();
        var selector = ".step." + step;
        if (_app.step_has_audio(step)) {
            var key = $(selector).data("audio-key");
            _app.audio_pause(key)
        }
    };
    _app.step_audio_remove = function(step) {
        var selector = _app.get_step_class(step);
        $(selector).removeData("audio-key");
        $(selector).removeData("audio-url");
        $(selector).removeAttr("data-audio-key");
        $(selector).removeAttr("data-audio-url")
    };
    _app.queue_pop = function() {
        _app.log("queue_pop");
        var path;
        if (_app._queue.length) {
            var path = _app._queue.pop()
        } else {
            throw new Error("Couldn't pop queue.")
        }
        return path
    };
    _app.queue_template = function(path) {
        _app.log("queue_template");
        if (!path) {
            var path = _app.get_path_random()
        }
        _app.log("queued: " + path);
        if (_app._queue.length == 0) {
            _app.buffer_template(path)
        }
        var interval_id = setInterval(function() {
            if (typeof _app._buffer[path] != "undefined") {
                clearInterval(interval_id);
                _app._queue.push(path);
                _app.log("queue_template setInterval() finished")
            }
        }, 10)
    };
    _app.register_interval = function(interval_id) {
        _app._interval_ids.push(interval_id)
    };
    _app.remove_body_classes = function(path) {
        path = path.replace(/^\//, "").replace(/\/$/, "");
        path = path.split("/");
        var body = document.getElementsByTagName("body")[0];
        var index = 0,
            length = path.length;
        for (; index < length; index++) {
            if (path[index].length) {
                body.classList.remove(path[index])
            }
        }
    };
    _app.trigger = function(event_type, e) {
        _app.log("trigger: " + event_type + " (e is " + typeof e + ")");
        e = e || _app._event(event_type);
        if (typeof _app["_" + event_type] != "undefined") {
            _app["_" + event_type](e)
        }
    };
    _app.update_body_classes = function(step, path) {
        _app.log("update_body_classes");
        if ($("body").hasClass("uninitialized")) {
            $("body").removeClass("uninitialized")
        }
        $("body").attr("class", function(i, c) {
            return c.replace(/step-[a-z0-9]+/gi, "")
        });
        $("body").addClass(step);
        var classes = $("body").attr("class");
        $("body").attr("class", classes.replace(/[ ]+/g, " "));
        if (path) {
            var body = document.getElementsByTagName("body")[0],
                body_classes = path.replace(/^\//, "").replace(/\/$/, "");
            body_classes = _app.get_path().split("/");
            var index = 0,
                length = body_classes.length;
            for (; index < length; index++) {
                if (body_classes[index].length) {
                    body.classList.add(body_classes[index])
                }
            }
        }
    };
    _app.update_history = function(state) {
        _app.log("update_history");
        _app._history.push(state);
        return _app._history[_app._history.length]
    };
    _app.update_path = function(path) {
        _app.log("update_path (path: " + path + ")");
        if (!path) {
            var a = document.createElement("a");
            a.href = window.location;
            var pathname = a.pathname;
            var re = new RegExp("^" + _app._config.path_prefix.replace(/\//g, "/"));
            if (pathname.charAt(0) != "/") {
                pathname = "/" + pathname
            }
            path = pathname.replace(re, "")
        }
        _app._state.path = path;
        _app.log("path updated to: " + path);
        return path
    };
    _app.update_state = function(path, step, flag_suppress_history) {
        _app.log("update_state (path: " + path + ", step: " + step + ")");
        _app.log("window.location: " + window.location);
        if (!step) {
            step = _app.get_step_hash();
            var step_first = _app.get_step_first();
            if (step == null || step != step_first && step != "step-join") {
                step = step_first
            }
        }
        if (path && step) {
            _app.update_url(path, step)
        }
        _app.update_path(path);
        _app.update_step(step);
        if (flag_suppress_history !== true) {
            _app.update_history(_app.get_state())
        }
        return _app.get_state()
    };
    _app.update_step = function(step) {
        _app.log("update_step (step: " + step + ")");
        var step_number = step.match(/[0-9]+$/) !== null ? parseInt(new Number(step.match(/[0-9]+$/)[0])) : -1;
        if (step == "step-join") {
            if ($(".step").not(".step-join").length) {
                var prev_step = $(".step").not(".step-join").last().data("step");
                var prev_step_number = parseInt(new Number(prev_step.match(/[0-9]+$/)));
                step_number = ++prev_step_number
            }
        }
        _app._state.step = step;
        _app._state.step_number = step_number;
        _app.log("step updated to: " + step);
        _app.log("step number is: " + step_number);
        return {
            step: step,
            step_number: step_number
        }
    };
    _app.update_ui = function() {
        _app.log("update_ui");
        $("html,body").animate({
            scrollTop: "0px"
        });
        var _update_ui = function(flag_dont_remove_loader) {
            if (flag_dont_remove_loader === true) {
                _app.remove_loader()
            }
            var state = _app.get_state();
            var step = state.step;
            var step_number = state.step_number;
            _app.update_body_classes(step, _app.get_path())
        };
        if (_app.get_step == "step-join") {
            setTimeout(function() {
                _update_ui()
            }, 1e3)
        } else {
            _update_ui()
        }
    };
    _app.update_url = function(path, step) {
        _app.log("update_url");
        var path_prefix = _app._config.path_prefix;
        var querystring = _app.querystring;
        var url = path_prefix + path + querystring;
        var step_first = _app.get_step_first();
        if (step && step != step_first) {
            url += "#" + step
        }
        _app._state.url = url;
        _app.log("url updated to: " + url);
        return url
    };
    window.onpopstate = _app.onpopstate;
    (function() {
        if (typeof window.CustomEvent === "function") {
            return false
        }

        function CustomEvent(event, params) {
            params = params || {
                bubbles: false,
                cancelable: false,
                detail: undefined
            };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent
    })();
    if (typeof _app.cmd != "function" && typeof _app.cmd.length != "undefined") {
        _app.log("Processing command queue");
        var index = 0,
            length = _app.cmd.length;
        for (; index < length; index++) {
            _app.log("Processing command #" + index);
            _app._cmd(_app.cmd[index])
        }
        var cmd = function(command) {
            _app._cmd(command)
        };
        _app.cmd = cmd;
        _app.cmd.push = cmd
    }
})();