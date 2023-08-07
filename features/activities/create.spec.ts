import { expect, Route } from '@playwright/test';
import test from '../utilities/test';
import asCoach from '../utilities/as-coach';

test('create an activity', async ({ page }) => {
  const activities = [
    {
      _id: 1,
      _type: 'Article',
      title: 'Some title 1',
      published: true,
    },
    {
      _id: 2,
      _type: 'Article',
      title: 'Some title 2',
      published: false,
    },
  ];

  const activity = {
    _id: 3,
    _type: 'Article',
    title: 'Some title 3',
    postSlug: 'slug_3',
    description: 'Some desc.',
    notes: 'Note 3',
  };
  const {
    title, postSlug, description, notes,
  } = activity;

  await page.route('**/activities', (route: Route) => {
    route.fulfill({
      body: JSON.stringify(activities),
    });
  });

  await asCoach(page);
  await page.getByText('Activity Manager').click();

  await page.getByRole('button', { name: 'New' }).click({ force: true });

  await page.getByLabel('Title').fill(title);
  await page.getByLabel('Slug').fill(postSlug);
  await page.getByLabel('Description').fill(description);
  await page.getByLabel('Notes').fill(notes);

  await page.getByRole('button', { name: 'Save and Publish' }).click();

  await expect(page.getByRole('row')).toHaveCount(activities.length + 1);
});
