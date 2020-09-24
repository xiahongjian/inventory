function onCheckHandlerFactory(vue, $edit, $delete) {
    return function (row, $ele) {
        vue.selected.push(row);
        var len = vue.selected.length;
        setBtnAttr($edit, $delete, len);
    };
}

function onUncheckHandlerFactory(vue, $edit, $delete) {
    return function (row, $ele) {
        var index = -1;
        for (var i = 0; i < vue.selected.length; i++) {
            if (vue.selected[i].id == row.id) {
                index = i;
                break;
            }
        }
        if (index != -1)
            vue.selected.splice(index, 1);
        var len = vue.selected.length;
        setBtnAttr($edit, $delete, len);
    }
}

function onCheckAllHandlerFactory(vue, $edit, $delete) {
    return function (rows) {
        vue.selected.splice(0, vue.selected.length);
        rows.forEach(function (ele) {
            vue.selected.push(ele);
        });
        if ($edit)
            $edit.attr('disabled', true);
        if ($delete)
            $delete.removeAttr('disabled');
    };
}

function onUncheckAllHandlerFactory(vue, $edit, $delete) {
    return function (rows) {
        vue.selected.splice(0, vue.selected.length);
        if ($edit)
            $edit.attr('disabled', true);
        if ($delete)
            $delete.attr('disabled', true);
    }
}

function setBtnAttr($edit, $delete, len) {
    if ($edit) {
        if (len == 1) {
            $edit.removeAttr('disabled');
        } else {
            $edit.attr('disabled', true);
        }
    }
    if ($delete) {
        if (len > 0) {
            $delete.removeAttr('disabled');
        } else {
            $delete.attr('disabled', true);
        }
    }
}

function dateFormatterFactory(value, format) {
    return new Date(value).Format(format);
}

function dateTimeFormatter(value) {
    return dateFormatterFactory(value, 'yyyy-MM-dd HH:mm:ss');
}

function dateTimeNoSecondFormatter(value) {
    return dateFormatterFactory(value, 'yyyy-MM-dd HH:mm');
}

function dateFormatter(value) {
    return dateFormatterFactory(value, 'yyyy-MM-dd');
}

function ymDateFormatter(dateStr) {
    return dateStr ? dateStr.substr(0, 7) : '-';
}

function ymdDateFormatter(dateStr) {
    return dateStr ? dateStr.substr(0, 10) : '-';
}

function ymdhmDateFormatter(dateStr) {
    return dateStr ? dateStr.substr(0, 18) : '-';
}

var Formatters = {
    dateTimeFormatter: dateTimeFormatter,
    dateTimeNoSecondFormatter: dateTimeNoSecondFormatter,
    dateFormatter: dateFormatter,
    ymDateFormatter: ymDateFormatter,
    ymdDateFormatter: ymdDateFormatter,
    ymdhmDateFormatter: ymdhmDateFormatter
};

function onSortHandlerFactory(vue, $edit, $delete) {
    return function (name, order) {
        vue.selected.splice(0, vue.selected.length);
        if ($edit)
            $edit.attr('disabled', true);
        if ($delete)
            $delete.attr('disabled', true);
    };
}