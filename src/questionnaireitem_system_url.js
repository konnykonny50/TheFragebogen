/**
A QuestionnaireItem that stores the current URL of the web browser.

@augments UIElement
@augments UIElementInteractive
@augments QuestionnaireItem
@augments QuestionnaireItemSystem
@augments QuestionnaireItemSystemConst
*/
class QuestionnaireItemSystemURL extends QuestionnaireItemSystem {

    constructor() {
    super("URL", window.location.href);
}
}
