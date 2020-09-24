var vue = new Vue({
    el: '#page-container',
    data: {
        selected: [],
        term: {},
        modalTitle: '新增学期',
        submitting: false
    },
    methods: {
        resetEditProp: function () {
            this.submitting = false;
            this.term = {};
        },
        deleteObject: function () {
            var me = this;
            if (me.selected.length == 1) {
                confirmDelete('是否确认删除此学期？', 'term', me.selected[0].id);
            } else {
                var ids = [];
                me.selected.forEach(function (item) {
                    ids.push(item.id);
                });
                confirmDelete('是否确认删除所选所有学期？', 'terms', ids);
            }
        },
        addObject: function () {
            this.term = {};
            showModal('edit-modal');
        },
        saveObject: function () {
            var me = this;
            if (this.submitting)
                return;
            if (!$('#modal-form').parsley('validate'))
                return;
            me.submitting = true;
            $.postJSON('term', me.term, function (data) {
                if (data && data.success) {
                    me.resetEditProp();
                    hideModal('edit-modal');
                    return reloadTable();
                }
                $.msg((data && data.msg) || '操作失败');
                me.submitting = false;
            });
        },
        editObject: function() {
            this.term = $.extend({}, this.selected[0]);
            this.modalTitle = '编辑学期';
            showModal('edit-modal');
        },
        setModelData: function (id) {
            this.term[id] = $('#' + id).val();
        }
    }
});
$(function () {
    $('.date-picker').datepicker({
        format: "yyyy-mm-dd",
        language: 'zh-CN',
        todayBtn: true,
        todayHighlight: true,
        autoclose: true
    });
    var $delete = $('#btn_delete'),
        $edit = $('#btn_edit');
    $('#bootstrapTable').bootstrapTable({
        url: 'terms',
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
        sortName: 'id',
        sortOrder: 'desc',
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
            title: '学期',
            field: 'name',
            sortable: true
        }, {
            title: '学期开始日期',
            field: 'startDate',
            sortable: true,
            formatter: Formatters.ymdDateFormatter
        }, {
            title: '学期结束日期',
            field: 'endDate',
            sortable: true,
            formatter: Formatters.ymdDateFormatter
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