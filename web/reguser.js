//网页特效
let form = document.querySelector('form');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let one = document.querySelector('.one');
let two = document.querySelector('.two');
let a = document.querySelector('.a');
let b = document.querySelector('.b');
let c = document.querySelector('.c');
let d = document.querySelector('.d');
let button = document.querySelector('button');
let by = document.querySelector('.by');
let img = document.querySelector('img');
var flag = 0;
by.onclick = function () {
    if (flag == 0) {
        password.type = 'text';
        img.src = './img/可见.png';
        flag = 1;
    }
    else {
        password.type = 'password';
        img.src = './img/不可见.png';
        flag = 0;
    }
}
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

form.addEventListener('input', function () {
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
    if (d.innerHTML) {
        a.innerHTML = ''
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
        // b.innerHTML = '请输入5—17位数字包含字母'
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
        a.innerHTML = '合格!';
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

    //判断用户名是否已被占用
    username.addEventListener('input', function () {
        if (!username.value) {
            d.innerHTML = ''
        } else {
            console.log(username.value);
            $.post('/api/chachong', $(this).serialize(), function (res) {
                console.log(res)
                if (res.status === 0) {
                    d.innerHTML = ''
                    // d.innerHTML = res.msg
                    // button.disabled = 'disabled'
                }
                else {
                    a.innerHTML = ''
                    d.innerHTML = res.msg
                    // button.disabled = ''
                }
            })
        }
    })

    //注册
    // 监听表单的提交事件
    $('#form1').on('submit', function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起注册请求
        $.post('/api/reguser', $(this).serialize(), function (res) {
            // status 为 0 表示注册成功；否则表示注册失败！
            if (res.status === 0) {
                // location.href = './login.html'
                c.innerHTML = '注册成功！请重新登录'
                c.style.color = 'green'
                setTimeout("location.href = './login.html'", 2000);
            } else {
                // d.innerHTML = res.msg;
                c.style.right = 20 + 'px'
                c.style.color = '#7e0b0b'
                c.innerHTML = '注册失败！'
            }
        })
    })

})
