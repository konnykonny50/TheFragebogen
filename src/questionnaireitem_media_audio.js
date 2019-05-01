/**
A QuestionnaireItemMedia that plays an audio file.
NOTE: Useful to capture failure to loads.

@augments UIElement
@augments UIElementInteractive
@augments QuestionnaireItem
@augments QuestionnaireItemMedia
*/
class QuestionnaireItemMediaAudio extends QuestionnaireItemMedia {

    /**
    @param {string} [className] CSS class
    @param {string} [question]
    @param {boolean} [required=false]
    @param {string} url The URL of the media element to be loaded; if supported by the browser also data URI.
    @param {boolean} required Element must report ready before continue.
    @param {boolean} [readyOnError=true] Sets ready=true if an error occures.
    */
    constructor(className, question, required, url, readyOnError) {
    super(className, question, required, url, readyOnError);

    TheFragebogen.logger.debug(this.constructor.name + "()", "Set: className as " + this.className + ", urls as " + this.height + ", width as " + this.width);

    this.audioNode = null;
    this.progressbar = null;
}

_createAnswerNode() {
    var node = document.createElement("div");

    this._createMediaNode();

    this.progressbar = document.createElement("progress");
    node.appendChild(this.progressbar);

    node.appendChild(this.audioNode);

    this.audioNode.ontimeupdate = this._onprogress.bind(this);
    this.audioNode.onerror = this._onerror.bind(this);
    this.audioNode.onended = this._onended.bind(this);

    return node;
}

releaseUI() {
    this.node = null;
    this.uiCreated = false;
    this.enabled = false;

    this.audioNode = null;
    this.progressbar = null;
}

_loadMedia() {
    this._createMediaNode();
}

_createMediaNode() {
    if (this.audioNode !== null) {
        TheFragebogen.logger.debug(this.constructor.name + "()", "audioNode was already created.");
        return;
    }

    this.audioNode = new Audio();
    this.audioNode.oncanplaythrough = this._onloaded.bind(this);
    this.audioNode.src = this.url;
}

_play() {
    if (this.audioNode === null) {
        TheFragebogen.logger.warn(this.constructor.name + "()", "Cannot start playback without this.audioNode.");
        return;
    }
    try {
        this.audioNode.play();
    } catch (e) {
        TheFragebogen.logger.warn(this.constructor.name + "()", "No supported format availble.");
        this._onerror();
    }
}

_pause() {
    if (this.audioNode === null) {
        TheFragebogen.logger.warn(this.constructor.name + "()", "Cannot start playback without this.audioNode.");
        return;
    }
    this.audioNode.pause();
}

_onprogress() {
    if (this.progressbar && !isNaN(this.audioNode.duration)) {
        this.progressbar.value = (this.audioNode.currentTime / this.audioNode.duration);
    }
}
}
