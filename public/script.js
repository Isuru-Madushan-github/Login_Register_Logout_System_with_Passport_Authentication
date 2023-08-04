let showPassword=false;

function changeIcon(){
    const eye=document.querySelector('#eye');
    const passwordField=document.querySelector('#password');

    if(!showPassword){
        passwordField.setAttribute('type','text');
        eye.classList.remove('fa-eye-slash');
        eye.classList.add('fa-eye');
        showPassword=true;
    }else{
        passwordField.setAttribute('type','password');
        eye.classList.remove('fa-eye');
        eye.classList.add('fa-eye-slash');
        showPassword=false;
    }
}

function closeMsg(event){
    event.target.parentNode.remove();
}