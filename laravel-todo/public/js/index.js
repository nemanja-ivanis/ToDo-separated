$(document).ready(function () {


    /**
     * Handlebar helper function for if condition
     * @param  {String} a     [first comparable parameter]
     * @param  {String} b     [first comparable parameter]
     * @param  {String} opts) [data when condition is true]
     * @return {String}       [data]
     */
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });


    var todo = new ToDoTask();


    /**
     * [On click event handler for #add button,calls addTask function that adds new user in database]

     */
    $('button#add').on('click', function () {

        var template_messages = todo.getTemplateAddMessages();
        var template_new = todo.getTemplateAddNew();

        var new_task = $('#new-task').val();

        todo.addTask(new_task, template_messages, template_new, todo);

    });


    /**
     * [On click event handler for .edit button,on ENTER key calls editTask function that edits the task name in database]

     */
    $('#main-content').on('click', '.edit', function () {


        var parent = $(this).parent();

        var this_element = $(this);

        var task_id = parent.attr('id');

        var base_task_id = parseInt(task_id.substring(task_id.indexOf('-') + 1));


        if (!parent.hasClass('editMode')) {

            parent.addClass('editMode');


            $('.inputTask').keyup(function (e) {
                if (e.keyCode == 13) {
                    var edited_task = this_element.prev('input[type="text"]').val();
                    var edited_label = parent.find('label');
                    var edited_label_value = parent.find('label').text();


                    todo.editTask(edited_label_value, edited_task, base_task_id)

                    edited_label.html(edited_task);

                    $("[id*='" + task_id + "']").each(function (i, el) {
                        $(this).find('label').text(edited_task);
                    });


                    parent.removeClass('editMode');
                }
            });


        } else {


            parent.removeClass('editMode');

        }


    });


    /**
     * [On click event handler for .complete button,calls completeTask function that changes the value in the database to 1(completed)]

     */
    $('#main-content').on('click', '.complete', function () {

        if ($(this).siblings('label').attr('class') == 'completed') {
            alertify.error("Task is already completed!");
            return false;
        }

        var this_element = $(this).parent();

        var task_id = $(this).parent().attr('id');

        var base_task_id = parseInt(task_id.substring(task_id.indexOf('-') + 1));


        todo.completeTask(base_task_id);

        $(this).siblings('label').addClass('completed');

        var task_from_all = $('#all #' + task_id + ' label');

        if (!task_from_all.hasClass('completed')) {

            task_from_all.addClass('completed');
        }
        $('#incomplete-tasks #' + task_id).remove();
        var counter_completed = parseInt($('#counter-completed').text());
        if (counter_completed == 0) {

            $('#completed-section p').remove();
            $('#completed-section').append('<ul id="completed-tasks"></ul>');
            $('#completed-tasks').append(this_element.clone());
        } else {
            $('#completed-tasks').append(this_element.clone());

        }


        $("[id*='" + task_id + "']").each(function (i, el) {
            $(this).find('.complete').addClass('red');

        });

        todo.countTasks();

    });


    /**
     * [On click event handler for .favorite button,calls favoriteTask function that changes the value in the database to 1(favorited)]

     */
    $('#main-content').on('click', '.favorite', function () {

        if ($(this).siblings('label').hasClass('favorited')) {
            alertify.error("Task is already favorited!");

            return false;

        }

        var this_element = $(this).parent();

        var task_id = $(this).parent().attr('id');

        var base_task_id = parseInt(task_id.substring(task_id.indexOf('-') + 1));


        todo.favoriteTask(base_task_id);

        $(this).siblings('label').addClass('favorited');

        var task_from_all = $('#all #' + task_id + ' label');
        var task_from_active = $('#incomplete-tasks #' + task_id + ' label');
        var task_from_complete = $('#completed-tasks #' + task_id + ' label');

        if (!task_from_all.hasClass('favorited')) {

            task_from_all.addClass('favorited');
        }

        if (!task_from_active.hasClass('favorited')) {

            task_from_active.addClass('favorited');
        }

        if (!task_from_complete.hasClass('favorited')) {

            task_from_complete.addClass('favorited');
        }

        var counter_favorite = parseInt($('#counter-favorite').text());
        if (counter_favorite == 0) {

            $('#favorite-section p').remove();
            $('#favorite-section').append('<ul id="favorite-tasks"></ul>');
            $('#favorite-tasks').append(this_element.clone());
        } else {
            $('#favorite-tasks').append(this_element.clone());

        }


        $("[id*='" + task_id + "']").each(function (i, el) {
            $(this).find('.favorite span').removeClass();
            $(this).find('.favorite span').addClass('glyphicon glyphicon-star');
        });


        todo.countTasks();


    });


    /**
     * [On click event handler for .delete button,calls removeTask() function that removes the task from database with the given id]

     */
    $('#main-content').on('click', '.delete', function () {

        var task_id = $(this).parent().attr('id');

        var base_task_id = parseInt(task_id.substring(task_id.indexOf('-') + 1));


        todo.removeTask(base_task_id);


        if ($('#all').has($(this).length)) {
            $("[id*='" + task_id + "']").each(function (i, el) {
                el.remove();
            });
        }

        todo.countTasks();
    });


    /**
     * [On click event handler for #remove-all button,calls removeAllTasks() function that deletes all tasks from database]

     */
    $('#all-section').on('click', '#remove-all', function () {


        todo.removeAllTasks(todo);


    });


    /**
     * [On click event handler for #remove-selected button,calls removeTask() function for every selected task and deletes it]

     */
    $('#all-section').on('click', '#remove-selected', function () {

        var array_of_checked_ids=[];

        $('#all input[type="checkbox"]').each(function (i, el) {

            if ($(this).is(':checked')) {

                var task_id = $(this).parent().attr('id');
                var base_task_id = parseInt(task_id.substring(task_id.indexOf('-') + 1));
                array_of_checked_ids.push(base_task_id);


                $("[id*='" + task_id + "']").each(function (i, el) {
                    el.remove();
                });


            }

        });

        todo.removeSelectedTasks(array_of_checked_ids);

        todo.countTasks();


    });


});