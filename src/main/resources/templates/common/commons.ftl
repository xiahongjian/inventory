<#macro pager pagination url extra...>
    <#if extra?size gt 0>
        <#if extra?keys?seq_contains("noCount")>
            <#assign noCount=extra['noCount'] />
        <#else>
            <#assign noCount="0" />
        </#if>
    <#else>
        <#assign noCount="0" />
    </#if>
    <#if noCount=="0">
	<div class="row">
		<div class="col-xs-6" style="margin-top:25px">共 #{pagination.totalCount} 项，#{pagination.totalPageNum} 页</div>
    </#if>
    <#if pagination.totalPageNum gt 1>
		<div class="col-xs-6">
            <ul class="pagination pull-right">
			<#if pagination.currentPage &gt; 0>
			  <li><a href="${url}pn=0">&laquo;</a></li>
            <#else>
				<li class="disabled"><a href="#">&laquo;</a></li>
            </#if>
			<#if pagination.startPage &gt; 0>
			  <li class="disabled"><span>...</span></li>
            </#if>
			<#list pagination.startPage..pagination.endPage as page>
			  <li<#if page=pagination.currentPage> class="active"</#if>><a href="${url}pn=#{page}">#{page+1}</a></li>
            </#list>
			<#if pagination.endPage &lt; pagination.totalPageNum-1>
			  <li class="disabled"><span>...</span></li>
            </#if>
			<#if pagination.currentPage &lt; pagination.totalPageNum-1>
			  <li><a href="${url}pn=#{pagination.totalPageNum-1}">&raquo;</a></li>
            <#else>
				<li class="disabled"><a href="#">&raquo;</a></li>
            </#if>
            </ul>
        </div>
    </#if>
    <#if noCount=="0">
	</div>
    </#if>
</#macro>

<#macro genNavMenu navMenus topLevel=false>
<#if !topLevel>
    <#nested>
</#if>
<ul class="acc-menu" <#if topLevel>id="sidebar"</#if>>
<#list navMenus as menu>
    <#if menu.submenus?? && menu.submenus?size gt 0>
        <li>
        <@genNavMenu menu.submenus>
			<a href="javascript:;"><i class="${menu.iconClass!}"></i>${menu.title!}</a>
        </@genNavMenu>
        </li>
    <#else>
		<li><a href="<@composeUrl request.contextPath menu.url! />  class="<#if request.requestURI==menu.url>active</#if>""><#if menu.iconClass?? && topLevel><i class="${menu.iconClass}"></i> </#if>${menu.title!}</a></li>
    </#if>
</#list>
</ul>
</#macro>
<#macro composeUrl base="/" ext...>
    <#if base != "/">${base}</#if><#if ext??><#list ext as item><#if !(item?starts_with("/"))>/</#if>${item}</#list></#if>
</#macro>