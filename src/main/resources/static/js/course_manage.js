var vue = new Vue({
    el: '#page-container',
    data: {
        selected: [],
        editCourse: {},
        modalTitle: '新增课程',
        submitting: false
    },
    methods: {
        resetEditProp: function () {
            this.submitting = false;
            this.editCourse = {};
        },
        doEditCourse: function () {
            this.modalTitle = '编辑课程';
            this.editCourse = $.extend({}, this.selected[0]);
            showModal('edit-modal');
        },
        deleteCourse: function () {
            var me = this;
            if (me.selected.length == 1) {
                $.confirm('是否确认删除此课程？', function () {
                    $.deleteJSON('course/' + me.selected[0].id, null, responseHandler);
                })
            } else {
                $.confirm('是否确认删除所选所有课程？', function () {
                    var ids = [];
                    me.selected.forEach(function (course) {
                        ids.push(course.id);
                    });
                    $.deleteJSON('courses', ids, responseHandler);
                })
            }

        },
        addCourse: function () {
            this.modalTitle = '新增课程';
            this.editCourse = {};
            showModal('edit-modal');
        },
        saveCourse: function () {
            var me = this;
            if (this.submitting)
                return;
            if (!$('#modal-form').parsley('validate'))
                return;
            this.submitting = true;
            $.postJSON('course', this.editCourse, function (data) {
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
    var $edit = $('#btn_edit'),
        $delete = $('#btn_delete');
    $('#bootstrapTable').bootstrapTable({
        url: 'courses',
        height: '712',
        toolbar: '#toolbar',
        striped: true,  //表格显示条纹
        pagination: true, //启动分页
        pageSize: 15,  //每页显示的记录数
        pageNumber:1, //当前第几页
        pageList: [],  //记录数可选列表
        search: true,  //是否启用查询
        searchOnEnterKey: true,
        trimOnSearch: false,
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
        queryParams: function queryParams(params) {   //设置查询参数
            // var param = {
            //     //这里是在ajax发送请求的时候设置一些参数 params有什么东西，自己看看源码就知道了
            //     pageNo: params.pageNumber,
            //     pageSize: params.pageSize
            // };
            return params;
        },

        // onLoadSuccess: function(data){  //加载成功时执行
        //     layer.close(loading);
        // },
        /*
        onLoadError: function(){  //加载失败时执行
            layer.msg("加载数据失败", {time : 1500, icon : 2});
        },
        */
        columns: [{
            checkbox: true
        }, {
            title: '课程名称',
            field: 'name',
            sortable: true
        }, {
            title: '创建时间',
            field: 'createTime',
            sortable: true
        }, {
            title: '更新时间',
            field: 'updateTime',
            sortable: true
        }],
        onCheck: onCheckHandlerFactory(vue, $edit, $delete),
        onUncheck: onUncheckHandlerFactory(vue, $edit, $delete),
        onCheckAll: onCheckAllHandlerFactory(vue, $edit, $delete),
        onUncheckAll: onUncheckAllHandlerFactory(vue, $edit, $delete),
        onSort: onSortHandlerFactory(vue, $edit, $delete)
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