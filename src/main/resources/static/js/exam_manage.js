var vue = new Vue({
    el: '#page-container',
    data: {
        examTypes: [],
        terms: [],
        courses: null,
        editingObj: {},
        selected: [],
        modalTitle: '新增测试',
        submitting: false
    },
    created: function () {
        var me = this;
        $.get('enum/exam_type', function (data) {
            if (data && data.success) {
                me.examType = data.payload;
                return;
            }
            $.msg('数据加载失败，请刷新页面再次尝试。');
        });
        $.get('terms/all', function (data) {
            if (data && data.success) {
                me.terms = data.payload;
                return;
            }
            $.msg('数据加载失败，请刷新页面再次尝试。');
        });
    },
    methods: {
        resetEditProp: function () {
            this.submitting = false;
            this.editingObj = {};
        },
        deleteObject: function () {
            var me = this;
            if (me.selected.length == 1) {
                $.confirm('是否确认删除此次测试？', function () {
                    $.deleteJSON('exam/' + me.selected[0].id, null, responseHandler);
                })
            } else {
                $.confirm('是否确认删除所选所有测试？', function () {
                    var ids = [];
                    me.selected.forEach(function (item) {
                        ids.push(item.id);
                    });
                    $.deleteJSON('exams', ids, responseHandler);
                })
            }
        },
        addObject: function () {
            this.editingObj= {course: {}};
            this.modalTitle = '新增测试';
            showModal('edit-modal');
        },
        editObject: function () {
            this.editingObj = $.extend({course: {}}, this.selected[0]);
            this.modalTitle = '编辑测试';
            showModal('edit-modal');
        },
        save: function () {
            var me = this;
            if (this.submitting)
                return;
            if (!me.editingObj.name) {
                $.tips('测试名称不能为空', '#name');
                return;
            }
            if (!me.editingObj.type) {
                $.tips('测试类型不能为空', '#type');
                return;
            }
            if (!me.editingObj.course.id && me.editingObj.course.id != 0) {
                $.tips('测试课程不能为空', '#course');
                return;
            }
            me.editingObj.examStartTime = $('#examStartTime').val();
            if (!me.editingObj.examStartTime) {
                $.tips('测试开始时间不能为空', '#examStartTime');
                return;
            }
            me.editingObj.examEndTime = $('#examEndTime').val();
            if (!me.editingObj.examEndTime) {
                $.tips('测试结束时间不能为空', '#examEndTime');
                return;
            }

            me.submitting = true;
            // 将时间格式设置为yyyy-MM-dd HH:mm:ss
            me.editingObj.examStartTime += ':00';
            me.editingObj.examEndTime += ':00';
            $.postJSON('exam', me.editingObj, function (data) {
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
    $('.datetime-picker').datetimepicker({
        // format: "yyyy-mm-dd hh:mm",
        // language: 'zh-CN'
        format: "yyyy-mm-dd hh:ii",
        autoclose: true,
        todayBtn: true,
        startDate: "",
        endDate: "",
        minuteStep: 5,
        language: "zh-CN"
    });
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
        url: 'exams',
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
            return res.payload;
        },
        //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
        //设置为limit可以获取limit, offset, search, sort, order
        queryParamsType : "undefined",
        queryParams: function (params) {
            var keyword = $('#keyword').val(),
                start = $('#start').val(),
                end = $('#end').val(),
                examType = $('#examType').val();
            return $.extend(params, {
                searchText: keyword,
                start: start,
                end: end,
                examType: examType
            });
        },
        columns: [{
            checkbox: true
        }, {
            title: '名称',
            field: 'name',
            sortable: true
        }, {
            title: '课程',
            field: 'course.name',
            sortable: true
        }, {
            title: '类型',
            field: 'type',
            sortable: true,
            formatter: function (val, row) {
                if (!val)
                    return '-';
                var type = examTypes[val];
                return type ? type : '-';
            }
        }, {
            title: '创建时间',
            field: 'createTime',
            sortable: true,
            visible: false
        }, {
            title: '更新时间',
            field: 'updateTime',
            sortable: true,
            visible: false
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