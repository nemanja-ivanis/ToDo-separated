/**
 * Created by Nemanja on 2/3/2016.
 */
$(document).ready(function () {

    var source_register = $('#template-register').html();
    var template_register = Handlebars.compile(source_register);
    $('form').on('submit', function (e) {
        var data = $('form').serialize();
        e.preventDefault();
        $('.alert').remove();
        $.ajax({
            url: "/laravel-todo/public/register",
            type: "POST",
            data: data,
            success: function (data1) {

                if (typeof data1.error !== 'undefined') {
                    $('.panel-body').append(template_register(data1));
                } else {
                    window.location = "/to-do-tasks/";

                }

            },
            error: function (data2) {


                $('.panel-body').append(template_register(data2.responseJSON));
            },


        });


    });


});