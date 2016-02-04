/**
 * Created by Nemanja on 2/3/2016.
 */
$(document).ready(function () {

    var source_login = $('#template-login').html();
    var template_login = Handlebars.compile(source_login);
    $('form').on('submit', function (e) {
        var data = $('form').serialize();
        e.preventDefault();
        $('.alert').remove();
        $.ajax({
            url: "/laravel-todo/public/login",
            type: "POST",
            data: data,
            success: function (data1) {


                if (typeof data1.error !== 'undefined') {
                    $('.panel-body').append(template_login(data1));
                } else {
                    window.location = "/to-do-tasks/";

                }


            },
            error: function (data2) {


                $('.panel-body').append(template_login(data2.responseJSON));


            },


        });


    });


});