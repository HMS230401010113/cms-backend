const { expect } = require('chai');

describe('Hexa-CMS 三合一单元测试', function () {

  // 第一个测试：测试文章标题是否合法
  it('测试标题不能为空', function () {
    const title = "测试标题";
    expect(title).to.be.a('string').and.not.empty;
  });

  // 第二个测试：测试标签分割功能
  it('测试标签字符串分割成数组', function () {
    const tags = "web,node,test";
    const arr = tags.split(',');
    expect(arr).to.be.an('array').length(3);
  });

  // 第三个测试：异步模拟数据库返回
  it('异步测试文章数据返回', function (done) {
    setTimeout(() => {
      const data = { id: 1, title: "hello" };
      expect(data).to.have.property('id').eq(1);
      done();
    }, 500);
  });

});