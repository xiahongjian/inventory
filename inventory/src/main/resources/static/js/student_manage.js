var vue = new Vue({
    el: '#page-container',
    data: {
        gradeClasses: gradeClasses,
        classList: classList,
        editingObj: {
            gender: '',
            clazz: '',
            status: ''
        },
        selected: [],
        modalTitle: '新增学生',
        submitting: false,
        selectedGrade: ''
    },
    created: function () {

    },
    filters: {
        formatGrade: function(grad) {
            var grades = ['一', '二', '三', '四', '五', '六'];
            return grades[grad - 1] + '年级';
        },
        formatClass: function (clazz) {
            return clazz + '班';
        }
    },
    methods: {
        getClassList: function() {
            if (this.selectedGrade === 0 || this.selectedGrade) {
                for (var o in this.gradeClasses) {
                    if (o.grade == this.selectedGrade)
                        return o.classes;
                }
            }
            return [];
        },
        getInitObj: function () {
            return {
                gender: '',
                clazz: '',
                status: ''
            };
        },
        resetEditProp: function () {
            this.submiting = false;
            this.editingObj = this.getInitObj()
        },
        deleteObject: function () {
            var me = this;
            if (me.selected.length == 1) {
                $.confirm('是否确认删除此学生资料？', function () {
                    $.deleteJSON('student/' + me.selected[0].id, null, responseHandler);
                })
            } else {
                $.confirm('是否确认删除所选所有学生资料？', function () {
                    var ids = [];
                    me.selected.forEach(function (item) {
                        ids.push(item.id);
                    });
                    $.deleteJSON('exams', ids, responseHandler);
                })
            }
        },
        addObject: function () {
            this.editingObj= this.getInitObj();
            this.modalTitle = '新增测试';
            showModal('edit-modal');
        },
        editObject: function () {
            this.editingObj = $.extend(this.getInitObj(), this.selected[0]);
            this.modalTitle = '编辑测试';
            showModal('edit-modal');
        },
        save: function () {
            var me = this;
            if (this.submiting)
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
            me.editingObj.examTime = $('#examTime').val();
            if (!me.editingObj.examTime) {
                $.tips('测试时间不能为空', '#examTime');
                return;
            }
            me.submiting = true;
            // 将时间格式设置为yyyy-MM-dd HH:mm:ss
            me.editingObj.examTime = me.editingObj.examTime + ':00';
            $.postJSON('exam', me.editingObj, function (data) {
                if (data && data.success) {
                    me.resetEditProp();
                    hideModal('edit-modal');
                    return reloadTable();
                }
                $.msg((data && data.msg) || '操作失败');
                me.submiting = false;
            });
        }
    }
});

$(function () {
    $('.date-picker').datepicker({
        format: "yyyy-mm-dd",
        language: 'zh-CN'
    });
    var $delete = $('#btn_delete'),
        $edit = $('#btn_edit');
    $('#bootstrapTable').bootstrapTable({
        url: 'students',
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
                grade = $('#grade').val(),
                clazz = $('#clazz').val(),
                gender = $('#gender').val();
            return $.extend(params, {
                searchText: keyword,
                grade: grade,
                clazz: clazz,
                gender: gender
            });
        },
        columns: [{
            checkbox: true
        }, {
            title: '学号',
            field: 'stuNo',
            sortable: true
        }, {
            title: '姓名',
            field: 'name',
            sortable: true
        }, {
            title: '性别',
            field: 'gender',
            sortable: true,
            formatter: function (val, row) {
                if (!val)
                    return '-';
                return genderMap[val] ? genderMap[val] : '-';
            }
        }, {
            title: '班级',
            sortName: 'clazz.grade',
            sortable: true,
            formatter: function (val, row) {
                return row.clazz ? row.clazz.classStr : '-';
            }
        }, {
            title: '入学日期',
            field: 'attendDate',
            sortable: true,
            formatter: Formatters.ymdDateFormatter
        }, {
            title: '家长联系电话',
            field: 'phone',
            sortable: false
        }, {
            title: '状态',
            field: 'status',
            sortable: true,
            visible: false,
            formatter: function (val, row) {
                if (!val)
                    return '-';
                return statusMap[val] ? statusMap[val] : '-';
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