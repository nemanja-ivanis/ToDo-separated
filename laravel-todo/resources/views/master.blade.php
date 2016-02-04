<!DOCTYPE html>
<html>
<head>
    <meta name="_token" content="{!! csrf_token() !!}"/>
    <meta charset="UTF-8">
    <title>To Do</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/alertify.core.css" rel="stylesheet">
    <link href="css/alertify.default.css" rel="stylesheet">
</head>
<body>
<nav class="navbar navbar-default navbar-inverse">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1">
                <span class="sr-only">Toggle Navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">ToDo</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
                <li class="{{ (Request::is('/') ? 'active' : '') }}">
                    <a href="{{ URL::to('') }}"><i class="fa fa-home"></i> Home </a>
                </li>

            </ul>

            <ul class="nav navbar-nav navbar-right">
                @if (Auth::guest())
                    <li class="{{ (Request::is('auth/login') ? 'active' : '') }}"><a href="{{ URL::to('auth/login') }}"><i
                                    class="fa fa-sign-in"></i> Login</a></li>
                    <li class="{{ (Request::is('auth/register') ? 'active' : '') }}"><a
                                href="{{ URL::to('auth/register') }}">Register</a></li>
                @else
                    <li class="dropdown">

                        <a href="{{ URL::to('auth/logout') }}"><i class="fa fa-sign-out"></i> Logout</a>

                    </li>
                @endif
            </ul>
        </div>
    </div>
</nav>
<div class="container">
    @yield('content')
</div>


<script type="text/javascript" src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script type="text/javascript">
    $.ajaxSetup({
        headers: {'X-CSRF-Token': $('meta[name=_token]').attr('content')}
    });
</script>
@yield('footer')
</body>
</html>
