'use strict';
(function () {
  const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const LASTNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const MIN_NAME_LENGTH = 2;
  const MAX_NAME_LENGTH = 25;

  const similarListElement = document.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const fragment = document.createDocumentFragment();
  const userDialog = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = userDialog.querySelector(`.setup-close`);
  const userNameInput = userDialog.querySelector(`.setup-user-name`);
  const wizardCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
  const wizardEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
  const fireball = userDialog.querySelector(`.setup-fireball-wrap`);
  const inputCoatColor = userDialog.querySelector(`input[name=coat-color]`);
  const inputEayesColor = userDialog.querySelector(`input[name=eyes-color]`);

  const getRandomNum = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));
  const getRandomEl = (list) => list[getRandomNum(0, list.length - 1)];
  const setUpFullName = () => [getRandomEl(NAMES), getRandomEl(LASTNAMES)];

  const createWizards = (amount) => Array.from({length: amount}, (_) => ({
    name: Math.random() > 0.5 ? setUpFullName().reverse().join(` `) : setUpFullName().join(` `),
    coatColor: getRandomEl(COAT_COLORS),
    eyesColor: getRandomEl(EYE_COLORS)
  }));

  const renderWizard = (wizard) => {
    const wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
    wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
    wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.coatColor;
    return wizardElement;
  };

  createWizards(4).forEach((wizard) => fragment.appendChild(renderWizard(wizard)));

  similarListElement.appendChild(fragment);

  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  const openPopup = function () {
    userDialog.classList.remove(`hidden`);

    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Escape`) {
        evt.preventDefault();
        userDialog.classList.add(`hidden`);
      }
    });
  };

  const closePopup = function () {
    userDialog.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

  setupClose.addEventListener(`click`, function () {
    closePopup();
  });

  setupClose.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closePopup();
    }
  });

  userNameInput.addEventListener(`input`, function () {
    const valueLength = userNameInput.value.length;
    if (valueLength < MIN_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` символа`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      userNameInput.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` символа`);
    } else {
      userNameInput.setCustomValidity(``);
    }
    userNameInput.reportValidity();
  });

  wizardCoat.addEventListener(`click`, function () {
    wizardCoat.style.fill = getRandomEl(COAT_COLORS);
    let newCoatColor = wizardCoat.style.fill;
    inputCoatColor.value = newCoatColor;
  });

  wizardEyes.addEventListener(`click`, function () {
    wizardEyes.style.fill = getRandomEl(EYE_COLORS);
    let newEyesColor = wizardEyes.style.fill;
    inputEayesColor.value = newEyesColor;
  });

  fireball.addEventListener(`click`, function () {
    fireball.style.backgroundColor = getRandomEl(FIREBALL_COLORS);
  });

})();
