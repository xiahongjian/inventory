(function ($, layer) {
    $.extend({
        confirm: function (content, okCallback) {
            layer.confirm(content, {btn: ['确定', '取消']}, okCallback);
        },
        alert: function (msg) {
            layer.alert(msg);
        },
        tips: function (msg, ele) {
            layer.tips(msg, ele);
        },
        msg: function (msg) {
            layer.msg(msg);
        },
        postJSON: function (url, data, success) {
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data),
                success: success
            });
        },
        deleteJSON: function (url, data, success) {
            $.ajax({
                url: url,
                type: 'delete',
                dataType: 'json',
                header: {'Content-Type': 'application/json'},
                data: JSON.stringify(data),
                success: success
            });
        }
    });
})(jQuery, layer);