const previewImg = document.querySelector('.img-upload__preview img');
const effects = document.querySelector('.img-upload__effects');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = effectLevel.querySelector('.effect-level__value');
const effectSlider = effectLevel.querySelector('.effect-level__slider');

let current = 'none';
const SLIDER_VALUES = {
  MAX: 1,
  MIN: 0,
  STEP: 0.1,
};

noUiSlider.create(effectSlider, {
  start: SLIDER_VALUES.MAX,
  range: {
    min: SLIDER_VALUES.MIN,
    max: SLIDER_VALUES.MAX,
  },
  step: SLIDER_VALUES.STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(1),
    from: (value) => (+value).toFixed(1)
  }
});

effectSlider.noUiSlider.on('update', function () {
  effectValue.setAttribute('value', this.get());
  if (current !== 'none') {
    previewImg.style.filter = `${current}(${this.get()})`;
  }

});

const getRidOfEffects = () =>  previewImg.classList.remove('effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');

effects.addEventListener('change', (evt) => {
  switch (evt.target.value) {
    case 'none':
      getRidOfEffects();
      previewImg.style.filter = '';
      current = 'none';
      hideSlider();
      break;

    case 'chrome':
      getRidOfEffects();
      previewImg.classList.add('effects__preview--chrome');
      current = 'grayscale';
      effectSlider.noUiSlider.updateOptions({
        start: SLIDER_VALUES.MAX,
        range: {
          min: SLIDER_VALUES.MIN,
          max: SLIDER_VALUES.MAX,
        },
        step: SLIDER_VALUES.STEP,
        format: {
          to: (value) => value.toFixed(1),
          from: (value) => (+value).toFixed(1)
        }
      }, true);
      showSlider();
      break;

    case 'sepia':
      getRidOfEffects();
      previewImg.classList.add('effects__preview--sepia');
      current = 'sepia';
      effectSlider.noUiSlider.updateOptions({
        start: SLIDER_VALUES.MAX,
        range: {
          min: SLIDER_VALUES.MIN,
          max: SLIDER_VALUES.MAX,
        },
        step: SLIDER_VALUES.STEP,
        format: {
          to: (value) => value.toFixed(1),
          from: (value) => (+value).toFixed(1)
        },
      }, true);
      showSlider();
      break;

    case 'marvin':
      getRidOfEffects();
      previewImg.classList.add('effects__preview--marvin');
      current = 'invert';
      effectSlider.noUiSlider.updateOptions({
        start: 100,
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        format: {
          to: (value) => `${value.toFixed(0)}%`,
          from: (value) => (+value).toFixed(0)
        },
      }, true);
      showSlider();
      break;

    case 'phobos':
      getRidOfEffects();
      previewImg.classList.add('effects__preview--phobos');
      current = 'blur';
      effectSlider.noUiSlider.updateOptions({
        start: 3,
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        format: {
          to: (value) => `${value.toFixed(1)}px`,
          from: (value) => (+value).toFixed(1)
        },
      }, true);
      showSlider();
      break;

    case 'heat':
      getRidOfEffects();
      previewImg.classList.add('effects__preview--heat');
      current = 'brightness';
      effectSlider.noUiSlider.updateOptions({
        start: 3,
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        format: {
          to: (value) => `${value.toFixed(1)}`,
          from: (value) => (+value).toFixed(1)
        },
      }, true);
      showSlider();
      showSlider();
      break;
  }
});

function hideSlider() {
  effectLevel.classList.add('hidden');
}

function showSlider() {
  effectLevel.classList.remove('hidden');
}

function resetSlider() {
  effectLevel.classList.add('hidden');
  getRidOfEffects();
  previewImg.style.filter = '';
  current = 'none';
}

resetSlider();

