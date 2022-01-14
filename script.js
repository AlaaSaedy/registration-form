const API_URL = "https://private-b2e6827-robustatask.apiary-mock.com";
const API_PATH_SIGNUP = `${API_URL}/auth/register`;
const API_PATH_SIGNIN = `${API_URL}/auth/login`;

$(".message a").click(function () {
  $("form").animate({ height: "toggle", opacity: "toggle" });
});

$(document).ready(function () {
  // Validate Email
  let emailError = true;
  $("#email").keyup(function () {
    validateEmail();
  });
  function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailInputMsg = document.getElementById("emailvalid");
    let regex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
    let emailVal = emailInput.value;

    if (emailVal === "") {
      emailInputMsg.innerText = "Email is required";
      emailError = false;
    } else if (!regex.test(emailVal)) {
      emailInputMsg.innerText = "The email must be a valid email address";
      emailError = false;
    } else {
      emailInputMsg.innerText = "";
      emailError = true;
    }
  }

  // Validate Name & Username
  $(".username-check").hide();
  $(".name-check").hide();
  let nameError = true;
  let usernameError = true;

  function validateFullNameAndUsername() {
    let nameValue = $("#fullName").val();
    if (nameValue.trim() === "") {
      $(".name-check").show();
      $(".name-check").html("Name is required");
      nameError = false;
    } else {
      $(".name-check").hide();
    }

    let usernameValue = $("#username").val();
    if (usernameValue.trim() === "") {
      $(".username-check").show();
      $(".username-check").html("The username is required");
      usernameError = false;
    } else if (usernameValue.length < 3 || usernameValue.length > 10) {
      $(".username-check").show();
      $(".username-check").html("The username must be more than 6");
      usernameError = false;
    } else {
      $(".username-check").hide();
    }
  }

  // Validate Password
  $(".password-check").hide();
  let passwordError = true;
  $("#password").keyup(function () {
    const registerPassword = $("#password").val();
    validatePassword(registerPassword);
  });

  function validatePassword(password) {
    if (password.length == "") {
      $(".password-check").show();
      $(".password-check").html("Password is required");
      passwordError = false;
    } else if (password.length < 8) {
      $(".password-check").show();
      $(".password-check").html(
        "Your password must be at least 8 characters long"
      );
      passwordError = false;
    } else {
      $(".password-check").hide();
      passwordError = true;
    }
  }

  $("#registerForm").submit((e) => {
    const registerPassword = $("#password").val();
    e.preventDefault();

    validateFullNameAndUsername();
    validatePassword(registerPassword);
    validateEmail();

    let isLoading = false;
    const data = $("#registerForm").serialize();
    const submitBtn = $(".submit-btn");

    if (
      nameError == true &&
      usernameError == true &&
      passwordError == true &&
      emailError == true
    ) {
      isLoading = true;
      if (isLoading) {
        submitBtn.addClass("btn-loading");
      }
      $.ajax({
        type: "POST",
        url: API_PATH_SIGNUP,
        data: data,
      }).done(() => {
        isLoading = false;
        submitBtn.removeClass("btn-loading");
        submitBtn.attr("disabled", "disabled");
        $("#registerForm").find("input:text, input:password").val("");
      });

      return true;
    } else {
      return false;
    }
  });

  // Login Form

  $("#loginPasswordInput").keyup(function () {
    const loginPassword = $("#loginPasswordInput").val();
    validatePassword(loginPassword);
  });

  $("#loginForm").submit((e) => {
    let loginUsernameError = true;

    const loginPassword = $("#loginPasswordInput").val();
    validatePassword(loginPassword);

    const loginFormUsername = $("#loginUsername").val();
    if (loginFormUsername.trim() === "") {
      $(".username-check").show();
      $(".username-check").html("The username is required");
      loginUsernameError = false;
    } else {
      $(".username-check").hide();
      loginUsernameError = true;
    }

    const data = $("#loginForm").serialize();

    if (passwordError === true && loginUsernameError === true) {
      $.ajax({
        type: "POST",
        url: API_PATH_SIGNIN,
        data: data,
      });
      return true;
    } else {
      return false;
    }
  });
});
