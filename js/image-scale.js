const imageUploadScale = document.querySelector('.img-upload__scale');
const scaleReduceButton = imageUploadScale.querySelector('.scale__control--smaller');
const scaleIncreaseButton = imageUploadScale.querySelector('.scale__control--bigger');
const scaleControlValue = imageUploadScale.querySelector('.scale__control--value');
const preview = document.querySelector('.img-upload__preview');

const STEP = 25;
const MIN = 25;
const MAX = 100;

scaleReduceButton.addEventListener('click', () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  currentValue -= STEP;

  scaleControlValue.value = `${Math.max(currentValue, MIN)}%`;
  changeScale();
});

scaleIncreaseButton.addEventListener('click', () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  currentValue += STEP;

  scaleControlValue.value = `${Math.min(currentValue, MAX)}%`;
  changeScale();
});


function changeScale() {
  const currentValue = parseInt(scaleControlValue.value, 10) / 100;
  preview.style.transform = `scale(${currentValue})`;
}

changeScale();
