<#import "common/frame.ftl" as main>
<#assign pageScripts in main>
    <script></script>
</#assign>
<@main.frame title="Dashboard">
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-md-3 col-xs-12 col-sm-6">
                    <span class="info-tiles tiles-toyo">
                        <div class="tiles-heading">学生</div>
                        <div class="tiles-body-alt">
                            <i class="fa fa-user"></i>
                            <div class="text-center">${studentCount!0}</div>
                        </div>
                        <div class="tiles-footer">学生人数</div>
                    </span>
                </div>
                <div class="col-md-3 col-xs-12 col-sm-6">
                    <span class="info-tiles tiles-success">
                        <div class="tiles-heading">成绩</div>
                        <div class="tiles-body-alt">
                            <!i class="fa fa-file-text"></i>
                            <div class="text-center">${scoreCount!0}</div>
                        </div>
                        <div class="tiles-footer">测试成绩数</div>
                    </span>
                </div>
                <div class="col-md-3 col-xs-12 col-sm-6">
                    <span class="info-tiles tiles-orange" >
                        <div class="tiles-heading">班级</div>
                        <div class="tiles-body-alt">
                            <i class="fa fa-group"></i>
                            <div class="text-center">${classCount!0}</div>
                        </div>
                        <div class="tiles-footer">班级数</div>
                    </span>
                </div>
                <div class="col-md-3 col-xs-12 col-sm-6">
                    <span class="info-tiles tiles-primary">
                        <div class="tiles-heading">测试</div>
                        <div class="tiles-body-alt">
                            <i class="fa fa-book"></i>
                            <div class="text-center">${examCount}</div>
                        </div>
                        <div class="tiles-footer">测试数</div>
                    </span>
                </div>
            </div>
        </div>
    </div>
</@main.frame>
