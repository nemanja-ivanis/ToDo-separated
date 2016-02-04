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


    /**
     *Declaration of ToDoTask object
     */
    var todo = new ToDoTask();

    todo.checkLogged(todo);

    /**
     * Call of showTasks function on document ready that shows all tasks to the view
     */
    //todo.showTasks(todo);


    /**
     * [On click event handler for #add button,calls addTask function that adds new user in database]

     */
    $('#main').on('click', '#add', function () {


        var new_task = $('#new-task').val();


        todo.addTask(new_task, todo);


    });


    /**
     * [On click event handler for .edit button,on ENTER key calls editTask function that edits the task name in database]

     */
    $('#main').on('click', '.edit', function () {


        var parent = $(this).parent();

        var this_element = $(this);


        if (!parent.hasClass('editMode')) {

            parent.addClass('editMode');


            $('.inputTask').keyup(function (e) {
                if (e.keyCode == 13) {
                    var edited_task = this_element.prev('input[type="text"]').val();
                    var edited_label = parent.find('label');
                    var edited_label_value = parent.find('label').text();


                    todo.editTask(edited_label_value, edited_task, todo)

                    edited_label.html(edited_task);

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
    $('#main').on('click', '.complete', function () {

        if ($(this).siblings('label').hasClass('completed')) {
            alertify.error("The task is already completed!");

            return false;
        }

        var this_element = $(this).parent();

        var task_id = $(this).parent().attr('id');

        var name = $(this).siblings('label').text();

        todo.completeTask(name, todo);


    });


    /**
     * [On click event handler for .favorite button,calls favoriteTask function that changes the value in the database to 1(favorited)]

     */
    $('#main').on('click', '.favorite', function () {

        if ($(this).siblings('label').hasClass('favorited')) {

            alertify.error("The task is already favorited!");
            return false;

        }

        var this_element = $(this).parent();

        var task_id = $(this).parent().attr('id');

        var name = $(this).siblings('label').text();

        todo.favoriteTask(name, todo);


    });


    /**
     * [On click event handler for .delete button,calls removeTask() function that removes the task from database with the given id]

     */
    $('#main').on('click', '.delete', function () {

        var task_id = $(this).parent().attr('id');
        var name = $(this).siblings('label').text();

        todo.removeTask(name, todo);


    });


    /**
     * [On click event handler for #remove-all button,calls removeAllTasks() function that deletes all tasks from database]

     */
    $('#all-buttons').on('click', '#remove-all', function () {


        todo.removeAllTasks(todo);


    });


    /**
     * [On click event handler for #remove-selected button,calls removeTask() function for every selected task and deletes it]

     */
    $('#all-buttons').on('click', '#remove-selected', function () {

        var array_of_checked_ids = [];

        $('#all input[type="checkbox"]').each(function (i, el) {

            if ($(this).is(':checked')) {

                var task_id = $(this).parent().attr('id');
                var base_task_id = parseInt(task_id.substring(task_id.indexOf('-') + 1));
                array_of_checked_ids.push(base_task_id);


            }

        });

        todo.removeSelectedTasks(array_of_checked_ids, todo);


    });


});