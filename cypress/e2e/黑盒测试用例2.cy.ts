describe('黑盒测试用例1', () => {
  it('passes', () => {
    cy.visit('http://music.yujin123.cn/')
    cy.contains('搜索').click()
    cy.get("input[type=search]").type("周杰伦").type("{enter}")
    expect(cy.contains("周杰伦")).exist
  })
})