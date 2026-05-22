import { test, expect } from '@mobilewright/test';

const ACCOUNTHOLDER_NAME1 = 'John Smith';
const ACCOUNTHOLDER_NUMBER1 = '111111126';

const ACCOUNTHOLDER_NAME2 = 'Jane Doe';
const ACCOUNTHOLDER_NUMBER2 = '111111118';

test(
  'app launches and shows home screen',
  { tag: ['@PSM-28', '@smoke', '@android'] },
  async ({ screen }) => {
    await expect(screen.getByText('No Payment Profiles')).toBeVisible({ timeout: 30_000 });
    await screen.getByTestId('dashboard-create-payment-profile-button').tap();

    await screen.getByTestId('canada-revenue-agency-individual-taxes-button').tap();
    await screen.getByText('CRA - Individual (T1) Tax Return').tap();

    await screen.getByTestId('account-details-button').tap();

    await screen.getByTestId('taxpayer-name-field').fill(ACCOUNTHOLDER_NAME1);
    await screen.getByTestId('social-insurance-number-field').fill(ACCOUNTHOLDER_NUMBER1);

    await screen.getByTestId('save-button').doubleTap();

    await screen.getByTestId('default-payment-option-button').tap();
    await screen.getByTestId('credit-payment-option').tap();
    

    await screen.getByTestId('save-and-return-home-button').doubleTap();

    await expect(screen.getByText('CRA - INDIVIDUAL (T1) TAX RETURN')).toBeVisible();
    await expect(screen.getByText(`${ACCOUNTHOLDER_NAME1} (1126)`)).toBeVisible();

    await screen.getByTestId('hamburger-menu-button').tap();
    await screen.getByText('Settings').tap();
    await screen.getByTestId('header-back-button').tap();
    await screen.swipe('left');



    // await screen.getByTestId('add-payment-profile-button').tap();

    // await expect(screen.getByText('What do you need to pay?')).toBeVisible({ timeout: 15_000 });
    // await screen.getByText('Individual Taxes').tap();
    // await screen.getByText('CRA - Individual (T1) Tax Return').tap();

    // await screen.getByTestId('account-details-button').tap();

    // await screen.getByTestId('taxpayer-name-field').fill(ACCOUNTHOLDER_NAME2);
    // await screen.getByTestId('social-insurance-number-field').fill(ACCOUNTHOLDER_NUMBER2);

    // await screen.getByTestId('save-button').doubleTap();

    // await screen.getByTestId('default-payment-option-button').tap();
    // await screen.getByTestId('credit-payment-option').tap();

    // await screen.getByTestId('pay-now-button').doubleTap();

    // await expect(screen.getByText('Payment amount')).toBeVisible();

    // await screen.getByTestId('payment-amount-field').fill('100');
    // await screen.hideKeyboard();

    // await screen.getByTestId('continue-button').doubleTap();

    // await expect(screen.getByText(ACCOUNTHOLDER_NAME2)).toBeVisible();
    // await expect(screen.getByText(ACCOUNTHOLDER_NUMBER2)).toBeVisible();
  }
);
