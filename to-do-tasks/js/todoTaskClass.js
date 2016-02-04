/**
 * Created by Nemanja on 1/29/2016.
 */


/**
 * TodoTask object
 * @param  {String} storage_name      [name for to do task]
 * @param  {Boolean} storage_active    [boolean value if task is active]
 * @param  {Boolean} storage_completed [boolean value if task is completed]
 * @param  {Boolean} storage_favorited [boolean value if task is favorited]
 * @return {}                   [returns all object variables]
 */
function ToDoTask(storage_name, storage_active, storage_completed, storage_favorited) {

    this.name = storage_name;
    this.active = storage_active;
    this.completed = storage_completed;
    this.favorited = storage_favorited;


};


/**
 *
 * ToDo Class
 */
ToDoTask.prototype = {

    /**
     * Constructor for ToDoTask object
     */
    constructor: ToDoTask,
    /**
     * Get handlebar template for all tasks
     */
    getTemplateAll: function () {

        this.source_all = $('#template-all').html();
        return Handlebars.compile(this.source_all);
    },
    /**
     * Get handlebar template for active tasks
     */
    getTemplateActive: function () {

        this.source_active = $('#template-active').html();
        return Handlebars.compile(this.source_active);

    },
    /**
     * Get handlebar template for completed tasks
     */
    getTemplateCompleted: function () {

        this.source_completed = $('#template-completed').html();
        return Handlebars.compile(this.source_completed);

    },
    /**
     * Get handlebar template for favorited tasks
     */
    getTemplateFavorited: function () {

        this.source_favorited = $('#template-favorited').html();
        return Handlebars.compile(this.source_favorited);
    },
    getNavbarTemplate: function () {
        this.source_navbar = $('#template-navbar').html();
        return Handlebars.compile(this.source_navbar);
    },
    getLoggedTemplate: function () {
        this.source_logged = $('#template-logged').html();
        return Handlebars.compile(this.source_logged);
    },
    /**
     * Get all handlebar templates
     */
    getTemplates: function () {
        this.template_all = this.getTemplateAll();
        this.template_active = this.getTemplateActive();
        this.template_completed = this.getTemplateCompleted();
        this.template_favorited = this.getTemplateFavorited();

        this.template_navbar = this.getNavbarTemplate();
        this.template_logged = this.getLoggedTemplate();


    },

    /**
     * [addTask function for adding task in database]
     * @param {String} task_name [name of the task to be added]
     * @param {Task object} object
     */
    addTask: function (task_name, object) {

        if (task_name !== '') {
            $.ajax({
                url: "/laravel-todo/public/add-task",
                type: "POST",
                data: {task_name: task_name},
                success: function (data) {

                    if (data.success == true) {


                        $('.inputTask').val(task_name);

                        $('.success').html('<i class="fa fa-check"></i>Task added to list').fadeIn('slow').delay(500).fadeOut();

                        $('.warning').hide();


                        $('#new-task').val('');


                        $('#all').empty();
                        $('#incomplete-tasks').empty();
                        $('#favorite-tasks').empty();
                        $('#completed-tasks').empty();
                        object.getTemplates();
                        $('#all').append(object.template_all(data.tasks));
                        $('#incomplete-tasks').append(object.template_active(data.tasks));
                        $('#favorite-tasks').append(object.template_favorited(data.tasks));
                        $('#completed-tasks').append(object.template_completed(data.tasks));

                        object.countTasks();


                        alertify.success("Task successfully added!");
                    } else {
                        alertify.error("Error saving task!");
                    }
                },
                error: function (data) {


                    alertify.error("Request failure!");


                }
            });

        } else {

            $('.warning').html('<i class="fa fa-warning"></i> No task added').show();

            $('.success').hide();

        }

    },

    /**
     * [editTask function for editing tasks name]
     * @param  {String} current_name  [current name of the task]
     * @param  {String} new_task_name [new task name]
     * @param {Task object} object
     */
    editTask: function (current_name, new_task_name, object) {

        $.ajax({
            url: "/laravel-todo/public/update-task",
            type: "POST",
            data: {current_name: current_name, new_name: new_task_name},
            success: function (data) {

                if (data.success == true) {
                    $('#all').empty();
                    $('#incomplete-tasks').empty();
                    $('#favorite-tasks').empty();
                    $('#completed-tasks').empty();
                    object.getTemplates();
                    $('#all').append(object.template_all(data.tasks));
                    $('#incomplete-tasks').append(object.template_active(data.tasks));
                    $('#favorite-tasks').append(object.template_favorited(data.tasks));
                    $('#completed-tasks').append(object.template_completed(data.tasks));

                    object.countTasks();


                    alertify.success("Task successfully edited!");
                } else {
                    alertify.error("Error editing task!");
                }
            },
            error: function (data) {


                alertify.error("Request failure!");


            }
        });


    },

    /**
     * [completeTask function for completing task,changing its value completed to 1(true)]
     * @param  {String} task_name  [task name]
     * @param {Task object} object
     */
    completeTask: function (task_name, object) {

        $.ajax({
            url: "/laravel-todo/public/complete-task",
            type: "POST",
            data: {task_name: task_name},
            success: function (data) {

                if (data.success == true) {
                    $('#all').empty();
                    $('#incomplete-tasks').empty();
                    $('#favorite-tasks').empty();
                    $('#completed-tasks').empty();
                    object.getTemplates();
                    $('#all').append(object.template_all(data.tasks));
                    $('#incomplete-tasks').append(object.template_active(data.tasks));
                    $('#favorite-tasks').append(object.template_favorited(data.tasks));
                    $('#completed-tasks').append(object.template_completed(data.tasks));

                    object.countTasks();


                    alertify.success("Task successfully completed!");
                } else {
                    alertify.error("Error completing task!");
                }
            },
            error: function (data) {


                alertify.error("Request failure!");


            }
        });


    },

    /**
     * [favoriteTask function for favoriting task,changing its value favorited to 1(true)]
     * @param  {String} task_name  [task name]
     * @param {Task object} object
     */
    favoriteTask: function (task_name, object) {

        $.ajax({
            url: "/laravel-todo/public/favorite-task",
            type: "POST",
            data: {task_name: task_name},
            success: function (data) {

                if (data.success == true) {
                    $('#all').empty();
                    $('#incomplete-tasks').empty();
                    $('#favorite-tasks').empty();
                    $('#completed-tasks').empty();
                    object.getTemplates();
                    $('#all').append(object.template_all(data.tasks));
                    $('#incomplete-tasks').append(object.template_active(data.tasks));
                    $('#favorite-tasks').append(object.template_favorited(data.tasks));
                    $('#completed-tasks').append(object.template_completed(data.tasks));

                    object.countTasks();


                    alertify.success("Task successfully favorited!");
                } else {
                    alertify.error("Error favoriting task!");
                }
            },
            error: function (data) {


                alertify.error("Request failure!");


            }
        });


    },

    /**
     * [removeTask function for removing task]
     * @param  {String} task_name  [task name]
     * @param {Task object} object
     */
    removeTask: function (task_name, object) {

        $.ajax({
            url: "/laravel-todo/public/delete",
            type: "POST",
            data: {task_name: task_name},
            success: function (data) {

                if (data.success == true) {
                    $('#all').empty();
                    $('#incomplete-tasks').empty();
                    $('#favorite-tasks').empty();
                    $('#completed-tasks').empty();
                    object.getTemplates();
                    $('#all').append(object.template_all(data.tasks));
                    $('#incomplete-tasks').append(object.template_active(data.tasks));
                    $('#favorite-tasks').append(object.template_favorited(data.tasks));
                    $('#completed-tasks').append(object.template_completed(data.tasks));

                    object.countTasks();


                    alertify.success("Task successfully deleted!");
                } else {
                    alertify.error("Error deleting task!");
                }
            },
            error: function (data) {


                alertify.error("Request failure!");


            }
        });

    },
    /**
     * [removeSelectedTasks function for removing task]
     * @param  {Array} array_of_ids  [ids of tasks that are selected]
     * @param {Task object} object
     */
    removeSelectedTasks: function (array_of_ids, object) {

        $.ajax({
            url: "/laravel-todo/public/delete-selected",
            type: "POST",
            data: {data: array_of_ids},
            success: function (data) {

                if (data.success == true) {

                    $('#all').empty();
                    $('#incomplete-tasks').empty();
                    $('#favorite-tasks').empty();
                    $('#completed-tasks').empty();
                    object.getTemplates();
                    $('#all').append(object.template_all(data.tasks));
                    $('#incomplete-tasks').append(object.template_active(data.tasks));
                    $('#favorite-tasks').append(object.template_favorited(data.tasks));
                    $('#completed-tasks').append(object.template_completed(data.tasks));

                    object.countTasks();


                    alertify.success("Selected tasks successfully deleted!");
                } else {
                    alertify.error("Error deleting task!");
                }
            },
            error: function (data) {


                alertify.error("Request failure!");


            }
        });
    },

    /**
     * [removeAllTasks function for removing all tasks from localStorage and array]
     * @param {Task object} object
     */
    removeAllTasks: function (object) {
        $.ajax({
            url: "/laravel-todo/public/delete-all",
            type: "POST",
            success: function (data) {

                if (data.success == true) {
                    $('#all').empty();
                    $('#incomplete-tasks').empty();
                    $('#favorite-tasks').empty();
                    $('#completed-tasks').empty();

                    object.countTasks();


                    alertify.success("All tasks successfully deleted!");
                } else {
                    alertify.error("Error deleting tasks!");
                }
            },
            error: function (data) {


                alertify.error("Request failure!");


            }
        });
    },

    /**
     * [countTasks function for counting and updating the tasks number in each category]
     */
    countTasks: function () {


        var all_tasks_number = $('#all' + ' li').length;
        $('#counter-all').hide().fadeIn(300).html(all_tasks_number);

        var active_tasks_number = $('#incomplete-tasks' + ' li').length;
        $('#counter-active').hide().fadeIn(300).html(active_tasks_number);

        var completed_tasks_number = $('#completed-tasks' + ' li').length;
        $('#counter-completed').hide().fadeIn(300).html(completed_tasks_number);

        var favorite_tasks_number = $('#favorite-tasks' + ' li').length;
        $('#counter-favorite').hide().fadeIn(300).html(favorite_tasks_number);


    },

    /**
     * [showTasks function for showing tasks,pulling from database and sending to Handlebar for processing]
     * @param {Task object} object
     */
    showTasks: function (object) {


        $.ajax({
            url: "/laravel-todo/public/show-tasks",
            type: "GET",

            success: function (data) {


                if (data.success) {
                    object.getTemplates();
                    $('#all').append(object.template_all(data.tasks));
                    $('#incomplete-tasks').append(object.template_active(data.tasks));
                    $('#favorite-tasks').append(object.template_favorited(data.tasks));
                    $('#completed-tasks').append(object.template_completed(data.tasks));

                    object.countTasks();


                    console.log('tasks');
                } else {
                    object.countTasks();
                    console.log('no tasks')
                }

            },
            error: function (data) {

                console.log('fail');

            }
        });


    },
    checkLogged: function (object) {

        $.ajax({
            url: "/laravel-todo/public/check",
            type: "POST",

            success: function (data) {


                object.getTemplates();
                $('#bs-example-navbar-collapse-1').append(object.template_navbar(data));
                $('#main').append(object.template_logged(data));
                object.showTasks(object);


            },
            error: function (data) {

                console.log('fail');

            }
        });


    }


};

