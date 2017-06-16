(function () {
    function UploadFile(options){
        var deafultOpt={
            action:"",//上传文件的接口地址
            name:"file",//字段名
            file:'',//要上传的文件
            beforeUpload:function () {return true},//上传之前的执行的函数,返回true执行上传操作否则不执行
            success:null,//上传成功的回调函数
            error:null,//上传失败的回调函数
            progress:null//上传失败的回调函数
        }
        this.option=extend(deafultOpt,options);
        this.init();
    }
    UploadFile.prototype={
        init:function () {
            if(this.option.beforeUpload()){
                this.upLoad();
            }
        },
        upLoad:function () {
            var _this=this;
            var fd = new FormData(),
                xhr = new XMLHttpRequest();
            fd.append(_this.option.name, _this.option.file);
            xhr.open('post', _this.option.action);
            xhr.onreadystatechange = function(event){
                if(xhr.status == 200){
                    if(xhr.readyState == 4){
                        console.log('上传成功')
                        _this.option.success&&_this.option.success(xhr.response);
                    }
                }else{
                    console.log('上传失败');
                    _this.option.error&&_this.option.error(xhr.response);
                }
            }
            xhr.upload.onprogress = function(event){
                var pre = Math.floor(100 * event.loaded / event.total);
                console.log(pre);
                _this.option.progress&&_this.option.progress(pre);
            }
            xhr.send(fd);
        }
    }
    function cloneObj(oldObj) { //复制对象方法
        if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var i in oldObj)
            newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    };
    function extend() { //扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
            for (var i in args[n]) {
                temp[i] = args[n][i];
            }
        }
        return temp;
    }
    window.UploadFile=UploadFile;
})(window)
$(function () {
    var userPic=document.querySelector('.userPic')
    var cropper;
    var image = document.querySelector('.img-container > img');
    var options={
        ready: function () {
            var cropper = this.cropper;
            cropper.setCropBoxData({
                height: 200,
                width: 200
            });
        },
        cropmove: function () {

        },
        preview: '.img-preview',
        aspectRatio: 1,//截取窗口的长宽比
        dragMode:"move",
        cropBoxResizable:false,
        viewMode:1
    };
    userPic.onclick=function () {
        $('.modal-dialog').show()
        $('.modal-content').removeClass('slideOutDown')
        $('.modal-content').addClass('slideInDown')
        cropper = new Cropper(image, options);
    }
    var inputImage = document.getElementById('inputImage');
    inputImage.onchange = function () {
        var files = this.files;
        var file;
        if (cropper && files && files.length) {
            file = files[0];
            if (/^image\/\w+/.test(file.type)) {
                var reader = new FileReader();
                reader.addEventListener("load", function () {
                    image.src = this.result;
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                    inputImage.value = null;
                }, false);
                reader.readAsDataURL(file);
            } else {
                window.alert('Please choose an image file.');
            }
        }
    };
    $('[data-close="modal"]').on('click',function () {
        $('.modal-content').removeClass('slideInDown')
        $('.modal-content').addClass('slideOutDown')
        setTimeout(function () {
            $('.modal-dialog').hide()
        },400)
    })
    $('#postBtn').on('click',function (e) {
        var canvas=cropper.getCroppedCanvas({width:200,height:200});
        var base64=canvas.toDataURL();
        var blob=dataURLtoBlob(base64)
        new UploadFile({
            action:'/updateUserPic',
            name:'file',
            file:blob,
            progress:function (pre) {
                console.log(pre)
            },
            success:function (res) {
                var res=JSON.parse(res);
                if(res.status==101){
                    window.location.reload()
                }
            },
            error:function (res) {
                console.log(res)
            }
        })
    })
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
})