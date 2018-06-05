# ScreenshotDemo
网页截图保存demo
利用了html2canvas将页面重绘之后以图片形式保存的demo，[index.html](http://shot.iiwhy.cn/index.html)是针对pc端的图片保存，[demo02.html](http://shot.iiwhy.cn/demo02.html)是针对移动端的图片保存，上传到github之后，pc端谷歌、火狐和360都正常保存了，也渲染了网页中的图片。
<table>
<thead>
<tr>
<th>参数名称</th>
<th>类型</th>
<th>默认值</th>
<th>描述</th>
</tr>
</thead>
<tbody>
<tr>
<td>allowTaint</td>
<td>boolean</td>
<td>false</td>
<td>Whether to allow cross-origin images to taint the canvas---允许跨域</td>
</tr>
<tr>
<td>background</td>
<td>string</td>
<td>#fff</td>
<td>Canvas background color, if none is specified in DOM. Set undefined for transparent---canvas的背景颜色，如果没有设定默认透明</td>
</tr>
<tr>
<td>height</td>
<td>number</td>
<td>null</td>
<td>Define the heigt of the canvas in pixels. If null, renders with full height of the window.---canvas高度设定</td>
</tr>
<tr>
<td>letterRendering</td>
<td>boolean</td>
<td>false</td>
<td>Whether to render each letter seperately. Necessary if letter-spacing is used.---在设置了字间距的时候有用</td>
</tr>
<tr>
<td>logging</td>
<td>boolean</td>
<td>false</td>
<td>Whether to log events in the console.---在console.log()中输出信息</td>
</tr>
<tr>
<td>proxy</td>
<td>string</td>
<td>undefined</td>
<td>Url to the proxy which is to be used for loading cross-origin images. If left empty, cross-origin images won't be loaded.---代理地址</td>
</tr>
<tr>
<td>taintTest</td>
<td>boolean</td>
<td>true</td>
<td>Whether to test each image if it taints the canvas before drawing them---是否在渲染前测试图片</td>
</tr>
<tr>
<td>timeout</td>
<td>number</td>
<td>0</td>
<td>Timeout for loading images, in milliseconds. Setting it to 0 will result in no timeout.---图片加载延迟，默认延迟为0，单位毫秒</td>
</tr>
<tr>
<td>width</td>
<td>number</td>
<td>null</td>
<td>Define the width of the canvas in pixels. If null, renders with full width of the window.---canvas宽度</td>
</tr>
<tr>
<td>useCORS</td>
<td>boolean</td>
<td>false</td>
<td>Whether to attempt to load cross-origin images as CORS served, before reverting back to proxy--这个我也不知道是干嘛的</td>
</tr>
</tbody>
</table>
