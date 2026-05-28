import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hexa-CMS 实时通知标题', () => {
  render(<App />);
  // 匹配你页面上的标题文字
  const titleElement = screen.getByText(/Hexa-CMS 实时通知/i);
  expect(titleElement).toBeInTheDocument();
});
