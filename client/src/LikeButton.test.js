import { render, screen, fireEvent } from '@testing-library/react';
import LikeButton from './LikeButton';

describe('点赞按钮组件测试', () => {
  it('初始渲染时点赞数为 0，点击后点赞数变为 1', () => {
    // 1. 渲染点赞按钮组件
    render(<LikeButton />);

    // 2. 验证初始状态文字为 "赞 0"
    const button = screen.getByText(/赞 0/);
    expect(button).toBeInTheDocument();

    // 3. 模拟用户点击按钮
    fireEvent.click(button);

    // 4. 验证点击后文字变为 "赞 1"
    const updatedButton = screen.getByText(/赞 1/);
    expect(updatedButton).toBeInTheDocument();
  });
});