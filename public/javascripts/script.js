(function () {
    "use strict";

    $(function () {

        // Readmore-js initialize
        $('.articleText').readmore({
            collapsedHeight: 120,
            moreLink: '<a href="#">Læs mere</a>',
            lessLink: '<a href="#">Luk</a>'
        });

        $('#login-form-link').click(function (e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-form-link').click(function (e) {
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

    });
}());

(function ($, W, D) {
    var JQUERY4U = {};

    JQUERY4U.UTIL = {
        setupFormValidation: function () {
            //form validation rules
            $('#register-form').validate({
                rules: {
                    username: 'required',
                    firstname: 'required',
                    lastname: 'required',
                    email: {
                        required: true,
                        email: true
                    },
                    password: {
                        required: true,
                        minlength: 4
                    },
                    confirm_password: {
                        required: true,
                        minlength: 4,
                        equalTo: '#register-password'
                    },
                    messages: {
                        username: 'Indtast venligst et brugernavn',
                        firstname: 'Indtast venligst dit fornavn',
                        lastname: 'Indtast venligst dit efternavn',
                        password: {
                            required: 'Indtast venligst et password',
                            minlength: 'Dit password skal minimum være 4 karakterer langt'
                        },
                        confirm_password: {
                            required: 'Indtast venligst et matchende password',
                            minlength: 'Dit password skal minimum være 4 karakterer langt',
                            equalTo: 'Dine passwords skal matche'
                        },
                        email: 'Indtast venligst en valid email addresse'
                    },
                    submitHandler: function (form) {
                        form.submit();
                    }
                }
            });
        }
    }

    //when the dom has loaded setup form validation rules
    $(D).ready(function ($) {
        JQUERY4U.UTIL.setupFormValidation();
    });

})(jQuery, window, document);