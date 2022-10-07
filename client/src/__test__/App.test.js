import { render} from '@testing-library/react';
import App from '../App';

describe("App", () => {
  test("should render App", () => {
    render(<App />);

  });
});



// test('loads items eventually', async () => {
//   // Click button
//   // eslint-disable-next-line testing-library/prefer-screen-queries
//   fireEvent.click(getByText(node, 'Load'))

//   // Wait for page to update with query text
//   const items = await findByText(node, /Item #[0-9]: /)
//   expect(items).toHaveLength(10)
// })