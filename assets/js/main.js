var formSteps = [
      'step-1',
      'step-2',
      'step-3',
      'step-final'
    ],
    STEP_1 = formSteps[0],
    STEP_2 = formSteps[1],
    STEP_3 = formSteps[2],
    STEP_FINAL = formSteps[3];

function handleButtonClick(event) {
  event.preventDefault();

  var $form = $('form'),
      $this = $(this),
      step = $this.data('step'),
      buttonType = $this.data('type');

  if (!$form) {
    throw new Error('Form not found!');
  }

  switch (step) {
    case STEP_FINAL:
        if (buttonType == 'next') {
          submitForm($form);
        } else {
          var index = formSteps.indexOf(step);

          $('.form-step.active').removeClass('active');
          $form.find('.form-step.' + formSteps[index - 1]).addClass('active');
        }
      break;
    default:
        if (validateStep($form, step)) {
          var index = formSteps.indexOf(step),
              stepClass = buttonType == 'next' ? formSteps[index + 1] : formSteps[index - 1];

          $('.form-step.active').removeClass('active');
          console.log($('.form-step.step-final'));
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
  return true;
}


$(document).ready(function() {
  $('.next-step-button').on('click', handleButtonClick);
  $('.prev-step-button').on('click', handleButtonClick);
});
