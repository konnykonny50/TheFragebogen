/**
Tests lifecycle of UIElementInteractive.
Tests: isEnabled(), setEnabled(), isUIcreated(), createUI(), releaseUI()
*/
QUnit.test("UIElements: lifecycle", function(assert) {

    function test(element) {
        //enabled
        assert.ok(element.isEnabled() === false, element.constructor.name + ": isEnabled() is false by default.");

        element.setEnabled(true);
        assert.ok(element.isEnabled() === false, element.constructor.name + ": cannot be enabled before calling createUI().");
        assert.ok(element.isUIcreated() === false, element.constructor.name + ": isUIcreated() returns 'false' by default.");

        //createUI
        element.createUI();
        if (element.node !== null && element.node !== undefined) { //Element has UI?
            assert.ok(element.isUIcreated() === true, element.constructor.name + ": isUIcreated() returns 'true' after creating UI.");
            assert.ok(element.node !== null, element.constructor.name + ": 'node' is not null after creating UI.");

            element.setEnabled(true);
            assert.ok(element.isEnabled() === true, element.constructor.name + ": isEnabled() is true after setEnabled(true).");

            element.setVisible(false);
            assert.ok(element.node.style.visibility === "hidden", element.constructor.name + ": setVisible(false) hides the element.");
            element.setVisible(true);
            assert.ok(element.node.style.visibility === "visible", element.constructor.name + ": setVisible(true) shows the element.");

            assert.ok(element.node.className === "testCSS", element.constructor.name + " testing application of CSS class.");
        }

        element.releaseUI();
        assert.ok(element.isUIcreated() === false, element.constructor.name + ": isUIcreated() returns 'false' after releasing UI.");
        assert.ok(element.node === null, element.constructor.name + ": 'node' is null after releasing UI.");
        assert.ok(element.isEnabled() === false, element.constructor.name + ": isEnabled() returns false after releaseUI().");

        assert.ok(JSON.stringify(element) !== null, element.constructor.name + ": does not hold any circular references.");
    }

    test(new QuestionnaireItemDate("testCSS", "Hallo", false));
    test(new QuestionnaireItemDefinedOne("testCSS", "Hallo", false, ["60", "70"]));
    test(new QuestionnaireItemDefinedMulti("testCSS", "Hallo", false, ["60", "70"]));
    test(new QuestionnaireItemDefinedRange("testCSS", "Hallo", false));
    test(new QuestionnaireItemDefinedSelector("testCSS", "Hallo", false, ["1", "2"]));
    test(new QuestionnaireItemText("testCSS", "Hallo", false));
    test(new QuestionnaireItemTextArea("testCSS", "Hallo"));
    test(new QuestionnaireItemSVGQuality7pt("testCSS", "Hallo", false));
    test(new QuestionnaireItemWrite("testCSS", "Hallo", false));
    test(new QuestionnaireItemSystemConst("Hallo", "60"));
    test(new QuestionnaireItemSystemScreenDuration());
    test(new QuestionnaireItemSystemScreenDateTime());
    test(new QuestionnaireItemSystemURL());
});

/**
Testing of QuestionnaireItems: answers, data, required, and setPaginateCallback.
Checks: isRequired(), isReady(),setAnswer(), getAnswer(), releaseUI().
*/
QUnit.test("QuestionnaireItems: Answers, getData and required", function(assert) {
    function test(element, answer) {
        element.setOnReadyStateChangedCallback(function() {
            element.testOnReadyCallback = true;
        });

        assert.ok(element.isRequired() === true, element.constructor.name + ": checking isRequired().");

        assert.ok(element.isReady() === false, element.constructor.name + ": checking isReady().");

        element.setAnswer(answer);
        assert.ok(element.isReady() === true, element.constructor.name + ": checking isReady() after setting answer.");
        assert.ok(element.getAnswer() == answer, element.constructor.name + ": checking getAnswer() after creating the UI and setting an answer");
        assert.ok(element.testOnReadyCallback === true, element.constructor.name + ": checking if onReadyStateChanged() was called.");

        element.setAnswer(null); //Clear Answer
        assert.ok(element.isReady() === false, element.constructor.name + ": checking isReady() after required answer was removed.");

        element.setAnswer(answer);
        element.releaseUI();
        assert.ok(element.getAnswer() == answer, element.constructor.name + ": checking getAnswer() after releaseUI().");
    }

    test(new QuestionnaireItemDate("testCSS", "Hallo", true));
    test(new QuestionnaireItemDefinedOne("testCSS", "Hallo", true, ["60", "70"]), "60");
    test(new QuestionnaireItemDefinedMulti("testCSS", "Hallo", true, ["60", "70"]), "60");
    test(new QuestionnaireItemDefinedRange("testCSS", "Hallo", true, 0, 10), 5);
    test(new QuestionnaireItemDefinedSelector("testCSS", "Hallo", true, ["1", "2"]), "1");
    test(new QuestionnaireItemSVGQuality7pt("testCSS", "Hallo", true), "70");
    test(new QuestionnaireItemText("testCSS", "Hallo", true), "testCSS");
    test(new QuestionnaireItemTextArea("testCSS", "Hallo", true, "Test"));
    test(new QuestionnaireItemWrite("testCSS", "Hallo", true), "data:image/png;base64,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");
});
