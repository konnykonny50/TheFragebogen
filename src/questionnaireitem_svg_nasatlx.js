/**
A QuestionnaireItem presenting the NASA Task Load Index, cf. http://humansystems.arc.nasa.gov/groups/tlx/downloads/TLXScale.pdf
See also the manual at http://humansystems.arc.nasa.gov/groups/tlx/downloads/TLX_pappen_manual.pdf

@class QuestionnaireItemSVGNASATLX

@augments QuestionnaireItemSVG
@augments QuestionnaireItem

@param {string} [className] CSS class
@param {string} question
@param {boolean} [required=false]

@param {string} [captionRight] The caption of the left label.
@param {string} [captionLeft] The caption of the right label.
*/
function QuestionnaireItemSVGNASATLX(className, question, required, captionLeft, captionRight) {
    QuestionnaireItemSVG.call(this, className, question, required);

    this.captionLeft = captionLeft;
    this.captionRight = captionRight;
}
QuestionnaireItemSVGNASATLX.prototype = Object.create(QuestionnaireItemSVG.prototype);
QuestionnaireItemSVGNASATLX.prototype.constructor = QuestionnaireItemSVGNASATLX;
QuestionnaireItemSVGNASATLX.prototype._setupSVG = function() {
    this.scaleImage.setAttribute("viewBox", "0 5 115 20");
    this.scaleImage.innerHTML = '@@include("../svg_scales/nasa_tlx_scale_include.svg")';

    this.scaleImage.getElementById("labelLeft").textContent = this.captionLeft;
    this.scaleImage.getElementById("labelRight").textContent = this.captionRight;
};
QuestionnaireItemSVGNASATLX.prototype._getAnswerElements = function() {
    return this.scaleImage.getElementsByTagName("rect");
};
QuestionnaireItemSVGNASATLX.prototype.getAnswerOptions = function(data) {
    return "0-20";
};
