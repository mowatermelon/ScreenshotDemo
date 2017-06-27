/**
 * @show modal
 * @version 1.0
 * @author WU EVA
 **/

(function ($) {
    //使用本插件之前需要引用jquery.js、bootstrap.css和bootstrap.js，
    //本插件是在bootstrap modal的基础上写的一个共用模态窗插件，之前用过jquery confirm的插件，功能太多，对ie8 9等有兼容问题，所以我自己写了一个弹窗插件。
    /**
    使用demo--modalbody为iframe
    $("#btn").click(function() {

    var sVsrc;
    var docname = $("#txt").find("option:selected").text();
    if (docname.length > 0) {
    sVsrc = "../../Doc/" + docname + ".htm";
    }
    $("#btn").showmodal({
    isText: false,
    title: docname,
    isIframe: true,
    src: sVsrc,
    Bclose: false,
    Sheight: "300"

    });

    });

    使用demo--modalbody为text

    $("#forR").click(function() {
    $("#forR").showmodal({
    flag: "warning",
    title: "提示信息",
    content: "确定吗",
    Tclose: false,
    Qclose: true
    });

    $("#close").click(function() {
    //dosomething
    })

    });

    */
    $.fn.showmodal = function (options) {
        var defaults = {
            //flag: "info", //已废弃请注意，设置弹出modal的状态 success:成功窗体,warning:警告窗体,info:信息窗体,default:默认无样式
            //title: "提示标题",//已废弃请注意，设置模态窗标题,默认不显示
            isText: true,  //判断传进来content的是否为Text,默认为true
            content: "提示内容",  //如果传进来content的为Text，通过修改text内容设置模态窗内容
            fontSize: "",  //如果传进来content的为Text，可以修改字体大小,默认是24px,h3大小，请输入具体像素值
            isIframe: false,   //判断传进来content的是否为iframe,默认为false
            src: "",  //如果传进来content的为iframe，通过修改iframe地址来设置模态窗内容
            //Tclose: true,  //已废弃请注意，设置右上角关闭按钮是否显示，默认为显示
            Bclose: true,  //设置右下角关闭按钮是否显示，默认为显示
            Qclose: false,  //设置右下角关闭按钮是否显示，默认为关闭
            Sheight: "",  //设置模态窗高度，请输入具体的正整数像素值，默认为auto
            SWidth: "",  //设置模态宽度，请输入具体的正整数像素值，默认为auto
            AutoBtn: "确定", //设置Bclose按钮的文字内容，默认为确定
            moveHead: false, //设置通过点击模态窗head部分是否可以进行拖拽，默认为false
            /**
            * 初始化DOM结构
            */
            initDom: function () {
                var parentdiv = "<div class='modal fade' id='showModal' tabindex='-1' role='dialog' aria-labelledby='showLabel' aria-hidden='true'><div class='modal-dialog' role='document'>";        //创建一个modaldiv
                var contentdiv;
                if (this.isText) {
                    contentdiv = "<div class='modal-body text-center h5 bg-faded'>" + this.content + "</div>\n";        //创建contentdiv
                } else {
                    contentdiv = "<div class='modal-body text-center h5 bg-faded'><iframe src='" + this.src + "' id='modalIframe'></div>\n";        //创建contentdiv
                }

                var footerdiv = "";
                if (this.Bclose && this.Qclose) {
                    footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-link col-xs-6' data-dismiss='modal' id='close'>" + this.AutoBtn + "</button><button type='button' class='btn btn-link col-xs-6 b-l-1' data-dismiss='modal' id='bcancel'>&nbsp;&nbsp;取消</button></div>";        //创建footerdiv
                } else if (!this.Bclose && this.Qclose) {
                    footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-link col-xs-12' data-dismiss='modal' id='bcancel'>&nbsp;&nbsp;取消</button></div>";        //创建footerdiv
                } else if (this.Bclose && !this.Qclose) {
                    footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-link col-xs-12' data-dismiss='modal' id='close'>" + this.AutoBtn + "</button></div>";        //创建footerdiv
                } else if (!this.Bclose && !this.Qclose) {
                    footerdiv = "<div class='modal-footer bg-faded'></div>";        //创建footerdiv
                }
                //parentdiv = parentdiv + headerdiv + contentdiv + footerdiv + "</div></div>";
                parentdiv = parentdiv + contentdiv + footerdiv + "</div></div>";
                $(document.body).append(parentdiv);
                $('#showModal').modal({ keyboard: false });
                $("#showModal").on("hide.bs.modal", function () {
                    $(this).remove();
                });
                //$("#showModal").draggable();
            },
            /**
            * 初始化
            */
            init: function () {
                this.initDom();
                this.initcss();
            },
            /**
            * 绑定事件
            */
            initcss: function () {
                $("#showModal.modal .modal-dialog .modal-body").css({ "background-color": "#fff" });
                $("#showModal.modal div:nth-child(1) .modal-title,#showModal.modal  div:nth-child(1) .close").css({ "font-size": "20px", "color": "#fff", "line-height": "40px", "padding-left": "20px", "padding-right": "20px" });
                $("#showModal.modal div:nth-child(1)").css({ "border-radius": "12px 12px 0 0" });
                $("#showModal .modal-footer").css({ "margin-top": "0px", "border-radius": "0 0 12px 12px", "padding": "0px 20px" });
                //判断modalbody是否为文本类型
                if (!this.isText) {
                    $("#showModal .modal-body #modalIframe").css({ "border": "0 none #eee", "width": "100%", "margin": "0 auto", "height": "100%" });
                }
                //判断是否需要重新设置模态窗宽度
                if (this.SWidth != "") {
                    var m_top = $("#showModal.modal").css("margin-top");
                    $("#showModal.modal .modal-dialog").css({ "width": this.SWidth + "px" });


                }
                //判断是否需要重新设置模态窗高度
                if (this.Sheight != "") {
                    //$("#showModal.modal,#showModal.modal .modal-dialog").css({ "height": this.Sheight + "px" });
                    $("#showModal.modal .modal-dialog .modal-body").css({ "height": this.Sheight + "px" });

                }
                //判断是否需要重新设置模态窗body字体大小
                if (this.fontSize != "") {
                    $("#showModal .modal-body").removeClass("h5").css({ "font-size": this.fontSize + "px" });
                } else {
                    if (!$("#showModal .modal-body").hasClass("h5")) {
                        $("#showModal .modal-body").addClass("h5")
                    }
                }

                //判断是否需要重新设置模态窗body是否包含img标签
                if ($("#showModal .modal-dialog .modal-body").children("img").length > 0) {
                    this.moveModal();
                    var cHeight = $("#showModal").height();
                    var cWidth = $("#showModal").width();
                    $("#showModal .modal-dialog .modal-body").css({ "max-height": cHeight * 0.7, "max-width": cWidth * 0.8, "overflow": "auto" });
                } else {
                    $("#showModal .modal-dialog .modal-body").css({ "max-height": "auto", "max-width": "auto", "overflow-x": "hidden" });
                }

                //判断是否需要重新设置模态窗body是否包含iframe标签
                if ($("#showModal .modal-dialog .modal-body").children("iframe").length > 0) {
                    this.moveModal();
                }

                //判断是否需要重新设置模态窗body是否包含div标签
                if ($("#showModal .modal-dialog .modal-body").children("div").length > 0) {
                    this.moveModal();
                }

                //判断是否需要重新设置模态窗body是否包含div标签
                if (this.moveHead) {
                    this.moveModal();
                }
                $(".b-l-1").css({ "border-left": "1px solid #ddd" });
                $("button.col-xs-6").each(function (index,data) {
                    var _this = $(this);
                   // console.log(_this.width());
                    _this.css({ "font-weight": "bold"});
                    if(index==$("button.col-xs-6").length-1){
                      _this.width(_this.width()-10);

                    }

                })
            },
            /*
            *支持页面弹窗重新调整位置，已废弃，请注意
            */
            ajustdialog: function () {
                // 是弹出框居中。。。
                var $modal_dialog = $("#showModal").find('.modal-dialog');
                //获取可视窗口的高度
                if ($("#showModal").height() > window.screen.height - 355) {
                    //$("#showModal").height(window.screen.height - 355);
                }
                var clientHeight = $("#showModal").height();
                var dialogHeight, m_top, isMargin;

                if (this.isIframe) {
                    //得到dialog的高度
                    dialogHeight = $modal_dialog.height();
                    if (clientHeight > dialogHeight) {
                        //计算出距离顶部的高度
                        m_top = Math.abs((clientHeight - dialogHeight) / 2);

                        if (clientHeight > 400) {
                            $modal_dialog.css({ 'margin': m_top + 'px auto', "padding": "0" });
                        } else {
                            $modal_dialog.css({ 'margin': '0px auto' });
                            $("#showModal").on("shown.bs.modal", function () {
                                //在模态框加载的同时做一些动作
                                $modal_dialog.css({ 'margin': '0px auto' });
                            });

                        }
                    } else {
                        var cHeight = $("#showModal").height();
                        var cWidth = $("#showModal").width();
                        $modal_dialog.css({ 'margin': '0px auto', "padding": "0" });
                        $modal_dialog.children(".modal-body").css({ "max-height": cHeight * 0.5, "max-width": cWidth * 0.8, "overflow": "auto" });
                    }

                } else {
                    //计算出距离顶部的高度
                    m_top = Math.abs((clientHeight - 116) / 2);
                    //m_top = $modal_dialog.css('margin-top');

                    if (clientHeight <= 400) {
                        $modal_dialog.css({ 'padding': m_top + 'px 0' });
                    } else {
                        if ($("#showModal .modal-body").children("img").length > 0) {
                            if (clientHeight <= 700) {
                                $modal_dialog.css({ 'padding': '50px 0px 0px 0px', 'margin': 'auto' });
                            }
                            else {
                                //$modal_dialog.css({ 'margin': m_top + 'px auto' });
                                $("#showModal").on("shown.bs.modal", function () {
                                    //console.log("sdsdf" + $modal_dialog.height());
                                    dialogHeight = $modal_dialog.height();
                                    //计算出距离顶部的高度
                                    m_top = Math.abs((clientHeight - dialogHeight) / 2);
                                    //在模态框加载的同时做一些动作
                                    $modal_dialog.css({ 'margin': 'auto' });
                                });
                                //console.log(" m_top" + m_top);
                                //$modal_dialog.css({ 'margin': m_top + 'px auto' });
                            }
                        } else {
                            $modal_dialog.css({ 'margin': m_top + 'px auto' });
                        }

                    }



                }
            },
            /*
            *支持页面弹窗可移动，已废弃，请注意
            */
            moveModal: function () {
                var $dialog = $("#showModal").find('.modal-dialog');
                var $head = $dialog.children().eq(0);
                var move = {
                    isMove: false,
                    left: 0,
                    top: 0
                };
                //委托
                //console.log('点击的是', $(this));
                $head.mousedown(function (e) {
                    move.isMove = true;
                    var offset = $dialog.offset();
                    move.left = e.pageX - offset.left;
                    move.top = e.pageY - offset.top;
                });
                $("#showModal").mousemove(function (e) {
                    if (!move.isMove) return;
                    //console.log('移动的是', e.target);
                    $dialog.offset({
                        top: e.pageY - move.top,
                        left: e.pageX - move.left
                    });
                }).mouseup(function (e) {
                    //console.log("left:"+move.left+", top:"+move.top );
                    move.isMove = false;
                });


            }
        };
        var opts = $.extend(defaults, options);
        opts.init();
        /*$("#showModal").on("loaded.bs.modal",function{
        //在模态框加载的同时做一些动作
        });
        $("#showModal").on("show.bs.modal",function{
        //在show方法后调用
        });
        $("#showModal").on("shown.bs.modal",function{
        //在模态框完全展示出来做一些动作
        });
        $("#showModal").on("hide.bs.modal",function{
        //hide方法后调用
        });
        $("#showModal").on("hiden.bs.modal",function{
        //监听模态框隐藏事件做一些动作
        });*/
    }
})(jQuery)
