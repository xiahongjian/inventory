(function (Vue) {
    function processDate(value) {
        var date = new Date(value),
            Y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate(),
            H = date.getHours(),
            i = date.getMinutes(),
            s = date.getSeconds();
        if (m < 10) {
            m = '0' + m;
        }
        if (d < 10) {
            d = '0' + d;
        }
        if (H < 10) {
            H = '0' + H;
        }
        if (i < 10) {
            i = '0' + i;
        }
        if (s < 10) {
            s = '0' + s;
        }
        return [Y, m, d, H, i, s];
    }
    Vue.filter('date', function (value) {
        if (!value && value != 0)
            return '';
        return new Date(value).Format('yyyy-MM-dd');
    });
    Vue.filter('datetime', function (value) {
        if (!value && value != 0)
            return '';
        return new Date(value).Format('yyyy-MM-dd HH:mm:ss');
    });
    Vue.filter('ymDateStr', function (dateStr) {
        return dateStr ? dateStr.substr(0, 7) : '';
    });
    Vue.filter('ymdDateStr', function (dateStr) {
        return dateStr ? dateStr.substr(0, 10) : '';
    });
    Vue.filter('ymdhmDateStr', function (dateStr) {
        return dateStr ? dateStr.substr(0, 18) : '';
    });
})(Vue);
