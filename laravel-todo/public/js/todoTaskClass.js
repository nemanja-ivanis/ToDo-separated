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
 * ToDoTask Class
 */
ToDoTask.prototype = {

    /**
     * Constructor for ToDoTask object
     */
    constructor: ToDoTask,

    /**
     * Get handler template for add new task message types
     */
    getTemplateAddMessages: function () {
        this.source_messages = $('#add-messages').html();
        return Handlebars.compile(this.source_messages);
    },

    /**
     * Get handlebar template for add new tasks
     */
    getTemplateAddNew: function () {
        this.source_add_new = $('#template-add-new').html();
        return Handlebars.compile(this.source_add_new);
    },


    /**
     * [addTask function for adding task in database]
     * @param {String} task_name [name of the task to be added]
     * @param {Handlebar object} template_messages [template for displaying messages after adding new task]
     * @param {Handlebar object} template_add_new [template for adding new task to the view]
     * @param {Task object} object
     */
    addTask: function (task_name, template_messages, template_add_new, object) {

        var data_message = '';

        if (task_name != '') {


            data_message = {task_name: task_name};

            $.ajax({
                url: "add-task",
                type: "POST",
                data: data_message,
                success: function (data, textStatus, jqXHR) {
                    var last_inserted_id = data;




                    var tasks_counter = parseInt($('#counter-all').text());

                    data_message = {task_name: task_name, last_id: last_inserted_id};
                    var data_message_all = {
                        task_name: task_name,
                        last_id: last_inserted_id,
                        ul_id: 'all',
                        tasks_counter: tasks_counter
                    };
                    var data_message_active = {
                        task_name: task_name,
                        last_id: last_inserted_id,
                        ul_id: 'incomplete-tasks',
                        tasks_counter: tasks_counter
                    };


                    if (tasks_counter == 0) {
                        $('#all-section p,#active-section p').remove();

                        $('#all-section').append(template_add_new(data_message_all));

                        $('#active-section').append(template_add_new(data_message_active));

                    } else {

                        $('#all').append(template_add_new(data_message_all));

                        $('#incomplete-tasks').append(template_add_new(data_message_active));


                    }

                    $('.success').append(template_messages(data_message)).fadeIn('slow').delay(500).fadeOut();
                    setTimeout(function () {
                        $('.success').empty();
                    }, 600);

                    $('.warning').hide();
                    $('#new-task').val('');

                    object.countTasks();

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    data_message = {task_name: ''};
                    $('.warning').append(template_messages(data_message)).fadeIn('slow').delay(500).fadeOut();
                    setTimeout(function () {
                        $('.warning').empty();
                    }, 600);

                    $('.success').hide();
                }
            });


        } else {

            data_message = {task_name: ''};
            $('.warning').append(template_messages(data_message)).fadeIn('slow').delay(500).fadeOut();
            setTimeout(function () {
                $('.warning').empty();
            }, 600);

            $('.success').hide();

        }

    },

    /**
     * [editTask function for editing tasks name]
     * @param  {String} current_name  [current name of the task]
     * @param  {String} new_task_name [new task name]
     * @param {Integer}  base_id             [id of the task to be edited]
     */
    editTask: function (current_name, new_task_name, base_id) {

        var data = {current_name: current_name, new_name: new_task_name, base_id: base_id};
        $.ajax({
            url: "update-task",
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                alertify.success("Task successfully edited!");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Edit error!");
            }
        });

    },

    /**
     * [completeTask function for completing task,changing its value completed to 1(true)]
     * @param {Integer}  base_id             [id of the task to be completed]
     */
    completeTask: function (base_id) {

        var data = {base_id: base_id};
        $.ajax({
            url: "complete-task",
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                alertify.success("Task successfully completed!");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Complete error!");
            }
        });


    },

    /**
     * [favoriteTask function for favoriting task,changing its value favorited to 1(true)]
     * @param {Integer}  base_id             [id of the task to be favorited]
     */
    favoriteTask: function (base_id) {

        var data = {base_id: base_id};
        $.ajax({
            url: "favorite-task",
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {
                alertify.success("Task successfully favorited!");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Favorite error!");
            }
        });


    },

    /**
     * [removeTask function for removing task]
     * @param {Integer}  base_id             [id of the task to be deleted]
     */
    removeTask: function (base_id) {

        var data = {base_id: base_id};
        $.ajax({
            url: "delete",
            type: "POST",
            data: data,
            success: function (data, textStatus, jqXHR) {

                alertify.success("Task deleted!");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Delete error!");
            }
        });

    },
    /**
     * [removeSelectedTasks function for removing task]
     * @param {Integer}  base_id             [id of the task to be deleted]
     */
    removeSelectedTasks: function (array_of_ids) {

        var data = array_of_ids;
        $.ajax({
            url: "delete-selected",
            type: "POST",
            data: {data:data},
            success: function (data, textStatus, jqXHR) {

                alertify.success("Task deleted!");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Delete error!");
            }
        });

    },

    /**
     * [removeAllTasks function for removing all tasks from localStorage and array]
     * @param {Task object} object
     */
    removeAllTasks: function (object) {


        $.ajax({
            url: "delete-all",
            type: "POST",

            success: function (data, textStatus, jqXHR) {
                $('#all').empty();
                $('#incomplete-tasks').empty();
                $('#completed-tasks').empty();
                $('#favorite-tasks').empty();
                object.countTasks();
                alertify.success("All tasks deleted!");

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alertify.error("Delete error!");
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
     * [showTasks function ]
     */
    showTasks: function () {


        this.getTemplates();


        this.countTasks();


    }


};

