//网页特效
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let a = document.querySelector('.a');
let b = document.querySelector('.b');
let c = document.querySelector('.c');
let button = document.querySelector('button');
let form = document.querySelector('form');
one.addEventListener('click', function () {
    one.style.top = 20 + 'px';
    username.style.backgroundColor = 'rgba(89,88,88,0.3)';
})
username.addEventListener('click', function () {
    one.style.top = 20 + 'px';
    username.style.backgroundColor = 'rgba(89,88,88,0.3)';
})
two.addEventListener('click', function () {
    two.style.top = 99 + 'px';
    password.style.backgroundColor = 'rgba(89,88,88,0.3)';
})
password.addEventListener('click', function () {
    two.style.top = 99 + 'px';
    password.style.backgroundColor = 'rgba(89,88,88,0.3)';
})
username.addEventListener('click', function () {
    a.innerHTML = '请输入1—10位账号'
    a.style.color = '#7e0b0b;'
})
password.addEventListener('click', function () {
    b.innerHTML = '请输入6—14位数字和字母混合密码'
    b.style.color = '#7e0b0b'
})
//表单数据检测
form.addEventListener('input', function (e) {
    // e.stopPropagation();
    //判断表单账号是否符合规则
    username.addEventListener('input', zh)
    let flag = zh()
    // console.log(flag)
    password.addEventListener('input', mm)
    let flagg = mm()
    // console.log(flagg)
    if (flag === 1 && flagg === 1) {
        button.disabled = ''
    }
    else {
        button.disabled = 'disabled'
    }
    if (!username.value) {
        a.innerHTML = ''
    }
    if (!password.value) {
        b.innerHTML = ''
    }
})
let mm = function () {
    let flagg = 0;
    let passwordr = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,14}$/;
    let re = new RegExp(passwordr);
    if (re.test(password.value)) {
        b.innerHTML = '合格！'
        b.style.color = 'green'
        flagg = 1
    }
    else {
        b.innerHTML = '请输入6—14位数字字母混合'
        b.style.color = '#7e0b0b'
        flagg = 0
    }
    return flagg;
}
let zh = function () {
    let flag = 0;
    let usernamer = /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/;
    let re = new RegExp(usernamer);
    if (re.test(username.value)) {
        a.innerHTML = '合格！';
        a.style.color = 'green'
        flag = 1
    }
    else {
        a.innerHTML = '不可超过10位'
        a.style.color = '#7e0b0b'
        flag = 0
    }
    return flag;
}

//jQuery Ajax
$(function () {

    //登录
    // 监听表单的提交事件
    $('#form1').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起 POST 登录请求
        $.post('/api/login', $(this).serialize(), function (res) {
            // status 为 0 表示登录成功；否则表示登录失败！
            if (res.status === 0) {
                c.innerHTML = '登录成功！'
                c.style.color = 'green'
                // location.href = './index.html'
                setTimeout("location.href = './index.html'", 2000);
            } else {
                c.innerHTML = '账号或密码错误！';
                password.value = ''
            }
        })
    })

})