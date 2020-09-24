'use strict';
(function () {
  const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
  const LASTNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYE_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];

  const similarListElement = document.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const fragment = document.createDocumentFragment();
  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.remove(`hidden`);

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
})();
