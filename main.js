function Validator(option){
    
    function Validate(inputElement, rule){
        
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(option.selector);
        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ''
            inputElement.parentElement.classList.remove('invalid')
        }
    }
    var formElement = document.querySelector(option.form)
    if(formElement){

        option.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector)
            
            if(inputElement){
                //Xử lý trường hợp blur khỏi input 
                inputElement.onblur = function(){
                    Validate(inputElement, rule)
                }

                //Xử lý mỗi khi người dùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector('.form-message')
                    errorElement.innerText = ''
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })

    }
}

//Định nghĩa các Rules
// Nguyên tắc của các rules
// 1. Khi có lỗi => trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function(selector){
    return {
        selector: selector,
        test: function(value){
            return value.trim() ? undefined : "Vui lòng nhập trường này"
        }
    }
}

Validator.isEmail = function(selector){
    return {
        selector: selector,
        test: function(value){
            var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            return regex.test(value) ? undefined : "Vui lòng nhập Email vào trường này"
        }
    }
}
Validator.isPassword = function(selector, min){
    return {
        selector: selector,
        test: function(value){
            if (value === ''){
                return "Vui lòng nhập mật khẩu vào trường này"
            } else if (value.trim() ==='' && value.includes('cc')){
                return "Mật khẩu bao gồm chữ in hoa, chữ cái, số và ít nhất một ký tự đặc biệt"
            } else if (value.trim().length < min){
                return `Vui lòng nhập tối thiếu ${min} ký tự`
            } else {
                return undefined
            }
            // return value.length >= min ? undefined : `Vui lòng nhập tối thiếu ${min} ký tự`
        }
    }
}
Validator.isConfirmPassword = function(selector, confirmPw, message) {
    return {
        selector: selector,
        test: function(value){
            if (value === ''){
                return "Vui lòng nhập lại mật khẩu vào trường này"
            } else if (value != confirmPw()) {
                return message
            } else {
                return undefined
            }
            // return value === confirmPw() && '' ? undefined : message || "Vui lòng nhập lại mật khẩu vào trường này"
        }
    }
}
