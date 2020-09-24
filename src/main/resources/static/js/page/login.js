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