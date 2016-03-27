var formSteps = [
      'step-1',
      'step-2',
      'step-3',
      'step-final'
    ],
    STEP_1 = formSteps[0],
    STEP_2 = formSteps[1],
    STEP_3 = formSteps[2],
    STEP_FINAL = formSteps[3],
    regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

function handleButtonClick(event) {
  event.preventDefault();

  var $form = $('form'),
      $this = $(this),
      step = $this.data('step'),
      buttonType = $this.data('type'),
      $rightPane = $('.order-right-pane');

  if (!$form) {
    throw new Error('Form not found!');
  }

  switch (step) {
    case STEP_FINAL:
        if (buttonType == 'next') {
          submitForm($form);
        } else {
          $('.order-start').show();
          $('.form-step.active').removeClass('active');
          $('.form-step.' + formSteps[formSteps.length - 2]).addClass('active');
        }
      break;
    default:
        if (validateStep($form, step)) {
          var index = formSteps.indexOf(step),
              stepClass = buttonType == 'next' ? formSteps[index + 1] : formSteps[index - 1];

          if (step == STEP_3 && buttonType == 'next') {
            $('.order-start').hide();
          }

          var $progressBar = $('.order-progress-bar');
          $progressBar.find('.col-xs').removeClass('active').removeClass('done');
          $progressBar.find('.' + stepClass).addClass('active');
          for (var i = 0; i < formSteps.indexOf(stepClass); i++) {
            $progressBar.find('.' + formSteps[i]).addClass('done');
          }

          // Right pane
          if (buttonType == 'next') {
            var $fields = $form.find('.' + step).find('input');

            console.log($rightPane, step);
            $rightPane.find('.' + formSteps[index + 1]).removeClass('hidden');

            $fields.each(function (index, field) {
              var id = $(field).attr('id');
              console.log('.' + id)
              $rightPane.find('.' + id).text(field.value);
            });
          }

          $('.form-step.active').removeClass('active');
          $('.form-step.' + stepClass).addClass('active');
        }
      break;
  }
}

function submitForm($form) {
  var data = $form.serialize();

  $.ajax({
    url: $form.url,
    settings: {
      method: 'POST',
      data: data,
      dataType: 'json',
      error: function(request, textStatus, error) {

      },
      success: function(data, textStatus, request) {

      }
    }
  });
}

function validateStep($form, step) {
  var $field = $form.find('#company_name'),
      $fields = $form.find('.' + step).find('input'),
      valid = true;

  $fields.each(function (index, field) {
    $(field).parents('.form-control').removeClass('error');
    if (field.required && !field.value.length) {
      $(field).parents('.form-control').addClass('error');
      valid = false;
    }
  });

  switch (step) {
    case STEP_1:
      var $field = $form.find('#company_name'),
          $fields = $form.find('.' + step).find('input');

      $fields.each(function (index, field) {
        if ($(field).attr('id') == 'phone' && field.value.length != 14) {
          $(field).parents('.form-control').addClass('error');
          valid = false;
        }

        if ($(field).attr('id') == 'email' && !isEmail(field.value)) {
          $(field).parents('.form-control').addClass('error');
          valid = false;
        }
      });
      return valid;
      break;
    default:
      return valid;
      break;
  }
  return true;
}

function isEmail(email) {
  return regex.test(email);
}


$(document).ready(function() {
  $('.next-step-button').on('click', handleButtonClick);
  $('.prev-step-button').on('click', handleButtonClick);

  $("#phone").mask("(999) 999-9999");
});
