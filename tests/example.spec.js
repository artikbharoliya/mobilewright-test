import { test, expect } from '@mobilewright/test';

const EMAIL = 'psidevstar@gmail.com';
const OTP = '999999';

const ACCOUNT_1 = {
  name: 'Luke Skywalker',
  number: '111 111 126',
  suffix: '1126',
};

const ACCOUNT_2 = {
  name: 'Obi Van',
  number: '111 111 118',
};

async function tapUntilVisible(tapLocator, targetLocator, maxAttempts = 7) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    try {
      await expect(targetLocator).toBeVisible({ timeout: 1000 });
      return;
    } catch {
      await tapLocator.tap();
    }
  }

  await expect(targetLocator).toBeVisible({ timeout: 5000 });
}

async function fillLastTextField(screen, value) {
  await screen.getByType('TextField').last().fill(value);
}

async function login(screen) {
  await screen.getByText('Start').tap();

  await screen.getByText('Enter your email').tap();
  await fillLastTextField(screen, EMAIL);

  await screen.getByTestId('register-button').doubleTap();

  await tapUntilVisible(
    screen.getByTestId('register-button'),
    screen.getByTestId('verify-code-button'),
  );

  await fillLastTextField(screen, OTP);

  await expect(screen.getByText('Continue')).toBeVisible({ timeout: 5000 });

  await tapUntilVisible(
    screen.getByTestId('continue-button'),
    screen.getByTestId('close-modal-button'),
  );

  await screen.getByTestId('close-modal-button').tap();
  await screen.getByText('PROCEED').tap();

  await expect(screen.getByText('Set up your first Payment Profile')).toBeVisible();
  await screen.getByTestId('continue-button').tap();
}

async function addCraIndividualProfile(screen, account) {
  await screen.getByTestId('add-payment-profile-button').tap();

  await screen.getByTestId('canada-revenue-agency-individual-taxes-button').tap();
  await screen.getByText('CRA - Individual (T1) Tax Return').tap();

  await screen.getByTestId('account-details-button').tap();

  await screen.getByTestId('taxpayer-name-field').fill(account.name);
  await screen.getByTestId('social-insurance-number-field').fill(account.number);

  await screen.getByTestId('save-button').doubleTap();

  await screen.getByTestId('default-payment-option-button').tap();
  await screen.getByTestId('credit-payment-option').tap();
}

test('PSM-28 - add two CRA Individual profiles and start payment', async ({ screen }) => {
  await login(screen);

  await addCraIndividualProfile(screen, ACCOUNT_1);

  await screen.getByTestId('save-and-return-home-button').doubleTap();

  await expect(screen.getByText('CRA - INDIVIDUAL (T1) TAX RETURN')).toBeVisible();
  await expect(screen.getByText(`${ACCOUNT_1.name} (${ACCOUNT_1.suffix})`)).toBeVisible();

  await addCraIndividualProfile(screen, ACCOUNT_2);

  await screen.getByTestId('pay-now-button').doubleTap();

  await expect(screen.getByText('Payment amount')).toBeVisible();

  await screen.getByTestId('payment-amount-field').fill('100');

  await screen.getByTestId('continue-button').doubleTap();

  await expect(screen.getByText(ACCOUNT_2.name)).toBeVisible();
  await expect(screen.getByText(ACCOUNT_2.number)).toBeVisible();
});
