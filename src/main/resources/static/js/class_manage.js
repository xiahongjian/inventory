var vue = new Vue({
    el: '#page-container',
    data: {
        selected: [],
        clazz: {},
        modalTitle: '新增班级',
        submitting: false
    },
    methods: {
        resetEditProp: function () {
            this.submitting = false;
            this.clazz = {};
        },
        deleteObject: function () {
            var me = this;
            if (me.selected.length == 1) {

                $.confirm('是否确认删除此班级？', function () {
                    $.deleteJSON('class/' + me.selected[0].id, null, responseHandler);
                })
            } else {
                $.confirm('是否确认删除所选所有班级？', function () {
                    var ids = [];
                    me.selected.forEach(function (item) {
                        ids.push(item.id);
                    });
                    $.deleteJSON('classes', ids, responseHandler);
                })
            }
        },
        addObject: function () {
            this.clazz = {};
            showModal('edit-modal');
        },
        saveObject: function () {
            var me = this;
            if (this.submitting)
                return;
            if (!$('#modal-form').parsley('validate'))
                return;
            me.submitting = true;
            $.postJSON('term', me.clazz, function (data) {
                if (data && data.success) {
                    me.resetEditProp();
                    hideModal('edit-modal');
                    return reloadTable();
                }
                $.msg((data && data.msg) || '操作失败');
                me.submitting = false;
            });
        }
    }
});
$(function () {
    var $delete = $('#btn_delete');
    $('#bootstrapTable').bootstrapTable({
        url: 'classes',
        height: '712',
        toolbar: '#toolbar',
        striped: true,  //表格显示条纹
        pagination: true, //启动分页
        pageSize: 15,  //每页显示的记录数
        pageNumber:1, //当前第几页
        pageList: [],  //记录数可选列表
        showColumns: true,  //显示下拉框勾选要显示的列
        showRefresh: true,  //显示刷新按钮
        showToggle: true,
        sidePagination: "server", //表示服务端请求
        responseHandler:function(res){
            //远程数据加载之前,处理程序响应数据格式,对象包含的参数: 我们可以对返回的数据格式进行处理
            //在ajax后我们可以在这里进行一些事件的处理
            return res.payload;
        },
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType : "undefined",
        columns: [{
            checkbox: true
        }, {
            title: '班级',
            sortName: 'grade',
            sortable: true,
            formatter: function (value, row) {
                return row.classStr;
            }
        }, {
            title: '创建时间',
            field: 'createTime',
            sortable: true
        }, {
            title: '更新时间',
            field: 'updateTime',
            sortable: true
        }],
        onCheck: onCheckHandlerFactory(vue, null, $delete),
        onUncheck: onUncheckHandlerFactory(vue, null, $delete),
        onCheckAll: onCheckAllHandlerFactory(vue, null, $delete),
        onUncheckAll: onUncheckAllHandlerFactory(vue, null, $delete),
        onSort: onSortHandlerFactory(vue, null, $delete)
    });
});
function reloadTable() {
    $('#bootstrapTable').bootstrapTable('refresh', {silent: true});
}
function responseHandler(data) {
    layer.closeAll();
    if (data && data.success) {
        reloadTable();
        return;
    }
    $.msg(data.msg || '操作失败');
}