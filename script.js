(function () {
  'use strict';

  var menuToggle = document.querySelector('.menu-toggle');
  var siteNav = document.querySelector('.site-nav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  document.querySelectorAll('[data-password-toggle]').forEach(function (toggle) {
    toggle.addEventListener('click', function () {
      var input = document.getElementById(toggle.getAttribute('aria-controls'));
      var isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.textContent = isPassword ? 'Hide' : 'Show';
      toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    });
  });

  document.querySelectorAll('[data-demo-form]').forEach(function (form) {
    var message = form.querySelector('.form-message');

    function setError(input, text) {
      var error = form.querySelector('[data-error-for="' + input.id + '"]');
      input.setAttribute('aria-invalid', text ? 'true' : 'false');
      if (error) error.textContent = text;
    }

    function validateField(input) {
      var value = input.value.trim();
      var error = '';
      if (input.required && input.type === 'checkbox' && !input.checked) error = 'Please accept the terms.';
      if (input.required && input.type !== 'checkbox' && !value) error = 'This field is required.';
      if (!error && input.type === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) error = 'Enter a valid email address.';
      if (!error && input.id === 'password' && value && value.length < 8) error = 'Use at least 8 characters.';
      if (!error && input.id === 'password-confirmation' && value !== document.getElementById('password').value) error = 'Passwords do not match.';
      setError(input, error);
      return !error;
    }

    form.querySelectorAll('input').forEach(function (input) {
      input.addEventListener('blur', function () { validateField(input); });
      input.addEventListener('input', function () { if (input.getAttribute('aria-invalid') === 'true') validateField(input); });
    });

    var forgotLink = form.querySelector('[data-forgot-password]');
    if (forgotLink) {
      forgotLink.addEventListener('click', function (event) {
        event.preventDefault();
        message.textContent = 'Password reset is ready for a future email service in this demo.';
        message.classList.add('is-visible');
      });
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;
      form.querySelectorAll('input').forEach(function (input) {
        if (!validateField(input)) valid = false;
      });
      if (!valid) return;
      message.textContent = form.dataset.demoForm === 'signup' ? 'You are on the list. Welcome to Northstar.' : 'You are signed in for this demo. Welcome back.';
      message.classList.add('is-visible');
      form.querySelector('button[type="submit"]').textContent = 'Done';
    });
  });
}());