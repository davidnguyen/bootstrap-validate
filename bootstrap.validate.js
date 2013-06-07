/*
 * Bootstrap Validate Scriptlet that supports Twitter Bootstrap styling to 
 * jQuery validate and unobstrusive jQuery validate
 * Author: David Nguyen (diepnn@gmail.com)
 * History:
 * - v1.2.0: added a fix from mgreuel to only triggers validation on keyup when the field is already in error state
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
        var $controlGroup = $(this).parents(elements.controlGroupDiv);
        
        // The delay leaves jquery validate some time to insert the validation error
        setTimeout(function() {
            if ($controlGroup.find(elements.inputValidationError).length == 0) {
                $controlGroup.removeClass(classes.error);
            } else {
                $controlGroup.addClass(classes.error);
            }
        }, 500);
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
            $(elements.formInput).off('blur', onFormInputChange).on('blur', onFormInputChange);
            $(elements.form).each(highlightInitialisedErrors);
        });
    };

    return {
        init: init
    };
}(jQuery)).init();