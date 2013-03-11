/*
 * Bootstrap Validate Scriptlet that supports Twitter Bootstrap styling to 
 * jQuery validate and unobstrusive jQuery validate
 * Author: David Nguyen (diepnn@gmail.com)
 * Version 1.1.0
 */

(function ($) {
    var elements = {
        fieldValidationSpanAll: 'span.field-validation-valid, span.field-validation-error',
        fieldValidationSpanError: 'span.field-validation-error',
        inputValidationError: '.input-validation-error',
        controlGroupDiv: 'div.control-group',
        form: 'form',
        formInput: 'form input, form select, form textarea'
    },
    classes = {
        inlineHelp: 'help-inline',
        error: 'error'
    },
    addInlineHelp = function () {
        /// <summary>Adds inline-help classes</summary>
        $(this).addClass(classes.inlineHelp);
    },
    onFormSubmit = function () {
        /// <summary>Handles form submit event</summary>
        if ($(this).valid()) {
            $(this).find(elements.controlGroupDiv).each(function () {
                if ($(this).find(elements.inputValidationError).length == 0) {
                    $(this).removeClass(classes.error);
                }
            });
        }
        else {
            $(this).find(elements.controlGroupDiv).each(function () {
                if ($(this).find(elements.inputValidationError).length > 0) {
                    $(this).addClass(classes.error);
                }
            });
        }
    },
    onFormInputChange = function () {
        /// <summary>Handles form input change event</summary>
        var parentForm = $(this).parents(elements.form);
        if ($(this).valid()) {
            parentForm.find(elements.controlGroupDiv).each(function () {
                if ($(this).find(elements.inputValidationError).length == 0) {
                    $(this).removeClass(classes.error);
                }
            });
        }
        else {
            parentForm.find(elements.controlGroupDiv).each(function () {
                if ($(this).find(elements.inputValidationError).length > 0) {
                    $(this).addClass(classes.error);
                }
            });
        }
    },
    highlightInitialisedErrors = function () {
        /// <summary>Highlight error inputs that have been initialised (e.g. part of initial page load)</summary>
        $(this).find(elements.controlGroupDiv).each(function () {
            if ($(this).find(elements.inputValidationError).length > 0) {
                $(this).addClass(classes.error);
            }
        });
    },
    init = function () {
        /// <summary>Initialises BootstrapValidate module to add support for Twitter Bootstrap to jQuery validate</summary>
        $(function () {
            $(elements.fieldValidationSpanAll).each(addInlineHelp);
            $(elements.form).off('submit', onFormSubmit).on('submit', onFormSubmit);
            $(elements.formInput).off('change', onFormInputChange).on('change', onFormInputChange);
            $(elements.formInput).off('keyup', onFormInputChange).on('keyup', onFormInputChange);
            $(elements.form).each(highlightInitialisedErrors);
        });
    };

    return {
        init: init
    };
}(jQuery)).init();