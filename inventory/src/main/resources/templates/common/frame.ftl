<#include "commons.ftl" />
<#macro frame title>
<@assign user=SPRING_SECURITY_CONTEXT.authentication.principal />
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>${title!}</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <@loader type="css" res="css/styles.min.css" />
    <@loader type="css" res="plugins/form-toggle/toggles.css" />
    <@loader type="css" res="css/variations/default.css" extra="id='styleswitcher'" />
    <@loader type="css" res="css/variations/default.css" extra="id='headerswitcher'" />
    <@loader type="js" res="js/jquery-1.10.2.min.js" />
    <@loader type="css" res="plugins/bootstrap-table/bootstrap-table.min.css" />
    <@loader type="css" res="fonts/glyphicons/css/glyphicons.min.css" />
    <style>
        .date-width {
            width: 160px;
        }
        .content-panel {
            min-height: 400px;
        }
    </style>
    <script>
        var GLOBAL_CONTEXT = {
            contextPath: '${request.contextPath}'
        };
    </script>
</head>
<body class="">
<header class="navbar navbar-inverse navbar-fixed-top" role="banner">
    <a id="leftmenu-trigger" class="pull-left" data-toggle="tooltip" data-placement="bottom" title="打开/关闭边栏"></a>

    <ul class="nav navbar-nav pull-left">
        <li class="dropdown">
            <a href="index" class="username" ><span class="hidden-xs">ScoreManager</span></a>
        </li>
    </ul>

    <ul class="nav navbar-nav pull-right toolbar">
        <li class="dropdown">
            <a href="#" class="dropdown-toggle username" data-toggle="dropdown"><span class="hidden-xs">您好，${user.username!"--"?html} <i class="fa fa-caret-down"></i></span></a>
            <ul class="dropdown-menu userinfo arrow">
                <#--<li class="username">-->
                    <#--<a href="#">-->
                        <#--<div class="pull-left"><img src="assets/demo/avatar/dangerfield.png" alt="Jeff Dangerfield"/></div>-->
                        <#--<div class="pull-right"><h5>Howdy, John!</h5><small>Logged in as <span>john2751212121</span></small></div>-->
                    <#--</a>-->
                <#--</li>-->
                <li class="userlinks">
                    <ul class="dropdown-menu">
                        <li><a href="#">修改密码 <i class="pull-right fa fa-pencil"></i></a></li>
                        <#--<li><a href="#">Account <i class="pull-right fa fa-cog"></i></a></li>-->
                        <#--<li><a href="#">Help <i class="pull-right fa fa-question-circle"></i></a></li>-->
                        <li class="divider"></li>
                        <li><a href="${request.contextPath}/admin/logout.html" class="text-right">登出</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        <#-- skin menu start-->
        <li class="dropdown demodrop">
            <a href="#" class="dropdown-toggle tooltips" data-toggle="dropdown"><i class="fa fa-magic"></i></a>

            <ul class="dropdown-menu arrow dropdown-menu-form" id="demo-dropdown">
                <li>
                    <label for="demo-header-variations" class="control-label">Header Colors</label>
                    <ul class="list-inline demo-color-variation" id="demo-header-variations">
                        <li><a class="color-black" href="javascript:;"  data-headertheme="header-black.css"></a></li>
                        <li><a class="color-dark" href="javascript:;"  data-headertheme="default.css"></a></li>
                        <li><a class="color-red" href="javascript:;" data-headertheme="header-red.css"></a></li>
                        <li><a class="color-blue" href="javascript:;" data-headertheme="header-blue.css"></a></li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li>
                    <label for="demo-color-variations" class="control-label">Sidebar Colors</label>
                    <ul class="list-inline demo-color-variation" id="demo-color-variations">
                        <li><a class="color-lite" href="javascript:;"  data-theme="default.css"></a></li>
                        <li><a class="color-steel" href="javascript:;" data-theme="sidebar-steel.css"></a></li>
                        <li><a class="color-lavender" href="javascript:;" data-theme="sidebar-lavender.css"></a></li>
                        <li><a class="color-green" href="javascript:;" data-theme="sidebar-green.css"></a></li>
                    </ul>
                </li>
                <li class="divider"></li>
                <li>
                    <label for="fixedheader">Fixed Header</label>
                    <div id="fixedheader" style="margin-top:5px;"></div>
                </li>
            </ul>
        </li>
        <#-- skin menu end -->
    </ul>
</header>

<div id="page-container">
    <!-- BEGIN SIDEBAR -->
    <nav id="page-leftbar" role="navigation">
        <!-- BEGIN SIDEBAR MENU -->
        <@genNavMenu navMenus true />
        <!-- END SIDEBAR MENU -->
    </nav>

    <div id="page-content">
        <div id='wrap'>
            <div id="page-heading">
                <#list breadcrumb()>
                    <ol class="breadcrumb">
                        <li><a href="/dashboard">Dashboard</a></li>
                        <#items as item>
                            <#if item?is_last>
                                <li><a href="${item.url!}">${item.name!}</a></li>
                            <#else>
                                <li class="active">${item.name!}</li>
                            </#if>
                        </#items>
                    </ol>
                <#else>
                </#list>
                <#-- <h1>${title}</h1> -->
            </div>
            <div class="container">
                <#nested>
            </div> <!-- container -->
        </div> <!--wrap -->
    </div> <!-- page-content -->

    <footer role="contentinfo">
        <div class="clearfix">
            <ul class="list-unstyled list-inline">
                <li>&copy; ${.now?string('yyyy')} <#if loginTime??>登录时间：${loginTime?datetime}</#if></li>
                <button class="pull-right btn btn-inverse btn-xs" id="back-to-top" style="margin-top: -1px; text-transform: uppercase;"><i class="fa fa-arrow-up"></i></button>
            </ul>
        </div>
    </footer>

</div> <!-- page-container -->
<@loader type="js" res="js/bootstrap.min.js" />
<@loader type="js" res="js/enquire.js" />
<@loader type="js" res="js/jquery.cookie.js" />
<@loader type="js" res="js/jquery.touchSwipe.min.js" />
<@loader type="js" res="js/jquery.nicescroll.min.js" />
<@loader type="js" res="js/application.js" />
<@loader type="js" res="plugins/layer/layer.js" />
<@loader type="js" res="plugins/form-toggle/toggle.min.js" />
<@loader type="js" res="plugins/vue/vue.js" />
<@loader type="js" res="js/base.js" />
<@loader type="js" res="js/commons.js" />
<@loader type="js" res="js/jquery-extend.js" />
<@loader type="js" res="js/vue-extend.js" />
<@loader type="js" res="plugins/bootstrap-table/bootstrap-table.min.js" />
<@loader type="js" res="plugins/bootstrap-table/locale/bootstrap-table-zh-CN.min.js" />
<#--<script type='text/javascript' src='${request.contextPath}/plugins/bootbox/bootbox.min.js'></script>-->
<#--<script type='text/javascript' src='${request.contextPath}/plugins/form-parsley/parsley.min.js'></script>-->
<#--<script type='text/javascript' src='${request.contextPath}/js/formvalidation.js'></script>-->
<script>

</script>
${pageScripts!}
</body>
</html>

</#macro>
