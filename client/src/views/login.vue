<template>
    <div class="login-container">
        <div class="form-group">
            账号：<input type="text" v-model="loginId" placeholder="请输入账号">
        </div>
        <div class="form-group">
            密码：<input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <button @click="login">登录</button>
        <p v-if="error" class="error-message">{{ error }}</p>
    </div>
</template>

<script>
import router from '@/router';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        const loginId = ref('');
        const password = ref('');
        const error = ref('');

        function login() {
            error.value = ''; // 清除之前的错误信息
            store.dispatch("loginUser/login", { loginId: loginId.value, password: password.value })
                .then(() => {
                    // 登录成功后的逻辑，比如跳转页面
                    router.push({ name: 'home' })
                })
                .catch(err => {
                    // 登录失败，设置错误信息
                    error.value = err.message || '登录失败，请重试。';
                });
        }

        return {
            loginId,
            password,
            login,
            error
        };
    }
}
</script>

<style>
.login-container {
    max-width: 300px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.form-group {
    margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>