var nbQuestions = 5;
var nbPropositions = 4;

var questions = [];

var currentConfs = _.shuffle(confs);
currentConfs = currentConfs.slice(0,nbQuestions);

_.each(currentConfs, function(conf) {
    var currentNames = _.shuffle(names);
    currentNames = _.without(currentNames, conf.name);
    currentNames = currentNames.slice(0,nbPropositions-1);

    var answers = [];
    answers.push({ text: conf.name, correct: true});
    _.each(currentNames, function(name) {
        answers.push({text: name, correct: false});
    });
    answers = _.shuffle(answers);

    var question = {
        type: 'radio',
        answers: answers,
        explanation: "plus d'infos sur la conf&eacute;rence " + "[" + conf.text + "](" + conf.link + ")"
    };
    question.text = conf.text;
    questions.push(question);
});



var quizz = {
    title: 'Quizz PHPTour',
    description: 'Amusez vous en tentant de deviner quel est le conf&eacute;rencier d\'apr&egrave;s le titre de la conf&eacute;rence',
    questions: questions
};
angular.module("example-quizz", ['quizz', 'btford.markdown', 'ngAnimate']);
angular.module("example-quizz").constant('quizz', quizz);

var quizzWithoutPreviousButton = angular.extend({}, quizz);
quizzWithoutPreviousButton.options = {
    showPrevious: false
};
angular.module("example-quizz").constant('quizzWithoutPreviousButton', quizzWithoutPreviousButton);
