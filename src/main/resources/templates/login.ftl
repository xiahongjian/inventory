<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Login</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <@loader type="css" res="css/styles.min.css" />
</head>
<body class="focusedform">

<div class="verticalcenter">
    <div class="panel panel-primary">
        <div class="panel-body">
            <h4 class="text-center" style="margin-bottom: 25px;">Log in to get started</h4>
            <form action="#" class="form-horizontal" style="margin-bottom: 0px !important;">
                <div class="form-group">
                    <div class="col-sm-12">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-user"></i></span>
                            <input name="username" type="text" class="form-control" id="username" placeholder="Username" autofocus>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-12">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                            <input name="password" type="password" class="form-control" id="password" placeholder="Password">
                        </div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="pull-right"><label><input type="checkbox" style="margin-bottom: 20px" name="rememberMe" value="true"> Remember Me</label></div>
                </div>
            </form>

        </div>
        <div class="panel-footer">
            <#--<a href="extras-forgotpassword.htm" class="pull-left btn btn-link" style="padding-left:0">Forgot password?</a>-->

            <div class="pull-right">
                <#--<a href="#" class="btn btn-default">Reset</a>-->
                <a id="login-btn" href="#" class="btn btn-primary" onclick="doLogin()">Log In</a>
            </div>
        </div>
    </div>
</div>
<@loader type="js" res="js/jquery-1.10.2.min.js" />
<@loader type="js" res="plugins/layer/layer.js" />
<script>
    var from = '${from!}';
    $(function () {
        $('.verticalcenter').keyup(function (e) {
            if (e.keyCode == 13)
                doLogin();
        });
    });

    function doLogin() {
        var username = $('#username').val(),
            password = $('#password').val(),
            rememberMe = $('#rememberMe').val();
        if (!check(username, password))
            return;
        var params = {
            username: username,
            password: password,
            rememberMe: rememberMe
        };
        $.ajax({
            url: '${request.contextPath}/login',
            method: 'post',
            data: params,
            contentType: 'application/json;charset=UTF-8',
            success: function(resp) {
                var data = JSON.parse(resp.responseText);
                if (!data.success) {
                    layer.msg(data.msg || '操作失败');
                    return;
                }
                window.location.href = from ? from : '/dashboard';
            },
            error: function(resp) {
                var data = JSON.parse(resp.responseText);
                layer.msg(data.msg || '操作失败');
            }
        });
    }
    
    function check(username, password) {
        if (username.trim() == '') {
            layer.tips('用户名不能为空', '#username');
            return false;
        }
        if (password.trim() == '') {
            layer.tips('密码不能为空', '#password');
            return false;
        }
        return true;
    }
</script>
</body>
</html>